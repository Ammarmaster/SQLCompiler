import {
  EditorView,
  gutter,
  GutterMarker,
  Decoration,
  type DecorationSet,
} from '@codemirror/view';
import { StateField, StateEffect, RangeSetBuilder } from '@codemirror/state';
import { type CompletionContext, type CompletionResult } from '@codemirror/autocomplete';
import { parseSqlStatements } from '../../utils/sqlParser';
import type { SchemaInfo } from '../../types';

// ==========================================
// 1. Gutter Run Buttons Extension
// ==========================================

export class RunButtonMarker extends GutterMarker {
  private stmtText: string;
  private startLine: number;
  private endLine: number;
  private onRun: (text: string, startLine: number, endLine: number) => void;

  constructor(
    stmtText: string,
    startLine: number,
    endLine: number,
    onRun: (text: string, startLine: number, endLine: number) => void
  ) {
    super();
    this.stmtText = stmtText;
    this.startLine = startLine;
    this.endLine = endLine;
    this.onRun = onRun;
  }

  eq(other: RunButtonMarker) {
    return (
      other.stmtText === this.stmtText &&
      other.startLine === this.startLine &&
      other.endLine === this.endLine
    );
  }

  toDOM() {
    const btn = document.createElement('button');
    btn.className = 'ios-gutter-run-btn';
    btn.title = `Run statement (Lines ${this.startLine}-${this.endLine}) [⌥+Enter]`;
    btn.setAttribute('aria-label', `Run statement at line ${this.startLine}`);
    btn.innerHTML = `
      <svg width="9" height="10" viewBox="0 0 10 12" fill="currentColor">
        <path d="M1.5 1.5 L8.5 6 L1.5 10.5 Z" />
      </svg>
    `;

    btn.addEventListener('mousedown', (e) => {
      e.stopPropagation();
      e.preventDefault();
      // Provide visual tap feedback
      btn.classList.add('ios-active');
      setTimeout(() => btn.classList.remove('ios-active'), 200);
      this.onRun(this.stmtText, this.startLine, this.endLine);
    });

    return btn;
  }
}

export function createRunGutterExtension(
  onRunStatement: (text: string, startLine: number, endLine: number) => void
) {
  return gutter({
    class: 'cm-run-gutter',
    lineMarker(view, line) {
      const doc = view.state.doc;
      const docText = doc.toString();
      const stmts = parseSqlStatements(docText);
      const lineNo = doc.lineAt(line.from).number;

      const matchedStmt = stmts.find((s) => s.startLine === lineNo);
      if (matchedStmt) {
        return new RunButtonMarker(
          matchedStmt.text,
          matchedStmt.startLine,
          matchedStmt.endLine,
          onRunStatement
        );
      }
      return null;
    },
    initialSpacer: () => {
      const spacer = document.createElement('div');
      spacer.className = 'ios-gutter-run-spacer';
      return new (class extends GutterMarker {
        toDOM() {
          return spacer;
        }
      })();
    },
  });
}

// ==========================================
// 2. Soft Green/Red Flash Line Highlights
// ==========================================

export interface FlashLinePayload {
  startLine: number;
  endLine: number;
  type: 'success' | 'error';
}

export const setFlashEffect = StateEffect.define<FlashLinePayload | null>();

export const flashLineField = StateField.define<DecorationSet>({
  create() {
    return Decoration.none;
  },
  update(decorations, tr) {
    for (const effect of tr.effects) {
      if (effect.is(setFlashEffect)) {
        if (!effect.value) {
          return Decoration.none;
        }

        const builder = new RangeSetBuilder<Decoration>();
        const { startLine, endLine, type } = effect.value;
        const totalLines = tr.newDoc.lines;
        const sLine = Math.max(1, Math.min(startLine, totalLines));
        const eLine = Math.max(sLine, Math.min(endLine, totalLines));

        const className = type === 'success' ? 'cm-flash-success' : 'cm-flash-error';
        const lineDeco = Decoration.line({ attributes: { class: className } });

        for (let i = sLine; i <= eLine; i++) {
          const lineObj = tr.newDoc.line(i);
          builder.add(lineObj.from, lineObj.from, lineDeco);
        }

        return builder.finish();
      }
    }
    return decorations.map(tr.changes);
  },
  provide: (f) => EditorView.decorations.from(f),
});

// ==========================================
// 3. Dynamic Autocomplete from Schema
// ==========================================

export function createSchemaAutocomplete(getSchema: () => SchemaInfo) {
  return function (context: CompletionContext): CompletionResult | null {
    const word = context.matchBefore(/[\w_.]*/);
    if (!word || (word.from === word.to && !context.explicit)) return null;

    const schema = getSchema();
    const options: any[] = [];

    // SQL Keywords
    const keywords = [
      'SELECT', 'FROM', 'WHERE', 'JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN',
      'ON', 'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT', 'OFFSET', 'AS', 'DISTINCT',
      'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE FROM',
      'CREATE TABLE', 'ALTER TABLE', 'DROP TABLE', 'PRIMARY KEY', 'FOREIGN KEY',
      'REFERENCES', 'AUTOINCREMENT', 'INTEGER', 'TEXT', 'REAL', 'BLOB', 'NOT NULL',
      'DEFAULT', 'CHECK', 'PRAGMA', 'AND', 'OR', 'NOT', 'IN', 'IS NULL', 'IS NOT NULL',
      'LIKE', 'COUNT', 'SUM', 'AVG', 'MIN', 'MAX', 'COALESCE', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END'
    ];

    for (const kw of keywords) {
      options.push({
        label: kw,
        type: 'keyword',
        boost: 2,
      });
    }

    // Tables from schema
    for (const table of schema.tables) {
      options.push({
        label: table.name,
        type: 'class',
        detail: `table (${table.rowCount ?? 0} rows)`,
        boost: 5,
      });

      // Columns
      for (const col of table.columns) {
        options.push({
          label: col.name,
          type: 'property',
          detail: `${table.name}.${col.name} : ${col.type}`,
          boost: 4,
        });
      }
    }

    return {
      from: word.from,
      options,
      validFor: /^[\w_.]*$/,
    };
  };
}

// ==========================================
// 4. iOS Editor Light & Dark Themes
// ==========================================

export const iosLightTheme = EditorView.theme(
  {
    '&': {
      backgroundColor: '#FFFFFF',
      color: '#1C1C1E',
      fontFamily: '"JetBrains Mono", Menlo, Monaco, SF Pro, Consolas, monospace',
      fontSize: '13.5px',
      lineHeight: '1.6',
    },
    '.cm-content': {
      caretColor: '#007AFF',
      padding: '12px 4px',
    },
    '&.cm-focused .cm-cursor': {
      borderLeftColor: '#007AFF',
      borderLeftWidth: '2px',
    },
    '&.cm-focused .cm-selectionBackground, ::selection': {
      backgroundColor: 'rgba(0, 122, 255, 0.18) !important',
    },
    '.cm-gutters': {
      backgroundColor: '#F7F7F9',
      color: '#8E8E93',
      borderRight: '1px solid #E5E5EA',
      paddingRight: '6px',
    },
    '.cm-activeLineGutter': {
      backgroundColor: '#ECECEE',
      color: '#007AFF',
      fontWeight: '600',
    },
    '.cm-activeLine': {
      backgroundColor: 'rgba(0, 122, 255, 0.04)',
    },
    '.cm-run-gutter': {
      width: '26px',
      paddingLeft: '4px',
    },
    '.cm-lineNumbers .cm-gutterElement': {
      paddingLeft: '10px',
      paddingRight: '6px',
      minWidth: '28px',
      textAlign: 'right',
    },
    '.cm-flash-success': {
      backgroundColor: 'rgba(52, 199, 89, 0.22) !important',
      transition: 'background-color 0.85s cubic-bezier(0.16, 1, 0.3, 1)',
    },
    '.cm-flash-error': {
      backgroundColor: 'rgba(255, 59, 48, 0.25) !important',
      transition: 'background-color 0.85s cubic-bezier(0.16, 1, 0.3, 1)',
    },
  },
  { dark: false }
);

export const iosDarkTheme = EditorView.theme(
  {
    '&': {
      backgroundColor: '#161618',
      color: '#F2F2F7',
      fontFamily: '"JetBrains Mono", Menlo, Monaco, SF Pro, Consolas, monospace',
      fontSize: '13.5px',
      lineHeight: '1.6',
    },
    '.cm-content': {
      caretColor: '#0A84FF',
      padding: '12px 4px',
    },
    '&.cm-focused .cm-cursor': {
      borderLeftColor: '#0A84FF',
      borderLeftWidth: '2px',
    },
    '&.cm-focused .cm-selectionBackground, ::selection': {
      backgroundColor: 'rgba(10, 132, 255, 0.25) !important',
    },
    '.cm-gutters': {
      backgroundColor: '#1C1C1E',
      color: '#636366',
      borderRight: '1px solid #2C2C2E',
      paddingRight: '6px',
    },
    '.cm-activeLineGutter': {
      backgroundColor: '#2C2C2E',
      color: '#0A84FF',
      fontWeight: '600',
    },
    '.cm-activeLine': {
      backgroundColor: 'rgba(255, 255, 255, 0.04)',
    },
    '.cm-run-gutter': {
      width: '26px',
      paddingLeft: '4px',
    },
    '.cm-lineNumbers .cm-gutterElement': {
      paddingLeft: '10px',
      paddingRight: '6px',
      minWidth: '28px',
      textAlign: 'right',
    },
    '.cm-flash-success': {
      backgroundColor: 'rgba(48, 209, 88, 0.26) !important',
      transition: 'background-color 0.85s cubic-bezier(0.16, 1, 0.3, 1)',
    },
    '.cm-flash-error': {
      backgroundColor: 'rgba(255, 69, 58, 0.30) !important',
      transition: 'background-color 0.85s cubic-bezier(0.16, 1, 0.3, 1)',
    },
  },
  { dark: true }
);

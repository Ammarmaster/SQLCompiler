import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView, lineNumbers, highlightActiveLine, highlightActiveLineGutter, keymap, type ViewUpdate } from '@codemirror/view';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { sql, SQLite } from '@codemirror/lang-sql';
import { autocompletion, closeBrackets, closeBracketsKeymap } from '@codemirror/autocomplete';
import { bracketMatching, indentOnInput, syntaxHighlighting, defaultHighlightStyle } from '@codemirror/language';
import {
  createRunGutterExtension,
  flashLineField,
  setFlashEffect,
  createSchemaAutocomplete,
  iosLightTheme,
  iosDarkTheme,
} from './cmExtensions';
import { parseSqlStatements } from '../../utils/sqlParser';
import type { SchemaInfo } from '../../types';

export interface SqlEditorRef {
  flashLines: (startLine: number, endLine: number, type: 'success' | 'error') => void;
  insertText: (text: string) => void;
  focus: () => void;
}

interface SqlEditorProps {
  value: string;
  onChange: (val: string) => void;
  onRunStatement: (sql: string, startLine: number, endLine: number) => void;
  onRunAll: () => void;
  getSchema: () => SchemaInfo;
  isDarkMode: boolean;
}

export const SqlEditor = forwardRef<SqlEditorRef, SqlEditorProps>(({
  value,
  onChange,
  onRunStatement,
  onRunAll,
  getSchema,
  isDarkMode,
}, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const onRunStatementRef = useRef(onRunStatement);
  onRunStatementRef.current = onRunStatement;
  const onRunAllRef = useRef(onRunAll);
  onRunAllRef.current = onRunAll;
  const getSchemaRef = useRef(getSchema);
  getSchemaRef.current = getSchema;

  // Flash lines handler
  const flashTimeoutRef = useRef<any>(null);
  const flashLines = (startLine: number, endLine: number, type: 'success' | 'error') => {
    if (!viewRef.current) return;
    const view = viewRef.current;

    if (flashTimeoutRef.current) {
      clearTimeout(flashTimeoutRef.current);
    }

    view.dispatch({
      effects: setFlashEffect.of({ startLine, endLine, type }),
    });

    flashTimeoutRef.current = setTimeout(() => {
      if (viewRef.current) {
        viewRef.current.dispatch({
          effects: setFlashEffect.of(null),
        });
      }
    }, 900);
  };

  useImperativeHandle(ref, () => ({
    flashLines,
    insertText: (text: string) => {
      if (!viewRef.current) return;
      const view = viewRef.current;
      const doc = view.state.doc;
      const endPos = doc.length;
      const separator = endPos > 0 && !doc.toString().endsWith('\n\n') ? '\n\n' : '';
      const insertContent = separator + text + '\n';
      view.dispatch({
        changes: { from: endPos, insert: insertContent },
        selection: { anchor: endPos + insertContent.length },
      });
      view.focus();
    },
    focus: () => {
      viewRef.current?.focus();
    },
  }));

  // Initialize CodeMirror
  useEffect(() => {
    if (!containerRef.current) return;

    const runCurrentStatement = (view: EditorView) => {
      const doc = view.state.doc;
      const docText = doc.toString();
      const cursorOffset = view.state.selection.main.head;
      const currentLine = doc.lineAt(cursorOffset).number;

      const stmts = parseSqlStatements(docText);
      // Find statement enclosing or nearest to the cursor
      const matched = stmts.find((s) => currentLine >= s.startLine && currentLine <= s.endLine)
        || stmts.find((s) => s.startLine === currentLine)
        || (stmts.length > 0 ? stmts[0] : null);

      if (matched) {
        onRunStatementRef.current(matched.text, matched.startLine, matched.endLine);
      } else if (docText.trim()) {
        onRunAllRef.current();
      }
      return true;
    };

    const runGutterExtension = createRunGutterExtension((text, sLine, eLine) => {
      onRunStatementRef.current(text, sLine, eLine);
    });

    const schemaAutocomplete = createSchemaAutocomplete(() => getSchemaRef.current());

    const startState = EditorState.create({
      doc: value,
      extensions: [
        lineNumbers(),
        runGutterExtension,
        highlightActiveLineGutter(),
        highlightActiveLine(),
        history(),
        bracketMatching(),
        closeBrackets(),
        indentOnInput(),
        syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
        sql({ dialect: SQLite }),
        autocompletion({
          override: [schemaAutocomplete],
          defaultKeymap: true,
        }),
        flashLineField,
        isDarkMode ? iosDarkTheme : iosLightTheme,
        keymap.of([
          {
            key: 'Mod-Enter',
            run: runCurrentStatement,
          },
          {
            key: 'Shift-Mod-Enter',
            run: () => {
              onRunAllRef.current();
              return true;
            },
          },
          ...closeBracketsKeymap,
          ...defaultKeymap,
          ...historyKeymap,
        ]),
        EditorView.updateListener.of((update: ViewUpdate) => {
          if (update.docChanged) {
            const newDoc = update.state.doc.toString();
            onChangeRef.current(newDoc);
          }
        }),
      ],
    });

    const view = new EditorView({
      state: startState,
      parent: containerRef.current,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
  }, [isDarkMode]);

  // Sync value externally if tab changes
  useEffect(() => {
    if (viewRef.current) {
      const currentVal = viewRef.current.state.doc.toString();
      if (value !== currentVal) {
        viewRef.current.dispatch({
          changes: { from: 0, to: currentVal.length, insert: value },
        });
      }
    }
  }, [value]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-hidden text-sm relative select-text"
      style={{
        fontFamily: '"JetBrains Mono", Menlo, Monaco, SF Pro, Consolas, monospace',
      }}
    />
  );
});

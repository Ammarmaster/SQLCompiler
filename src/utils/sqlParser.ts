import type { StatementRange } from '../types';

/**
 * Parses SQL text into discrete statements with line numbers and character offsets.
 * Properly ignores semicolons inside string literals ('...', "..."), backticks,
 * line comments (-- ...), and block comments (/* ... *\/).
 */
export function parseSqlStatements(text: string): StatementRange[] {
  const statements: StatementRange[] = [];
  const len = text.length;

  let pos = 0;
  let stmtStartOffset = -1;
  let inSingleQuote = false;
  let inDoubleQuote = false;
  let inBacktick = false;
  let inLineComment = false;
  let inBlockComment = false;

  // Helper to get 1-indexed line number from character offset
  const lineOffsets: number[] = [0];
  for (let i = 0; i < len; i++) {
    if (text[i] === '\n') {
      lineOffsets.push(i + 1);
    }
  }

  function getLineNumber(offset: number): number {
    let low = 0;
    let high = lineOffsets.length - 1;
    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      if (lineOffsets[mid] <= offset) {
        if (mid === lineOffsets.length - 1 || lineOffsets[mid + 1] > offset) {
          return mid + 1;
        }
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
    return 1;
  }

  while (pos < len) {
    const char = text[pos];
    const nextChar = pos + 1 < len ? text[pos + 1] : '';

    // If currently in a line comment
    if (inLineComment) {
      if (char === '\n') {
        inLineComment = false;
      }
      pos++;
      continue;
    }

    // If currently in a block comment
    if (inBlockComment) {
      if (char === '*' && nextChar === '/') {
        inBlockComment = false;
        pos += 2;
        continue;
      }
      pos++;
      continue;
    }

    // If currently in a string literal or identifier
    if (inSingleQuote) {
      if (char === "'") {
        if (nextChar === "'") {
          // Escaped single quote ''
          pos += 2;
          continue;
        } else {
          inSingleQuote = false;
        }
      }
      pos++;
      continue;
    }

    if (inDoubleQuote) {
      if (char === '"') {
        if (nextChar === '"') {
          pos += 2;
          continue;
        } else {
          inDoubleQuote = false;
        }
      }
      pos++;
      continue;
    }

    if (inBacktick) {
      if (char === '`') {
        inBacktick = false;
      }
      pos++;
      continue;
    }

    // Check for comment start
    if (char === '-' && nextChar === '-') {
      inLineComment = true;
      pos += 2;
      continue;
    }

    if (char === '/' && nextChar === '*') {
      inBlockComment = true;
      pos += 2;
      continue;
    }

    // Check for quote start
    if (char === "'") {
      inSingleQuote = true;
      if (stmtStartOffset === -1) stmtStartOffset = pos;
      pos++;
      continue;
    }

    if (char === '"') {
      inDoubleQuote = true;
      if (stmtStartOffset === -1) stmtStartOffset = pos;
      pos++;
      continue;
    }

    if (char === '`') {
      inBacktick = true;
      if (stmtStartOffset === -1) stmtStartOffset = pos;
      pos++;
      continue;
    }

    // Check for statement end (semicolon)
    if (char === ';') {
      if (stmtStartOffset !== -1) {
        const stmtRaw = text.substring(stmtStartOffset, pos + 1);
        const trimmed = stmtRaw.trim();
        // Check if statement contains actual SQL (not just whitespace/comments)
        if (hasExecutableSql(trimmed)) {
          const effectiveStart = findFirstExecutableCharOffset(text, stmtStartOffset, pos);
          const startLine = getLineNumber(effectiveStart);
          const endLine = getLineNumber(pos);
          statements.push({
            id: `stmt-${effectiveStart}-${pos}`,
            from: effectiveStart,
            to: pos + 1,
            startLine,
            endLine,
            text: stmtRaw,
          });
        }
        stmtStartOffset = -1;
      }
      pos++;
      continue;
    }

    // Non-whitespace character marks start of statement if not started
    if (!/\s/.test(char)) {
      if (stmtStartOffset === -1) {
        stmtStartOffset = pos;
      }
    }

    pos++;
  }

  // Handle trailing statement without trailing semicolon
  if (stmtStartOffset !== -1 && stmtStartOffset < len) {
    const stmtRaw = text.substring(stmtStartOffset);
    const trimmed = stmtRaw.trim();
    if (hasExecutableSql(trimmed)) {
      const effectiveStart = findFirstExecutableCharOffset(text, stmtStartOffset, len - 1);
      const startLine = getLineNumber(effectiveStart);
      const endLine = getLineNumber(len - 1);
      statements.push({
        id: `stmt-${effectiveStart}-${len}`,
        from: effectiveStart,
        to: len,
        startLine,
        endLine,
        text: stmtRaw,
      });
    }
  }

  return statements;
}

/**
 * Finds the offset of the first non-comment, non-whitespace character in the range.
 */
function findFirstExecutableCharOffset(text: string, from: number, to: number): number {
  let i = from;
  while (i <= to) {
    // Skip whitespace
    if (/\s/.test(text[i])) {
      i++;
      continue;
    }
    // Skip line comment
    if (text[i] === '-' && i + 1 <= to && text[i + 1] === '-') {
      i += 2;
      while (i <= to && text[i] !== '\n') {
        i++;
      }
      continue;
    }
    // Skip block comment
    if (text[i] === '/' && i + 1 <= to && text[i + 1] === '*') {
      i += 2;
      while (i + 1 <= to && !(text[i] === '*' && text[i + 1] === '/')) {
        i++;
      }
      i += 2;
      continue;
    }
    return i;
  }
  return from;
}

/**
 * Checks if a string contains executable SQL rather than just comments and whitespace.
 */
function hasExecutableSql(text: string): boolean {
  // Strip block comments
  const noBlockComments = text.replace(/\/\*[\s\S]*?\*\//g, '');
  // Strip line comments
  const noLineComments = noBlockComments.replace(/--.*$/gm, '');
  // Strip semicolons and whitespace
  const clean = noLineComments.replace(/;/g, '').trim();
  return clean.length > 0;
}

export interface ColumnMeta {
  cid: number;
  name: string;
  type: string;
  notnull: boolean;
  dflt_value: any;
  pk: boolean;
  isFk?: boolean;
  fkTargetTable?: string;
  fkTargetColumn?: string;
}

export interface ForeignKeyMeta {
  id: number;
  seq: number;
  table: string; // referenced table
  from: string;  // column in this table
  to: string;    // column in referenced table
  on_update?: string;
  on_delete?: string;
}

export interface TableMeta {
  name: string;
  columns: ColumnMeta[];
  foreignKeys: ForeignKeyMeta[];
  rowCount?: number;
}

export interface SchemaInfo {
  tables: TableMeta[];
  updatedAt: number;
}

export interface QueryResult {
  columns: string[];
  values: any[][];
  rowCount: number;
  executionTimeMs: number;
  executedAt: Date;
  statement: string;
  error?: string;
  isDdlOrDml?: boolean;
  rowsAffected?: number;
}

export interface EditorTab {
  id: string;
  name: string;
  content: string;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  statement: string;
  success: boolean;
  executionTimeMs: number;
  rowCount: number;
  error?: string;
}

export interface StatementRange {
  id: string;
  from: number;       // char offset start
  to: number;         // char offset end
  startLine: number;  // 1-indexed line number
  endLine: number;    // 1-indexed line number
  text: string;       // cleaned SQL statement text
}

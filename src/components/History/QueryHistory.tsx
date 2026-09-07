import React, { useState } from 'react';
import {
  Clock,
  Play,
  Copy,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Search,
  Code,
  Check,
} from 'lucide-react';
import type { HistoryEntry } from '../../types';

interface QueryHistoryProps {
  history: HistoryEntry[];
  onRerun: (statement: string) => void;
  onInsertToEditor: (statement: string) => void;
  onClearHistory: () => void;
}

export const QueryHistory: React.FC<QueryHistoryProps> = ({
  history,
  onRerun,
  onInsertToEditor,
  onClearHistory,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredHistory = history.filter((item) =>
    item.statement.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopy = (id: string, stmt: string) => {
    navigator.clipboard.writeText(stmt);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const formatTimestamp = (ts: number) => {
    const d = new Date(ts);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  if (history.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center select-none">
        <div className="w-14 h-14 rounded-2xl bg-neutral-500/10 dark:bg-white/10 flex items-center justify-center text-neutral-500 dark:text-neutral-400 mb-3.5 shadow-sm">
          <Clock className="w-7 h-7 stroke-[1.75]" />
        </div>
        <div className="text-base font-semibold text-neutral-800 dark:text-neutral-100">
          No Query History
        </div>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm mt-1">
          Statements you execute will be logged here with execution duration, row counts, and one-click re-run buttons.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#F9F9FB] dark:bg-[#161618]">
      {/* Search & Actions Header */}
      <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-black/[0.06] dark:border-white/[0.08] bg-[#F2F2F7]/50 dark:bg-[#1C1C1E]/50 backdrop-blur-sm gap-2 shrink-0">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-neutral-400" />
          <input
            type="text"
            placeholder="Search query history..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-xl text-xs bg-white dark:bg-[#2C2C2E] border border-black/[0.06] dark:border-white/[0.08] text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
          />
        </div>

        <button
          type="button"
          onClick={onClearHistory}
          className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-500/10 active:scale-95 transition-all shrink-0"
          title="Clear all query history"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear</span>
        </button>
      </div>

      {/* History List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
        {filteredHistory.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl bg-white dark:bg-[#1E1E22] border border-black/[0.06] dark:border-white/[0.08] p-3 shadow-xs transition-shadow hover:shadow-sm"
          >
            {/* Top metadata row */}
            <div className="flex items-center justify-between text-xs mb-2">
              <div className="flex items-center space-x-2">
                {item.success ? (
                  <span className="flex items-center space-x-1 text-emerald-600 dark:text-emerald-400 font-medium text-[11px] bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Success</span>
                  </span>
                ) : (
                  <span className="flex items-center space-x-1 text-red-600 dark:text-red-400 font-medium text-[11px] bg-red-500/10 px-2 py-0.5 rounded-full">
                    <AlertCircle className="w-3 h-3" />
                    <span>Failed</span>
                  </span>
                )}
                <span className="text-[11px] text-neutral-400 dark:text-neutral-500">
                  {formatTimestamp(item.timestamp)}
                </span>
              </div>

              <div className="flex items-center space-x-2 text-[11px] text-neutral-500 dark:text-neutral-400 font-mono">
                <span>{item.rowCount} rows</span>
                <span>•</span>
                <span>{item.executionTimeMs} ms</span>
              </div>
            </div>

            {/* SQL Snippet */}
            <div className="p-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.03] dark:border-white/[0.04] font-mono text-[11px] text-neutral-800 dark:text-neutral-200 overflow-x-auto whitespace-pre-wrap break-words max-h-24">
              {item.statement}
            </div>

            {/* Error preview if any */}
            {item.error && (
              <p className="mt-1.5 text-[11px] text-red-600 dark:text-red-400 font-mono">
                {item.error}
              </p>
            )}

            {/* Action buttons */}
            <div className="mt-2.5 flex items-center justify-end space-x-1.5">
              <button
                type="button"
                onClick={() => handleCopy(item.id, item.statement)}
                className="flex items-center space-x-1 px-2.5 py-1 rounded-lg text-[11px] font-medium text-neutral-600 dark:text-neutral-300 hover:bg-black/[0.05] dark:hover:bg-white/[0.08] active:scale-95 transition-all"
                title="Copy statement"
              >
                {copiedId === item.id ? (
                  <Check className="w-3 h-3 text-[#34C759]" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
                <span>Copy</span>
              </button>

              <button
                type="button"
                onClick={() => onInsertToEditor(item.statement)}
                className="flex items-center space-x-1 px-2.5 py-1 rounded-lg text-[11px] font-medium text-neutral-600 dark:text-neutral-300 hover:bg-black/[0.05] dark:hover:bg-white/[0.08] active:scale-95 transition-all"
                title="Append to editor"
              >
                <Code className="w-3 h-3" />
                <span>Insert</span>
              </button>

              <button
                type="button"
                onClick={() => onRerun(item.statement)}
                className="flex items-center space-x-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold text-[#007AFF] dark:text-[#0A84FF] bg-blue-500/10 hover:bg-blue-500/15 active:scale-95 transition-all"
                title="Re-run statement immediately"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Re-run</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

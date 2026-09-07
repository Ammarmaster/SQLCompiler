import React, { useState, useMemo } from 'react';
import {
  Copy,
  Download,
  Check,
  AlertCircle,
  Clock,
  Rows3,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  FileSpreadsheet,
  CheckCircle2,
} from 'lucide-react';
import type { QueryResult } from '../../types';

interface ResultsGridProps {
  result: QueryResult | null;
  isRunning: boolean;
}

type SortConfig = {
  key: string;
  direction: 'asc' | 'desc' | null;
};

export const ResultsGrid: React.FC<ResultsGridProps> = ({ result, isRunning }) => {
  const [copiedType, setCopiedType] = useState<'csv' | 'json' | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: '', direction: null });

  // Handle sorting
  const sortedValues = useMemo(() => {
    if (!result || !result.values || !sortConfig.direction || !sortConfig.key) {
      return result?.values || [];
    }

    const colIndex = result.columns.indexOf(sortConfig.key);
    if (colIndex === -1) return result.values;

    return [...result.values].sort((a, b) => {
      const valA = a[colIndex];
      const valB = b[colIndex];

      if (valA === null || valA === undefined) return 1;
      if (valB === null || valB === undefined) return -1;

      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortConfig.direction === 'asc' ? valA - valB : valB - valA;
      }

      const strA = String(valA).toLowerCase();
      const strB = String(valB).toLowerCase();

      if (strA < strB) return sortConfig.direction === 'asc' ? -1 : 1;
      if (strA > strB) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [result, sortConfig]);

  const handleSort = (colName: string) => {
    setSortConfig((prev) => {
      if (prev.key !== colName) {
        return { key: colName, direction: 'asc' };
      }
      if (prev.direction === 'asc') {
        return { key: colName, direction: 'desc' };
      }
      return { key: '', direction: null };
    });
  };

  const copyToClipboard = (text: string, type: 'csv' | 'json') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const exportAsCsv = () => {
    if (!result || !result.columns) return;
    const csvContent = [
      result.columns.map((c) => `"${c.replace(/"/g, '""')}"`).join(','),
      ...sortedValues.map((row) =>
        row.map((cell) => (cell === null ? '' : `"${String(cell).replace(/"/g, '""')}"`)).join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `query_result_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyAsCsv = () => {
    if (!result || !result.columns) return;
    const csvContent = [
      result.columns.map((c) => `"${c.replace(/"/g, '""')}"`).join(','),
      ...sortedValues.map((row) =>
        row.map((cell) => (cell === null ? '' : `"${String(cell).replace(/"/g, '""')}"`)).join(',')
      ),
    ].join('\n');
    copyToClipboard(csvContent, 'csv');
  };

  const copyAsJson = () => {
    if (!result || !result.columns) return;
    const jsonData = sortedValues.map((row) => {
      const obj: Record<string, any> = {};
      result.columns.forEach((col, idx) => {
        obj[col] = row[idx];
      });
      return obj;
    });
    copyToClipboard(JSON.stringify(jsonData, null, 2), 'json');
  };

  if (isRunning) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center">
        <div className="w-9 h-9 border-3 border-[#007AFF] border-t-transparent rounded-full animate-spin mb-3"></div>
        <div className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
          Executing Statement...
        </div>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
          Processing SQLite WebAssembly query
        </p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center select-none">
        <div className="w-14 h-14 rounded-2xl bg-blue-500/10 dark:bg-blue-500/15 flex items-center justify-center text-[#007AFF] mb-3.5 shadow-sm">
          <FileSpreadsheet className="w-7 h-7 stroke-[1.75]" />
        </div>
        <div className="text-base font-semibold text-neutral-800 dark:text-neutral-100">
          No Query Executed Yet
        </div>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm mt-1 leading-relaxed">
          Click the circular <span className="font-semibold text-[#007AFF]">▶</span> button in the editor gutter or press <kbd className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 text-[11px] font-mono">⌘ ↵</kbd> to run any statement.
        </p>
      </div>
    );
  }

  // Error State
  if (result.error) {
    return (
      <div className="p-4 h-full overflow-y-auto">
        <div className="rounded-2xl bg-red-500/10 dark:bg-red-500/15 border border-red-500/20 p-4 shadow-sm">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-[#FF3B30] shrink-0 mt-0.5">
              <AlertCircle className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-[#FF3B30] dark:text-red-400">
                SQL Execution Error
              </h4>
              <p className="mt-1 font-mono text-xs text-red-700 dark:text-red-300 break-words leading-relaxed whitespace-pre-wrap">
                {result.error}
              </p>
              <div className="mt-3 flex items-center space-x-3 text-[11px] text-neutral-500 dark:text-neutral-400">
                <span className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{result.executionTimeMs} ms</span>
                </span>
                <span>•</span>
                <span className="truncate max-w-xs font-mono">{result.statement.substring(0, 60)}...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // DDL / DML Success Alert (e.g. table created, rows updated)
  if (result.isDdlOrDml) {
    return (
      <div className="p-4 h-full overflow-y-auto">
        <div className="rounded-2xl bg-green-500/10 dark:bg-green-500/15 border border-green-500/20 p-4 shadow-sm">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-[#34C759] dark:text-emerald-400 shrink-0 mt-0.5">
              <CheckCircle2 className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                Statement Executed Successfully
              </h4>
              <p className="mt-1 text-xs text-emerald-700 dark:text-emerald-400/90">
                {result.rowsAffected !== undefined && result.rowsAffected > 0
                  ? `${result.rowsAffected} row${result.rowsAffected === 1 ? '' : 's'} affected.`
                  : 'Schema or database state modified successfully.'}
              </p>
              <div className="mt-3 flex items-center space-x-3 text-[11px] text-neutral-500 dark:text-neutral-400">
                <span className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{result.executionTimeMs} ms</span>
                </span>
                <span>•</span>
                <span className="truncate max-w-sm font-mono text-[11px]">
                  {result.statement}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden bg-white/50 dark:bg-[#161618]/50">
      {/* iOS Action Toolbar */}
      <div className="flex items-center justify-between px-3.5 py-2 border-b border-black/[0.06] dark:border-white/[0.08] bg-[#F2F2F7]/40 dark:bg-[#1C1C1E]/40 backdrop-blur-sm shrink-0">
        <div className="flex items-center space-x-3 text-xs text-neutral-600 dark:text-neutral-400">
          <span className="flex items-center font-medium">
            <Rows3 className="w-3.5 h-3.5 mr-1 text-[#007AFF]" />
            <strong className="text-neutral-900 dark:text-white font-semibold mr-1">
              {result.rowCount}
            </strong>{' '}
            row{result.rowCount === 1 ? '' : 's'}
          </span>
          <span>•</span>
          <span className="flex items-center font-medium">
            <Clock className="w-3.5 h-3.5 mr-1 text-[#34C759]" />
            <span>{result.executionTimeMs} ms</span>
          </span>
        </div>

        {/* Export / Copy Actions */}
        <div className="flex items-center space-x-1.5">
          <button
            type="button"
            onClick={copyAsCsv}
            className="flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-medium text-neutral-700 dark:text-neutral-300 bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] active:scale-95 transition-all"
            title="Copy as CSV"
          >
            {copiedType === 'csv' ? (
              <Check className="w-3 h-3 text-[#34C759]" />
            ) : (
              <Copy className="w-3 h-3 opacity-70" />
            )}
            <span>CSV</span>
          </button>

          <button
            type="button"
            onClick={copyAsJson}
            className="flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-medium text-neutral-700 dark:text-neutral-300 bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] active:scale-95 transition-all"
            title="Copy as JSON"
          >
            {copiedType === 'json' ? (
              <Check className="w-3 h-3 text-[#34C759]" />
            ) : (
              <Copy className="w-3 h-3 opacity-70" />
            )}
            <span>JSON</span>
          </button>

          <button
            type="button"
            onClick={exportAsCsv}
            className="flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-medium text-[#007AFF] dark:text-[#0A84FF] bg-blue-500/10 hover:bg-blue-500/15 active:scale-95 transition-all"
            title="Download CSV"
          >
            <Download className="w-3 h-3" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Grid Content */}
      <div className="flex-1 overflow-auto relative">
        <table className="w-full text-left border-collapse text-xs">
          <thead className="sticky top-0 z-10 bg-[#F7F7F9] dark:bg-[#1E1E20] border-b border-black/[0.08] dark:border-white/[0.1] shadow-xs">
            <tr>
              <th className="w-10 px-2.5 py-2 text-center text-[10px] font-semibold text-neutral-400 dark:text-neutral-500 select-none border-r border-black/[0.04] dark:border-white/[0.05]">
                #
              </th>
              {result.columns.map((col) => {
                const isSorted = sortConfig.key === col;
                return (
                  <th
                    key={col}
                    onClick={() => handleSort(col)}
                    className="px-3 py-2 font-semibold text-neutral-800 dark:text-neutral-200 cursor-pointer hover:bg-black/[0.03] dark:hover:bg-white/[0.05] transition-colors border-r border-black/[0.04] dark:border-white/[0.05] last:border-r-0 select-none"
                  >
                    <div className="flex items-center justify-between space-x-1">
                      <span className="font-mono text-[11px] truncate">{col}</span>
                      <span className="text-neutral-400">
                        {isSorted && sortConfig.direction === 'asc' && (
                          <ArrowUp className="w-3 h-3 text-[#007AFF]" />
                        )}
                        {isSorted && sortConfig.direction === 'desc' && (
                          <ArrowDown className="w-3 h-3 text-[#007AFF]" />
                        )}
                        {!isSorted && <ArrowUpDown className="w-2.5 h-2.5 opacity-30" />}
                      </span>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {sortedValues.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                className={`transition-colors hover:bg-blue-500/[0.06] dark:hover:bg-blue-500/[0.1] ${
                  rowIdx % 2 === 1
                    ? 'bg-black/[0.015] dark:bg-white/[0.015]'
                    : 'bg-transparent'
                }`}
              >
                <td className="px-2.5 py-1.5 text-center text-[10px] font-mono text-neutral-400 dark:text-neutral-500 border-r border-black/[0.04] dark:border-white/[0.05] select-none">
                  {rowIdx + 1}
                </td>
                {row.map((cell, cellIdx) => (
                  <td
                    key={cellIdx}
                    className="px-3 py-1.5 font-mono text-[11.5px] text-neutral-800 dark:text-neutral-200 border-r border-black/[0.04] dark:border-white/[0.05] last:border-r-0 truncate max-w-xs"
                    title={cell === null ? 'NULL' : String(cell)}
                  >
                    {cell === null ? (
                      <span className="text-neutral-400 italic font-sans text-[11px]">NULL</span>
                    ) : typeof cell === 'number' ? (
                      <span className="text-[#007AFF] dark:text-[#0A84FF]">{cell}</span>
                    ) : typeof cell === 'boolean' ? (
                      <span className="text-purple-600 dark:text-purple-400">
                        {cell ? 'true' : 'false'}
                      </span>
                    ) : (
                      <span>{String(cell)}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

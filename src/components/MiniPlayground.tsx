'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Play, Sparkles, ArrowRight, Table2, Clock, Check } from 'lucide-react';
import { sqlEngine } from '../services/sqlEngine';
import type { QueryResult } from '../types';

interface MiniPlaygroundProps {
  initialQuery?: string;
  headline?: string;
  ctaText?: string;
}

const DEFAULT_QUERY = `-- Try running this join query live in your browser:
SELECT 
  c.name AS customer, 
  c.city, 
  COUNT(o.id) AS orders_count, 
  SUM(o.total_amount) AS total_spent
FROM customers c
JOIN orders o ON c.id = o.customer_id
GROUP BY c.id
ORDER BY total_spent DESC;`;

export const MiniPlayground: React.FC<MiniPlaygroundProps> = ({
  initialQuery = DEFAULT_QUERY,
  headline = 'Interactive Live SQL Sandbox',
  ctaText = 'Open Full SQLite Studio IDE',
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [result, setResult] = useState<QueryResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    sqlEngine.init().then(() => {
      setIsReady(true);
      // Run initial query automatically for instant demo
      try {
        const res = sqlEngine.execute(initialQuery);
        setResult(res);
      } catch (e) {
        console.warn(e);
      }
    });
  }, [initialQuery]);

  const handleRun = () => {
    if (!isReady) return;
    setIsRunning(true);
    setTimeout(() => {
      const res = sqlEngine.execute(query);
      setResult(res);
      setIsRunning(false);
    }, 50);
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl bg-white/90 dark:bg-[#1C1C1E]/90 backdrop-blur-2xl border border-black/[0.08] dark:border-white/[0.12] shadow-2xl shadow-blue-500/5 overflow-hidden text-left">
      {/* Header bar */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-[#F2F2F7]/80 dark:bg-[#2C2C2E]/80 border-b border-black/[0.06] dark:border-white/[0.08]">
        <div className="flex items-center space-x-2.5">
          <div className="flex space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/10" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/10" />
            <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-black/10" />
          </div>
          <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 ml-2">
            {headline}
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium font-mono">
            SQLite WASM Active
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={handleRun}
            disabled={!isReady || isRunning}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white bg-[#007AFF] hover:bg-[#0062cc] active:scale-95 transition-all shadow-sm shadow-blue-500/20 disabled:opacity-50 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isRunning ? 'Running...' : 'Run Query'}</span>
          </button>
        </div>
      </div>

      {/* Editor & Output Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-black/[0.06] dark:divide-white/[0.08]">
        {/* SQL Input Area */}
        <div className="p-4 bg-white/50 dark:bg-[#161618]/50 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-2 font-mono">
              <span>SQL Editor</span>
              <span>Tables: customers, orders, products</span>
            </div>
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              rows={7}
              className="w-full bg-transparent resize-none font-mono text-xs text-neutral-900 dark:text-neutral-100 outline-none leading-relaxed selection:bg-[#007AFF]/20"
              spellCheck={false}
            />
          </div>

          <div className="pt-3 border-t border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between">
            <span className="text-[11px] text-neutral-400">Pure client-side WebAssembly</span>
            <div className="flex space-x-1">
              <button
                type="button"
                onClick={() =>
                  setQuery('SELECT name, category, unit_price, stock_quantity FROM products WHERE stock_quantity < 50;')
                }
                className="text-[10px] px-2 py-0.5 rounded-md bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] text-neutral-600 dark:text-neutral-300 font-mono transition-colors"
              >
                Products
              </button>
              <button
                type="button"
                onClick={() => setQuery(DEFAULT_QUERY)}
                className="text-[10px] px-2 py-0.5 rounded-md bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] text-neutral-600 dark:text-neutral-300 font-mono transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Results Output */}
        <div className="p-4 bg-[#F9F9FB]/80 dark:bg-[#121214]/80 flex flex-col justify-between min-h-[220px]">
          <div className="overflow-x-auto max-h-[190px]">
            {result?.error ? (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-mono">
                {result.error}
              </div>
            ) : result && result.columns.length > 0 ? (
              <table className="w-full text-left border-collapse text-xs font-mono">
                <thead>
                  <tr className="border-b border-black/[0.08] dark:border-white/[0.1] text-neutral-500 dark:text-neutral-400 text-[10px]">
                    {result.columns.map((col) => (
                      <th key={col} className="pb-1.5 pr-3 font-semibold">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.03] dark:divide-white/[0.03]">
                  {result.values.slice(0, 5).map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02]">
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="py-1.5 pr-3 truncate max-w-[120px]">
                          {String(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-8 text-neutral-400 text-xs">
                Executing query...
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400">
            {result ? (
              <span>
                {result.rowCount} row{result.rowCount === 1 ? '' : 's'} in {result.executionTimeMs} ms
              </span>
            ) : (
              <span>Ready</span>
            )}

            <Link
              href="/app"
              className="inline-flex items-center space-x-1 font-semibold text-[#007AFF] hover:underline"
            >
              <span>{ctaText}</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Play, Sparkles, ArrowRight, Table2, Clock, Check, X, Minus, Maximize2, Terminal, Code2, Database } from 'lucide-react';
import { sqlEngine } from '../services/sqlEngine';
import type { QueryResult } from '../types';

interface MiniPlaygroundProps {
  initialQuery?: string;
  headline?: string;
  ctaText?: string;
}

const DEFAULT_QUERY = `-- Online SQL Compiler — Run SQLite queries live in your browser:
SELECT 
  c.name AS customer, 
  c.city, 
  COUNT(o.id) AS orders_count, 
  SUM(o.total_amount) AS total_spent
FROM customers c
JOIN orders o ON c.id = o.customer_id
GROUP BY c.id
ORDER BY total_spent DESC;`;

const SCHEMA_SQL = `-- Preloaded SQLite In-Memory Database Schema:
CREATE TABLE customers (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  city TEXT
);

CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT,
  unit_price REAL,
  stock_quantity INTEGER
);

CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  customer_id INTEGER REFERENCES customers(id),
  order_date TEXT,
  total_amount REAL,
  status TEXT
);`;

export const MiniPlayground: React.FC<MiniPlaygroundProps> = ({
  initialQuery = DEFAULT_QUERY,
  headline = 'SQLite Studio — main.sql',
  ctaText = 'Open Full SQLite Studio IDE',
}) => {
  const [activeTab, setActiveTab] = useState<'editor' | 'schema'>('editor');
  const [query, setQuery] = useState(initialQuery);
  const [result, setResult] = useState<QueryResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    sqlEngine.init().then(() => {
      setIsReady(true);
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
    <div
      className={`w-full max-w-4xl mx-auto rounded-2xl sm:rounded-3xl bg-white/90 dark:bg-[#1C1C1E]/90 backdrop-blur-2xl border border-black/[0.08] dark:border-white/[0.12] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.18)] dark:shadow-[0_25px_70px_-15px_rgba(0,0,0,0.7)] overflow-hidden text-left transition-all duration-300 ${
        isExpanded ? 'ring-2 ring-[#007AFF]/40 scale-[1.01]' : ''
      }`}
    >
      {/* macOS MacBook Titlebar with Interactive Traffic Light Buttons */}
      <div className="flex items-center justify-between px-4 py-3 bg-neutral-100/80 dark:bg-[#2C2C2E]/80 backdrop-blur-md border-b border-black/[0.06] dark:border-white/[0.08] select-none">
        {/* Traffic Light Dots with hover icons */}
        <div className="flex items-center space-x-2 group">
          {/* Close button (Red) */}
          <button
            type="button"
            onClick={() => setQuery(DEFAULT_QUERY)}
            title="Reset code"
            className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] flex items-center justify-center text-[#4C0000] hover:brightness-95 active:brightness-90 transition-all cursor-pointer"
          >
            <X className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity stroke-[2.5]" />
          </button>

          {/* Minimize button (Yellow) */}
          <button
            type="button"
            onClick={() => setQuery('')}
            title="Clear editor"
            className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] flex items-center justify-center text-[#5D4200] hover:brightness-95 active:brightness-90 transition-all cursor-pointer"
          >
            <Minus className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity stroke-[2.5]" />
          </button>

          {/* Maximize / Zoom button (Green) */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            title={isExpanded ? 'Restore window size' : 'Expand window'}
            className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] flex items-center justify-center text-[#004D0A] hover:brightness-95 active:brightness-90 transition-all cursor-pointer"
          >
            <Maximize2 className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity stroke-[2.5]" />
          </button>

          {/* macOS Title Bar Tabs */}
          <div className="ml-3 flex items-center space-x-1">
            <button
              type="button"
              onClick={() => setActiveTab('editor')}
              className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'editor'
                  ? 'bg-white dark:bg-[#1C1C1E] text-neutral-900 dark:text-white shadow-xs font-semibold'
                  : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
              }`}
            >
              <Code2 className="w-3 h-3 text-[#007AFF]" />
              <span>main.sql</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('schema')}
              className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'schema'
                  ? 'bg-white dark:bg-[#1C1C1E] text-neutral-900 dark:text-white shadow-xs font-semibold'
                  : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
              }`}
            >
              <Database className="w-3 h-3 text-[#34C759]" />
              <span>schema.sql</span>
            </button>
          </div>
        </div>

        {/* Right action: Run Button & Status */}
        <div className="flex items-center space-x-2">
          <span className="hidden sm:inline-flex items-center space-x-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>SQLite 3 WASM</span>
          </span>

          {activeTab === 'editor' && (
            <button
              type="button"
              onClick={handleRun}
              disabled={!isReady || isRunning}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-[#007AFF] hover:bg-[#0062cc] active:scale-95 transition-all shadow-sm shadow-blue-500/25 disabled:opacity-50 cursor-pointer"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>{isRunning ? 'Compiling...' : 'Run Query'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Editor & Output Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-black/[0.06] dark:divide-white/[0.08]">
        {/* SQL Input Area */}
        <div className="p-4 bg-white/60 dark:bg-[#161618]/60 flex flex-col justify-between min-h-[260px]">
          <div>
            <div className="flex items-center justify-between text-xs text-neutral-400 dark:text-neutral-500 mb-2 font-mono">
              <span className="flex items-center space-x-1">
                <Terminal className="w-3 h-3" />
                <span>{activeTab === 'editor' ? 'Interactive SQL Editor' : 'Read-only Schema Definition'}</span>
              </span>
              <span className="text-[11px]">3 tables available</span>
            </div>

            {activeTab === 'editor' ? (
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                rows={8}
                className="w-full bg-transparent resize-none font-mono text-xs text-neutral-900 dark:text-neutral-100 outline-none leading-relaxed selection:bg-[#007AFF]/20"
                spellCheck={false}
                placeholder="Write your SQL query here..."
              />
            ) : (
              <pre className="w-full font-mono text-[11px] text-neutral-700 dark:text-neutral-300 leading-relaxed overflow-x-auto max-h-[200px]">
                {SCHEMA_SQL}
              </pre>
            )}
          </div>

          <div className="pt-3 border-t border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between">
            <span className="text-[11px] text-neutral-400 font-mono">
              {activeTab === 'editor' ? 'Press "Run Query" or Ctrl+Enter' : 'Tables: customers, orders, products'}
            </span>
            {activeTab === 'editor' && (
              <div className="flex space-x-1.5">
                <button
                  type="button"
                  onClick={() =>
                    setQuery('SELECT name, category, unit_price, stock_quantity FROM products WHERE stock_quantity < 50;')
                  }
                  className="text-[10px] px-2.5 py-1 rounded-lg bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] text-neutral-700 dark:text-neutral-300 font-medium transition-colors cursor-pointer"
                >
                  Low Stock
                </button>
                <button
                  type="button"
                  onClick={() => setQuery(DEFAULT_QUERY)}
                  className="text-[10px] px-2.5 py-1 rounded-lg bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] text-neutral-700 dark:text-neutral-300 font-medium transition-colors cursor-pointer"
                >
                  JOIN Demo
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Results Output */}
        <div className="p-4 bg-[#F9F9FB]/90 dark:bg-[#121214]/90 flex flex-col justify-between min-h-[260px]">
          <div className="overflow-x-auto max-h-[210px]">
            {result?.error ? (
              <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-mono">
                <span className="font-semibold block mb-1">SQL Execution Error:</span>
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
                  {result.values.slice(0, 6).map((row, rIdx) => (
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
              <div className="text-center py-12 text-neutral-400 text-xs">
                Executing query...
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400">
            {result ? (
              <span className="font-mono">
                {result.rowCount} row{result.rowCount === 1 ? '' : 's'} in {result.executionTimeMs} ms
              </span>
            ) : (
              <span className="font-mono">Ready</span>
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

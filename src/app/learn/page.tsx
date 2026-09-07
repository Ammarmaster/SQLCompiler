'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Code2,
  Database,
  ArrowRight,
  Terminal,
  Play,
  Layers,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Copy,
  Check,
} from 'lucide-react';
import { MacWindow } from '../../components/Ui/MacWindow';
import { ThemeToggle } from '../../components/Theme/ThemeToggle';
import { MiniPlayground } from '../../components/MiniPlayground';

interface Lesson {
  id: string;
  module: string;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  summary: string;
  syntax: string;
  interactiveSql: string;
  explanation: string;
  keyTakeaway: string;
}

const LESSONS: Lesson[] = [
  {
    id: 'select-and-filtering',
    module: 'Module 1: Foundations',
    title: 'Data Retrieval & Filtering (SELECT, WHERE, LIKE)',
    level: 'Beginner',
    summary:
      'Learn how to query specific columns, filter rows with conditional logic, and sort results.',
    syntax: `SELECT column1, column2
FROM table_name
WHERE condition
ORDER BY column1 ASC
LIMIT 10;`,
    interactiveSql: `-- Retrieve high-value customers from New York or San Francisco:
SELECT id, name, city, email
FROM customers
WHERE city IN ('New York', 'San Francisco')
ORDER BY name ASC;`,
    explanation:
      'The SELECT clause defines which fields to project, while WHERE filters rows before any grouping or sorting occurs. Combining IN, BETWEEN, and LIKE allows powerful text and numeric filtering.',
    keyTakeaway: 'Always project only the columns you need instead of SELECT * in production.',
  },
  {
    id: 'aggregations-and-grouping',
    module: 'Module 2: Aggregations',
    title: 'Summarization & Grouping (COUNT, SUM, GROUP BY, HAVING)',
    level: 'Beginner',
    summary:
      'Group rows into summary statistics and filter aggregated groups using the HAVING clause.',
    syntax: `SELECT category, COUNT(*), AVG(unit_price)
FROM products
GROUP BY category
HAVING COUNT(*) > 1;`,
    interactiveSql: `-- Calculate total revenue and order count per customer:
SELECT 
  c.name AS customer_name,
  COUNT(o.id) AS total_orders,
  ROUND(SUM(o.total_amount), 2) AS total_spent
FROM customers c
JOIN orders o ON c.id = o.customer_id
GROUP BY c.id
HAVING total_spent > 150
ORDER BY total_spent DESC;`,
    explanation:
      'WHERE filters individual rows before aggregation, whereas HAVING filters aggregated groups after the GROUP BY calculation.',
    keyTakeaway: 'Any column in the SELECT list that is not aggregated must be included in GROUP BY.',
  },
  {
    id: 'relational-joins',
    module: 'Module 3: Joins & Modeling',
    title: 'Relational Joins (INNER, LEFT, Self Joins)',
    level: 'Intermediate',
    summary:
      'Connect tables across foreign key relationships to reconstruct normalized data.',
    syntax: `SELECT A.col, B.col
FROM tableA A
INNER JOIN tableB B ON A.id = B.foreign_id;`,
    interactiveSql: `-- View all orders with customer contact and order date:
SELECT 
  o.id AS order_id,
  c.name AS customer_name,
  c.email,
  o.order_date,
  o.total_amount,
  o.status
FROM orders o
INNER JOIN customers c ON o.customer_id = c.id
ORDER BY o.order_date DESC;`,
    explanation:
      'INNER JOIN returns rows when there is a match in both tables. LEFT JOIN retains all rows from the left table even if no corresponding row exists on the right.',
    keyTakeaway: 'Index foreign key columns for optimal JOIN query performance.',
  },
  {
    id: 'ctes-and-conditional-logic',
    module: 'Module 4: Advanced Logic',
    title: 'Common Table Expressions (WITH) & CASE WHEN',
    level: 'Intermediate',
    summary:
      'Write modular, readable SQL queries using CTEs and conditional if-else branch expressions.',
    syntax: `WITH HighSpenders AS (
  SELECT customer_id, SUM(total_amount) AS spent
  FROM orders
  GROUP BY customer_id
)
SELECT * FROM HighSpenders;`,
    interactiveSql: `-- Segment customers into VIP tiers using CASE WHEN:
SELECT 
  c.name,
  SUM(o.total_amount) AS total_spent,
  CASE 
    WHEN SUM(o.total_amount) >= 500 THEN 'VIP Platinum'
    WHEN SUM(o.total_amount) >= 200 THEN 'Gold Tier'
    ELSE 'Standard'
  END AS customer_tier
FROM customers c
JOIN orders o ON c.id = o.customer_id
GROUP BY c.id
ORDER BY total_spent DESC;`,
    explanation:
      'CTEs (`WITH`) break down monolithic subqueries into readable logical steps. CASE WHEN provides declarative branching directly in the SQL engine.',
    keyTakeaway: 'CTEs drastically improve query maintainability and teamwork readability.',
  },
  {
    id: 'window-functions',
    module: 'Module 5: Window Functions',
    title: 'Window Functions (ROW_NUMBER, RANK, DENSE_RANK, LEAD/LAG)',
    level: 'Advanced',
    summary:
      'Perform calculations across a set of table rows that are related to the current row without collapsing them.',
    syntax: `SELECT 
  name, 
  category, 
  unit_price,
  DENSE_RANK() OVER (PARTITION BY category ORDER BY unit_price DESC) as rnk
FROM products;`,
    interactiveSql: `-- Rank products by price within each category:
SELECT 
  name, 
  category, 
  unit_price,
  ROW_NUMBER() OVER (PARTITION BY category ORDER BY unit_price DESC) as rank_in_cat
FROM products;`,
    explanation:
      'Unlike GROUP BY, window functions do not collapse rows. The `OVER (PARTITION BY ... ORDER BY ...)` syntax computes rankings, moving averages, and cumulative totals while preserving row granularity.',
    keyTakeaway: 'Window functions are the #1 most tested topic in FAANG SQL technical interviews.',
  },
];

export default function LearnPage() {
  const [selectedLesson, setSelectedLesson] = useState<Lesson>(LESSONS[0]);
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-full flex flex-col bg-[#F2F2F7] dark:bg-[#000000] text-neutral-900 dark:text-neutral-100 transition-colors duration-200">
      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full px-4 sm:px-6 py-3 bg-white/80 dark:bg-[#1C1C1E]/80 backdrop-blur-2xl border-b border-black/[0.06] dark:border-white/[0.08]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="w-8 h-8 rounded-[9px] overflow-hidden shadow-sm shadow-blue-500/20 group-hover:scale-105 transition-transform border border-black/10 dark:border-white/10">
                <img src="/app-icon.jpg" alt="SQLite Studio Icon" className="w-full h-full object-cover" />
              </div>
              <div className="flex items-baseline space-x-1.5">
                <span className="font-bold text-sm tracking-tight text-neutral-900 dark:text-white">
                  SQLite Studio
                </span>
                <span className="text-[10px] font-semibold text-[#007AFF] bg-blue-500/10 px-2 py-0.5 rounded-full">
                  Interactive Learning
                </span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center space-x-4 text-xs font-medium pl-4 text-neutral-600 dark:text-neutral-300">
              <Link href="/app" className="hover:text-[#007AFF] transition-colors">
                IDE
              </Link>
              <Link href="/mock-interview" className="hover:text-[#007AFF] transition-colors font-semibold text-purple-600 dark:text-purple-400">
                Mock Interview
              </Link>
              <Link href="/sql-compiler-online" className="hover:text-[#007AFF] transition-colors">
                Compiler
              </Link>
              <Link href="/docs" className="hover:text-[#007AFF] transition-colors">
                Cheatsheet
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/mock-interview"
              className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-purple-600 dark:text-purple-400 bg-purple-500/10 hover:bg-purple-500/20 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Practice FAANG Interviews</span>
            </Link>

            <ThemeToggle showLabel={false} />
          </div>
        </div>
      </header>

      {/* Main Learning Hub Layout */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 space-y-12">
        {/* Hero Section */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#007AFF]">
            Interactive SQL Curriculum
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Master Relational SQL from Basics to Window Functions
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
            Step-by-step interactive lessons with live in-browser execution. Learn real ANSI SQL syntax tested by engineering teams worldwide.
          </p>
        </div>

        {/* 2-Column Curriculum View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Module Selector Sidebar */}
          <div className="lg:col-span-4 space-y-3">
            <h2 className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider px-2">
              Syllabus Modules
            </h2>

            <div className="space-y-2">
              {LESSONS.map((lesson) => {
                const isSelected = selectedLesson.id === lesson.id;
                return (
                  <button
                    key={lesson.id}
                    type="button"
                    onClick={() => setSelectedLesson(lesson)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white dark:bg-[#1C1C1E] border-[#007AFF] shadow-md ring-2 ring-[#007AFF]/20'
                        : 'bg-white/70 dark:bg-[#1C1C1E]/60 border-black/[0.06] dark:border-white/[0.08] hover:bg-white dark:hover:bg-[#1C1C1E]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 mb-1">
                      <span>{lesson.module}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full font-semibold ${
                          lesson.level === 'Beginner'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                            : lesson.level === 'Intermediate'
                            ? 'bg-blue-500/10 text-[#007AFF]'
                            : 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
                        }`}
                      >
                        {lesson.level}
                      </span>
                    </div>

                    <h3 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white leading-snug">
                      {lesson.title}
                    </h3>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Lesson Content & Live Playground */}
          <div className="lg:col-span-8 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1C1C1E] border border-black/[0.06] dark:border-white/[0.08] shadow-sm space-y-5">
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-[#007AFF] font-mono">
                  {selectedLesson.module}
                </span>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                  {selectedLesson.title}
                </h2>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed pt-1">
                  {selectedLesson.summary}
                </p>
              </div>

              {/* Syntax Card */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 flex items-center space-x-1.5">
                  <Code2 className="w-3.5 h-3.5 text-[#007AFF]" />
                  <span>Standard SQL Syntax Blueprint</span>
                </span>
                <pre className="p-3.5 rounded-2xl bg-black/[0.03] dark:bg-black/40 border border-black/[0.06] dark:border-white/[0.08] font-mono text-xs text-neutral-800 dark:text-neutral-200 overflow-x-auto leading-relaxed">
                  {selectedLesson.syntax}
                </pre>
              </div>

              {/* In-Depth Explanation */}
              <div className="space-y-2 text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                <p>{selectedLesson.explanation}</p>
                <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-[#007AFF] font-medium flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>
                    <strong>Pro Tip:</strong> {selectedLesson.keyTakeaway}
                  </span>
                </div>
              </div>
            </div>

            {/* Live Interactive Playground for this Lesson */}
            <div className="space-y-2">
              <div className="flex items-center justify-between px-2">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                  Live Interactive Exercise
                </span>
                <Link
                  href="/mock-interview"
                  className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline inline-flex items-center space-x-1"
                >
                  <span>Test in Mock Interview</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <MiniPlayground
                key={selectedLesson.id}
                initialQuery={selectedLesson.interactiveSql}
                headline={`SQLite Studio — ${selectedLesson.id}.sql`}
                ctaText="Open in Full IDE"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-black/[0.06] dark:border-white/[0.08] text-center text-xs text-neutral-500 space-y-2">
        <p>
          Interactive SQL Curriculum created by{' '}
          <strong className="text-neutral-700 dark:text-neutral-300">Ammar Master (Jalaluddin Master)</strong> at{' '}
          <a href="https://prodevopz.jobsio.in" className="text-[#007AFF] hover:underline font-semibold" target="_blank" rel="noopener noreferrer">
            ProDevOpz
          </a>
          .
        </p>
        <p>© 2026 ProDevOpz. All rights reserved.</p>
      </footer>
    </div>
  );
}

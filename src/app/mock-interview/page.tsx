'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Play,
  CheckCircle2,
  XCircle,
  Clock,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Database,
  Terminal,
  RotateCcw,
  Check,
  ChevronRight,
  Filter,
  Building2,
  Award,
  Lightbulb,
  Code2,
} from 'lucide-react';
import { sqlEngine } from '../../services/sqlEngine';
import type { QueryResult } from '../../types';
import { MacWindow } from '../../components/Ui/MacWindow';
import { ThemeToggle } from '../../components/Theme/ThemeToggle';

interface Question {
  id: string;
  title: string;
  company: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  schemaInfo: string;
  initialQuery: string;
  solutionQuery: string;
  hint: string;
  explanation: string;
}

const MOCK_QUESTIONS: Question[] = [
  {
    id: 'second-highest-salary',
    title: 'Second Highest Salary',
    company: 'Amazon / Meta',
    difficulty: 'Medium',
    description:
      'Write a SQL query to find the second highest salary from the employees table. If there is no second highest salary, return NULL.',
    schemaInfo: 'Table: employees (id INT, name TEXT, department TEXT, salary INT)',
    initialQuery: `-- Amazon & Meta Interview Question:
-- Find the second highest salary from the employees table.
SELECT salary AS SecondHighestSalary
FROM employees
-- Write your logic below:
ORDER BY salary DESC
LIMIT 1 OFFSET 1;`,
    solutionQuery: `SELECT MAX(salary) AS SecondHighestSalary
FROM employees
WHERE salary < (SELECT MAX(salary) FROM employees);`,
    hint: 'Use a subquery to find salaries strictly less than the maximum salary, then get the MAX of that set.',
    explanation:
      'In a FAANG interview, using `WHERE salary < (SELECT MAX(salary))` handles duplicate salaries cleanly and naturally returns NULL if fewer than two distinct salaries exist.',
  },
  {
    id: 'top-spending-customers',
    title: 'Top Customer Spending by City',
    company: 'Stripe / Shopify',
    difficulty: 'Medium',
    description:
      'Find the customer in each city who has spent the highest total amount across all orders. Return city, customer name, and total spent.',
    schemaInfo: 'Tables: customers (id, name, city), orders (id, customer_id, total_amount)',
    initialQuery: `-- Stripe Interview Question:
-- Find the highest-spending customer in each city.
SELECT 
  c.city, 
  c.name AS customer_name, 
  SUM(o.total_amount) AS total_spent
FROM customers c
JOIN orders o ON c.id = o.customer_id
GROUP BY c.city, c.name
ORDER BY total_spent DESC;`,
    solutionQuery: `WITH customer_spend AS (
  SELECT 
    c.city, 
    c.name AS customer_name, 
    SUM(o.total_amount) AS total_spent,
    DENSE_RANK() OVER (PARTITION BY c.city ORDER BY SUM(o.total_amount) DESC) as rnk
  FROM customers c
  JOIN orders o ON c.id = o.customer_id
  GROUP BY c.city, c.name
)
SELECT city, customer_name, total_spent
FROM customer_spend
WHERE rnk = 1;`,
    hint: 'Use a Common Table Expression (WITH) with DENSE_RANK() OVER (PARTITION BY c.city ORDER BY ...) to rank within each city.',
    explanation:
      'Window functions like DENSE_RANK() allow you to partition by geographic region or category and filter for rank = 1, handling ties gracefully.',
  },
  {
    id: 'department-avg-vs-company',
    title: 'Department Salary vs Company Average',
    company: 'Apple / Google',
    difficulty: 'Medium',
    description:
      'For each employee, return their name, department, salary, and the difference between their salary and the overall company-wide average salary (rounded to 2 decimal places).',
    schemaInfo: 'Table: employees (id, name, department, salary)',
    initialQuery: `-- Apple & Google Interview Question:
-- Compare each employee's salary to the company average.
SELECT 
  name, 
  department, 
  salary,
  ROUND(salary - (SELECT AVG(salary) FROM employees), 2) AS diff_from_avg
FROM employees
ORDER BY salary DESC;`,
    solutionQuery: `SELECT 
  name, 
  department, 
  salary,
  ROUND(salary - AVG(salary) OVER (), 2) AS diff_from_avg
FROM employees
ORDER BY salary DESC;`,
    hint: 'Use the window function AVG(salary) OVER () to compute the global average without collapsing individual employee rows.',
    explanation:
      'Using `AVG(salary) OVER ()` is more performant and cleaner in modern SQL than running a correlated subquery in the SELECT list.',
  },
  {
    id: 'consecutive-active-days',
    title: 'Users with Consecutive Activity',
    company: 'Uber / Netflix',
    difficulty: 'Hard',
    description:
      'Find all user IDs who logged in for at least 2 consecutive days. Return distinct user_id ordered ascending.',
    schemaInfo: 'Table: user_logins (user_id INT, login_date DATE)',
    initialQuery: `-- Uber Interview Question:
-- Find users who logged in for consecutive days.
SELECT DISTINCT l1.user_id
FROM user_logins l1
JOIN user_logins l2 ON l1.user_id = l2.user_id
  AND DATE(l1.login_date, '+1 day') = l2.login_date
ORDER BY l1.user_id;`,
    solutionQuery: `SELECT DISTINCT l1.user_id
FROM user_logins l1
JOIN user_logins l2 ON l1.user_id = l2.user_id
  AND DATE(l1.login_date, '+1 day') = l2.login_date
ORDER BY l1.user_id;`,
    hint: 'Perform a self-join on user_id where DATE(login_date, "+1 day") matches the second login date.',
    explanation:
      'Self-joins with date arithmetic are standard in retention and cohort analysis questions for mobility and streaming platforms.',
  },
  {
    id: 'inventory-reorder-alert',
    title: 'Low Stock Products by Category',
    company: 'Amazon',
    difficulty: 'Easy',
    description:
      'Identify products that have a stock quantity below 40 units. Return product name, category, stock_quantity, and unit_price sorted by stock_quantity ascending.',
    schemaInfo: 'Table: products (id, name, category, unit_price, stock_quantity)',
    initialQuery: `-- Amazon Interview Question:
-- Identify low inventory stock items:
SELECT name, category, stock_quantity, unit_price
FROM products
WHERE stock_quantity < 40
ORDER BY stock_quantity ASC;`,
    solutionQuery: `SELECT name, category, stock_quantity, unit_price
FROM products
WHERE stock_quantity < 40
ORDER BY stock_quantity ASC;`,
    hint: 'Simple WHERE clause filtering on stock_quantity with an ORDER BY clause.',
    explanation:
      'Warm-up question testing syntax precision, correct column projection, and ascending sort order.',
  },
  {
    id: 'order-status-breakdown',
    title: 'Monthly Order Revenue Breakdown',
    company: 'Meta / Stripe',
    difficulty: 'Medium',
    description:
      'Calculate the total revenue, total number of orders, and average order value for each order status (e.g. completed, pending, cancelled).',
    schemaInfo: 'Table: orders (id, customer_id, order_date, total_amount, status)',
    initialQuery: `-- Stripe Interview Question:
-- Revenue metrics grouped by order status.
SELECT 
  status,
  COUNT(id) AS total_orders,
  ROUND(SUM(total_amount), 2) AS total_revenue,
  ROUND(AVG(total_amount), 2) AS avg_order_value
FROM orders
GROUP BY status
ORDER BY total_revenue DESC;`,
    solutionQuery: `SELECT 
  status,
  COUNT(id) AS total_orders,
  ROUND(SUM(total_amount), 2) AS total_revenue,
  ROUND(AVG(total_amount), 2) AS avg_order_value
FROM orders
GROUP BY status
ORDER BY total_revenue DESC;`,
    hint: 'Group by status and use COUNT, SUM, and AVG aggregates with ROUND.',
    explanation:
      'Standard financial reporting query testing aggregate functions, grouping, and rounding decimals.',
  },
];

export default function MockInterviewPage() {
  const [selectedQuestion, setSelectedQuestion] = useState<Question>(MOCK_QUESTIONS[0]);
  const [code, setCode] = useState<string>(MOCK_QUESTIONS[0].initialQuery);
  const [userResult, setUserResult] = useState<QueryResult | null>(null);
  const [testStatus, setTestStatus] = useState<'idle' | 'running' | 'passed' | 'failed'>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [filterDifficulty, setFilterDifficulty] = useState<string>('All');
  const [solvedQuestions, setSolvedQuestions] = useState<Record<string, boolean>>({});

  // Interview Countdown Timer (30 minutes)
  const [timeLeft, setTimeLeft] = useState<number>(30 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  useEffect(() => {
    sqlEngine.init().then(() => {
      // Pre-seed mock interview tables: employees & user_logins
      try {
        sqlEngine.execute(`
          CREATE TABLE IF NOT EXISTS employees (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            department TEXT NOT NULL,
            salary INTEGER NOT NULL,
            hire_date TEXT
          );

          INSERT OR IGNORE INTO employees (id, name, department, salary, hire_date) VALUES
            (1, 'Alice Chen', 'Engineering', 145000, '2021-03-15'),
            (2, 'Bob Martinez', 'Engineering', 132000, '2020-07-10'),
            (3, 'Charlie Dave', 'Product', 125000, '2022-01-20'),
            (4, 'Diana Prince', 'Engineering', 160000, '2019-11-05'),
            (5, 'Evan Wright', 'Marketing', 95000, '2023-04-12'),
            (6, 'Fiona Gallagher', 'Product', 110000, '2022-09-01'),
            (7, 'George Clark', 'Marketing', 98000, '2021-08-15');

          CREATE TABLE IF NOT EXISTS user_logins (
            id INTEGER PRIMARY KEY,
            user_id INTEGER NOT NULL,
            login_date TEXT NOT NULL
          );

          INSERT OR IGNORE INTO user_logins (id, user_id, login_date) VALUES
            (1, 101, '2026-09-01'),
            (2, 101, '2026-09-02'),
            (3, 101, '2026-09-05'),
            (4, 102, '2026-09-01'),
            (5, 102, '2026-09-03'),
            (6, 103, '2026-09-02'),
            (7, 103, '2026-09-03'),
            (8, 103, '2026-09-04'),
            (9, 104, '2026-09-05');
        `);
      } catch (e) {
        console.warn(e);
      }
    });
  }, []);

  // Timer Tick
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectQuestion = (q: Question) => {
    setSelectedQuestion(q);
    setCode(q.initialQuery);
    setUserResult(null);
    setTestStatus('idle');
    setStatusMessage('');
    setShowHint(false);
    setShowSolution(false);
  };

  const handleRun = () => {
    try {
      const res = sqlEngine.execute(code);
      setUserResult(res);
      setTestStatus('idle');
      setStatusMessage('');
    } catch (e: any) {
      setUserResult({
        statement: code,
        executedAt: new Date(),
        columns: [],
        values: [],
        rowCount: 0,
        executionTimeMs: 0,
        error: e.message || 'Error executing query',
      });
    }
  };

  const handleSubmitVerify = () => {
    setTestStatus('running');
    setTimeout(() => {
      try {
        const userRes = sqlEngine.execute(code);
        const expectedRes = sqlEngine.execute(selectedQuestion.solutionQuery);
        setUserResult(userRes);

        if (userRes.error) {
          setTestStatus('failed');
          setStatusMessage(`SQL Error: ${userRes.error}`);
          return;
        }

        // Validate Row Count
        if (userRes.values.length !== expectedRes.values.length) {
          setTestStatus('failed');
          setStatusMessage(
            `Row count mismatch. Expected ${expectedRes.values.length} rows, but your query returned ${userRes.values.length} rows.`
          );
          return;
        }

        // Validate Column Count
        if (userRes.columns.length !== expectedRes.columns.length) {
          setTestStatus('failed');
          setStatusMessage(
            `Column count mismatch. Expected ${expectedRes.columns.length} columns, but your query returned ${userRes.columns.length} columns.`
          );
          return;
        }

        // Stringify values comparison for dataset match
        const userStr = JSON.stringify(userRes.values);
        const expectedStr = JSON.stringify(expectedRes.values);

        if (userStr === expectedStr) {
          setTestStatus('passed');
          setStatusMessage('🎉 Accepted! Your SQL output matches all test cases perfectly.');
          setSolvedQuestions((prev) => ({ ...prev, [selectedQuestion.id]: true }));
        } else {
          setTestStatus('failed');
          setStatusMessage('❌ Incorrect Output: Result values do not match the expected dataset.');
        }
      } catch (err: any) {
        setTestStatus('failed');
        setStatusMessage(`Verification Error: ${err.message || 'Unknown error'}`);
      }
    }, 150);
  };

  const filteredQuestions = MOCK_QUESTIONS.filter((q) => {
    if (filterDifficulty === 'All') return true;
    return q.difficulty === filterDifficulty;
  });

  const solvedCount = Object.keys(solvedQuestions).length;

  return (
    <div className="min-h-full flex flex-col bg-[#F2F2F7] dark:bg-[#000000] text-neutral-900 dark:text-neutral-100 transition-colors duration-200">
      {/* Top macOS Sequoia Header */}
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
                <span className="text-[10px] font-semibold text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full">
                  Mock Interview Mode
                </span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center space-x-4 text-xs font-medium pl-4 text-neutral-600 dark:text-neutral-300">
              <Link href="/app" className="hover:text-[#007AFF] transition-colors">
                IDE
              </Link>
              <Link href="/learn" className="hover:text-[#007AFF] transition-colors">
                Learn SQL
              </Link>
              <Link href="/sql-compiler-online" className="hover:text-[#007AFF] transition-colors">
                Compiler
              </Link>
              <Link href="/docs" className="hover:text-[#007AFF] transition-colors">
                Cheatsheet
              </Link>
            </nav>
          </div>

          {/* Right Header Widgets: Timer, Score, Theme Toggle */}
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            {/* Interview Countdown Timer */}
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.08] text-xs font-mono">
              <Clock className="w-3.5 h-3.5 text-[#007AFF]" />
              <span className="font-semibold">{formatTime(timeLeft)}</span>
              <button
                type="button"
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="text-[10px] px-1.5 py-0.5 rounded-md bg-[#007AFF]/15 text-[#007AFF] hover:bg-[#007AFF]/25 font-semibold transition-colors cursor-pointer ml-1"
              >
                {isTimerRunning ? 'Pause' : 'Start'}
              </button>
            </div>

            {/* Score Tracker */}
            <div className="hidden sm:flex items-center space-x-1 text-xs font-semibold px-2.5 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <Award className="w-3.5 h-3.5" />
              <span>
                {solvedCount} / {MOCK_QUESTIONS.length} Solved
              </span>
            </div>

            {/* Pure OLED Theme Toggle */}
            <ThemeToggle showLabel={false} />
          </div>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Question Navigator */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-wider flex items-center space-x-1.5">
                <Building2 className="w-4 h-4 text-[#007AFF]" />
                <span>FAANG Questions</span>
              </h2>

              {/* Difficulty Filter */}
              <div className="flex items-center space-x-1 text-xs">
                {['All', 'Easy', 'Medium', 'Hard'].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setFilterDifficulty(d)}
                    className={`px-2 py-0.5 rounded-lg text-[11px] font-medium transition-colors cursor-pointer ${
                      filterDifficulty === d
                        ? 'bg-[#007AFF] text-white font-semibold'
                        : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Question Cards List */}
            <div className="space-y-2.5 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
              {filteredQuestions.map((q) => {
                const isSelected = selectedQuestion.id === q.id;
                const isSolved = !!solvedQuestions[q.id];

                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => handleSelectQuestion(q)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white dark:bg-[#1C1C1E] border-[#007AFF] shadow-md ring-2 ring-[#007AFF]/20'
                        : 'bg-white/70 dark:bg-[#1C1C1E]/60 border-black/[0.06] dark:border-white/[0.08] hover:bg-white dark:hover:bg-[#1C1C1E]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-semibold text-neutral-500 dark:text-neutral-400 font-mono">
                        {q.company}
                      </span>
                      <div className="flex items-center space-x-1.5">
                        {isSolved && (
                          <span className="text-emerald-500 flex items-center text-[10px] font-semibold">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </span>
                        )}
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                            q.difficulty === 'Easy'
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                              : q.difficulty === 'Medium'
                              ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                              : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                          }`}
                        >
                          {q.difficulty}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xs font-bold text-neutral-900 dark:text-white leading-snug">
                      {q.title}
                    </h3>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Problem Description, Editor & Test Case Verification */}
          <div className="lg:col-span-8 space-y-5">
            {/* Problem Overview Card */}
            <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#1C1C1E] border border-black/[0.06] dark:border-white/[0.08] shadow-sm space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-[#007AFF]">
                    {selectedQuestion.company}
                  </span>
                  <h1 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white">
                    {selectedQuestion.title}
                  </h1>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowHint(!showHint)}
                    className="inline-flex items-center space-x-1 text-xs font-medium text-amber-600 dark:text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 px-2.5 py-1 rounded-xl transition-colors cursor-pointer"
                  >
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>{showHint ? 'Hide Hint' : 'Hint'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowSolution(!showSolution)}
                    className="inline-flex items-center space-x-1 text-xs font-medium text-purple-600 dark:text-purple-400 bg-purple-500/10 hover:bg-purple-500/20 px-2.5 py-1 rounded-xl transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{showSolution ? 'Hide Solution' : 'Solution'}</span>
                  </button>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {selectedQuestion.description}
              </p>

              <div className="p-3 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.06] text-xs font-mono text-neutral-500 dark:text-neutral-400">
                <span className="font-semibold text-neutral-700 dark:text-neutral-300">Schema: </span>
                {selectedQuestion.schemaInfo}
              </div>

              {/* Hint Box */}
              {showHint && (
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-300 space-y-1">
                  <span className="font-bold flex items-center space-x-1">
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>Interview Hint:</span>
                  </span>
                  <p className="leading-relaxed">{selectedQuestion.hint}</p>
                </div>
              )}

              {/* Solution Box */}
              {showSolution && (
                <div className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-900 dark:text-purple-300 space-y-2">
                  <span className="font-bold flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Optimal FAANG Solution:</span>
                  </span>
                  <pre className="font-mono text-[11px] bg-black/10 dark:bg-black/30 p-2.5 rounded-xl overflow-x-auto">
                    {selectedQuestion.solutionQuery}
                  </pre>
                  <p className="text-[11px] leading-relaxed text-purple-800 dark:text-purple-300">
                    {selectedQuestion.explanation}
                  </p>
                </div>
              )}
            </div>

            {/* macOS Window Code Editor & Test Case Verification */}
            <MacWindow
              title={`interview_solution.sql — ${selectedQuestion.title}`}
              subtitle="SQLite 3 WASM"
              headerRight={
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={handleRun}
                    className="flex items-center space-x-1 px-3 py-1 rounded-xl text-xs font-semibold text-neutral-700 dark:text-neutral-300 bg-black/[0.05] dark:bg-white/[0.08] hover:bg-black/[0.1] active:scale-95 transition-all cursor-pointer"
                  >
                    <Play className="w-3 h-3 fill-current text-blue-500" />
                    <span>Run Query</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSubmitVerify}
                    className="flex items-center space-x-1.5 px-3.5 py-1 rounded-xl text-xs font-semibold text-white bg-[#007AFF] hover:bg-[#0062cc] active:scale-95 transition-all shadow-sm shadow-blue-500/30 cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Submit &amp; Verify</span>
                  </button>
                </div>
              }
            >
              <div className="p-4 bg-white/50 dark:bg-[#161618]/50">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  rows={8}
                  className="w-full bg-transparent resize-none font-mono text-xs text-neutral-900 dark:text-neutral-100 outline-none leading-relaxed selection:bg-[#007AFF]/25"
                  spellCheck={false}
                />
              </div>

              {/* Status Message Banner */}
              {statusMessage && (
                <div
                  className={`px-4 py-2.5 border-t text-xs font-medium flex items-center space-x-2 ${
                    testStatus === 'passed'
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                      : testStatus === 'failed'
                      ? 'bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400'
                      : 'bg-blue-500/10 border-blue-500/20 text-[#007AFF]'
                  }`}
                >
                  {testStatus === 'passed' ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                  ) : testStatus === 'failed' ? (
                    <XCircle className="w-4 h-4 shrink-0" />
                  ) : (
                    <Sparkles className="w-4 h-4 shrink-0 animate-spin" />
                  )}
                  <span>{statusMessage}</span>
                </div>
              )}

              {/* Results Data Grid */}
              <div className="p-4 bg-[#F9F9FB]/80 dark:bg-[#121214]/80 border-t border-black/[0.06] dark:border-white/[0.08] min-h-[160px]">
                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-2">
                  <span>Output Grid</span>
                  {userResult && (
                    <span>
                      {userResult.rowCount} rows • {userResult.executionTimeMs} ms
                    </span>
                  )}
                </div>

                <div className="overflow-x-auto max-h-[180px]">
                  {userResult?.error ? (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-mono">
                      {userResult.error}
                    </div>
                  ) : userResult && userResult.columns.length > 0 ? (
                    <table className="w-full text-left border-collapse text-xs font-mono">
                      <thead>
                        <tr className="border-b border-black/[0.08] dark:border-white/[0.1] text-neutral-500 text-[10px]">
                          {userResult.columns.map((col) => (
                            <th key={col} className="pb-1.5 pr-4 font-semibold">
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-black/[0.03] dark:divide-white/[0.03]">
                        {userResult.values.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02]">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="py-1.5 pr-4 truncate max-w-[140px]">
                                {String(cell)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="text-center py-8 text-neutral-400 text-xs">
                      Run your query or click "Submit &amp; Verify" to test your solution.
                    </div>
                  )}
                </div>
              </div>
            </MacWindow>
          </div>
        </div>
      </main>
    </div>
  );
}

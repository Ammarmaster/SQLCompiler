import type { Metadata } from 'next';
import Link from 'next/link';
import { Database, ArrowLeft, ArrowRight, Terminal, Clock, Calendar, BookOpen } from 'lucide-react';
import { MiniPlayground } from '../../../components/MiniPlayground';

export const metadata: Metadata = {
  title: 'How to Write a SQL JOIN — Step-by-Step with Live Examples',
  description:
    'Learn how to write SQL JOIN queries with live interactive examples. Master INNER JOIN, LEFT JOIN, and multi-table joins using our online SQL compiler.',
  alternates: {
    canonical: 'https://sqlitestudio.app/blog/how-to-write-sql-join',
  },
};

export default function SqlJoinArticle() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How to Write a SQL JOIN — Step-by-Step with Live Examples',
    description:
      'Learn how to write SQL JOIN queries with live interactive examples. Master INNER JOIN, LEFT JOIN, and multi-table joins using our online SQL compiler.',
    author: {
      '@type': 'Organization',
      name: 'SQLite Studio Team',
    },
    datePublished: '2026-09-01',
    publisher: {
      '@type': 'Organization',
      name: 'SQLite Studio',
      logo: {
        '@type': 'ImageObject',
        url: 'https://sqlitestudio.app/favicon.svg',
      },
    },
  };

  return (
    <div className="min-h-full flex flex-col bg-[#F2F2F7] dark:bg-[#000000] text-neutral-900 dark:text-neutral-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <header className="sticky top-0 z-40 w-full px-6 py-3.5 bg-white/80 dark:bg-[#1C1C1E]/80 backdrop-blur-xl border-b border-black/[0.06] dark:border-white/[0.08]">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/blog" className="inline-flex items-center space-x-1.5 text-xs font-semibold text-neutral-600 dark:text-neutral-300 hover:text-[#007AFF]">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Tutorials</span>
          </Link>
          <Link
            href="/app"
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white bg-[#007AFF] hover:bg-[#0062cc] transition-all"
          >
            <Terminal className="w-3 h-3" />
            <span>Launch Studio</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto px-6 py-12 space-y-8">
        <article className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-xs text-neutral-400">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-[#007AFF] font-semibold">
                SQL Tutorial
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>6 min read</span>
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-tight">
              How to Write a SQL JOIN — With Live Runnable Examples
            </h1>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
              Relational databases store information across multiple normalized tables. In this guide, you will learn how to connect those tables using SQL <code className="font-mono text-[#007AFF]">JOIN</code> statements, with live interactive queries you can run right here.
            </p>
          </div>

          {/* Section 1 */}
          <section className="space-y-3 pt-4">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
              1. What is an INNER JOIN?
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
              An <strong className="text-neutral-900 dark:text-white">INNER JOIN</strong> returns rows when there is at least one match in both tables based on a foreign key relationship. If a customer has no orders, they will not appear in an INNER JOIN with orders.
            </p>
            <div className="p-4 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.05] dark:border-white/[0.08] font-mono text-xs">
              <pre className="text-[#007AFF]">
{`SELECT customers.name, orders.total_amount
FROM customers
INNER JOIN orders ON customers.id = orders.customer_id;`}
              </pre>
            </div>
          </section>

          {/* Live Sandbox 1 */}
          <div className="py-2">
            <MiniPlayground
              initialQuery={`-- Try this INNER JOIN query:
SELECT 
  c.name AS customer_name, 
  o.id AS order_id, 
  o.total_amount, 
  o.status
FROM customers c
INNER JOIN orders o ON c.id = o.customer_id;`}
              headline="Live INNER JOIN Sandbox"
            />
          </div>

          {/* Section 2 */}
          <section className="space-y-3 pt-4">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
              2. What is a LEFT JOIN?
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
              A <strong className="text-neutral-900 dark:text-white">LEFT JOIN</strong> (or LEFT OUTER JOIN) returns all rows from the left table, and matching rows from the right table. If there is no match, NULL values are returned for columns of the right table.
            </p>
          </section>

          {/* Live Sandbox 2 */}
          <div className="py-2">
            <MiniPlayground
              initialQuery={`-- LEFT JOIN includes customers even if they haven't ordered:
SELECT 
  c.name, 
  c.city, 
  COUNT(o.id) AS order_count,
  COALESCE(SUM(o.total_amount), 0.0) AS total_spent
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
GROUP BY c.id;`}
              headline="Live LEFT JOIN & Aggregate Sandbox"
            />
          </div>

          {/* Section 3: Multi-table joins */}
          <section className="space-y-3 pt-4">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
              3. Multi-Table JOINs
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
              In real-world applications, data often spans 3 or more tables. For example, connecting an order to its line items, and each line item to its product catalog details.
            </p>
          </section>

          <div className="p-6 rounded-3xl bg-blue-500/10 border border-blue-500/20 text-center space-y-3">
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">
              Ready for Full Dual-Pane SQL Editing?
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-sm mx-auto">
              Launch SQLite Studio to view table relationships on an interactive ER diagram and execute queries line by line.
            </p>
            <Link
              href="/app"
              className="inline-flex items-center space-x-1.5 px-5 py-2 rounded-xl text-xs font-semibold text-white bg-[#007AFF] hover:bg-[#0062cc] transition-all shadow-md shadow-blue-500/20"
            >
              <span>Open Full SQLite Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </article>
      </main>

      <footer className="px-6 py-8 border-t border-black/[0.06] dark:border-white/[0.08] text-center text-xs text-neutral-500">
        <p>© 2026 SQLite Studio. Free Online SQL Compiler & Tutorial Hub.</p>
      </footer>
    </div>
  );
}

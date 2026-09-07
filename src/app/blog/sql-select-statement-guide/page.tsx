import type { Metadata } from 'next';
import Link from 'next/link';
import { Database, ArrowLeft, ArrowRight, Terminal, Clock } from 'lucide-react';
import { MiniPlayground } from '../../../components/MiniPlayground';

export const metadata: Metadata = {
  title: 'SQL SELECT Statement Explained — Interactive Syntax Guide & Examples',
  description:
    'Master the SQL SELECT query with live interactive examples. Learn WHERE filtering, ORDER BY sorting, GROUP BY aggregations, and LIMIT clauses.',
  alternates: {
    canonical: 'https://sqlitestudio.app/blog/sql-select-statement-guide',
  },
};

export default function SqlSelectArticle() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'SQL SELECT Statement Explained: Syntax, Filtering & Aggregates',
    description:
      'Master the SQL SELECT query with live interactive examples. Learn WHERE filtering, ORDER BY sorting, GROUP BY aggregations, and LIMIT clauses.',
    author: { '@type': 'Organization', name: 'SQLite Studio Team' },
    datePublished: '2026-09-02',
    publisher: { '@type': 'Organization', name: 'SQLite Studio' },
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
            <span>Open Studio</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto px-6 py-12 space-y-8">
        <article className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-xs text-neutral-400">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-[#007AFF] font-semibold">
                Syntax Guide
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>8 min read</span>
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-tight">
              SQL SELECT Statement Explained: Syntax, Filtering & Aggregates
            </h1>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
              The <code className="font-mono text-[#007AFF]">SELECT</code> statement is the foundational building block of SQL. In this practical guide, explore how to retrieve data, filter with <code className="font-mono">WHERE</code>, group with <code className="font-mono">GROUP BY</code>, and sort with <code className="font-mono">ORDER BY</code> using live examples.
            </p>
          </div>

          <section className="space-y-3 pt-4">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
              1. Basic SELECT Query Structure
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
              A standard query specifies columns to fetch and the target table:
            </p>
            <div className="p-4 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.05] dark:border-white/[0.08] font-mono text-xs">
              <pre className="text-[#007AFF]">
{`SELECT name, category, unit_price
FROM products
WHERE unit_price > 200.00
ORDER BY unit_price DESC
LIMIT 5;`}
              </pre>
            </div>
          </section>

          {/* Live Sandbox */}
          <div className="py-2">
            <MiniPlayground
              initialQuery={`-- Try modifying this SELECT query:\nSELECT name, category, unit_price, stock_quantity\nFROM products\nWHERE unit_price > 200.0\nORDER BY unit_price DESC\nLIMIT 5;`}
              headline="Live SELECT Query Sandbox"
            />
          </div>

          <section className="space-y-3 pt-4">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
              2. Filtering with WHERE Clauses
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
              Use logical operators (<code className="font-mono">AND</code>, <code className="font-mono">OR</code>, <code className="font-mono">NOT</code>, <code className="font-mono">IN</code>, <code className="font-mono">LIKE</code>) to filter precise rows.
            </p>
          </section>

          <div className="py-2">
            <MiniPlayground
              initialQuery={`-- Search products in specific categories with good stock:\nSELECT id, name, category, stock_quantity\nFROM products\nWHERE category IN ('Audio', 'Processors') AND stock_quantity >= 50\nORDER BY stock_quantity DESC;`}
              headline="Live WHERE Filtering Sandbox"
            />
          </div>

          <div className="p-6 rounded-3xl bg-blue-500/10 border border-blue-500/20 text-center space-y-3">
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">
              Practice Writing Queries in SQLite Studio
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-sm mx-auto">
              Open the full editor with live autocomplete, multi-tab query editing, and instant CSV/JSON exports.
            </p>
            <Link
              href="/app"
              className="inline-flex items-center space-x-1.5 px-5 py-2 rounded-xl text-xs font-semibold text-white bg-[#007AFF] hover:bg-[#0062cc] transition-all shadow-md shadow-blue-500/20"
            >
              <span>Launch Studio IDE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </article>
      </main>

      <footer className="px-6 py-8 border-t border-black/[0.06] dark:border-white/[0.08] text-center text-xs text-neutral-500">
        <p>© 2026 SQLite Studio. Free Online SQL Learning & Compiler Hub.</p>
      </footer>
    </div>
  );
}

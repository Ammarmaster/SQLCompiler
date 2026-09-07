import type { Metadata } from 'next';
import Link from 'next/link';
import { Database, ArrowRight, Terminal, BookOpen, Copy, Code2 } from 'lucide-react';
import { MiniPlayground } from '../../components/MiniPlayground';
import { ThemeToggle } from '../../components/Theme/ThemeToggle';

export const metadata: Metadata = {
  title: 'SQL Syntax Cheatsheet & Documentation — SQLite Studio',
  description:
    'Complete SQL cheatsheet and quick reference. Syntax and examples for SELECT, JOINs, WHERE, GROUP BY, aggregates, and table creation.',
  alternates: {
    canonical: 'https://sqlcompiler.jobsio.in/docs',
  },
};

export default function DocsPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sqlcompiler.jobsio.in' },
      { '@type': 'ListItem', position: 2, name: 'Docs', item: 'https://sqlcompiler.jobsio.in/docs' },
    ],
  };

  return (
    <div className="min-h-full flex flex-col bg-[#F2F2F7] dark:bg-[#000000] text-neutral-900 dark:text-neutral-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <header className="sticky top-0 z-40 w-full px-6 py-3.5 bg-white/80 dark:bg-[#1C1C1E]/80 backdrop-blur-xl border-b border-black/[0.06] dark:border-white/[0.08]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2.5 group">
            <div className="w-8 h-8 rounded-[9px] overflow-hidden group-hover:scale-105 transition-transform">
              <img src="/app-icon.png" alt="SQLite Studio Icon" className="w-full h-full object-contain" />
            </div>
            <span className="font-bold text-sm tracking-tight">SQLite Studio</span>
          </Link>
          <div className="flex items-center space-x-3 text-xs font-medium">
            <ThemeToggle />
            <Link href="/" className="hover:text-[#007AFF]">
              Home
            </Link>
            <Link href="/blog" className="hover:text-[#007AFF]">
              Tutorials
            </Link>
            <Link
              href="/app"
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl font-semibold text-white bg-[#007AFF] hover:bg-[#0062cc] transition-all"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Launch IDE</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto px-6 py-12 space-y-10">
        <div className="space-y-3 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold text-[#007AFF] bg-blue-500/10">
            <Code2 className="w-3.5 h-3.5" />
            <span>Developer Reference</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            SQL Cheatsheet &amp; Syntax Reference
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300">
            Quickly look up SQL syntax, clauses, and functions. Test any command immediately using our online SQL compiler.
          </p>
        </div>

        {/* Cheatsheet Categories */}
        <div className="space-y-6">
          {/* Category 1: Querying Data */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#1C1C1E] border border-black/[0.06] dark:border-white/[0.08] space-y-4">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white">
              1. Querying Data (SELECT &amp; Filters)
            </h2>
            <div className="space-y-2 font-mono text-xs">
              <div className="p-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.04]">
                <span className="text-[#007AFF]">SELECT</span> col1, col2 <span className="text-[#007AFF]">FROM</span> table_name;
              </div>
              <div className="p-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.04]">
                <span className="text-[#007AFF]">SELECT DISTINCT</span> category <span className="text-[#007AFF]">FROM</span> products;
              </div>
              <div className="p-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.04]">
                <span className="text-[#007AFF]">SELECT</span> * <span className="text-[#007AFF]">FROM</span> customers <span className="text-[#007AFF]">WHERE</span> city = &apos;San Francisco&apos;;
              </div>
            </div>
          </div>

          {/* Category 2: Joins */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#1C1C1E] border border-black/[0.06] dark:border-white/[0.08] space-y-4">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white">
              2. Joining Tables
            </h2>
            <div className="space-y-2 font-mono text-xs">
              <div className="p-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.04]">
                <span className="text-[#007AFF]">SELECT</span> * <span className="text-[#007AFF]">FROM</span> orders <span className="text-[#007AFF]">JOIN</span> customers <span className="text-[#007AFF]">ON</span> orders.customer_id = customers.id;
              </div>
              <div className="p-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.04]">
                <span className="text-[#007AFF]">SELECT</span> * <span className="text-[#007AFF]">FROM</span> customers <span className="text-[#007AFF]">LEFT JOIN</span> orders <span className="text-[#007AFF]">ON</span> customers.id = orders.customer_id;
              </div>
            </div>
          </div>

          {/* Category 3: Aggregates */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#1C1C1E] border border-black/[0.06] dark:border-white/[0.08] space-y-4">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white">
              3. Aggregations &amp; Grouping
            </h2>
            <div className="space-y-2 font-mono text-xs">
              <div className="p-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.04]">
                <span className="text-[#007AFF]">SELECT</span> category, <span className="text-[#007AFF]">COUNT</span>(*), <span className="text-[#007AFF]">AVG</span>(unit_price) <span className="text-[#007AFF]">FROM</span> products <span className="text-[#007AFF]">GROUP BY</span> category;
              </div>
              <div className="p-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.04]">
                <span className="text-[#007AFF]">SELECT</span> customer_id, <span className="text-[#007AFF]">SUM</span>(total_amount) <span className="text-[#007AFF]">FROM</span> orders <span className="text-[#007AFF]">GROUP BY</span> customer_id <span className="text-[#007AFF]">HAVING SUM</span>(total_amount) &gt; 500;
              </div>
            </div>
          </div>
        </div>

        {/* Live Sandbox */}
        <MiniPlayground
          headline="Test Cheatsheet Queries Live"
          ctaText="Open Studio IDE"
        />
      </main>

      <footer className="px-6 py-8 border-t border-black/[0.06] dark:border-white/[0.08] text-center text-xs text-neutral-500">
        <p>© 2026 SQLite Studio — SQL Syntax Cheatsheet &amp; Documentation.</p>
      </footer>
    </div>
  );
}

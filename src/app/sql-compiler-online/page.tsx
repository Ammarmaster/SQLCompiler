import type { Metadata } from 'next';
import Link from 'next/link';
import { Play, CheckCircle2, ArrowRight, Database, Terminal, Shield, Zap, Layers } from 'lucide-react';
import { MiniPlayground } from '../../components/MiniPlayground';
import { ThemeToggle } from '../../components/Theme/ThemeToggle';

export const metadata: Metadata = {
  title: 'Online SQL Compiler — Run SQLite Queries in Browser Free',
  description:
    'Free online SQL compiler and interactive SQL playground. Run SQL queries online with zero setup, instant execution, ERP sample tables, and visual ER diagrams.',
  alternates: {
    canonical: 'https://sqlcompiler.jobsio.in/sql-compiler-online',
  },
};

export default function SqlCompilerOnlinePage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://sqlcompiler.jobsio.in',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Online SQL Compiler',
        item: 'https://sqlcompiler.jobsio.in/sql-compiler-online',
      },
    ],
  };

  return (
    <div className="min-h-full flex flex-col bg-[#F2F2F7] dark:bg-[#000000] text-neutral-900 dark:text-neutral-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Navigation */}
      <header className="sticky top-0 z-40 w-full px-6 py-3.5 bg-white/80 dark:bg-[#1C1C1E]/80 backdrop-blur-xl border-b border-black/[0.06] dark:border-white/[0.08]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-b from-[#0A84FF] to-[#0062D2] flex items-center justify-center text-white">
              <Database className="w-4 h-4 stroke-[2.2]" />
            </div>
            <span className="font-bold text-sm tracking-tight">SQLite Studio</span>
          </Link>
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            <Link href="/" className="text-xs font-medium hover:text-[#007AFF]">
              Home
            </Link>
            <Link
              href="/app"
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-[#007AFF] hover:bg-[#0062cc] transition-all"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Open Full IDE</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto px-6 py-12 space-y-12">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-neutral-500 font-medium">
          <Link href="/" className="hover:text-[#007AFF]">
            Home
          </Link>
          <span>/</span>
          <span className="text-neutral-800 dark:text-neutral-200">Online SQL Compiler</span>
        </nav>

        {/* Hero */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            The Fastest <span className="text-[#007AFF]">Online SQL Compiler</span> & Query Tool
          </h1>
          <p className="text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
            Welcome to the premier <strong>online SQL runner</strong> and <strong>SQL playground</strong>. Whether you are learning database fundamentals, testing complex multi-table joins, or debugging queries, SQLite Studio compiles and runs SQL code directly in your browser using SQLite WebAssembly.
          </p>
        </div>

        {/* Live Interactive Runner */}
        <MiniPlayground
          headline="Try the Online SQL Compiler Now"
          ctaText="Open Dual Split IDE"
        />

        {/* Why this compiler is different */}
        <section className="space-y-6 pt-8">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
            What Makes This Online SQL Compiler Unique?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
            <div className="p-5 rounded-2xl bg-white dark:bg-[#1C1C1E] border border-black/[0.06] dark:border-white/[0.08] space-y-2">
              <div className="flex items-center space-x-2 font-semibold text-sm text-neutral-900 dark:text-white">
                <Play className="w-4 h-4 text-[#007AFF] fill-current" />
                <span>Line-by-Line Gutter Execution</span>
              </div>
              <p>
                Unlike standard tools where you must highlight text or run a whole multi-query file, SQLite Studio attaches a small circular ▶ button to every statement in the editor gutter. Click it to run that line instantly.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#1C1C1E] border border-black/[0.06] dark:border-white/[0.08] space-y-2">
              <div className="flex items-center space-x-2 font-semibold text-sm text-neutral-900 dark:text-white">
                <Layers className="w-4 h-4 text-purple-500" />
                <span>Interactive ER Diagram</span>
              </div>
              <p>
                Visualizing relationships between primary keys and foreign keys is effortless. An auto-updating diagram renders connected table cards with draggable layout and click-to-query shortcuts.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#1C1C1E] border border-black/[0.06] dark:border-white/[0.08] space-y-2">
              <div className="flex items-center space-x-2 font-semibold text-sm text-neutral-900 dark:text-white">
                <Shield className="w-4 h-4 text-emerald-500" />
                <span>100% Private Client-Side Sandbox</span>
              </div>
              <p>
                Your queries and proprietary data are never transmitted to any third-party server. Everything executes locally in your browser memory and persists across refreshes using IndexedDB.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#1C1C1E] border border-black/[0.06] dark:border-white/[0.08] space-y-2">
              <div className="flex items-center space-x-2 font-semibold text-sm text-neutral-900 dark:text-white">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Pre-Loaded ERP Sample Data</span>
              </div>
              <p>
                Don't waste time typing CREATE TABLE and INSERT statements from scratch. We ship with a complete e-commerce/ERP database (`customers`, `suppliers`, `products`, `orders`, `order_items`) ready to query.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="p-8 rounded-3xl bg-blue-600 text-white text-center space-y-4 shadow-xl">
          <h3 className="text-xl sm:text-2xl font-bold">Start Writing SQL Queries in Seconds</h3>
          <p className="text-xs sm:text-sm text-blue-100 max-w-md mx-auto">
            Experience the full dual split-screen editor with sortable spreadsheet results, multi-tab query editing, and SQLite import/export.
          </p>
          <Link
            href="/app"
            className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl text-xs font-semibold text-[#007AFF] bg-white hover:bg-neutral-100 transition-all"
          >
            <span>Open SQLite Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </main>

      <footer className="px-6 py-8 border-t border-black/[0.06] dark:border-white/[0.08] text-center text-xs text-neutral-500">
        <p>© 2026 SQLite Studio — Free Online SQL Compiler & Editor.</p>
      </footer>
    </div>
  );
}

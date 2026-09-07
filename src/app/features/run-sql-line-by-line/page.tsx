import type { Metadata } from 'next';
import Link from 'next/link';
import { Play, Database, ArrowRight, Terminal, Zap, CheckCircle2, Shield } from 'lucide-react';
import { MiniPlayground } from '../../../components/MiniPlayground';
import { ThemeToggle } from '../../../components/Theme/ThemeToggle';

export const metadata: Metadata = {
  title: 'Line-by-Line SQL Execution — Run Queries from the Editor Gutter',
  description:
    'Run SQL statements individually with one click. SQLite Studio features circular run buttons in the editor gutter for instant per-line query execution.',
  alternates: {
    canonical: 'https://sqlcompiler.jobsio.in/features/run-sql-line-by-line',
  },
};

export default function RunSqlLineByLinePage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sqlcompiler.jobsio.in' },
      { '@type': 'ListItem', position: 2, name: 'Features', item: 'https://sqlcompiler.jobsio.in/features' },
      { '@type': 'ListItem', position: 3, name: 'Line-by-Line SQL Execution', item: 'https://sqlcompiler.jobsio.in/features/run-sql-line-by-line' },
    ],
  };

  return (
    <div className="min-h-full flex flex-col bg-[#F2F2F7] dark:bg-[#000000] text-neutral-900 dark:text-neutral-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Header */}
      <header className="sticky top-0 z-40 w-full px-6 py-3.5 bg-white/80 dark:bg-[#1C1C1E]/80 backdrop-blur-xl border-b border-black/[0.06] dark:border-white/[0.08]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2.5 group">
            <div className="w-8 h-8 rounded-[9px] overflow-hidden group-hover:scale-105 transition-transform">
              <img src="/app-icon.png" alt="SQLite Studio Icon" className="w-full h-full object-contain" />
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
              <span>Launch Studio IDE</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto px-6 py-12 space-y-10">
        <nav className="flex items-center space-x-2 text-xs text-neutral-500 font-medium">
          <Link href="/" className="hover:text-[#007AFF]">
            Home
          </Link>
          <span>/</span>
          <span>Features</span>
          <span>/</span>
          <span className="text-neutral-800 dark:text-neutral-200">Line-by-Line Execution</span>
        </nav>

        <div className="space-y-4 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold text-[#007AFF] bg-blue-500/10">
            <Zap className="w-3.5 h-3.5" />
            <span>Interactive Gutter Run Buttons</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Run SQL <span className="text-[#007AFF]">Line-by-Line</span> with One Click
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
            Stop highlighting text or commenting out queries just to test a single SQL statement. SQLite Studio parses statement boundaries and renders an inline ▶ run button in the gutter beside every query.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#1C1C1E] border border-black/[0.06] dark:border-white/[0.08] space-y-2">
            <div className="w-8 h-8 rounded-full bg-[#007AFF] text-white flex items-center justify-center">
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            </div>
            <h3 className="font-semibold text-sm">No Selection Required</h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Never highlight query text again. Click the gutter icon beside any statement to run only that query instantly.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-white dark:bg-[#1C1C1E] border border-black/[0.06] dark:border-white/[0.08] space-y-2">
            <div className="w-8 h-8 rounded-full bg-[#34C759] text-white flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-sm">Soft Flash Visual Feedback</h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Executed lines briefly glow green on success or red on error with native iOS spring transitions.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-white dark:bg-[#1C1C1E] border border-black/[0.06] dark:border-white/[0.08] space-y-2">
            <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-sm">Keyboard Shortcuts</h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Prefer keyboard workflows? Press <kbd className="font-mono text-[10px] px-1 py-0.5 bg-black/5 dark:bg-white/10 rounded">⌘ + Enter</kbd> to run the statement currently under your cursor.
            </p>
          </div>
        </div>

        {/* Live Sandbox */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold">Try Interactive Query Execution</h2>
          <MiniPlayground
            initialQuery={`-- Query 1: Top products by stock\nSELECT name, stock_quantity FROM products ORDER BY stock_quantity DESC LIMIT 3;\n\n-- Query 2: Total orders count\nSELECT COUNT(*) AS total_orders FROM orders;`}
            headline="Live Per-Statement Demo"
          />
        </div>

        {/* Bottom CTA */}
        <div className="p-8 rounded-3xl bg-[#007AFF] text-white text-center space-y-4 shadow-xl">
          <h3 className="text-xl sm:text-2xl font-bold">Try Gutter Run Buttons in SQLite Studio</h3>
          <p className="text-xs sm:text-sm text-blue-100 max-w-md mx-auto">
            Open the full IDE and experience line-by-line execution on your own queries or our pre-loaded ERP database.
          </p>
          <Link
            href="/app"
            className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl text-xs font-semibold text-[#007AFF] bg-white hover:bg-neutral-100 transition-all"
          >
            <span>Launch SQL IDE</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </main>

      <footer className="px-6 py-8 border-t border-black/[0.06] dark:border-white/[0.08] text-center text-xs text-neutral-500">
        <p>© 2026 SQLite Studio — Line-by-Line Online SQL Compiler.</p>
      </footer>
    </div>
  );
}

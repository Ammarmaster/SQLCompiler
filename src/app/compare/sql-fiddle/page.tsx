import type { Metadata } from 'next';
import Link from 'next/link';
import { Database, ArrowLeft, ArrowRight, Terminal, CheckCircle2, XCircle } from 'lucide-react';
import { ThemeToggle } from '../../../components/Theme/ThemeToggle';

export const metadata: Metadata = {
  title: 'SQLite Studio vs SQL Fiddle — Which Online SQL Tool is Better in 2026?',
  description:
    'Compare SQLite Studio and SQL Fiddle. Discover why SQLite Studio is the top modern alternative with in-browser WebAssembly, line-by-line run, and live ER diagrams.',
  alternates: {
    canonical: 'https://sqlcompiler.jobsio.in/compare/sql-fiddle',
  },
};

export default function CompareSqlFiddlePage() {
  return (
    <div className="min-h-full flex flex-col bg-[#F2F2F7] dark:bg-[#000000] text-neutral-900 dark:text-neutral-100">
      <header className="sticky top-0 z-40 w-full px-6 py-3.5 bg-white/80 dark:bg-[#1C1C1E]/80 backdrop-blur-xl border-b border-black/[0.06] dark:border-white/[0.08]">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="inline-flex items-center space-x-1.5 text-xs font-semibold text-neutral-600 dark:text-neutral-300 hover:text-[#007AFF]">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            <Link
              href="/app"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white bg-[#007AFF] hover:bg-[#0062cc] transition-all"
            >
              <Terminal className="w-3 h-3" />
              <span>Launch Studio</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto px-6 py-12 space-y-10">
        <div className="space-y-4 text-center max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            SQLite Studio vs <span className="text-neutral-500">SQL Fiddle</span>
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
            SQL Fiddle pioneered sharing SQL queries in the early 2010s. Here is how SQLite Studio modernizes the online SQL compiler experience in 2026.
          </p>
        </div>

        {/* Feature Comparison */}
        <div className="rounded-3xl bg-white dark:bg-[#1C1C1E] border border-black/[0.06] dark:border-white/[0.08] shadow-sm overflow-hidden divide-y divide-black/[0.04] dark:divide-white/[0.06] text-xs">
          <div className="p-4 grid grid-cols-3 font-semibold bg-[#F9F9FB] dark:bg-[#18181A]">
            <span>Feature</span>
            <span className="text-[#007AFF]">SQLite Studio</span>
            <span className="text-neutral-500">SQL Fiddle</span>
          </div>

          <div className="p-4 grid grid-cols-3 items-center">
            <span className="font-medium">Execution Engine</span>
            <span className="text-emerald-600 font-semibold">WebAssembly (Instant local)</span>
            <span className="text-neutral-500">Remote Server API (Latency)</span>
          </div>

          <div className="p-4 grid grid-cols-3 items-center">
            <span className="font-medium">Line-by-Line Run</span>
            <span className="text-emerald-600 font-semibold flex items-center space-x-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Gutter ▶ buttons</span>
            </span>
            <span className="text-red-500 flex items-center space-x-1">
              <XCircle className="w-4 h-4" />
              <span>Run whole batch only</span>
            </span>
          </div>

          <div className="p-4 grid grid-cols-3 items-center">
            <span className="font-medium">Interactive ER Diagram</span>
            <span className="text-emerald-600 font-semibold flex items-center space-x-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Automated live diagram</span>
            </span>
            <span className="text-red-500 flex items-center space-x-1">
              <XCircle className="w-4 h-4" />
              <span>None</span>
            </span>
          </div>

          <div className="p-4 grid grid-cols-3 items-center">
            <span className="font-medium">Design & UX</span>
            <span className="text-emerald-600 font-semibold">Native iOS Glassmorphic UI</span>
            <span className="text-neutral-500">Classic Web 2.0 interface</span>
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-[#007AFF] text-white text-center space-y-4 shadow-xl">
          <h3 className="text-xl sm:text-2xl font-bold">Switch to SQLite Studio Today</h3>
          <p className="text-xs sm:text-sm text-blue-100 max-w-md mx-auto">
            Try the faster, more interactive SQL compiler with live schema diagrams and zero setup.
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
        <p>© 2026 SQLite Studio — Modern SQL Fiddle Alternative.</p>
      </footer>
    </div>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { Database, ArrowLeft, ArrowRight, Terminal, Clock, Layers } from 'lucide-react';
import { MiniPlayground } from '../../../components/MiniPlayground';

export const metadata: Metadata = {
  title: 'How to Visualize Database Table Relationships Online (ER Diagram Guide)',
  description:
    'Learn how to visualize SQL database schemas, foreign keys, and table relationships. Compare manual schema mapping vs automated browser ER diagram tools.',
  alternates: {
    canonical: 'https://sqlitestudio.app/blog/how-to-visualize-database-table-relationships',
  },
};

export default function ErDiagramArticle() {
  return (
    <div className="min-h-full flex flex-col bg-[#F2F2F7] dark:bg-[#000000] text-neutral-900 dark:text-neutral-100">
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
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 font-semibold">
                Database Architecture
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>5 min read</span>
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-tight">
              How to Visualize Database Table Relationships Online
            </h1>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
              When dealing with enterprise databases containing dozens of tables, understanding foreign key relationships is essential. Discover how Entity-Relationship (ER) diagram visualizers work and how SQLite Studio automates schema diagramming.
            </p>
          </div>

          <section className="space-y-3 pt-4">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
              Why Visualizing Schemas Matters
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
              Writing accurate JOIN queries requires knowing which column references which parent table. Without a visual diagram, engineers waste hours inspecting raw DDL or running PRAGMA commands manually.
            </p>
          </section>

          <div className="py-2">
            <MiniPlayground
              initialQuery={`-- Discover all foreign key relations in SQLite:
PRAGMA foreign_key_list('orders');`}
              headline="Live PRAGMA Schema Introspection"
            />
          </div>

          <div className="p-6 rounded-3xl bg-purple-500/10 border border-purple-500/20 text-center space-y-3">
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">
              See the Live ER Diagram in Action
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-sm mx-auto">
              Open SQLite Studio, click the &quot;Schema &amp; ER&quot; tab, and drag connected cards around the interactive canvas.
            </p>
            <Link
              href="/app"
              className="inline-flex items-center space-x-1.5 px-5 py-2 rounded-xl text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 transition-all shadow-md"
            >
              <span>View ER Diagram in Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </article>
      </main>

      <footer className="px-6 py-8 border-t border-black/[0.06] dark:border-white/[0.08] text-center text-xs text-neutral-500">
        <p>© 2026 SQLite Studio — Database Relationship Visualizer & Compiler.</p>
      </footer>
    </div>
  );
}

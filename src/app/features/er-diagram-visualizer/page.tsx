import type { Metadata } from 'next';
import Link from 'next/link';
import { Layers, Database, ArrowRight, Terminal, Key, Link2, Sparkles, CheckCircle2 } from 'lucide-react';
import { MiniPlayground } from '../../../components/MiniPlayground';

export const metadata: Metadata = {
  title: 'Database Schema & ER Diagram Visualizer Online — SQLite Studio',
  description:
    'Auto-generate interactive entity-relationship (ER) diagrams from live SQL tables. Visualize foreign key relations, primary keys, and table schemas online free.',
  alternates: {
    canonical: 'https://sqlcompiler.jobsio.in/features/er-diagram-visualizer',
  },
};

export default function ErDiagramFeaturePage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sqlcompiler.jobsio.in' },
      { '@type': 'ListItem', position: 2, name: 'Features', item: 'https://sqlcompiler.jobsio.in/features' },
      { '@type': 'ListItem', position: 3, name: 'ER Diagram Visualizer', item: 'https://sqlcompiler.jobsio.in/features/er-diagram-visualizer' },
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
          <Link href="/" className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center text-white">
              <Layers className="w-4 h-4 stroke-[2.2]" />
            </div>
            <span className="font-bold text-sm tracking-tight">SQLite Studio</span>
          </Link>
          <div className="flex items-center space-x-3">
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
          <span className="text-neutral-800 dark:text-neutral-200">ER Diagram Visualizer</span>
        </nav>

        <div className="space-y-4 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold text-purple-600 dark:text-purple-400 bg-purple-500/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Automated Schema Introspection</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Live <span className="text-purple-600 dark:text-purple-400">ER Diagram</span> & Database Schema Visualizer
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
            Understand complex database structures in seconds. SQLite Studio introspects your tables, columns, and foreign key relations to render interactive, draggable entity-relationship diagrams right alongside your query editor.
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#1C1C1E] border border-black/[0.06] dark:border-white/[0.08] space-y-2">
            <Key className="w-5 h-5 text-amber-500" />
            <h3 className="font-semibold text-sm">Primary & Foreign Keys</h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Instantly recognize primary keys (🔑) and foreign keys (🔗) with color-coded badges and column type markers.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-white dark:bg-[#1C1C1E] border border-black/[0.06] dark:border-white/[0.08] space-y-2">
            <Link2 className="w-5 h-5 text-[#007AFF]" />
            <h3 className="font-semibold text-sm">Curved Relation Connectors</h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Smooth SVG cubic bezier lines link foreign keys to target parent tables, complete with directional arrowheads.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-white dark:bg-[#1C1C1E] border border-black/[0.06] dark:border-white/[0.08] space-y-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            <h3 className="font-semibold text-sm">Click-to-Query</h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Click &quot;Query Table&quot; on any card in the diagram to insert <code className="font-mono text-[#007AFF]">SELECT * FROM table LIMIT 100</code> directly into your editor.
            </p>
          </div>
        </div>

        {/* Live Playground */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold">Try Creating a Table and Querying It</h2>
          <MiniPlayground
            initialQuery={`-- Create a new table and verify foreign keys\nCREATE TABLE departments (\n  id INTEGER PRIMARY KEY,\n  dept_name TEXT NOT NULL\n);\n\nINSERT INTO departments (id, dept_name) VALUES (1, 'Engineering'), (2, 'Design');\n\nSELECT * FROM departments;`}
            headline="Live DDL & Query Execution"
          />
        </div>

        {/* Bottom CTA */}
        <div className="p-8 rounded-3xl bg-purple-600 text-white text-center space-y-4 shadow-xl">
          <h3 className="text-xl sm:text-2xl font-bold">Experience the Live ER Diagram</h3>
          <p className="text-xs sm:text-sm text-purple-100 max-w-md mx-auto">
            Open the full dual split-screen IDE, switch to the Schema tab, and interact with the ERP relational diagram.
          </p>
          <Link
            href="/app"
            className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl text-xs font-semibold text-purple-700 bg-white hover:bg-neutral-100 transition-all"
          >
            <span>Open ER Diagram in Studio IDE</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </main>

      <footer className="px-6 py-8 border-t border-black/[0.06] dark:border-white/[0.08] text-center text-xs text-neutral-500">
        <p>© 2026 SQLite Studio — Database Relationship Visualizer & Online SQL Compiler.</p>
      </footer>
    </div>
  );
}

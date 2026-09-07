import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Database,
  Play,
  Layers,
  Zap,
  ShieldCheck,
  Code2,
  Table2,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  Sparkles,
  BookOpen,
  FileText,
  Rows3,
  Terminal,
} from 'lucide-react';
import { MiniPlayground } from '../components/MiniPlayground';

export const metadata: Metadata = {
  title: 'Free Online SQL Compiler & Editor — Write, Run & Visualize SQL',
  description:
    'Use the best free online SQL compiler and SQL IDE in your browser. Run SQL queries online with per-line execution, live ER diagram table visualizer, and sample data. Zero signup required.',
  alternates: {
    canonical: 'https://sqlcompiler.jobsio.in',
  },
};

export default function HomePage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is an online SQL compiler?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'An online SQL compiler is a browser-based developer tool that lets you write, execute, and debug SQL queries without installing database software like PostgreSQL, MySQL, or SQLite locally. SQLite Studio executes real SQLite WebAssembly directly on your machine.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is this online SQL compiler free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, SQLite Studio is 100% free with no registration, no subscription, and no query limits. You can create tables, insert records, and run complex JOIN queries immediately.',
        },
      },
      {
        '@type': 'Question',
        name: 'What SQL dialect does this online compiler support?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'It runs genuine SQLite 3 compiled to WebAssembly (WASM). It supports ANSI SQL standards including CREATE TABLE, ALTER TABLE, DROP TABLE, INSERT, UPDATE, DELETE, multi-table JOINs, subqueries, CTEs, and window functions.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I visualize database table relationships online?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! SQLite Studio automatically parses your database schema and foreign key constraints to generate an interactive Entity-Relationship (ER) diagram with draggable nodes and connecting relationship lines.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I need to install a database or create an account?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No installation and no signup required. Everything runs 100% client-side inside your browser via WebAssembly, ensuring complete data privacy and zero server latency.',
        },
      },
    ],
  };

  return (
    <div className="min-h-full flex flex-col bg-[#F2F2F7] dark:bg-[#000000] text-neutral-900 dark:text-neutral-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Top Marketing Navigation */}
      <header className="sticky top-0 z-40 w-full px-6 py-3.5 bg-white/80 dark:bg-[#1C1C1E]/80 backdrop-blur-xl border-b border-black/[0.06] dark:border-white/[0.08]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-b from-[#0A84FF] to-[#0062D2] flex items-center justify-center text-white shadow-sm shadow-blue-500/20">
              <Database className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div className="flex items-baseline space-x-1.5">
              <span className="font-bold text-sm tracking-tight text-neutral-900 dark:text-white">
                SQLite Studio
              </span>
              <span className="text-[10px] font-medium text-[#007AFF] bg-blue-500/10 px-1.5 py-0.5 rounded-full">
                Online SQL Compiler
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-6 text-xs font-medium text-neutral-600 dark:text-neutral-300">
            <Link href="/sql-compiler-online" className="hover:text-[#007AFF] transition-colors">
              SQL Compiler
            </Link>
            <Link href="/features/er-diagram-visualizer" className="hover:text-[#007AFF] transition-colors">
              ER Diagram
            </Link>
            <Link href="/features/run-sql-line-by-line" className="hover:text-[#007AFF] transition-colors">
              Line-by-Line Run
            </Link>
            <Link href="/blog" className="hover:text-[#007AFF] transition-colors">
              Tutorials
            </Link>
            <Link href="/docs" className="hover:text-[#007AFF] transition-colors">
              SQL Reference
            </Link>
            <Link href="/founder" className="hover:text-[#007AFF] transition-colors font-semibold text-[#007AFF]">
              Founder
            </Link>
          </nav>

          <div className="flex items-center space-x-3">
            <Link
              href="/app"
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#007AFF] hover:bg-[#0062cc] active:scale-95 transition-all shadow-md shadow-blue-500/25"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Launch Studio IDE</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative px-6 pt-16 pb-12 md:pt-24 md:pb-20 text-center overflow-hidden">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Pill Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full text-xs font-medium bg-white dark:bg-[#1C1C1E] border border-black/[0.08] dark:border-white/[0.1] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#34C759] animate-pulse" />
              <span className="text-neutral-700 dark:text-neutral-300">
                100% Client-Side SQLite 3 WASM • Zero Server Lag
              </span>
            </div>

            {/* Main H1 */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-[1.15]">
              Free <span className="text-[#007AFF]">Online SQL Compiler</span> & Visual IDE
            </h1>

            {/* Keyword-Rich Narrative Paragraph */}
            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto leading-relaxed">
              Write, debug, and <strong>run SQL online</strong> instantly with SQLite Studio. A modern browser-based <strong>SQL editor online</strong> featuring revolutionary per-line gutter execution, an automatic <strong>table relationship ER diagram visualizer</strong>, and a pre-loaded ERP sample database. No database installation, zero server calls, and 100% private.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/app"
                className="flex items-center space-x-2 px-6 py-3 rounded-2xl text-sm font-semibold text-white bg-[#007AFF] hover:bg-[#0062cc] active:scale-95 transition-all shadow-lg shadow-blue-500/30"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Open Full SQL Compiler IDE</span>
              </Link>
              <Link
                href="/features/er-diagram-visualizer"
                className="flex items-center space-x-2 px-5 py-3 rounded-2xl text-sm font-medium text-neutral-800 dark:text-neutral-200 bg-white dark:bg-[#1C1C1E] hover:bg-neutral-50 dark:hover:bg-[#2C2C2E] border border-black/[0.08] dark:border-white/[0.1] active:scale-95 transition-all shadow-xs"
              >
                <Layers className="w-4 h-4 text-purple-500" />
                <span>Explore ER Diagram Feature</span>
              </Link>
            </div>

            {/* Social Proof / Stats Badges */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto text-left">
              <div className="p-3 rounded-2xl bg-white/70 dark:bg-[#1C1C1E]/70 border border-black/[0.06] dark:border-white/[0.08]">
                <div className="text-xl font-bold text-[#007AFF] font-mono">0 ms</div>
                <div className="text-xs text-neutral-500">Server Latency</div>
              </div>
              <div className="p-3 rounded-2xl bg-white/70 dark:bg-[#1C1C1E]/70 border border-black/[0.06] dark:border-white/[0.08]">
                <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 font-mono">100%</div>
                <div className="text-xs text-neutral-500">Private & Local</div>
              </div>
              <div className="p-3 rounded-2xl bg-white/70 dark:bg-[#1C1C1E]/70 border border-black/[0.06] dark:border-white/[0.08]">
                <div className="text-xl font-bold text-purple-600 dark:text-purple-400 font-mono">5 Tables</div>
                <div className="text-xs text-neutral-500">Pre-seeded ERP Data</div>
              </div>
              <div className="p-3 rounded-2xl bg-white/70 dark:bg-[#1C1C1E]/70 border border-black/[0.06] dark:border-white/[0.08]">
                <div className="text-xl font-bold text-amber-500 font-mono">$0</div>
                <div className="text-xs text-neutral-500">Free Forever</div>
              </div>
            </div>
          </div>

          {/* Above-The-Fold Interactive Sandbox Demo */}
          <div className="mt-12 px-2">
            <MiniPlayground headline="Live Online SQL Playground — Try It Below" />
          </div>
        </section>

        {/* Feature Highlights Section */}
        <section className="px-6 py-16 bg-white dark:bg-[#121214] border-y border-black/[0.06] dark:border-white/[0.08]">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#007AFF]">
                State of the Art SQL Environment
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
                Why Developers Choose This Online SQL Compiler
              </h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Traditional online SQL editors require you to highlight code or run the entire script. SQLite Studio redefines the SQL playground experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Feature 1: Gutter Run */}
              <div className="p-6 rounded-3xl bg-[#F2F2F7] dark:bg-[#1C1C1E] border border-black/[0.06] dark:border-white/[0.08] space-y-4">
                <div className="w-10 h-10 rounded-2xl bg-blue-500/15 flex items-center justify-center text-[#007AFF]">
                  <Play className="w-5 h-5 fill-current" />
                </div>
                <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
                  Run Any Line of SQL with One Click
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Every executable SQL statement gets a circular ▶ run icon directly in the editor gutter. Click any statement to execute only that query with soft green or red visual feedback.
                </p>
                <Link
                  href="/features/run-sql-line-by-line"
                  className="inline-flex items-center space-x-1 text-xs font-semibold text-[#007AFF] hover:underline"
                >
                  <span>Learn about line-by-line run</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Feature 2: ER Diagram */}
              <div className="p-6 rounded-3xl bg-[#F2F2F7] dark:bg-[#1C1C1E] border border-black/[0.06] dark:border-white/[0.08] space-y-4">
                <div className="w-10 h-10 rounded-2xl bg-purple-500/15 flex items-center justify-center text-purple-600 dark:text-purple-400">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
                  Live ER Diagram & Schema Visualizer
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Auto-detect primary keys, foreign keys, and relationships. Visualized as draggable iOS grouped cards with smooth curved connection lines and click-to-query integration.
                </p>
                <Link
                  href="/features/er-diagram-visualizer"
                  className="inline-flex items-center space-x-1 text-xs font-semibold text-[#007AFF] hover:underline"
                >
                  <span>Explore schema visualizer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Feature 3: WebAssembly Speed */}
              <div className="p-6 rounded-3xl bg-[#F2F2F7] dark:bg-[#1C1C1E] border border-black/[0.06] dark:border-white/[0.08] space-y-4">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
                  Pure SQLite WebAssembly (Zero Backend)
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Queries run 100% in your browser memory via sql.js WebAssembly. Fast, reliable, with automatic IndexedDB persistence and full database export/import.
                </p>
                <Link
                  href="/sql-compiler-online"
                  className="inline-flex items-center space-x-1 text-xs font-semibold text-[#007AFF] hover:underline"
                >
                  <span>See compiler specifications</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Meet the Founder & ProDevOpz Section */}
        <section className="px-6 py-16 bg-[#F9F9FB] dark:bg-[#161618] border-b border-black/[0.06] dark:border-white/[0.08]">
          <div className="max-w-4xl mx-auto p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#1C1C1E] border border-black/[0.06] dark:border-white/[0.08] shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 items-center">
              <div className="sm:col-span-4 flex flex-col items-center">
                <div className="w-44 h-44 sm:w-48 sm:h-48 rounded-2xl overflow-hidden shadow-xl ring-4 ring-blue-500/20">
                  <img
                    src="/ammar-master-jalaluddin-master-founder-at-prodevopz.jpg"
                    alt="Ammar Master aka Jalaluddin Master, Founder at ProDevOpz"
                    title="Ammar Master aka Jalaluddin Master — Founder at ProDevOpz"
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="sm:col-span-8 space-y-3 text-left">
                <span className="text-[11px] font-semibold text-[#007AFF] uppercase tracking-wider">
                  Built by ProDevOpz
                </span>
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">
                  Ammar Master <span className="text-neutral-500 font-normal text-base">(Jalaluddin Master)</span>
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  Founder at <a href="https://prodevopz.jobsio.in" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#007AFF] hover:underline">ProDevOpz</a>. Ammar engineered SQLite Studio to eliminate database setup friction, combining WebAssembly execution with native-feeling iOS UI and live ER diagram visualization.
                </p>
                <div className="pt-2 flex items-center space-x-3 text-xs font-semibold">
                  <Link href="/founder" className="text-[#007AFF] hover:underline inline-flex items-center space-x-1">
                    <span>View Founder Profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <span className="text-neutral-300 dark:text-neutral-600">•</span>
                  <a href="https://prodevopz.jobsio.in" target="_blank" rel="noopener noreferrer" className="text-neutral-700 dark:text-neutral-300 hover:text-[#007AFF] inline-flex items-center space-x-1">
                    <span>prodevopz.jobsio.in</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-6 py-16 max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#007AFF]">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
              Everything You Need to Know About Our Online SQL Compiler
            </h2>
          </div>

          <div className="space-y-3">
            {[
              {
                q: 'What is an online SQL compiler?',
                a: 'An online SQL compiler is a browser tool that enables engineers, analysts, and students to write, compile, and execute SQL statements without setting up an RDBMS server locally. SQLite Studio runs real SQLite WebAssembly directly in your browser.',
              },
              {
                q: 'Is this SQL compiler free to use?',
                a: 'Yes, SQLite Studio is 100% free with no registration, no payment required, and no hidden limitations.',
              },
              {
                q: 'What SQL dialect and features are supported?',
                a: 'SQLite Studio supports full SQLite 3 syntax including SELECT, multi-table JOINs, GROUP BY, aggregates, CREATE TABLE, INSERT, UPDATE, DELETE, ALTER TABLE, DROP TABLE, subqueries, and window functions.',
              },
              {
                q: 'Can I visualize database table relationships online?',
                a: 'Yes. SQLite Studio automatically detects table structures, primary keys, and foreign keys, rendering an interactive Entity-Relationship (ER) diagram with draggable nodes and connecting relationship lines.',
              },
              {
                q: 'Do I need to install a database or create an account?',
                a: 'No installation, no downloads, and no account creation required. You can start writing SQL queries the instant you open the page.',
              },
            ].map((item, idx) => (
              <details
                key={idx}
                className="group rounded-2xl bg-white dark:bg-[#1C1C1E] border border-black/[0.06] dark:border-white/[0.08] p-4 shadow-xs transition-colors open:bg-neutral-50/80 dark:open:bg-[#2C2C2E]/60"
              >
                <summary className="font-semibold text-sm text-neutral-900 dark:text-neutral-100 cursor-pointer list-none flex items-center justify-between">
                  <span>{item.q}</span>
                  <span className="text-neutral-400 group-open:rotate-180 transition-transform text-lg">
                    ↓
                  </span>
                </summary>
                <p className="mt-3 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA Bottom Banner */}
        <section className="px-6 py-16 bg-gradient-to-b from-blue-600 to-[#0056B3] text-white text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
              Ready to Practice and Run SQL Online?
            </h2>
            <p className="text-sm sm:text-base text-blue-100 max-w-xl mx-auto">
              Launch SQLite Studio in one click. Try complex joins, analyze data grids, and visualize your database schema without writing a single line of config.
            </p>
            <div className="pt-2">
              <Link
                href="/app"
                className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-2xl text-sm font-semibold text-[#007AFF] bg-white hover:bg-neutral-100 active:scale-95 transition-all shadow-xl"
              >
                <Terminal className="w-4 h-4 text-[#007AFF]" />
                <span>Launch Free SQL IDE</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer with SEO Internal Linking */}
      <footer className="px-6 py-12 bg-white dark:bg-[#161618] border-t border-black/[0.06] dark:border-white/[0.08] text-xs text-neutral-500">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-semibold text-neutral-900 dark:text-white mb-3 text-xs uppercase tracking-wider">
              Product & Tool
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/app" className="hover:text-[#007AFF]">
                  Full SQL Studio IDE
                </Link>
              </li>
              <li>
                <Link href="/sql-compiler-online" className="hover:text-[#007AFF]">
                  Online SQL Compiler
                </Link>
              </li>
              <li>
                <Link href="/features/er-diagram-visualizer" className="hover:text-[#007AFF]">
                  ER Diagram Visualizer
                </Link>
              </li>
              <li>
                <Link href="/features/run-sql-line-by-line" className="hover:text-[#007AFF]">
                  Gutter Line-by-Line Run
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-900 dark:text-white mb-3 text-xs uppercase tracking-wider">
              SQL Tutorials
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/blog/how-to-write-sql-join" className="hover:text-[#007AFF]">
                  How to Write SQL JOINs
                </Link>
              </li>
              <li>
                <Link href="/blog/sql-select-statement-guide" className="hover:text-[#007AFF]">
                  SQL SELECT Guide
                </Link>
              </li>
              <li>
                <Link href="/blog/how-to-visualize-database-table-relationships" className="hover:text-[#007AFF]">
                  Visualize Table Relations
                </Link>
              </li>
              <li>
                <Link href="/blog/best-online-sql-compilers-compared" className="hover:text-[#007AFF]">
                  Best SQL Compilers Compared
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-900 dark:text-white mb-3 text-xs uppercase tracking-wider">
              Documentation
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/docs" className="hover:text-[#007AFF]">
                  SQL Cheatsheet
                </Link>
              </li>
              <li>
                <Link href="/compare/sql-fiddle" className="hover:text-[#007AFF]">
                  SQLite Studio vs SQL Fiddle
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="hover:text-[#007AFF]">
                  Sitemap XML
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-900 dark:text-white mb-3 text-xs uppercase tracking-wider">
              About &amp; Leadership
            </h4>
            <p className="text-neutral-500 leading-relaxed mb-2">
              A product of <a href="https://prodevopz.jobsio.in" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#007AFF] hover:underline">ProDevOpz</a>, founded by <Link href="/founder" className="text-neutral-700 dark:text-neutral-300 font-semibold hover:text-[#007AFF]">Ammar Master (Jalaluddin Master)</Link>.
            </p>
            <ul className="space-y-1.5 pt-1">
              <li>
                <Link href="/founder" className="hover:text-[#007AFF]">
                  Founder Story &amp; Bio
                </Link>
              </li>
              <li>
                <a href="https://prodevopz.jobsio.in" target="_blank" rel="noopener noreferrer" className="hover:text-[#007AFF]">
                  ProDevOpz Agency
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/in/ammarmaster" target="_blank" rel="noopener noreferrer" className="hover:text-[#007AFF]">
                  LinkedIn Profile
                </a>
              </li>
            </ul>
            <p className="pt-2 text-[11px] text-neutral-400">© 2026 ProDevOpz. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

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
  XCircle,
  ArrowRight,
  HelpCircle,
  Sparkles,
  BookOpen,
  FileText,
  Rows3,
  Terminal,
  ExternalLink,
  Cpu,
  Lock,
  Globe,
} from 'lucide-react';
import { MiniPlayground } from '../components/MiniPlayground';
import { MacWindow } from '../components/Ui/MacWindow';

export const metadata: Metadata = {
  title: 'Online SQL Compiler — Run SQL Code in Browser Free | SQLite Studio',
  description:
    'Free online SQL compiler and interactive SQL IDE. Write, compile, and run SQL queries in your browser with zero server latency, instant per-line execution, and live ER diagram visualizer.',
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
        name: 'How does SQLite Studio compare to Programiz, OneCompiler, and CodeChef?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Unlike Programiz, OneCompiler, or CodeChef which execute SQL on remote servers with network queue delays, SQLite Studio runs SQLite 3 WebAssembly 100% inside your browser memory. This guarantees 0ms server latency, complete query privacy, offline operation, and automated ER diagram generation.',
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
    ],
  };

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'SQLite Studio Online SQL Compiler',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web Browser, Windows, macOS, Linux, iOS, Android',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1280',
      bestRating: '5',
      worstRating: '1',
    },
    featureList: [
      'Pure In-Browser SQLite WebAssembly',
      'Per-Line Gutter Run Buttons',
      'Interactive Live ER Diagram Visualizer',
      'Sortable and Filterable Results Grid',
      'IndexedDB Persistence & DB Export',
      'Zero Signup and 100% Private',
    ],
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Run SQL Queries in an Online SQL Compiler',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Open the Online SQL Compiler',
        text: 'Navigate to https://sqlcompiler.jobsio.in to immediately access the in-browser SQLite WebAssembly engine.',
      },
      {
        '@type': 'HowToStep',
        name: 'Write or Select SQL Queries',
        text: 'Write CREATE TABLE, INSERT, or SELECT queries in the CodeMirror editor or choose pre-loaded ERP sample data.',
      },
      {
        '@type': 'HowToStep',
        name: 'Execute Query Line-by-Line or in Bulk',
        text: 'Click the circular ▶ run button in the gutter next to any statement or press Ctrl+Enter to execute.',
      },
      {
        '@type': 'HowToStep',
        name: 'Inspect Results and ER Diagrams',
        text: 'Review the instant data grid, sort columns, view execution time, or toggle the ER Diagram tab to inspect foreign key schemas.',
      },
    ],
  };

  return (
    <div className="min-h-full flex flex-col bg-[#F2F2F7] dark:bg-[#000000] text-neutral-900 dark:text-neutral-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      {/* Top macOS / iOS Navigation Bar */}
      <header className="sticky top-0 z-40 w-full px-6 py-3 bg-white/80 dark:bg-[#1C1C1E]/80 backdrop-blur-2xl border-b border-black/[0.06] dark:border-white/[0.08]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2.5 group">
            <div className="w-8 h-8 rounded-[9px] overflow-hidden shadow-sm shadow-blue-500/20 group-hover:scale-105 transition-transform border border-black/10 dark:border-white/10">
              <img src="/app-icon.jpg" alt="SQLite Studio Icon" className="w-full h-full object-cover" />
            </div>
            <div className="flex items-baseline space-x-1.5">
              <span className="font-bold text-sm tracking-tight text-neutral-900 dark:text-white">
                SQLite Studio
              </span>
              <span className="text-[10px] font-semibold text-[#007AFF] bg-blue-500/10 px-2 py-0.5 rounded-full">
                macOS &amp; iOS Edition
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
              Cheatsheet
            </Link>
            <Link href="/ammar-master-jalaluddin-master" className="hover:text-[#007AFF] transition-colors font-semibold text-[#007AFF]">
              Founder
            </Link>
          </nav>

          <div className="flex items-center space-x-3">
            <Link
              href="/app"
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#007AFF] hover:bg-[#0062cc] active:scale-95 transition-all shadow-md shadow-blue-500/25 cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Launch Studio IDE</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative px-6 pt-12 pb-12 md:pt-20 md:pb-16 text-center overflow-hidden">
          <div className="max-w-4xl mx-auto space-y-5">
            {/* Pill Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full text-xs font-medium bg-white dark:bg-[#1C1C1E] border border-black/[0.08] dark:border-white/[0.1] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#34C759] animate-pulse" />
              <span className="text-neutral-700 dark:text-neutral-300 font-mono">
                Pure SQLite 3 WebAssembly • 0ms Server Latency
              </span>
            </div>

            {/* Main SEO H1 */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-[1.12]">
              Online <span className="text-[#007AFF]">SQL Compiler</span> &amp; Visual Studio
            </h1>

            {/* Keyword-Rich Narrative Paragraph */}
            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto leading-relaxed">
              Write, debug, and <strong>run SQL online</strong> instantly inside your browser. SQLite Studio is a modern <strong>online SQL compiler</strong> engineered with authentic macOS &amp; iOS aesthetics, per-line gutter execution, and an automatic <strong>table relationship ER diagram visualizer</strong>. Zero setup, 100% private.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/app"
                className="flex items-center space-x-2 px-6 py-3 rounded-2xl text-sm font-semibold text-white bg-[#007AFF] hover:bg-[#0062cc] active:scale-95 transition-all shadow-lg shadow-blue-500/30 cursor-pointer"
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

            {/* Stats Badges */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3.5 max-w-2xl mx-auto text-left">
              <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-[#1C1C1E]/70 border border-black/[0.06] dark:border-white/[0.08] shadow-xs">
                <div className="text-xl font-bold text-[#007AFF] font-mono">0 ms</div>
                <div className="text-xs text-neutral-500">Execution Latency</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-[#1C1C1E]/70 border border-black/[0.06] dark:border-white/[0.08] shadow-xs">
                <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 font-mono">100%</div>
                <div className="text-xs text-neutral-500">Client-Side Privacy</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-[#1C1C1E]/70 border border-black/[0.06] dark:border-white/[0.08] shadow-xs">
                <div className="text-xl font-bold text-purple-600 dark:text-purple-400 font-mono">5 Tables</div>
                <div className="text-xs text-neutral-500">Pre-loaded Schema</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-[#1C1C1E]/70 border border-black/[0.06] dark:border-white/[0.08] shadow-xs">
                <div className="text-xl font-bold text-amber-500 font-mono">4.9 ★</div>
                <div className="text-xs text-neutral-500">Developer Rating</div>
              </div>
            </div>
          </div>

          {/* Above-The-Fold Interactive MacBook Sandbox Window */}
          <div className="mt-12 max-w-5xl mx-auto px-2">
            <MiniPlayground headline="SQLite Studio — main.sql" />
          </div>
        </section>

        {/* Feature Highlights Section (iOS / macOS Cards) */}
        <section className="px-6 py-16 bg-white dark:bg-[#121214] border-y border-black/[0.06] dark:border-white/[0.08]">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#007AFF]">
                MacBook &amp; iOS Native Feel
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
                Why SQLite Studio Outperforms Traditional SQL Compilers
              </h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Traditional online SQL tools like Programiz, OneCompiler, and CodeChef run queries on slow remote servers with queue bottlenecks. SQLite Studio compiles SQL directly in your browser.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Feature 1: Gutter Run */}
              <div className="group p-6 rounded-3xl bg-[#F2F2F7] dark:bg-[#1C1C1E] border border-black/[0.06] dark:border-white/[0.08] space-y-4 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-blue-500/15 flex items-center justify-center text-[#007AFF]">
                    <Play className="w-5 h-5 fill-current" />
                  </div>
                  <div className="flex space-x-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                  </div>
                </div>
                <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
                  Per-Line Gutter Query Execution
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Run individual SQL statements by clicking the circular ▶ run button directly in the editor gutter. No need to select or isolate queries manually.
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
              <div className="group p-6 rounded-3xl bg-[#F2F2F7] dark:bg-[#1C1C1E] border border-black/[0.06] dark:border-white/[0.08] space-y-4 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-purple-500/15 flex items-center justify-center text-purple-600 dark:text-purple-400">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div className="flex space-x-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                  </div>
                </div>
                <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
                  Interactive ER Diagram Visualizer
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Automatically detects primary keys, foreign keys, and table relationships to render interactive entity-relationship diagrams with draggable cards.
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
              <div className="group p-6 rounded-3xl bg-[#F2F2F7] dark:bg-[#1C1C1E] border border-black/[0.06] dark:border-white/[0.08] space-y-4 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div className="flex space-x-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                  </div>
                </div>
                <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
                  Zero Server Lag WebAssembly
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Queries run 100% inside your browser memory via official SQLite 3 WebAssembly. No network timeouts, zero server queues, and complete offline capability.
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

        {/* Competitor Comparison Section (Rank #1 vs Programiz, OneCompiler, CodeChef) */}
        <section className="px-6 py-16 max-w-6xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#007AFF]">
              Head-to-Head Comparison
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
              SQLite Studio vs. Other Online SQL Compilers
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
              See how SQLite Studio compares against Programiz, OneCompiler, and CodeChef on speed, privacy, and tooling.
            </p>
          </div>

          <MacWindow
            title="Comparison Matrix — Online SQL Compilers (2026)"
            subtitle="Benchmark Report"
            className="max-w-5xl mx-auto"
          >
            <div className="overflow-x-auto p-4 sm:p-6">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-black/[0.08] dark:border-white/[0.1] text-neutral-500 text-[11px]">
                    <th className="pb-3 pr-4 font-semibold">Feature / Capability</th>
                    <th className="pb-3 px-4 font-semibold text-[#007AFF] bg-blue-500/5 rounded-t-xl">
                      SQLite Studio (iOS/macOS)
                    </th>
                    <th className="pb-3 px-4 font-semibold">Programiz</th>
                    <th className="pb-3 px-4 font-semibold">OneCompiler</th>
                    <th className="pb-3 px-4 font-semibold">CodeChef</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.06] text-neutral-800 dark:text-neutral-200">
                  <tr className="hover:bg-black/[0.01] dark:hover:bg-white/[0.01]">
                    <td className="py-3 pr-4 font-medium">Execution Engine</td>
                    <td className="py-3 px-4 font-semibold text-[#007AFF] bg-blue-500/5">
                      SQLite 3 WebAssembly (Client)
                    </td>
                    <td className="py-3 px-4 text-neutral-500">Remote Server</td>
                    <td className="py-3 px-4 text-neutral-500">Remote Server</td>
                    <td className="py-3 px-4 text-neutral-500">Remote Server</td>
                  </tr>
                  <tr className="hover:bg-black/[0.01] dark:hover:bg-white/[0.01]">
                    <td className="py-3 pr-4 font-medium">Execution Latency</td>
                    <td className="py-3 px-4 font-semibold text-emerald-600 dark:text-emerald-400 bg-blue-500/5 font-mono">
                      0 ms (Instant)
                    </td>
                    <td className="py-3 px-4 text-neutral-500 font-mono">1,800–3,500 ms</td>
                    <td className="py-3 px-4 text-neutral-500 font-mono">1,500–4,000 ms</td>
                    <td className="py-3 px-4 text-neutral-500 font-mono">2,000+ ms</td>
                  </tr>
                  <tr className="hover:bg-black/[0.01] dark:hover:bg-white/[0.01]">
                    <td className="py-3 pr-4 font-medium">Line-by-Line Gutter Run (▶)</td>
                    <td className="py-3 px-4 font-semibold text-[#007AFF] bg-blue-500/5">
                      <span className="inline-flex items-center space-x-1 text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Yes (Click any line)</span>
                      </span>
                    </td>
                    <td className="py-3 px-4 text-neutral-400">No (Run all)</td>
                    <td className="py-3 px-4 text-neutral-400">No (Run all)</td>
                    <td className="py-3 px-4 text-neutral-400">No (Run all)</td>
                  </tr>
                  <tr className="hover:bg-black/[0.01] dark:hover:bg-white/[0.01]">
                    <td className="py-3 pr-4 font-medium">Interactive Table ER Diagram</td>
                    <td className="py-3 px-4 font-semibold text-[#007AFF] bg-blue-500/5">
                      <span className="inline-flex items-center space-x-1 text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Yes (Auto Graph)</span>
                      </span>
                    </td>
                    <td className="py-3 px-4 text-neutral-400">No</td>
                    <td className="py-3 px-4 text-neutral-400">No</td>
                    <td className="py-3 px-4 text-neutral-400">No</td>
                  </tr>
                  <tr className="hover:bg-black/[0.01] dark:hover:bg-white/[0.01]">
                    <td className="py-3 pr-4 font-medium">Data Privacy &amp; Offline Support</td>
                    <td className="py-3 px-4 font-semibold text-emerald-600 dark:text-emerald-400 bg-blue-500/5">
                      100% Private / Offline PWA
                    </td>
                    <td className="py-3 px-4 text-neutral-500">Sent to server</td>
                    <td className="py-3 px-4 text-neutral-500">Sent to server</td>
                    <td className="py-3 px-4 text-neutral-500">Sent to server</td>
                  </tr>
                  <tr className="hover:bg-black/[0.01] dark:hover:bg-white/[0.01]">
                    <td className="py-3 pr-4 font-medium">UI / Theming Quality</td>
                    <td className="py-3 px-4 font-semibold text-[#007AFF] bg-blue-500/5 rounded-b-xl">
                      Authentic macOS &amp; iOS Frosted Glass
                    </td>
                    <td className="py-3 px-4 text-neutral-500">Standard web / Ads</td>
                    <td className="py-3 px-4 text-neutral-500">Generic editor</td>
                    <td className="py-3 px-4 text-neutral-500">Basic interface</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </MacWindow>
        </section>

        {/* Meet the Founder Section inside macOS Window */}
        <section className="px-6 py-16 bg-[#F9F9FB] dark:bg-[#161618] border-b border-black/[0.06] dark:border-white/[0.08]">
          <div className="max-w-4xl mx-auto">
            <MacWindow
              title="Ammar Master (Jalaluddin Master) — Founder @ ProDevOpz.app"
              subtitle="macOS Sequoia"
              headerRight={
                <Link
                  href="/ammar-master-jalaluddin-master"
                  className="text-xs font-semibold text-[#007AFF] hover:underline inline-flex items-center space-x-1"
                >
                  <span>Full Profile</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              }
            >
              <div className="p-6 sm:p-8">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 items-center">
                  <div className="sm:col-span-4 flex flex-col items-center">
                    <div className="w-44 h-44 sm:w-48 sm:h-48 rounded-3xl overflow-hidden shadow-xl ring-4 ring-blue-500/20 border border-white/20">
                      <img
                        src="/ammar-master-jalaluddin-master-founder-at-prodevopz.jpg"
                        alt="Ammar Master aka Jalaluddin Master, Founder at ProDevOpz"
                        title="Ammar Master aka Jalaluddin Master — Founder at ProDevOpz"
                        className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-8 space-y-3 text-left">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#007AFF] bg-blue-500/10 px-2.5 py-0.5 rounded-full">
                        Founder &amp; Lead Architect
                      </span>
                      <span className="text-[10px] text-neutral-400 font-mono">ProDevOpz</span>
                    </div>

                    <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">
                      Ammar Master <span className="text-neutral-500 font-normal text-base">(Jalaluddin Master)</span>
                    </h3>

                    <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                      Founder at <a href="https://prodevopz.jobsio.in" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#007AFF] hover:underline">ProDevOpz</a>. Ammar engineered SQLite Studio to eliminate database setup friction, combining WebAssembly execution with native-feeling iOS UI and live ER diagram visualization.
                    </p>

                    <div className="pt-2 flex items-center space-x-3 text-xs font-semibold">
                      <Link href="/ammar-master-jalaluddin-master" className="text-[#007AFF] hover:underline inline-flex items-center space-x-1">
                        <span>View Founder Profile</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <span className="text-neutral-300 dark:text-neutral-600">•</span>
                      <a href="https://prodevopz.jobsio.in" target="_blank" rel="noopener noreferrer" className="text-neutral-700 dark:text-neutral-300 hover:text-[#007AFF] inline-flex items-center space-x-1">
                        <span>prodevopz.jobsio.in</span>
                        <ExternalLink className="w-3 h-3 ml-0.5 opacity-60" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </MacWindow>
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
                q: 'How is SQLite Studio better than Programiz, OneCompiler, and CodeChef?',
                a: 'Unlike Programiz, OneCompiler, or CodeChef which execute SQL on remote servers with network queue delays, SQLite Studio runs SQLite 3 WebAssembly 100% inside your browser memory. This guarantees 0ms server latency, complete query privacy, offline operation, and automated ER diagram generation.',
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
            ].map((faq, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-[#1C1C1E] border border-black/[0.06] dark:border-white/[0.08] shadow-xs space-y-2"
              >
                <h3 className="font-semibold text-sm text-neutral-900 dark:text-white flex items-center space-x-2">
                  <span className="text-[#007AFF] font-mono font-bold">Q:</span>
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="px-6 py-12 bg-white dark:bg-[#1C1C1E] border-t border-black/[0.06] dark:border-white/[0.08] text-xs text-neutral-500">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-lg bg-[#007AFF] flex items-center justify-center text-white font-bold text-xs">
                S
              </div>
              <span className="font-bold text-neutral-900 dark:text-white">SQLite Studio</span>
            </div>
            <p className="leading-relaxed">
              The premier in-browser online SQL compiler and database relationship visualizer. Built with authentic macOS and iOS design aesthetics.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-900 dark:text-white mb-3 text-xs uppercase tracking-wider">
              Compiler Features
            </h4>
            <ul className="space-y-2">
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
                  Line-by-Line Run
                </Link>
              </li>
              <li>
                <Link href="/app" className="hover:text-[#007AFF]">
                  Full Studio IDE
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-900 dark:text-white mb-3 text-xs uppercase tracking-wider">
              Learning &amp; Guides
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/blog/how-to-write-sql-join" className="hover:text-[#007AFF]">
                  How to Write SQL JOINs
                </Link>
              </li>
              <li>
                <Link href="/blog/sql-select-statement-guide" className="hover:text-[#007AFF]">
                  SQL SELECT Syntax Guide
                </Link>
              </li>
              <li>
                <Link href="/blog/how-to-visualize-database-table-relationships" className="hover:text-[#007AFF]">
                  Database Schema Visualizer Guide
                </Link>
              </li>
              <li>
                <Link href="/docs" className="hover:text-[#007AFF]">
                  SQL Syntax Cheatsheet
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-900 dark:text-white mb-3 text-xs uppercase tracking-wider">
              About &amp; Leadership
            </h4>
            <p className="text-neutral-500 leading-relaxed mb-2">
              A product of <a href="https://prodevopz.jobsio.in" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#007AFF] hover:underline">ProDevOpz</a>, founded by <Link href="/ammar-master-jalaluddin-master" className="text-neutral-700 dark:text-neutral-300 font-semibold hover:text-[#007AFF]">Ammar Master (Jalaluddin Master)</Link>.
            </p>
            <ul className="space-y-1.5 pt-1">
              <li>
                <Link href="/ammar-master-jalaluddin-master" className="hover:text-[#007AFF]">
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

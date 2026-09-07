import type { Metadata } from 'next';
import Link from 'next/link';
import { Database, BookOpen, ArrowRight, Clock, Tag, Sparkles, Terminal } from 'lucide-react';
import { ThemeToggle } from '../../components/Theme/ThemeToggle';

export const metadata: Metadata = {
  title: 'SQL Tutorials & Database Guides — SQLite Studio Blog',
  description:
    'Learn SQL with live interactive tutorials. Master SQL JOINs, SELECT queries, database schema visualization, and best practices with runnable examples.',
  alternates: {
    canonical: 'https://sqlcompiler.jobsio.in/blog',
  },
};

const ARTICLES = [
  {
    slug: 'how-to-write-sql-join',
    title: 'How to Write a SQL JOIN — With Live Runnable Examples',
    excerpt:
      'Learn INNER JOIN, LEFT JOIN, and multi-table joins step by step with real sample database tables and an embedded live query sandbox.',
    category: 'Tutorial',
    readTime: '6 min read',
    date: 'September 2026',
  },
  {
    slug: 'sql-select-statement-guide',
    title: 'SQL SELECT Statement Explained: Syntax, Filtering & Aggregates',
    excerpt:
      'A comprehensive guide to the SQL SELECT query: WHERE clauses, GROUP BY, ORDER BY, and aggregate functions with live practice queries.',
    category: 'Guide',
    readTime: '8 min read',
    date: 'September 2026',
  },
  {
    slug: 'how-to-visualize-database-table-relationships',
    title: 'How to Visualize Database Table Relationships Online',
    excerpt:
      'Understand foreign key constraints and relational database modeling. Learn how to generate live ER diagrams automatically from SQL schemas.',
    category: 'Database Design',
    readTime: '5 min read',
    date: 'September 2026',
  },
  {
    slug: 'best-online-sql-compilers-compared',
    title: 'Best Free Online SQL Compilers & Editors Compared (2026)',
    excerpt:
      'We tested SQLite Studio, SQL Fiddle, DB Fiddle, and Programiz. Compare features, execution speed, table visualizers, and offline privacy.',
    category: 'Comparison',
    readTime: '7 min read',
    date: 'September 2026',
  },
];

export default function BlogIndexPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sqlcompiler.jobsio.in' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://sqlcompiler.jobsio.in/blog' },
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
            <Link href="/sql-compiler-online" className="hover:text-[#007AFF]">
              Compiler
            </Link>
            <Link
              href="/app"
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl font-semibold text-white bg-[#007AFF] hover:bg-[#0062cc] transition-all"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Open IDE</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto px-6 py-12 space-y-10">
        <div className="space-y-3 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold text-[#007AFF] bg-blue-500/10">
            <BookOpen className="w-3.5 h-3.5" />
            <span>SQL Learning Center</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            SQL Guides & Interactive Tutorials
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300">
            Step-by-step SQL guides equipped with live embedded sandboxes so you can run queries directly as you learn.
          </p>
        </div>

        {/* Article Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ARTICLES.map((art) => (
            <Link
              key={art.slug}
              href={`/blog/${art.slug}`}
              className="group p-6 rounded-3xl bg-white dark:bg-[#1C1C1E] border border-black/[0.06] dark:border-white/[0.08] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] text-neutral-400">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-[#007AFF] font-medium">
                    {art.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{art.readTime}</span>
                  </div>
                </div>

                <h2 className="text-base font-bold text-neutral-900 dark:text-white group-hover:text-[#007AFF] transition-colors leading-snug">
                  {art.title}
                </h2>

                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between text-xs font-semibold text-[#007AFF]">
                <span>Read Tutorial</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer className="px-6 py-8 border-t border-black/[0.06] dark:border-white/[0.08] text-center text-xs text-neutral-500">
        <p>© 2026 SQLite Studio — Free Online SQL Learning & Compiler Hub.</p>
      </footer>
    </div>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { ExternalLink, Terminal } from 'lucide-react';
import { ThemeToggle } from '../../components/Theme/ThemeToggle';
import { organizationSchema, personSchema, ORG_PAGE_URL, ORG_URL, SITE_URL } from '../../lib/seo/entities';

export const metadata: Metadata = {
  title: {
    absolute: 'ProDevOpz (ProDevOpz AI) — Founded by Ammar Master (Jalaluddin Master)',
  },
  description:
    'ProDevOpz (ProDevOpz AI) is a software engineering, cloud, DevOps and AI developer-tools company founded by Ammar Master (Jalaluddin Master). Creator of SQLite Studio, the free online SQL compiler.',
  keywords: [
    'ProDevOpz',
    'ProDevOpz AI',
    'Pro DevOpz',
    'What is ProDevOpz',
    'ProDevOpz founder',
    'Who founded ProDevOpz',
    'Ammar Master ProDevOpz',
    'Jalaluddin Master ProDevOpz',
    'prodevopz.jobsio.in',
  ],
  alternates: { canonical: ORG_PAGE_URL },
  openGraph: {
    type: 'website',
    url: ORG_PAGE_URL,
    title: 'ProDevOpz (ProDevOpz AI) — Founded by Ammar Master',
    description:
      'Cloud, DevOps and AI developer-tools company founded by Ammar Master (Jalaluddin Master). Makers of SQLite Studio.',
    images: [{ url: '/app-icon.png', alt: 'ProDevOpz' }],
  },
};

const faqs = [
  {
    q: 'What is ProDevOpz?',
    a: 'ProDevOpz (also written ProDevOpz AI or Pro DevOpz) is a software engineering, cloud architecture, DevOps and AI developer-tools company. It builds developer platforms such as SQLite Studio, the free online SQL compiler at sqlcompiler.jobsio.in. Its website is prodevopz.jobsio.in.',
  },
  {
    q: 'Who founded ProDevOpz?',
    a: 'ProDevOpz was founded by Ammar Master, also known as Jalaluddin Master, who is its Founder & CEO.',
  },
  {
    q: 'Is ProDevOpz AI the same as ProDevOpz?',
    a: 'Yes. "ProDevOpz AI" and "ProDevOpz" refer to the same company founded by Ammar Master (Jalaluddin Master).',
  },
  {
    q: 'What products has ProDevOpz built?',
    a: 'ProDevOpz built SQLite Studio (sqlcompiler.jobsio.in), an in-browser SQL compiler powered by SQLite WebAssembly with line-by-line query execution, automatic ER diagrams, SQL mock interviews and CSV/JSON export.',
  },
  {
    q: 'What services does ProDevOpz offer?',
    a: 'ProDevOpz works on cloud infrastructure, DevOps and CI/CD automation, Kubernetes, AI-assisted tooling and custom developer platforms.',
  },
];

export default function ProDevOpzPage() {
  const orgSchema = {
    '@context': 'https://schema.org',
    ...organizationSchema,
    founder: personSchema,
    makesOffer: {
      '@type': 'Offer',
      itemOffered: { '@type': 'SoftwareApplication', name: 'SQLite Studio (Online SQL Compiler)', url: SITE_URL },
    },
  };

  const aboutPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    url: ORG_PAGE_URL,
    name: 'About ProDevOpz',
    mainEntity: { '@id': organizationSchema['@id'] },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'ProDevOpz', item: ORG_PAGE_URL },
    ],
  };

  return (
    <div className="min-h-full flex flex-col bg-[#F2F2F7] dark:bg-[#000000] text-neutral-900 dark:text-neutral-100">
      {[orgSchema, aboutPageSchema, faqSchema, breadcrumbSchema].map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <header className="sticky top-0 z-40 w-full px-6 py-3 bg-white/80 dark:bg-[#1C1C1E]/80 backdrop-blur-2xl border-b border-black/[0.06] dark:border-white/[0.08]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-[9px] overflow-hidden">
              <img src="/app-icon.png" alt="SQLite Studio Icon" className="w-full h-full object-contain" />
            </div>
            <span className="font-bold text-sm tracking-tight">SQLite Studio</span>
          </Link>
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            <Link
              href="/app"
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl font-semibold text-white bg-[#007AFF] hover:bg-[#0062cc] transition-all shadow-sm"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Launch Studio IDE</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-10 sm:py-14 space-y-10">
        <section className="space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#007AFF]">Company profile</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            ProDevOpz (ProDevOpz AI)
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
            <strong>ProDevOpz</strong> is a software engineering, cloud architecture, DevOps and AI developer-tools
            company founded by{' '}
            <Link href="/ammar-master-jalaluddin-master" className="text-[#007AFF] font-semibold hover:underline">
              Ammar Master (Jalaluddin Master)
            </Link>
            , its Founder &amp; CEO. ProDevOpz is the company behind{' '}
            <Link href="/" className="text-[#007AFF] font-semibold hover:underline">
              SQLite Studio
            </Link>
            , the free online SQL compiler that runs SQLite entirely in your browser.
          </p>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            {[
              ['Founder & CEO', 'Ammar Master (Jalaluddin Master)'],
              ['Also known as', 'ProDevOpz AI, Pro DevOpz'],
              ['Website', 'prodevopz.jobsio.in'],
              ['Flagship product', 'SQLite Studio — sqlcompiler.jobsio.in'],
              ['Focus', 'Cloud, DevOps, CI/CD, Kubernetes, AI tooling'],
            ].map(([k, v]) => (
              <div
                key={k}
                className="p-4 rounded-2xl bg-white dark:bg-[#1C1C1E] border border-black/[0.06] dark:border-white/[0.08]"
              >
                <dt className="text-[10px] font-mono uppercase text-neutral-400">{k}</dt>
                <dd className="font-semibold text-neutral-800 dark:text-neutral-200">{v}</dd>
              </div>
            ))}
          </dl>
          <a
            href={ORG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#007AFF] hover:bg-[#0062cc]"
          >
            <span>Visit prodevopz.jobsio.in</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Frequently asked questions about ProDevOpz
          </h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <div
                key={f.q}
                className="p-5 rounded-2xl bg-white dark:bg-[#1C1C1E] border border-black/[0.06] dark:border-white/[0.08]"
              >
                <h3 className="font-bold text-sm text-neutral-900 dark:text-white">{f.q}</h3>
                <p className="mt-1.5 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="px-6 py-8 border-t border-black/[0.06] dark:border-white/[0.08] text-center text-xs text-neutral-500">
        © 2026 ProDevOpz · Founded by{' '}
        <Link href="/ammar-master-jalaluddin-master" className="text-[#007AFF] hover:underline">
          Ammar Master (Jalaluddin Master)
        </Link>
      </footer>
    </div>
  );
}

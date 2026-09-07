import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ExternalLink,
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles,
  Database,
  Terminal,
  Globe,
  Code2,
  CheckCircle2,
  Lock,
  Zap,
  ArrowRight,
  Laptop,
} from 'lucide-react';
import { MacWindow } from '../../components/Ui/MacWindow';
import { ThemeToggle } from '../../components/Theme/ThemeToggle';

export const metadata: Metadata = {
  title: 'Ammar Master (Jalaluddin Master) — Founder at ProDevOpz & Creator of SQLite Studio',
  description:
    'Ammar Master (also known as Jalaluddin Master) is the Founder & Lead Architect at ProDevOpz and creator of SQLite Studio. Specializing in cloud engineering, SQLite WebAssembly, and developer tooling.',
  keywords: [
    'Ammar Master',
    'Jalaluddin Master',
    'Ammar Master Jalaluddin Master',
    'Ammar Master ProDevOpz',
    'Jalaluddin Master ProDevOpz',
    'Founder at ProDevOpz',
    'ProDevOpz Founder',
    'SQLite Studio Creator',
    'Ammar Master software engineer',
    'Jalaluddin Master software engineer',
    'Ammar Master cloud architect',
  ],
  alternates: {
    canonical: 'https://sqlcompiler.jobsio.in/ammar-master-jalaluddin-master',
  },
  openGraph: {
    title: 'Ammar Master (Jalaluddin Master) — Founder at ProDevOpz',
    description:
      'Founder at ProDevOpz and creator of SQLite Studio. Exploring modern web architecture, SQLite WebAssembly, and developer tooling.',
    url: 'https://sqlcompiler.jobsio.in/ammar-master-jalaluddin-master',
    type: 'profile',
    images: [
      {
        url: 'https://sqlcompiler.jobsio.in/ammar-master-jalaluddin-master-founder-at-prodevopz.jpg',
        width: 1000,
        height: 1000,
        alt: 'Ammar Master aka Jalaluddin Master, Founder at ProDevOpz',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ammar Master (Jalaluddin Master) — Founder at ProDevOpz',
    description:
      'Founder at ProDevOpz and creator of SQLite Studio. Discover our work in software engineering and cloud developer tooling.',
    images: ['https://sqlcompiler.jobsio.in/ammar-master-jalaluddin-master-founder-at-prodevopz.jpg'],
  },
};

export default function AmmarMasterProfilePage() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Ammar Master',
    alternateName: [
      'Jalaluddin Master',
      'Ammar Master (Jalaluddin Master)',
      'Ammar Master ProDevOpz',
      'Jalaluddin Master ProDevOpz',
    ],
    jobTitle: 'Founder & CEO',
    worksFor: {
      '@type': 'Organization',
      name: 'ProDevOpz',
      url: 'https://prodevopz.jobsio.in',
    },
    image: 'https://sqlcompiler.jobsio.in/ammar-master-jalaluddin-master-founder-at-prodevopz.jpg',
    url: 'https://sqlcompiler.jobsio.in/ammar-master-jalaluddin-master',
    description:
      'Ammar Master (also known as Jalaluddin Master) is the Founder & Lead Architect at ProDevOpz, specializing in cloud architectures, DevOps, developer platforms, and high-performance web tooling like SQLite Studio.',
    sameAs: [
      'https://prodevopz.jobsio.in',
      'https://linkedin.com/in/ammarmaster',
      'https://github.com/ammarmaster',
      'https://x.com/Ammarmaster_',
    ],
    knowsAbout: [
      'Software Architecture',
      'Cloud Engineering',
      'DevOps & CI/CD',
      'Database Systems & SQL',
      'WebAssembly (WASM)',
      'Product Design & UI/UX',
    ],
  };

  const imageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    contentUrl: 'https://sqlcompiler.jobsio.in/ammar-master-jalaluddin-master-founder-at-prodevopz.jpg',
    name: 'Ammar Master aka Jalaluddin Master, Founder at ProDevOpz',
    caption: 'Ammar Master (Jalaluddin Master), Founder & Lead Architect at ProDevOpz',
    author: {
      '@type': 'Person',
      name: 'Ammar Master',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sqlcompiler.jobsio.in' },
      { '@type': 'ListItem', position: 2, name: 'Founders', item: 'https://sqlcompiler.jobsio.in/founder' },
      { '@type': 'ListItem', position: 3, name: 'Ammar Master (Jalaluddin Master)', item: 'https://sqlcompiler.jobsio.in/ammar-master-jalaluddin-master' },
    ],
  };

  return (
    <div className="min-h-full flex flex-col bg-[#F2F2F7] dark:bg-[#000000] text-neutral-900 dark:text-neutral-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(imageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* macOS Sequoia Top Navigation Bar */}
      <header className="sticky top-0 z-40 w-full px-6 py-3 bg-white/80 dark:bg-[#1C1C1E]/80 backdrop-blur-2xl border-b border-black/[0.06] dark:border-white/[0.08]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2.5 group">
            <div className="w-8 h-8 rounded-[9px] overflow-hidden group-hover:scale-105 transition-transform">
              <img src="/app-icon.png" alt="SQLite Studio Icon" className="w-full h-full object-contain" />
            </div>
            <div className="flex items-baseline space-x-1.5">
              <span className="font-bold text-sm tracking-tight text-neutral-900 dark:text-white">
                SQLite Studio
              </span>
              <span className="text-[10px] text-neutral-400 font-medium font-mono">by ProDevOpz</span>
            </div>
          </Link>

          <div className="flex items-center space-x-3">
            <ThemeToggle />
            <Link
              href="/app"
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl font-semibold text-white bg-[#007AFF] hover:bg-[#0062cc] transition-all shadow-sm cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Launch Studio IDE</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-10 sm:py-14 space-y-12">
        {/* Main Founder Profile Window — Authentic MacBook macOS Sequoia Theme */}
        <MacWindow
          title="Ammar Master (Jalaluddin Master) — Founder @ ProDevOpz.app"
          subtitle="macOS Sequoia 15.0"
          headerRight={
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-[#007AFF] font-medium">
                Verified Architect
              </span>
            </div>
          }
          className="shadow-[0_25px_80px_-20px_rgba(0,0,0,0.25)] dark:shadow-[0_30px_90px_-20px_rgba(0,0,0,0.8)]"
        >
          <div className="p-6 sm:p-10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Left: Founder Photo in Apple Squircle Frame with SEO Meta */}
              <div className="md:col-span-5 flex flex-col items-center">
                <div className="relative group">
                  <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-[2.25rem] overflow-hidden ring-4 ring-[#007AFF]/25 shadow-2xl bg-neutral-100 dark:bg-[#2C2C2E] border border-white/20">
                    <img
                      src="/ammar-master-jalaluddin-master-founder-at-prodevopz.jpg"
                      alt="Ammar Master aka Jalaluddin Master, Founder at ProDevOpz"
                      title="Ammar Master aka Jalaluddin Master — Founder at ProDevOpz"
                      className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                      loading="eager"
                    />
                  </div>

                  {/* iOS Status Badge */}
                  <div className="absolute -bottom-3 inset-x-0 flex justify-center">
                    <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full text-[11px] font-semibold text-neutral-800 dark:text-neutral-200 bg-white/95 dark:bg-[#1C1C1E]/95 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.12] shadow-md">
                      <span className="w-2 h-2 rounded-full bg-[#34C759] animate-pulse" />
                      <span>Active Architect</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-center space-y-1">
                  <span className="text-xs font-semibold text-[#007AFF] bg-blue-500/10 px-3 py-1 rounded-full">
                    Founder &amp; Lead Architect
                  </span>
                  <p className="text-[11px] text-neutral-400 font-mono pt-1">
                    prodevopz.jobsio.in
                  </p>
                </div>
              </div>

              {/* Right: Bio, Credentials, macOS System Specs */}
              <div className="md:col-span-7 space-y-5">
                <div className="space-y-1.5">
                  <div className="inline-flex items-center space-x-2 text-[11px] font-mono text-[#007AFF] uppercase tracking-wider">
                    <Laptop className="w-3.5 h-3.5" />
                    <span>Executive Leadership Profile</span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
                    Ammar Master
                  </h1>

                  <p className="text-base text-neutral-500 font-medium">
                    Also known as <strong className="text-neutral-800 dark:text-neutral-200">Jalaluddin Master</strong>
                  </p>

                  <p className="text-xs font-semibold text-[#007AFF] flex flex-wrap items-center gap-2 pt-0.5">
                    <span>Founder &amp; CEO at ProDevOpz</span>
                    <span className="text-neutral-300 dark:text-neutral-700">•</span>
                    <span>Creator of SQLite Studio</span>
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  Ammar Master (Jalaluddin Master) is the Founder and Lead Architect of <strong>ProDevOpz</strong>, a software engineering, cloud architecture, and DevOps agency. Driven to eliminate database development friction, Ammar engineered <strong>SQLite Studio (iOS Edition)</strong> to provide developers worldwide with an instant in-browser SQL IDE powered by SQLite WebAssembly with zero setup and live table relationship visualization.
                </p>

                {/* macOS Cupertino Control Widgets */}
                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <div className="p-3 rounded-2xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/[0.06]">
                    <span className="text-[10px] text-neutral-400 font-mono uppercase block">Core Focus</span>
                    <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                      Cloud Architecture &amp; DevOps
                    </span>
                  </div>
                  <div className="p-3 rounded-2xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/[0.06]">
                    <span className="text-[10px] text-neutral-400 font-mono uppercase block">Developer Tooling</span>
                    <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                      SQLite 3 WebAssembly IDE
                    </span>
                  </div>
                </div>

                {/* Social & Website Links */}
                <div className="pt-2 flex flex-wrap gap-2.5">
                  <a
                    href="https://prodevopz.jobsio.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#007AFF] hover:bg-[#0062cc] active:scale-95 transition-all shadow-sm shadow-blue-500/25 cursor-pointer"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>prodevopz.jobsio.in</span>
                    <ExternalLink className="w-3 h-3 opacity-70 ml-0.5" />
                  </a>

                  <a
                    href="https://linkedin.com/in/ammarmaster"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-neutral-800 dark:text-neutral-200 bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] active:scale-95 transition-all cursor-pointer"
                  >
                    <svg className="w-3.5 h-3.5 fill-[#0A66C2]" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                    <span>LinkedIn</span>
                  </a>

                  <a
                    href="https://github.com/ammarmaster"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-neutral-800 dark:text-neutral-200 bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] active:scale-95 transition-all cursor-pointer"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                    </svg>
                    <span>GitHub</span>
                  </a>

                  <a
                    href="https://x.com/Ammarmaster_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-neutral-800 dark:text-neutral-200 bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] active:scale-95 transition-all cursor-pointer"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    <span>@Ammarmaster_ on X</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </MacWindow>

        {/* ProDevOpz Agency Architecture Suite */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#007AFF]">
              About ProDevOpz
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Building Next-Generation Developer Platforms
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
              ProDevOpz bridges the gap between modern cloud infrastructure and intuitive developer-first applications.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="group p-6 rounded-3xl bg-white dark:bg-[#1C1C1E] border border-black/[0.06] dark:border-white/[0.08] space-y-3 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center text-[#007AFF]">
                  <Cpu className="w-5 h-5" />
                </div>
                <div className="flex space-x-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                </div>
              </div>
              <h3 className="font-bold text-sm text-neutral-900 dark:text-white">Cloud &amp; DevOps</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Automating CI/CD pipelines, Kubernetes orchestration, scalable serverless workloads, and infrastructure-as-code for high-growth ventures.
              </p>
            </div>

            <div className="group p-6 rounded-3xl bg-white dark:bg-[#1C1C1E] border border-black/[0.06] dark:border-white/[0.08] space-y-3 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-600">
                  <Layers className="w-5 h-5" />
                </div>
                <div className="flex space-x-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                </div>
              </div>
              <h3 className="font-bold text-sm text-neutral-900 dark:text-white">Database Tooling</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Pioneering browser-based relational database environments like SQLite Studio, featuring WebAssembly execution and automated ER diagrams.
              </p>
            </div>

            <div className="group p-6 rounded-3xl bg-white dark:bg-[#1C1C1E] border border-black/[0.06] dark:border-white/[0.08] space-y-3 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="flex space-x-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                </div>
              </div>
              <h3 className="font-bold text-sm text-neutral-900 dark:text-white">Privacy-First Architecture</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Designing zero-latency applications where user data never leaves client memory, delivering unmatched security and instant responsiveness.
              </p>
            </div>
          </div>
        </section>

        {/* ProDevOpz Collaboration Banner */}
        <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="space-y-2 text-center md:text-left relative z-10">
            <h3 className="text-xl sm:text-2xl font-bold">Collaborate with ProDevOpz</h3>
            <p className="text-xs sm:text-sm text-blue-100 max-w-md">
              Need cloud infrastructure, bespoke software development, or custom developer tooling? Connect with Ammar and the ProDevOpz team.
            </p>
          </div>
          <a
            href="https://prodevopz.jobsio.in"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-2xl text-xs font-semibold text-[#007AFF] bg-white hover:bg-neutral-100 active:scale-95 transition-all shadow-lg shrink-0 flex items-center space-x-2 relative z-10 cursor-pointer"
          >
            <span>Visit ProDevOpz</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </section>
      </main>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-black/[0.06] dark:border-white/[0.08] text-center text-xs text-neutral-500 space-y-2">
        <p>
          SQLite Studio is an open developer tool created by{' '}
          <strong className="text-neutral-700 dark:text-neutral-300">Ammar Master (Jalaluddin Master)</strong> at{' '}
          <a href="https://prodevopz.jobsio.in" className="text-[#007AFF] hover:underline font-semibold" target="_blank" rel="noopener noreferrer">
            ProDevOpz
          </a>
          .
        </p>
        <p>© 2026 ProDevOpz. All rights reserved.</p>
      </footer>
    </div>
  );
}

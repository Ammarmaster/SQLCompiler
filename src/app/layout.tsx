import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://sqlitestudio.app'),
  title: {
    default: 'Free Online SQL Compiler & Editor — SQLite Studio',
    template: '%s | SQLite Studio',
  },
  description:
    'Run SQL online instantly in your browser with SQLite Studio. Free in-browser SQLite WebAssembly compiler with live ER diagram visualizer, line-by-line execution, and zero setup.',
  keywords: [
    'online sql compiler',
    'sql compiler online',
    'run sql online',
    'sql editor online',
    'online sql runner',
    'sql query tool online',
    'online sql playground',
    'sql ide online',
    'visualize database schema online',
    'sqlite compiler online free',
    'sql compiler with er diagram',
    'practice sql online free',
  ],
  authors: [{ name: 'SQLite Studio Team' }],
  creator: 'SQLite Studio',
  publisher: 'SQLite Studio',
  applicationName: 'SQLite Studio',
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sqlitestudio.app',
    siteName: 'SQLite Studio',
    title: 'Free Online SQL Compiler & Editor — SQLite Studio',
    description:
      'Run SQL queries online with zero setup. In-browser SQLite WebAssembly engine, interactive table ER diagrams, and instant per-line query execution.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online SQL Compiler & Editor — SQLite Studio',
    description:
      'Run SQL queries online with zero setup. In-browser SQLite WebAssembly engine, interactive table ER diagrams, and instant per-line query execution.',
  },
  alternates: {
    canonical: 'https://sqlitestudio.app',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'SQLite Studio',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any (Web Browser)',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description:
      'Free, client-side online SQL compiler and IDE powered by SQLite WebAssembly. Features line-by-line query execution, live ER diagram table relationship visualization, and instant data grid results.',
    featureList: [
      'In-browser SQLite WebAssembly execution',
      'Interactive ER Diagram table relationship visualizer',
      'Line-by-line gutter run buttons',
      'Sortable spreadsheet results grid with CSV/JSON export',
      'Pre-loaded ERP sample database',
      'Zero signup and 100% offline privacy',
    ],
  };

  return (
    <html lang="en" className="h-full">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
      </head>
      <body className="h-full bg-[#F2F2F7] dark:bg-[#000000] text-neutral-900 dark:text-neutral-100 antialiased selection:bg-[#007AFF]/20">
        <Script src="/sql-wasm.js" strategy="beforeInteractive" />
        {children}
      </body>
    </html>
  );
}

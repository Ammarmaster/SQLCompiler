import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://sqlcompiler.jobsio.in'),
  title: {
    default: 'Online SQL Compiler — Run SQL Code in Browser Free | SQLite Studio',
    template: '%s | Online SQL Compiler',
  },
  description:
    'Online SQL Compiler to write, compile, and run SQL queries in your browser. Features live per-line execution, automatic ER diagram visualizer, sample tables, and zero server delay.',
  keywords: [
    'sql compiler',
    'online sql compiler',
    'sql compiler online',
    'run sql online',
    'sql editor online',
    'online sql runner',
    'sql query tool online',
    'free sql compiler',
    'online sql playground',
    'sql online editor',
    'sql ide online',
    'visualize database schema online',
    'sqlite compiler online free',
    'programiz sql editor alternative',
    'onecompiler sql alternative',
    'codechef sql compiler alternative',
  ],
  authors: [{ name: 'SQLite Studio Team' }],
  creator: 'SQLite Studio',
  publisher: 'SQLite Studio',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/app-icon.jpg', sizes: '512x512', type: 'image/jpeg' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/app-icon.jpg',
    apple: [
      { url: '/apple-touch-icon.jpg', sizes: '180x180', type: 'image/jpeg' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sqlcompiler.jobsio.in',
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
    canonical: 'https://sqlcompiler.jobsio.in',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'google1360c11d4597b537',
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

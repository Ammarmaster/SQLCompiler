'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the full SQLite Studio IDE to ensure zero SSR errors and code-splitting
const FullStudioApp = dynamic(() => import('../../App'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex flex-col items-center justify-center bg-[#F2F2F7] dark:bg-[#000000] text-neutral-800 dark:text-neutral-200 select-none">
      <div className="w-10 h-10 border-3 border-[#007AFF] border-t-transparent rounded-full animate-spin mb-4" />
      <div className="text-base font-semibold">Loading SQLite Studio (iOS Edition)...</div>
      <p className="text-xs text-neutral-500 mt-1">Initializing SQLite 3 WebAssembly Engine</p>
    </div>
  ),
});

export default function AppRoutePage() {
  return (
    <main className="h-full w-full overflow-hidden">
      <FullStudioApp />
    </main>
  );
}

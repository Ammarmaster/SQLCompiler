import Link from 'next/link';
import {
  Database,
  Sun,
  Moon,
  Play,
  HelpCircle,
} from 'lucide-react';
import type { SchemaInfo } from '../../types';

interface IosNavbarProps {
  schema: SchemaInfo;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onOpenDbModal: () => void;
  onRunAll: () => void;
  onShowQuickHelp: () => void;
}

export const IosNavbar: React.FC<IosNavbarProps> = ({
  schema,
  isDarkMode,
  onToggleTheme,
  onOpenDbModal,
  onRunAll,
  onShowQuickHelp,
}) => {
  const tableCount = schema.tables.length;

  return (
    <header className="h-12 w-full px-4 flex items-center justify-between bg-white/80 dark:bg-[#1C1C1E]/80 backdrop-blur-xl border-b border-black/[0.08] dark:border-white/[0.08] select-none shrink-0 z-30">
      {/* Left: App Identity */}
      <div className="flex items-center space-x-3">
        {/* iOS App Icon */}
        <Link href="/" className="flex items-center space-x-2.5 group">
          <div className="w-7 h-7 rounded-[9px] bg-gradient-to-b from-[#0A84FF] to-[#0062D2] flex items-center justify-center text-white shadow-sm shadow-blue-500/30 group-hover:scale-105 transition-transform">
            <Database className="w-4 h-4 stroke-[2.2]" />
          </div>

          <div className="flex items-baseline space-x-1.5">
            <h1 className="text-sm font-semibold tracking-tight text-neutral-900 dark:text-white group-hover:text-[#007AFF] transition-colors">
              SQLite Studio
            </h1>
            <span className="text-[10px] font-medium tracking-wide text-[#007AFF] dark:text-[#0A84FF] bg-blue-500/10 px-1.5 py-0.5 rounded-full">
              iOS Edition
            </span>
          </div>
        </Link>

        {/* ProDevOpz Founder link */}
        <Link
          href="/founder"
          className="hidden lg:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium text-neutral-500 dark:text-neutral-400 hover:text-[#007AFF] bg-black/[0.03] dark:bg-white/[0.05] hover:bg-blue-500/10 transition-colors"
          title="Created by Ammar Master (Jalaluddin Master) at ProDevOpz"
        >
          <span>by ProDevOpz</span>
        </Link>
      </div>

      {/* Center: Live Database Status Pill */}
      <div className="hidden sm:flex items-center">
        <button
          type="button"
          onClick={onOpenDbModal}
          className="flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium text-neutral-700 dark:text-neutral-300 bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] active:scale-95 transition-all shadow-2xs"
          title="Click to manage database (Export, Import, Reset)"
        >
          <span className="w-2 h-2 rounded-full bg-[#34C759] animate-pulse" />
          <span>
            {tableCount} table{tableCount === 1 ? '' : 's'} in memory
          </span>
          <span className="text-neutral-400 dark:text-neutral-500 font-mono text-[11px]">
            (WASM)
          </span>
        </button>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center space-x-1.5">
        {/* Quick Help */}
        <button
          type="button"
          onClick={onShowQuickHelp}
          className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-black/[0.05] dark:hover:bg-white/[0.08] active:scale-90 transition-all"
          title="Keyboard shortcuts and guide"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* Database Modal Opener */}
        <button
          type="button"
          onClick={onOpenDbModal}
          className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-black/[0.05] dark:hover:bg-white/[0.08] active:scale-95 transition-all"
          title="Manage database"
        >
          <Database className="w-3.5 h-3.5 text-[#007AFF] dark:text-[#0A84FF]" />
          <span className="hidden md:inline">Database</span>
        </button>

        {/* Run All Script */}
        <button
          type="button"
          onClick={onRunAll}
          className="flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-semibold text-white bg-[#007AFF] hover:bg-[#0062cc] active:scale-95 transition-all shadow-sm shadow-blue-500/20"
          title="Run all statements in current tab"
        >
          <Play className="w-3 h-3 fill-current" />
          <span className="hidden sm:inline">Run All</span>
        </button>

        {/* Dark/Light Mode Toggle */}
        <button
          type="button"
          onClick={onToggleTheme}
          className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-700 dark:text-neutral-300 hover:bg-black/[0.05] dark:hover:bg-white/[0.08] active:scale-90 transition-all ml-1"
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDarkMode ? (
            <Sun className="w-4 h-4 text-[#FF9500]" />
          ) : (
            <Moon className="w-4 h-4 text-neutral-600" />
          )}
        </button>
      </div>
    </header>
  );
};

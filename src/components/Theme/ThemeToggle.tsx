'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({ className = '', showLabel = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Pure OLED Black Dark Mode'}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Pure OLED Black Dark Mode'}
      className={`relative inline-flex items-center space-x-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 select-none cursor-pointer active:scale-95 ${
        isDark
          ? 'bg-[#1C1C1E] hover:bg-[#2C2C2E] text-amber-400 border border-white/10 shadow-xs'
          : 'bg-black/[0.05] hover:bg-black/[0.08] text-neutral-800 border border-black/10 shadow-xs'
      } ${className}`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-3.5 h-3.5 text-amber-400 animate-in fade-in zoom-in duration-200 stroke-[2.2]" />
        ) : (
          <Moon className="w-3.5 h-3.5 text-indigo-600 animate-in fade-in zoom-in duration-200 stroke-[2.2]" />
        )}
      </div>

      {showLabel && (
        <span className="text-[11px] font-medium tracking-tight">
          {isDark ? 'OLED Dark' : 'Light'}
        </span>
      )}
    </button>
  );
}

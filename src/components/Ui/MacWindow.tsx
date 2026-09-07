'use client';

import React, { useState } from 'react';
import { X, Minus, Maximize2, Minimize2 } from 'lucide-react';

interface MacWindowProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  headerRight?: React.ReactNode;
  canMinimize?: boolean;
  canMaximize?: boolean;
}

export function MacWindow({
  title = 'SQLite Studio',
  subtitle,
  children,
  className = '',
  bodyClassName = '',
  headerRight,
  canMinimize = true,
  canMaximize = true,
}: MacWindowProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  if (isClosed) {
    return (
      <div className="p-4 text-center">
        <button
          onClick={() => setIsClosed(false)}
          className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-medium text-[#007AFF] bg-blue-500/10 hover:bg-blue-500/20 transition-all cursor-pointer"
        >
          <span>Reopen Window ({title})</span>
        </button>
      </div>
    );
  }

  return (
    <div
      className={`relative rounded-2xl sm:rounded-3xl border border-black/[0.08] dark:border-white/[0.12] bg-white/80 dark:bg-[#1C1C1E]/85 backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] dark:shadow-[0_25px_70px_-15px_rgba(0,0,0,0.7)] overflow-hidden transition-all duration-300 ${
        isMaximized ? 'ring-2 ring-[#007AFF]/40 scale-[1.01]' : ''
      } ${className}`}
    >
      {/* macOS Title Bar */}
      <div className="px-4 py-3 sm:py-3.5 bg-neutral-100/70 dark:bg-[#2C2C2E]/60 backdrop-blur-md border-b border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between select-none">
        {/* Left: macOS Traffic Light Buttons */}
        <div className="flex items-center space-x-2 group">
          {/* Close Button (Red with cross on hover) */}
          <button
            type="button"
            onClick={() => setIsClosed(true)}
            aria-label="Close window"
            title="Close"
            className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] flex items-center justify-center text-[#4C0000] hover:brightness-95 active:brightness-90 transition-all cursor-pointer"
          >
            <X className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity stroke-[2.5]" />
          </button>

          {/* Minimize Button (Yellow with minus on hover) */}
          <button
            type="button"
            onClick={() => canMinimize && setIsMinimized(!isMinimized)}
            aria-label="Minimize window"
            title={isMinimized ? 'Restore' : 'Minimize'}
            className={`w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] flex items-center justify-center text-[#5D4200] hover:brightness-95 active:brightness-90 transition-all ${
              canMinimize ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'
            }`}
          >
            <Minus className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity stroke-[2.5]" />
          </button>

          {/* Maximize Button (Green with expand on hover) */}
          <button
            type="button"
            onClick={() => canMaximize && setIsMaximized(!isMaximized)}
            aria-label="Maximize window"
            title={isMaximized ? 'Restore down' : 'Zoom / Maximize'}
            className={`w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] flex items-center justify-center text-[#004D0A] hover:brightness-95 active:brightness-90 transition-all ${
              canMaximize ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'
            }`}
          >
            {isMaximized ? (
              <Minimize2 className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity stroke-[2.5]" />
            ) : (
              <Maximize2 className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity stroke-[2.5]" />
            )}
          </button>
        </div>

        {/* Center: Window Title */}
        <div className="flex items-center space-x-2 text-center pointer-events-none truncate px-2">
          <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 tracking-tight truncate">
            {title}
          </span>
          {subtitle && (
            <span className="hidden sm:inline-block text-[11px] text-neutral-400 dark:text-neutral-500 font-mono">
              — {subtitle}
            </span>
          )}
        </div>

        {/* Right: Custom Toolbar / Actions */}
        <div className="flex items-center space-x-2">
          {headerRight || (
            <div className="flex items-center space-x-1.5 text-[10px] font-medium text-neutral-400 dark:text-neutral-500">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34C759]" />
              <span className="hidden sm:inline">macOS</span>
            </div>
          )}
        </div>
      </div>

      {/* Window Body */}
      {!isMinimized && (
        <div className={`transition-all duration-300 ${bodyClassName}`}>
          {children}
        </div>
      )}

      {isMinimized && (
        <div className="p-3 text-center text-xs text-neutral-500 bg-neutral-50 dark:bg-[#1C1C1E]">
          <span>Window minimized. Click the yellow button or </span>
          <button
            onClick={() => setIsMinimized(false)}
            className="text-[#007AFF] font-semibold hover:underline cursor-pointer"
          >
            click here to expand
          </button>
          .
        </div>
      )}
    </div>
  );
}

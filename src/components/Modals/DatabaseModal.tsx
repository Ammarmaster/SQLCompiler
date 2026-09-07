import React, { useRef } from 'react';
import {
  X,
  Database,
  Download,
  Upload,
  RotateCcw,
  Trash2,
  Info,
} from 'lucide-react';
import type { SchemaInfo } from '../../types';

interface DatabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  schema: SchemaInfo;
  onExport: () => void;
  onImport: (file: File) => void;
  onResetSample: () => void;
  onResetEmpty: () => void;
}

export const DatabaseModal: React.FC<DatabaseModalProps> = ({
  isOpen,
  onClose,
  schema,
  onExport,
  onImport,
  onResetSample,
  onResetEmpty,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImport(file);
      onClose();
    }
  };

  const totalRows = schema.tables.reduce((acc, t) => acc + (t.rowCount || 0), 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      {/* iOS Sheet Card */}
      <div className="w-full max-w-md bg-white/95 dark:bg-[#1C1C1E]/95 backdrop-blur-2xl rounded-3xl border border-black/[0.08] dark:border-white/[0.12] shadow-2xl overflow-hidden animate-scale-up">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-black/[0.06] dark:border-white/[0.08]">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#007AFF]/15 dark:bg-[#0A84FF]/20 flex items-center justify-center text-[#007AFF] dark:text-[#0A84FF]">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
                Database Manager
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                In-Memory SQLite WebAssembly
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-black/[0.06] dark:bg-white/[0.1] hover:bg-black/[0.1] dark:hover:bg-white/[0.15] flex items-center justify-center text-neutral-600 dark:text-neutral-300 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Database Stats Card */}
          <div className="p-3.5 rounded-2xl bg-[#F2F2F7] dark:bg-[#2C2C2E] border border-black/[0.04] dark:border-white/[0.06] flex items-center justify-around text-center">
            <div>
              <div className="text-lg font-bold text-neutral-900 dark:text-white font-mono">
                {schema.tables.length}
              </div>
              <div className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
                Tables
              </div>
            </div>
            <div className="h-7 w-px bg-black/[0.08] dark:bg-white/[0.1]" />
            <div>
              <div className="text-lg font-bold text-[#007AFF] dark:text-[#0A84FF] font-mono">
                {totalRows}
              </div>
              <div className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
                Total Rows
              </div>
            </div>
            <div className="h-7 w-px bg-black/[0.08] dark:bg-white/[0.1]" />
            <div>
              <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                WASM
              </div>
              <div className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
                Engine
              </div>
            </div>
          </div>

          {/* Grouped Action List (iOS Settings Style) */}
          <div className="rounded-2xl bg-[#F2F2F7] dark:bg-[#2C2C2E] border border-black/[0.04] dark:border-white/[0.06] overflow-hidden divide-y divide-black/[0.06] dark:divide-white/[0.08]">
            {/* Export */}
            <button
              type="button"
              onClick={() => {
                onExport();
                onClose();
              }}
              className="w-full flex items-center justify-between p-3.5 hover:bg-black/[0.03] dark:hover:bg-white/[0.05] active:bg-black/[0.06] dark:active:bg-white/[0.08] transition-colors text-left"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-xl bg-blue-500/15 flex items-center justify-center text-[#007AFF]">
                  <Download className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-neutral-900 dark:text-white">
                    Export Database (.sqlite)
                  </div>
                  <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                    Download full binary SQLite file
                  </div>
                </div>
              </div>
            </button>

            {/* Import */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center justify-between p-3.5 hover:bg-black/[0.03] dark:hover:bg-white/[0.05] active:bg-black/[0.06] dark:active:bg-white/[0.08] transition-colors text-left"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-xl bg-purple-500/15 flex items-center justify-center text-purple-600 dark:text-purple-400">
                  <Upload className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-neutral-900 dark:text-white">
                    Import Database
                  </div>
                  <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                    Load a .sqlite or .sql file from disk
                  </div>
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".sqlite,.db,.sqlite3,.sql"
                onChange={handleFileChange}
                className="hidden"
              />
            </button>

            {/* Reset to Sample ERP */}
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Reset database to the initial ERP sample dataset?')) {
                  onResetSample();
                  onClose();
                }
              }}
              className="w-full flex items-center justify-between p-3.5 hover:bg-black/[0.03] dark:hover:bg-white/[0.05] active:bg-black/[0.06] dark:active:bg-white/[0.08] transition-colors text-left"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-600 dark:text-amber-400">
                  <RotateCcw className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-neutral-900 dark:text-white">
                    Reset to Sample ERP Data
                  </div>
                  <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                    Reload customers, products, orders schema
                  </div>
                </div>
              </div>
            </button>

            {/* Reset to Empty */}
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Clear all tables and data to start with an empty database?')) {
                  onResetEmpty();
                  onClose();
                }
              }}
              className="w-full flex items-center justify-between p-3.5 hover:bg-black/[0.03] dark:hover:bg-white/[0.05] active:bg-black/[0.06] dark:active:bg-white/[0.08] transition-colors text-left"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-xl bg-red-500/15 flex items-center justify-center text-[#FF3B30]">
                  <Trash2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#FF3B30]">
                    Clear Database (Empty)
                  </div>
                  <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                    Remove all user tables and data
                  </div>
                </div>
              </div>
            </button>
          </div>

          {/* iOS Info footer */}
          <div className="flex items-start space-x-2 text-[11px] text-neutral-500 dark:text-neutral-400 px-1">
            <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            <p>
              Your database state is automatically saved to browser IndexedDB, persisting across page reloads with zero server latency.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

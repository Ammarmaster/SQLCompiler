import { X, Play, Command, Sparkles, Layers } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-white/95 dark:bg-[#1C1C1E]/95 backdrop-blur-2xl rounded-3xl border border-black/[0.08] dark:border-white/[0.12] shadow-2xl overflow-hidden animate-scale-up">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-black/[0.06] dark:border-white/[0.08]">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-500/15 flex items-center justify-center text-[#007AFF]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
                How to Use SQLite Studio
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Key interactions & shortcuts
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

        {/* Content */}
        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
          {/* Section 1: Gutter Run Buttons */}
          <div className="p-3.5 rounded-2xl bg-[#F2F2F7] dark:bg-[#2C2C2E] border border-black/[0.04] dark:border-white/[0.06] space-y-2">
            <div className="flex items-center space-x-2 text-[#007AFF] font-semibold text-sm">
              <div className="w-5 h-5 rounded-full bg-[#007AFF] text-white flex items-center justify-center">
                <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
              </div>
              <span>Per-Line / Per-Statement Execution</span>
            </div>
            <p>
              In SQLite Studio, you don't need to select text or highlight queries. Look at the editor gutter on the left: each SQL statement has a small circular <strong className="text-[#007AFF]">▶</strong> button beside its starting line number.
            </p>
            <p>
              Clicking it immediately executes that exact statement, flashing the lines in <span className="text-[#34C759] font-medium">green (success)</span> or <span className="text-[#FF3B30] font-medium">red (error)</span>.
            </p>
          </div>

          {/* Section 2: Shortcuts */}
          <div className="p-3.5 rounded-2xl bg-[#F2F2F7] dark:bg-[#2C2C2E] border border-black/[0.04] dark:border-white/[0.06] space-y-2">
            <div className="flex items-center space-x-2 text-neutral-900 dark:text-white font-semibold text-sm">
              <Command className="w-4 h-4 text-purple-500" />
              <span>Keyboard Shortcuts</span>
            </div>
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between">
                <span>Run statement under cursor</span>
                <kbd className="px-2 py-0.5 rounded-md bg-white dark:bg-[#1E1E22] border border-black/[0.08] dark:border-white/[0.1] font-mono text-[11px] shadow-2xs">
                  ⌘ + Enter / Ctrl + Enter
                </kbd>
              </div>
              <div className="flex items-center justify-between">
                <span>Run entire script (all statements)</span>
                <kbd className="px-2 py-0.5 rounded-md bg-white dark:bg-[#1E1E22] border border-black/[0.08] dark:border-white/[0.1] font-mono text-[11px] shadow-2xs">
                  ⇧ + ⌘ + Enter / Shift + Ctrl + Enter
                </kbd>
              </div>
              <div className="flex items-center justify-between">
                <span>Autocomplete SQL & schema tables</span>
                <kbd className="px-2 py-0.5 rounded-md bg-white dark:bg-[#1E1E22] border border-black/[0.08] dark:border-white/[0.1] font-mono text-[11px] shadow-2xs">
                  Ctrl + Space
                </kbd>
              </div>
            </div>
          </div>

          {/* Section 3: ER Diagram */}
          <div className="p-3.5 rounded-2xl bg-[#F2F2F7] dark:bg-[#2C2C2E] border border-black/[0.04] dark:border-white/[0.06] space-y-2">
            <div className="flex items-center space-x-2 text-neutral-900 dark:text-white font-semibold text-sm">
              <Layers className="w-4 h-4 text-emerald-500" />
              <span>Interactive ER Diagram</span>
            </div>
            <p>
              Switch to the <strong>Schema</strong> tab to view live table relationships. Cards can be dragged to rearrange, and zoom/pan is supported on the canvas.
            </p>
            <p>
              Click <span className="text-[#007AFF] font-medium">"Query Table"</span> on any card to insert a query into your editor automatically.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 bg-[#F9F9FB] dark:bg-[#18181A] border-t border-black/[0.06] dark:border-white/[0.08] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl text-xs font-semibold text-white bg-[#007AFF] hover:bg-[#0062cc] active:scale-95 transition-all"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};

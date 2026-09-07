import React, { useState, useRef, useEffect } from 'react';
import { Plus, X, FileCode2, Play } from 'lucide-react';
import type { EditorTab } from '../../types';

interface TabBarProps {
  tabs: EditorTab[];
  activeTabId: string;
  onSelectTab: (id: string) => void;
  onAddTab: () => void;
  onCloseTab: (id: string) => void;
  onRenameTab: (id: string, newName: string) => void;
  onRunAll: () => void;
}

export const TabBar: React.FC<TabBarProps> = ({
  tabs,
  activeTabId,
  onSelectTab,
  onAddTab,
  onCloseTab,
  onRenameTab,
  onRunAll,
}) => {
  const [editingTabId, setEditingTabId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingTabId && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editingTabId]);

  const handleStartRename = (tab: EditorTab, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingTabId(tab.id);
    setEditName(tab.name);
  };

  const handleSaveRename = () => {
    if (editingTabId && editName.trim()) {
      onRenameTab(editingTabId, editName.trim());
    }
    setEditingTabId(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveRename();
    } else if (e.key === 'Escape') {
      setEditingTabId(null);
    }
  };

  return (
    <div className="flex items-center justify-between px-3 py-1.5 bg-[#F2F2F7]/80 dark:bg-[#1C1C1E]/80 backdrop-blur-md border-b border-black/[0.06] dark:border-white/[0.08] select-none">
      {/* Scrollable Tab List */}
      <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-0.5 max-w-[calc(100%-120px)]">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          const isEditing = tab.id === editingTabId;

          return (
            <div
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              onDoubleClick={(e) => handleStartRename(tab, e)}
              className={`group relative flex items-center h-7 px-2.5 rounded-lg text-xs font-medium cursor-pointer transition-all duration-150 ease-out shrink-0 ${
                isActive
                  ? 'bg-white dark:bg-[#2C2C2E] text-[#007AFF] dark:text-[#0A84FF] shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.06]'
                  : 'text-neutral-600 dark:text-neutral-400 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]'
              }`}
              title="Double-click to rename"
            >
              <FileCode2 className={`w-3.5 h-3.5 mr-1.5 shrink-0 ${isActive ? 'text-[#007AFF]' : 'opacity-60'}`} />

              {isEditing ? (
                <input
                  ref={inputRef}
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onBlur={handleSaveRename}
                  onKeyDown={handleKeyDown}
                  className="bg-transparent border-none outline-none text-xs w-24 text-neutral-900 dark:text-white p-0 font-medium"
                />
              ) : (
                <span className="truncate max-w-[120px]">{tab.name}</span>
              )}

              {tabs.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCloseTab(tab.id);
                  }}
                  className="ml-1.5 -mr-1 p-0.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 opacity-60 hover:opacity-100 transition-opacity"
                  title="Close tab"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          );
        })}

        {/* Add Tab Button */}
        <button
          type="button"
          onClick={onAddTab}
          className="flex items-center justify-center w-7 h-7 rounded-lg text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-white hover:bg-black/[0.05] dark:hover:bg-white/[0.06] transition-all active:scale-95 shrink-0"
          title="New query tab"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Secondary Run All Action */}
      <div className="flex items-center pl-2 shrink-0">
        <button
          type="button"
          onClick={onRunAll}
          className="flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-semibold text-neutral-700 dark:text-neutral-200 bg-black/[0.05] dark:bg-white/[0.08] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] active:scale-95 transition-all"
          title="Run entire script (⇧⌘↵)"
        >
          <Play className="w-3 h-3 fill-current text-[#007AFF] dark:text-[#0A84FF]" />
          <span>Run All</span>
        </button>
      </div>
    </div>
  );
};

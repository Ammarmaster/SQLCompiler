import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Table2,
  Layers,
  History,
} from 'lucide-react';
import confetti from 'canvas-confetti';

import { sqlEngine } from './services/sqlEngine';
import { parseSqlStatements } from './utils/sqlParser';
import type { EditorTab, HistoryEntry, QueryResult, SchemaInfo } from './types';

import { IosNavbar } from './components/Navbar/IosNavbar';
import { TabBar } from './components/Editor/TabBar';
import { SqlEditor, type SqlEditorRef } from './components/Editor/SqlEditor';
import { ResultsGrid } from './components/Results/ResultsGrid';
import { ErDiagram } from './components/Schema/ErDiagram';
import { QueryHistory } from './components/History/QueryHistory';
import { DatabaseModal } from './components/Modals/DatabaseModal';
import { HelpModal } from './components/Modals/HelpModal';

// Storage keys
const TABS_STORAGE_KEY = 'sqlite_studio_tabs_v1';
const HISTORY_STORAGE_KEY = 'sqlite_studio_history_v1';
const THEME_STORAGE_KEY = 'sqlite_studio_theme_v1';

const INITIAL_TABS: EditorTab[] = [
  {
    id: 'tab-overview',
    name: '1. Overview & Joins.sql',
    content: `-- SQLite Studio (iOS Edition)
-- Tip: Notice the circular ▶ run button on each statement in the gutter!
-- Click ▶ to run that exact statement immediately without selecting.

-- 1. Top Customers, Order Counts & Total Spend
SELECT 
  c.id,
  c.name,
  c.city,
  COUNT(o.id) AS total_orders,
  COALESCE(SUM(o.total_amount), 0.0) AS total_spent
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
GROUP BY c.id, c.name, c.city
ORDER BY total_spent DESC;

-- 2. Products with Supplier Details
SELECT 
  p.name AS product_name,
  p.category,
  p.unit_price,
  p.stock_quantity,
  s.company_name AS supplier,
  s.country
FROM products p
JOIN suppliers s ON p.supplier_id = s.id
ORDER BY p.unit_price DESC;

-- 3. Detailed Line Items & Subtotals
SELECT 
  o.id AS order_id,
  c.name AS customer_name,
  p.name AS item_name,
  oi.quantity,
  oi.unit_price,
  (oi.quantity * oi.unit_price) AS line_total,
  o.status
FROM orders o
JOIN customers c ON o.customer_id = c.id
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id
ORDER BY o.id ASC;
`,
  },
  {
    id: 'tab-analytics',
    name: '2. Sales Analytics.sql',
    content: `-- Sales Revenue Breakdown by Category
SELECT 
  p.category,
  COUNT(DISTINCT p.id) AS total_products,
  SUM(oi.quantity) AS units_sold,
  ROUND(SUM(oi.quantity * oi.unit_price), 2) AS category_revenue
FROM products p
JOIN order_items oi ON p.id = oi.product_id
GROUP BY p.category
ORDER BY category_revenue DESC;

-- Order Status Aggregates
SELECT 
  status,
  COUNT(*) AS order_count,
  ROUND(SUM(total_amount), 2) AS total_revenue,
  ROUND(AVG(total_amount), 2) AS avg_order_value
FROM orders
GROUP BY status;
`,
  },
  {
    id: 'tab-inventory',
    name: '3. Inventory Management.sql',
    content: `-- Products with Low Stock (< 50 units)
SELECT 
  name,
  category,
  stock_quantity,
  unit_price
FROM products
WHERE stock_quantity < 50
ORDER BY stock_quantity ASC;

-- Replenish Stock for Vision Pro Headset Glass
UPDATE products 
SET stock_quantity = stock_quantity + 30 
WHERE id = 1;

-- Check Updated Stock
SELECT id, name, stock_quantity FROM products WHERE id = 1;
`,
  },
];

export function App() {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved !== null) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Engine & Schema state
  const [isEngineReady, setIsEngineReady] = useState(false);
  const [schema, setSchema] = useState<SchemaInfo>({ tables: [], updatedAt: Date.now() });

  // Editor Tabs
  const [tabs, setTabs] = useState<EditorTab[]>(() => {
    try {
      const saved = localStorage.getItem(TABS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn(e);
    }
    return INITIAL_TABS;
  });
  const [activeTabId, setActiveTabId] = useState<string>(() => tabs[0]?.id || 'tab-overview');

  // Query Execution State
  const [currentResult, setCurrentResult] = useState<QueryResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>(() => {
    try {
      const saved = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  // Right Output Pane active tab: 'results' | 'schema' | 'history'
  const [rightTab, setRightTab] = useState<'results' | 'schema' | 'history'>('results');

  // Mobile navigation active view: 'editor' | 'results' | 'schema' | 'history'
  const [mobileView, setMobileView] = useState<'editor' | 'results' | 'schema' | 'history'>('editor');
  const [isMobile, setIsMobile] = useState<boolean>(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Modals
  const [isDbModalOpen, setIsDbModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  // Split-Screen Drag State
  const [splitPercent, setSplitPercent] = useState(48); // Left editor takes 48% by default
  const [isDraggingSplit, setIsDraggingSplit] = useState(false);
  const splitContainerRef = useRef<HTMLDivElement>(null);

  // Editor imperative ref
  const editorRef = useRef<SqlEditorRef>(null);

  // Sync theme with HTML class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem(THEME_STORAGE_KEY, 'light');
    }
  }, [isDarkMode]);

  // Persist Tabs
  useEffect(() => {
    localStorage.setItem(TABS_STORAGE_KEY, JSON.stringify(tabs));
  }, [tabs]);

  // Persist History
  useEffect(() => {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  // Initialize SQLite WASM Engine
  useEffect(() => {
    sqlEngine
      .init()
      .then(() => {
        setIsEngineReady(true);
        const currentSchema = sqlEngine.getSchema();
        setSchema(currentSchema);
      })
      .catch((err) => {
        console.error('Database initialization error:', err);
      });
  }, []);

  // Refresh Schema Helper
  const refreshSchema = useCallback(() => {
    const updated = sqlEngine.getSchema();
    setSchema(updated);
  }, []);

  // Split Pane Resizing Handlers
  const handleSplitMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDraggingSplit(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingSplit || !splitContainerRef.current) return;
      const rect = splitContainerRef.current.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const rawPercent = (clientX / rect.width) * 100;
      // Clamp between 25% and 75%
      const clamped = Math.min(75, Math.max(25, rawPercent));
      setSplitPercent(clamped);
    };

    const handleMouseUp = () => {
      setIsDraggingSplit(false);
    };

    if (isDraggingSplit) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggingSplit]);

  // Execute a single SQL statement (called by gutter ▶ button or cursor shortcut)
  const handleRunStatement = useCallback(
    (statementText: string, startLine: number, endLine: number) => {
      if (!isEngineReady) return;
      setIsRunning(true);

      // Execute statement
      const result = sqlEngine.execute(statementText);
      setCurrentResult(result);
      setIsRunning(false);

      // Flash lines in editor
      if (editorRef.current) {
        editorRef.current.flashLines(startLine, endLine, result.error ? 'error' : 'success');
      }

      // Add to history
      const historyItem: HistoryEntry = {
        id: `hist-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        timestamp: Date.now(),
        statement: statementText,
        success: !result.error,
        executionTimeMs: result.executionTimeMs,
        rowCount: result.rowCount,
        error: result.error,
      };
      setHistory((prev) => [historyItem, ...prev.slice(0, 99)]);

      // Auto refresh schema in case DDL was run
      refreshSchema();

      // Switch right pane to results tab automatically
      setRightTab('results');
      if (isMobile) {
        setMobileView('results');
      }

      // Delightful confetti if it was a big SELECT or table creation
      if (!result.error && (statementText.toUpperCase().includes('CREATE TABLE') || result.rowCount > 5)) {
        try {
          confetti({
            particleCount: 25,
            spread: 45,
            origin: { y: 0.8 },
            colors: ['#007AFF', '#34C759', '#AF52DE'],
          });
        } catch {
          // ignore
        }
      }
    },
    [isEngineReady, refreshSchema]
  );

  // Run all statements in active tab top-to-bottom
  const handleRunAll = useCallback(() => {
    const activeTab = tabs.find((t) => t.id === activeTabId);
    if (!activeTab || !isEngineReady) return;

    const stmts = parseSqlStatements(activeTab.content);
    if (stmts.length === 0) return;

    setIsRunning(true);
    let lastResult: QueryResult | null = null;
    let hadError = false;

    for (const stmt of stmts) {
      const result = sqlEngine.execute(stmt.text);
      lastResult = result;

      // Add to history
      const historyItem: HistoryEntry = {
        id: `hist-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        timestamp: Date.now(),
        statement: stmt.text,
        success: !result.error,
        executionTimeMs: result.executionTimeMs,
        rowCount: result.rowCount,
        error: result.error,
      };
      setHistory((prev) => [historyItem, ...prev.slice(0, 99)]);

      if (result.error) {
        hadError = true;
        editorRef.current?.flashLines(stmt.startLine, stmt.endLine, 'error');
        break;
      }
    }

    setIsRunning(false);
    if (lastResult) {
      setCurrentResult(lastResult);
    }
    refreshSchema();
    setRightTab('results');
    if (isMobile) {
      setMobileView('results');
    }

    if (!hadError) {
      editorRef.current?.flashLines(1, activeTab.content.split('\n').length, 'success');
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#007AFF', '#34C759', '#FF9500'],
        });
      } catch {
        // ignore
      }
    }
  }, [tabs, activeTabId, isEngineReady, refreshSchema]);

  // Tab management
  const handleAddTab = () => {
    const newId = `tab-${Date.now()}`;
    const newTab: EditorTab = {
      id: newId,
      name: `Query ${tabs.length + 1}.sql`,
      content: `-- Write your SQL query here\nSELECT * FROM customers LIMIT 10;\n`,
    };
    setTabs((prev) => [...prev, newTab]);
    setActiveTabId(newId);
  };

  const handleCloseTab = (id: string) => {
    if (tabs.length <= 1) return;
    const nextTabs = tabs.filter((t) => t.id !== id);
    setTabs(nextTabs);
    if (activeTabId === id) {
      setActiveTabId(nextTabs[nextTabs.length - 1].id);
    }
  };

  const handleRenameTab = (id: string, newName: string) => {
    setTabs((prev) =>
      prev.map((t) => (t.id === id ? { ...t, name: newName } : t))
    );
  };

  const handleTabContentChange = (newContent: string) => {
    setTabs((prev) =>
      prev.map((t) => (t.id === activeTabId ? { ...t, content: newContent } : t))
    );
  };

  // Quick Table Query from ER Diagram
  const handleTableSelectFromSchema = (tableName: string) => {
    const query = `\n-- Query from ER Diagram\nSELECT * FROM "${tableName}" LIMIT 100;\n`;
    editorRef.current?.insertText(query);
    if (isMobile) {
      setMobileView('editor');
    }
  };

  // Re-run from history
  const handleRerunHistory = (statement: string) => {
    const stmts = parseSqlStatements(statement);
    if (stmts.length > 0) {
      handleRunStatement(stmts[0].text, stmts[0].startLine, stmts[0].endLine);
    } else {
      handleRunStatement(statement, 1, 1);
    }
  };

  const handleInsertHistoryToEditor = (statement: string) => {
    editorRef.current?.insertText(statement);
    if (isMobile) {
      setMobileView('editor');
    }
  };

  // Database Management
  const handleExportDb = () => {
    try {
      const binary = sqlEngine.exportDatabase();
      const blob = new Blob([binary as any], { type: 'application/x-sqlite3' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `sqlite_studio_${Date.now()}.sqlite`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      alert('Error exporting database: ' + String(e));
    }
  };

  const handleImportDb = async (file: File) => {
    try {
      const buffer = await file.arrayBuffer();
      const uint8 = new Uint8Array(buffer);
      sqlEngine.importDatabase(uint8);
      refreshSchema();
      setCurrentResult({
        columns: ['status'],
        values: [[`Successfully imported ${file.name}`]],
        rowCount: 1,
        executionTimeMs: 12,
        executedAt: new Date(),
        statement: `-- Imported ${file.name}`,
        isDdlOrDml: true,
      });
      alert(`Database imported successfully from ${file.name}`);
    } catch (e) {
      alert('Failed to import database file: ' + String(e));
    }
  };

  const handleResetSample = () => {
    sqlEngine.resetToSample();
    refreshSchema();
    setCurrentResult(null);
  };

  const handleResetEmpty = () => {
    sqlEngine.resetToEmpty();
    refreshSchema();
    setCurrentResult(null);
  };

  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  return (
    <div className="h-full flex flex-col overflow-hidden bg-[#F2F2F7] dark:bg-[#000000] text-neutral-900 dark:text-[#FFFFFF]">
      {/* iOS Navigation Bar */}
      <IosNavbar
        schema={schema}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode((d) => !d)}
        onOpenDbModal={() => setIsDbModalOpen(true)}
        onRunAll={handleRunAll}
        onShowQuickHelp={() => setIsHelpModalOpen(true)}
      />

      {/* Mobile iOS Segmented Control (shown on small screens) */}
      <div className="md:hidden px-3 py-2 bg-white/70 dark:bg-[#1C1C1E]/70 backdrop-blur-md border-b border-black/[0.06] dark:border-white/[0.08] shrink-0">
        <div className="grid grid-cols-4 p-0.5 rounded-xl bg-black/[0.06] dark:bg-white/[0.1] text-xs font-semibold select-none">
          <button
            type="button"
            onClick={() => setMobileView('editor')}
            className={`py-1.5 rounded-lg text-center transition-all ${
              mobileView === 'editor'
                ? 'bg-white dark:bg-[#2C2C2E] text-neutral-900 dark:text-white shadow-xs'
                : 'text-neutral-500 dark:text-neutral-400'
            }`}
          >
            Editor
          </button>
          <button
            type="button"
            onClick={() => setMobileView('results')}
            className={`py-1.5 rounded-lg text-center transition-all ${
              mobileView === 'results'
                ? 'bg-white dark:bg-[#2C2C2E] text-neutral-900 dark:text-white shadow-xs'
                : 'text-neutral-500 dark:text-neutral-400'
            }`}
          >
            Results
          </button>
          <button
            type="button"
            onClick={() => setMobileView('schema')}
            className={`py-1.5 rounded-lg text-center transition-all ${
              mobileView === 'schema'
                ? 'bg-white dark:bg-[#2C2C2E] text-neutral-900 dark:text-white shadow-xs'
                : 'text-neutral-500 dark:text-neutral-400'
            }`}
          >
            Schema
          </button>
          <button
            type="button"
            onClick={() => setMobileView('history')}
            className={`py-1.5 rounded-lg text-center transition-all ${
              mobileView === 'history'
                ? 'bg-white dark:bg-[#2C2C2E] text-neutral-900 dark:text-white shadow-xs'
                : 'text-neutral-500 dark:text-neutral-400'
            }`}
          >
            History
          </button>
        </div>
      </div>

      {/* Main Work Area: Desktop Split View / Mobile Single View */}
      <div ref={splitContainerRef} className="flex-1 flex overflow-hidden relative">
        {/* Left Pane: SQL Editor */}
        <div
          style={{
            width: !isMobile ? `${splitPercent}%` : '100%',
            display: isMobile && mobileView !== 'editor' ? 'none' : 'flex',
          }}
          className="flex-col h-full overflow-hidden bg-white dark:bg-[#161618] border-r border-black/[0.08] dark:border-white/[0.08] shadow-xs shrink-0"
        >
          {/* Tab Bar */}
          <TabBar
            tabs={tabs}
            activeTabId={activeTabId}
            onSelectTab={setActiveTabId}
            onAddTab={handleAddTab}
            onCloseTab={handleCloseTab}
            onRenameTab={handleRenameTab}
            onRunAll={handleRunAll}
          />

          {/* Editor Body */}
          <div className="flex-1 overflow-hidden relative">
            <SqlEditor
              ref={editorRef}
              value={activeTab?.content || ''}
              onChange={handleTabContentChange}
              onRunStatement={handleRunStatement}
              onRunAll={handleRunAll}
              getSchema={() => schema}
              isDarkMode={isDarkMode}
            />
          </div>

          {/* Bottom Editor Status Bar */}
          <div className="h-6 px-3 flex items-center justify-between bg-[#F7F7F9] dark:bg-[#1C1C1E] border-t border-black/[0.04] dark:border-white/[0.06] text-[11px] text-neutral-500 dark:text-neutral-400 select-none shrink-0 font-mono">
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34C759]" />
              <span>SQLite WASM Ready</span>
            </div>
            <div className="flex items-center space-x-3">
              <span>Gutter ▶ = Run Statement</span>
              <span>•</span>
              <span>⌘↵ = Run</span>
            </div>
          </div>
        </div>

        {/* Desktop Draggable Divider */}
        {!isMobile && (
          <div
            onMouseDown={handleSplitMouseDown}
            className="w-2.5 hover:w-2.5 -ml-1 -mr-1 z-20 cursor-col-resize flex items-center justify-center group relative select-none"
            title="Drag to resize panels"
          >
            {/* iOS Grabber Pill */}
            <div className="w-1 h-9 rounded-full bg-neutral-300 dark:bg-neutral-600 group-hover:bg-[#007AFF] group-hover:w-1.5 transition-all duration-150" />
          </div>
        )}

        {/* Right Pane: Tabbed Output (Results / Schema / History) */}
        <div
          style={{
            width: !isMobile ? `${100 - splitPercent}%` : '100%',
            display: isMobile && mobileView === 'editor' ? 'none' : 'flex',
          }}
          className="flex-1 flex-col h-full overflow-hidden bg-[#F9F9FB] dark:bg-[#161618]"
        >
          {/* Output Segmented Control Tab Bar */}
          <div className="flex items-center justify-between px-3 py-1.5 bg-[#F2F2F7]/90 dark:bg-[#1C1C1E]/90 backdrop-blur-md border-b border-black/[0.06] dark:border-white/[0.08] select-none shrink-0">
            {/* iOS Segmented Control */}
            <div className="flex p-0.5 rounded-xl bg-black/[0.06] dark:bg-white/[0.1] text-xs font-semibold">
              <button
                type="button"
                onClick={() => {
                  setRightTab('results');
                  setMobileView('results');
                }}
                className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg transition-all ${
                  (!isMobile ? rightTab === 'results' : mobileView === 'results')
                    ? 'bg-white dark:bg-[#2C2C2E] text-[#007AFF] dark:text-[#0A84FF] shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                <Table2 className="w-3.5 h-3.5" />
                <span>Results</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setRightTab('schema');
                  setMobileView('schema');
                }}
                className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg transition-all ${
                  (!isMobile ? rightTab === 'schema' : mobileView === 'schema')
                    ? 'bg-white dark:bg-[#2C2C2E] text-[#007AFF] dark:text-[#0A84FF] shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Schema & ER</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setRightTab('history');
                  setMobileView('history');
                }}
                className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg transition-all ${
                  (!isMobile ? rightTab === 'history' : mobileView === 'history')
                    ? 'bg-white dark:bg-[#2C2C2E] text-[#007AFF] dark:text-[#0A84FF] shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                <History className="w-3.5 h-3.5" />
                <span>History</span>
                {history.length > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-black/[0.06] dark:bg-white/[0.1]">
                    {history.length}
                  </span>
                )}
              </button>
            </div>

            {/* Quick Tips Badge */}
            <div className="hidden lg:flex items-center text-[11px] text-neutral-400 dark:text-neutral-500">
              {rightTab === 'schema' && <span>Drag cards • Scroll to zoom</span>}
              {rightTab === 'results' && currentResult && (
                <span>Click headers to sort</span>
              )}
            </div>
          </div>

          {/* Tab Content Panels */}
          <div className="flex-1 overflow-hidden relative">
            {((!isMobile && rightTab === 'results') ||
              (isMobile && mobileView === 'results')) && (
              <ResultsGrid result={currentResult} isRunning={isRunning} />
            )}

            {((!isMobile && rightTab === 'schema') ||
              (isMobile && mobileView === 'schema')) && (
              <ErDiagram
                schema={schema}
                onTableSelect={handleTableSelectFromSchema}
              />
            )}

            {((!isMobile && rightTab === 'history') ||
              (isMobile && mobileView === 'history')) && (
              <QueryHistory
                history={history}
                onRerun={handleRerunHistory}
                onInsertToEditor={handleInsertHistoryToEditor}
                onClearHistory={() => setHistory([])}
              />
            )}
          </div>
        </div>
      </div>

      {/* Database Modal */}
      <DatabaseModal
        isOpen={isDbModalOpen}
        onClose={() => setIsDbModalOpen(false)}
        schema={schema}
        onExport={handleExportDb}
        onImport={handleImportDb}
        onResetSample={handleResetSample}
        onResetEmpty={handleResetEmpty}
      />

      {/* Quick Help Modal */}
      <HelpModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />
    </div>
  );
}

export default App;

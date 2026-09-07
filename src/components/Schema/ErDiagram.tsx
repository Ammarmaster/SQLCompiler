import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import {
  Key,
  Link2,
  Table as TableIcon,
  ZoomIn,
  ZoomOut,
  Maximize2,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import type { SchemaInfo, TableMeta } from '../../types';

interface ErDiagramProps {
  schema: SchemaInfo;
  onTableSelect: (tableName: string) => void;
}

interface NodePosition {
  x: number;
  y: number;
}

const CARD_WIDTH = 240;
const HEADER_HEIGHT = 44;
const ROW_HEIGHT = 28;

export const ErDiagram: React.FC<ErDiagramProps> = ({ schema, onTableSelect }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState<Record<string, NodePosition>>({});
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 40, y: 40 });
  const [isPanning, setIsPanning] = useState(false);
  const [dragNode, setDragNode] = useState<{ name: string; startX: number; startY: number; initX: number; initY: number } | null>(null);
  const [hoveredFk, setHoveredFk] = useState<string | null>(null);
  const panStartRef = useRef({ x: 0, y: 0, panX: 0, panY: 0 });

  // Compute card dimensions
  const tableHeights = useMemo(() => {
    const heights: Record<string, number> = {};
    schema.tables.forEach((t) => {
      heights[t.name] = HEADER_HEIGHT + t.columns.length * ROW_HEIGHT + 12;
    });
    return heights;
  }, [schema.tables]);

  // Initial Auto-Layout
  useEffect(() => {
    setPositions((prev) => {
      const nextPos: Record<string, NodePosition> = { ...prev };
      let col = 0;
      let yOffset = 40;
      const colWidth = 320;
      const colHeightLimit = 700;

      schema.tables.forEach((table, idx) => {
        if (!nextPos[table.name]) {
          const height = tableHeights[table.name] || 200;
          if (yOffset + height > colHeightLimit && idx > 0) {
            col++;
            yOffset = 40;
          }
          nextPos[table.name] = {
            x: 50 + col * colWidth,
            y: yOffset,
          };
          yOffset += height + 40;
        }
      });
      return nextPos;
    });
  }, [schema.tables, tableHeights]);

  // Canvas Pan Handlers
  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    // Only pan if clicking canvas background (not inside a card)
    if ((e.target as HTMLElement).closest('.er-node-card')) return;
    setIsPanning(true);
    panStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      panX: pan.x,
      panY: pan.y,
    };
  };

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isPanning) {
      const dx = e.clientX - panStartRef.current.x;
      const dy = e.clientY - panStartRef.current.y;
      setPan({
        x: panStartRef.current.panX + dx,
        y: panStartRef.current.panY + dy,
      });
    } else if (dragNode) {
      const dx = (e.clientX - dragNode.startX) / scale;
      const dy = (e.clientY - dragNode.startY) / scale;
      setPositions((prev) => ({
        ...prev,
        [dragNode.name]: {
          x: Math.round(dragNode.initX + dx),
          y: Math.round(dragNode.initY + dy),
        },
      }));
    }
  }, [isPanning, dragNode, scale]);

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
    setDragNode(null);
  }, []);

  // Zoom Handlers
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
    const newScale = Math.min(2.0, Math.max(0.4, scale * zoomFactor));
    setScale(newScale);
  };

  const resetView = () => {
    setScale(1);
    setPan({ x: 40, y: 40 });
  };

  const zoomIn = () => setScale((s) => Math.min(2.0, s * 1.15));
  const zoomOut = () => setScale((s) => Math.max(0.4, s * 0.85));

  const fitToScreen = () => {
    if (schema.tables.length === 0 || !containerRef.current) return;
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;

    schema.tables.forEach((t) => {
      const pos = positions[t.name] || { x: 0, y: 0 };
      const h = tableHeights[t.name] || 200;
      minX = Math.min(minX, pos.x);
      maxX = Math.max(maxX, pos.x + CARD_WIDTH);
      minY = Math.min(minY, pos.y);
      maxY = Math.max(maxY, pos.y + h);
    });

    const rect = containerRef.current.getBoundingClientRect();
    const diagramW = maxX - minX + 80;
    const diagramH = maxY - minY + 80;

    const scaleX = rect.width / diagramW;
    const scaleY = rect.height / diagramH;
    const fitScale = Math.min(1.2, Math.max(0.5, Math.min(scaleX, scaleY)));

    setScale(fitScale);
    setPan({
      x: (rect.width - diagramW * fitScale) / 2 - minX * fitScale + 40,
      y: (rect.height - diagramH * fitScale) / 2 - minY * fitScale + 40,
    });
  };

  // Node Drag Start
  const startDragNode = (table: TableMeta, e: React.MouseEvent) => {
    e.stopPropagation();
    const currentPos = positions[table.name] || { x: 0, y: 0 };
    setDragNode({
      name: table.name,
      startX: e.clientX,
      startY: e.clientY,
      initX: currentPos.x,
      initY: currentPos.y,
    });
  };

  // Relationships Lines Calculation
  const relations = useMemo(() => {
    const list: Array<{
      id: string;
      fromTable: string;
      fromCol: string;
      toTable: string;
      toCol: string;
      x1: number;
      y1: number;
      x2: number;
      y2: number;
    }> = [];

    schema.tables.forEach((sourceTable) => {
      sourceTable.foreignKeys.forEach((fk) => {
        const targetTable = schema.tables.find(
          (t) => t.name.toLowerCase() === fk.table.toLowerCase()
        );
        if (!targetTable) return;

        const sourcePos = positions[sourceTable.name];
        const targetPos = positions[targetTable.name];
        if (!sourcePos || !targetPos) return;

        // Find row index of fromCol in sourceTable
        const fromColIdx = sourceTable.columns.findIndex(
          (c) => c.name.toLowerCase() === fk.from.toLowerCase()
        );
        // Find row index of toCol in targetTable
        const toColIdx = targetTable.columns.findIndex(
          (c) => c.name.toLowerCase() === fk.to.toLowerCase()
        );

        const sourceY = sourcePos.y + HEADER_HEIGHT + (fromColIdx >= 0 ? fromColIdx : 0) * ROW_HEIGHT + ROW_HEIGHT / 2;
        const targetY = targetPos.y + HEADER_HEIGHT + (toColIdx >= 0 ? toColIdx : 0) * ROW_HEIGHT + ROW_HEIGHT / 2;

        // Determine if target is to the right or left of source
        const targetIsRight = targetPos.x > sourcePos.x;
        const x1 = targetIsRight ? sourcePos.x + CARD_WIDTH : sourcePos.x;
        const x2 = targetIsRight ? targetPos.x : targetPos.x + CARD_WIDTH;

        list.push({
          id: `${sourceTable.name}.${fk.from}->${targetTable.name}.${fk.to}`,
          fromTable: sourceTable.name,
          fromCol: fk.from,
          toTable: targetTable.name,
          toCol: fk.to,
          x1,
          y1: sourceY,
          x2,
          y2: targetY,
        });
      });
    });

    return list;
  }, [schema.tables, positions]);

  if (schema.tables.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center select-none">
        <div className="w-14 h-14 rounded-2xl bg-purple-500/10 dark:bg-purple-500/15 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-3.5 shadow-sm">
          <TableIcon className="w-7 h-7 stroke-[1.75]" />
        </div>
        <div className="text-base font-semibold text-neutral-800 dark:text-neutral-100">
          No Tables Found in Schema
        </div>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm mt-1">
          Create a table using SQL (e.g. <code className="font-mono text-[#007AFF]">CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT);</code>) to view the live ER diagram.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onMouseDown={handleCanvasMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onWheel={handleWheel}
      className={`relative w-full h-full overflow-hidden select-none cursor-grab active:cursor-grabbing bg-[#F9F9FB] dark:bg-[#121214]`}
      style={{
        backgroundImage: `radial-gradient(circle, rgba(142, 142, 147, 0.15) 1px, transparent 1px)`,
        backgroundSize: `${24 * scale}px ${24 * scale}px`,
        backgroundPosition: `${pan.x}px ${pan.y}px`,
      }}
    >
      {/* Interactive Transform Canvas */}
      <div
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
          transformOrigin: '0 0',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '5000px',
          height: '5000px',
        }}
      >
        {/* SVG Relations Layer */}
        <svg
          className="absolute inset-0 pointer-events-none"
          style={{ width: '5000px', height: '5000px', overflow: 'visible' }}
        >
          <defs>
            <marker
              id="er-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#007AFF" />
            </marker>
            <marker
              id="er-arrow-active"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 9 5 L 0 9 z" fill="#34C759" />
            </marker>
          </defs>

          {relations.map((rel) => {
            const isHovered = hoveredFk === rel.id;
            const dx = Math.abs(rel.x2 - rel.x1) * 0.55;
            const pathData = `M ${rel.x1} ${rel.y1} C ${rel.x1 + (rel.x2 > rel.x1 ? dx : -dx)} ${rel.y1}, ${rel.x2 + (rel.x2 > rel.x1 ? -dx : dx)} ${rel.y2}, ${rel.x2} ${rel.y2}`;

            return (
              <g key={rel.id}>
                {/* Thick invisible hit area for easy hover */}
                <path
                  d={pathData}
                  fill="none"
                  stroke="transparent"
                  strokeWidth={14}
                  className="pointer-events-auto cursor-pointer"
                  onMouseEnter={() => setHoveredFk(rel.id)}
                  onMouseLeave={() => setHoveredFk(null)}
                />
                {/* Visible curved line */}
                <path
                  d={pathData}
                  fill="none"
                  stroke={isHovered ? '#34C759' : '#007AFF'}
                  strokeWidth={isHovered ? 2.8 : 1.75}
                  strokeDasharray={isHovered ? 'none' : '4 3'}
                  markerEnd={isHovered ? 'url(#er-arrow-active)' : 'url(#er-arrow)'}
                  className="transition-all duration-150"
                  opacity={isHovered ? 1 : 0.75}
                />
              </g>
            );
          })}
        </svg>

        {/* Table Nodes */}
        {schema.tables.map((table) => {
          const pos = positions[table.name] || { x: 60, y: 60 };

          return (
            <div
              key={table.name}
              style={{
                transform: `translate(${pos.x}px, ${pos.y}px)`,
                width: `${CARD_WIDTH}px`,
              }}
              className="er-node-card absolute top-0 left-0 rounded-2xl bg-white/95 dark:bg-[#1E1E22]/95 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.12] shadow-lg shadow-black/5 dark:shadow-black/40 overflow-hidden transition-shadow duration-200 hover:shadow-xl group"
            >
              {/* Header / Grab Handle */}
              <div
                onMouseDown={(e) => startDragNode(table, e)}
                className="flex items-center justify-between px-3 py-2.5 bg-[#F2F2F7]/90 dark:bg-[#2C2C2E]/90 border-b border-black/[0.06] dark:border-white/[0.08] cursor-move select-none"
              >
                <div className="flex items-center space-x-2 truncate">
                  <div className="w-6 h-6 rounded-lg bg-[#007AFF]/15 dark:bg-[#0A84FF]/20 flex items-center justify-center text-[#007AFF] dark:text-[#0A84FF] shrink-0">
                    <TableIcon className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-semibold text-xs text-neutral-900 dark:text-neutral-100 truncate">
                    {table.name}
                  </span>
                </div>

                <div className="flex items-center space-x-1.5 shrink-0">
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-black/[0.05] dark:bg-white/[0.08] text-neutral-500 dark:text-neutral-400">
                    {table.rowCount ?? 0}
                  </span>
                </div>
              </div>

              {/* Columns List */}
              <div className="p-1">
                {table.columns.map((col) => {
                  const isPk = col.pk;
                  const isFk = col.isFk;

                  return (
                    <div
                      key={col.name}
                      className="flex items-center justify-between px-2.5 py-1 rounded-lg text-xs hover:bg-black/[0.03] dark:hover:bg-white/[0.05] transition-colors"
                      style={{ height: `${ROW_HEIGHT}px` }}
                    >
                      <div className="flex items-center space-x-1.5 truncate">
                        {isPk && (
                          <span title="Primary Key">
                            <Key className="w-3.5 h-3.5 text-[#FF9500] shrink-0" />
                          </span>
                        )}
                        {isFk && !isPk && (
                          <span title={`Foreign Key -> ${col.fkTargetTable}.${col.fkTargetColumn}`}>
                            <Link2 className="w-3.5 h-3.5 text-[#007AFF] shrink-0" />
                          </span>
                        )}
                        {!isPk && !isFk && (
                          <div className="w-1.5 h-1.5 rounded-full bg-neutral-300 dark:bg-neutral-600 shrink-0 ml-1 mr-1" />
                        )}
                        <span
                          className={`font-mono text-[11px] truncate ${
                            isPk
                              ? 'font-bold text-neutral-900 dark:text-white'
                              : 'text-neutral-700 dark:text-neutral-300'
                          }`}
                        >
                          {col.name}
                        </span>
                      </div>

                      <span className="font-mono text-[10px] text-neutral-400 dark:text-neutral-500 uppercase shrink-0 pl-2">
                        {col.type || 'TEXT'}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Card Footer: Quick Query Action */}
              <div className="px-2 py-1.5 bg-[#F9F9FB]/80 dark:bg-[#18181A]/80 border-t border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => onTableSelect(table.name)}
                  className="w-full flex items-center justify-center space-x-1 py-1 rounded-lg text-[11px] font-medium text-[#007AFF] hover:bg-blue-500/10 active:scale-95 transition-all"
                  title={`Insert SELECT query for ${table.name} into editor`}
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Query Table</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating iOS Glass Canvas Controls */}
      <div className="absolute bottom-4 right-4 flex items-center space-x-1 p-1 rounded-2xl bg-white/80 dark:bg-[#1E1E22]/80 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.12] shadow-lg shadow-black/5 dark:shadow-black/40 z-20">
        <button
          type="button"
          onClick={zoomIn}
          className="w-7 h-7 rounded-xl flex items-center justify-center text-neutral-700 dark:text-neutral-300 hover:bg-black/[0.06] dark:hover:bg-white/[0.08] active:scale-95 transition-all"
          title="Zoom In"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={zoomOut}
          className="w-7 h-7 rounded-xl flex items-center justify-center text-neutral-700 dark:text-neutral-300 hover:bg-black/[0.06] dark:hover:bg-white/[0.08] active:scale-95 transition-all"
          title="Zoom Out"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={fitToScreen}
          className="w-7 h-7 rounded-xl flex items-center justify-center text-neutral-700 dark:text-neutral-300 hover:bg-black/[0.06] dark:hover:bg-white/[0.08] active:scale-95 transition-all"
          title="Fit to Screen"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={resetView}
          className="w-7 h-7 rounded-xl flex items-center justify-center text-neutral-700 dark:text-neutral-300 hover:bg-black/[0.06] dark:hover:bg-white/[0.08] active:scale-95 transition-all"
          title="Reset View (100%)"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
        <span className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 px-1.5">
          {Math.round(scale * 100)}%
        </span>
      </div>
    </div>
  );
};

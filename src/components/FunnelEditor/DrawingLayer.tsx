import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Stage, Layer, Line } from 'react-konva';
import { cn } from '../../lib/utils';
import { Trash2, Undo2, Redo2, Eraser, Pencil, X } from 'lucide-react';

interface DrawingLayerProps {
  isActive: boolean;
  isEraser?: boolean;
  color: string;
}

interface DrawingLine {
  points: number[];
  color: string;
  isEraser: boolean;
}

export function DrawingLayer({ isActive, isEraser = false, color }: DrawingLayerProps) {
  const [lines, setLines] = useState<DrawingLine[]>([]);
  const [undoStack, setUndoStack] = useState<DrawingLine[][]>([]);
  const [redoStack, setRedoStack] = useState<DrawingLine[][]>([]);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const isDrawing = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const updateSize = () => {
        if (containerRef.current) {
          setSize({
            width: containerRef.current.offsetWidth,
            height: containerRef.current.offsetHeight,
          });
        }
      };
      updateSize();
      window.addEventListener('resize', updateSize);
      return () => window.removeEventListener('resize', updateSize);
    }
  }, []);

  const handleMouseDown = (e: any) => {
    if (!isActive) return;
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    
    // Save current state to undo stack
    setUndoStack((prev) => [...prev, [...lines]]);
    setRedoStack([]); // Clear redo stack on new action

    setLines([...lines, { points: [pos.x, pos.y], color, isEraser }]);
  };

  const handleMouseMove = (e: any) => {
    if (!isDrawing.current || !isActive) return;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    
    setLines((prevLines) => {
      if (prevLines.length === 0) return prevLines;
      const lastLine = { ...prevLines[prevLines.length - 1] };
      if (!lastLine.points) return prevLines;
      lastLine.points = lastLine.points.concat([point.x, point.y]);
      const newLines = [...prevLines];
      newLines[newLines.length - 1] = lastLine;
      return newLines;
    });
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const undo = useCallback(() => {
    if (undoStack.length === 0) return;
    const previous = undoStack[undoStack.length - 1];
    setRedoStack((prev) => [...prev, [...lines]]);
    setLines(previous);
    setUndoStack((prev) => prev.slice(0, -1));
  }, [undoStack, lines]);

  const redo = useCallback(() => {
    if (redoStack.length === 0) return;
    const next = redoStack[redoStack.length - 1];
    setUndoStack((prev) => [...prev, [...lines]]);
    setLines(next);
    setRedoStack((prev) => prev.slice(0, -1));
  }, [redoStack, lines]);

  const clearDrawing = () => {
    setUndoStack((prev) => [...prev, [...lines]]);
    setRedoStack([]);
    setLines([]);
  };

  return (
    <div 
      ref={containerRef}
      className={cn(
        "absolute inset-0 z-20",
        isActive ? "pointer-events-auto cursor-pencil" : "pointer-events-none"
      )}
    >
      {isActive && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-2 rounded-2xl shadow-2xl pointer-events-auto animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-center gap-1 px-2 border-r border-zinc-100 dark:border-zinc-800">
            <div className={cn(
              "p-2 rounded-lg flex items-center gap-2 text-xs font-bold",
              isEraser ? "text-zinc-400" : "bg-orange-500 text-white"
            )}>
              <Pencil className="w-4 h-4" />
              Lápis
            </div>
            <div className={cn(
              "p-2 rounded-lg flex items-center gap-2 text-xs font-bold",
              isEraser ? "bg-orange-500 text-white" : "text-zinc-400"
            )}>
              <Eraser className="w-4 h-4" />
              Borracha
            </div>
          </div>
          
          <button
            onClick={undo}
            disabled={undoStack.length === 0}
            className="p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 disabled:opacity-30 transition-all"
            title="Desfazer"
          >
            <Undo2 className="w-5 h-5" />
          </button>
          <button
            onClick={redo}
            disabled={redoStack.length === 0}
            className="p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 disabled:opacity-30 transition-all"
            title="Refazer"
          >
            <Redo2 className="w-5 h-5" />
          </button>
          <div className="w-px h-6 bg-zinc-100 dark:bg-zinc-800 mx-1" />
          <button
            onClick={clearDrawing}
            className="p-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 text-red-500 transition-all"
            title="Limpar Quadro"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      )}

      <Stage
        width={size.width}
        height={size.height}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        className="touch-none"
      >
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke={line.color}
              strokeWidth={line.isEraser ? 20 : 3}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation={line.isEraser ? 'destination-out' : 'source-over'}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}

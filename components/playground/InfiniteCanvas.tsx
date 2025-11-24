'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { CanvasComponent, Viewport } from '@/lib/playground/types';
import { BaseCard } from './cards/BaseCard';

interface InfiniteCanvasProps {
  viewport: Viewport;
  components: CanvasComponent[];
  selectedId: string | null;
  onViewportChange: (viewport: Viewport) => void;
  onComponentMove: (id: string, position: { x: number; y: number }) => void;
  onSelect: (id: string | null) => void;
  onRemoveComponent: (id: string) => void;
  onToggleExpand: (id: string) => void;
}

export function InfiniteCanvas({
  viewport,
  components,
  selectedId,
  onViewportChange,
  onComponentMove,
  onSelect,
  onRemoveComponent,
  onToggleExpand
}: InfiniteCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Handle mouse wheel zoom
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.05 : 0.05;
    const newZoom = Math.max(0.1, Math.min(5, viewport.zoom + delta));

    // Zoom toward cursor position
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const scale = newZoom / viewport.zoom;
      const newX = mouseX - (mouseX - viewport.x) * scale;
      const newY = mouseY - (mouseY - viewport.y) * scale;

      onViewportChange({ x: newX, y: newY, zoom: newZoom });
    }
  }, [viewport, onViewportChange]);

  // Handle pan start
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.target === canvasRef.current || (e.target as HTMLElement).classList.contains('canvas-background')) {
      setIsPanning(true);
      setPanStart({ x: e.clientX - viewport.x, y: e.clientY - viewport.y });
      onSelect(null);
    }
  }, [viewport, onSelect]);

  // Handle pan/drag move
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isPanning) {
      onViewportChange({
        ...viewport,
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y
      });
    } else if (draggedId) {
      const newX = (e.clientX - dragOffset.x - viewport.x) / viewport.zoom;
      const newY = (e.clientY - dragOffset.y - viewport.y) / viewport.zoom;
      onComponentMove(draggedId, { x: newX, y: newY });
    }
  }, [isPanning, draggedId, panStart, dragOffset, viewport, onViewportChange, onComponentMove]);

  // Handle pan/drag end
  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
    setDraggedId(null);
  }, []);

  // Handle component drag start
  const handleComponentDragStart = useCallback((id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const component = components.find(c => c.id === id);
    if (!component) return;

    setDraggedId(id);
    setDragOffset({
      x: e.clientX - (component.position.x * viewport.zoom + viewport.x),
      y: e.clientY - (component.position.y * viewport.zoom + viewport.y)
    });
    onSelect(id);
  }, [components, viewport, onSelect]);

  // Handle double click to zoom
  const handleDoubleClick = useCallback((e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const newZoom = Math.min(2, viewport.zoom * 1.5);
    const scale = newZoom / viewport.zoom;
    const newX = mouseX - (mouseX - viewport.x) * scale;
    const newY = mouseY - (mouseY - viewport.y) * scale;

    onViewportChange({ x: newX, y: newY, zoom: newZoom });
  }, [viewport, onViewportChange]);

  // Listen for mouse up outside canvas
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsPanning(false);
      setDraggedId(null);
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  return (
    <div
      ref={canvasRef}
      className="w-full h-full overflow-hidden relative"
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onDoubleClick={handleDoubleClick}
      style={{ cursor: isPanning ? 'grabbing' : draggedId ? 'move' : 'grab' }}
    >
      {/* Grid Background */}
      <div
        className="canvas-background absolute inset-0 pointer-events-auto"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: `${50 * viewport.zoom}px ${50 * viewport.zoom}px`,
          backgroundPosition: `${viewport.x}px ${viewport.y}px`
        }}
      />

      {/* Transform Container */}
      <div
        className="absolute origin-top-left"
        style={{
          transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
          transformOrigin: '0 0'
        }}
      >
        {/* Render Components */}
        {components
          .sort((a, b) => a.zIndex - b.zIndex)
          .map(component => (
            <BaseCard
              key={component.id}
              component={component}
              isSelected={selectedId === component.id}
              isDragging={draggedId === component.id}
              onDragStart={(e) => handleComponentDragStart(component.id, e)}
              onSelect={() => onSelect(component.id)}
              onRemove={() => onRemoveComponent(component.id)}
              onToggleExpand={() => onToggleExpand(component.id)}
            />
          ))}
      </div>

      {/* Zoom Level Indicator */}
      <div className="absolute bottom-4 right-4 px-3 py-1 bg-white/5 rounded text-white/40 text-sm font-mono">
        {Math.round(viewport.zoom * 100)}%
      </div>
    </div>
  );
}

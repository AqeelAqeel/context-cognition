'use client';

import { useState, useCallback } from 'react';
import { InfiniteCanvas } from '@/components/playground/InfiniteCanvas';
import { CanvasControls } from '@/components/playground/CanvasControls';
import { ComponentPalette } from '@/components/playground/ComponentPalette';
import { CanvasComponent, ComponentType, COMPONENT_REGISTRY, Viewport } from '@/lib/playground/types';

// Generate unique ID
const generateId = () => `comp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// Initial components for demo
const initialComponents: CanvasComponent[] = [
  { id: generateId(), type: 'human_states', position: { x: 50, y: 50 }, size: { width: 320, height: 400 }, zIndex: 1, isExpanded: true, isMinimized: false },
  { id: generateId(), type: 'database', position: { x: 420, y: 50 }, size: { width: 360, height: 380 }, zIndex: 2, isExpanded: true, isMinimized: false },
  { id: generateId(), type: 'interface_layer', position: { x: 830, y: 50 }, size: { width: 340, height: 420 }, zIndex: 3, isExpanded: true, isMinimized: false },
  { id: generateId(), type: 'prompt_chain', position: { x: 50, y: 500 }, size: { width: 380, height: 450 }, zIndex: 4, isExpanded: true, isMinimized: false },
  { id: generateId(), type: 'data_sources', position: { x: 480, y: 480 }, size: { width: 340, height: 400 }, zIndex: 5, isExpanded: true, isMinimized: false },
  { id: generateId(), type: 'knowledge_base', position: { x: 870, y: 520 }, size: { width: 360, height: 420 }, zIndex: 6, isExpanded: true, isMinimized: false },
  { id: generateId(), type: 'living_documents', position: { x: 1280, y: 50 }, size: { width: 350, height: 440 }, zIndex: 7, isExpanded: true, isMinimized: false },
  { id: generateId(), type: 'core_functions', position: { x: 1280, y: 540 }, size: { width: 340, height: 520 }, zIndex: 8, isExpanded: true, isMinimized: false },
];

export default function PlaygroundPage() {
  const [viewport, setViewport] = useState<Viewport>({ x: 0, y: 0, zoom: 0.7 });
  const [components, setComponents] = useState<CanvasComponent[]>(initialComponents);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isPaletteOpen, setIsPaletteOpen] = useState(true);

  // Handle zoom changes
  const handleZoomChange = useCallback((delta: number) => {
    setViewport(prev => ({
      ...prev,
      zoom: Math.max(0.1, Math.min(5, prev.zoom + delta))
    }));
  }, []);

  // Handle reset view
  const handleResetView = useCallback(() => {
    setViewport({ x: 0, y: 0, zoom: 0.7 });
  }, []);

  // Handle fit all
  const handleFitAll = useCallback(() => {
    if (components.length === 0) return;

    const minX = Math.min(...components.map(c => c.position.x));
    const minY = Math.min(...components.map(c => c.position.y));
    const maxX = Math.max(...components.map(c => c.position.x + c.size.width));
    const maxY = Math.max(...components.map(c => c.position.y + c.size.height));

    const contentWidth = maxX - minX + 100;
    const contentHeight = maxY - minY + 100;

    const zoom = Math.min(
      (window.innerWidth - 100) / contentWidth,
      (window.innerHeight - 100) / contentHeight,
      1
    );

    setViewport({
      x: -minX + 50,
      y: -minY + 50,
      zoom: Math.max(0.2, zoom)
    });
  }, [components]);

  // Handle viewport change from canvas
  const handleViewportChange = useCallback((newViewport: Viewport) => {
    setViewport(newViewport);
  }, []);

  // Handle component position change
  const handleComponentMove = useCallback((id: string, position: { x: number; y: number }) => {
    setComponents(prev => prev.map(c =>
      c.id === id ? { ...c, position } : c
    ));
  }, []);

  // Handle component selection
  const handleSelect = useCallback((id: string | null) => {
    setSelectedId(id);
    if (id) {
      setComponents(prev => {
        const maxZ = Math.max(...prev.map(c => c.zIndex));
        return prev.map(c => c.id === id ? { ...c, zIndex: maxZ + 1 } : c);
      });
    }
  }, []);

  // Handle add component from palette
  const handleAddComponent = useCallback((type: ComponentType) => {
    const def = COMPONENT_REGISTRY.find(c => c.type === type);
    if (!def) return;

    const newComponent: CanvasComponent = {
      id: generateId(),
      type,
      position: {
        x: (-viewport.x + window.innerWidth / 2) / viewport.zoom - def.defaultSize.width / 2,
        y: (-viewport.y + window.innerHeight / 2) / viewport.zoom - def.defaultSize.height / 2
      },
      size: { ...def.defaultSize },
      zIndex: Math.max(...components.map(c => c.zIndex), 0) + 1,
      isExpanded: true,
      isMinimized: false
    };

    setComponents(prev => [...prev, newComponent]);
    setSelectedId(newComponent.id);
  }, [viewport, components]);

  // Handle remove component
  const handleRemoveComponent = useCallback((id: string) => {
    setComponents(prev => prev.filter(c => c.id !== id));
    if (selectedId === id) setSelectedId(null);
  }, [selectedId]);

  // Handle toggle expand
  const handleToggleExpand = useCallback((id: string) => {
    setComponents(prev => prev.map(c =>
      c.id === id ? { ...c, isExpanded: !c.isExpanded } : c
    ));
  }, []);

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* Canvas Controls */}
      <CanvasControls
        zoom={viewport.zoom}
        onZoomIn={() => handleZoomChange(0.1)}
        onZoomOut={() => handleZoomChange(-0.1)}
        onReset={handleResetView}
        onFitAll={handleFitAll}
        onTogglePalette={() => setIsPaletteOpen(!isPaletteOpen)}
        isPaletteOpen={isPaletteOpen}
      />

      {/* Component Palette */}
      <ComponentPalette
        isOpen={isPaletteOpen}
        onAddComponent={handleAddComponent}
        onClose={() => setIsPaletteOpen(false)}
      />

      {/* Main Canvas */}
      <InfiniteCanvas
        viewport={viewport}
        components={components}
        selectedId={selectedId}
        onViewportChange={handleViewportChange}
        onComponentMove={handleComponentMove}
        onSelect={handleSelect}
        onRemoveComponent={handleRemoveComponent}
        onToggleExpand={handleToggleExpand}
      />

      {/* Back to Home Link */}
      <a
        href="/"
        className="fixed bottom-4 left-4 z-50 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white/70 hover:text-white text-sm transition-all flex items-center gap-2"
      >
        <span>←</span>
        <span>Back to Home</span>
      </a>
    </div>
  );
}

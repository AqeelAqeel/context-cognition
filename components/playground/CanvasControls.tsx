'use client';

interface CanvasControlsProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  onFitAll: () => void;
  onTogglePalette: () => void;
  isPaletteOpen: boolean;
}

export function CanvasControls({
  zoom,
  onZoomIn,
  onZoomOut,
  onReset,
  onFitAll,
  onTogglePalette,
  isPaletteOpen
}: CanvasControlsProps) {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2 bg-black/80 backdrop-blur-sm border border-white/10 rounded-xl">
      {/* Palette Toggle */}
      <button
        onClick={onTogglePalette}
        className={`p-2 rounded-lg transition-all ${
          isPaletteOpen
            ? 'bg-white/20 text-white'
            : 'hover:bg-white/10 text-white/60 hover:text-white'
        }`}
        title="Toggle Component Palette"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div className="w-px h-6 bg-white/10" />

      {/* Zoom Controls */}
      <button
        onClick={onZoomOut}
        className="p-2 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition-all"
        title="Zoom Out"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
        </svg>
      </button>

      <span className="text-white/80 text-sm font-mono min-w-[50px] text-center">
        {Math.round(zoom * 100)}%
      </span>

      <button
        onClick={onZoomIn}
        className="p-2 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition-all"
        title="Zoom In"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>

      <div className="w-px h-6 bg-white/10" />

      {/* Reset View */}
      <button
        onClick={onReset}
        className="p-2 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition-all"
        title="Reset View"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>

      {/* Fit All */}
      <button
        onClick={onFitAll}
        className="p-2 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition-all"
        title="Fit All Components"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
        </svg>
      </button>

      <div className="w-px h-6 bg-white/10" />

      {/* Help Text */}
      <span className="text-white/40 text-xs">
        Scroll to zoom • Drag to pan • Double-click to zoom in
      </span>
    </div>
  );
}

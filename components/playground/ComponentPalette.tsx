'use client';

import { ComponentType, COMPONENT_REGISTRY } from '@/lib/playground/types';

interface ComponentPaletteProps {
  isOpen: boolean;
  onAddComponent: (type: ComponentType) => void;
  onClose: () => void;
}

export function ComponentPalette({ isOpen, onAddComponent, onClose }: ComponentPaletteProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed top-20 left-4 z-40 w-64 bg-black/90 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <h3 className="text-white font-medium">Components</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-white/10 rounded text-white/40 hover:text-white transition-all"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Component List */}
      <div className="p-2 max-h-[calc(100vh-200px)] overflow-y-auto">
        {COMPONENT_REGISTRY.map((def) => (
          <button
            key={def.type}
            onClick={() => onAddComponent(def.type)}
            className="w-full flex items-start gap-3 p-3 hover:bg-white/5 rounded-lg transition-all group text-left"
          >
            <span className="text-2xl">{def.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="text-white font-medium text-sm group-hover:text-cyan-400 transition-colors">
                {def.name}
              </div>
              <div className="text-white/40 text-xs mt-0.5 line-clamp-2">
                {def.description}
              </div>
            </div>
            <svg
              className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-all mt-1 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        ))}
      </div>

      {/* Footer Hint */}
      <div className="px-4 py-2 border-t border-white/10 bg-white/5">
        <p className="text-white/30 text-xs">
          Click to add component to canvas center
        </p>
      </div>
    </div>
  );
}

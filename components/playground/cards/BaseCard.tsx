'use client';

import { CanvasComponent, COMPONENT_REGISTRY } from '@/lib/playground/types';
import { HumanStateCard } from './HumanStateCard';
import { DatabaseCard } from './DatabaseCard';
import { InterfaceLayerCard } from './InterfaceLayerCard';
import { PromptChainCard } from './PromptChainCard';
import { DataSourcesCard } from './DataSourcesCard';
import { KnowledgeBaseCard } from './KnowledgeBaseCard';
import { LivingDocumentCard } from './LivingDocumentCard';
import { CoreFunctionsCard } from './CoreFunctionsCard';

interface BaseCardProps {
  component: CanvasComponent;
  isSelected: boolean;
  isDragging: boolean;
  onDragStart: (e: React.MouseEvent) => void;
  onSelect: () => void;
  onRemove: () => void;
  onToggleExpand: () => void;
}

export function BaseCard({
  component,
  isSelected,
  isDragging,
  onDragStart,
  onSelect,
  onRemove,
  onToggleExpand
}: BaseCardProps) {
  const def = COMPONENT_REGISTRY.find(c => c.type === component.type);

  // Render the appropriate card content based on type
  const renderContent = () => {
    switch (component.type) {
      case 'human_states':
        return <HumanStateCard isExpanded={component.isExpanded} />;
      case 'database':
        return <DatabaseCard isExpanded={component.isExpanded} />;
      case 'interface_layer':
        return <InterfaceLayerCard isExpanded={component.isExpanded} />;
      case 'prompt_chain':
        return <PromptChainCard isExpanded={component.isExpanded} />;
      case 'data_sources':
        return <DataSourcesCard isExpanded={component.isExpanded} />;
      case 'knowledge_base':
        return <KnowledgeBaseCard isExpanded={component.isExpanded} />;
      case 'living_documents':
        return <LivingDocumentCard isExpanded={component.isExpanded} />;
      case 'core_functions':
        return <CoreFunctionsCard isExpanded={component.isExpanded} />;
      default:
        return <div className="p-4 text-white/50">Unknown component type</div>;
    }
  };

  return (
    <div
      className={`absolute rounded-xl border transition-all duration-200 overflow-hidden ${
        isSelected
          ? 'border-cyan-500/50 shadow-lg shadow-cyan-500/20'
          : 'border-white/10 hover:border-white/20'
      } ${isDragging ? 'opacity-90' : ''}`}
      style={{
        left: component.position.x,
        top: component.position.y,
        width: component.size.width,
        zIndex: component.zIndex,
        background: 'linear-gradient(180deg, rgba(20,20,25,0.98) 0%, rgba(10,10,15,0.98) 100%)'
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-3 py-2 border-b border-white/10 cursor-move bg-white/5"
        onMouseDown={onDragStart}
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">{def?.icon}</span>
          <span className="text-white font-medium text-sm">{def?.name}</span>
        </div>
        <div className="flex items-center gap-1">
          {/* Expand/Collapse */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpand();
            }}
            className="p-1.5 hover:bg-white/10 rounded text-white/40 hover:text-white transition-all"
            title={component.isExpanded ? 'Collapse' : 'Expand'}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {component.isExpanded ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              )}
            </svg>
          </button>
          {/* Close */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="p-1.5 hover:bg-red-500/20 rounded text-white/40 hover:text-red-400 transition-all"
            title="Remove"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      {component.isExpanded && (
        <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
          {renderContent()}
        </div>
      )}

      {/* Collapsed state */}
      {!component.isExpanded && (
        <div className="px-3 py-2 text-white/40 text-xs">
          {def?.description}
        </div>
      )}
    </div>
  );
}

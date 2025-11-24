'use client';

import { useState } from 'react';
import { HumanStateId } from '@/lib/playground/types';
import { humanStatesData } from '@/lib/playground/mockData';

interface HumanStateCardProps {
  isExpanded: boolean;
}

export function HumanStateCard({ isExpanded }: HumanStateCardProps) {
  const [selectedState, setSelectedState] = useState<HumanStateId>(humanStatesData.selectedState);
  const [showDetails, setShowDetails] = useState(true);

  const currentState = humanStatesData.states.find(s => s.id === selectedState);

  if (!isExpanded) return null;

  return (
    <div className="p-4 space-y-4">
      {/* Current State Display */}
      <div className="flex items-center gap-2">
        <span className="text-white/60 text-sm">Current State:</span>
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: currentState?.color }}
          />
          <span className="text-white font-medium">{currentState?.name}</span>
        </div>
      </div>

      {/* State Selector Grid */}
      <div className="grid grid-cols-4 gap-2">
        {humanStatesData.states.map((state) => (
          <button
            key={state.id}
            onClick={() => setSelectedState(state.id)}
            className={`relative p-3 rounded-lg border transition-all ${
              selectedState === state.id
                ? 'border-white/40 bg-white/10'
                : 'border-white/10 hover:border-white/20 hover:bg-white/5'
            }`}
          >
            <div
              className="w-full aspect-square rounded-md flex items-center justify-center text-white font-bold text-lg"
              style={{
                backgroundColor: `${state.color}20`,
                color: state.color
              }}
            >
              {state.id.split('_')[1]}
            </div>
            {selectedState === state.id && (
              <div
                className="absolute inset-0 rounded-lg border-2 pointer-events-none"
                style={{ borderColor: state.color }}
              />
            )}
          </button>
        ))}
      </div>

      {/* State Details Toggle */}
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-all"
      >
        <svg
          className={`w-4 h-4 transition-transform ${showDetails ? 'rotate-90' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        State Details
      </button>

      {/* State Details Panel */}
      {showDetails && currentState && (
        <div className="p-3 bg-white/5 rounded-lg space-y-3 border border-white/10">
          {/* Meta Description */}
          <div>
            <p className="text-white/90 text-sm">{currentState.metaDescription}</p>
          </div>

          {/* Cognitive Load */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-white/60">Cognitive Load</span>
              <span className="text-white/80">{currentState.cognitiveLoad}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${currentState.cognitiveLoad}%`,
                  backgroundColor: currentState.color
                }}
              />
            </div>
          </div>

          {/* Attention Focus */}
          <div className="flex items-center justify-between">
            <span className="text-white/60 text-xs">Attention Focus</span>
            <span
              className="px-2 py-0.5 rounded text-xs font-medium"
              style={{
                backgroundColor: `${currentState.color}20`,
                color: currentState.color
              }}
            >
              {currentState.attentionFocus}
            </span>
          </div>

          {/* Characteristics */}
          <div>
            <span className="text-white/60 text-xs block mb-1">Characteristics</span>
            <div className="flex flex-wrap gap-1">
              {currentState.characteristics.map((char, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 bg-white/10 rounded text-xs text-white/70"
                >
                  {char}
                </span>
              ))}
            </div>
          </div>

          {/* Active Prompts */}
          <div>
            <span className="text-white/60 text-xs block mb-1">Active Prompts</span>
            <div className="flex flex-wrap gap-1">
              {currentState.activePrompts.map((prompt, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded text-xs font-mono"
                  style={{
                    backgroundColor: `${currentState.color}20`,
                    color: currentState.color
                  }}
                >
                  {prompt}
                </span>
              ))}
            </div>
          </div>

          {/* Leads To */}
          <div>
            <span className="text-white/60 text-xs block mb-1">Can transition to</span>
            <div className="flex gap-1">
              {currentState.leadsTo.map((nextId) => {
                const nextState = humanStatesData.states.find(s => s.id === nextId);
                return (
                  <button
                    key={nextId}
                    onClick={() => setSelectedState(nextId)}
                    className="px-2 py-0.5 rounded text-xs border border-white/20 hover:border-white/40 transition-all"
                    style={{ color: nextState?.color }}
                  >
                    {nextState?.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

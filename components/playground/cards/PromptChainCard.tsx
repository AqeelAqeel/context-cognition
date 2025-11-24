'use client';

import { useState } from 'react';
import { promptChainData } from '@/lib/playground/mockData';

interface PromptChainCardProps {
  isExpanded: boolean;
}

export function PromptChainCard({ isExpanded }: PromptChainCardProps) {
  const [showConditions, setShowConditions] = useState(true);

  if (!isExpanded) return null;

  return (
    <div className="p-4 space-y-4">
      {/* Chain Flow Visualization */}
      <div className="space-y-2">
        <span className="text-white/60 text-xs">Chain Flow:</span>
        <div className="relative p-4 bg-white/5 rounded-lg border border-white/10">
          {/* Main Flow */}
          <div className="flex items-center justify-between gap-2">
            {promptChainData.prompts.slice(0, 3).map((prompt, idx) => (
              <div key={prompt.id} className="flex items-center gap-2">
                <PromptNode
                  name={prompt.name.split(' ').map(w => w[0]).join('')}
                  fullName={prompt.name}
                  isActive={prompt.isActive}
                />
                {idx < 2 && (
                  <svg className="w-6 h-4 text-white/30" viewBox="0 0 24 16">
                    <path
                      d="M2 8 L18 8 M14 4 L18 8 L14 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                )}
              </div>
            ))}
          </div>

          {/* Branch */}
          <div className="flex justify-center mt-4 gap-8">
            <div className="flex flex-col items-center gap-2">
              <svg className="w-4 h-6 text-white/30" viewBox="0 0 16 24">
                <path
                  d="M8 2 L8 18 M4 14 L8 18 L12 14"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
              <PromptNode
                name="IE"
                fullName="Insight Extractor"
                isActive={promptChainData.prompts[2]?.isActive}
              />
            </div>
            <div className="flex flex-col items-center gap-2">
              <svg className="w-4 h-6 text-white/30" viewBox="0 0 16 24">
                <path
                  d="M8 2 L8 18 M4 14 L8 18 L12 14"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
              <PromptNode
                name="RA"
                fullName="Risk Assessor"
                isActive={promptChainData.prompts[3]?.isActive}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Conditions Toggle */}
      <button
        onClick={() => setShowConditions(!showConditions)}
        className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-all"
      >
        <svg
          className={`w-4 h-4 transition-transform ${showConditions ? 'rotate-90' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        Conditions Panel
      </button>

      {/* Conditions */}
      {showConditions && (
        <div className="p-3 bg-white/5 rounded-lg border border-white/10 space-y-2">
          {promptChainData.conditions.map((condition) => {
            const prompt = promptChainData.prompts.find(p => p.id === condition.promptId);
            return (
              <div
                key={condition.id}
                className="flex items-center gap-2 text-xs"
              >
                <span
                  className={`w-4 text-center ${
                    condition.isMet ? 'text-green-400' : 'text-white/30'
                  }`}
                >
                  {condition.isMet ? '✓' : '○'}
                </span>
                <span className="text-white/60 font-mono flex-1">
                  {condition.variable} {condition.operator} {String(condition.value ?? '')}
                </span>
                <span className="text-white/40">→</span>
                <span className="text-white/70">{prompt?.name}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center gap-4 text-xs text-white/50 pt-2 border-t border-white/10">
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          <span>Active</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-gray-500" />
          <span>Pending</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-green-400">✓</span>
          <span>Condition Met</span>
        </div>
      </div>
    </div>
  );
}

function PromptNode({
  name,
  fullName,
  isActive
}: {
  name: string;
  fullName: string;
  isActive: boolean;
}) {
  return (
    <div
      className={`relative group px-3 py-2 rounded-lg border text-center min-w-[60px] ${
        isActive
          ? 'border-green-500/50 bg-green-500/10'
          : 'border-white/20 bg-white/5'
      }`}
    >
      <span className={`text-sm font-mono ${isActive ? 'text-green-400' : 'text-white/50'}`}>
        {name}
      </span>
      <span
        className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full ${
          isActive ? 'bg-green-500' : 'bg-gray-500'
        }`}
      />
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black/90 rounded text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {fullName}
      </div>
    </div>
  );
}

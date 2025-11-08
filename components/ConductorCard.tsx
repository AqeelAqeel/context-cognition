'use client';

import { useState } from 'react';
import { ContextPack } from '@/lib/contracts';

interface ConductorCardProps {
  contextPack: ContextPack;
  compiledPrompt: string;
}

export function ConductorCard({ contextPack, compiledPrompt }: ConductorCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(compiledPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const truncatedPrompt = compiledPrompt.length > 200 
    ? compiledPrompt.substring(0, 200) + '...'
    : compiledPrompt;

  return (
    <div className="bg-indigo-50 border border-indigo-200 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-indigo-100 px-4 py-3 border-b border-indigo-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
            <h3 className="text-sm font-medium text-indigo-800">
              Layer C: Conductor/Orchestrator (CO)
            </h3>
            <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded text-xs font-medium border border-indigo-300">
              System Prompt
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-2 py-1 text-xs text-indigo-600 hover:text-indigo-800 hover:bg-indigo-200 rounded transition-colors"
            >
              {copied ? '✓ Copied' : '📋 Copy'}
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              {isExpanded ? '⬆️' : '⬇️'}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Key Components Summary */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <h4 className="text-sm font-medium text-indigo-900 mb-1">Objectives</h4>
            <div className="space-y-1">
              {contextPack.objectives.map((obj, idx) => (
                <div
                  key={idx}
                  className="text-xs text-indigo-700 bg-white/50 rounded px-2 py-1"
                >
                  • {obj}
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-indigo-900 mb-1">Constraints</h4>
            <div className="space-y-1">
              {contextPack.constraints.slice(0, 3).map((constraint, idx) => (
                <div
                  key={idx}
                  className="text-xs text-indigo-700 bg-white/50 rounded px-2 py-1"
                >
                  • {constraint}
                </div>
              ))}
              {contextPack.constraints.length > 3 && (
                <div className="text-xs text-indigo-600">
                  +{contextPack.constraints.length - 3} more...
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Facts */}
        {contextPack.facts.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-indigo-900 mb-1">Known Facts</h4>
            <div className="flex flex-wrap gap-1">
              {contextPack.facts.slice(0, 3).map((fact, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs border border-indigo-200"
                >
                  {fact}
                </span>
              ))}
              {contextPack.facts.length > 3 && (
                <span className="text-xs text-indigo-600">
                  +{contextPack.facts.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Venue Context */}
        <div>
          <h4 className="text-sm font-medium text-indigo-900 mb-1">Venue Context</h4>
          <p className="text-xs text-indigo-700 bg-white/50 rounded px-2 py-1">
            {contextPack.venueNote}
          </p>
        </div>

        {/* Compiled System Prompt */}
        <div>
          <h4 className="text-sm font-medium text-indigo-900 mb-2">
            Compiled System Prompt
            <span className="text-xs text-indigo-600 ml-2">({compiledPrompt.length} chars)</span>
          </h4>
          
          <div className="bg-white/70 rounded border border-indigo-200 font-mono text-xs">
            {isExpanded ? (
              <pre className="p-3 whitespace-pre-wrap text-indigo-900 max-h-64 overflow-y-auto">
                {compiledPrompt}
              </pre>
            ) : (
              <div className="p-3 text-indigo-700">
                <div className="whitespace-pre-wrap">{truncatedPrompt}</div>
                {compiledPrompt.length > 200 && (
                  <button
                    onClick={() => setIsExpanded(true)}
                    className="text-indigo-600 hover:text-indigo-800 mt-2 text-xs underline"
                  >
                    Show full prompt
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
'use client';

import { useState } from 'react';
import { DerivedVars, ContextPack } from '@/lib/contracts';
import { LayerExplainerModal } from './LayerExplainerModal';

interface LayerPanelProps {
  type: 'oa' | 'co';
  derivedVars?: DerivedVars;
  contextPack?: ContextPack;
  compiledPrompt?: string;
}

export function LayerPanel({ type, derivedVars, contextPack, compiledPrompt }: LayerPanelProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const layerConfig = {
    oa: {
      title: "Observer/Analyst",
      shortDesc: "Monitors state and derives actionable variables",
      color: "amber",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      textColor: "text-amber-900",
      buttonColor: "bg-amber-500 hover:bg-amber-600",
    },
    co: {
      title: "Conductor/Orchestrator", 
      shortDesc: "Compiles policies and context into system prompts",
      color: "indigo",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200", 
      textColor: "text-indigo-900",
      buttonColor: "bg-indigo-500 hover:bg-indigo-600",
    }
  };

  const config = layerConfig[type];

  const renderOAVariables = () => {
    if (!derivedVars) return null;
    
    return (
      <div className="space-y-8">
        <div>
          <h4 className="text-xl font-bold text-gray-900 mb-4">Current Analysis</h4>
          <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
            <div className="text-sm font-medium text-amber-800 mb-2">Task Understanding</div>
            <p className="text-base text-amber-900 leading-relaxed">
              {derivedVars.taskHypothesis}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Available Actions</h4>
            <div className="space-y-3">
              {derivedVars.affordances.slice(0, 4).map((affordance, idx) => (
                <div key={idx} className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                  <span className="text-base font-medium text-gray-900">{affordance}</span>
                </div>
              ))}
              {derivedVars.affordances.length > 4 && (
                <div className="text-sm text-gray-500 text-center py-2">
                  +{derivedVars.affordances.length - 4} more available
                </div>
              )}
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">System Status</h4>
            <div className="space-y-4">
              {derivedVars.riskFlags.length > 0 ? (
                <div className="space-y-3">
                  {derivedVars.riskFlags.map((flag, idx) => (
                    <div key={idx} className="bg-red-50 rounded-lg p-4 border border-red-200">
                      <div className="flex items-center gap-2">
                        <span className="text-red-500">⚠️</span>
                        <span className="text-base font-medium text-red-900">{flag}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✅</span>
                    <span className="text-base font-medium text-green-900">All systems normal</span>
                  </div>
                </div>
              )}
              
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="text-sm font-medium text-blue-800 mb-2">Recommended Tools</div>
                <div className="text-sm text-blue-900">
                  {derivedVars.suggestedTools.length} tools suggested
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCOVariables = () => {
    if (!contextPack) return null;
    
    return (
      <div className="space-y-8">
        <div>
          <h4 className="text-xl font-bold text-gray-900 mb-4">Active Configuration</h4>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-200">
              <h5 className="text-lg font-semibold text-indigo-900 mb-4">Current Objectives</h5>
              <div className="space-y-3">
                {contextPack.objectives.map((obj, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-3 border border-indigo-200">
                    <div className="flex items-start gap-3">
                      <span className="text-indigo-600 font-bold">{idx + 1}.</span>
                      <span className="text-base text-indigo-900">{obj}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
              <h5 className="text-lg font-semibold text-orange-900 mb-4">Active Constraints</h5>
              <div className="space-y-3">
                {contextPack.constraints.slice(0, 3).map((constraint, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-3 border border-orange-200">
                    <div className="flex items-start gap-3">
                      <span className="text-orange-500">🔒</span>
                      <span className="text-sm text-orange-900">{constraint}</span>
                    </div>
                  </div>
                ))}
                {contextPack.constraints.length > 3 && (
                  <div className="text-sm text-orange-600 text-center py-2">
                    +{contextPack.constraints.length - 3} more constraints active
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Knowledge Base</h4>
            {contextPack.facts.length > 0 ? (
              <div className="space-y-3">
                {contextPack.facts.slice(0, 3).map((fact, idx) => (
                  <div key={idx} className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <div className="flex items-start gap-3">
                      <span className="text-blue-500">💡</span>
                      <span className="text-base text-blue-900">{fact}</span>
                    </div>
                  </div>
                ))}
                {contextPack.facts.length > 3 && (
                  <div className="text-sm text-blue-600 text-center py-2">
                    +{contextPack.facts.length - 3} more facts available
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 text-center">
                <span className="text-gray-500">No contextual facts loaded</span>
              </div>
            )}
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">System Prompt</h4>
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{compiledPrompt?.length || 0}</div>
                  <div className="text-sm text-gray-500">Characters</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{Math.ceil((compiledPrompt?.length || 0) / 4)}</div>
                  <div className="text-sm text-gray-500">Est. Tokens</div>
                </div>
              </div>
              <div className="text-sm text-gray-600 text-center">
                Dynamically compiled for current context
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex min-h-[280px]">
          {/* Left side - Layer info and controls */}
          <div className="w-80 p-8 border-r border-gray-200 bg-gray-50">
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className={type === 'oa' ? 
                    'w-4 h-4 bg-amber-500 rounded-full' : 
                    'w-4 h-4 bg-indigo-500 rounded-full'
                  }></span>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      Layer {type.toUpperCase()}
                    </h3>
                    <p className="text-sm text-gray-600 font-medium">
                      {config.title}
                    </p>
                  </div>
                </div>
                
                <p className="text-base text-gray-700 mb-6 leading-relaxed">
                  {config.shortDesc}
                </p>
                
                <button
                  onClick={() => setIsModalOpen(true)}
                  className={type === 'oa' ?
                    'bg-amber-500 hover:bg-amber-600 text-white px-5 py-3 rounded-lg font-medium transition-all transform hover:scale-105' :
                    'bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-3 rounded-lg font-medium transition-all transform hover:scale-105'
                  }
                >
                  💡 How it works
                </button>
              </div>
              
              <div className="pt-6 border-t border-gray-200">
                <h4 className="text-base font-bold text-gray-900 mb-4">Live Metrics</h4>
                {type === 'oa' ? (
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="text-xs uppercase tracking-wide text-gray-500 mb-1">Task Hypothesis</div>
                      <div className="text-sm text-gray-900 font-medium">
                        {derivedVars?.taskHypothesis.substring(0, 35)}...
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white rounded-lg p-3 border border-gray-200 text-center">
                        <div className="text-2xl font-bold text-amber-600">{derivedVars?.affordances.length || 0}</div>
                        <div className="text-xs text-gray-500">Affordances</div>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-gray-200 text-center">
                        <div className="text-2xl font-bold text-red-500">{derivedVars?.riskFlags.length || 0}</div>
                        <div className="text-xs text-gray-500">Risk Flags</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-white rounded-lg p-3 border border-gray-200 text-center">
                        <div className="text-2xl font-bold text-indigo-600">{contextPack?.objectives.length || 0}</div>
                        <div className="text-xs text-gray-500">Goals</div>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-gray-200 text-center">
                        <div className="text-2xl font-bold text-orange-500">{contextPack?.constraints.length || 0}</div>
                        <div className="text-xs text-gray-500">Rules</div>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-gray-200 text-center">
                        <div className="text-lg font-bold text-blue-600">{Math.ceil((compiledPrompt?.length || 0) / 1000)}k</div>
                        <div className="text-xs text-gray-500">Chars</div>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="text-xs uppercase tracking-wide text-gray-500 mb-1">Venue Context</div>
                      <div className="text-sm text-gray-900 font-medium">
                        {contextPack?.venueNote}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Right side - Detailed content with more space */}
          <div className="flex-1 p-8">
            <div className="h-full">
              {type === 'oa' ? renderOAVariables() : renderCOVariables()}
            </div>
          </div>
        </div>
      </div>

      <LayerExplainerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        layer={type}
      />
    </>
  );
}
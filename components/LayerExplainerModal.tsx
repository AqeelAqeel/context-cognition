'use client';

import { useState } from 'react';

interface LayerExplainerModalProps {
  isOpen: boolean;
  onClose: () => void;
  layer: 'oa' | 'co';
}

export function LayerExplainerModal({ isOpen, onClose, layer }: LayerExplainerModalProps) {
  if (!isOpen) return null;

  const layerInfo = {
    oa: {
      title: "Layer B: Observer/Analyst (OA)",
      color: "amber",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      textColor: "text-amber-900",
      badge: "bg-amber-100 text-amber-700",
      purpose: "The Observer/Analyst layer monitors machine state and persistence to derive actionable variables for the conversation engine.",
      
      howItWorks: [
        "Ingests MachineState (route, UI state, feature flags, session data)",
        "Analyzes PersistentState (user profile, goals, memory, budgets)", 
        "Applies deterministic rules based on current route/context",
        "Generates task hypothesis about what user is trying to accomplish",
        "Identifies available affordances (what actions make sense now)",
        "Flags potential risks (budget low, cognitive load, ambiguity)",
        "Suggests specific tools with reasoning for recommendations"
      ],
      
      interactions: [
        "↗ Feeds DerivedVars UP to Layer C (Conductor)",
        "← Receives state updates from UI interactions", 
        "↔ Triggers modal warnings when risk flags detected",
        "→ Influences conversion strip action recommendations"
      ],
      
      variables: [
        "taskHypothesis: Current best guess about user intent",
        "affordances: Available actions in this context", 
        "riskFlags: Warnings about current situation",
        "suggestedTools: Recommended tools with reasoning",
        "recap: Summary of current state and context",
        "queryPlan: Step-by-step approach (when applicable)"
      ]
    },
    
    co: {
      title: "Layer C: Conductor/Orchestrator (CO)",
      color: "indigo", 
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
      textColor: "text-indigo-900",
      badge: "bg-indigo-100 text-indigo-700",
      purpose: "The Conductor compiles policies, persona, objectives and OA insights into a dynamic system prompt that drives the conversation engine.",
      
      howItWorks: [
        "Takes DerivedVars from Layer B (Observer/Analyst)",
        "Selects appropriate objectives based on route and user goals",
        "Applies security policies and privacy constraints",
        "Filters relevant facts from user memory for current task",
        "Enforces budget limits and tool usage constraints", 
        "Compiles everything into coherent system prompt",
        "Provides context pack to drive conversation responses"
      ],
      
      interactions: [
        "↑ Receives DerivedVars FROM Layer B (Observer)",
        "↗ Feeds ContextPack DOWN to Layer A (Conversation Engine)",
        "← Updates when route changes or feature flags toggle",
        "→ Triggers budget/privacy modals when constraints violated"
      ],
      
      variables: [
        "policy: Privacy rules and behavioral guidelines",
        "persona: Communication style and approach",
        "objectives: Current goals derived from route + user state", 
        "venueNote: Context about where conversation is happening",
        "facts: Relevant memories filtered for current task",
        "constraints: Budget limits, tool gates, privacy boundaries",
        "compiledPrompt: Final system prompt sent to conversation engine"
      ]
    }
  };

  const info = layerInfo[layer];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`${info.bgColor} ${info.borderColor} border-2 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto`}>
        {/* Header */}
        <div className={`${info.badge} px-6 py-4 border-b ${info.borderColor} flex justify-between items-center`}>
          <div className="flex items-center gap-3">
            <span className={layer === 'oa' ? 'w-3 h-3 bg-amber-500 rounded-full' : 'w-3 h-3 bg-indigo-500 rounded-full'}></span>
            <h2 className={`text-xl font-bold ${info.textColor}`}>{info.title}</h2>
          </div>
          <button
            onClick={onClose}
            className={`${info.textColor} hover:opacity-75 text-2xl`}
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Purpose */}
          <div>
            <h3 className={`text-lg font-semibold ${info.textColor} mb-2`}>Purpose & Role</h3>
            <p className={`${info.textColor} opacity-90`}>{info.purpose}</p>
          </div>

          {/* How It Works */}
          <div>
            <h3 className={`text-lg font-semibold ${info.textColor} mb-3`}>How It Works</h3>
            <div className="space-y-2">
              {info.howItWorks.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className={layer === 'oa' ? 
                    'w-6 h-6 bg-amber-200 text-amber-900 rounded-full text-sm font-medium flex items-center justify-center flex-shrink-0 mt-0.5' :
                    'w-6 h-6 bg-indigo-200 text-indigo-900 rounded-full text-sm font-medium flex items-center justify-center flex-shrink-0 mt-0.5'
                  }>
                    {idx + 1}
                  </span>
                  <p className={`${info.textColor} opacity-90`}>{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* System Interactions */}
          <div>
            <h3 className={`text-lg font-semibold ${info.textColor} mb-3`}>System Interactions</h3>
            <div className="space-y-2">
              {info.interactions.map((interaction, idx) => (
                <div key={idx} className={`bg-white bg-opacity-50 rounded p-3 border ${info.borderColor}`}>
                  <p className={`${info.textColor} font-mono text-sm`}>{interaction}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Variables */}
          <div>
            <h3 className={`text-lg font-semibold ${info.textColor} mb-3`}>Key Variables & State</h3>
            <div className="grid grid-cols-1 gap-3">
              {info.variables.map((variable, idx) => {
                const [name, description] = variable.split(': ');
                return (
                  <div key={idx} className={`bg-white bg-opacity-70 rounded p-3 border ${info.borderColor}`}>
                    <div className="flex items-start gap-3">
                      <code className={`${info.textColor} font-bold text-sm`}>{name}</code>
                      <span className={`${info.textColor} opacity-75 text-sm`}>— {description}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
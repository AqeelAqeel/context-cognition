'use client';

import { DerivedVars } from '@/lib/contracts';

interface ObservationsCardProps {
  derivedVars: DerivedVars;
}

export function ObservationsCard({ derivedVars }: ObservationsCardProps) {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-amber-100 px-4 py-3 border-b border-amber-200">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
          <h3 className="text-sm font-medium text-amber-800">
            Layer B: Observer/Analyst (OA)
          </h3>
          <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-xs font-medium border border-amber-300">
            Observations
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Task Hypothesis */}
        <div>
          <h4 className="text-sm font-medium text-amber-900 mb-1">Task Hypothesis</h4>
          <p className="text-sm text-amber-800 bg-white/50 rounded px-2 py-1">
            {derivedVars.taskHypothesis}
          </p>
        </div>

        {/* Affordances */}
        {derivedVars.affordances.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-amber-900 mb-2">Available Affordances</h4>
            <div className="flex flex-wrap gap-1">
              {derivedVars.affordances.map((affordance, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs font-medium border border-amber-200"
                >
                  {affordance}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Risk Flags */}
        {derivedVars.riskFlags.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-amber-900 mb-2 flex items-center gap-1">
              <span>⚠️</span>
              Risk Flags
            </h4>
            <div className="space-y-1">
              {derivedVars.riskFlags.map((flag, idx) => (
                <div
                  key={idx}
                  className="px-2 py-1 bg-red-50 text-red-700 rounded text-xs border border-red-200"
                >
                  {flag}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Suggested Tools */}
        {derivedVars.suggestedTools.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-amber-900 mb-2">Tool Suggestions</h4>
            <div className="space-y-2">
              {derivedVars.suggestedTools.map((tool, idx) => (
                <div
                  key={idx}
                  className="bg-white/50 rounded p-2 border border-amber-200"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs">🔧</span>
                    <span className="text-sm font-medium text-amber-900">{tool.name}</span>
                  </div>
                  <p className="text-xs text-amber-700">{tool.reason}</p>
                  {tool.args && (
                    <div className="text-xs text-amber-600 mt-1 font-mono">
                      {JSON.stringify(tool.args)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recap */}
        <div>
          <h4 className="text-sm font-medium text-amber-900 mb-1">Context Recap</h4>
          <p className="text-xs text-amber-700 bg-white/50 rounded px-2 py-1 font-mono">
            {derivedVars.recap}
          </p>
        </div>

        {/* Query Plan */}
        {derivedVars.queryPlan && derivedVars.queryPlan.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-amber-900 mb-2">Query Plan</h4>
            <div className="space-y-1">
              {derivedVars.queryPlan.map((step, idx) => (
                <div
                  key={idx}
                  className="text-xs text-amber-700 bg-white/50 rounded px-2 py-1 flex items-center gap-2"
                >
                  <span className="w-4 h-4 bg-amber-200 rounded-full text-center text-xs font-medium text-amber-800">
                    {idx + 1}
                  </span>
                  {step}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
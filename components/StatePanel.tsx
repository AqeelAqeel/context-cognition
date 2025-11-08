'use client';

import { useState } from 'react';
import { MachineState, PersistentState } from '@/lib/contracts';

interface StatePanelProps {
  machineState: MachineState;
  persistentState: PersistentState;
  onFeatureFlagToggle: (flag: string, value: boolean) => void;
}

export function StatePanel({ machineState, persistentState, onFeatureFlagToggle }: StatePanelProps) {
  const [activeTab, setActiveTab] = useState<'machine' | 'persistent' | 'flags' | 'budgets' | 'memory'>('machine');

  const tabs = [
    { id: 'machine' as const, label: 'Machine' },
    { id: 'persistent' as const, label: 'Persistent' },
    { id: 'flags' as const, label: 'Flags' },
    { id: 'budgets' as const, label: 'Budgets' },
    { id: 'memory' as const, label: 'Memory' },
  ];

  const whitelistedKeys = ["route", "ui.panel", "ui.selection", "featureFlags.*", "local.lastPanel", "session.tab"];
  
  const filterWhitelisted = (obj: Record<string, unknown>, prefix = ""): Record<string, unknown> => {
    const filtered: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      const isWhitelisted = whitelistedKeys.some(pattern => {
        if (pattern.endsWith('*')) {
          return fullKey.startsWith(pattern.slice(0, -1));
        }
        return pattern === fullKey;
      });
      
      if (isWhitelisted) {
        filtered[key] = value;
      }
    }
    return filtered;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
      <div className="border-b border-slate-200">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-2 text-xs font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-slate-900 text-slate-900'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="p-3 max-h-64 overflow-y-auto">
        {activeTab === 'machine' && (
          <div className="space-y-2">
            {Object.entries(filterWhitelisted(machineState as unknown as Record<string, unknown>)).map(([key, value]) => (
              <div key={key} className="text-xs">
                <span className="font-mono text-slate-600">{key}:</span>
                <span className="ml-2 text-slate-900">
                  {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                </span>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'persistent' && (
          <div className="space-y-2">
            <div className="text-xs">
              <span className="font-mono text-slate-600">userId:</span>
              <span className="ml-2 text-slate-900">{persistentState.userId}</span>
            </div>
            <div className="text-xs">
              <span className="font-mono text-slate-600">role:</span>
              <span className="ml-2 text-slate-900">{persistentState.profile.role}</span>
            </div>
            <div className="text-xs">
              <span className="font-mono text-slate-600">venue:</span>
              <span className="ml-2 text-slate-900">{persistentState.venue.source}</span>
            </div>
          </div>
        )}
        
        {activeTab === 'flags' && (
          <div className="space-y-2">
            {Object.entries(machineState.featureFlags).map(([flag, value]) => (
              <div key={flag} className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-600">{flag}</span>
                <button
                  onClick={() => onFeatureFlagToggle(flag, !value)}
                  className={`w-8 h-4 rounded-full transition-colors ${
                    value ? 'bg-blue-500' : 'bg-slate-300'
                  }`}
                >
                  <div className={`w-3 h-3 bg-white rounded-full transition-transform ${
                    value ? 'translate-x-4' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'budgets' && (
          <div className="space-y-2">
            <div className="text-xs">
              <span className="font-mono text-slate-600">tokensLeft:</span>
              <span className={`ml-2 font-medium ${
                persistentState.budgets.tokensLeft < 2000 ? 'text-red-600' : 
                persistentState.budgets.tokensLeft < 5000 ? 'text-amber-600' : 'text-green-600'
              }`}>
                {persistentState.budgets.tokensLeft.toLocaleString()}
              </span>
            </div>
            <div className="text-xs text-slate-600">Tool Limits:</div>
            {Object.entries(persistentState.budgets.toolLimits).map(([tool, limit]) => (
              <div key={tool} className="text-xs ml-2">
                <span className="font-mono text-slate-600">{tool}:</span>
                <span className={`ml-2 ${limit <= 1 ? 'text-red-600' : 'text-slate-900'}`}>
                  {limit}
                </span>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'memory' && (
          <div className="space-y-2">
            {persistentState.memory.slice(0, 5).map((item, idx) => (
              <div key={idx} className="text-xs border-l-2 border-slate-200 pl-2">
                <div className="text-slate-500">{new Date(item.t).toLocaleTimeString()}</div>
                <div className={`font-medium ${
                  item.kind === 'fact' ? 'text-blue-600' :
                  item.kind === 'preference' ? 'text-green-600' : 'text-purple-600'
                }`}>
                  {item.kind}
                </div>
                <div className="text-slate-900">{item.v}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
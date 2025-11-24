'use client';

import { useState } from 'react';
import { interfaceLayerData } from '@/lib/playground/mockData';

interface InterfaceLayerCardProps {
  isExpanded: boolean;
}

export function InterfaceLayerCard({ isExpanded }: InterfaceLayerCardProps) {
  const [showPrompts, setShowPrompts] = useState(true);

  if (!isExpanded) return null;

  return (
    <div className="p-4 space-y-4">
      {/* Local Storage */}
      <StorageSection
        title="Local Storage"
        storage={interfaceLayerData.localStorage}
        color="#06B6D4"
      />

      {/* Session Storage */}
      <StorageSection
        title="Session Storage"
        storage={interfaceLayerData.sessionStorage}
        color="#A855F7"
      />

      {/* Inter-Session Storage */}
      <div className="p-3 border border-white/10 rounded-lg space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-white/80 text-sm font-medium">Inter-Session</span>
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                interfaceLayerData.interSessionStorage.syncStatus === 'synced'
                  ? 'bg-green-500'
                  : interfaceLayerData.interSessionStorage.syncStatus === 'pending'
                  ? 'bg-yellow-500 animate-pulse'
                  : 'bg-red-500'
              }`}
            />
            <span className="text-white/60 text-xs capitalize">
              {interfaceLayerData.interSessionStorage.syncStatus}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all"
              style={{
                width: `${(interfaceLayerData.interSessionStorage.totalSize / interfaceLayerData.interSessionStorage.maxSize) * 100}%`
              }}
            />
          </div>
          <span className="text-white/60 text-xs">
            {Math.round((interfaceLayerData.interSessionStorage.totalSize / interfaceLayerData.interSessionStorage.maxSize) * 100)}%
          </span>
        </div>
        <div className="flex items-center justify-between text-xs text-white/50">
          <span>Items: {interfaceLayerData.interSessionStorage.items.length}</span>
          <span>Last Sync: {interfaceLayerData.interSessionStorage.lastSync}</span>
        </div>
      </div>

      {/* Associated Prompts Toggle */}
      <button
        onClick={() => setShowPrompts(!showPrompts)}
        className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-all"
      >
        <svg
          className={`w-4 h-4 transition-transform ${showPrompts ? 'rotate-90' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        Associated Prompts ({interfaceLayerData.associatedPrompts.filter(p => p.isActive).length} active)
      </button>

      {/* Associated Prompts List */}
      {showPrompts && (
        <div className="p-3 bg-white/5 rounded-lg border border-white/10 space-y-2">
          {interfaceLayerData.associatedPrompts.map((prompt) => (
            <div
              key={prompt.id}
              className="flex items-center justify-between py-1"
            >
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    prompt.isActive ? 'bg-green-500' : 'bg-gray-500'
                  }`}
                />
                <span className="text-white/80 text-sm font-mono">
                  {prompt.name}
                </span>
              </div>
              <span className="text-white/50 text-xs">
                ON {prompt.trigger.condition}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StorageSection({
  title,
  storage,
  color
}: {
  title: string;
  storage: { totalSize: number; maxSize: number; items: { key: string }[] };
  color: string;
}) {
  const percentage = (storage.totalSize / storage.maxSize) * 100;

  return (
    <div className="p-3 border border-white/10 rounded-lg space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-white/80 text-sm font-medium">{title}</span>
        <span className="text-white/60 text-xs">
          {storage.totalSize.toFixed(1)}MB / {storage.maxSize}MB
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${percentage}%`,
              backgroundColor: color
            }}
          />
        </div>
        <span className="text-white/60 text-xs">
          {Math.round(percentage)}%
        </span>
      </div>
      <div className="text-xs text-white/50">
        Items: {storage.items.length} | Active Keys: {storage.items.length}
      </div>
    </div>
  );
}

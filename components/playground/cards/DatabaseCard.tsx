'use client';

import { useState } from 'react';
import { databaseData } from '@/lib/playground/mockData';
import { DatabaseBar } from '@/lib/playground/types';

interface DatabaseCardProps {
  isExpanded: boolean;
}

export function DatabaseCard({ isExpanded }: DatabaseCardProps) {
  const [selectedBar, setSelectedBar] = useState<string | null>(null);

  if (!isExpanded) return null;

  const selectedBarData = databaseData.bars.find(b => b.id === selectedBar);

  return (
    <div className="p-4 space-y-3">
      {/* Database Bars */}
      <div className="space-y-2">
        {databaseData.bars.map((bar) => (
          <DBBarRow
            key={bar.id}
            bar={bar}
            isSelected={selectedBar === bar.id}
            onClick={() => setSelectedBar(selectedBar === bar.id ? null : bar.id)}
          />
        ))}
      </div>

      {/* Selected Bar Details */}
      {selectedBarData && (
        <div className="p-3 bg-white/5 rounded-lg border border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-white font-medium text-sm">
              {selectedBarData.category}
            </span>
            <span
              className="px-2 py-0.5 rounded text-xs"
              style={{
                backgroundColor: `${selectedBarData.color}20`,
                color: selectedBarData.color
              }}
            >
              {selectedBarData.status}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-white/50">Records</span>
              <p className="text-white font-mono">{selectedBarData.recordCount.toLocaleString()}</p>
            </div>
            <div>
              <span className="text-white/50">Last Update</span>
              <p className="text-white">{selectedBarData.lastUpdated}</p>
            </div>
            <div>
              <span className="text-white/50">Fill Level</span>
              <p className="text-white">{selectedBarData.fillLevel}%</p>
            </div>
            <div>
              <span className="text-white/50">Status</span>
              <p className="text-white flex items-center gap-1">
                <span className={`w-2 h-2 rounded-full ${selectedBarData.isActive ? 'bg-green-500' : 'bg-gray-500'}`} />
                {selectedBarData.isActive ? 'Active' : 'Idle'}
              </p>
            </div>
          </div>
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
          <span>Idle</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-yellow-500" />
          <span>Warning</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-red-500" />
          <span>Error</span>
        </div>
      </div>
    </div>
  );
}

function DBBarRow({
  bar,
  isSelected,
  onClick
}: {
  bar: DatabaseBar;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-2 rounded-lg transition-all ${
        isSelected ? 'bg-white/10' : 'hover:bg-white/5'
      }`}
    >
      {/* Label */}
      <span className="text-white/70 text-xs font-mono w-32 text-left truncate">
        {bar.label}
      </span>

      {/* Bar */}
      <div className="flex-1 h-4 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${bar.fillLevel}%`,
            backgroundColor: bar.color
          }}
        />
      </div>

      {/* Percentage */}
      <span className="text-white/60 text-xs w-10 text-right">
        {bar.fillLevel}%
      </span>

      {/* Status Indicator */}
      <span
        className={`w-2 h-2 rounded-full flex-shrink-0 ${
          bar.isActive ? 'bg-green-500' : 'bg-gray-500'
        }`}
      />
    </button>
  );
}

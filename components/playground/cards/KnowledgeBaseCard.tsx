'use client';

import { knowledgeBaseData } from '@/lib/playground/mockData';

interface KnowledgeBaseCardProps {
  isExpanded: boolean;
}

export function KnowledgeBaseCard({ isExpanded }: KnowledgeBaseCardProps) {
  if (!isExpanded) return null;

  return (
    <div className="p-4 space-y-4">
      {/* Goal Progress - Level 1 */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded"
            style={{ backgroundColor: knowledgeBaseData.hierarchy[0]?.color }}
          />
          <span className="text-white/80 text-sm font-medium">
            L1: {knowledgeBaseData.hierarchy[0]?.name}
          </span>
        </div>
        <div className="p-3 bg-white/5 rounded-lg border border-white/10 space-y-2">
          {knowledgeBaseData.goalProgress.map((goal) => (
            <div key={goal.goalId} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/70 flex items-center gap-1">
                  <span>🎯</span>
                  {goal.goalName}
                </span>
                <span className="text-white/60">{goal.progress}%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all"
                  style={{ width: `${goal.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Flow Arrow */}
      <div className="flex justify-center">
        <div className="flex flex-col items-center text-white/30">
          <span className="text-xs">maps to</span>
          <svg className="w-4 h-4" viewBox="0 0 16 16">
            <path
              d="M8 2 L8 12 M4 9 L8 13 L12 9"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
        </div>
      </div>

      {/* Strategic Context - Level 2 */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded"
            style={{ backgroundColor: knowledgeBaseData.hierarchy[1]?.color }}
          />
          <span className="text-white/80 text-sm font-medium">
            L2: {knowledgeBaseData.hierarchy[1]?.name}
          </span>
        </div>
        <div className="p-3 bg-white/5 rounded-lg border border-white/10">
          <div className="grid grid-cols-2 gap-2">
            {knowledgeBaseData.hierarchy[1]?.items.map((item) => (
              <div
                key={item.id}
                className="px-2 py-1.5 bg-white/5 rounded text-xs text-white/70 flex items-center gap-1"
              >
                <span>📋</span>
                {item.content}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Flow Arrow */}
      <div className="flex justify-center">
        <div className="flex flex-col items-center text-white/30">
          <span className="text-xs">informs</span>
          <svg className="w-4 h-4" viewBox="0 0 16 16">
            <path
              d="M8 2 L8 12 M4 9 L8 13 L12 9"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
        </div>
      </div>

      {/* Real-time Updates - Level 3 */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded"
            style={{ backgroundColor: knowledgeBaseData.hierarchy[2]?.color }}
          />
          <span className="text-white/80 text-sm font-medium">
            L3: {knowledgeBaseData.hierarchy[2]?.name}
          </span>
        </div>
        <div className="p-3 bg-white/5 rounded-lg border border-white/10 space-y-2">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-yellow-400">⚡</span>
            <span className="text-white/70">
              {knowledgeBaseData.hierarchy[2]?.items.length} new data points (2s ago)
            </span>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs text-white/50">
              <span>⚡ Mapping to Goal A...</span>
              <span>40%</span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-500 rounded-full transition-all animate-pulse"
                style={{ width: '40%' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="flex items-center justify-between text-xs text-white/60 pt-2 border-t border-white/10">
        <span>
          Recent Activity: <span className="text-white">{knowledgeBaseData.recentActivity}</span> items
        </span>
        <span>
          Unmapped: <span className="text-yellow-400">{knowledgeBaseData.unmappedItems}</span> items
        </span>
      </div>
    </div>
  );
}

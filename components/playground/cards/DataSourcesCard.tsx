'use client';

import { dataSourcesData } from '@/lib/playground/mockData';

interface DataSourcesCardProps {
  isExpanded: boolean;
}

export function DataSourcesCard({ isExpanded }: DataSourcesCardProps) {
  if (!isExpanded) return null;

  return (
    <div className="p-4 space-y-4">
      {/* Sources List */}
      <div className="space-y-2">
        <span className="text-white/60 text-xs">Sources:</span>
        <div className="p-3 bg-white/5 rounded-lg border border-white/10 space-y-1">
          {dataSourcesData.sources.map((source) => (
            <div
              key={source.id}
              className="flex items-center justify-between py-1.5"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{source.icon}</span>
                <span className="text-white/80 text-sm">{source.name}</span>
                <StatusIndicator status={source.status} />
              </div>
              <div className="text-right text-xs text-white/50">
                {source.status === 'processing' ? (
                  <span className="text-yellow-400">processing...</span>
                ) : source.status === 'idle' ? (
                  <span>idle</span>
                ) : (
                  <>
                    <span>{source.inputCount} inputs</span>
                    <span className="mx-1">|</span>
                    <span>{source.lastInput}</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pipeline Status */}
      <div className="space-y-2">
        <span className="text-white/60 text-xs">Pipeline Status:</span>
        <div className="p-3 bg-white/5 rounded-lg border border-white/10">
          {/* Pipeline Stages */}
          <div className="flex items-center justify-between gap-1 mb-3">
            {dataSourcesData.pipeline.stages.map((stage, idx) => (
              <div key={stage.id} className="flex items-center gap-1">
                <div className="text-center">
                  <div
                    className={`px-2 py-1 rounded text-xs font-mono ${
                      stage.status === 'complete'
                        ? 'bg-green-500/20 text-green-400'
                        : stage.status === 'processing'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-white/10 text-white/40'
                    }`}
                  >
                    {stage.name}
                  </div>
                  <div className="mt-1">
                    <StatusDot status={stage.status} />
                  </div>
                  <div className="text-[10px] text-white/40 mt-0.5">
                    {stage.itemsProcessed}/{stage.totalItems}
                  </div>
                </div>
                {idx < dataSourcesData.pipeline.stages.length - 1 && (
                  <svg className="w-4 h-3 text-white/20 flex-shrink-0" viewBox="0 0 16 12">
                    <path
                      d="M2 6 L12 6 M9 3 L12 6 L9 9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                    />
                  </svg>
                )}
              </div>
            ))}
          </div>

          {/* Overall Progress */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-white/50">
              <span>Overall Progress</span>
              <span>
                {Math.round(
                  (dataSourcesData.pipeline.stages.filter(s => s.status === 'complete').length /
                    dataSourcesData.pipeline.stages.length) *
                    100
                )}
                %
              </span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-green-500 rounded-full transition-all"
                style={{
                  width: `${
                    (dataSourcesData.pipeline.stages.filter(s => s.status === 'complete').length /
                      dataSourcesData.pipeline.stages.length) *
                    100
                  }%`
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="flex items-center justify-between text-xs text-white/60 pt-2 border-t border-white/10">
        <span>
          Throughput: <span className="text-white">{dataSourcesData.throughput}</span> items/min
        </span>
        <span>
          Backlog: <span className="text-white">{dataSourcesData.backlog}</span> items
        </span>
      </div>
    </div>
  );
}

function StatusIndicator({ status }: { status: string }) {
  const colors = {
    active: 'bg-green-500',
    idle: 'bg-gray-500',
    processing: 'bg-yellow-500 animate-pulse',
    error: 'bg-red-500'
  };

  return (
    <span
      className={`w-2 h-2 rounded-full ${colors[status as keyof typeof colors] || 'bg-gray-500'}`}
    />
  );
}

function StatusDot({ status }: { status: string }) {
  const colors = {
    complete: 'bg-green-500',
    processing: 'bg-yellow-500 animate-pulse',
    idle: 'bg-gray-500',
    error: 'bg-red-500'
  };

  return (
    <span
      className={`inline-block w-2 h-2 rounded-full ${
        colors[status as keyof typeof colors] || 'bg-gray-500'
      }`}
    />
  );
}

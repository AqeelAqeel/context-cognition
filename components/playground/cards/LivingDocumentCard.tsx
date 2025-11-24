'use client';

import { livingDocumentsData } from '@/lib/playground/mockData';

interface LivingDocumentCardProps {
  isExpanded: boolean;
}

export function LivingDocumentCard({ isExpanded }: LivingDocumentCardProps) {
  if (!isExpanded) return null;

  return (
    <div className="p-4 space-y-4">
      {/* Active Documents */}
      <div className="space-y-2">
        <span className="text-white/60 text-xs">Active Documents:</span>
        <div className="p-3 bg-white/5 rounded-lg border border-white/10 space-y-2">
          {livingDocumentsData.documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between py-1"
            >
              <div className="flex items-center gap-2">
                <span>📄</span>
                <span className="text-white/80 text-sm">{doc.name}</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span
                  className={`flex items-center gap-1 ${
                    doc.status === 'live'
                      ? 'text-green-400'
                      : doc.status === 'syncing'
                      ? 'text-yellow-400'
                      : 'text-white/40'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      doc.status === 'live'
                        ? 'bg-green-500'
                        : doc.status === 'syncing'
                        ? 'bg-yellow-500 animate-pulse'
                        : 'bg-gray-500'
                    }`}
                  />
                  {doc.status === 'live' ? 'Live' : doc.status === 'syncing' ? 'Sync' : 'Stale'}
                </span>
                <span className="text-white/40">|</span>
                <span className="text-white/50">Updated {doc.lastUpdated}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Definition Status */}
      <div className="space-y-2">
        <span className="text-white/60 text-xs">Definition Status:</span>
        <div className="p-3 bg-white/5 rounded-lg border border-white/10">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-white/50">
                <th className="text-left pb-2">Item</th>
                <th className="text-center pb-2 w-16">Defined</th>
                <th className="text-center pb-2 w-20">Being Done</th>
              </tr>
            </thead>
            <tbody className="text-white/70">
              {livingDocumentsData.statusTrackers.map((tracker) => (
                <tr key={tracker.id} className="border-t border-white/5">
                  <td className="py-1.5">{tracker.entityName}</td>
                  <td className="text-center">
                    <StatusIcon value={tracker.isDefined} />
                  </td>
                  <td className="text-center">
                    <StatusIcon value={tracker.isBeingDone} partial={!tracker.isDefined} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Propagation */}
      <div className="space-y-2">
        <span className="text-white/60 text-xs">Action Propagation:</span>
        <div className="p-3 bg-white/5 rounded-lg border border-white/10 space-y-2">
          {livingDocumentsData.actionPropagation.map((action) => (
            <div key={action.actionId} className="space-y-1">
              <div className="flex items-center text-xs text-white/70">
                <span>Task: &quot;{action.actionName}&quot;</span>
                <span className="mx-2 text-white/30">→</span>
                <span>{action.sourceLevel}</span>
                <span className="mx-2 text-white/30">→</span>
                <span>{action.targetGoal}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      action.status === 'propagating'
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-500 animate-pulse'
                        : 'bg-green-500'
                    }`}
                    style={{ width: `${action.progress}%` }}
                  />
                </div>
                <span className="text-xs text-white/50">
                  {action.status === 'propagating' ? 'Propagating' : 'Complete'} ({action.progress}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="flex items-center justify-between text-xs text-white/60 pt-2 border-t border-white/10">
        <span>
          Clarity Score: <span className="text-white">{livingDocumentsData.clarityScore}%</span>
        </span>
        <span>
          Items Defined:{' '}
          <span className="text-white">
            {livingDocumentsData.definedItems}/{livingDocumentsData.totalItems}
          </span>
        </span>
      </div>
    </div>
  );
}

function StatusIcon({ value, partial = false }: { value: boolean; partial?: boolean }) {
  if (value) {
    return <span className="text-green-400">✓</span>;
  }
  if (partial) {
    return <span className="text-yellow-400">◐</span>;
  }
  return <span className="text-white/30">✗</span>;
}

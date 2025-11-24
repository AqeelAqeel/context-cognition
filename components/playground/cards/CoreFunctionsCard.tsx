'use client';

import { coreFunctionsData } from '@/lib/playground/mockData';
import { CoreFunction } from '@/lib/playground/types';

interface CoreFunctionsCardProps {
  isExpanded: boolean;
}

export function CoreFunctionsCard({ isExpanded }: CoreFunctionsCardProps) {
  if (!isExpanded) return null;

  return (
    <div className="p-4 space-y-4">
      {coreFunctionsData.functions.map((func) => (
        <FunctionSection key={func.id} func={func} />
      ))}
    </div>
  );
}

function FunctionSection({ func }: { func: CoreFunction }) {
  return (
    <div className="p-3 border border-white/10 rounded-lg space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-white/90 text-sm font-medium">{func.name}</span>
        <span
          className={`w-2 h-2 rounded-full ${
            func.isActive ? 'bg-green-500' : 'bg-gray-500'
          }`}
        />
      </div>

      {/* Visualization */}
      <div className="flex items-center gap-4">
        <FunctionVisualization type={func.visualType} intensity={func.intensity} />
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-white/50">Intensity</span>
            <span className="text-white/80">{func.intensity}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all"
              style={{ width: `${func.intensity}%` }}
            />
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-2 text-xs">
        {func.metrics.map((metric, idx) => (
          <div key={idx} className="space-y-0.5">
            <span className="text-white/50 block truncate">{metric.name}</span>
            <div className="flex items-center gap-1">
              <span className="text-white font-medium">
                {metric.value}
                {metric.unit === '%' ? '%' : ''}
              </span>
              {metric.unit !== '%' && (
                <span className="text-white/40">{metric.unit}</span>
              )}
              <TrendIcon trend={metric.trend} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FunctionVisualization({
  type,
  intensity
}: {
  type: 'loop' | 'arrow' | 'funnel' | 'web';
  intensity: number;
}) {
  const size = 50;

  switch (type) {
    case 'loop':
      return (
        <svg width={size} height={size} viewBox="0 0 50 50" className="flex-shrink-0">
          <circle
            cx="25"
            cy="25"
            r="18"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="4"
          />
          <circle
            cx="25"
            cy="25"
            r="18"
            fill="none"
            stroke="url(#loopGrad)"
            strokeWidth="4"
            strokeDasharray={`${(intensity / 100) * 113} 113`}
            strokeLinecap="round"
            transform="rotate(-90 25 25)"
          />
          <path
            d="M35 15 L40 25 L30 25"
            fill="none"
            stroke="rgba(6,182,212,0.8)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="loopGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'arrow':
      return (
        <svg width={size} height={size} viewBox="0 0 50 50" className="flex-shrink-0">
          {/* Track */}
          <rect
            x="5"
            y="22"
            width="40"
            height="6"
            rx="3"
            fill="rgba(255,255,255,0.1)"
          />
          {/* Progress */}
          <rect
            x="5"
            y="22"
            width={40 * (intensity / 100)}
            height="6"
            rx="3"
            fill="url(#arrowGrad)"
          />
          {/* Steps */}
          {[0, 1, 2, 3].map((i) => (
            <circle
              key={i}
              cx={10 + i * 10}
              cy="25"
              r="4"
              fill={i <= (intensity / 100) * 3 ? '#22C55E' : 'rgba(255,255,255,0.2)'}
            />
          ))}
          {/* Arrow */}
          <path
            d="M40 25 L48 25 M44 21 L48 25 L44 29"
            stroke="rgba(34,197,94,0.8)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="arrowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#22C55E" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'funnel':
      return (
        <svg width={size} height={size} viewBox="0 0 50 50" className="flex-shrink-0">
          {/* Funnel outline */}
          <path
            d="M5 8 L45 8 L32 42 L18 42 Z"
            fill="rgba(255,255,255,0.05)"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1"
          />
          {/* Fill based on intensity */}
          <path
            d={`M${5 + (40 * (100 - intensity)) / 200} ${8 + (34 * (100 - intensity)) / 100}
                L${45 - (40 * (100 - intensity)) / 200} ${8 + (34 * (100 - intensity)) / 100}
                L32 42 L18 42 Z`}
            fill="url(#funnelGrad)"
          />
          {/* Labels */}
          <text x="25" y="6" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="6">
            Abstract
          </text>
          <text x="25" y="48" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="6">
            Concrete
          </text>
          <defs>
            <linearGradient id="funnelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#EC4899" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'web':
      return (
        <svg width={size} height={size} viewBox="0 0 50 50" className="flex-shrink-0">
          {/* Outer connections */}
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const angle = (i * 60 * Math.PI) / 180;
            const x = 25 + 18 * Math.cos(angle);
            const y = 25 + 18 * Math.sin(angle);
            return (
              <g key={i}>
                <line
                  x1="25"
                  y1="25"
                  x2={x}
                  y2={y}
                  stroke={i < (intensity / 100) * 6 ? 'rgba(99,102,241,0.6)' : 'rgba(255,255,255,0.1)'}
                  strokeWidth="1"
                />
                <circle
                  cx={x}
                  cy={y}
                  r="3"
                  fill={i < (intensity / 100) * 6 ? '#6366F1' : 'rgba(255,255,255,0.2)'}
                />
              </g>
            );
          })}
          {/* Center */}
          <circle cx="25" cy="25" r="5" fill="#6366F1" />
          {/* Cross connections */}
          {[0, 2, 4].map((i) => {
            const angle1 = (i * 60 * Math.PI) / 180;
            const angle2 = ((i + 1) * 60 * Math.PI) / 180;
            const x1 = 25 + 18 * Math.cos(angle1);
            const y1 = 25 + 18 * Math.sin(angle1);
            const x2 = 25 + 18 * Math.cos(angle2);
            const y2 = 25 + 18 * Math.sin(angle2);
            return (
              <line
                key={`c${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={intensity > 50 ? 'rgba(99,102,241,0.3)' : 'rgba(255,255,255,0.05)'}
                strokeWidth="1"
              />
            );
          })}
        </svg>
      );

    default:
      return null;
  }
}

function TrendIcon({ trend }: { trend: 'up' | 'down' | 'stable' }) {
  switch (trend) {
    case 'up':
      return <span className="text-green-400 text-[10px]">↑</span>;
    case 'down':
      return <span className="text-red-400 text-[10px]">↓</span>;
    default:
      return <span className="text-white/30 text-[10px]">→</span>;
  }
}

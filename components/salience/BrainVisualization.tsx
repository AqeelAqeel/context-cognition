'use client';

export function BrainVisualization() {
  const dataSources = [
    { label: 'Coordination Work Platform', position: 'top-left', color: 'from-purple-400 to-pink-400', x: 100, y: 100 },
    { label: 'Project Management Tools', position: 'top-right', color: 'from-blue-400 to-cyan-400', x: 700, y: 100 },
    { label: 'Customer Usage & Metrics', position: 'right', color: 'from-green-400 to-emerald-400', x: 750, y: 300 },
    { label: 'First-Time User Flow', position: 'bottom-right', color: 'from-orange-400 to-red-400', x: 700, y: 500 },
    { label: 'Market Communications', position: 'bottom-left', color: 'from-yellow-400 to-orange-400', x: 100, y: 500 },
    { label: 'Customer Needs & Usage', position: 'left', color: 'from-indigo-400 to-purple-400', x: 50, y: 300 },
  ];

  // Create S-curved path from source to center
  const createPath = (x: number, y: number, centerX: number, centerY: number) => {
    const dx = centerX - x;
    const dy = centerY - y;
    const controlX1 = x + dx * 0.5;
    const controlY1 = y;
    const controlX2 = x + dx * 0.5;
    const controlY2 = centerY;

    return `M ${x} ${y} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${centerX} ${centerY}`;
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative py-20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 text-shadow-elegant">
            <span className="bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent">
              The Organizational Brain
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
            Salience synthesizes data from across your organization into actionable intelligence
          </p>
        </div>

        {/* Brain visualization container */}
        <div className="relative max-w-6xl mx-auto h-[600px] flex items-center justify-center">

          {/* SVG layer for connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 600">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(139, 92, 246, 0.6)" />
                <stop offset="100%" stopColor="rgba(59, 130, 246, 0.6)" />
              </linearGradient>
            </defs>

            {/* S-curved dotted lines */}
            {dataSources.map((source, idx) => (
              <g key={idx}>
                <path
                  d={createPath(source.x, source.y, 400, 300)}
                  stroke="url(#lineGradient)"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="8 6"
                  opacity="0.5"
                />
                {/* Animated dots along path */}
                <circle r="4" fill="rgba(139, 92, 246, 0.8)">
                  <animateMotion
                    dur={`${3 + idx * 0.5}s`}
                    repeatCount="indefinite"
                    path={createPath(source.x, source.y, 400, 300)}
                  />
                </circle>
              </g>
            ))}
          </svg>

          {/* Central brain/engine */}
          <div className="relative z-10" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <div className="w-64 h-64 rounded-full gradient-rainbow opacity-40 blur-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <div className="relative w-48 h-48 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500 flex items-center justify-center shadow-2xl animate-pulse-subtle">
              <div className="text-center">
                <div className="text-6xl mb-2">🧠</div>
                <div className="text-xs font-semibold text-white">Salience</div>
                <div className="text-xs text-gray-200">Engine</div>
              </div>
            </div>
          </div>

          {/* Data source nodes */}
          {dataSources.map((source, idx) => {
            const positions = {
              'top-left': 'top-8 left-8',
              'top-right': 'top-8 right-8',
              'right': 'top-1/2 right-8 -translate-y-1/2',
              'bottom-right': 'bottom-8 right-8',
              'bottom-left': 'bottom-8 left-8',
              'left': 'top-1/2 left-8 -translate-y-1/2',
            };

            return (
              <div
                key={idx}
                className={`absolute ${positions[source.position as keyof typeof positions]} animate-float z-20`}
                style={{ animationDelay: `${idx * 0.5}s` }}
              >
                <div className={`bg-gradient-to-br ${source.color} p-4 rounded-xl shadow-lg max-w-[180px] backdrop-blur-sm bg-opacity-30 border border-white/20`}>
                  <p className="text-sm font-semibold text-white text-center">{source.label}</p>
                </div>
              </div>
            );
          })}

          {/* Synapses firing effect - clearer dots */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 bg-cyan-400 rounded-full animate-ping"
                style={{
                  top: `${20 + Math.random() * 60}%`,
                  left: `${20 + Math.random() * 60}%`,
                  animationDelay: `${i * 0.5}s`,
                  opacity: 0.8,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

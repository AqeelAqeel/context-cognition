'use client';

export function BrainVisualization() {
  const dataSources = [
    { label: 'Coordination Work Platform', position: 'top-left', color: 'from-purple-400 to-pink-400' },
    { label: 'Project Management Tools', position: 'top-right', color: 'from-blue-400 to-cyan-400' },
    { label: 'Customer Usage & Metrics', position: 'right', color: 'from-green-400 to-emerald-400' },
    { label: 'First-Time User Flow', position: 'bottom-right', color: 'from-orange-400 to-red-400' },
    { label: 'Market Communications', position: 'bottom-left', color: 'from-yellow-400 to-orange-400' },
    { label: 'Customer Needs & Usage', position: 'left', color: 'from-indigo-400 to-purple-400' },
  ];

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

          {/* Central brain/engine */}
          <div className="relative z-10">
            <div className="w-64 h-64 rounded-full gradient-rainbow opacity-80 blur-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
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
                className={`absolute ${positions[source.position as keyof typeof positions]} animate-float`}
                style={{ animationDelay: `${idx * 0.5}s` }}
              >
                {/* Connection line to center */}
                <svg className="absolute top-1/2 left-1/2 w-48 h-48 -z-10 opacity-30" style={{
                  transform: 'translate(-50%, -50%)',
                }}>
                  <line
                    x1="50%"
                    y1="50%"
                    x2={source.position.includes('left') ? '100%' : source.position.includes('right') ? '0%' : '50%'}
                    y2={source.position.includes('top') ? '100%' : source.position.includes('bottom') ? '0%' : '50%'}
                    stroke="url(#gradient)"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />
                  <defs>
                    <linearGradient id="gradient">
                      <stop offset="0%" stopColor="rgba(139, 92, 246, 0.5)" />
                      <stop offset="100%" stopColor="rgba(59, 130, 246, 0.5)" />
                    </linearGradient>
                  </defs>
                </svg>

                <div className={`bg-gradient-to-br ${source.color} p-4 rounded-xl shadow-lg max-w-[180px] backdrop-blur-sm bg-opacity-20`}>
                  <p className="text-sm font-semibold text-white text-center">{source.label}</p>
                </div>
              </div>
            );
          })}

          {/* Synapses firing effect */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-blue-400 rounded-full animate-ping"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.7}s`,
                  opacity: 0.6,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

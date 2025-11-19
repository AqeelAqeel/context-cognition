'use client';

export function OrganizationalFlowDiagram() {
  const dataSources = [
    { name: 'Slack', color: 'from-purple-500 to-pink-500', x: 100, y: 50 },
    { name: 'Jira', color: 'from-blue-500 to-cyan-500', x: 250, y: 50 },
    { name: 'Notion', color: 'from-green-500 to-emerald-500', x: 400, y: 50 },
    { name: 'GitHub', color: 'from-orange-500 to-red-500', x: 550, y: 50 },
  ];

  const interactionLayers = [
    { name: 'AI Note Takers', icon: '📝', color: 'from-purple-400 to-purple-600', x: 100, y: 180 },
    { name: 'Email & Comms', icon: '📧', color: 'from-blue-400 to-blue-600', x: 300, y: 180 },
    { name: 'Chat Systems', icon: '💬', color: 'from-cyan-400 to-cyan-600', x: 500, y: 180 },
  ];

  const feedbackPipeline = [
    { name: 'Usage Log Data', icon: '📊', color: 'from-green-400 to-green-600', x: 100, y: 450 },
    { name: 'Telemetry', icon: '📡', color: 'from-yellow-400 to-yellow-600', x: 300, y: 450 },
    { name: 'User Feedback', icon: '💬', color: 'from-orange-400 to-orange-600', x: 500, y: 450 },
  ];

  const decisionFlow = [
    { name: 'Discuss', icon: '🗣️', color: 'from-purple-500 to-pink-500' },
    { name: 'Deliberate', icon: '🤔', color: 'from-blue-500 to-cyan-500' },
    { name: 'Decide', icon: '✅', color: 'from-green-500 to-emerald-500' },
    { name: 'Execute', icon: '⚡', color: 'from-orange-500 to-red-500' },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-700">
      <h3 className="text-3xl font-bold text-white mb-8 text-center">
        Organizational Intelligence Flow
      </h3>

      <div className="relative h-[700px]">
        {/* SVG Layer for Connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 700 700">
          <defs>
            <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(139, 92, 246, 0.5)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0.5)" />
            </linearGradient>
          </defs>

          {/* Lines from data sources to interaction layer */}
          {dataSources.map((source, idx) => (
            <line
              key={`source-${idx}`}
              x1={source.x + 50}
              y1={source.y + 40}
              x2={interactionLayers[idx % interactionLayers.length].x + 60}
              y2={interactionLayers[idx % interactionLayers.length].y}
              stroke="url(#lineGrad1)"
              strokeWidth="2"
              strokeDasharray="6 4"
              opacity="0.4"
            />
          ))}

          {/* Lines from interaction layers to brain */}
          {interactionLayers.map((layer, idx) => (
            <line
              key={`inter-${idx}`}
              x1={layer.x + 60}
              y1={layer.y + 50}
              x2={350}
              y2={300}
              stroke="url(#lineGrad1)"
              strokeWidth="2"
              strokeDasharray="6 4"
              opacity="0.5"
            />
          ))}

          {/* Lines from brain to feedback pipeline */}
          {feedbackPipeline.map((feedback, idx) => (
            <line
              key={`feedback-${idx}`}
              x1={350}
              y1={350}
              x2={feedback.x + 60}
              y2={feedback.y}
              stroke="url(#lineGrad1)"
              strokeWidth="2"
              strokeDasharray="6 4"
              opacity="0.5"
            />
          ))}

          {/* Lines from analysis to decision flow */}
          <line x1={350} y1={350} x2={550} y2={300} stroke="url(#lineGrad1)" strokeWidth="2" strokeDasharray="6 4" opacity="0.5" />
        </svg>

        {/* Top Layer: Database Sources */}
        <div className="absolute top-0 left-0 right-0">
          <div className="text-center mb-4">
            <span className="text-sm font-semibold text-gray-400 bg-gray-800 px-4 py-1 rounded-full">
              Database Layer
            </span>
          </div>
          <div className="grid grid-cols-4 gap-4 max-w-4xl mx-auto">
            {dataSources.map((source, idx) => (
              <div
                key={idx}
                className={`bg-gradient-to-r ${source.color} p-3 rounded-lg text-center text-white text-sm font-semibold shadow-lg`}
              >
                {source.name}
              </div>
            ))}
          </div>
        </div>

        {/* Second Layer: Interaction Layers */}
        <div className="absolute top-32 left-0 right-0">
          <div className="text-center mb-4">
            <span className="text-sm font-semibold text-gray-400 bg-gray-800 px-4 py-1 rounded-full">
              Organization Communication
            </span>
          </div>
          <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
            {interactionLayers.map((layer, idx) => (
              <div
                key={idx}
                className={`bg-gradient-to-r ${layer.color} p-4 rounded-xl text-center shadow-lg border border-white/20`}
              >
                <div className="text-3xl mb-2">{layer.icon}</div>
                <div className="text-white text-sm font-semibold">{layer.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Center: Brain Engine */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="w-32 h-32 rounded-full gradient-rainbow opacity-30 blur-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse-subtle" />
          <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500 flex items-center justify-center shadow-2xl">
            <div className="text-center">
              <div className="text-5xl">🧠</div>
            </div>
          </div>
          <div className="text-center mt-3">
            <div className="text-xs font-semibold text-white bg-gray-900 px-3 py-1 rounded-full">
              Salience Engine
            </div>
            <div className="text-xs text-gray-400 mt-1">Analyzing & Learning</div>
          </div>
        </div>

        {/* Bottom Left: Feedback Pipeline */}
        <div className="absolute bottom-20 left-0">
          <div className="text-center mb-4">
            <span className="text-sm font-semibold text-gray-400 bg-gray-800 px-4 py-1 rounded-full">
              Feedback & Telemetry
            </span>
          </div>
          <div className="grid grid-cols-3 gap-4 max-w-3xl">
            {feedbackPipeline.map((feedback, idx) => (
              <div
                key={idx}
                className={`bg-gradient-to-r ${feedback.color} p-4 rounded-xl text-center shadow-lg border border-white/20`}
              >
                <div className="text-3xl mb-2">{feedback.icon}</div>
                <div className="text-white text-xs font-semibold">{feedback.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Analysis & Insights */}
        <div className="absolute top-32 right-0 w-40">
          <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 p-4 rounded-xl border border-indigo-500/30">
            <div className="text-lg mb-2">🔍</div>
            <div className="text-xs font-semibold text-white mb-2">Analysis & Insights</div>
            <div className="text-xs text-gray-300 space-y-1">
              <div>• Find patterns</div>
              <div>• Identify gaps</div>
              <div>• Suggest experiments</div>
            </div>
          </div>
        </div>

        {/* Right Side: Experiment Recommendations */}
        <div className="absolute top-64 right-0 w-40">
          <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 p-4 rounded-xl border border-blue-500/30">
            <div className="text-lg mb-2">🔬</div>
            <div className="text-xs font-semibold text-white mb-2">Experiments</div>
            <div className="text-xs text-gray-300 space-y-1">
              <div>• A/B tests</div>
              <div>• Feature flags</div>
              <div>• Metrics tracking</div>
            </div>
          </div>
        </div>

        {/* Bottom Right: Decision Flow */}
        <div className="absolute bottom-0 right-0">
          <div className="text-center mb-4">
            <span className="text-sm font-semibold text-gray-400 bg-gray-800 px-4 py-1 rounded-full">
              Decision Flow
            </span>
          </div>
          <div className="flex gap-3">
            {decisionFlow.map((step, idx) => (
              <div key={idx} className="relative">
                <div className={`bg-gradient-to-r ${step.color} p-3 rounded-xl text-center shadow-lg border border-white/20 w-24`}>
                  <div className="text-2xl mb-1">{step.icon}</div>
                  <div className="text-white text-xs font-semibold">{step.name}</div>
                </div>
                {idx < decisionFlow.length - 1 && (
                  <div className="absolute top-1/2 -right-3 -translate-y-1/2 text-gray-500 text-xl">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Goals & Constraints Box */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-64">
          <div className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 p-4 rounded-xl border border-green-500/30">
            <div className="text-lg mb-2 text-center">🎯</div>
            <div className="text-xs font-semibold text-white mb-2 text-center">Organizational Goals</div>
            <div className="text-xs text-gray-300 space-y-1">
              <div>• Strategy alignment</div>
              <div>• Budget constraints</div>
              <div>• Timeline targets</div>
              <div>• Risk tolerance</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

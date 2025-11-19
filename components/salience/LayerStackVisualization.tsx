'use client';

import { useState, useEffect } from 'react';

export function LayerStackVisualization() {
  const [fillLevels, setFillLevels] = useState([0, 0, 0, 0, 0, 0]);

  const layers = [
    { name: 'Communication', icon: '💬', color: 'from-blue-400 to-cyan-400' },
    { name: 'Memory', icon: '🧠', color: 'from-purple-400 to-pink-400' },
    { name: 'Strategy', icon: '🎯', color: 'from-green-400 to-emerald-400' },
    { name: 'Experiment', icon: '🔬', color: 'from-orange-400 to-red-400' },
    { name: 'Execution', icon: '⚡', color: 'from-yellow-400 to-orange-400' },
    { name: 'Learning', icon: '📊', color: 'from-indigo-400 to-purple-400' },
  ];

  useEffect(() => {
    // Simulate layers filling up over time
    const interval = setInterval(() => {
      setFillLevels(prev =>
        prev.map((level, idx) => {
          const target = 40 + Math.random() * 60; // Random fill between 40-100%
          return level < target ? Math.min(level + 2, target) : level;
        })
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative py-20 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Left side: Layer stack */}
          <div className="space-y-4">
            <h3 className="text-3xl font-bold text-gray-200 mb-8 text-shadow-elegant">
              Your brain naturally builds a stack
            </h3>

            {layers.map((layer, idx) => (
              <div
                key={idx}
                className="relative"
                style={{ animationDelay: `${idx * 0.2}s` }}
              >
                {/* Vial/bucket container */}
                <div className="relative bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 shadow-xl overflow-hidden">

                  {/* Fill level */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 bg-gradient-to-r ${layer.color} opacity-20 transition-all duration-500 ease-out`}
                    style={{ height: `${fillLevels[idx]}%` }}
                  />

                  {/* Content */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{layer.icon}</span>
                      <div>
                        <h4 className="text-xl font-semibold text-white">{layer.name}</h4>
                        <p className="text-sm text-gray-400">Layer {idx + 1}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">{Math.round(fillLevels[idx])}%</div>
                      <div className="text-xs text-gray-400">Active</div>
                    </div>
                  </div>
                </div>

                {/* Pipeline connector */}
                {idx < layers.length - 1 && (
                  <div className="flex justify-center my-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" className="text-gray-600">
                      <path d="M12 4v16m0 0l-4-4m4 4l4-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right side: Description */}
          <div className="space-y-8">
            <div>
              <h3 className="text-4xl md:text-5xl font-bold mb-6 text-shadow-elegant">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Layered Intelligence
                </span>
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Salience builds a working memory that understands decisions, tasks, context,
                and the direction your organization is already moving toward.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                It anchors to your org's strategy, roadmap, experiments, and milestones.
                Every suggestion or nudge comes from what your company already defined as success.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                The content gets indexed, analyzed, and transformed into actionable insights
                that flow through each layer, creating a comprehensive organizational brain.
              </p>
            </div>

            {/* Visual indicator of flow */}
            <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl border border-gray-700">
              <div className="text-4xl">🔄</div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-1">Continuous Learning</h4>
                <p className="text-sm text-gray-400">
                  Data flows in, insights flow out, creating an oscillating feedback loop
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useState, useEffect } from 'react';

interface DataBrick {
  id: number;
  type: string;
  content: string;
  color: string;
  timestamp: number;
}

export function DynamicDBWall() {
  const [bricks, setBricks] = useState<DataBrick[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  const brickTypes = [
    { type: 'slack_msg', label: 'Slack', color: 'from-purple-500 to-purple-700', icon: '💬' },
    { type: 'ticket', label: 'Ticket', color: 'from-blue-500 to-blue-700', icon: '🎫' },
    { type: 'doc', label: 'Doc', color: 'from-green-500 to-green-700', icon: '📄' },
    { type: 'meeting', label: 'Meeting', color: 'from-orange-500 to-orange-700', icon: '📅' },
    { type: 'metric', label: 'Metric', color: 'from-pink-500 to-pink-700', icon: '📊' },
    { type: 'decision', label: 'Decision', color: 'from-cyan-500 to-cyan-700', icon: '✅' },
  ];

  useEffect(() => {
    // Simulate new data being added to the wall
    const interval = setInterval(() => {
      const randomType = brickTypes[Math.floor(Math.random() * brickTypes.length)];
      const newBrick: DataBrick = {
        id: Date.now(),
        type: randomType.type,
        content: randomType.label,
        color: randomType.color,
        timestamp: Date.now(),
      };

      setBricks(prev => {
        const updated = [...prev, newBrick];
        // Keep only last 50 bricks
        return updated.slice(-50);
      });
      setTotalCount(prev => prev + 1);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative py-20 bg-black">
      <div className="container mx-auto px-6 md:px-12">

        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-shadow-elegant">
            <span className="bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
              Building Your Knowledge Base
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Every piece of organizational data becomes part of your living memory
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-8 mb-12">
            <div className="text-center">
              <div className="text-4xl font-bold gradient-rainbow bg-clip-text text-transparent">{totalCount}</div>
              <div className="text-sm text-gray-500">Total Items Indexed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400">{bricks.length}</div>
              <div className="text-sm text-gray-500">Recent Items</div>
            </div>
          </div>
        </div>

        {/* The Wall */}
        <div className="max-w-6xl mx-auto bg-gradient-to-b from-gray-900 to-black rounded-2xl p-8 border border-gray-800 min-h-[500px]">

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {brickTypes.map((type, idx) => (
              <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg border border-gray-700">
                <span className="text-xl">{type.icon}</span>
                <span className="text-sm text-gray-300">{type.label}</span>
              </div>
            ))}
          </div>

          {/* Brick Wall Grid */}
          <div className="grid grid-cols-8 md:grid-cols-12 gap-2">
            {bricks.map((brick, idx) => {
              const typeInfo = brickTypes.find(t => t.type === brick.type) || brickTypes[0];
              const age = Date.now() - brick.timestamp;
              const opacity = Math.max(0.3, 1 - age / 40000); // Fade over 40 seconds

              return (
                <div
                  key={brick.id}
                  className={`aspect-square rounded bg-gradient-to-br ${brick.color} flex items-center justify-center text-xs font-bold text-white shadow-lg transform hover:scale-110 transition-all duration-300 cursor-pointer`}
                  style={{
                    opacity,
                    animation: `fadeInScale 0.3s ease-out ${idx * 0.01}s both`,
                  }}
                  title={`${typeInfo.label} - ${new Date(brick.timestamp).toLocaleTimeString()}`}
                >
                  <span className="text-lg">{typeInfo.icon}</span>
                </div>
              );
            })}

            {/* Empty placeholders */}
            {[...Array(Math.max(0, 96 - bricks.length))].map((_, idx) => (
              <div
                key={`empty-${idx}`}
                className="aspect-square rounded bg-gray-800/30 border border-gray-700/30"
              />
            ))}
          </div>

          {/* Processing indicator */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gray-800 rounded-full border border-gray-700">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-gray-300">Continuously indexing and learning...</span>
            </div>
          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
}

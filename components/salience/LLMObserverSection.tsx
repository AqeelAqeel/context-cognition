'use client';

import { useState } from 'react';

export function LLMObserverSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedVariable, setSelectedVariable] = useState<number | null>(null);

  const tabs = [
    { name: 'Product Manager', icon: '📊', role: 'PM' },
    { name: 'Designer', icon: '🎨', role: 'Designer' },
    { name: 'Engineer', icon: '⚙️', role: 'Engineer' },
  ];

  const conversations = [
    {
      role: 'Product Manager',
      messages: [
        { sender: 'PM', text: 'We need to prioritize the mobile onboarding flow for Q1', highlighted: ['mobile onboarding', 'Q1'] },
        { sender: 'Salience', text: 'Based on your roadmap and current DAU metrics, I recommend focusing on the first-time user experience. The A/B test shows 23% drop-off at step 2.', highlighted: ['roadmap', 'DAU metrics', 'first-time user', 'A/B test', '23% drop-off'] },
        { sender: 'PM', text: 'What are the resource constraints?', highlighted: ['resource constraints'] },
        { sender: 'Salience', text: 'You have 2 engineers allocated, $50k budget remaining, and 6 weeks until launch.', highlighted: ['2 engineers', '$50k budget', '6 weeks'] },
      ],
      variables: ['Organizational Heuristics', 'User Intent', 'Technical Context']
    },
    {
      role: 'Designer',
      messages: [
        { sender: 'Designer', text: 'The new dashboard feels cluttered. How do we simplify without losing functionality?', highlighted: ['dashboard', 'cluttered', 'simplify'] },
        { sender: 'Salience', text: 'Your user research shows 68% of users only use 3 core features. I can help prioritize the interface based on actual usage patterns and your design system.', highlighted: ['user research', '68%', '3 core features', 'usage patterns', 'design system'] },
        { sender: 'Designer', text: 'Show me the top 3 features by engagement', highlighted: ['top 3 features', 'engagement'] },
        { sender: 'Salience', text: '1. Analytics view (89% weekly), 2. Export reports (72% weekly), 3. Team collaboration (64% weekly)', highlighted: ['Analytics', 'Export', 'Team collaboration'] },
      ],
      variables: ['Personalization', 'User Intent', 'Organizational Heuristics']
    },
    {
      role: 'Engineer',
      messages: [
        { sender: 'Engineer', text: 'I need to refactor the auth system. What is the impact on the release timeline?', highlighted: ['refactor', 'auth system', 'release timeline'] },
        { sender: 'Salience', text: 'Based on the current sprint and your team velocity, this would add 1.5 weeks. However, tech debt is flagged as high priority in your roadmap.', highlighted: ['sprint', 'team velocity', '1.5 weeks', 'tech debt', 'high priority'] },
        { sender: 'Engineer', text: 'Can we parallelize with the mobile work?', highlighted: ['parallelize', 'mobile work'] },
        { sender: 'Salience', text: 'Yes - auth refactor can run parallel. I will coordinate with the PM to adjust milestones and notify stakeholders.', highlighted: ['parallel', 'coordinate', 'adjust milestones', 'notify stakeholders'] },
      ],
      variables: ['Technical Context', 'Organizational Heuristics', 'User Intent']
    },
  ];

  const variableButtons = [
    { name: 'Personalization & User Intent', icon: '👤', color: 'from-purple-500 to-pink-500' },
    { name: 'Technical Context & Goals', icon: '🔧', color: 'from-blue-500 to-cyan-500' },
    { name: 'Organizational Heuristics', icon: '🏢', color: 'from-green-500 to-emerald-500' },
  ];

  const analysisData = [
    {
      title: 'Personalization & User Intent',
      items: [
        { label: 'User preference', value: 'Direct communication style', color: 'text-purple-400' },
        { label: 'Intent classification', value: 'Feature prioritization request', color: 'text-pink-400' },
        { label: 'Context window', value: 'Last 3 conversations + roadmap', color: 'text-purple-300' },
        { label: 'Response adaptation', value: 'Data-driven, concise answers', color: 'text-pink-300' },
      ]
    },
    {
      title: 'Technical Context & Goals',
      items: [
        { label: 'Current sprint', value: 'Sprint 12 - Mobile focus', color: 'text-blue-400' },
        { label: 'Team velocity', value: '34 story points/sprint', color: 'text-cyan-400' },
        { label: 'Tech stack', value: 'React Native, Node.js, PostgreSQL', color: 'text-blue-300' },
        { label: 'Active experiments', value: 'Onboarding A/B test (running)', color: 'text-cyan-300' },
      ]
    },
    {
      title: 'Organizational Heuristics',
      items: [
        { label: 'Strategic priority', value: 'Mobile-first growth (Q1 2025)', color: 'text-green-400' },
        { label: 'Budget constraints', value: '$2M dev budget, 60% allocated', color: 'text-emerald-400' },
        { label: 'Risk tolerance', value: 'Moderate - prioritize quality', color: 'text-green-300' },
        { label: 'Key metrics', value: 'DAU +15%, D7 retention +20%', color: 'text-emerald-300' },
      ]
    },
  ];

  const highlightText = (text: string, highlights: string[]) => {
    let result = text;
    highlights.forEach((highlight, idx) => {
      const colors = ['bg-purple-500/30', 'bg-blue-500/30', 'bg-green-500/30'];
      const color = colors[idx % colors.length];
      result = result.replace(
        new RegExp(`(${highlight})`, 'gi'),
        `<span class="${color} px-1 rounded"=>$1</span>`
      );
    });
    return result;
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative py-20 bg-gradient-to-b from-gray-950 via-black to-gray-950">
      <div className="container mx-auto px-6 md:px-12">

        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-shadow-elegant">
            <span className="gradient-metallic bg-clip-text text-transparent">
              The LLM Observer & Interfacer
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
            Context-aware intelligence that personalizes to each team member
          </p>
        </div>

        {/* 3-Part Layout */}
        <div className="grid md:grid-cols-12 gap-8 max-w-7xl mx-auto items-start">

          {/* LEFT: Chat Modal with Tabs */}
          <div className="md:col-span-5 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-gray-700 bg-gray-900/50">
              {tabs.map((tab, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`flex-1 px-4 py-3 text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                    activeTab === idx
                      ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-white border-b-2 border-purple-500'
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.role}</span>
                </button>
              ))}
            </div>

            {/* Chat Messages */}
            <div className="p-6 space-y-4 h-[500px] overflow-y-auto">
              {conversations[activeTab].messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`${
                    msg.sender === 'Salience'
                      ? 'bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-l-2 border-purple-500'
                      : 'bg-gray-800/50'
                  } p-4 rounded-lg`}
                >
                  <div className="text-xs font-semibold text-gray-400 mb-2">{msg.sender}</div>
                  <div
                    className="text-sm text-gray-200 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: highlightText(msg.text, msg.highlighted) }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* CENTER: Brain Icon with Connection Lines */}
          <div className="md:col-span-2 flex items-center justify-center relative">
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 600" style={{ overflow: 'visible' }}>
              {/* Lines from left to brain */}
              <line x1="0" y1="250" x2="100" y2="300" stroke="rgba(139, 92, 246, 0.4)" strokeWidth="2" strokeDasharray="5 5" />

              {/* Lines from brain to right */}
              {variableButtons.map((_, idx) => (
                <line
                  key={idx}
                  x1="100"
                  y1="300"
                  x2="200"
                  y2={150 + idx * 100}
                  stroke="rgba(59, 130, 246, 0.4)"
                  strokeWidth="2"
                  strokeDasharray="5 5"
                  className={selectedVariable === idx ? 'opacity-100' : 'opacity-30'}
                />
              ))}
            </svg>

            {/* Brain Icon */}
            <div className="relative z-10 my-48">
              <div className="w-32 h-32 rounded-full gradient-rainbow opacity-30 blur-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse-subtle" />
              <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500 flex items-center justify-center shadow-2xl">
                <div className="text-5xl">🧠</div>
              </div>
              <div className="text-center mt-3">
                <div className="text-xs font-semibold text-gray-400">Salience</div>
                <div className="text-xs text-gray-500">Engine</div>
              </div>
            </div>
          </div>

          {/* RIGHT: Vertical Button Stack */}
          <div className="md:col-span-5 space-y-4">
            {variableButtons.map((button, idx) => (
              <div key={idx}>
                <button
                  onClick={() => setSelectedVariable(selectedVariable === idx ? null : idx)}
                  className={`w-full p-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 ${
                    selectedVariable === idx
                      ? `bg-gradient-to-r ${button.color} text-white shadow-lg scale-105`
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                  }`}
                >
                  <span className="text-2xl">{button.icon}</span>
                  <span className="text-left flex-1">{button.name}</span>
                  <svg
                    className={`w-5 h-5 transition-transform ${selectedVariable === idx ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Revealed Analysis Panel */}
                {selectedVariable === idx && (
                  <div className="mt-4 bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 border border-gray-700 animate-fadeIn">
                    <h3 className="text-lg font-bold text-white mb-4">{analysisData[idx].title}</h3>
                    <div className="space-y-3">
                      {analysisData[idx].items.map((item, itemIdx) => (
                        <div key={itemIdx} className="flex items-start justify-between gap-4 p-3 bg-gray-800/50 rounded-lg">
                          <div className="text-sm text-gray-400 min-w-[120px]">{item.label}</div>
                          <div className={`text-sm font-semibold ${item.color} text-right flex-1`}>{item.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </section>
  );
}

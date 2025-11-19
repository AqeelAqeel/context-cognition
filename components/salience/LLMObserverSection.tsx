'use client';

import { useState } from 'react';

export function LLMObserverSection() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { name: 'Memory & Context', icon: '🧠' },
    { name: 'Adaptation', icon: '🔄' },
    { name: 'Organization Heuristics', icon: '🎯' },
  ];

  const tabContent = [
    {
      title: 'Conversation & Work Memory',
      features: [
        { label: 'Recent conversations', value: 'Last 7 days', active: true },
        { label: 'Work orders', value: '12 active', active: true },
        { label: 'Recent events', value: 'Product launch prep', active: true },
        { label: 'Market context', value: 'Q4 competitive landscape', active: false },
        { label: 'Meeting notes', value: 'Strategy session 11/15', active: true },
        { label: 'Async communications', value: 'Slack threads (18)', active: true },
      ],
      llmOutput: [
        { text: 'User input:', color: 'text-blue-400', content: '"What\'s the status on the mobile rollout?"' },
        { text: 'Parsing:', color: 'text-purple-400', content: 'Intent: status_check, Entity: mobile_rollout, Context: product_launch' },
        { text: 'Interpretation:', color: 'text-green-400', content: 'User wants update on mobile feature deployment discussed in last strategy meeting' },
        { text: 'Response:', color: 'text-yellow-400', content: 'Based on Nov 15 strategy session and recent Slack updates...' },
      ],
    },
    {
      title: 'Personalization & Adaptation',
      features: [
        { label: 'Communication style', value: 'Direct, technical', active: true },
        { label: 'Preferred interface', value: 'Chat + buttons', active: true },
        { label: 'Response length', value: 'Concise (< 100 words)', active: true },
        { label: 'Learning rate', value: 'Adapting (87%)', active: true },
        { label: 'Audio input enabled', value: 'Yes', active: false },
        { label: 'Notification preference', value: 'Critical only', active: true },
      ],
      llmOutput: [
        { text: 'User profile:', color: 'text-cyan-400', content: 'Engineering lead, prefers technical depth over summaries' },
        { text: 'Language adaptation:', color: 'text-pink-400', content: 'Uses "rollout", "deployment", "infra" - matching user vocabulary' },
        { text: 'Interface preference:', color: 'text-orange-400', content: 'Quick action buttons + expandable details' },
        { text: 'Timing:', color: 'text-indigo-400', content: 'Active mornings 8-10am, prefers async updates afternoon' },
      ],
    },
    {
      title: 'Organizational Heuristics',
      features: [
        { label: 'Strategic focus', value: 'Mobile-first growth', active: true },
        { label: 'Current experiments', value: 'Onboarding A/B test', active: true },
        { label: 'Key metrics', value: 'DAU, retention, NPS', active: true },
        { label: 'Budget constraints', value: '$2M dev budget', active: true },
        { label: 'Timeline', value: 'Q1 2025 launch', active: true },
        { label: 'Risk tolerance', value: 'Moderate', active: false },
      ],
      llmOutput: [
        { text: 'Strategy alignment:', color: 'text-green-400', content: 'Mobile rollout is Priority 1 per Q4 roadmap' },
        { text: 'Experiment context:', color: 'text-purple-400', content: 'A/B test running on onboarding flow, affects mobile UX decisions' },
        { text: 'Metric check:', color: 'text-blue-400', content: 'Rollout targets: +15% DAU, +20% D7 retention' },
        { text: 'Guardrails:', color: 'text-red-400', content: 'Budget: 60% allocated, Timeline: on track, Risk: flagged for QA coverage' },
      ],
    },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center relative py-20 bg-gradient-to-b from-gray-950 via-black to-gray-950">
      <div className="container mx-auto px-6 md:px-12">

        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-shadow-elegant">
            <span className="gradient-metallic bg-clip-text text-transparent">
              The LLM Observer Interface
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
            Personalized intelligence that understands you, your team, and your goals
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeTab === idx
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              <span className="text-2xl">{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">

          {/* Left: Variables/Features */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-6">{tabContent[activeTab].title}</h3>

            <div className="space-y-3">
              {tabContent[activeTab].features.map((feature, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-4 rounded-lg ${
                    feature.active ? 'bg-green-500/10 border border-green-500/30' : 'bg-gray-800/50 border border-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${feature.active ? 'bg-green-400' : 'bg-gray-600'}`} />
                    <span className="text-sm font-medium text-gray-300">{feature.label}</span>
                  </div>
                  <span className="text-sm text-white font-semibold">{feature.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: LLM Output */}
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-6">LLM Processing</h3>

            <div className="space-y-4 font-mono text-sm">
              {tabContent[activeTab].llmOutput.map((output, idx) => (
                <div key={idx} className="space-y-1">
                  <div className={`${output.color} font-bold`}>{output.text}</div>
                  <div className="text-gray-400 pl-4 border-l-2 border-gray-700">{output.content}</div>
                </div>
              ))}
            </div>

            {/* Processing indicator */}
            <div className="mt-6 pt-6 border-t border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm text-gray-400">Processing active • Real-time adaptation</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

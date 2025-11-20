'use client';

import React from 'react';

export function IntegrationRoadmapSection() {
  return (
    <section className="min-h-screen relative py-20 px-4 sm:px-8 lg:px-16 xl:px-28">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(139,92,246,0.15),_transparent_70%)]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-300 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_12px_rgba(139,92,246,0.9)]" />
            Integration & Roadmap
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4">
            Where the{" "}
            <span className="bg-clip-text text-transparent bg-[linear-gradient(to_right,_#60a5fa,_#a855f7,_#f97316)]">
              Salience Bridge
            </span>{" "}
            Leads
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto">
            We sit between your existing tools and your team's decision-making process.
            Everything flows through the organizational brain—unified, contextualized, and ready to act.
          </p>
        </div>

        {/* Main System Diagram */}
        <SystemFlowDiagram />

        {/* Three-Layer Value Proposition */}
        <ThreeLayerRoadmap />

        {/* Proprietary Moat */}
        <ProprietaryMoatSection />
      </div>
    </section>
  );
}

function SystemFlowDiagram() {
  return (
    <div className="relative mb-20">
      <div className="border border-white/10 rounded-3xl bg-gradient-to-br from-slate-950/80 via-slate-900/60 to-black/80 backdrop-blur-xl shadow-[0_0_40px_rgba(15,23,42,0.8)] p-6 sm:p-8 lg:p-12 overflow-hidden">

        {/* Desktop Layout: Horizontal */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] gap-8 items-center">

          {/* LEFT: Their Ecosystem */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-200 mb-4 text-center">
              Their World
            </h3>
            <div className="space-y-3">
              <EcosystemCategory
                title="Communication"
                tools={["Slack", "Discord", "Teams"]}
                color="sky"
              />
              <EcosystemCategory
                title="Project & Dev"
                tools={["Linear", "Jira", "GitHub"]}
                color="emerald"
              />
              <EcosystemCategory
                title="Product & Analytics"
                tools={["Segment", "PostHog", "Mixpanel"]}
                color="violet"
              />
              <EcosystemCategory
                title="Docs & Knowledge"
                tools={["Notion", "Confluence", "Docs"]}
                color="orange"
              />
              <EcosystemCategory
                title="Infrastructure"
                tools={["Datadog", "Grafana", "Logs"]}
                color="rose"
              />
            </div>
            <div className="text-xs text-slate-400 text-center mt-4">
              Fragmented signals, scattered context
            </div>
          </div>

          {/* MIDDLE: Rainbow Brain Conduit */}
          <div className="flex flex-col items-center gap-4 px-6">
            {/* Flowing lines from left */}
            <div className="relative w-24 h-1">
              <FlowingLine direction="right" delay={0} />
            </div>

            {/* Central Brain Engine */}
            <div className="relative">
              <RainbowBrainConduit />

              {/* Label */}
              <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-48 text-center">
                <div className="text-xs font-semibold text-slate-200 mb-1">
                  Salience Engine
                </div>
                <div className="text-[10px] text-slate-400">
                  Ingestion → Context → Reasoning → Output
                </div>
              </div>
            </div>

            {/* Flowing lines to right */}
            <div className="relative w-24 h-1 mt-8">
              <FlowingLine direction="right" delay={300} />
            </div>
          </div>

          {/* RIGHT: Our Outputs */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-200 mb-4 text-center">
              Salience Outputs
            </h3>
            <div className="space-y-3">
              <OutputCategory
                title="Contextual Intelligence"
                items={["Meeting summaries", "Decision context", "Task breakdown"]}
              />
              <OutputCategory
                title="Alignment & Nudges"
                items={["Roadmap checks", "Experiment insights", "Risk alerts"]}
              />
              <OutputCategory
                title="Personalized Interface"
                items={["Role-specific views", "Adaptive tone", "Smart routing"]}
              />
              <OutputCategory
                title="Organizational Memory"
                items={["Strategy traces", "Brand consistency", "Historical patterns"]}
              />
            </div>
            <div className="text-xs text-slate-400 text-center mt-4">
              Unified, actionable, grounded in reality
            </div>
          </div>
        </div>

        {/* Mobile Layout: Vertical Stack */}
        <div className="lg:hidden space-y-8">
          {/* Their Ecosystem */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-200 text-center mb-4">
              Their World
            </h3>
            <EcosystemCategory
              title="Communication"
              tools={["Slack", "Discord", "Teams"]}
              color="sky"
            />
            <EcosystemCategory
              title="Project & Dev"
              tools={["Linear", "Jira", "GitHub"]}
              color="emerald"
            />
            <EcosystemCategory
              title="Product & Analytics"
              tools={["Segment", "PostHog", "Mixpanel"]}
              color="violet"
            />
          </div>

          {/* Flow Arrow */}
          <div className="flex justify-center">
            <div className="w-1 h-12 relative">
              <FlowingLine direction="down" delay={0} />
            </div>
          </div>

          {/* Rainbow Brain */}
          <div className="flex flex-col items-center gap-4">
            <RainbowBrainConduit />
            <div className="text-center">
              <div className="text-sm font-semibold text-slate-200 mb-1">
                Salience Engine
              </div>
              <div className="text-xs text-slate-400">
                Context-aware intelligence layer
              </div>
            </div>
          </div>

          {/* Flow Arrow */}
          <div className="flex justify-center">
            <div className="w-1 h-12 relative">
              <FlowingLine direction="down" delay={300} />
            </div>
          </div>

          {/* Outputs */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-200 text-center mb-4">
              Salience Outputs
            </h3>
            <OutputCategory
              title="Contextual Intelligence"
              items={["Meeting summaries", "Decision context", "Task breakdown"]}
            />
            <OutputCategory
              title="Alignment & Nudges"
              items={["Roadmap checks", "Experiment insights", "Risk alerts"]}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

function EcosystemCategory({
  title,
  tools,
  color
}: {
  title: string;
  tools: string[];
  color: 'sky' | 'emerald' | 'violet' | 'orange' | 'rose';
}) {
  const colorMap = {
    sky: 'from-sky-400/20 to-sky-600/20 border-sky-400/30',
    emerald: 'from-emerald-400/20 to-emerald-600/20 border-emerald-400/30',
    violet: 'from-violet-400/20 to-violet-600/20 border-violet-400/30',
    orange: 'from-orange-400/20 to-orange-600/20 border-orange-400/30',
    rose: 'from-rose-400/20 to-rose-600/20 border-rose-400/30',
  };

  return (
    <div className={`rounded-xl border bg-gradient-to-br ${colorMap[color]} backdrop-blur-sm p-3`}>
      <div className="text-xs font-semibold text-slate-200 mb-2 uppercase tracking-wider">
        {title}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {tools.map(tool => (
          <span
            key={tool}
            className="text-[11px] px-2 py-0.5 rounded-full bg-slate-900/60 text-slate-300 border border-white/10"
          >
            {tool}
          </span>
        ))}
      </div>
    </div>
  );
}

function OutputCategory({
  title,
  items
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm p-3">
      <div className="text-xs font-semibold text-slate-200 mb-2 uppercase tracking-wider">
        {title}
      </div>
      <ul className="space-y-1">
        {items.map(item => (
          <li key={item} className="text-[11px] text-slate-300 flex items-start gap-1.5">
            <span className="text-emerald-400 mt-0.5">→</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RainbowBrainConduit() {
  return (
    <div className="relative w-32 h-32 sm:w-40 sm:h-40">
      {/* Outer glow rings */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-400/20 via-violet-500/20 to-fuchsia-500/20 blur-xl animate-pulse" />
      <div className="absolute inset-2 rounded-full bg-gradient-to-br from-violet-400/30 via-fuchsia-500/30 to-orange-500/30 blur-lg" />

      {/* Main brain sphere */}
      <div className="absolute inset-4 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(96,165,250,0.9),transparent_50%),radial-gradient(circle_at_70%_70%,rgba(236,72,153,0.95),transparent_60%),radial-gradient(circle_at_50%_0%,rgba(139,92,246,0.85),transparent_55%)] border border-white/20 shadow-[0_0_60px_rgba(139,92,246,0.8)] flex items-center justify-center overflow-hidden">

        {/* Brain texture */}
        <div className="absolute inset-0 opacity-40">
          {/* Synaptic pathways */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"
              style={{
                top: `${20 + i * 12}%`,
                left: '10%',
                right: '10%',
                transform: `rotate(${i * 15 - 30}deg)`,
              }}
            />
          ))}
        </div>

        {/* Pulsing nodes */}
        <div className="absolute inset-0 flex items-center justify-center">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.9)] animate-pulse"
              style={{
                top: `${30 + i * 10}%`,
                left: `${25 + i * 15}%`,
                animationDelay: `${i * 150}ms`,
              }}
            />
          ))}
        </div>

        {/* Center icon/symbol */}
        <div className="relative z-10 text-white/90 text-2xl font-bold">
          ⚡
        </div>
      </div>

      {/* Orbital ring */}
      <div className="absolute inset-0 rounded-full border border-dashed border-slate-500/30 animate-spin-slow"
           style={{ animationDuration: '20s' }}
      />
    </div>
  );
}

function FlowingLine({
  direction,
  delay = 0
}: {
  direction: 'right' | 'down';
  delay?: number;
}) {
  return (
    <div className={`absolute inset-0 ${direction === 'down' ? 'flex flex-col' : 'flex'} overflow-hidden`}>
      <div className={`${direction === 'down' ? 'w-full h-full' : 'h-full w-full'} bg-gradient-to-${direction === 'down' ? 'b' : 'r'} from-transparent via-violet-400 to-transparent opacity-60 animate-flow`}
           style={{ animationDelay: `${delay}ms` }}
      />
    </div>
  );
}

function ThreeLayerRoadmap() {
  const layers = [
    {
      title: "B2B: Organizational Throughput",
      description: "Maximize team velocity, decision alignment, and execution quality",
      features: [
        "Unified org memory across Slack, tickets, docs, and meetings",
        "Context-aware task breakdown and blocking detection",
        "Real-time alignment checks against roadmap and strategy",
        "KPI tracking with before/after measurement",
      ],
      color: "from-sky-400 to-sky-600",
      bgColor: "from-sky-400/10 to-sky-600/10",
    },
    {
      title: "B2C: Consumer Behavior Intelligence",
      description: "Build deep user understanding through interface interactions",
      features: [
        "Persona profiling from usage patterns and behavior",
        "Experiment tracking with variant performance analysis",
        "Onboarding flow optimization and churn prediction",
        "Personalized content and messaging at scale",
      ],
      color: "from-violet-400 to-fuchsia-600",
      bgColor: "from-violet-400/10 to-fuchsia-600/10",
    },
    {
      title: "B2B2C: The Golden Gate",
      description: "Connect internal org intelligence with external user dynamics",
      features: [
        "Bridge team decisions to customer impact in real-time",
        "Support load prediction based on product changes",
        "Feature request routing to relevant product teams",
        "Closed-loop learning: customer feedback → product iteration",
      ],
      color: "from-emerald-400 to-teal-600",
      bgColor: "from-emerald-400/10 to-teal-600/10",
    },
  ];

  return (
    <div className="mb-20">
      <div className="text-center mb-10">
        <h3 className="text-2xl sm:text-3xl font-semibold mb-3">
          Three Paths Forward
        </h3>
        <p className="text-sm text-slate-400 max-w-2xl mx-auto">
          The same foundational engine powers different use cases—from internal alignment to consumer intelligence to the bridge between them.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {layers.map((layer, idx) => (
          <div
            key={idx}
            className={`border border-white/10 rounded-2xl bg-gradient-to-br ${layer.bgColor} backdrop-blur-sm p-6 hover:border-white/20 transition-all duration-300 group`}
          >
            <div className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider bg-gradient-to-r ${layer.color} bg-clip-text text-transparent mb-3`}>
              <span className={`h-2 w-2 rounded-full bg-gradient-to-r ${layer.color}`} />
              Layer {idx + 1}
            </div>

            <h4 className="text-lg font-semibold text-slate-100 mb-2 group-hover:text-white transition-colors">
              {layer.title}
            </h4>

            <p className="text-xs text-slate-400 mb-4">
              {layer.description}
            </p>

            <ul className="space-y-2">
              {layer.features.map((feature, i) => (
                <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                  <span className={`mt-0.5 h-1 w-1 rounded-full bg-gradient-to-r ${layer.color} shrink-0`} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProprietaryMoatSection() {
  const moatElements = [
    {
      title: "Discernment Engine",
      description: "Context-aware filtering that understands what matters now vs what's noise",
      icon: "🎯",
    },
    {
      title: "Human Heuristics",
      description: "Per-person modeling of communication style, preferences, and decision patterns",
      icon: "🧠",
    },
    {
      title: "Adaptive Workflows",
      description: "Self-tuning processes that evolve with your organization's actual behavior",
      icon: "⚙️",
    },
    {
      title: "AI-Native UX",
      description: "Interfaces that predict, suggest, and adapt in real-time without manual config",
      icon: "✨",
    },
  ];

  return (
    <div className="border border-white/10 rounded-3xl bg-gradient-to-br from-slate-950/80 via-slate-900/60 to-black/80 backdrop-blur-xl shadow-[0_0_40px_rgba(15,23,42,0.8)] p-8 sm:p-10">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-emerald-300 mb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.9)]" />
          Proprietary Moat
        </div>

        <h3 className="text-2xl sm:text-3xl font-semibold mb-3">
          What Makes Salience Defensible
        </h3>

        <p className="text-sm text-slate-400 max-w-2xl mx-auto">
          Our competitive advantage isn't just the data we collect—it's the intelligence we extract,
          the heuristics we learn, and the interfaces we create.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {moatElements.map((element, idx) => (
          <div
            key={idx}
            className="border border-white/5 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] p-5 hover:border-white/10 transition-all duration-300 group"
          >
            <div className="flex items-start gap-3">
              <div className="text-3xl">{element.icon}</div>
              <div className="flex-1">
                <h4 className="text-base font-semibold text-slate-100 mb-1.5 group-hover:text-white transition-colors">
                  {element.title}
                </h4>
                <p className="text-xs text-slate-400">
                  {element.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-violet-500/10 via-fuchsia-500/10 to-orange-500/10 border border-white/5">
        <p className="text-xs text-slate-300 text-center">
          <span className="font-semibold text-slate-100">The deeper moat:</span> As organizations use Salience,
          we learn their unique vocabulary, decision patterns, and operational rhythms—creating switching costs
          that compound over time.
        </p>
      </div>
    </div>
  );
}

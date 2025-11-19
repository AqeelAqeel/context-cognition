'use client';

export function TextContentSection() {
  return (
    <section className="min-h-screen flex items-center justify-center relative py-20 bg-gradient-to-b from-black via-gray-950 to-black">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">

        {/* Section 1: Problem */}
        <div className="mb-20 text-center md:text-left">
          <div className="inline-block px-4 py-1 bg-red-500/20 border border-red-500/30 rounded-full mb-6">
            <span className="text-sm font-semibold text-red-400">01 / Problem</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white text-shadow-elegant">
            The Reality Today
          </h2>
          <div className="space-y-4 text-lg text-gray-300 leading-relaxed">
            <p>Organizational communication is scattered.</p>
            <p>Memory is fragmented.</p>
            <p>Strategy and experiments get lost.</p>
            <p>Execution drifts.</p>
          </div>
        </div>

        {/* Section 2: What Salience builds */}
        <div className="mb-20 text-center md:text-left">
          <div className="inline-block px-4 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full mb-6">
            <span className="text-sm font-semibold text-blue-400">02 / Solution</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white text-shadow-elegant">
            What Salience Builds
          </h2>
          <div className="space-y-4 text-lg text-gray-300 leading-relaxed">
            <p>A working memory for the org.</p>
            <p>A clear read on decisions, context, and direction.</p>
            <p>A link to the roadmap, experiments, and success metrics.</p>
            <p>A bridge between strategy and day-to-day action.</p>
          </div>
        </div>

        {/* Section 3: How it behaves */}
        <div className="mb-20 text-center md:text-left">
          <div className="inline-block px-4 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full mb-6">
            <span className="text-sm font-semibold text-purple-400">03 / Behavior</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white text-shadow-elegant">
            How It Behaves
          </h2>
          <div className="space-y-4 text-lg text-gray-300 leading-relaxed">
            <p>Lives in Slack.</p>
            <p>Ingests notes and artifacts.</p>
            <p>Keeps content private.</p>
            <p>Turns context into tasks, checks, and nudges.</p>
            <p>Keeps teams aligned and guards decisions.</p>
            <p>Humans stay in the loop; Salience keeps the thread.</p>
          </div>
        </div>

        {/* Section 4: What it optimizes for */}
        <div className="mb-20 text-center md:text-left">
          <div className="inline-block px-4 py-1 bg-green-500/20 border border-green-500/30 rounded-full mb-6">
            <span className="text-sm font-semibold text-green-400">04 / Optimization</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white text-shadow-elegant">
            What It Optimizes For
          </h2>
          <div className="space-y-4 text-lg text-gray-300 leading-relaxed">
            <p>Throughput.</p>
            <p>Consistency.</p>
            <p>Faster learning loops.</p>
            <p>Clean execution against defined goals.</p>
            <p>No drift. No rework.</p>
          </div>
        </div>

        {/* Section 5: Why it matters */}
        <div className="mb-20 text-center md:text-left">
          <div className="inline-block px-4 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-full mb-6">
            <span className="text-sm font-semibold text-yellow-400">05 / Value</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white text-shadow-elegant">
            Why It Matters
          </h2>
          <div className="space-y-4 text-lg text-gray-300 leading-relaxed">
            <p>It acts like a chief of staff, CPO, and COO in one system.</p>
            <p>It connects vision to operations without adding another platform.</p>
            <p>It moves work toward the numbers you care about.</p>
          </div>
        </div>

      </div>
    </section>
  );
}

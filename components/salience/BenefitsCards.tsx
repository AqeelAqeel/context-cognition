'use client';

export function BenefitsCards() {
  const benefits = [
    {
      title: 'Cognitive Load',
      subtitle: 'Keep you where you need to be',
      icon: '🧘',
      description: 'Reduce mental overhead by surfacing the right context at the right time',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Increased Throughput',
      subtitle: 'Move faster, learn faster',
      icon: '🚀',
      description: 'Accelerate execution by eliminating drift and rework',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Aligned Decision Making',
      subtitle: 'Guided by your heuristics',
      icon: '🎯',
      description: 'Every action stays consistent with your defined strategy and goals',
      gradient: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center relative py-20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-shadow-elegant">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Why Salience?
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="group relative"
              style={{ animationDelay: `${idx * 0.2}s` }}
            >
              {/* Card glow effect */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${benefit.gradient} rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000`} />

              {/* Card content */}
              <div className="relative bg-gray-900 rounded-2xl p-8 h-full border border-gray-800 hover:border-gray-700 transition-all duration-300">
                <div className="text-6xl mb-6">{benefit.icon}</div>

                <h3 className="text-2xl font-bold text-white mb-2 text-shadow-elegant">
                  {benefit.title}
                </h3>

                <p className={`text-sm font-semibold mb-4 bg-gradient-to-r ${benefit.gradient} bg-clip-text text-transparent`}>
                  {benefit.subtitle}
                </p>

                <p className="text-gray-400 leading-relaxed">
                  {benefit.description}
                </p>

                {/* Subtle drop shadow text effect */}
                <div className="absolute bottom-4 right-4 opacity-5 text-8xl font-bold select-none pointer-events-none">
                  {benefit.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

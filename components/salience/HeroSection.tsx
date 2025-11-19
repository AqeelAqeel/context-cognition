'use client';

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden spotlight">
      {/* Spotlight effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
        {/* Main heading */}
        <h1 className="text-7xl md:text-9xl font-bold mb-8 text-white text-shadow-glow tracking-tight">
          This is
          <br />
          Salience
        </h1>

        {/* Tagline */}
        <p className="text-xl md:text-3xl text-gray-300 max-w-4xl mx-auto mb-16 leading-relaxed font-light text-shadow-elegant">
          An organizational memory and coordination engine
        </p>

        {/* Scroll indicator */}
        <div className="animate-bounce mt-20">
          <svg className="w-8 h-8 mx-auto text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
          <p className="text-sm text-gray-500 mt-2">Scroll to explore</p>
        </div>
      </div>
    </section>
  );
}

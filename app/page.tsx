'use client';

import { useState, useRef } from 'react';
import { HeroSection } from '@/components/salience/HeroSection';
import { BrainVisualization } from '@/components/salience/BrainVisualization';
import { LayerStackVisualization } from '@/components/salience/LayerStackVisualization';
import { BenefitsCards } from '@/components/salience/BenefitsCards';
import { CTAButton } from '@/components/salience/CTAButton';
import { TextContentSection } from '@/components/salience/TextContentSection';
import { LLMObserverSection } from '@/components/salience/LLMObserverSection';
import { DynamicDBWall } from '@/components/salience/DynamicDBWall';
import { ACFDemoSection } from '@/components/salience/ACFDemoSection';

export default function SalienceLanding() {
  const [currentSection, setCurrentSection] = useState(0);
  const demoSectionRef = useRef<HTMLDivElement>(null);

  const scrollToDemo = () => {
    demoSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-black text-white overflow-x-hidden">

      {/* Hero Section */}
      <HeroSection />

      {/* Brain Visualization */}
      <BrainVisualization />

      {/* Layer Stack Visualization */}
      <LayerStackVisualization />

      {/* Benefits Cards */}
      <BenefitsCards />

      {/* CTA to Demo */}
      <section className="min-h-[50vh] flex items-center justify-center relative py-20">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-shadow-elegant">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              See It In Action
            </span>
          </h2>
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            Experience how Salience transforms organizational memory into actionable intelligence
          </p>
          <CTAButton onClick={scrollToDemo}>
            Explore the Demo
          </CTAButton>
        </div>
      </section>

      {/* Text Content Section */}
      <TextContentSection />

      {/* Demo Section */}
      <div ref={demoSectionRef}>
        <ACFDemoSection />
      </div>

      {/* LLM Observer Section */}
      <LLMObserverSection />

      {/* Dynamic DB Wall */}
      <DynamicDBWall />

      {/* Final CTA */}
      <section className="min-h-screen flex items-center justify-center relative py-20 spotlight">
        <div className="absolute top-0 left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
          <h2 className="text-6xl md:text-8xl font-bold mb-8 text-white text-shadow-glow">
            Ready to transform your organization?
          </h2>

          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-16 leading-relaxed">
            Join the future of organizational intelligence.
            <br />
            Maximize throughput. Minimize drift. Stay aligned.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <CTAButton>
              Get Started
            </CTAButton>

            <button className="px-12 py-5 bg-gray-900 rounded-2xl text-white font-semibold border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:scale-105">
              Schedule a Demo
            </button>
          </div>

          {/* Footer info */}
          <div className="mt-24 pt-12 border-t border-gray-800">
            <div className="grid md:grid-cols-3 gap-8 text-left max-w-4xl mx-auto mb-12">
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Product</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Features</li>
                  <li>Integrations</li>
                  <li>Pricing</li>
                  <li>Security</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Company</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>About</li>
                  <li>Blog</li>
                  <li>Careers</li>
                  <li>Contact</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Resources</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Documentation</li>
                  <li>API Reference</li>
                  <li>Case Studies</li>
                  <li>Support</li>
                </ul>
              </div>
            </div>

            <div className="text-center text-gray-500 text-sm">
              <p>© 2025 Salience. All rights reserved.</p>
              <p className="mt-2">Organizational Memory & Coordination Engine</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

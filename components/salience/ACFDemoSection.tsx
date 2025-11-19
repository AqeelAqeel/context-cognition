'use client';

import { OrganizationalFlowDiagram } from '@/components/salience/OrganizationalFlowDiagram';

export function ACFDemoSection() {
  return (
    <section className="min-h-screen py-20 bg-gradient-to-b from-gray-950 via-gray-900 to-black">
      <div className="container mx-auto px-6 md:px-12">
        {/* Organizational Flow Diagram */}
        <OrganizationalFlowDiagram />
      </div>
    </section>
  );
}

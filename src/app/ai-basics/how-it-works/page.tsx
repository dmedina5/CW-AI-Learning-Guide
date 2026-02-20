'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { TierBadge } from '@/components/content/TierBadge';
import { ContextDemo } from '@/components/interactive/ContextDemo';
import { ContextLayers } from '@/components/interactive/ContextLayers';

export default function HowItWorksPage() {
  return (
    <div>
      <TierBadge tier="beginner" />
      <h1 className="mt-4 mb-4">How It Works</h1>
      <p className="mb-12">Context is the lens that focuses AI&apos;s predictions.</p>

      {/* Section: Context Shapes Prediction */}
      <section className="mb-16" id="context">
        <div className="section-label">How It Works</div>
        <h2 className="mb-4">
          Context shapes the <span className="text-highlight">prediction</span>
        </h2>
        <p className="mb-4">
          The model doesn&apos;t learn from you. Your context is a lens that focuses its predictions.
          When the conversation ends, the lens goes away.
        </p>

        <ContextLayers />
      </section>

      {/* Section: Interactive Demo */}
      <section className="mb-16" id="demo">
        <div className="section-label">Interactive</div>
        <h2 className="mb-4">Context drives prediction</h2>
        <p>How would you finish this sentence? It depends on <span className="text-highlight">context</span>.</p>

        <ContextDemo />
      </section>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8 mt-8" style={{ borderTop: '1px solid var(--cw-border)' }}>
        <Link
          href="/ai-basics/core-concepts"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all pill-btn"
        >
          <ArrowLeft size={16} /> Core Concepts
        </Link>
        <Link
          href="/ai-basics/innovation"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:gap-3"
          style={{ background: 'var(--cw-primary)', color: '#fff' }}
        >
          Next: Innovation Flywheel <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

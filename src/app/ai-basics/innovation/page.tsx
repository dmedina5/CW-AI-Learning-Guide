'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Callout } from '@/components/content/Callout';
import { TierBadge } from '@/components/content/TierBadge';
import { InnovationFlywheel } from '@/components/interactive/InnovationFlywheel';

export default function InnovationPage() {
  return (
    <div>
      <TierBadge tier="beginner" />
      <h1 className="mt-4 mb-4">The Innovation Flywheel</h1>
      <p className="mb-12">AI breakthroughs build better AI, which enables more breakthroughs.</p>

      {/* Section: Innovation Flywheel */}
      <section className="mb-16" id="flywheel">
        <div className="section-label">The Innovation Flywheel</div>
        <h2 className="mb-4">
          The pace of change is <span className="text-highlight">accelerating</span>
        </h2>
        <p className="mb-4">
          AI is creating a self-reinforcing cycle: breakthroughs build better AI, which enables
          more breakthroughs. Google Research calls it the &ldquo;magic cycle&rdquo; &mdash; and
          it&apos;s spinning faster every quarter.
        </p>

        <InnovationFlywheel />

        <Callout variant="purple" className="mt-6">
          <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
            Regardless of when AGI arrives, the tools we have <strong>today</strong> are already
            transforming how work gets done. That&apos;s what matters for Cover Whale right now.
          </p>
        </Callout>
      </section>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8 mt-8" style={{ borderTop: '1px solid var(--cw-border)' }}>
        <Link
          href="/ai-basics/how-it-works"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all pill-btn"
        >
          <ArrowLeft size={16} /> How It Works
        </Link>
        <Link
          href="/ai-basics/models"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:gap-3"
          style={{ background: 'var(--cw-primary)', color: '#fff' }}
        >
          Next: Models <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Callout } from '@/components/content/Callout';
import { TierBadge } from '@/components/content/TierBadge';

export default function CoreConceptsPage() {
  return (
    <div>
      <TierBadge tier="beginner" />
      <h1 className="mt-4 mb-4">Core Concepts</h1>
      <p className="mb-12">The foundational idea behind every AI tool.</p>

      {/* Section: Prediction Engine */}
      <section className="mb-16" id="prediction">
        <div className="section-label">Core Concept</div>
        <h2 className="mb-4">
          AI is a <span className="text-highlight">prediction engine</span>
        </h2>
        <p className="mb-6">
          At its core, AI predicts what comes next &mdash; the next word, the next step, the most
          likely answer. No consciousness, no secret agenda &mdash; just sophisticated prediction
          at enormous scale.
        </p>

        <Callout variant="purple">
          <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
            Everything an AI does boils down to: <em>&ldquo;Given what I&apos;ve seen, what&apos;s
            the most likely thing that should come next?&rdquo;</em>
          </p>
        </Callout>
      </section>

      {/* Section: What This Means */}
      <section className="mb-16" id="implications">
        <div className="section-label">Why It Matters</div>
        <h2 className="mb-4">
          What does <span className="text-highlight">&ldquo;prediction&rdquo;</span> mean in practice?
        </h2>
        <p className="mb-6">
          When you ask an AI to write an email, it&apos;s not &ldquo;thinking&rdquo; about your
          request the way a person would. It&apos;s predicting what a helpful, well-written
          response should look like based on patterns it learned during training.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Not Thinking',
              body: 'AI doesn\'t understand meaning. It recognizes patterns and predicts the most likely next token.',
            },
            {
              title: 'Not Remembering',
              body: 'Each conversation starts fresh. AI doesn\'t learn from you or carry context between sessions.',
            },
            {
              title: 'Not Creative',
              body: 'AI generates novel combinations of learned patterns. It\'s remixing, not inventing from scratch.',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-2xl p-6"
              style={{ background: 'var(--cw-surface)', border: '1px solid var(--cw-border)' }}
            >
              <h3 className="mb-2">{item.title}</h3>
              <p className="text-sm" style={{ color: 'var(--cw-ink-muted)' }}>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section: Key Takeaway */}
      <section className="mb-16" id="takeaway">
        <div className="section-label">Key Takeaway</div>
        <h2 className="mb-4">
          Better input = <span className="text-highlight">better predictions</span>
        </h2>
        <p className="mb-6">
          Since AI is a prediction engine, the quality of its output depends entirely on the quality
          of its input. More context, clearer instructions, and specific examples all give the model
          a better &ldquo;lens&rdquo; to make accurate predictions.
        </p>

        <Callout variant="purple">
          <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
            This is why <span className="text-highlight">prompt engineering</span> matters &mdash;
            it&apos;s the art of giving AI the right context to make the best predictions for your
            specific situation.
          </p>
        </Callout>
      </section>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8 mt-8" style={{ borderTop: '1px solid var(--cw-border)' }}>
        <Link
          href="/ai-basics"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all pill-btn"
        >
          <ArrowLeft size={16} /> AI Basics
        </Link>
        <Link
          href="/ai-basics/how-it-works"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:gap-3"
          style={{ background: 'var(--cw-primary)', color: '#fff' }}
        >
          Next: How It Works <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

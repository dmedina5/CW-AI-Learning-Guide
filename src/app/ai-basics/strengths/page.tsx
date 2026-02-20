'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Card, CardGrid } from '@/components/content/Card';
import { TierBadge } from '@/components/content/TierBadge';
import { PromptComparison } from '@/components/interactive/PromptComparison';

const STRENGTHS = [
  'Following prescriptive, well-defined processes',
  'Processing and summarizing large volumes of information',
  'Drafting content, organizing ideas, formatting',
  'Repetitive tasks executed consistently at scale',
  'Pattern recognition and data analysis',
];

const LIMITATIONS = [
  'Wiring processes together in business-sensible ways',
  'Understanding organizational context and priorities',
  'Judgment calls requiring experience and empathy',
  'Knowing what "good" looks like for your team',
  'Self-correction without human guardrails',
];

export default function StrengthsPage() {
  return (
    <div>
      <TierBadge tier="beginner" />
      <h1 className="mt-4 mb-4">Strengths & Limits</h1>
      <p className="mb-12">Where AI shines, where it doesn&apos;t, and where you step in.</p>

      {/* Section: Strengths & Limitations */}
      <section className="mb-16" id="strengths">
        <div className="section-label">Honest Assessment</div>
        <h2 className="mb-4">Where AI shines &mdash; and doesn&apos;t</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div
            className="rounded-2xl p-8"
            style={{
              background: 'var(--cw-surface)',
              border: '1px solid var(--cw-border)',
              borderLeft: '4px solid var(--cw-success)',
            }}
          >
            <h3 className="mb-4" style={{ color: 'var(--cw-success)' }}>Strengths</h3>
            {STRENGTHS.map((item, i) => (
              <div key={i} className="flex items-baseline gap-2.5 my-2.5 text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: 'var(--cw-success)' }} />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div
            className="rounded-2xl p-8"
            style={{
              background: 'var(--cw-surface)',
              border: '1px solid var(--cw-border)',
              borderLeft: '4px solid var(--cw-warning)',
            }}
          >
            <h3 className="mb-4" style={{ color: 'var(--cw-warning)' }}>Limitations</h3>
            {LIMITATIONS.map((item, i) => (
              <div key={i} className="flex items-baseline gap-2.5 my-2.5 text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: 'var(--cw-warning)' }} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Your Role */}
      <section className="mb-16" id="your-role">
        <div className="section-label">Your Role</div>
        <h2 className="mb-4">
          Where <span className="text-highlight">you</span> step in
        </h2>
        <p className="mb-6">AI is the engine &mdash; you&apos;re the driver.</p>

        <CardGrid columns={3}>
          <Card number="A">
            <h3 className="mb-2">Set Direction</h3>
            <p className="text-base" style={{ color: 'var(--cw-ink-muted)' }}>
              Define what you need, provide context, be specific about the outcome.
            </p>
          </Card>
          <Card number="B">
            <h3 className="mb-2">Refine Output</h3>
            <p className="text-base" style={{ color: 'var(--cw-ink-muted)' }}>
              AI gives a strong first draft. Your expertise turns it into the final product.
            </p>
          </Card>
          <Card number="C">
            <h3 className="mb-2">Apply Judgment</h3>
            <p className="text-base" style={{ color: 'var(--cw-ink-muted)' }}>
              You bring domain knowledge, company context, and critical thinking AI cannot replicate.
            </p>
          </Card>
        </CardGrid>
      </section>

      {/* Section: Better Prompts */}
      <section className="mb-16" id="prompting">
        <div className="section-label">The Art of Asking</div>
        <h2 className="mb-4">
          Better input = <span className="text-highlight">better output</span>
        </h2>
        <p className="mb-4">
          AI doesn&apos;t read your mind. The more context, structure, and specificity you provide,
          the better the result.
        </p>

        <PromptComparison />
      </section>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8 mt-8" style={{ borderTop: '1px solid var(--cw-border)' }}>
        <Link
          href="/ai-basics/models"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all pill-btn"
        >
          <ArrowLeft size={16} /> Models
        </Link>
        <Link
          href="/prompt-engineering"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:gap-3"
          style={{ background: 'var(--cw-primary)', color: '#fff' }}
        >
          Next: Prompt Engineering <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

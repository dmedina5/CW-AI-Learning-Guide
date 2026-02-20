'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card, CardGrid } from '@/components/content/Card';
import { Callout } from '@/components/content/Callout';
import { TierBadge } from '@/components/content/TierBadge';
import { ContextDemo } from '@/components/interactive/ContextDemo';
import { ContextLayers } from '@/components/interactive/ContextLayers';
import { PromptComparison } from '@/components/interactive/PromptComparison';
import { InnovationFlywheel } from '@/components/interactive/InnovationFlywheel';

export default function AIBasicsPage() {
  return (
    <div>
      <TierBadge tier="beginner" />
      <h1 className="mt-4 mb-4">What Is AI?</h1>
      <p className="mb-12">It&apos;s not magic. It&apos;s prediction.</p>

      {/* Section: Core Concept */}
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

      {/* Section: Models */}
      <section className="mb-16" id="models">
        <div className="section-label">Key Vocabulary</div>
        <h2 className="mb-4">
          What is a <span className="text-highlight">model</span>?
        </h2>
        <p className="mb-6">
          A model is a giant accumulation of knowledge. <strong>Inference</strong> is how well it
          reasons. Here are the leading models:
        </p>

        <div className="flex flex-wrap gap-4 mb-6">
          {[
            { name: 'Claude', org: 'Anthropic · Opus, Sonnet, Haiku', color: '#D97706' },
            { name: 'ChatGPT / GPT-5', org: 'OpenAI · 400K context window', color: '#10A37F' },
            { name: 'Gemini', org: 'Google DeepMind · 1M context', color: '#4285F4' },
            { name: 'Grok', org: 'xAI · Real-time X integration', color: '#1A1A2E' },
            { name: 'DeepSeek', org: 'Open-source challenger', color: '#0066FF' },
            { name: 'Llama', org: 'Meta · Open-weight', color: '#7C3AED' },
          ].map(model => (
            <div
              key={model.name}
              className="flex items-center gap-3.5 px-5 py-4 rounded-xl min-w-[200px] flex-1 transition-colors"
              style={{ background: 'var(--cw-surface)', border: '1px solid var(--cw-border)' }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-extrabold text-white flex-shrink-0"
                style={{ background: model.color }}
              >
                {model.name[0]}
              </div>
              <div>
                <h3 className="text-base font-semibold mb-0.5">{model.name}</h3>
                <p className="text-xs" style={{ color: 'var(--cw-ink-muted)' }}>{model.org}</p>
              </div>
            </div>
          ))}
        </div>

        <Callout variant="purple">
          <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
            <span className="text-highlight">Context and detailed prompts</span> produce better
            output regardless of model. More context = better prediction.
          </p>
        </Callout>
      </section>

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
            {[
              'Following prescriptive, well-defined processes',
              'Processing and summarizing large volumes of information',
              'Drafting content, organizing ideas, formatting',
              'Repetitive tasks executed consistently at scale',
              'Pattern recognition and data analysis',
            ].map((item, i) => (
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
            {[
              'Wiring processes together in business-sensible ways',
              'Understanding organizational context and priorities',
              'Judgment calls requiring experience and empathy',
              'Knowing what "good" looks like for your team',
              'Self-correction without human guardrails',
            ].map((item, i) => (
              <div key={i} className="flex items-baseline gap-2.5 my-2.5 text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: 'var(--cw-warning)' }} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Your Role */}
      <section className="mb-16">
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

      {/* Better Prompts */}
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

      {/* Next lesson */}
      <div className="flex justify-between items-center pt-8 mt-8" style={{ borderTop: '1px solid var(--cw-border)' }}>
        <div />
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

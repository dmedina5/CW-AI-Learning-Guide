'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Callout } from '@/components/content/Callout';
import { TierBadge } from '@/components/content/TierBadge';

const MODELS = [
  { name: 'Claude', org: 'Anthropic · Opus, Sonnet, Haiku', color: '#D97706' },
  { name: 'ChatGPT / GPT-5', org: 'OpenAI · 400K context window', color: '#10A37F' },
  { name: 'Gemini', org: 'Google DeepMind · 1M context', color: '#4285F4' },
  { name: 'Grok', org: 'xAI · Real-time X integration', color: '#1A1A2E' },
  { name: 'DeepSeek', org: 'Open-source challenger', color: '#0066FF' },
  { name: 'Llama', org: 'Meta · Open-weight', color: '#7C3AED' },
];

export default function ModelsPage() {
  return (
    <div>
      <TierBadge tier="beginner" />
      <h1 className="mt-4 mb-4">AI Models</h1>
      <p className="mb-12">A model is a giant accumulation of knowledge. Inference is how well it reasons.</p>

      {/* Section: What is a Model */}
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
          {MODELS.map(model => (
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

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8 mt-8" style={{ borderTop: '1px solid var(--cw-border)' }}>
        <Link
          href="/ai-basics/innovation"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all pill-btn"
        >
          <ArrowLeft size={16} /> Innovation Flywheel
        </Link>
        <Link
          href="/ai-basics/strengths"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:gap-3"
          style={{ background: 'var(--cw-primary)', color: '#fff' }}
        >
          Next: Strengths & Limits <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { TierBadge } from '@/components/content/TierBadge';
import { PromptBuilder } from '@/components/interactive/PromptBuilder';

export default function PromptBuilderPage() {
  return (
    <div>
      <TierBadge tier="intermediate" />
      <h1 className="mt-4 mb-4">Prompt Builder</h1>
      <p className="mb-8">
        Build powerful, structured prompts interactively. Choose Simple Mode for quick everyday
        tasks, or Advanced Mode for the full GRIP framework. Both are tuned for the Claude 5
        models: put your effort into Context and Specifics, and leave Role blank unless it adds a
        lens the facts don&apos;t already imply &mdash; see{' '}
        <Link href="/context-engineering#claude5" className="text-highlight" style={{ textDecoration: 'underline' }}>Context Engineering</Link>{' '}
        for why.
      </p>

      <PromptBuilder />

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8 mt-8" style={{ borderTop: '1px solid var(--cw-border)' }}>
        <Link
          href="/prompt-engineering"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all pill-btn"
        >
          <ArrowLeft size={16} /> Prompt Engineering
        </Link>
        <Link
          href="/claude-cowork"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:gap-3"
          style={{ background: 'var(--cw-primary)', color: '#fff' }}
        >
          Next: Claude Cowork <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

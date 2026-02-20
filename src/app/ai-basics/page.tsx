'use client';

import Link from 'next/link';
import { ArrowRight, Lightbulb, Layers, RotateCcw, Cpu, Scale } from 'lucide-react';
import { Card, CardGrid } from '@/components/content/Card';
import { Callout } from '@/components/content/Callout';
import { TierBadge } from '@/components/content/TierBadge';

const SUBTOPICS = [
  {
    title: 'Core Concepts',
    description: 'AI is a prediction engine — no magic, no consciousness. Understand the foundational idea behind every AI tool.',
    href: '/ai-basics/core-concepts',
    icon: Lightbulb,
  },
  {
    title: 'How It Works',
    description: 'Context shapes prediction. See how AI uses your input as a lens, and try an interactive demo yourself.',
    href: '/ai-basics/how-it-works',
    icon: Layers,
  },
  {
    title: 'Innovation Flywheel',
    description: 'AI breakthroughs build better AI, which enables more breakthroughs. The pace of change is accelerating.',
    href: '/ai-basics/innovation',
    icon: RotateCcw,
  },
  {
    title: 'Models',
    description: 'What is a model? Meet the leading AI models — Claude, GPT, Gemini, Grok, DeepSeek, and Llama.',
    href: '/ai-basics/models',
    icon: Cpu,
  },
  {
    title: 'Strengths & Limits',
    description: 'Where AI shines, where it doesn\'t, and where you step in. An honest assessment plus your role in the loop.',
    href: '/ai-basics/strengths',
    icon: Scale,
  },
];

export default function AIBasicsPage() {
  return (
    <div>
      <TierBadge tier="beginner" />
      <h1 className="mt-4 mb-4">What Is AI?</h1>
      <p className="mb-8">It&apos;s not magic. It&apos;s prediction.</p>

      <Callout variant="purple">
        <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
          Everything an AI does boils down to: <em>&ldquo;Given what I&apos;ve seen, what&apos;s
          the most likely thing that should come next?&rdquo;</em> This section breaks that idea
          down into digestible pieces.
        </p>
      </Callout>

      <div className="mt-12 mb-12">
        <h2 className="mb-6">Topics</h2>
        <CardGrid columns={2}>
          {SUBTOPICS.map((topic) => {
            const Icon = topic.icon;
            return (
              <Link key={topic.href} href={topic.href} className="block no-underline">
                <Card className="h-full transition-all hover:scale-[1.02]">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'var(--cw-primary)', color: '#fff' }}
                    >
                      <Icon size={20} />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2">{topic.title}</h3>
                      <p className="text-sm" style={{ color: 'var(--cw-ink-muted)' }}>
                        {topic.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </CardGrid>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8 mt-8" style={{ borderTop: '1px solid var(--cw-border)' }}>
        <div />
        <Link
          href="/ai-basics/core-concepts"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:gap-3"
          style={{ background: 'var(--cw-primary)', color: '#fff' }}
        >
          Start: Core Concepts <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

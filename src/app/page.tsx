'use client';

import Link from 'next/link';
import {
  Brain, MessageSquare, Wand2, Code2, Bot,
  Briefcase, BookOpen, ArrowRight, Sparkles,
} from 'lucide-react';
import { Card, CardGrid } from '@/components/content/Card';
import { Callout } from '@/components/content/Callout';
import { TierBadge } from '@/components/content/TierBadge';
import { TIERS } from '@/lib/constants';

const LEARNING_PATH = [
  {
    tier: 'beginner' as const,
    title: 'Foundations',
    description: 'Understanding what AI is, how it works, and where it fits into your role.',
    links: [
      { label: 'AI Basics', href: '/ai-basics', icon: Brain },
      { label: 'Prompt Engineering', href: '/prompt-engineering', icon: MessageSquare },
      { label: 'Getting Started', href: '/vibe-coding', icon: Code2 },
    ],
  },
  {
    tier: 'intermediate' as const,
    title: 'Core Skills',
    description: 'Deeper prompting strategies, tools, and applying AI to your specific workflow.',
    links: [
      { label: 'CRISP Framework', href: '/prompt-engineering#crisp', icon: MessageSquare },
      { label: 'Prompt Builder', href: '/prompt-builder', icon: Wand2 },
      { label: 'Fundamentals', href: '/vibe-coding/fundamentals', icon: Code2 },
    ],
  },
  {
    tier: 'expert' as const,
    title: 'Mastery',
    description: 'Power-user techniques, proven workflows, and CW-specific use cases.',
    links: [
      { label: 'Workflows', href: '/vibe-coding/workflows', icon: Code2 },
      { label: 'Use Cases', href: '/use-cases', icon: Briefcase },
      { label: 'Tips & Tricks', href: '/vibe-coding/tips', icon: Sparkles },
    ],
  },
  {
    tier: 'advanced' as const,
    title: 'The Frontier',
    description: 'Agentic workflows, multi-agent orchestration, and building AI systems.',
    links: [
      { label: 'Agentic AI', href: '/agentic-ai', icon: Bot },
      { label: 'Resources', href: '/resources', icon: BookOpen },
    ],
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <div className="text-center mb-16">
        <img
          src="https://coverwhale.com/hubfs/CoverWhale_Purple.png"
          alt="Cover Whale"
          className="h-12 mx-auto mb-8 opacity-60"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />

        <div className="flex items-center justify-center gap-3 mb-6">
          <span
            className="text-[10px] uppercase font-bold tracking-widest px-4 py-1.5 rounded-full"
            style={{ background: 'var(--cw-primary-light)', color: 'var(--cw-primary)' }}
          >
            Internal Platform
          </span>
          <span
            className="text-[10px] uppercase font-bold tracking-widest px-4 py-1.5 rounded-full"
            style={{ background: 'var(--cw-surface)', border: '1px solid var(--cw-border)', color: 'var(--cw-ink-muted)' }}
          >
            2026
          </span>
        </div>

        <h1 className="mb-4">AI Learning Platform</h1>
        <p className="text-xl max-w-2xl mx-auto mb-8" style={{ color: 'var(--cw-ink-secondary)' }}>
          Demystifying AI &amp; building our future together. A structured learning program
          for <strong>every role</strong> at Cover Whale &mdash; no technical background required.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <Link
            href="/ai-basics"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold text-sm transition-all hover:opacity-90 hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, var(--cw-primary-dark), var(--cw-primary))' }}
          >
            Start Learning <ArrowRight size={16} />
          </Link>
          <Link
            href="/prompt-builder"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all pill-btn"
          >
            <Wand2 size={16} /> Prompt Builder
          </Link>
        </div>
      </div>

      {/* Why AI matters */}
      <div className="mb-16">
        <div className="section-label">Why we&apos;re here</div>
        <h2 className="mb-4">AI isn&apos;t coming &mdash; it&apos;s already here</h2>
        <p className="mb-6">
          This platform removes the mystery, cuts through the hype, and gives every person at
          Cover Whale the confidence to start leveraging AI <span className="text-highlight">today</span>.
        </p>

        <CardGrid columns={3}>
          <Card number="01">
            <h3 className="mb-2">Understand</h3>
            <p className="text-base" style={{ color: 'var(--cw-ink-muted)' }}>
              What AI actually is &mdash; and isn&apos;t. No jargon, no magic.
            </p>
          </Card>
          <Card number="02">
            <h3 className="mb-2">Navigate</h3>
            <p className="text-base" style={{ color: 'var(--cw-ink-muted)' }}>
              What AI is good at, what it&apos;s bad at, and where you come in.
            </p>
          </Card>
          <Card number="03">
            <h3 className="mb-2">Leverage</h3>
            <p className="text-base" style={{ color: 'var(--cw-ink-muted)' }}>
              Practical ways to use AI for personal efficiency and team productivity.
            </p>
          </Card>
        </CardGrid>
      </div>

      {/* Learning Path */}
      <div className="mb-16">
        <div className="section-label">Your learning path</div>
        <h2 className="mb-4">Structured for every skill level</h2>
        <p className="mb-8">
          Follow the path from Foundations to Frontier, or jump to any section that matches your
          current level. Learn at your own pace.
        </p>

        <div className="space-y-4">
          {LEARNING_PATH.map((stage, index) => {
            const config = TIERS[stage.tier];
            return (
              <div
                key={stage.tier}
                className="flex items-start gap-6 p-6 rounded-2xl transition-colors"
                style={{
                  background: 'var(--cw-surface)',
                  border: '1px solid var(--cw-border)',
                  borderLeft: `3px solid ${config.color}`,
                }}
              >
                <div
                  className="text-sm font-bold flex-shrink-0"
                  style={{ color: config.color }}
                >
                  {index === 0 ? 'Start' : index === LEARNING_PATH.length - 1 ? 'Goal' : '→'}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg">{stage.title}</h3>
                    <TierBadge tier={stage.tier} size="sm" />
                  </div>
                  <p className="text-sm mb-3" style={{ color: 'var(--cw-ink-muted)' }}>
                    {stage.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {stage.links.map(link => {
                      const Icon = link.icon;
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors hover:bg-white/30"
                          style={{
                            background: 'rgba(255,255,255,0.3)',
                            color: 'var(--cw-ink-secondary)',
                          }}
                        >
                          <Icon size={12} />
                          {link.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Collaboration credit */}
      <Callout variant="purple">
        <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
          <strong>Built with AI:</strong> This platform was created using Claude Code
          &mdash; a real-world example of the tools you&apos;ll learn to use here.
        </p>
      </Callout>
    </div>
  );
}

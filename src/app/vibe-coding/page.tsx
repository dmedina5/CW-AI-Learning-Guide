'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Card, CardGrid } from '@/components/content/Card';
import { Callout } from '@/components/content/Callout';
import { CodeBlock } from '@/components/content/CodeBlock';
import { TierBadge } from '@/components/content/TierBadge';

export default function VibeCodingPage() {
  return (
    <div>
      <TierBadge tier="beginner" />
      <h1 className="mt-4 mb-4">Getting Started with Vibe Coding</h1>
      <p className="mb-12">
        Describe what you want in plain English, and let an AI assistant help you create it.
      </p>

      {/* Section: What is Vibe Coding */}
      <section className="mb-16" id="definition">
        <div className="section-label">Core Concept</div>
        <h2 className="mb-4">
          What is <span className="text-highlight">Vibe Coding</span>?
        </h2>
        <p className="mb-6">
          Vibe Coding is a new way of working where you describe what you want to accomplish
          in plain English, and an AI assistant helps you create it. Instead of learning complex
          technical skills, you simply explain your goal &mdash; like &ldquo;create a summary of
          this data&rdquo; or &ldquo;build a presentation about Q4 results&rdquo; &mdash; and the
          AI helps make it happen.
        </p>

        <Callout variant="purple">
          <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
            Think of it like having a <span className="text-highlight">smart assistant</span> who
            can understand your requests, ask clarifying questions, and do the heavy lifting while
            you guide the direction.
          </p>
        </Callout>
      </section>

      {/* Section: Claude Code */}
      <section className="mb-16" id="claude-code">
        <div className="section-label">Our AI Tool</div>
        <h2 className="mb-4">
          Meet <span className="text-highlight">Claude Code</span>
        </h2>
        <p className="mb-6">
          At Cover Whale, we use <strong>Claude Code</strong> by Anthropic as our primary AI tool.
          Claude Code is like having a brilliant colleague who can analyze complex situations,
          think through problems carefully, and provide well-reasoned solutions.
        </p>

        <div
          className="rounded-2xl p-8 mb-6"
          style={{
            background: 'var(--cw-surface)',
            border: '1px solid var(--cw-border)',
            borderLeft: '4px solid #D97706',
          }}
        >
          <h3 className="mb-2" style={{ color: '#D97706' }}>Claude Code</h3>
          <p className="text-sm font-semibold mb-3" style={{ color: 'var(--cw-ink-muted)' }}>
            The Thoughtful Problem-Solver
          </p>
          <p className="text-base mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
            Claude Code is an agent that lives in your terminal. It can read files, write code,
            run commands, and plan complex tasks &mdash; all while asking for your approval at
            each step. It excels at understanding context and giving detailed, thoughtful responses.
          </p>
          <div className="flex flex-col gap-1.5">
            <div className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
              <strong>Strengths:</strong> Deep reasoning, code quality, careful analysis, plan mode
            </div>
            <div className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
              <strong>Best For:</strong> Complex tasks, problem-solving, debugging, code review
            </div>
          </div>
        </div>

        <h3 className="mb-4">What Claude Code Can Do</h3>
        <Card className="mb-4">
          <h4 className="mb-3" style={{ color: 'var(--cw-ink)' }}>Business &amp; Non-Technical Tasks</h4>
          <div className="space-y-2">
            {[
              '"Help me create talking points for my brand presentation."',
              '"I have data in 5 Excel sheets - help me combine and analyze them."',
              '"Draft an email to explain this policy change to our partners."',
              '"Review this document and suggest improvements."',
              '"Help me organize this messy spreadsheet into a clean format."',
              '"Create a summary of these meeting notes."',
            ].map((item, i) => (
              <div key={i} className="flex items-baseline gap-2.5 text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: 'var(--cw-primary)' }} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h4 className="mb-3" style={{ color: 'var(--cw-ink)' }}>Technical Tasks</h4>
          <div className="space-y-2">
            {[
              '"Debug this error message I keep getting."',
              '"Review this code change before we release it."',
              '"Explain how this part of our system works."',
              '"Help me plan how to update this old feature."',
            ].map((item, i) => (
              <div key={i} className="flex items-baseline gap-2.5 text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: 'var(--cw-primary)' }} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </Card>

        <Callout variant="purple" className="mt-6">
          <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
            <strong>Quick Start:</strong> Download the Claude Desktop App from{' '}
            <a href="https://claude.ai/download" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cw-primary)' }}>
              claude.ai/download
            </a>{' '}
            for the easiest experience, or install the CLI with:
          </p>
        </Callout>

        <CodeBlock
          title="Claude Code Installation"
          code={`npm install -g @anthropic-ai/claude-code
claude`}
        />
      </section>

      {/* Section: Quick Start */}
      <section className="mb-16" id="quick-start">
        <div className="section-label">Get Going</div>
        <h2 className="mb-4">
          Quick <span className="text-highlight">Start</span>
        </h2>
        <p className="mb-6">
          Ready to start vibe coding? Follow the installation guide for step-by-step setup instructions
          for Claude Code on your platform.
        </p>

        <CardGrid columns={3}>
          <Card number="01">
            <h3 className="mb-2">Install Claude</h3>
            <p className="text-base" style={{ color: 'var(--cw-ink-muted)' }}>
              Follow the installation guide to set up Claude Code on Windows, Mac, or Linux.
            </p>
          </Card>
          <Card number="02">
            <h3 className="mb-2">Authenticate</h3>
            <p className="text-base" style={{ color: 'var(--cw-ink-muted)' }}>
              Log in with your Claude Pro/Max account or API key provided by IT.
            </p>
          </Card>
          <Card number="03">
            <h3 className="mb-2">Start Asking</h3>
            <p className="text-base" style={{ color: 'var(--cw-ink-muted)' }}>
              Navigate to your project folder and start describing what you need in plain English.
            </p>
          </Card>
        </CardGrid>

        <div className="mt-8">
          <Link
            href="/vibe-coding/installation"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all hover:gap-3"
            style={{ background: 'var(--cw-primary)', color: '#fff' }}
          >
            Go to Installation Guide <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8 mt-8" style={{ borderTop: '1px solid var(--cw-border)' }}>
        <Link
          href="/prompt-builder"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all pill-btn"
        >
          <ArrowLeft size={16} /> Prompt Builder
        </Link>
        <Link
          href="/vibe-coding/installation"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:gap-3"
          style={{ background: 'var(--cw-primary)', color: '#fff' }}
        >
          Next: Installation <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

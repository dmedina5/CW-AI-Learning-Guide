'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Card, CardGrid } from '@/components/content/Card';
import { Callout } from '@/components/content/Callout';
import { CodeBlock } from '@/components/content/CodeBlock';
import { StepList } from '@/components/content/StepList';
import { TierBadge } from '@/components/content/TierBadge';

export default function FundamentalsPage() {
  return (
    <div>
      <TierBadge tier="intermediate" />
      <h1 className="mt-4 mb-4">Fundamentals</h1>
      <p className="mb-12">
        Understanding the mental models, context management, and foundational setup for
        effective AI-augmented development with Claude Code.
      </p>

      {/* Section: Mental Models */}
      <section className="mb-16" id="mental-model">
        <div className="section-label">How Claude Thinks</div>
        <h2 className="mb-4">
          Mental <span className="text-highlight">Model</span>
        </h2>

        <p className="mb-6" style={{ color: 'var(--cw-ink-secondary)' }}>
          Claude Code is not a chatbot; it is an <strong>agent in your terminal</strong>.
          Think of it as a very capable junior developer who needs clear direction and context.
        </p>

        <Callout variant="purple" className="mb-6">
          <p className="text-base font-semibold mb-2" style={{ color: 'var(--cw-ink-secondary)' }}>How Claude Thinks</p>
          <div className="space-y-1.5">
            {[
              'Reads files to understand your codebase',
              'Plans before executing (especially in plan mode)',
              'Asks permission before making changes',
              'Maintains context within a session',
            ].map((item, i) => (
              <div key={i} className="flex items-baseline gap-2 text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: 'var(--cw-primary)' }} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </Callout>

        <Card className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <h3>The 20-Turn Cliff</h3>
            <TierBadge tier="intermediate" size="sm" />
          </div>
          <p className="text-base mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
            Claude&apos;s reasoning quality can degrade after approximately 20 back-and-forth turns.
            The context gets polluted with false starts and corrections. When you notice confusion:
          </p>
          <CodeBlock code={`# Reset the session while keeping CLAUDE.md context
/reset

# Or start fresh with compacted context
/compact`} />
        </Card>

        <Callout variant="purple" className="mb-6">
          <p className="text-base font-semibold mb-2" style={{ color: 'var(--cw-ink-secondary)' }}>Context Hygiene Rules</p>
          <div className="space-y-1.5">
            {[
              'Start fresh for new tasks',
              'Be specific about what you need',
              'Add relevant files explicitly',
              'Clear context when switching tasks',
            ].map((item, i) => (
              <div key={i} className="flex items-baseline gap-2 text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
                <span className="font-bold" style={{ color: 'var(--cw-primary)' }}>{i + 1}.</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </Callout>
      </section>

      {/* Section: Config Files */}
      <section className="mb-16" id="config-files">
        <div className="section-label">Context Architecture</div>
        <h2 className="mb-4">
          Configuration <span className="text-highlight">Files</span>
        </h2>

        <p className="mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
          <code>CLAUDE.md</code> is Claude&apos;s map to your project. It is automatically read
          at session start and provides persistent context.
        </p>

        <CodeBlock
          title="CLAUDE.md Locations"
          code={`# Project root (recommended)
./CLAUDE.md

# User-level (for personal preferences)
~/.claude/CLAUDE.md`}
        />

        <CodeBlock
          title="Example CLAUDE.md"
          code={`# Project: CW Premium Calculator

## Overview
This is a TypeScript monorepo for insurance premium calculations.
We use pnpm workspaces, Vitest for testing, and Prisma for ORM.

## Build Commands
- \`pnpm install\` - Install dependencies
- \`pnpm build\` - Build all packages
- \`pnpm test\` - Run tests
- \`pnpm lint\` - Run linting

## Architecture
- /packages/core - Business logic
- /packages/api - Express REST API
- /packages/web - Next.js frontend

## Conventions
- Use explicit types, avoid \`any\`
- Tests go in \`__tests__\` folders
- Prefer functional patterns

## Important Files
- packages/core/src/premium.ts - Main calculation logic
- packages/api/src/routes/quote.ts - Quote API endpoint`}
        />

        <Card className="mt-6">
          <h4 className="mb-3">4-Level Signal Framework</h4>
          <p className="text-sm mb-3" style={{ color: 'var(--cw-ink-muted)' }}>
            Structure your CLAUDE.md with different signal levels:
          </p>
          <StepList
            steps={[
              { title: 'Critical', description: 'Must-know info (build commands, architecture)' },
              { title: 'Important', description: 'Project conventions, key files' },
              { title: 'Contextual', description: 'Current sprint focus, recent changes' },
              { title: 'Nice-to-have', description: 'Historical decisions, future plans' },
            ]}
          />
        </Card>

        <div className="mt-8">
          <h3 className="mb-4">Understanding Markdown Files (.md)</h3>
          <p className="mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
            Markdown files are the <strong>lingua franca of vibe coding</strong>. They are plain
            text files with simple formatting that both humans and AI agents can easily read and write.
          </p>

          <Callout variant="purple" className="mb-6">
            <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
              When you write instructions in a .md file, AI agents parse them more reliably than
              other formats. The structured nature of markdown (headers, lists, code blocks) helps
              agents understand hierarchy and intent.
            </p>
          </Callout>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm" style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
              <thead>
                <tr>
                  <th className="text-left p-3 font-semibold" style={{ background: 'var(--cw-surface)', borderBottom: '2px solid var(--cw-border)', color: 'var(--cw-ink)' }}>File</th>
                  <th className="text-left p-3 font-semibold" style={{ background: 'var(--cw-surface)', borderBottom: '2px solid var(--cw-border)', color: 'var(--cw-ink)' }}>Purpose</th>
                  <th className="text-left p-3 font-semibold" style={{ background: 'var(--cw-surface)', borderBottom: '2px solid var(--cw-border)', color: 'var(--cw-ink)' }}>Who Reads It</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { file: 'CLAUDE.md', purpose: 'Project context for Claude Code', reader: 'Claude (auto-loaded)' },
                  { file: 'README.md', purpose: 'Project overview and setup', reader: 'Humans + AI' },
                  { file: 'PLAN.md', purpose: 'Implementation strategy', reader: 'AI agents executing tasks' },
                  { file: 'TODO.md', purpose: 'Task tracking with checkboxes', reader: 'AI agents (can update)' },
                ].map((row, i) => (
                  <tr key={i}>
                    <td className="p-3" style={{ borderBottom: '1px solid var(--cw-border)', color: 'var(--cw-primary)' }}><code>{row.file}</code></td>
                    <td className="p-3" style={{ borderBottom: '1px solid var(--cw-border)', color: 'var(--cw-ink-secondary)' }}>{row.purpose}</td>
                    <td className="p-3" style={{ borderBottom: '1px solid var(--cw-border)', color: 'var(--cw-ink-muted)' }}>{row.reader}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section: Permission System */}
      <section className="mb-16" id="permissions">
        <div className="section-label">Safety</div>
        <h2 className="mb-4">
          Permission <span className="text-highlight">System</span>
        </h2>
        <p className="mb-6" style={{ color: 'var(--cw-ink-secondary)' }}>
          Claude asks permission before potentially destructive actions. You can configure autonomy levels.
        </p>

        <CodeBlock
          title="Permission Commands"
          code={`# Check current permissions
/permissions

# Run with full autonomy (careful!)
claude --dangerously-skip-permissions

# Alias for convenience
alias cc='claude --dangerously-skip-permissions'`}
        />

        <Callout variant="warning" className="mt-4">
          <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
            <strong>Danger Mode Warning:</strong> Only use <code>--dangerously-skip-permissions</code> on projects
            where you are comfortable with Claude making changes without asking. Never use this on production
            codebases without careful consideration.
          </p>
        </Callout>

        <div className="mt-8">
          <h3 className="mb-4">Autonomy Tradeoffs</h3>
          <CardGrid columns={2}>
            <div
              className="rounded-2xl p-8"
              style={{
                background: 'var(--cw-surface)',
                border: '1px solid var(--cw-border)',
                borderLeft: '4px solid var(--cw-warning)',
              }}
            >
              <h4 className="mb-3">High Oversight</h4>
              <p className="text-sm mb-2" style={{ color: 'var(--cw-ink-muted)' }}>
                <strong>When:</strong> New codebases, critical code, learning the tools
              </p>
              <div className="space-y-1">
                {['Review each change', 'Approve file operations', 'Step-by-step execution'].map((item, i) => (
                  <div key={i} className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>- {item}</div>
                ))}
              </div>
            </div>
            <div
              className="rounded-2xl p-8"
              style={{
                background: 'var(--cw-surface)',
                border: '1px solid var(--cw-border)',
                borderLeft: '4px solid var(--cw-success)',
              }}
            >
              <h4 className="mb-3">Low Oversight</h4>
              <p className="text-sm mb-2" style={{ color: 'var(--cw-ink-muted)' }}>
                <strong>When:</strong> Familiar codebase, repetitive tasks, trusted patterns
              </p>
              <div className="space-y-1">
                {['Batch operations', 'Auto-approve reads', 'Let agent iterate'].map((item, i) => (
                  <div key={i} className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>- {item}</div>
                ))}
              </div>
            </div>
          </CardGrid>
        </div>
      </section>

      {/* Section: Effective Prompts */}
      <section className="mb-16" id="prompts">
        <div className="section-label">Giving Good Instructions</div>
        <h2 className="mb-4">
          Effective <span className="text-highlight">Prompt Patterns</span>
        </h2>

        <Card className="mb-4">
          <h3 className="mb-3">The Task Pattern</h3>
          <CodeBlock code={`# Bad: Vague request
"Help me with the login"

# Good: Specific task
"In src/auth/login.ts, the login function throws an error
when the user doesn't exist. Instead of throwing, it should
return { success: false, error: 'USER_NOT_FOUND' }"`} />
        </Card>

        <Card className="mb-4">
          <h3 className="mb-3">The Context Pattern</h3>
          <CodeBlock code={`"I'm working on the premium calculation module.
The current implementation uses a simple multiplier,
but we need to add tiered pricing based on coverage amount.

Here's the current code: [paste or reference file]

Please update it to use tiered pricing where:
- $0-50k: 1.0x multiplier
- $50k-100k: 0.95x multiplier
- $100k+: 0.90x multiplier"`} />
        </Card>

        <Card className="mb-4">
          <h3 className="mb-3">The Checklist Pattern</h3>
          <TierBadge tier="intermediate" size="sm" />
          <div className="mt-3">
            <CodeBlock code={`"I need to add user authentication. Please:

1. Create a new auth middleware in src/middleware/
2. Add login/logout routes to src/routes/auth.ts
3. Create a User model if it doesn't exist
4. Add JWT token handling
5. Update the API documentation

After each step, show me what you did and wait for approval."`} />
          </div>
        </Card>

        <Card>
          <h3 className="mb-3">File Reference Patterns</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
              <thead>
                <tr>
                  <th className="text-left p-3 font-semibold" style={{ background: 'var(--cw-surface)', borderBottom: '2px solid var(--cw-border)', color: 'var(--cw-ink)' }}>Pattern</th>
                  <th className="text-left p-3 font-semibold" style={{ background: 'var(--cw-surface)', borderBottom: '2px solid var(--cw-border)', color: '#D97706' }}>Claude Code</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { pattern: 'Add file to context', claude: '/add path/to/file.ts' },
                  { pattern: 'Read file', claude: '"Read src/app.ts"' },
                  { pattern: 'Multiple files', claude: '/add src/*.ts' },
                ].map((row, i) => (
                  <tr key={i}>
                    <td className="p-3 font-medium" style={{ borderBottom: '1px solid var(--cw-border)', color: 'var(--cw-ink)' }}>{row.pattern}</td>
                    <td className="p-3 font-mono text-xs" style={{ borderBottom: '1px solid var(--cw-border)', color: 'var(--cw-ink-secondary)' }}>{row.claude}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8 mt-8" style={{ borderTop: '1px solid var(--cw-border)' }}>
        <Link
          href="/vibe-coding/installation"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all pill-btn"
        >
          <ArrowLeft size={16} /> Installation
        </Link>
        <Link
          href="/vibe-coding/workflows"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:gap-3"
          style={{ background: 'var(--cw-primary)', color: '#fff' }}
        >
          Next: Workflows <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

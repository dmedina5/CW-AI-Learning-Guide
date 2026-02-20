'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Card, CardGrid } from '@/components/content/Card';
import { Callout } from '@/components/content/Callout';
import { CodeBlock } from '@/components/content/CodeBlock';
import { TierBadge } from '@/components/content/TierBadge';

export default function WorkflowsPage() {
  return (
    <div>
      <TierBadge tier="expert" />
      <h1 className="mt-4 mb-4">Workflows</h1>
      <p className="mb-12">
        Proven workflow patterns for effective AI-augmented development with Claude Code.
      </p>

      {/* Section: Explore-Plan-Execute */}
      <section className="mb-16" id="explore-plan-execute">
        <div className="section-label">Core Workflow</div>
        <h2 className="mb-4">
          Explore &mdash; Plan &mdash; Execute &mdash; <span className="text-highlight">Commit</span>
        </h2>
        <p className="mb-6" style={{ color: 'var(--cw-ink-secondary)' }}>
          The fundamental workflow for any development task with Claude Code. Each phase builds on the last,
          ensuring high-quality output.
        </p>

        <CardGrid columns={4}>
          <Card number="01">
            <h3 className="mb-2">Explore</h3>
            <p className="text-sm mb-3" style={{ color: 'var(--cw-ink-muted)' }}>
              Understand the codebase and current state
            </p>
            <div className="p-3 rounded-lg font-mono text-xs" style={{ background: 'var(--cw-primary-light)' }}>
              /add relevant/files.ts<br />
              &ldquo;Explain how X works&rdquo;
            </div>
          </Card>
          <Card number="02">
            <h3 className="mb-2">Plan</h3>
            <p className="text-sm mb-3" style={{ color: 'var(--cw-ink-muted)' }}>
              Design the solution before implementing
            </p>
            <div className="p-3 rounded-lg font-mono text-xs" style={{ background: 'var(--cw-primary-light)' }}>
              (Shift+Tab)<br />
              &ldquo;Create a plan to...&rdquo;
            </div>
          </Card>
          <Card number="03">
            <h3 className="mb-2">Execute</h3>
            <p className="text-sm mb-3" style={{ color: 'var(--cw-ink-muted)' }}>
              Implement the changes incrementally
            </p>
            <div className="p-3 rounded-lg font-mono text-xs" style={{ background: 'var(--cw-primary-light)' }}>
              (Shift+Tab)<br />
              &ldquo;Execute step 1&rdquo;
            </div>
          </Card>
          <Card number="04">
            <h3 className="mb-2">Commit</h3>
            <p className="text-sm mb-3" style={{ color: 'var(--cw-ink-muted)' }}>
              Review and commit changes
            </p>
            <div className="p-3 rounded-lg font-mono text-xs" style={{ background: 'var(--cw-primary-light)' }}>
              &ldquo;Review changes and<br />
              create a commit message&rdquo;
            </div>
          </Card>
        </CardGrid>
      </section>

      {/* Section: Checklist-Driven Development */}
      <section className="mb-16" id="checklist">
        <div className="section-label">Advanced Pattern</div>
        <h2 className="mb-4">
          Checklist-Driven <span className="text-highlight">Development</span>
        </h2>
        <p className="text-base mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
          Break complex tasks into explicit checklists for reliable execution.
        </p>
        <CodeBlock code={`"I need to add user authentication. Create a checklist:

[ ] Create User model
[ ] Add password hashing utility
[ ] Create auth middleware
[ ] Add login/logout routes
[ ] Add session handling
[ ] Create tests

Execute each item one at a time. After completing each,
show me the changes and mark it done. Wait for my approval
before moving to the next item."`} />

        <Callout variant="sage" className="mt-4">
          <p className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
            <strong>Benefits:</strong> Clear progress tracking, easy to pause and resume,
            natural rollback points, prevents scope creep.
          </p>
        </Callout>
      </section>

      {/* Section: The Supervisor Pattern */}
      <section className="mb-16" id="supervisor">
        <div className="section-label">Multi-Instance</div>
        <h2 className="mb-4">
          The <span className="text-highlight">Supervisor</span> Pattern
        </h2>
        <p className="text-base mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
          Use a lightweight agent to maintain high-level progress tracking across
          multiple Claude instances.
        </p>

        <CodeBlock
          title="MASTER_TASKS.md"
          code={`# Project: Payment System Modernization

## Completed
- [x] Analysis of legacy code (Claude, 2026-02-15)
- [x] New module structure (Claude, 2026-02-15)

## In Progress
- [ ] Migrate core functions (Claude, started 2026-02-16)

## Pending
- [ ] Add comprehensive tests
- [ ] Integration testing
- [ ] Documentation update
- [ ] Code review
- [ ] Deployment plan

## Blocked
- [ ] External API integration (waiting on vendor docs)`}
        />

        <Callout variant="purple" className="mt-4">
          <p className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
            The supervisor reviews progress files and assigns the next task
            to the most appropriate Claude instance.
          </p>
        </Callout>
      </section>

      {/* Section: Parallel Instances */}
      <section className="mb-16" id="parallel">
        <div className="section-label">Power User</div>
        <h2 className="mb-4">
          Parallel <span className="text-highlight">Instances</span>
        </h2>
        <p className="mb-6" style={{ color: 'var(--cw-ink-secondary)' }}>
          Run multiple Claude Code sessions in parallel, each with a specialized role.
          Share context between them via files.
        </p>

        <CodeBlock
          title="Multi-Terminal Setup"
          code={`# Terminal 1: Claude (Research)
claude
"Focus on reading and analyzing code only"

# Terminal 2: Claude (Implementation)
claude
"Focus on writing code based on plans"

# Terminal 3: Claude (Testing)
claude
"Focus on running tests and validation"

# Workflow:
# 1. Research Claude investigates
# 2. Writes findings to RESEARCH.md
# 3. Implementation Claude creates plan + executes
# 4. Testing Claude validates changes
# 5. Research Claude reviews results`}
        />
      </section>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8 mt-8" style={{ borderTop: '1px solid var(--cw-border)' }}>
        <Link
          href="/vibe-coding/fundamentals"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all pill-btn"
        >
          <ArrowLeft size={16} /> Fundamentals
        </Link>
        <Link
          href="/vibe-coding/tips"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:gap-3"
          style={{ background: 'var(--cw-primary)', color: '#fff' }}
        >
          Next: Tips &amp; Tricks <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

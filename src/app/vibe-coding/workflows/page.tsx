'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Card, CardGrid } from '@/components/content/Card';
import { Callout } from '@/components/content/Callout';
import { CodeBlock } from '@/components/content/CodeBlock';
import { StepList } from '@/components/content/StepList';
import { TierBadge } from '@/components/content/TierBadge';
import { ToolTabs } from '@/components/content/ToolTabs';

export default function WorkflowsPage() {
  return (
    <div>
      <TierBadge tier="expert" />
      <h1 className="mt-4 mb-4">Workflows</h1>
      <p className="mb-12">
        Proven workflow patterns for effective AI-augmented development. From simple task loops
        to complex multi-agent orchestration.
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

      {/* Section: Gemini Workflow */}
      <section className="mb-16" id="gemini-workflow">
        <div className="section-label">Gemini Pattern</div>
        <h2 className="mb-4">
          Investigate &mdash; Todo &mdash; Execute &mdash; <span className="text-highlight">Verify</span>
        </h2>
        <p className="mb-6" style={{ color: 'var(--cw-ink-secondary)' }}>
          Gemini&apos;s built-in workflow uses sub-agents for complex tasks. It automatically
          delegates to specialized agents for investigation and task tracking.
        </p>

        <CardGrid columns={4}>
          <Card number="01">
            <h3 className="mb-2">Investigate</h3>
            <p className="text-sm mb-3" style={{ color: 'var(--cw-ink-muted)' }}>
              codebase_investigator maps the terrain
            </p>
            <div className="p-3 rounded-lg font-mono text-xs" style={{ background: 'var(--cw-primary-light)' }}>
              &ldquo;Investigate how<br />auth works&rdquo;
            </div>
          </Card>
          <Card number="02">
            <h3 className="mb-2">Todo</h3>
            <p className="text-sm mb-3" style={{ color: 'var(--cw-ink-muted)' }}>
              write_todos creates task list
            </p>
            <div className="p-3 rounded-lg font-mono text-xs" style={{ background: 'var(--cw-primary-light)' }}>
              &ldquo;Create a todo list<br />for adding OAuth&rdquo;
            </div>
          </Card>
          <Card number="03">
            <h3 className="mb-2">Execute</h3>
            <p className="text-sm mb-3" style={{ color: 'var(--cw-ink-muted)' }}>
              Replace and run_shell_command
            </p>
            <div className="p-3 rounded-lg font-mono text-xs" style={{ background: 'var(--cw-primary-light)' }}>
              &ldquo;Execute the todo<br />list step by step&rdquo;
            </div>
          </Card>
          <Card number="04">
            <h3 className="mb-2">Verify</h3>
            <p className="text-sm mb-3" style={{ color: 'var(--cw-ink-muted)' }}>
              Run tests and validate
            </p>
            <div className="p-3 rounded-lg font-mono text-xs" style={{ background: 'var(--cw-primary-light)' }}>
              &ldquo;Run tests and<br />verify changes&rdquo;
            </div>
          </Card>
        </CardGrid>
      </section>

      {/* Section: The Relay Race */}
      <section className="mb-16" id="relay-race">
        <div className="section-label">Multi-Agent</div>
        <h2 className="mb-4">
          The <span className="text-highlight">Relay Race</span> Pattern
        </h2>
        <p className="mb-6" style={{ color: 'var(--cw-ink-secondary)' }}>
          The ultimate workflow: combine the strengths of both tools by handing off work between
          Claude and Gemini at natural breakpoints.
        </p>

        <Callout variant="purple" className="mb-8">
          <p className="text-base font-semibold mb-2" style={{ color: 'var(--cw-ink-secondary)' }}>The Handoff Protocol</p>
          <div className="space-y-1.5">
            {[
              'Claude analyzes and creates a plan',
              'Gemini executes the plan broadly',
              'Claude reviews the results',
              'Repeat until complete',
            ].map((item, i) => (
              <div key={i} className="flex items-baseline gap-2 text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
                <span className="font-bold" style={{ color: 'var(--cw-primary)' }}>{i + 1}.</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </Callout>

        {/* Relay Race Visualization */}
        <div className="flex flex-col gap-6 max-w-3xl mb-8">
          <div
            className="rounded-2xl p-6"
            style={{ background: 'var(--cw-surface)', border: '1px solid var(--cw-border)', borderLeft: '4px solid #D97706' }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(217,119,6,0.1)', color: '#D97706' }}>PHASE 1</span>
              <h4 style={{ color: '#D97706' }}>Analysis (Claude)</h4>
            </div>
            <CodeBlock code={`/add src/legacy/payment.ts

"This legacy payment module needs modernization.
Analyze and create a detailed plan in PLAN.md covering:
1. Current architecture issues
2. Proposed new structure
3. Migration steps
4. Risk assessment
5. Rollback procedures"`} />
          </div>

          <div className="flex justify-center">
            <div className="w-px h-8" style={{ background: 'var(--cw-border)' }} />
          </div>

          <div
            className="rounded-2xl p-6"
            style={{ background: 'var(--cw-surface)', border: '1px solid var(--cw-border)', borderLeft: '4px solid #4285F4' }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(66,133,244,0.1)', color: '#4285F4' }}>PHASE 2</span>
              <h4 style={{ color: '#4285F4' }}>Execution (Gemini)</h4>
            </div>
            <CodeBlock code={`> @PLAN.md @src/legacy/payment.ts

"Execute the plan steps 1-3:
1. Create new module structure
2. Migrate core functions
3. Add new tests

Update PLAN.md with progress after each step."`} />
          </div>

          <div className="flex justify-center">
            <div className="w-px h-8" style={{ background: 'var(--cw-border)' }} />
          </div>

          <div
            className="rounded-2xl p-6"
            style={{ background: 'var(--cw-surface)', border: '1px solid var(--cw-border)', borderLeft: '4px solid #D97706' }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(217,119,6,0.1)', color: '#D97706' }}>PHASE 3</span>
              <h4 style={{ color: '#D97706' }}>Review (Claude)</h4>
            </div>
            <CodeBlock code={`/add PLAN.md
"Show me git diff since last commit"

"Review all changes against the original plan:
1. Are the changes correct?
2. Any missed edge cases?
3. Test coverage adequate?
4. Ready for step 4?"`} />
          </div>
        </div>
      </section>

      {/* Section: Context Handoff */}
      <section className="mb-16" id="handoff">
        <div className="section-label">Agent Switching</div>
        <h2 className="mb-4">
          Context <span className="text-highlight">Handoff</span> Protocol
        </h2>

        <StepList
          steps={[
            {
              title: 'Commit current work',
              description: 'Save your progress with a WIP commit before switching agents',
            },
            {
              title: 'Create handoff document',
              description: 'Write a HANDOFF.md with current state, files changed, and next steps',
            },
            {
              title: 'Start new agent with handoff',
              description: 'Pass the handoff document to the next agent for continuity',
            },
          ]}
        />

        <div className="mt-6">
          <CodeBlock
            title="HANDOFF.md Template"
            code={`## Handoff: Claude -> Gemini
Date: 2026-02-20

### Current State
- Refactored payment validation
- Tests passing

### Files Changed
- src/payment/validate.ts
- src/payment/validate.test.ts

### Next Steps
1. Apply same pattern to src/payment/process.ts
2. Apply to src/payment/refund.ts
3. Run full test suite

### Context
- Using zod for validation
- Following existing error patterns`}
          />
        </div>

        <CodeBlock
          title="Resume in Gemini"
          code={`> @HANDOFF.md "Continue from handoff"`}
        />
      </section>

      {/* Section: Iterative Refinement */}
      <section className="mb-16" id="iterative">
        <div className="section-label">Advanced Patterns</div>
        <h2 className="mb-4">
          Iterative <span className="text-highlight">Refinement</span>
        </h2>

        <ToolTabs>
          {{
            Claude: (
              <div>
                <h3 className="mb-4">Checklist-Driven Development</h3>
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
              </div>
            ),
            Gemini: (
              <div>
                <h3 className="mb-4">Session-Based Development</h3>
                <p className="text-base mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
                  Use Gemini&apos;s checkpointing for long-running tasks.
                </p>
                <CodeBlock code={`# Start new feature session
> /save feature-user-profile-start

# Work on the feature
> @src/models/user.ts "Add profile fields"
> "Create profile API endpoints"
> "Add validation"

# Save progress checkpoint
> /save feature-user-profile-v1

# Next day, resume
> /load feature-user-profile-v1
> "Continue where we left off"

# Save final version
> /save feature-user-profile-complete`} />
              </div>
            ),
            Shared: (
              <div>
                <h3 className="mb-4">The Supervisor Pattern</h3>
                <p className="text-base mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
                  Use a lightweight agent to maintain high-level progress tracking across
                  multiple worker agents.
                </p>

                <CodeBlock
                  title="MASTER_TASKS.md"
                  code={`# Project: Payment System Modernization

## Completed
- [x] Analysis of legacy code (Claude, 2026-02-15)
- [x] New module structure (Gemini, 2026-02-15)

## In Progress
- [ ] Migrate core functions (Gemini, started 2026-02-16)

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
                    The supervisor reviews HANDOFF.md files from worker agents and assigns the next task
                    to the most appropriate worker (Claude for reasoning, Gemini for breadth).
                  </p>
                </Callout>
              </div>
            ),
          }}
        </ToolTabs>
      </section>

      {/* Section: Parallel Instances */}
      <section className="mb-16" id="parallel">
        <div className="section-label">Power User</div>
        <h2 className="mb-4">
          Parallel <span className="text-highlight">Instances</span>
        </h2>

        <CodeBlock
          title="4-Terminal Setup"
          code={`# Terminal 1: Claude (Research)
claude
"Focus on reading and analyzing code only"

# Terminal 2: Claude (Implementation)
claude
"Focus on writing code based on plans"

# Terminal 3: Gemini (Broad operations)
gemini
"Focus on large-scale changes"

# Terminal 4: Gemini (Testing)
gemini
"Focus on running tests and validation"

# Workflow:
# 1. Research Claude investigates
# 2. Writes findings to RESEARCH.md
# 3. Implementation Claude creates plan
# 4. Broad Gemini executes plan
# 5. Testing Gemini validates changes
# 6. Research Claude reviews results`}
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

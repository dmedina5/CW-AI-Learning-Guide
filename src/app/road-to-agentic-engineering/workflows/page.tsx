'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, Terminal, GitBranch, Layers, Users, Cpu, Brain, AlertTriangle } from 'lucide-react';
import { Card, CardGrid } from '@/components/content/Card';
import { Callout } from '@/components/content/Callout';
import { CodeBlock } from '@/components/content/CodeBlock';
import { TierBadge } from '@/components/content/TierBadge';
import { WorkflowSpectrum } from '@/components/interactive/WorkflowSpectrum';
import { DecisionFlowchart } from '@/components/interactive/DecisionFlowchart';

export default function WorkflowsPage() {
  return (
    <div>
      <TierBadge tier="expert" />
      <h1 className="mt-4 mb-4">Workflows</h1>
      <p className="mb-4">
        Five workflow patterns for AI-augmented development with Claude Code &mdash; from simple
        single-session work to fully autonomous pipelines. Choose the simplest pattern that gets the job done.
      </p>
      <p className="mb-12 text-xs" style={{ color: 'var(--cw-ink-muted)' }}>
        Based on{' '}
        <a
          href="https://www.youtube.com/watch?v=38t5UBCa4OI"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--cw-primary)', textDecoration: 'underline' }}
        >
          &ldquo;Every Claude Code Workflow Explained&rdquo;
        </a>{' '}
        by Simon Scrapes
      </p>

      {/* ─── Key Concept: Built-in Sub-Agents ─── */}
      <section className="mb-16" id="sub-agents">
        <div className="section-label">Key Concept</div>
        <h2 className="mb-4">
          Built-in <span className="text-highlight">Sub-Agents</span>
        </h2>
        <p className="text-base mb-6" style={{ color: 'var(--cw-ink-secondary)' }}>
          Every time you use Claude Code &mdash; even in a basic conversation &mdash; it already
          uses agents behind the scenes. Think of them as research assistants that gather information
          in their own context windows and report back summaries, keeping your main conversation clean.
        </p>

        <CardGrid columns={3}>
          <Card number="EXPLORE">
            <div className="flex items-center gap-2 mb-2">
              <Layers size={18} style={{ color: 'var(--cw-success)' }} />
              <h3>Explore Agent</h3>
            </div>
            <p className="text-sm" style={{ color: 'var(--cw-ink-muted)' }}>
              Reads files and understands your codebase in its own context window, returning
              a summary. Activates automatically when reading files or navigating code.
            </p>
          </Card>
          <Card number="PLAN">
            <div className="flex items-center gap-2 mb-2">
              <Brain size={18} style={{ color: 'var(--cw-info)' }} />
              <h3>Plan Agent</h3>
            </div>
            <p className="text-sm" style={{ color: 'var(--cw-ink-muted)' }}>
              Researches your codebase before presenting a strategy. Read-only with its own
              context. Activated via <code>/plan</code> or <code>Shift+Tab</code> twice.
            </p>
          </Card>
          <Card number="GENERAL">
            <div className="flex items-center gap-2 mb-2">
              <Cpu size={18} style={{ color: 'var(--cw-primary)' }} />
              <h3>General Purpose</h3>
            </div>
            <p className="text-sm" style={{ color: 'var(--cw-ink-muted)' }}>
              The workhorse sub-agent for heavy lifting. Handles complex operations in its
              own context window so your main conversation stays focused.
            </p>
          </Card>
        </CardGrid>

        <Callout variant="sage" className="mt-6">
          <p className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
            <strong>At Cover Whale:</strong> Our CLAUDE.md file and skills framework automatically
            guide these sub-agents. When you run <code>/plan</code> or ask Claude to explore the
            codebase, it dispatches these agents behind the scenes &mdash; you benefit without
            managing them directly.
          </p>
        </Callout>
      </section>

      {/* ─── Workflow Spectrum Overview ─── */}
      <section className="mb-16" id="spectrum">
        <div className="section-label">Overview</div>
        <h2 className="mb-4">
          The 5 Workflow <span className="text-highlight">Patterns</span>
        </h2>
        <p className="text-base mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
          Each pattern represents a different balance of human control vs. AI autonomy.
          Click a node to see details.
        </p>

        <WorkflowSpectrum />
      </section>

      {/* ─── Pattern 1: Sequential Flow ─── */}
      <section className="mb-16" id="sequential">
        <div className="section-label">Pattern 1 &middot; Beginner</div>
        <h2 className="mb-4">
          <span className="text-highlight">Sequential</span> Flow
        </h2>
        <p className="text-base mb-6" style={{ color: 'var(--cw-ink-secondary)' }}>
          One terminal, one Claude session. Every task builds on the last in a single,
          growing conversation.
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
              (Shift+Tab &times; 2)<br />
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

        {/* Context Rot */}
        <div className="mt-8">
          <h3 className="mb-3 flex items-center gap-2">
            <AlertTriangle size={18} style={{ color: 'var(--cw-warning)' }} />
            Context Rot
          </h3>
          <p className="text-sm mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
            The longer you work in one session, the more context accumulates. When the context window fills up,
            Claude starts forgetting earlier details &mdash; this is <strong>context rot</strong>. Watch the
            green progress bar at the bottom of your terminal.
          </p>

          {/* Context bar visualization */}
          <div className="glass-card p-5 max-w-xl">
            <div className="text-xs font-semibold mb-3" style={{ color: 'var(--cw-ink-muted)', letterSpacing: '1px' }}>
              CONTEXT WINDOW USAGE
            </div>
            {[
              { pct: 25, label: '25%', color: 'var(--cw-success)', note: 'Fresh' },
              { pct: 50, label: '50%', color: 'var(--cw-info)', note: 'Good' },
              { pct: 75, label: '75%', color: '#D4A03C', note: 'Be careful' },
              { pct: 95, label: '95%', color: 'var(--cw-warning)', note: 'Context rot!' },
            ].map((bar) => (
              <div key={bar.pct} className="flex items-center gap-3 mb-2">
                <span className="text-[10px] font-mono w-8 text-right" style={{ color: 'var(--cw-ink-muted)' }}>
                  {bar.label}
                </span>
                <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.06)' }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${bar.pct}%`, background: bar.color }}
                  />
                </div>
                <span className="text-[10px] font-medium w-20" style={{ color: bar.color }}>
                  {bar.note}
                </span>
              </div>
            ))}
          </div>

          <Callout variant="purple" className="mt-4">
            <p className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
              <strong>How to fight context rot:</strong> Use <code>/clear</code> to reset the conversation,
              <code>/compact</code> to compress history into a summary, and structure your CLAUDE.md so
              Claude loads and unloads context efficiently.
            </p>
          </Callout>
        </div>

        <Callout variant="sage" className="mt-4">
          <p className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
            <strong>At Cover Whale:</strong> This is the default workflow for most daily tasks &mdash; bug fixes,
            small features, code reviews. Our skills system helps manage context rot by loading
            domain-specific instructions only when needed, then unloading them.
          </p>
        </Callout>
      </section>

      {/* ─── Pattern 2: The Operator ─── */}
      <section className="mb-16" id="operator">
        <div className="section-label">Pattern 2 &middot; Intermediate</div>
        <h2 className="mb-4">
          The <span className="text-highlight">Operator</span>
        </h2>
        <p className="text-base mb-6" style={{ color: 'var(--cw-ink-secondary)' }}>
          Open multiple terminal windows, each with its own Claude instance and isolated context.
          <strong> You</strong> are the orchestrator, deciding what each instance works on and when to merge results.
        </p>

        <CodeBlock
          title="Launch isolated sessions with worktrees"
          language="bash"
          code={`# Each --w flag creates a git worktree — an isolated workspace
claude --w "fix the login validation bug"
claude --w "add pagination to the submissions list"
claude --w "write tests for the carrier lottery"

# When you close a session:
# - No changes? Worktree auto-cleaned
# - Changes made? Claude asks what to do`}
        />

        <CardGrid columns={3} className="mt-6">
          <Card>
            <div className="flex items-center gap-2 mb-2">
              <GitBranch size={16} style={{ color: 'var(--cw-info)' }} />
              <h3 className="text-base">Isolated Context</h3>
            </div>
            <p className="text-sm" style={{ color: 'var(--cw-ink-muted)' }}>
              Each terminal has its own context window &mdash; no cross-contamination between tasks.
            </p>
          </Card>
          <Card>
            <div className="flex items-center gap-2 mb-2">
              <Terminal size={16} style={{ color: 'var(--cw-info)' }} />
              <h3 className="text-base">Max Control</h3>
            </div>
            <p className="text-sm" style={{ color: 'var(--cw-ink-muted)' }}>
              You decide the priority, review each instance&rsquo;s work, and merge when ready.
            </p>
          </Card>
          <Card>
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle size={16} style={{ color: '#D4A03C' }} />
              <h3 className="text-base">Limit: 4&ndash;5</h3>
            </div>
            <p className="text-sm" style={{ color: 'var(--cw-ink-muted)' }}>
              Managing more than 4&ndash;5 terminals gets hard &mdash; constant context-switching for you.
            </p>
          </Card>
        </CardGrid>

        <Callout variant="sage" className="mt-6">
          <p className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
            <strong>At Cover Whale:</strong> This is ideal for sprint days when you have multiple independent
            Jira tickets. Open one Claude per ticket, each in its own worktree. Example: one instance
            investigating a rate discrepancy while another builds a new Action class for a submission workflow.
          </p>
        </Callout>
      </section>

      {/* ─── Pattern 3: Split & Merge ─── */}
      <section className="mb-16" id="split-merge">
        <div className="section-label">Pattern 3 &middot; Advanced</div>
        <h2 className="mb-4">
          Split &amp; <span className="text-highlight">Merge</span>
        </h2>
        <p className="text-base mb-6" style={{ color: 'var(--cw-ink-secondary)' }}>
          Instead of you managing multiple terminals, Claude spawns and manages multiple sub-agents
          in parallel from a single session. Claude is the hub; sub-agents are the spokes.
        </p>

        {/* Hub-and-spoke diagram */}
        <div className="glass-card p-6 mb-6 overflow-x-auto" style={{ background: 'var(--cw-surface)' }}>
          <svg viewBox="0 0 600 280" className="w-full" style={{ minWidth: '480px', maxHeight: '280px' }}>
            <defs>
              <filter id="hubGlow">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Connection lines */}
            {[
              { x: 150, y: 80 },
              { x: 300, y: 60 },
              { x: 450, y: 80 },
              { x: 150, y: 220 },
              { x: 450, y: 220 },
            ].map((pos, i) => (
              <line
                key={i}
                x1={300}
                y1={140}
                x2={pos.x}
                y2={pos.y}
                stroke="var(--cw-primary)"
                strokeWidth="1.5"
                strokeDasharray="6 4"
                opacity={0.4}
              />
            ))}

            {/* Hub */}
            <circle cx={300} cy={140} r={40} fill="var(--cw-primary)" opacity={0.15} />
            <circle cx={300} cy={140} r={30} fill="var(--cw-surface)" stroke="var(--cw-primary)" strokeWidth={2.5} filter="url(#hubGlow)" />
            <text x={300} y={136} textAnchor="middle" fill="var(--cw-primary)" fontSize="10" fontWeight="700">MAIN</text>
            <text x={300} y={150} textAnchor="middle" fill="var(--cw-primary)" fontSize="9" fontWeight="500">CLAUDE</text>

            {/* Sub-agents */}
            {[
              { x: 150, y: 80, label: 'Sub-Agent 1' },
              { x: 300, y: 60, label: 'Sub-Agent 2' },
              { x: 450, y: 80, label: 'Sub-Agent 3' },
              { x: 150, y: 220, label: 'Sub-Agent 4' },
              { x: 450, y: 220, label: 'Sub-Agent 5' },
            ].map((agent, i) => (
              <g key={i}>
                <circle cx={agent.x} cy={agent.y} r={22} fill="var(--cw-surface)" stroke="var(--cw-info)" strokeWidth={1.5} />
                <text x={agent.x} y={agent.y - 4} textAnchor="middle" fill="var(--cw-info)" fontSize="8" fontWeight="600">
                  Agent {i + 1}
                </text>
                <text x={agent.x} y={agent.y + 8} textAnchor="middle" fill="var(--cw-ink-muted)" fontSize="7">
                  (own ctx)
                </text>
              </g>
            ))}

            {/* Merge arrow */}
            <text x={300} y={270} textAnchor="middle" fill="var(--cw-ink-muted)" fontSize="9" fontWeight="500">
              Results merge back to main agent
            </text>

            {/* Max concurrency note */}
            <text x={300} y={16} textAnchor="middle" fill="var(--cw-ink-muted)" fontSize="8" fontWeight="400">
              Max 10 sub-agents running at once
            </text>
          </svg>
        </div>

        <h3 className="mb-3">Builder-Validator Chain</h3>
        <p className="text-sm mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
          One powerful use case: one sub-agent builds something, the main agent passes it to a
          second sub-agent for review &mdash; a built-in quality check without you reviewing manually.
        </p>

        <CodeBlock
          title="Custom sub-agents"
          code={`# Define in .claude/agents/ folder:
# - A name (Claude reads this to decide when to use it)
# - A description of what it does
# - A set of tools it can access
#
# Claude auto-selects the right agent when
# the task matches the description.`}
        />

        <Callout variant="sage" className="mt-4">
          <p className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
            <strong>At Cover Whale:</strong> Our framework already has 47 custom agents in <code>.claude/agents/</code>.
            When you run <code>/implement</code>, the orchestrator agent dispatches specialized sub-agents
            for each task. The <code>/preflight</code> command runs 5 parallel validation agents simultaneously.
            You get Split &amp; Merge automatically through our SpecKit workflow.
          </p>
        </Callout>
      </section>

      {/* ─── Pattern 4: Agent Teams ─── */}
      <section className="mb-16" id="agent-teams">
        <div className="section-label">Pattern 4 &middot; Expert</div>
        <h2 className="mb-4">
          Agent <span className="text-highlight">Teams</span>
        </h2>
        <p className="text-base mb-6" style={{ color: 'var(--cw-ink-secondary)' }}>
          An experimental Claude Code feature: a Team Lead coordinates specialized Teammates
          with a shared task list. Unlike Split &amp; Merge, teammates are full Claude instances
          that can build on each other&rsquo;s work.
        </p>

        {/* Agent Teams diagram */}
        <div className="glass-card p-6 mb-6 overflow-x-auto" style={{ background: 'var(--cw-surface)' }}>
          <svg viewBox="0 0 540 260" className="w-full" style={{ minWidth: '440px', maxHeight: '260px' }}>
            {/* Shared task list */}
            <rect x={120} y={15} width={300} height={40} rx={10} fill="var(--cw-primary)" opacity={0.1} stroke="var(--cw-primary)" strokeWidth={1.5} />
            <text x={270} y={30} textAnchor="middle" fill="var(--cw-primary)" fontSize="9" fontWeight="700" letterSpacing="1">
              SHARED TASK LIST
            </text>
            <text x={270} y={44} textAnchor="middle" fill="var(--cw-ink-muted)" fontSize="8">
              [Task A] [Task B] [Task C] [Task D]
            </text>

            {/* Connection from tasks to team lead */}
            <line x1={270} y1={55} x2={270} y2={95} stroke="var(--cw-primary)" strokeWidth={1.5} strokeDasharray="4 3" opacity={0.5} />

            {/* Team Lead */}
            <rect x={195} y={95} width={150} height={50} rx={12} fill="var(--cw-surface)" stroke="var(--cw-primary)" strokeWidth={2} />
            <text x={270} y={116} textAnchor="middle" fill="var(--cw-primary)" fontSize="10" fontWeight="700">TEAM LEAD</text>
            <text x={270} y={130} textAnchor="middle" fill="var(--cw-ink-muted)" fontSize="8">You talk here</text>

            {/* Connections to teammates */}
            <line x1={220} y1={145} x2={140} y2={185} stroke="var(--cw-info)" strokeWidth={1.5} opacity={0.5} />
            <line x1={320} y1={145} x2={400} y2={185} stroke="var(--cw-warning)" strokeWidth={1.5} opacity={0.5} />

            {/* Teammate 1 */}
            <rect x={60} y={185} width={160} height={55} rx={12} fill="var(--cw-surface)" stroke="var(--cw-info)" strokeWidth={1.5} />
            <text x={140} y={205} textAnchor="middle" fill="var(--cw-info)" fontSize="9" fontWeight="700">TEAMMATE 1</text>
            <text x={140} y={218} textAnchor="middle" fill="var(--cw-ink-muted)" fontSize="8">Front-End Dev</text>
            <text x={140} y={230} textAnchor="middle" fill="var(--cw-ink-muted)" fontSize="7">Full Claude instance</text>

            {/* Teammate 2 */}
            <rect x={320} y={185} width={160} height={55} rx={12} fill="var(--cw-surface)" stroke="var(--cw-warning)" strokeWidth={1.5} />
            <text x={400} y={205} textAnchor="middle" fill="var(--cw-warning)" fontSize="9" fontWeight="700">TEAMMATE 2</text>
            <text x={400} y={218} textAnchor="middle" fill="var(--cw-ink-muted)" fontSize="8">Back-End Dev</text>
            <text x={400} y={230} textAnchor="middle" fill="var(--cw-ink-muted)" fontSize="7">Full Claude instance</text>

            {/* Navigation hint */}
            <text x={270} y={256} textAnchor="middle" fill="var(--cw-ink-muted)" fontSize="8">
              Navigate: Shift+Up / Shift+Down &middot; Message teammate: bypasses team lead
            </text>
          </svg>
        </div>

        <CodeBlock
          title="Launching an agent team"
          language="bash"
          code={`# 1. Enable experimental features in Claude Code settings
# 2. Tell Claude you want a team:
"I want to use an agent team for this task.
 Create a front-end developer and a back-end developer.
 The task is to build a new submission dashboard page."

# 3. Claude creates the team and coordinates work
# 4. Navigate between teammates: Shift+Up / Shift+Down`}
        />

        <Callout variant="warning" className="mt-4">
          <p className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
            <strong>Token cost warning:</strong> Agent Teams can use 4&ndash;7x the tokens of a single session.
            The back-and-forth between the shared task list, team lead, and each teammate multiplies cost.
            Only use this when the task genuinely requires cross-collaboration between specialists.
          </p>
        </Callout>

        <Callout variant="sage" className="mt-4">
          <p className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
            <strong>At Cover Whale:</strong> Our <code>/implement</code> command automatically decides whether
            to use Agent Teams (parallel) or sequential execution based on task dependencies. When tasks are
            independent, it spawns teammates. When they depend on each other, it runs them one at a time
            through the Ralph loop. You don&rsquo;t need to manually configure teams.
          </p>
        </Callout>
      </section>

      {/* ─── Pattern 5: Headless ─── */}
      <section className="mb-16" id="headless">
        <div className="section-label">Pattern 5 &middot; Expert</div>
        <h2 className="mb-4">
          <span className="text-highlight">Headless</span> Mode
        </h2>
        <p className="text-base mb-6" style={{ color: 'var(--cw-ink-secondary)' }}>
          Claude works independently &mdash; no terminal window, no interaction, no human in the loop.
          Set a task, walk away, come back to results.
        </p>

        <CodeBlock
          title="The -p flag"
          language="bash"
          code={`# Run Claude headlessly — no interaction, full permissions
claude -p "Analyze all rate plan entries for NJ and produce a report"

# Chain with shell scripts for automation
claude -p "Read the latest Slack thread and summarize action items" > report.json

# Schedule with cron for recurring tasks
# 0 6 * * * cd /path/to/project && claude -p "Run daily health check"`}
        />

        <h3 className="mb-3 mt-6">The Trust Spectrum</h3>
        <p className="text-sm mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
          As you move from Pattern 1 to Pattern 5, you trade control for speed. Only go headless
          for tasks where the output is easy to verify &mdash; reports, data files, structured analysis.
        </p>

        {/* Trust spectrum bar */}
        <div className="glass-card p-5 max-w-2xl">
          <div className="flex justify-between mb-3">
            <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: 'var(--cw-success)' }}>
              High Control
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: 'var(--cw-warning)' }}>
              Full Autonomy
            </span>
          </div>
          <div className="h-3 rounded-full overflow-hidden mb-4" style={{ background: 'rgba(0,0,0,0.06)' }}>
            <div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(to right, #3A9E6E, #4A6FA5, #6B2D8B, #D95550)',
                width: '100%',
              }}
            />
          </div>
          <div className="flex justify-between text-[10px]" style={{ color: 'var(--cw-ink-muted)' }}>
            <span>P1 Sequential</span>
            <span>P2 Operator</span>
            <span>P3 Split/Merge</span>
            <span>P4 Teams</span>
            <span>P5 Headless</span>
          </div>
          <div className="flex justify-between text-[9px] mt-1" style={{ color: 'var(--cw-ink-muted)' }}>
            <span>Check every step</span>
            <span>Check each terminal</span>
            <span>Check synthesis</span>
            <span>Check output</span>
            <span>Final result only</span>
          </div>
        </div>

        <Callout variant="sage" className="mt-6">
          <p className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
            <strong>At Cover Whale:</strong> Headless mode powers our automated pipelines &mdash; the CW Rate
            Validator bot processes Slack messages without human involvement, and our <code>/schedule</code>
            command creates cron-triggered Claude agents for recurring tasks like compliance checks.
            Always verify outputs before acting on headless results in production.
          </p>
        </Callout>
      </section>

      {/* ─── Checklist-Driven Development ─── */}
      <section className="mb-16" id="checklist">
        <div className="section-label">Technique</div>
        <h2 className="mb-4">
          Checklist-Driven <span className="text-highlight">Development</span>
        </h2>
        <p className="text-base mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
          Works within any pattern. Break complex tasks into explicit checklists for reliable,
          step-by-step execution with natural rollback points.
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
            <strong>At Cover Whale:</strong> Our SpecKit workflow (<code>/specify</code> &rarr; <code>/plan</code> &rarr; <code>/tasks</code> &rarr; <code>/implement</code>)
            automates this pattern. It generates a tasks.json with dependencies, and the ATOM hook system
            blocks progress until each task has verification evidence. You get checklist-driven development
            without manually writing checklists.
          </p>
        </Callout>
      </section>

      {/* ─── The Supervisor Pattern ─── */}
      <section className="mb-16" id="supervisor">
        <div className="section-label">Technique</div>
        <h2 className="mb-4">
          The <span className="text-highlight">Supervisor</span> Pattern
        </h2>
        <p className="text-base mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
          Use a shared progress file to coordinate across multiple Claude instances.
          One lightweight session tracks overall progress while others execute tasks.
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

## Blocked
- [ ] External API integration (waiting on vendor docs)`}
        />

        <Callout variant="purple" className="mt-4">
          <p className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
            The supervisor reviews progress files and assigns the next task
            to the most appropriate Claude instance. This pairs naturally with Pattern 2 (Operator).
          </p>
        </Callout>
      </section>

      {/* ─── Decision Flowchart ─── */}
      <section className="mb-16" id="decision-chart">
        <div className="section-label">Which Pattern?</div>
        <h2 className="mb-4">
          Decision <span className="text-highlight">Flowchart</span>
        </h2>
        <p className="text-base mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
          Not sure which pattern to use? Answer the questions below to find the right fit.
        </p>

        <DecisionFlowchart />

        <Callout variant="purple" className="mt-4">
          <p className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
            <strong>The golden rule:</strong> Don&rsquo;t jump to Pattern 4 or 5 just because they sound impressive.
            The right pattern is the <strong>simplest one that gets the job done</strong>. Start simple, scale
            complexity only as needed.
          </p>
        </Callout>
      </section>

      {/* ─── Quick Reference Table ─── */}
      <section className="mb-16" id="reference">
        <div className="section-label">Reference</div>
        <h2 className="mb-6">
          Quick <span className="text-highlight">Reference</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm" style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
            <thead>
              <tr>
                {['Pattern', 'Who Manages', 'Parallelism', 'Token Cost', 'Best For'].map((header) => (
                  <th
                    key={header}
                    className="text-left p-3 text-xs font-semibold uppercase tracking-wider"
                    style={{
                      color: 'var(--cw-primary)',
                      borderBottom: '2px solid var(--cw-primary)',
                      background: 'var(--cw-primary-005)',
                    }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { pattern: '1. Sequential', manages: 'You (1 session)', parallel: 'None', cost: 'Low', best: 'Simple, linear tasks' },
                { pattern: '2. Operator', manages: 'You (multi-terminal)', parallel: 'Manual', cost: 'Low-Medium', best: 'Independent tasks, max control' },
                { pattern: '3. Split & Merge', manages: 'Claude (auto)', parallel: 'Auto (up to 10)', cost: 'Medium', best: 'Parallel research, builder-validator' },
                { pattern: '4. Agent Teams', manages: 'Team Lead Claude', parallel: 'Specialists', cost: 'High (4-7x)', best: 'Complex cross-collaboration' },
                { pattern: '5. Headless', manages: 'None (fully auto)', parallel: 'Any', cost: 'Varies', best: 'Recurring, automated tasks' },
              ].map((row, i) => (
                <tr key={i}>
                  <td className="p-3 font-semibold" style={{ color: 'var(--cw-ink)', borderBottom: '1px solid var(--cw-border)' }}>
                    {row.pattern}
                  </td>
                  <td className="p-3" style={{ color: 'var(--cw-ink-secondary)', borderBottom: '1px solid var(--cw-border)' }}>
                    {row.manages}
                  </td>
                  <td className="p-3" style={{ color: 'var(--cw-ink-secondary)', borderBottom: '1px solid var(--cw-border)' }}>
                    {row.parallel}
                  </td>
                  <td className="p-3" style={{ color: 'var(--cw-ink-secondary)', borderBottom: '1px solid var(--cw-border)' }}>
                    {row.cost}
                  </td>
                  <td className="p-3" style={{ color: 'var(--cw-ink-secondary)', borderBottom: '1px solid var(--cw-border)' }}>
                    {row.best}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ─── Glossary ─── */}
      <section className="mb-16" id="glossary">
        <div className="section-label">Reference</div>
        <h2 className="mb-6">
          Key <span className="text-highlight">Concepts</span>
        </h2>

        <CardGrid columns={2}>
          {[
            {
              term: 'Context Window',
              def: 'The "memory" Claude has during a conversation. Limited in size. The more you chat, the fuller it gets.',
            },
            {
              term: 'Context Rot',
              def: 'When the context window fills up and Claude starts forgetting earlier details or making mistakes.',
            },
            {
              term: 'Sub-Agent',
              def: 'A separate Claude instance that the main Claude spins up for a specific job. It has its own isolated memory.',
            },
            {
              term: 'Worktree (--w flag)',
              def: 'An isolated copy of your project files that Claude works in without disturbing your main codebase.',
            },
            {
              term: 'Headless (-p flag)',
              def: 'Running Claude Code with a prompt from the command line, with no interactive terminal session.',
            },
            {
              term: 'Hub and Spoke',
              def: 'The architecture of Split & Merge: one main agent (hub) coordinates many sub-agents (spokes) that can\'t talk to each other directly.',
            },
            {
              term: 'CLAUDE.md',
              def: 'A file in your project that gives Claude instructions, context, and rules. Think of it as a briefing document for Claude.',
            },
            {
              term: 'Skills',
              def: 'Pre-defined instruction modules that Claude loads for specific tasks and unloads when done — keeping the context window efficient.',
            },
          ].map((item) => (
            <Card key={item.term}>
              <h3 className="text-base mb-2" style={{ color: 'var(--cw-primary)' }}>{item.term}</h3>
              <p className="text-sm" style={{ color: 'var(--cw-ink-muted)', maxWidth: '100%' }}>{item.def}</p>
            </Card>
          ))}
        </CardGrid>
      </section>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8 mt-8" style={{ borderTop: '1px solid var(--cw-border)' }}>
        <Link
          href="/road-to-agentic-engineering/fundamentals"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all pill-btn"
        >
          <ArrowLeft size={16} /> Fundamentals
        </Link>
        <Link
          href="/road-to-agentic-engineering/tips"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:gap-3"
          style={{ background: 'var(--cw-primary)', color: '#fff' }}
        >
          Next: Tips &amp; Tricks <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

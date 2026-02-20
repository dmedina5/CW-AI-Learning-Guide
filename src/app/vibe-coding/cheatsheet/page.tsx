'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Card, CardGrid } from '@/components/content/Card';
import { Callout } from '@/components/content/Callout';
import { CodeBlock } from '@/components/content/CodeBlock';
import { TierBadge } from '@/components/content/TierBadge';

export default function CheatsheetPage() {
  return (
    <div>
      <TierBadge tier="expert" />
      <h1 className="mt-4 mb-4">Claude Code Cheatsheet</h1>
      <p className="mb-4">
        Quick reference for Claude Code commands, shortcuts, and patterns.
      </p>
      <button
        onClick={() => window.print()}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold mb-12 transition-colors"
        style={{ background: 'var(--cw-primary)', color: '#fff' }}
      >
        Print Cheatsheet
      </button>

      {/* Section: Installation */}
      <section className="mb-12">
        <div className="section-label">Setup</div>
        <h2 className="mb-4">Installation</h2>
        <div className="rounded-xl p-5" style={{ background: 'var(--cw-surface)', border: '1px solid var(--cw-border)', borderTop: '3px solid #D97706' }}>
          <h4 className="mb-3 font-bold" style={{ color: '#D97706' }}>Claude Code</h4>
          <CodeBlock code={`# Native installer (recommended)
irm https://claude.ai/install.ps1 | iex  # Windows
curl -fsSL https://claude.ai/install.sh | bash  # Mac/Linux

# npm (deprecated)
npm i -g @anthropic-ai/claude-code
claude`} />
        </div>
      </section>

      {/* Section: Keyboard Shortcuts */}
      <section className="mb-12">
        <div className="section-label">Speed</div>
        <h2 className="mb-4">Keyboard Shortcuts</h2>
        <div className="rounded-xl p-5" style={{ background: 'var(--cw-surface)', border: '1px solid var(--cw-border)', borderTop: '3px solid #D97706' }}>
          <div className="space-y-1.5 text-sm">
            {[
              { key: 'Escape', action: 'Stop action' },
              { key: 'Escape x2', action: 'History / Rewind' },
              { key: 'Shift+Tab', action: 'Plan mode' },
              { key: 'Alt+M', action: 'Toggle permissions' },
              { key: 'Alt+P', action: 'Switch model' },
              { key: 'Alt+T', action: 'Extended thinking' },
              { key: 'Ctrl+L', action: 'Clear screen' },
              { key: 'Ctrl+R', action: 'Reverse search' },
              { key: '#', action: 'Update CLAUDE.md' },
              { key: 'Up/Down', action: 'Command history' },
            ].map((row, i) => (
              <div key={i} className="flex justify-between items-center py-1" style={{ borderBottom: '1px solid var(--cw-border)' }}>
                <kbd className="px-1.5 py-0.5 rounded text-xs font-mono" style={{ background: 'rgba(217,119,6,0.08)', color: '#D97706' }}>{row.key}</kbd>
                <span style={{ color: 'var(--cw-ink-secondary)' }}>{row.action}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Essential Commands */}
      <section className="mb-12">
        <div className="section-label">Commands</div>
        <h2 className="mb-4">Essential Commands</h2>
        <div className="rounded-xl p-5" style={{ background: 'var(--cw-surface)', border: '1px solid var(--cw-border)', borderTop: '3px solid #D97706' }}>
          <CodeBlock code={`/add file.ts      # Add context
/clear            # Clear context
/compact          # Reduce context
/reset            # Reset session
/permissions      # View perms
/sandbox on|off   # Toggle sandbox
/help             # Show help`} />
        </div>
      </section>

      {/* Section: Common Patterns */}
      <section className="mb-12">
        <div className="section-label">Patterns</div>
        <h2 className="mb-4">Common Patterns</h2>
        <div className="rounded-xl p-5" style={{ background: 'var(--cw-surface)', border: '1px solid var(--cw-border)', borderTop: '3px solid #D97706' }}>
          <div className="space-y-3 text-sm">
            <div>
              <div className="font-semibold mb-1" style={{ color: 'var(--cw-ink)' }}>Add Files</div>
              <div className="font-mono text-xs p-2 rounded" style={{ background: 'var(--cw-primary-light)', color: 'var(--cw-ink-secondary)' }}>/add src/app.ts</div>
            </div>
            <div>
              <div className="font-semibold mb-1" style={{ color: 'var(--cw-ink)' }}>Review Code</div>
              <div className="font-mono text-xs p-2 rounded" style={{ background: 'var(--cw-primary-light)', color: 'var(--cw-ink-secondary)' }}>/add file.ts<br />&quot;Review this for bugs&quot;</div>
            </div>
            <div>
              <div className="font-semibold mb-1" style={{ color: 'var(--cw-ink)' }}>Generate Tests</div>
              <div className="font-mono text-xs p-2 rounded" style={{ background: 'var(--cw-primary-light)', color: 'var(--cw-ink-secondary)' }}>/add src/utils.ts<br />&quot;Generate Vitest tests&quot;</div>
            </div>
            <div>
              <div className="font-semibold mb-1" style={{ color: 'var(--cw-ink)' }}>Debug</div>
              <div className="font-mono text-xs p-2 rounded" style={{ background: 'var(--cw-primary-light)', color: 'var(--cw-ink-secondary)' }}>&quot;Error: [paste error]<br />What&apos;s causing this?&quot;</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Workflow Quick Reference */}
      <section className="mb-12">
        <div className="section-label">Workflow</div>
        <h2 className="mb-4">Standard Workflow</h2>
        <div className="rounded-xl p-5" style={{ background: 'var(--cw-surface)', border: '1px solid var(--cw-border)', borderTop: '3px solid #D97706' }}>
          <div className="space-y-1 text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
            <div><strong>1.</strong> Explore: <code>/add files</code></div>
            <div><strong>2.</strong> Plan: <code>Shift+Tab</code></div>
            <div><strong>3.</strong> Execute: <code>Shift+Tab</code></div>
            <div><strong>4.</strong> Commit: Review + commit</div>
          </div>
          <div className="mt-4 p-2 rounded text-xs font-mono" style={{ background: 'var(--cw-primary-light)', color: 'var(--cw-ink-secondary)' }}>
            alias cc=&apos;claude --dangerously-skip-permissions&apos;
          </div>
        </div>
      </section>

      {/* Section: Quick Tips */}
      <section className="mb-12">
        <div className="section-label">Quick Tips</div>
        <h2 className="mb-4">Remember These</h2>
        <CardGrid columns={3}>
          <Card>
            <h4 className="mb-1">Escape, Not Ctrl+C</h4>
            <p className="text-xs" style={{ color: 'var(--cw-ink-muted)' }}>Always use Escape to stop Claude. Ctrl+C kills the process.</p>
          </Card>
          <Card>
            <h4 className="mb-1">Git Before Risky Ops</h4>
            <p className="text-xs" style={{ color: 'var(--cw-ink-muted)' }}>Commit your work before letting Claude make major changes.</p>
          </Card>
          <Card>
            <h4 className="mb-1">CLAUDE.md is Key</h4>
            <p className="text-xs" style={{ color: 'var(--cw-ink-muted)' }}>Keep CLAUDE.md updated for best results across sessions.</p>
          </Card>
          <Card>
            <h4 className="mb-1">Reset at 20 Turns</h4>
            <p className="text-xs" style={{ color: 'var(--cw-ink-muted)' }}>Quality degrades after ~20 turns. Use <code>/reset</code>.</p>
          </Card>
          <Card>
            <h4 className="mb-1">Plan Mode First</h4>
            <p className="text-xs" style={{ color: 'var(--cw-ink-muted)' }}>For complex tasks, start in plan mode (Shift+Tab).</p>
          </Card>
          <Card>
            <h4 className="mb-1"># for Quick Notes</h4>
            <p className="text-xs" style={{ color: 'var(--cw-ink-muted)' }}>Press <code>#</code> to add notes to CLAUDE.md instantly.</p>
          </Card>
        </CardGrid>
      </section>

      {/* Section: Environment Variables */}
      <section className="mb-12">
        <div className="section-label">Config</div>
        <h2 className="mb-4">Environment Variables</h2>
        <div className="rounded-xl p-5" style={{ background: 'var(--cw-surface)', border: '1px solid var(--cw-border)', borderTop: '3px solid #D97706' }}>
          <CodeBlock code={`ANTHROPIC_API_KEY=sk-ant-...
CLAUDE_LOG_FILE=~/.claude/log
CLAUDE_CONFIG_DIR=~/.claude`} />
          <p className="text-xs mt-2" style={{ color: 'var(--cw-ink-muted)' }}>Config: <code>./CLAUDE.md</code> or <code>~/.claude/CLAUDE.md</code></p>
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8 mt-8" style={{ borderTop: '1px solid var(--cw-border)' }}>
        <Link
          href="/vibe-coding/tips"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all pill-btn"
        >
          <ArrowLeft size={16} /> Tips &amp; Tricks
        </Link>
        <Link
          href="/agentic-ai"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:gap-3"
          style={{ background: 'var(--cw-primary)', color: '#fff' }}
        >
          Next: Agentic AI <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

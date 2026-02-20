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
      <h1 className="mt-4 mb-4">Quick Reference Cheatsheet</h1>
      <p className="mb-4">
        Side-by-side comparison of Claude Code and Gemini CLI commands, shortcuts, and patterns.
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl p-5" style={{ background: 'var(--cw-surface)', border: '1px solid var(--cw-border)', borderTop: '3px solid #D97706' }}>
            <h4 className="mb-3 font-bold" style={{ color: '#D97706' }}>Claude Code</h4>
            <CodeBlock code={`# Native installer (recommended)
irm https://claude.ai/install.ps1 | iex  # Windows
curl -fsSL https://claude.ai/install.sh | bash  # Mac/Linux

# npm (deprecated)
npm i -g @anthropic-ai/claude-code
claude`} />
          </div>
          <div className="rounded-xl p-5" style={{ background: 'var(--cw-surface)', border: '1px solid var(--cw-border)', borderTop: '3px solid #4285F4' }}>
            <h4 className="mb-3 font-bold" style={{ color: '#4285F4' }}>Gemini CLI</h4>
            <CodeBlock code={`# npm (requires Node.js 20+)
npm i -g @google/gemini-cli
gemini auth login

# Homebrew (Mac/Linux)
brew install gemini-cli`} />
          </div>
        </div>
      </section>

      {/* Section: Keyboard Shortcuts */}
      <section className="mb-12">
        <div className="section-label">Speed</div>
        <h2 className="mb-4">Keyboard Shortcuts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl p-5" style={{ background: 'var(--cw-surface)', border: '1px solid var(--cw-border)', borderTop: '3px solid #D97706' }}>
            <h4 className="mb-3 font-bold" style={{ color: '#D97706' }}>Claude Code</h4>
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
          <div className="rounded-xl p-5" style={{ background: 'var(--cw-surface)', border: '1px solid var(--cw-border)', borderTop: '3px solid #4285F4' }}>
            <h4 className="mb-3 font-bold" style={{ color: '#4285F4' }}>Gemini CLI</h4>
            <div className="space-y-1.5 text-sm">
              {[
                { key: '@', action: 'File reference' },
                { key: 'Ctrl+C x2', action: 'Cancel / Quit' },
                { key: 'Escape x2', action: 'Browse history' },
                { key: 'Shift+Tab', action: 'Auto-apply mode' },
                { key: 'Ctrl+Y', action: 'YOLO mode' },
                { key: 'Ctrl+L', action: 'Clear screen' },
                { key: 'Ctrl+S', action: 'Print full response' },
                { key: 'Tab', action: 'Autocomplete' },
                { key: 'Alt+Z', action: 'Undo' },
                { key: 'Up/Down', action: 'History navigation' },
              ].map((row, i) => (
                <div key={i} className="flex justify-between items-center py-1" style={{ borderBottom: '1px solid var(--cw-border)' }}>
                  <kbd className="px-1.5 py-0.5 rounded text-xs font-mono" style={{ background: 'rgba(66,133,244,0.08)', color: '#4285F4' }}>{row.key}</kbd>
                  <span style={{ color: 'var(--cw-ink-secondary)' }}>{row.action}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section: Essential Commands */}
      <section className="mb-12">
        <div className="section-label">Commands</div>
        <h2 className="mb-4">Essential Commands</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl p-5" style={{ background: 'var(--cw-surface)', border: '1px solid var(--cw-border)', borderTop: '3px solid #D97706' }}>
            <h4 className="mb-3 font-bold" style={{ color: '#D97706' }}>Claude Code</h4>
            <CodeBlock code={`/add file.ts      # Add context
/clear            # Clear context
/compact          # Reduce context
/reset            # Reset session
/permissions      # View perms
/sandbox on|off   # Toggle sandbox
/help             # Show help`} />
          </div>
          <div className="rounded-xl p-5" style={{ background: 'var(--cw-surface)', border: '1px solid var(--cw-border)', borderTop: '3px solid #4285F4' }}>
            <h4 className="mb-3 font-bold" style={{ color: '#4285F4' }}>Gemini CLI</h4>
            <CodeBlock code={`/save name        # Save session
/load name        # Load session
/clear            # Clear context
/tokens           # Show usage
/model name       # Change model
/config           # View settings
/sessions         # List sessions`} />
          </div>
        </div>
      </section>

      {/* Section: Common Patterns */}
      <section className="mb-12">
        <div className="section-label">Patterns</div>
        <h2 className="mb-4">Common Patterns</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl p-5" style={{ background: 'var(--cw-surface)', border: '1px solid var(--cw-border)', borderTop: '3px solid #D97706' }}>
            <h4 className="mb-3 font-bold" style={{ color: '#D97706' }}>Claude Code</h4>
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
          <div className="rounded-xl p-5" style={{ background: 'var(--cw-surface)', border: '1px solid var(--cw-border)', borderTop: '3px solid #4285F4' }}>
            <h4 className="mb-3 font-bold" style={{ color: '#4285F4' }}>Gemini CLI</h4>
            <div className="space-y-3 text-sm">
              <div>
                <div className="font-semibold mb-1" style={{ color: 'var(--cw-ink)' }}>Add Files</div>
                <div className="font-mono text-xs p-2 rounded" style={{ background: 'var(--cw-primary-light)', color: 'var(--cw-ink-secondary)' }}>@src/app.ts</div>
              </div>
              <div>
                <div className="font-semibold mb-1" style={{ color: 'var(--cw-ink)' }}>Review Code</div>
                <div className="font-mono text-xs p-2 rounded" style={{ background: 'var(--cw-primary-light)', color: 'var(--cw-ink-secondary)' }}>@file.ts<br />&quot;Review this for bugs&quot;</div>
              </div>
              <div>
                <div className="font-semibold mb-1" style={{ color: 'var(--cw-ink)' }}>Generate Tests</div>
                <div className="font-mono text-xs p-2 rounded" style={{ background: 'var(--cw-primary-light)', color: 'var(--cw-ink-secondary)' }}>@src/utils.ts<br />&quot;Generate Vitest tests&quot;</div>
              </div>
              <div>
                <div className="font-semibold mb-1" style={{ color: 'var(--cw-ink)' }}>Debug</div>
                <div className="font-mono text-xs p-2 rounded" style={{ background: 'var(--cw-primary-light)', color: 'var(--cw-ink-secondary)' }}>&quot;Error: [paste error]<br />What&apos;s causing this?&quot;</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Workflow Quick Reference */}
      <section className="mb-12">
        <div className="section-label">Workflows</div>
        <h2 className="mb-4">Workflow Quick Reference</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl p-5" style={{ background: 'var(--cw-surface)', border: '1px solid var(--cw-border)', borderTop: '3px solid #D97706' }}>
            <h4 className="mb-3 font-bold" style={{ color: '#D97706' }}>Claude Standard Workflow</h4>
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
          <div className="rounded-xl p-5" style={{ background: 'var(--cw-surface)', border: '1px solid var(--cw-border)', borderTop: '3px solid #4285F4' }}>
            <h4 className="mb-3 font-bold" style={{ color: '#4285F4' }}>Gemini Standard Workflow</h4>
            <div className="space-y-1 text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
              <div><strong>1.</strong> Load: <code>@files</code></div>
              <div><strong>2.</strong> Investigate: Auto sub-agent</div>
              <div><strong>3.</strong> Execute: Auto todo list</div>
              <div><strong>4.</strong> Verify: Run tests</div>
            </div>
            <div className="mt-4 p-2 rounded text-xs font-mono" style={{ background: 'var(--cw-primary-light)', color: 'var(--cw-ink-secondary)' }}>
              &quot;Remember: I use 2-space indent&quot;
            </div>
          </div>
        </div>
      </section>

      {/* Section: Decision Guide */}
      <section className="mb-12">
        <div className="section-label">Decision Guide</div>
        <h2 className="mb-4">When to Use Which?</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm" style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
            <thead>
              <tr>
                <th className="text-left p-3 font-semibold" style={{ background: 'var(--cw-surface)', borderBottom: '2px solid var(--cw-border)', color: 'var(--cw-ink)' }}>Task</th>
                <th className="text-left p-3 font-semibold" style={{ background: 'var(--cw-surface)', borderBottom: '2px solid var(--cw-border)', color: 'var(--cw-ink)' }}>Best Tool</th>
                <th className="text-left p-3 font-semibold" style={{ background: 'var(--cw-surface)', borderBottom: '2px solid var(--cw-border)', color: 'var(--cw-ink)' }}>Why</th>
              </tr>
            </thead>
            <tbody>
              {[
                { task: 'Complex debugging', tool: 'Claude', color: '#D97706', why: 'Deep reasoning' },
                { task: 'Architecture design', tool: 'Claude', color: '#D97706', why: 'Nuanced tradeoffs' },
                { task: 'Code review', tool: 'Claude', color: '#D97706', why: 'Careful analysis' },
                { task: 'Large refactoring', tool: 'Gemini', color: '#4285F4', why: '2M token context' },
                { task: 'Codebase search', tool: 'Gemini', color: '#4285F4', why: 'Broad coverage' },
                { task: 'Batch documentation', tool: 'Gemini', color: '#4285F4', why: 'Many files at once' },
                { task: 'Major feature', tool: 'Both', color: 'var(--cw-primary)', why: 'Plan + Execute relay' },
                { task: 'Migration project', tool: 'Both', color: 'var(--cw-primary)', why: 'Relay race pattern' },
              ].map((row, i) => (
                <tr key={i}>
                  <td className="p-3 font-medium" style={{ borderBottom: '1px solid var(--cw-border)', color: 'var(--cw-ink)' }}>{row.task}</td>
                  <td className="p-3" style={{ borderBottom: '1px solid var(--cw-border)' }}>
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: `${row.color}15`, color: row.color }}>{row.tool}</span>
                  </td>
                  <td className="p-3" style={{ borderBottom: '1px solid var(--cw-border)', color: 'var(--cw-ink-muted)' }}>{row.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section: Quick Tips */}
      <section className="mb-12">
        <div className="section-label">Quick Tips</div>
        <h2 className="mb-4">Remember These</h2>
        <CardGrid columns={3}>
          <Card>
            <h4 className="mb-1">Escape, Not Ctrl+C</h4>
            <p className="text-xs" style={{ color: 'var(--cw-ink-muted)' }}>In Claude, always use Escape to stop. Ctrl+C kills the process.</p>
          </Card>
          <Card>
            <h4 className="mb-1">Save Before Risky Ops</h4>
            <p className="text-xs" style={{ color: 'var(--cw-ink-muted)' }}>In Gemini, <code>/save checkpoint</code> before major changes.</p>
          </Card>
          <Card>
            <h4 className="mb-1">Config File is Key</h4>
            <p className="text-xs" style={{ color: 'var(--cw-ink-muted)' }}>Keep CLAUDE.md / GEMINI.md updated for best results.</p>
          </Card>
          <Card>
            <h4 className="mb-1">Reset at 20 Turns</h4>
            <p className="text-xs" style={{ color: 'var(--cw-ink-muted)' }}>Claude quality degrades after ~20 turns. Use <code>/reset</code>.</p>
          </Card>
          <Card>
            <h4 className="mb-1">@ for Files in Gemini</h4>
            <p className="text-xs" style={{ color: 'var(--cw-ink-muted)' }}>Use <code>@file.ts</code> syntax for fastest file loading.</p>
          </Card>
          <Card>
            <h4 className="mb-1">Plan Mode First</h4>
            <p className="text-xs" style={{ color: 'var(--cw-ink-muted)' }}>For complex tasks, start in plan mode (Shift+Tab in Claude).</p>
          </Card>
        </CardGrid>
      </section>

      {/* Section: Environment Variables */}
      <section className="mb-12">
        <div className="section-label">Config</div>
        <h2 className="mb-4">Environment Variables</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl p-5" style={{ background: 'var(--cw-surface)', border: '1px solid var(--cw-border)', borderTop: '3px solid #D97706' }}>
            <h4 className="mb-3 font-bold" style={{ color: '#D97706' }}>Claude Code</h4>
            <CodeBlock code={`ANTHROPIC_API_KEY=sk-ant-...
CLAUDE_LOG_FILE=~/.claude/log
CLAUDE_CONFIG_DIR=~/.claude`} />
            <p className="text-xs mt-2" style={{ color: 'var(--cw-ink-muted)' }}>Config: <code>./CLAUDE.md</code> or <code>~/.claude/CLAUDE.md</code></p>
          </div>
          <div className="rounded-xl p-5" style={{ background: 'var(--cw-surface)', border: '1px solid var(--cw-border)', borderTop: '3px solid #4285F4' }}>
            <h4 className="mb-3 font-bold" style={{ color: '#4285F4' }}>Gemini CLI</h4>
            <CodeBlock code={`GOOGLE_API_KEY=...
GEMINI_LOG_FILE=~/.config/gemini/log
GEMINI_CONFIG_DIR=~/.config/gemini`} />
            <p className="text-xs mt-2" style={{ color: 'var(--cw-ink-muted)' }}>Config: <code>./GEMINI.md</code> or <code>~/.config/gemini/config.json</code></p>
          </div>
        </div>
      </section>

      {/* Section: IDE Quick Reference */}
      <section className="mb-12">
        <div className="section-label">IDE</div>
        <h2 className="mb-4">Our Recommended Stack</h2>
        <Card>
          <div className="space-y-2 text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
            <div><strong>1. Google Antigravity</strong> (free) as primary IDE</div>
            <div><strong>2. Claude Code</strong> in terminal for complex reasoning</div>
            <div><strong>3. Gemini CLI</strong> for large codebase operations</div>
          </div>
        </Card>

        <div className="mt-4 text-sm" style={{ color: 'var(--cw-ink-muted)' }}>
          <strong>Other IDEs:</strong> VS Code (Free) | Cursor ($20/mo) | Windsurf ($15/mo) | Zed (Free/$20/mo) | JetBrains ($16.90/mo+)
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

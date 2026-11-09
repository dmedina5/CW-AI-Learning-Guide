'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Card, CardGrid } from '@/components/content/Card';
import { Callout } from '@/components/content/Callout';
import { CodeBlock } from '@/components/content/CodeBlock';
import { TierBadge } from '@/components/content/TierBadge';

export default function TipsPage() {
  return (
    <div>
      <TierBadge tier="expert" />
      <h1 className="mt-4 mb-4">Tips &amp; Tricks</h1>
      <p className="mb-12">
        Power-user techniques and shortcuts to maximize your productivity with Claude Code.
      </p>

      {/* Section: Keyboard Shortcuts */}
      <section className="mb-16" id="shortcuts">
        <div className="section-label">Speed</div>
        <h2 className="mb-4">
          Keyboard <span className="text-highlight">Shortcuts</span>
        </h2>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm" style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
            <thead>
              <tr>
                <th className="text-left p-3 font-semibold" style={{ background: 'var(--cw-surface)', borderBottom: '2px solid var(--cw-border)', color: 'var(--cw-ink)' }}>Shortcut</th>
                <th className="text-left p-3 font-semibold" style={{ background: 'var(--cw-surface)', borderBottom: '2px solid var(--cw-border)', color: 'var(--cw-ink)' }}>Action</th>
                <th className="text-left p-3 font-semibold" style={{ background: 'var(--cw-surface)', borderBottom: '2px solid var(--cw-border)', color: 'var(--cw-ink)' }}>Notes</th>
              </tr>
            </thead>
            <tbody>
              {[
                { key: 'Escape', action: 'Stop current action', note: 'Claude keeps the work done so far' },
                { key: 'Escape x2', action: 'Clear draft / Rewind', note: 'With an empty prompt, opens the rewind menu' },
                { key: 'Shift+Tab', action: 'Cycle permission modes', note: 'Manual, accept edits, plan' },
                { key: 'Alt+P (Win/Linux) / Option+P (Mac)', action: 'Switch model', note: 'On Mac, set Option as Meta in your terminal first' },
                { key: 'Ctrl+L', action: 'Redraw screen', note: 'Fixes a garbled display; keeps your conversation' },
                { key: 'Ctrl+R', action: 'Reverse search', note: 'Search command history' },
                { key: '@', action: 'Mention a file', note: 'Autocompletes file paths' },
                { key: '!', action: 'Shell mode', note: 'Run a command and share its output with Claude' },
                { key: 'Up/Down', action: 'Command history', note: 'Navigate previous prompts' },
              ].map((row, i) => (
                <tr key={i}>
                  <td className="p-3" style={{ borderBottom: '1px solid var(--cw-border)' }}>
                    <kbd className="px-2 py-0.5 rounded text-xs font-mono" style={{ background: 'var(--cw-surface)', border: '1px solid var(--cw-border)', color: 'var(--cw-ink)' }}>
                      {row.key}
                    </kbd>
                  </td>
                  <td className="p-3 font-medium" style={{ borderBottom: '1px solid var(--cw-border)', color: 'var(--cw-ink)' }}>{row.action}</td>
                  <td className="p-3 text-xs" style={{ borderBottom: '1px solid var(--cw-border)', color: 'var(--cw-ink-muted)' }}>{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Callout variant="warning">
          <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
            <strong>Use Escape to stop Claude.</strong> Escape interrupts the current response and
            keeps the work done so far, so you can redirect. Ctrl+C also interrupts a running
            operation; on an empty prompt, pressing it twice exits Claude Code.
          </p>
        </Callout>
      </section>

      {/* Section: Essential Commands */}
      <section className="mb-16" id="commands">
        <div className="section-label">Commands</div>
        <h2 className="mb-4">
          Essential <span className="text-highlight">Commands</span>
        </h2>

        <Card className="mb-4">
          <h4 className="mb-3">Context Management</h4>
          <CodeBlock code={`# Point Claude at a file: type @ and the path
@src/components/Button.tsx

# Several files: mention each one
@src/components/Button.tsx @src/components/Input.tsx

# Clear context and start fresh
/clear

# Compact context (summarize and reduce)
/compact

# See what is filling the context window
/context

# Go back to an earlier point in the conversation
/rewind`} />
        </Card>

        <Card className="mb-4">
          <h4 className="mb-3">Mode Commands</h4>
          <CodeBlock code={`# View/change permissions
/permissions

# Toggle sandbox mode (supported platforms only)
/sandbox

# Enter plan mode (also Shift+Tab)
/plan

# View help
/help`} />
        </Card>

        <Card>
          <h4 className="mb-3">Adding Notes to CLAUDE.md</h4>
          <p className="text-sm mb-3" style={{ color: 'var(--cw-ink-muted)' }}>
            Ask Claude to add a note to your CLAUDE.md without leaving the conversation, or open the
            file yourself with <code>/memory</code>:
          </p>
          <CodeBlock code={`# Ask in plain words
"Add this to CLAUDE.md: use camelCase for variables in this project"

# Or open and edit your CLAUDE.md files
/memory`} />
        </Card>
      </section>

      {/* Section: Power-User Techniques */}
      <section className="mb-16" id="power-user">
        <div className="section-label">Power User</div>
        <h2 className="mb-4">
          Advanced <span className="text-highlight">Techniques</span>
        </h2>

        <Card className="mb-4">
          <h4 className="mb-3">Multi-Instance Setup</h4>
          <CodeBlock code={`# Terminal 1: Research agent
claude "Focus on reading and understanding code only"

# Terminal 2: Implementation agent
claude "Focus on writing code based on plans"

# Share context via files
# Research agent writes PLAN.md
# Implementation agent reads PLAN.md`} />
        </Card>

        <Card className="mb-4">
          <h4 className="mb-3">Git Integration</h4>
          <CodeBlock code={`# Review changes before committing
> "Show me a summary of all changes since last commit"

# Generate commit message
> "Generate a conventional commit message for these changes"

# Create PR description
> "Create a PR description with summary and test plan"`} />
        </Card>

        <Card className="mb-4">
          <h4 className="mb-3">Prompt Library</h4>
          <div className="space-y-3">
            {[
              { cat: 'Analysis', prompt: '"Analyze this file and list 3 potential race conditions or concurrency issues."' },
              { cat: 'Planning', prompt: '"Create a step-by-step plan to add [feature]. Save it to PLAN.md."' },
              { cat: 'Implementation', prompt: '"Read PLAN.md and execute steps 1-5, updating the file with DONE status as you go."' },
              { cat: 'Review', prompt: '"Review this PR diff for security vulnerabilities, focusing on OWASP Top 10."' },
            ].map((item, i) => (
              <div key={i} className="p-3 rounded-lg" style={{ background: 'var(--cw-primary-light)' }}>
                <div className="text-[10px] font-semibold uppercase mb-1" style={{ color: 'var(--cw-primary)' }}>{item.cat}</div>
                <p className="text-xs font-mono" style={{ color: 'var(--cw-ink-secondary)' }}>{item.prompt}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h4 className="mb-3">IDE Integration</h4>
          <p className="text-sm mb-3" style={{ color: 'var(--cw-ink-muted)' }}>
            Install the official Anthropic extension from the VS Code Marketplace
            (Ctrl+Shift+X, search &ldquo;Claude Code&rdquo;). Or use Claude in the integrated
            terminal with <kbd>Ctrl+`</kbd>.
          </p>
          <Callout variant="purple">
            <p className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
              All IDEs support running Claude Code in their integrated terminals.
              Use <kbd>Ctrl+`</kbd> to open a terminal and type <code>claude</code>.
            </p>
          </Callout>
        </Card>
      </section>

      {/* Section: Custom Skills */}
      <section className="mb-16" id="skills">
        <div className="section-label">Extensibility</div>
        <h2 className="mb-4">
          Creating Custom <span className="text-highlight">Skills</span>
        </h2>
        <p className="mb-6" style={{ color: 'var(--cw-ink-secondary)' }}>
          Extend Claude Code with reusable prompt templates that save time and enforce consistency.
        </p>

        <CodeBlock
          title="Quick Skill Setup"
          code={`# Create a skill directory
mkdir -p .claude/skills/my-skill

# Create SKILL.md with frontmatter
cat > .claude/skills/my-skill/SKILL.md << 'EOF'
---
name: my-skill
description: Brief description for auto-invocation
allowed-tools: Grep, Read, Glob
user-invocable: true
model: haiku
---

# My Custom Skill

Instructions for what the skill should do...

## Usage
/my-skill [arguments]
EOF

# Now use it!
/my-skill`}
        />

        <Card className="mt-6">
          <h4 className="mb-3">Skill Frontmatter Reference</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
              <thead>
                <tr>
                  <th className="text-left p-2 font-semibold" style={{ background: 'var(--cw-surface)', borderBottom: '2px solid var(--cw-border)', color: 'var(--cw-ink)' }}>Field</th>
                  <th className="text-left p-2 font-semibold" style={{ background: 'var(--cw-surface)', borderBottom: '2px solid var(--cw-border)', color: 'var(--cw-ink)' }}>Required</th>
                  <th className="text-left p-2 font-semibold" style={{ background: 'var(--cw-surface)', borderBottom: '2px solid var(--cw-border)', color: 'var(--cw-ink)' }}>Description</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { field: 'name', required: 'No', desc: 'Skill identifier (used with /skill-name). Defaults to the folder name' },
                  { field: 'description', required: 'Recommended', desc: 'When to use this skill (helps auto-invocation). If omitted, the first line of the file is used' },
                  { field: 'allowed-tools', required: 'No', desc: 'Tools Claude can use without asking permission while the skill runs (e.g., Grep, Read, Glob)' },
                  { field: 'disallowed-tools', required: 'No', desc: 'Tools removed while the skill is active (use this to restrict tools)' },
                  { field: 'user-invocable', required: 'No', desc: 'Default true. Set false to hide the skill from the / menu so only Claude can use it' },
                  { field: 'model', required: 'No', desc: 'Override model: haiku (fast), sonnet, opus, fable, or inherit' },
                ].map((row, i) => (
                  <tr key={i}>
                    <td className="p-2 font-mono" style={{ borderBottom: '1px solid var(--cw-border)', color: 'var(--cw-primary)' }}>{row.field}</td>
                    <td className="p-2" style={{ borderBottom: '1px solid var(--cw-border)', color: 'var(--cw-ink-secondary)' }}>{row.required}</td>
                    <td className="p-2" style={{ borderBottom: '1px solid var(--cw-border)', color: 'var(--cw-ink-muted)' }}>{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Callout variant="sage" className="mt-6">
          <p className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
            <strong>Skill Tips:</strong> Use <code>model: haiku</code> for search/lookup skills (fast and cheap).
            Use <code>model: sonnet</code> for code generation. To restrict tools, list them in{' '}
            <code>disallowed-tools</code>; <code>allowed-tools</code> only skips permission prompts.
            Put team skills in <code>.claude/skills/</code> (git-tracked) for sharing.
          </p>
        </Callout>
      </section>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8 mt-8" style={{ borderTop: '1px solid var(--cw-border)' }}>
        <Link
          href="/road-to-agentic-engineering/workflows"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all pill-btn"
        >
          <ArrowLeft size={16} /> Workflows
        </Link>
        <Link
          href="/road-to-agentic-engineering/cheatsheet"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:gap-3"
          style={{ background: 'var(--cw-primary)', color: '#fff' }}
        >
          Next: Cheatsheet <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

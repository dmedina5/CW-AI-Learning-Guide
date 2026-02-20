'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Card, CardGrid } from '@/components/content/Card';
import { Callout } from '@/components/content/Callout';
import { CodeBlock } from '@/components/content/CodeBlock';
import { TierBadge } from '@/components/content/TierBadge';
import { ToolTabs } from '@/components/content/ToolTabs';

export default function TipsPage() {
  return (
    <div>
      <TierBadge tier="expert" />
      <h1 className="mt-4 mb-4">Tips &amp; Tricks</h1>
      <p className="mb-12">
        Power-user techniques and shortcuts to maximize your productivity with Claude Code
        and Gemini CLI.
      </p>

      {/* Section: Keyboard Shortcuts */}
      <section className="mb-16" id="shortcuts">
        <div className="section-label">Speed</div>
        <h2 className="mb-4">
          Keyboard <span className="text-highlight">Shortcuts</span>
        </h2>

        <ToolTabs>
          {{
            Claude: (
              <div>
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
                        { key: 'Escape', action: 'Stop current action', note: 'Use this, NOT Ctrl+C' },
                        { key: 'Escape x2', action: 'Message history / Rewind', note: 'Browse previous messages' },
                        { key: 'Shift+Tab', action: 'Toggle plan mode', note: 'Think before executing' },
                        { key: 'Alt+M (Win) / Option+M (Mac)', action: 'Toggle permissions', note: 'Change permission mode' },
                        { key: 'Alt+P (Win) / Option+P (Mac)', action: 'Switch model', note: 'Change AI model' },
                        { key: 'Alt+T (Win) / Option+T (Mac)', action: 'Extended thinking', note: 'Toggle deep reasoning' },
                        { key: 'Ctrl+L', action: 'Clear screen', note: 'Clear terminal display' },
                        { key: 'Ctrl+R', action: 'Reverse search', note: 'Search command history' },
                        { key: '#', action: 'Update CLAUDE.md', note: 'Quick context update' },
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
                    <strong>Always use Escape to stop Claude, not Ctrl+C.</strong> Ctrl+C terminates
                    the entire process, while Escape gracefully interrupts the current operation.
                  </p>
                </Callout>
              </div>
            ),
            Gemini: (
              <div>
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
                        { key: '@', action: 'File reference', note: 'Add file to context' },
                        { key: 'Ctrl+C x2', action: 'Cancel / Quit', note: 'Press twice to exit' },
                        { key: 'Escape x2', action: 'Browse history', note: 'Previous interactions' },
                        { key: 'Shift+Tab', action: 'Auto-apply mode', note: 'Toggle auto-apply' },
                        { key: 'Ctrl+Y', action: 'YOLO mode', note: 'Auto-approval toggle' },
                        { key: 'Ctrl+L', action: 'Clear screen', note: 'Clear terminal' },
                        { key: 'Ctrl+S', action: 'Print full response', note: 'Show complete output' },
                        { key: 'Ctrl+T', action: 'Tool descriptions', note: 'Toggle tool info' },
                        { key: 'Tab', action: 'Autocomplete', note: 'File paths after @' },
                        { key: 'Alt+Z (Win) / Cmd+Z (Mac)', action: 'Undo', note: 'Undo last action' },
                        { key: 'Up/Down', action: 'History navigation', note: 'Browse previous prompts' },
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

                <Callout variant="blue">
                  <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
                    Use <kbd>Tab</kbd> after <code>@</code> to autocomplete file paths.
                    Gemini indexes your project for fast suggestions.
                  </p>
                </Callout>
              </div>
            ),
            Shared: (
              <div>
                <CardGrid columns={2}>
                  <Card>
                    <h4 className="mb-2">Both Tools</h4>
                    <div className="space-y-2 text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
                      <div><kbd className="px-1.5 py-0.5 rounded text-xs" style={{ background: 'var(--cw-surface)', border: '1px solid var(--cw-border)' }}>Escape x2</kbd> &mdash; Browse history</div>
                      <div><kbd className="px-1.5 py-0.5 rounded text-xs" style={{ background: 'var(--cw-surface)', border: '1px solid var(--cw-border)' }}>Ctrl+L</kbd> &mdash; Clear screen</div>
                      <div><kbd className="px-1.5 py-0.5 rounded text-xs" style={{ background: 'var(--cw-surface)', border: '1px solid var(--cw-border)' }}>Up/Down</kbd> &mdash; Command history</div>
                    </div>
                  </Card>
                  <Card>
                    <h4 className="mb-2">Key Differences</h4>
                    <div className="space-y-2 text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
                      <div><strong>Claude:</strong> Escape to stop (not Ctrl+C)</div>
                      <div><strong>Gemini:</strong> Ctrl+C x2 to quit</div>
                      <div><strong>Claude:</strong> Shift+Tab = plan mode</div>
                      <div><strong>Gemini:</strong> Shift+Tab = auto-apply</div>
                    </div>
                  </Card>
                </CardGrid>
              </div>
            ),
          }}
        </ToolTabs>
      </section>

      {/* Section: Essential Commands */}
      <section className="mb-16" id="commands">
        <div className="section-label">Commands</div>
        <h2 className="mb-4">
          Essential <span className="text-highlight">Commands</span>
        </h2>

        <ToolTabs>
          {{
            Claude: (
              <div>
                <Card className="mb-4">
                  <h4 className="mb-3">Context Management</h4>
                  <CodeBlock code={`# Add file to context
/add src/components/Button.tsx

# Add multiple files
/add src/**/*.ts

# Clear context and start fresh
/clear

# Compact context (summarize and reduce)
/compact

# Reset session
/reset`} />
                </Card>

                <Card className="mb-4">
                  <h4 className="mb-3">Mode Commands</h4>
                  <CodeBlock code={`# View/change permissions
/permissions

# Toggle sandbox mode
/sandbox on
/sandbox off

# Enter plan mode (also Shift+Tab)
/plan

# View help
/help`} />
                </Card>

                <Card>
                  <h4 className="mb-3">The Hash Key Trick</h4>
                  <p className="text-sm mb-3" style={{ color: 'var(--cw-ink-muted)' }}>
                    Press <kbd className="px-1.5 py-0.5 rounded text-xs" style={{ background: 'var(--cw-surface)', border: '1px solid var(--cw-border)' }}>#</kbd> to
                    quickly add notes to your CLAUDE.md without leaving the conversation:
                  </p>
                  <CodeBlock code={`# Type # then your note
# "Remember: use camelCase for variables in this project"

# Claude adds it to CLAUDE.md automatically`} />
                </Card>
              </div>
            ),
            Gemini: (
              <div>
                <Card className="mb-4">
                  <h4 className="mb-3">Session Management</h4>
                  <CodeBlock code={`# Save current session
/save my-feature-session

# Load saved session
/load my-feature-session

# List saved sessions
/sessions

# Clear current context
/clear

# Show token usage
/tokens`} />
                </Card>

                <Card className="mb-4">
                  <h4 className="mb-3">Configuration</h4>
                  <CodeBlock code={`# Change model
/model gemini-3-pro

# Toggle sandbox mode
/sandbox

# View current settings
/config`} />
                </Card>

                <Card>
                  <h4 className="mb-3">Memory Management</h4>
                  <p className="text-sm mb-3" style={{ color: 'var(--cw-ink-muted)' }}>
                    Gemini has persistent memory across sessions:
                  </p>
                  <CodeBlock code={`# Save coding style
> "Remember: I use 2-space indentation, single quotes, and semicolons"

# Save project context
> "Remember: This project uses pnpm and Vitest"

# Query memory
> "What do you remember about my preferences?"`} />
                </Card>
              </div>
            ),
            Shared: (
              <div>
                <p className="mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
                  Select a tool-specific tab above to see the full command reference for each tool.
                </p>
                <Card>
                  <h4 className="mb-3">Common Commands Across Both Tools</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm" style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
                      <thead>
                        <tr>
                          <th className="text-left p-2 font-semibold" style={{ background: 'var(--cw-surface)', borderBottom: '2px solid var(--cw-border)', color: 'var(--cw-ink)' }}>Action</th>
                          <th className="text-left p-2 font-semibold" style={{ background: 'var(--cw-surface)', borderBottom: '2px solid var(--cw-border)', color: '#D97706' }}>Claude</th>
                          <th className="text-left p-2 font-semibold" style={{ background: 'var(--cw-surface)', borderBottom: '2px solid var(--cw-border)', color: '#4285F4' }}>Gemini</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { action: 'Clear context', claude: '/clear', gemini: '/clear' },
                          { action: 'Get help', claude: '/help', gemini: '/help' },
                          { action: 'Add files', claude: '/add file.ts', gemini: '@file.ts' },
                          { action: 'Save state', claude: 'git commit', gemini: '/save name' },
                        ].map((row, i) => (
                          <tr key={i}>
                            <td className="p-2" style={{ borderBottom: '1px solid var(--cw-border)', color: 'var(--cw-ink)' }}>{row.action}</td>
                            <td className="p-2 font-mono text-xs" style={{ borderBottom: '1px solid var(--cw-border)', color: 'var(--cw-ink-secondary)' }}>{row.claude}</td>
                            <td className="p-2 font-mono text-xs" style={{ borderBottom: '1px solid var(--cw-border)', color: 'var(--cw-ink-secondary)' }}>{row.gemini}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>
            ),
          }}
        </ToolTabs>
      </section>

      {/* Section: Power-User Techniques */}
      <section className="mb-16" id="power-user">
        <div className="section-label">Power User</div>
        <h2 className="mb-4">
          Advanced <span className="text-highlight">Techniques</span>
        </h2>

        <ToolTabs>
          {{
            Claude: (
              <div>
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

                <Card>
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
              </div>
            ),
            Gemini: (
              <div>
                <Card className="mb-4">
                  <h4 className="mb-3">Token Caching</h4>
                  <p className="text-sm mb-3" style={{ color: 'var(--cw-ink-muted)' }}>
                    Load large contexts once, then ask multiple questions without reloading:
                  </p>
                  <CodeBlock code={`# First query loads files (slower, uses more tokens)
> @src/**/*.ts "Explain the architecture"

# Subsequent queries reuse cached context (faster)
> "Now, what about error handling?"
> "And how is logging implemented?"

# Check token usage
> /tokens`} />
                </Card>

                <Card className="mb-4">
                  <h4 className="mb-3">Headless Mode</h4>
                  <p className="text-sm mb-3" style={{ color: 'var(--cw-ink-muted)' }}>
                    Run Gemini without interactive mode for automation:
                  </p>
                  <CodeBlock code={`# Single query
gemini "Explain the main function in @src/index.ts"

# With file output
gemini "Generate tests for @src/utils.ts" > tests.ts

# In scripts
#!/bin/bash
gemini "Review @$1 for security issues" | tee review.md`} />
                </Card>

                <Card>
                  <h4 className="mb-3">Prompt Library</h4>
                  <div className="space-y-3">
                    {[
                      { cat: 'Exploration', prompt: '"@src/**/*.ts Create a dependency graph of all modules. Show which files import what."' },
                      { cat: 'Analysis', prompt: '"@src/**/*.ts Find all duplicate or near-duplicate code. Suggest consolidation."' },
                      { cat: 'Batch', prompt: '"@src/components/**/*.tsx Add JSDoc to all exported functions. Show changes first."' },
                      { cat: 'Documentation', prompt: '"@src/**/* Generate a README.md with: overview, setup, architecture, and API docs."' },
                    ].map((item, i) => (
                      <div key={i} className="p-3 rounded-lg" style={{ background: 'var(--cw-primary-light)' }}>
                        <div className="text-[10px] font-semibold uppercase mb-1" style={{ color: 'var(--cw-primary)' }}>{item.cat}</div>
                        <p className="text-xs font-mono" style={{ color: 'var(--cw-ink-secondary)' }}>{item.prompt}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            ),
            Shared: (
              <div>
                <h3 className="mb-4">IDE Integration Tips</h3>
                <CardGrid columns={2}>
                  <Card>
                    <h4 className="mb-2">VS Code + Claude Code</h4>
                    <p className="text-sm" style={{ color: 'var(--cw-ink-muted)' }}>
                      Install the official Anthropic extension from the VS Code Marketplace
                      (Ctrl+Shift+X, search &ldquo;Claude Code&rdquo;). Or use Claude in the integrated
                      terminal with Ctrl+`.
                    </p>
                  </Card>
                  <Card>
                    <h4 className="mb-2">Google Antigravity</h4>
                    <p className="text-sm" style={{ color: 'var(--cw-ink-muted)' }}>
                      Free AI-first IDE with native Gemini 3 support. Use Manager View to orchestrate
                      multiple agents in parallel. Supports Claude as an alternate model.
                    </p>
                  </Card>
                </CardGrid>

                <Callout variant="purple" className="mt-6">
                  <p className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
                    <strong>Our recommended stack:</strong> Google Antigravity (free) as primary IDE,
                    Claude Code in terminal for complex reasoning, Gemini CLI for large codebase operations.
                  </p>
                </Callout>
              </div>
            ),
          }}
        </ToolTabs>
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
                  { field: 'name', required: 'Yes', desc: 'Skill identifier (used with /skill-name)' },
                  { field: 'description', required: 'Yes', desc: 'When to use this skill (helps auto-invocation)' },
                  { field: 'allowed-tools', required: 'No', desc: 'Restrict tools (e.g., Grep, Read, Glob)' },
                  { field: 'user-invocable', required: 'No', desc: 'If true, user can invoke with /skill-name' },
                  { field: 'model', required: 'No', desc: 'Override model: haiku (fast), sonnet, or opus' },
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
            Use <code>model: sonnet</code> for code generation. Restrict tools to minimize risk and tokens.
            Put team skills in <code>.claude/skills/</code> (git-tracked) for sharing.
          </p>
        </Callout>
      </section>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8 mt-8" style={{ borderTop: '1px solid var(--cw-border)' }}>
        <Link
          href="/vibe-coding/workflows"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all pill-btn"
        >
          <ArrowLeft size={16} /> Workflows
        </Link>
        <Link
          href="/vibe-coding/cheatsheet"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:gap-3"
          style={{ background: 'var(--cw-primary)', color: '#fff' }}
        >
          Next: Cheatsheet <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Card, CardGrid } from '@/components/content/Card';
import { Callout } from '@/components/content/Callout';
import { CodeBlock } from '@/components/content/CodeBlock';
import { TierBadge } from '@/components/content/TierBadge';
import { ToolTabs } from '@/components/content/ToolTabs';

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

      {/* Section: Tool Overview */}
      <section className="mb-16" id="tools">
        <div className="section-label">Your AI Assistants</div>
        <h2 className="mb-4">
          Pick the right <span className="text-highlight">tool</span> for the job
        </h2>
        <p className="mb-6">
          Vibe coding in 2026 is not about finding one tool that does everything. It is about
          having a &ldquo;team&rdquo; of AI assistants that you direct. Use Claude when you need
          careful thinking, Gemini when you need speed and scale, and switch between them as needed.
        </p>

        <CardGrid columns={2}>
          <div
            className="rounded-2xl p-8"
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
              Claude Code is like having a brilliant colleague who can analyze complex situations,
              think through problems carefully, and provide well-reasoned solutions. It excels at
              understanding context and giving detailed, thoughtful responses.
            </p>
            <div className="flex flex-col gap-1.5">
              <div className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
                <strong>Strengths:</strong> Deep thinking, quality analysis, understanding nuance
              </div>
              <div className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
                <strong>Best For:</strong> Complex tasks, problem-solving, detailed explanations
              </div>
            </div>
          </div>

          <div
            className="rounded-2xl p-8"
            style={{
              background: 'var(--cw-surface)',
              border: '1px solid var(--cw-border)',
              borderLeft: '4px solid #4285F4',
            }}
          >
            <h3 className="mb-2" style={{ color: '#4285F4' }}>Gemini CLI</h3>
            <p className="text-sm font-semibold mb-3" style={{ color: 'var(--cw-ink-muted)' }}>
              The Fast Executor
            </p>
            <p className="text-base mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
              Gemini CLI (powered by Gemini 3) is like a speedy assistant who can handle large
              amounts of information quickly and execute tasks reliably. It is great when you need
              to work with lots of files or data at once.
            </p>
            <div className="flex flex-col gap-1.5">
              <div className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
                <strong>Free Tier:</strong> 60 requests/min, 1000/day
              </div>
              <div className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
                <strong>Best For:</strong> Large projects, batch tasks, research
              </div>
            </div>
          </div>
        </CardGrid>
      </section>

      {/* Section: Tool-Specific Content */}
      <section className="mb-16" id="when-to-use">
        <div className="section-label">When to Use Each</div>
        <h2 className="mb-6">
          Choosing <span className="text-highlight">your tool</span>
        </h2>

        <ToolTabs>
          {{
            Claude: (
              <div>
                <h3 className="mb-4">When to Use Claude Code</h3>

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
              </div>
            ),
            Gemini: (
              <div>
                <h3 className="mb-4">When to Use Gemini CLI</h3>

                <Card>
                  <h4 className="mb-3" style={{ color: 'var(--cw-ink)' }}>Best Use Cases</h4>
                  <div className="space-y-2">
                    {[
                      '"Search through all our documents for mentions of this topic."',
                      '"Process all these files at once."',
                      '"Find inconsistencies across multiple spreadsheets."',
                      'Tasks requiring lots of files or data to be reviewed together.',
                      'Large-scale codebase analysis with up to 2M token context.',
                      'Batch documentation generation across entire projects.',
                    ].map((item, i) => (
                      <div key={i} className="flex items-baseline gap-2.5 text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: '#4285F4' }} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Callout variant="blue" className="mt-6">
                  <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
                    <strong>Free Tier:</strong> Gemini CLI offers a generous free tier with 1 million tokens,
                    60 requests per minute, and 1000 requests per day.
                  </p>
                </Callout>

                <CodeBlock
                  title="Gemini CLI Installation"
                  code={`npm install -g @google/gemini-cli
gemini auth login
gemini`}
                />
              </div>
            ),
            Shared: (
              <div>
                <h3 className="mb-4">The Key Principle</h3>

                <Callout variant="purple">
                  <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
                    <strong>Pick the best AI assistant for each specific task.</strong> Different tools
                    have different strengths &mdash; use them together for the best results.
                  </p>
                </Callout>

                <p className="mt-6 mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
                  Think of it like having two team members with complementary skills:
                </p>

                <CardGrid columns={2}>
                  <Card>
                    <h4 className="mb-2">The Thinker</h4>
                    <p className="text-sm" style={{ color: 'var(--cw-ink-muted)' }}>
                      <strong>Claude Code</strong> &mdash; Deep analysis and problem-solving.
                      Go to Claude when you need careful reasoning about complex problems.
                    </p>
                  </Card>
                  <Card>
                    <h4 className="mb-2">The Executor</h4>
                    <p className="text-sm" style={{ color: 'var(--cw-ink-muted)' }}>
                      <strong>Gemini CLI</strong> &mdash; Fast execution and large tasks.
                      Go to Gemini when you need to process many files or data quickly.
                    </p>
                  </Card>
                </CardGrid>
              </div>
            ),
          }}
        </ToolTabs>
      </section>

      {/* Section: Tool Comparison Table */}
      <section className="mb-16" id="comparison">
        <div className="section-label">Side-by-Side</div>
        <h2 className="mb-6">Tool Comparison</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm" style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
            <thead>
              <tr>
                <th className="text-left p-4 font-semibold" style={{ background: 'var(--cw-surface)', borderBottom: '2px solid var(--cw-border)', color: 'var(--cw-ink)' }}>Feature</th>
                <th className="text-left p-4 font-semibold" style={{ background: 'var(--cw-surface)', borderBottom: '2px solid var(--cw-border)', color: '#D97706' }}>Claude Code</th>
                <th className="text-left p-4 font-semibold" style={{ background: 'var(--cw-surface)', borderBottom: '2px solid var(--cw-border)', color: '#4285F4' }}>Gemini CLI</th>
              </tr>
            </thead>
            <tbody>
              {[
                { feature: 'Latest Model', claude: 'Claude Opus 4.5', gemini: 'Gemini 3 Pro / Flash / Deep Think' },
                { feature: 'Free Tier', claude: 'Limited', gemini: '60 req/min, 1000/day' },
                { feature: 'Strengths', claude: 'Deep reasoning, code quality', gemini: 'Speed, handles lots of data' },
                { feature: 'Best For', claude: 'Complex tasks, analysis', gemini: 'Research, large projects' },
                { feature: 'Config File', claude: 'CLAUDE.md', gemini: 'GEMINI.md' },
                { feature: 'Context Window', claude: '200K tokens', gemini: 'Up to 2M tokens' },
                { feature: 'File Reference', claude: '/add file.ts', gemini: '@file.ts' },
              ].map((row, i) => (
                <tr key={i}>
                  <td className="p-4 font-medium" style={{ borderBottom: '1px solid var(--cw-border)', color: 'var(--cw-ink)' }}>{row.feature}</td>
                  <td className="p-4" style={{ borderBottom: '1px solid var(--cw-border)', color: 'var(--cw-ink-secondary)' }}>{row.claude}</td>
                  <td className="p-4" style={{ borderBottom: '1px solid var(--cw-border)', color: 'var(--cw-ink-secondary)' }}>{row.gemini}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section: Quick Start */}
      <section className="mb-16" id="quick-start">
        <div className="section-label">Get Going</div>
        <h2 className="mb-4">
          Quick <span className="text-highlight">Start</span>
        </h2>
        <p className="mb-6">
          Ready to start vibe coding? Follow the installation guide for step-by-step setup instructions
          for both Claude Code and Gemini CLI on your platform.
        </p>

        <CardGrid columns={3}>
          <Card number="01">
            <h3 className="mb-2">Install Tools</h3>
            <p className="text-base" style={{ color: 'var(--cw-ink-muted)' }}>
              Follow the installation guide to set up Claude Code and Gemini CLI on Windows, Mac, or Linux.
            </p>
          </Card>
          <Card number="02">
            <h3 className="mb-2">Authenticate</h3>
            <p className="text-base" style={{ color: 'var(--cw-ink-muted)' }}>
              Log in with your credentials. Claude uses Anthropic auth, Gemini uses Google OAuth.
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

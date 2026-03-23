'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, Monitor, FileText, FolderOpen, Zap, Users, Download, Shield } from 'lucide-react';
import { Card, CardGrid } from '@/components/content/Card';
import { Callout } from '@/components/content/Callout';
import { TierBadge } from '@/components/content/TierBadge';
import { StepList } from '@/components/content/StepList';
import { PlatformTabs } from '@/components/content/PlatformTabs';

export default function ClaudeCoworkPage() {
  return (
    <div>
      <TierBadge tier="beginner" />
      <h1 className="mt-4 mb-4">Claude Cowork</h1>
      <p className="mb-12">
        An agentic AI assistant that works directly with your files, folders, and desktop
        apps &mdash; handling multi-step knowledge work so you can focus on the decisions that matter.
      </p>

      {/* Section: What is Cowork */}
      <section className="mb-16" id="what-is-cowork">
        <div className="section-label">The Big Idea</div>
        <h2 className="mb-6">
          What is <span className="text-highlight">Claude Cowork?</span>
        </h2>
        <p className="mb-6" style={{ color: 'var(--cw-ink-secondary)' }}>
          Claude Cowork is a feature inside the Claude Desktop App that goes beyond
          chat. Instead of answering one question at a time, Cowork autonomously executes
          complete tasks &mdash; organizing files, synthesizing documents, extracting data,
          and summarizing research across your local files and folders.
        </p>
        <p className="mb-8" style={{ color: 'var(--cw-ink-secondary)' }}>
          Think of it as a knowledgeable assistant who already read every brief, memo, and
          spreadsheet in your folder &mdash; and can produce real output files without you
          coordinating each step.
        </p>

        <Callout variant="sage">
          <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
            <strong>Anyone at Cover Whale with Claude Chat access can use Cowork.</strong> It&apos;s
            built into the Claude Desktop App &mdash; just download it and click the Cowork tab.
            No additional license or approval needed.
          </p>
        </Callout>
      </section>

      {/* Section: Key Features */}
      <section className="mb-16" id="features">
        <div className="section-label">What It Can Do</div>
        <h2 className="mb-6">
          Key <span className="text-highlight">Features</span>
        </h2>

        <CardGrid columns={3}>
          <Card>
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'var(--cw-primary-light)' }}
              >
                <FolderOpen size={20} style={{ color: 'var(--cw-primary)' }} />
              </div>
              <h3 className="text-base font-bold" style={{ color: 'var(--cw-ink)' }}>
                File & Folder Access
              </h3>
            </div>
            <p className="text-sm" style={{ color: 'var(--cw-ink-muted)' }}>
              Point Cowork at any folder on your computer. It reads your documents, spreadsheets,
              and data files &mdash; then works with them directly.
            </p>
          </Card>

          <Card>
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(58, 158, 110, 0.1)' }}
              >
                <FileText size={20} style={{ color: 'var(--cw-success)' }} />
              </div>
              <h3 className="text-base font-bold" style={{ color: 'var(--cw-ink)' }}>
                Creates Real Files
              </h3>
            </div>
            <p className="text-sm" style={{ color: 'var(--cw-ink-muted)' }}>
              Output appears as actual files in your folders &mdash; ready to open, edit, or
              share. No copy-pasting from a chat window.
            </p>
          </Card>

          <Card>
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(74, 111, 165, 0.1)' }}
              >
                <Zap size={20} style={{ color: 'var(--cw-info)' }} />
              </div>
              <h3 className="text-base font-bold" style={{ color: 'var(--cw-ink)' }}>
                Multi-Step Tasks
              </h3>
            </div>
            <p className="text-sm" style={{ color: 'var(--cw-ink-muted)' }}>
              Cowork handles entire workflows autonomously &mdash; renaming, sorting,
              deduplicating, extracting, and synthesizing without you managing each step.
            </p>
          </Card>

          <Card>
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(217, 85, 80, 0.1)' }}
              >
                <Monitor size={20} style={{ color: 'var(--cw-warning)' }} />
              </div>
              <h3 className="text-base font-bold" style={{ color: 'var(--cw-ink)' }}>
                Desktop Integration
              </h3>
            </div>
            <p className="text-sm" style={{ color: 'var(--cw-ink-muted)' }}>
              Works alongside your desktop applications. Cowork can interact with files
              from Word, Excel, PDF viewers, and other apps on your machine.
            </p>
          </Card>

          <Card>
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'var(--cw-primary-light)' }}
              >
                <Users size={20} style={{ color: 'var(--cw-primary)' }} />
              </div>
              <h3 className="text-base font-bold" style={{ color: 'var(--cw-ink)' }}>
                Matches Your Voice
              </h3>
            </div>
            <p className="text-sm" style={{ color: 'var(--cw-ink-muted)' }}>
              Drop writing samples or style notes into your folder. Cowork learns your tone
              and produces drafts that sound like you wrote them.
            </p>
          </Card>

          <Card>
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(58, 158, 110, 0.1)' }}
              >
                <Shield size={20} style={{ color: 'var(--cw-success)' }} />
              </div>
              <h3 className="text-base font-bold" style={{ color: 'var(--cw-ink)' }}>
                Human Oversight
              </h3>
            </div>
            <p className="text-sm" style={{ color: 'var(--cw-ink-muted)' }}>
              Cowork completes tasks but keeps consequential decisions with you. You stay in
              control of what gets finalized and shared.
            </p>
          </Card>
        </CardGrid>
      </section>

      {/* Section: Who Should Use It */}
      <section className="mb-16" id="who-should-use-it">
        <div className="section-label">Is It For You?</div>
        <h2 className="mb-6">
          Who Should Use <span className="text-highlight">Cowork?</span>
        </h2>
        <p className="mb-6" style={{ color: 'var(--cw-ink-secondary)' }}>
          Cowork is designed for non-technical knowledge workers &mdash; anyone who spends
          their day working with documents, data, and files.
        </p>

        <CardGrid columns={2}>
          <Card>
            <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--cw-ink)' }}>
              Great for
            </h3>
            <div className="space-y-2">
              {[
                'Underwriters reviewing submissions and loss runs',
                'Operations teams organizing reports and data',
                'Finance preparing analyses and reconciliations',
                'Claims adjusters synthesizing case documents',
                'Anyone drafting memos, proposals, or summaries',
                'Researchers pulling insights from multiple sources',
              ].map((item, i) => (
                <div key={i} className="flex items-baseline gap-2 text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: 'var(--cw-success)' }} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--cw-ink)' }}>
              Cowork vs. Claude Chat
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--cw-ink-muted)' }}>
                  Use Cowork when
                </p>
                <p className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
                  You need real files created, want to work with local documents, or have
                  multi-step tasks that would take several chat exchanges.
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--cw-ink-muted)' }}>
                  Use Claude Chat when
                </p>
                <p className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
                  You have quick questions, recurring tasks with saved context, or need
                  access from your phone or any browser.
                </p>
              </div>
            </div>
          </Card>
        </CardGrid>
      </section>

      {/* Section: Installation */}
      <section className="mb-16" id="installation">
        <div className="section-label">Get Started</div>
        <h2 className="mb-6">
          Download & <span className="text-highlight">Install</span>
        </h2>
        <p className="mb-6" style={{ color: 'var(--cw-ink-secondary)' }}>
          Cowork is built into the Claude Desktop App. Install the app, sign in with your
          Cover Whale Claude account, and click the Cowork tab.
        </p>

        <PlatformTabs>
          {{
            Windows: (
              <StepList
                steps={[
                  {
                    title: 'Download the installer',
                    description: (
                      <>
                        Go to{' '}
                        <a
                          href="https://claude.ai/download"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold underline"
                          style={{ color: 'var(--cw-primary)' }}
                        >
                          claude.ai/download
                        </a>{' '}
                        and click <strong>Download for Windows</strong>. The installer
                        (<code className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'var(--cw-surface)' }}>
                          Claude-Setup.exe
                        </code>) will save to your Downloads folder.
                      </>
                    ),
                  },
                  {
                    title: 'Run the installer',
                    description: (
                      <>
                        Double-click <strong>Claude-Setup.exe</strong> and follow the
                        prompts. The app installs like any standard Windows application &mdash; no
                        admin privileges required.
                      </>
                    ),
                  },
                  {
                    title: 'Sign in',
                    description: (
                      <>
                        Open Claude from the Start menu or desktop shortcut. Sign in with
                        your <strong>Cover Whale Claude account</strong> (the same credentials you
                        use for claude.ai in the browser).
                      </>
                    ),
                  },
                  {
                    title: 'Open the Cowork tab',
                    description: (
                      <>
                        Once signed in, click the <strong>Cowork</strong> tab in the left
                        sidebar. Point it at a folder on your machine to give it context, then
                        start your first task.
                      </>
                    ),
                  },
                ]}
              />
            ),
            Mac: (
              <StepList
                steps={[
                  {
                    title: 'Download the installer',
                    description: (
                      <>
                        Go to{' '}
                        <a
                          href="https://claude.ai/download"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold underline"
                          style={{ color: 'var(--cw-primary)' }}
                        >
                          claude.ai/download
                        </a>{' '}
                        and click <strong>Download for Mac</strong>. The disk image
                        (<code className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'var(--cw-surface)' }}>
                          Claude.dmg
                        </code>) will save to your Downloads folder.
                      </>
                    ),
                  },
                  {
                    title: 'Install the app',
                    description: (
                      <>
                        Open <strong>Claude.dmg</strong> and drag the Claude icon into your
                        Applications folder. Eject the disk image when done.
                      </>
                    ),
                  },
                  {
                    title: 'Sign in',
                    description: (
                      <>
                        Open Claude from Applications or Spotlight (Cmd+Space, type
                        &quot;Claude&quot;). Sign in with your{' '}
                        <strong>Cover Whale Claude account</strong> (same credentials as
                        claude.ai in the browser).
                      </>
                    ),
                  },
                  {
                    title: 'Open the Cowork tab',
                    description: (
                      <>
                        Once signed in, click the <strong>Cowork</strong> tab in the left
                        sidebar. Point it at a folder on your machine to give it context, then
                        start your first task.
                      </>
                    ),
                  },
                ]}
              />
            ),
            Linux: (
              <Callout variant="blue">
                <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
                  The Claude Desktop App is currently available for <strong>Windows and Mac</strong> only.
                  Linux users can access Claude Chat at{' '}
                  <a
                    href="https://claude.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold underline"
                    style={{ color: 'var(--cw-primary)' }}
                  >
                    claude.ai
                  </a>{' '}
                  in any browser.
                </p>
              </Callout>
            ),
          }}
        </PlatformTabs>
      </section>

      {/* Section: Tips for Getting Started */}
      <section className="mb-16" id="tips">
        <div className="section-label">Pro Tips</div>
        <h2 className="mb-6">
          Getting the Most from <span className="text-highlight">Cowork</span>
        </h2>

        <div className="space-y-4 max-w-3xl">
          {[
            {
              title: 'Organize your context folder',
              description:
                'Create a dedicated folder with the documents Cowork needs. Include style guides, templates, or sample outputs so it understands your standards.',
            },
            {
              title: 'Add identity files',
              description:
                'Drop a short .txt or .md file describing your role, preferences, and writing style. Cowork will reference it to match your voice.',
            },
            {
              title: 'Start with a clear task',
              description:
                'Be specific about what you want produced. "Summarize these five loss runs into a single executive brief" works better than "help me with these files."',
            },
            {
              title: 'Review before sharing',
              description:
                'Cowork keeps consequential decisions with you. Always review generated files before sending them externally &mdash; especially anything with numbers or client data.',
            },
            {
              title: 'Use it for the assembly, not the judgment',
              description:
                'Cowork excels at gathering, organizing, and drafting. Your expertise is the judgment calls, final review, and domain knowledge that makes the output trustworthy.',
            },
          ].map((tip, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-5 rounded-xl"
              style={{
                background: 'var(--cw-surface)',
                border: '1px solid var(--cw-border)',
              }}
            >
              <span
                className="text-sm font-bold tracking-widest flex-shrink-0 w-8 mt-0.5"
                style={{ color: 'var(--cw-primary)', letterSpacing: '2px' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-[17px] font-semibold mb-1" style={{ color: 'var(--cw-ink)' }}>
                  {tip.title}
                </h3>
                <p className="text-[15px] leading-relaxed" style={{ color: 'var(--cw-ink-muted)' }}>
                  {tip.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section: Learn More */}
      <Callout variant="purple" className="mb-8">
        <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
          <strong>Want the full picture?</strong> Visit the{' '}
          <a
            href="https://www.anthropic.com/product/claude-cowork"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline"
            style={{ color: 'var(--cw-primary)' }}
          >
            official Claude Cowork page
          </a>{' '}
          for the latest features and updates from Anthropic.
        </p>
      </Callout>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8 mt-8" style={{ borderTop: '1px solid var(--cw-border)' }}>
        <Link
          href="/prompt-builder"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all pill-btn"
        >
          <ArrowLeft size={16} /> Prompt Builder
        </Link>
        <Link
          href="/choose-your-claude"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:gap-3"
          style={{ background: 'var(--cw-primary)', color: '#fff' }}
        >
          Next: Choose Your Claude <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

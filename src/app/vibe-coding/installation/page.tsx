'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Card, CardGrid } from '@/components/content/Card';
import { Callout } from '@/components/content/Callout';
import { CodeBlock } from '@/components/content/CodeBlock';
import { StepList } from '@/components/content/StepList';
import { TierBadge } from '@/components/content/TierBadge';
import { PlatformTabs } from '@/components/content/PlatformTabs';

export default function InstallationPage() {
  return (
    <div>
      <TierBadge tier="beginner" />
      <h1 className="mt-4 mb-4">Installation Guide</h1>
      <p className="mb-12">
        Get Claude Code set up on your machine. Choose your platform for tailored
        installation instructions.
      </p>

      {/* Section: Prerequisites */}
      <section className="mb-16" id="prerequisites">
        <div className="section-label">Before You Start</div>
        <h2 className="mb-4">Prerequisites</h2>

        <Card className="mb-4">
          <h3 className="mb-3">Claude Code Requirements</h3>
          <div className="space-y-2">
            {[
              { label: 'Claude Pro/Max account or Console access', note: 'For authentication' },
              { label: 'macOS 13.0+, Ubuntu 20.04+/Debian 10+, or Windows 10 1809+', note: 'Supported platforms' },
              { label: '4 GB+ RAM and internet connection', note: 'Minimum system requirements' },
            ].map((item, i) => (
              <div key={i} className="flex items-baseline gap-2.5 text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: 'var(--cw-primary)' }} />
                <span><strong>{item.label}</strong> &mdash; {item.note}</span>
              </div>
            ))}
          </div>
        </Card>

        <Callout variant="warning">
          <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
            <strong>Need Claude Access? (Cover Whale Employees)</strong><br />
            Before installing Claude Code, you need to have access granted by IT.{' '}
            <a
              href="https://coverwhale.atlassian.net/servicedesk/customer/portal/8/group/26/create/10089"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--cw-primary)' }}
            >
              Submit an IT Access Request Ticket here.
            </a>
          </p>
        </Callout>

        <Callout variant="sage" className="mt-4">
          <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
            Claude Code now has <strong>native installers</strong> for all platforms that auto-update
            in the background. No Node.js required for native installs!
          </p>
        </Callout>
      </section>

      {/* Section: Claude Desktop App */}
      <section className="mb-16" id="claude-desktop">
        <div className="section-label">Easiest Option</div>
        <h2 className="mb-4">
          Option A: Claude <span className="text-highlight">Desktop App</span>
        </h2>
        <p className="mb-6">
          If you are not comfortable with terminal installations, the Claude Desktop App is
          the easiest way to use Claude Code. It is a regular application you download and
          install like any other program.
        </p>

        <CardGrid columns={2}>
          {[
            { title: 'No terminal required', desc: 'Works like a normal desktop application' },
            { title: 'Simple installation', desc: 'Download, install, and sign in' },
            { title: 'Visual interface', desc: 'See conversations in a clean, easy-to-read format' },
            { title: 'Auto-updates', desc: 'Stays up to date automatically' },
          ].map((item, i) => (
            <Card key={i}>
              <h4 className="mb-1">{item.title}</h4>
              <p className="text-sm" style={{ color: 'var(--cw-ink-muted)' }}>{item.desc}</p>
            </Card>
          ))}
        </CardGrid>

        <div className="mt-6">
          <PlatformTabs>
            {{
              Windows: (
                <div>
                  <StepList
                    steps={[
                      { title: 'Download the app', description: <>Go to <a href="https://claude.ai/download" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cw-primary)' }}>claude.ai/download</a></> },
                      { title: 'Run the installer', description: 'Double-click the downloaded .exe file' },
                      { title: 'Follow the prompts', description: 'Click "Next" through the installation wizard' },
                      { title: 'Launch Claude', description: 'Find Claude in your Start Menu or on your Desktop' },
                      { title: 'Sign in', description: 'Log in with your Claude account (the same one IT approved)' },
                      { title: 'Start using Claude', description: 'Type your questions or requests in the chat window' },
                    ]}
                  />
                  <Callout variant="purple" className="mt-4">
                    <p className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
                      If Windows SmartScreen shows a warning, click <strong>&ldquo;More info&rdquo;</strong> then
                      <strong> &ldquo;Run anyway&rdquo;</strong>. This is normal for newly downloaded applications.
                    </p>
                  </Callout>
                </div>
              ),
              Mac: (
                <div>
                  <StepList
                    steps={[
                      { title: 'Download the app', description: <>Go to <a href="https://claude.ai/download" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cw-primary)' }}>claude.ai/download</a></> },
                      { title: 'Open the installer', description: 'Double-click the downloaded .dmg file' },
                      { title: 'Drag to Applications', description: 'Drag the Claude icon to your Applications folder' },
                      { title: 'Open Claude', description: 'Find Claude in Applications or use Spotlight (Cmd + Space, type "Claude")' },
                      { title: 'Sign in', description: 'Log in with your Claude account (the same one IT approved)' },
                      { title: 'Start using Claude', description: 'Type your questions or requests in the chat window' },
                    ]}
                  />
                  <Callout variant="purple" className="mt-4">
                    <p className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
                      If you see &ldquo;can&apos;t be opened because it&apos;s from an unidentified
                      developer,&rdquo; go to <strong>System Preferences &gt; Security &amp; Privacy</strong> and
                      click &ldquo;Open Anyway.&rdquo;
                    </p>
                  </Callout>
                </div>
              ),
              Linux: (
                <div>
                  <p className="mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
                    The Claude Desktop App is available for Mac and Windows. On Linux,
                    use the terminal installation (Option B) below.
                  </p>
                  <Callout variant="blue">
                    <p className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
                      Linux users should proceed to <strong>Option B: Terminal Installation</strong> below
                      for the native installer or npm-based setup.
                    </p>
                  </Callout>
                </div>
              ),
            }}
          </PlatformTabs>
        </div>
      </section>

      {/* Section: Claude Terminal Installation */}
      <section className="mb-16" id="claude-terminal">
        <div className="section-label">For Developers</div>
        <h2 className="mb-4">
          Option B: Terminal <span className="text-highlight">Installation</span>
        </h2>
        <p className="mb-6">
          For developers who prefer command-line tools, install Claude Code directly in your terminal.
        </p>

        <PlatformTabs>
          {{
            Windows: (
              <div>
                <Callout variant="warning" className="mb-6">
                  <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
                    <strong>REQUIRED: Install Git for Windows FIRST.</strong> Claude Code requires Git Bash
                    to work properly on Windows. Download from{' '}
                    <a href="https://git-scm.com/download/win" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cw-primary)' }}>
                      git-scm.com/download/win
                    </a>.
                    During install, select &ldquo;Git from the command line and also from 3rd-party software.&rdquo;
                  </p>
                </Callout>

                <Card className="mb-4">
                  <h4 className="mb-3">Option 1: PowerShell (Easiest)</h4>
                  <p className="text-sm mb-3" style={{ color: 'var(--cw-ink-muted)' }}>
                    Open PowerShell as Administrator (Win + X, select &ldquo;Windows PowerShell (Admin)&rdquo;)
                  </p>
                  <CodeBlock code={`irm https://claude.ai/install.ps1 | iex`} />
                </Card>

                <Card className="mb-4">
                  <h4 className="mb-3">Option 2: Command Prompt</h4>
                  <CodeBlock code={`curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd`} />
                </Card>

                <Card className="mb-4">
                  <h4 className="mb-3">Option 3: WinGet</h4>
                  <CodeBlock code={`winget install Anthropic.ClaudeCode`} />
                </Card>

                <Card>
                  <h4 className="mb-3">Option 4: npm (Fallback)</h4>
                  <p className="text-sm mb-3" style={{ color: 'var(--cw-ink-muted)' }}>
                    Only if the native installers above don&apos;t work. Requires <strong>Node.js 18+</strong> and <strong>npm</strong>.
                  </p>
                  <Callout variant="warning" className="mb-3">
                    <p className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
                      <strong>Prerequisite: Install Node.js first.</strong> Download the LTS installer from{' '}
                      <a href="https://nodejs.org" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cw-primary)' }}>
                        nodejs.org
                      </a>{' '}
                      and run it. Make sure <strong>&ldquo;Add to PATH&rdquo;</strong> is checked during installation.
                      Close and reopen your terminal after installing. Verify with{' '}
                      <code>node --version</code> and <code>npm --version</code>.
                    </p>
                  </Callout>
                  <CodeBlock code={`npm install -g @anthropic-ai/claude-code`} />
                </Card>

                <Callout variant="blue" className="mt-6">
                  <p className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
                    <strong>If &ldquo;claude&rdquo; command not found:</strong> Add <code>%USERPROFILE%\.local\bin</code> to
                    your system PATH. Press Win + R, type <code>sysdm.cpl</code>, go to Advanced &gt; Environment
                    Variables &gt; User variables &gt; Path &gt; Edit &gt; New, then add the path. Restart your terminal.
                  </p>
                </Callout>
              </div>
            ),
            Mac: (
              <div>
                <Card className="mb-4">
                  <h4 className="mb-3">Option 1: Native Installer (Recommended)</h4>
                  <CodeBlock code={`curl -fsSL https://claude.ai/install.sh | bash`} />
                  <Callout variant="sage" className="mt-3">
                    <p className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
                      The native installer automatically updates Claude Code in the background. No manual updates needed!
                    </p>
                  </Callout>
                </Card>

                <Card className="mb-4">
                  <h4 className="mb-3">Option 2: Homebrew</h4>
                  <CodeBlock code={`brew install --cask claude-code`} />
                  <p className="text-xs mt-2" style={{ color: 'var(--cw-ink-muted)' }}>
                    Homebrew installs do not auto-update. Run <code>brew upgrade claude-code</code> periodically.
                  </p>
                </Card>

                <Card>
                  <h4 className="mb-3">Option 3: npm (Deprecated)</h4>
                  <CodeBlock code={`# Only if native installer doesn't work
npm install -g @anthropic-ai/claude-code`} />
                </Card>
              </div>
            ),
            Linux: (
              <div>
                <Card className="mb-4">
                  <h4 className="mb-3">Option 1: Native Installer (Recommended)</h4>
                  <p className="text-sm mb-2" style={{ color: 'var(--cw-ink-muted)' }}>
                    Works on Ubuntu 20.04+, Debian 10+, and most distributions.
                  </p>
                  <CodeBlock code={`curl -fsSL https://claude.ai/install.sh | bash`} />
                </Card>

                <Card className="mb-4">
                  <h4 className="mb-3">Option 2: Homebrew (Linux)</h4>
                  <CodeBlock code={`brew install --cask claude-code`} />
                </Card>

                <Card className="mb-4">
                  <h4 className="mb-3">Alpine Linux / musl-based Distros</h4>
                  <CodeBlock code={`# Install dependencies first
apk add libgcc libstdc++ ripgrep

# Set environment variable
export USE_BUILTIN_RIPGREP=0

# Then install
curl -fsSL https://claude.ai/install.sh | bash`} />
                </Card>

                <Card>
                  <h4 className="mb-3">Option 3: npm (Deprecated)</h4>
                  <CodeBlock code={`# Only if native installer doesn't work
npm install -g @anthropic-ai/claude-code`} />
                </Card>
              </div>
            ),
          }}
        </PlatformTabs>
      </section>

      {/* Section: Authentication */}
      <section className="mb-16" id="authentication">
        <div className="section-label">Authentication</div>
        <h2 className="mb-4">
          Setting Up <span className="text-highlight">Authentication</span>
        </h2>

        <h3 className="mb-4">Claude Code Authentication</h3>
        <StepList
          steps={[
            {
              title: 'Navigate to your project folder',
              description: <code style={{ fontSize: '0.85em' }}>cd &quot;C:\path\to\your\project&quot;</code>,
            },
            {
              title: 'Start Claude Code',
              description: <code style={{ fontSize: '0.85em' }}>claude</code>,
            },
            {
              title: 'Authenticate when prompted',
              description: 'You will need a Claude Pro/Max account or Console access',
            },
          ]}
        />

        <Card className="mt-6">
          <h4 className="mb-2">API Key Authentication (Alternative)</h4>
          <CodeBlock code={`# Set environment variable in PowerShell
$env:ANTHROPIC_API_KEY = "sk-ant-your-key-here"

# Or set permanently for your user
[System.Environment]::SetEnvironmentVariable('ANTHROPIC_API_KEY', 'sk-ant-your-key-here', 'User')`} />
        </Card>
      </section>

      {/* Section: Verification */}
      <section className="mb-16" id="verification">
        <div className="section-label">Verify</div>
        <h2 className="mb-4">
          Verify Your <span className="text-highlight">Installation</span>
        </h2>

        <p className="mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
          After installation completes, close and reopen your terminal, then run:
        </p>
        <CodeBlock title="Verify Claude Code" code={`# Check version
claude --version

# Run diagnostics
claude doctor

# Start and test
claude
> "What does this project do?"
> /help`} />

        <Callout variant="sage" className="mt-4">
          <p className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
            <strong>Success Indicators:</strong> Claude responds without errors, file operations
            work, <code>/help</code> displays properly, and <code>claude doctor</code> passes all checks.
          </p>
        </Callout>
      </section>

      {/* Section: Gemini CLI (Optional) */}
      <section className="mb-16" id="gemini-cli">
        <div className="section-label">Optional</div>
        <h2 className="mb-4">
          Gemini <span className="text-highlight">CLI</span> (Optional)
        </h2>
        <p className="mb-6" style={{ color: 'var(--cw-ink-secondary)' }}>
          Google&apos;s Gemini CLI is an optional supplementary tool. Claude Code is our primary tool,
          but Gemini CLI can be useful for its large context window and free tier.
        </p>

        <Card className="mb-4">
          <h4 className="mb-3">Install Gemini CLI</h4>
          <CodeBlock code={`# Requires Node.js 18+
# See GitHub for latest install instructions:
# https://github.com/google-gemini/gemini-cli

npx https://github.com/nicolo-ribaudo/gemini-cli
gemini`} />
          <p className="text-xs mt-2" style={{ color: 'var(--cw-ink-muted)' }}>
            Authenticate with your Google account when prompted. Free tier includes generous usage.
          </p>
        </Card>

        <Callout variant="blue">
          <p className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
            <strong>Gemini CLI Links:</strong>{' '}
            <a href="https://github.com/google-gemini/gemini-cli" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cw-primary)' }}>
              GitHub Repository
            </a>{' | '}
            <a href="https://ai.google.dev/gemini-api/docs" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cw-primary)' }}>
              Documentation
            </a>
          </p>
        </Callout>
      </section>

      {/* Section: IDE Integration */}
      <section className="mb-16" id="ide">
        <div className="section-label">IDE Setup</div>
        <h2 className="mb-4">
          IDE <span className="text-highlight">Integration</span>
        </h2>
        <p className="mb-6">
          While Claude Code runs in your terminal, you will want a good IDE for viewing
          and editing code.
        </p>

        <Card className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <h3>VS Code (Recommended)</h3>
            <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: 'rgba(58,158,110,0.1)', color: 'var(--cw-success)' }}>FREE</span>
          </div>
          <p className="text-base mb-3" style={{ color: 'var(--cw-ink-secondary)' }}>
            Install the official Anthropic extension from the VS Code Marketplace for
            integrated Claude Code support. Or use Claude in the integrated terminal.
          </p>
          <CodeBlock code={`# Open VS Code integrated terminal
# Press Ctrl+\` then type:
claude`} />
        </Card>

        <h3 className="mb-4">Other IDE Options</h3>
        <CardGrid columns={3}>
          {[
            { name: 'Google Antigravity', desc: 'Free AI-first IDE with native AI integration', price: 'Free' },
            { name: 'Cursor', desc: 'AI-native VS Code fork with deep integration', price: '$20/mo' },
            { name: 'Windsurf', desc: 'Agentic IDE with Cascade AI agent', price: '$15/mo' },
          ].map(ide => (
            <Card key={ide.name}>
              <h4 className="mb-1">{ide.name}</h4>
              <p className="text-xs mb-1" style={{ color: 'var(--cw-ink-muted)' }}>{ide.desc}</p>
              <span className="text-xs font-semibold" style={{ color: 'var(--cw-primary)' }}>{ide.price}</span>
            </Card>
          ))}
        </CardGrid>

        <Callout variant="purple" className="mt-6">
          <p className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
            All IDEs support running Claude Code in their integrated terminals.
            Use <kbd>Ctrl+`</kbd> to open a terminal and type <code>claude</code>.
          </p>
        </Callout>
      </section>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8 mt-8" style={{ borderTop: '1px solid var(--cw-border)' }}>
        <Link
          href="/vibe-coding"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all pill-btn"
        >
          <ArrowLeft size={16} /> Getting Started
        </Link>
        <Link
          href="/vibe-coding/fundamentals"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:gap-3"
          style={{ background: 'var(--cw-primary)', color: '#fff' }}
        >
          Next: Fundamentals <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Card, CardGrid } from '@/components/content/Card';
import { Callout } from '@/components/content/Callout';
import { CodeBlock } from '@/components/content/CodeBlock';
import { StepList } from '@/components/content/StepList';
import { TierBadge } from '@/components/content/TierBadge';
import { PlatformTabs } from '@/components/content/PlatformTabs';
import { Tabs } from '@/components/content/Tabs';

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
                  <h4 className="mb-3">Option 1: npm</h4>
                  <p className="text-sm mb-3" style={{ color: 'var(--cw-ink-muted)' }}>
                    Requires <strong>Node.js 18+</strong> and <strong>npm</strong>.
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
                  <p className="text-sm mt-4 mb-2 font-semibold" style={{ color: 'var(--cw-ink-secondary)' }}>
                    Ensure Claude Code is accessible in your terminal:
                  </p>
                  <p className="text-sm mb-3" style={{ color: 'var(--cw-ink-muted)' }}>
                    After installing, add npm&apos;s global bin directory to your PATH so the <code>claude</code> command is available. Run the following in PowerShell:
                  </p>
                  <CodeBlock code={`# Find npm global bin location
$npmPrefix = npm config get prefix

# Add it to your user PATH permanently
[System.Environment]::SetEnvironmentVariable('PATH', $env:PATH + ";$npmPrefix", 'User')

# Restart your terminal, then verify:
claude --version`} />
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
                  <h4 className="mb-3">Option 4: PowerShell</h4>
                  <p className="text-sm mb-3" style={{ color: 'var(--cw-ink-muted)' }}>
                    Open PowerShell as Administrator (Win + X, select &ldquo;Windows PowerShell (Admin)&rdquo;)
                  </p>
                  <CodeBlock code={`irm https://claude.ai/install.ps1 | iex`} />
                </Card>

                <Card className="mt-6 mb-4">
                  <h4 className="mb-3">PATH Setup for <code>claude</code> CLI (if not auto-configured)</h4>
                  <p className="text-sm mb-3" style={{ color: 'var(--cw-ink-muted)' }}>
                    If the <code>claude</code> command is not recognized after installation (Options 2&ndash;4 above),
                    the installer placed it at <code>%USERPROFILE%\.local\bin</code> but your terminal cannot find it.
                    Add that directory to your PATH:
                  </p>
                  <StepList
                    steps={[
                      { title: 'Open System Properties', description: <>Press <kbd>Win + R</kbd>, type <code>sysdm.cpl</code>, and hit Enter</> },
                      { title: 'Open Environment Variables', description: <>Go to the <strong>Advanced</strong> tab and click <strong>Environment Variables</strong></> },
                      { title: 'Edit your PATH', description: <>Under <strong>&ldquo;User variables&rdquo;</strong>, select <strong>Path</strong> and click <strong>Edit</strong></> },
                      { title: 'Add the Claude CLI path', description: <>Click <strong>New</strong> and add: <code>%USERPROFILE%\.local\bin</code></> },
                      { title: 'Save and restart terminal', description: <>Click <strong>OK</strong> on all dialogs, then close and reopen your terminal</> },
                    ]}
                  />
                  <CodeBlock code={`# Verify the CLI works
claude --version`} />
                  <Callout variant="blue" className="mt-3">
                    <p className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
                      <strong>PowerShell alternative:</strong> You can also add to PATH from PowerShell without the GUI:
                    </p>
                  </Callout>
                  <CodeBlock code={`# Add Claude to your user PATH permanently
$currentPath = [Environment]::GetEnvironmentVariable('PATH', 'User')
[Environment]::SetEnvironmentVariable('PATH', "$currentPath;$env:USERPROFILE\\.local\\bin", 'User')

# Restart your terminal, then verify:
claude --version`} />
                </Card>
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

      {/* Section: Antigravity CLI (Optional) */}
      <section className="mb-16" id="antigravity-cli">
        <div className="section-label">Optional</div>
        <h2 className="mb-4">
          Antigravity <span className="text-highlight">CLI</span> (Optional)
        </h2>
        <p className="mb-6" style={{ color: 'var(--cw-ink-secondary)' }}>
          Google&apos;s Antigravity CLI (<code>agy</code>) is an optional supplementary tool. Claude
          Code is our primary tool, but the Antigravity CLI is useful when you want Google&apos;s
          agentic stack from the terminal without installing the full Antigravity IDE.
        </p>

        <Card className="mb-4">
          <h4 className="mb-3">Install Antigravity CLI</h4>
          <p className="text-sm mb-3" style={{ color: 'var(--cw-ink-muted)' }}>
            The CLI is a self-contained Go binary &mdash; no Node.js required. Download from{' '}
            <a href="https://antigravity.google/download" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cw-primary)' }}>
              antigravity.google/download
            </a>{' '}
            or use one of the installer one-liners below.
          </p>
          <CodeBlock title="Windows (PowerShell)" code={`irm https://antigravity.google/cli/install.ps1 | iex`} />
          <CodeBlock title="Windows (Command Prompt)" code={`curl -fsSL https://antigravity.google/cli/install.cmd -o install.cmd && install.cmd && del install.cmd`} />
          <CodeBlock title="macOS / Linux" code={`curl -fsSL https://antigravity.google/cli/install.sh | bash`} />
          <p className="text-xs mt-2" style={{ color: 'var(--cw-ink-muted)' }}>
            After install, run <code>agy</code> to launch. On first run, authenticate with your
            Google account when prompted.
          </p>
        </Card>

        <Callout variant="blue">
          <p className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
            <strong>Antigravity CLI Links:</strong>{' '}
            <a href="https://antigravity.google/download" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cw-primary)' }}>
              Download
            </a>{' | '}
            <a href="https://antigravity.google/docs/cli-getting-started" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cw-primary)' }}>
              CLI Getting Started
            </a>{' | '}
            <a href="https://antigravity.google" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cw-primary)' }}>
              antigravity.google
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
          <CodeBlock code={`# Open the VS Code integrated terminal:
# Press Ctrl+\` (Windows/Linux) or Cmd+\` (Mac), then type:
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


      {/* Section: IDE CLI Setup */}
      <section className="mb-16" id="ide-cli-setup">
        <div className="section-label">IDE CLI Setup</div>
        <h2 className="mb-4">
          IDE <span className="text-highlight">CLI</span> Setup
        </h2>
        <p className="mb-6" style={{ color: 'var(--cw-ink-secondary)' }}>
          Most IDEs provide a command-line tool so you can open projects from your terminal.
          Select your IDE below for installation steps and PATH configuration.
        </p>

        <PlatformTabs>
          {{
            Windows: (
              <div>
                <Tabs tabs={['VS Code', 'Antigravity', 'Cursor', 'Windsurf']}>
                  {{
                    'VS Code': (
                      <div>
                        <StepList
                          steps={[
                            { title: 'Download VS Code', description: <>Go to <a href="https://code.visualstudio.com/download" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cw-primary)' }}>code.visualstudio.com/download</a> and click <strong>&ldquo;Windows&rdquo;</strong></> },
                            { title: 'Run the installer', description: <>Double-click the downloaded .exe file. During install, check <strong>&ldquo;Add to PATH&rdquo;</strong> (recommended)</> },
                            { title: 'Install Claude Code extension', description: <>Open VS Code, go to Extensions (<kbd>Ctrl+Shift+X</kbd>), search for <strong>&ldquo;Claude Code&rdquo;</strong> by Anthropic, and click Install</> },
                          ]}
                        />
                        <Card className="mt-6 mb-4">
                          <h4 className="mb-3">PATH Setup for <code>code</code> CLI (if not auto-configured)</h4>
                          <p className="text-sm mb-3" style={{ color: 'var(--cw-ink-muted)' }}>
                            If the <code>code</code> command is not recognized after installation, add it to your PATH manually:
                          </p>
                          <StepList
                            steps={[
                              { title: 'Open System Properties', description: <>Press <kbd>Win + R</kbd>, type <code>sysdm.cpl</code>, and hit Enter</> },
                              { title: 'Open Environment Variables', description: <>Go to the <strong>Advanced</strong> tab and click <strong>Environment Variables</strong></> },
                              { title: 'Edit your PATH', description: <>Under <strong>&ldquo;User variables&rdquo;</strong>, select <strong>Path</strong> and click <strong>Edit</strong></> },
                              { title: 'Add the VS Code bin path', description: <>Click <strong>New</strong> and add: <code>%LOCALAPPDATA%\Programs\Microsoft VS Code\bin</code></> },
                              { title: 'Save and restart terminal', description: <>Click <strong>OK</strong> on all dialogs, then close and reopen your terminal</> },
                            ]}
                          />
                          <CodeBlock code={`# Verify the CLI works
code --version

# Open a project folder in VS Code
code .`} />
                        </Card>
                      </div>
                    ),
                    'Antigravity': (
                      <div>
                        <Callout variant="blue" className="mb-4">
                          <p className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
                            Google now ships <strong>Antigravity IDE</strong> and the <strong>Antigravity CLI (<code>agy</code>)</strong> as two
                            separate installs. Install the IDE first, then the CLI.
                          </p>
                        </Callout>

                        <h4 className="mb-3">Step 1: Install Antigravity IDE</h4>
                        <StepList
                          steps={[
                            { title: 'Download the installer', description: <>Go to <a href="https://antigravity.google/download" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cw-primary)' }}>antigravity.google/download</a> and click <strong>&ldquo;Download for Windows&rdquo;</strong></> },
                            { title: 'Run the installer', description: 'Double-click the downloaded .exe file and follow the installation wizard' },
                            { title: 'First launch setup', description: 'Choose to import VS Code/Cursor settings or start fresh, then select your theme' },
                            { title: 'Configure agent behavior', description: <>Select your autonomy level. <strong>&ldquo;Review-driven development&rdquo;</strong> is recommended for beginners</> },
                            { title: 'Sign in with Google', description: 'Your browser will open for authentication. Sign in with your personal Gmail account' },
                          ]}
                        />

                        <Card className="mt-6 mb-4">
                          <h4 className="mb-3">Step 2: Install Antigravity CLI (<code>agy</code>)</h4>
                          <p className="text-sm mb-3" style={{ color: 'var(--cw-ink-muted)' }}>
                            The CLI is a separate Go binary distributed via the install script at{' '}
                            <a href="https://antigravity.google/docs/cli-getting-started" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cw-primary)' }}>
                              antigravity.google/docs/cli-getting-started
                            </a>.
                          </p>
                          <CodeBlock title="PowerShell (recommended)" code={`irm https://antigravity.google/cli/install.ps1 | iex`} />
                          <CodeBlock title="Command Prompt" code={`curl -fsSL https://antigravity.google/cli/install.cmd -o install.cmd && install.cmd && del install.cmd`} />
                          <p className="text-sm mt-3 mb-2" style={{ color: 'var(--cw-ink-muted)' }}>
                            The installer drops the <code>agy</code> binary into <code>%LOCALAPPDATA%\Antigravity\</code>.
                            Close and reopen your terminal, then verify:
                          </p>
                          <CodeBlock code={`agy --version`} />
                          <p className="text-xs mt-2" style={{ color: 'var(--cw-ink-muted)' }}>
                            On first run, <code>agy</code> opens your browser for Google Sign-In; subsequent runs reuse the
                            credentials stored in the system keyring. Use <code>/logout</code> to sign out.
                          </p>
                        </Card>

                        <Card className="mt-6 mb-4">
                          <h4 className="mb-3">PATH Setup (if <code>agy</code> is not found)</h4>
                          <p className="text-sm mb-3" style={{ color: 'var(--cw-ink-muted)' }}>
                            If <code>agy --version</code> reports &ldquo;command not found&rdquo; after restarting your terminal,
                            add the install directory to your PATH:
                          </p>
                          <CodeBlock code={`# Add Antigravity CLI to your user PATH permanently (PowerShell)
$currentPath = [Environment]::GetEnvironmentVariable('PATH', 'User')
[Environment]::SetEnvironmentVariable('PATH', "$currentPath;$env:LOCALAPPDATA\\Antigravity", 'User')

# Restart your terminal, then verify:
agy --version`} />
                        </Card>
                      </div>
                    ),
                    'Cursor': (
                      <div>
                        <StepList
                          steps={[
                            { title: 'Download Cursor', description: <>Go to <a href="https://www.cursor.com/downloads" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cw-primary)' }}>cursor.com/downloads</a> and click <strong>&ldquo;Download for Windows&rdquo;</strong></> },
                            { title: 'Run the installer', description: 'Double-click the downloaded .exe file and follow the prompts' },
                            { title: 'First launch setup', description: 'Choose to import VS Code settings or start fresh, then sign in to your Cursor account' },
                          ]}
                        />
                        <Card className="mt-6 mb-4">
                          <h4 className="mb-3">PATH Setup for <code>cursor</code> CLI (if not auto-configured)</h4>
                          <p className="text-sm mb-3" style={{ color: 'var(--cw-ink-muted)' }}>
                            If the <code>cursor</code> command is not recognized after installation, add it to your PATH manually:
                          </p>
                          <StepList
                            steps={[
                              { title: 'Open System Properties', description: <>Press <kbd>Win + R</kbd>, type <code>sysdm.cpl</code>, and hit Enter</> },
                              { title: 'Open Environment Variables', description: <>Go to the <strong>Advanced</strong> tab and click <strong>Environment Variables</strong></> },
                              { title: 'Edit your PATH', description: <>Under <strong>&ldquo;User variables&rdquo;</strong>, select <strong>Path</strong> and click <strong>Edit</strong></> },
                              { title: 'Add the Cursor bin path', description: <>Click <strong>New</strong> and add: <code>%LOCALAPPDATA%\Programs\cursor\resources\app\bin</code></> },
                              { title: 'Save and restart terminal', description: <>Click <strong>OK</strong> on all dialogs, then close and reopen your terminal</> },
                            ]}
                          />
                          <CodeBlock code={`# Verify the CLI works
cursor --version

# Open a project folder in Cursor
cursor .`} />
                        </Card>
                      </div>
                    ),
                    'Windsurf': (
                      <div>
                        <StepList
                          steps={[
                            { title: 'Download Windsurf', description: <>Go to <a href="https://windsurf.com/download" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cw-primary)' }}>windsurf.com/download</a> and click <strong>&ldquo;Download for Windows&rdquo;</strong></> },
                            { title: 'Run the installer', description: 'Double-click the downloaded .exe file and follow the installation wizard' },
                            { title: 'First launch setup', description: 'Choose to import VS Code settings or start fresh, then sign in to your Windsurf account' },
                          ]}
                        />
                        <Card className="mt-6 mb-4">
                          <h4 className="mb-3">PATH Setup for <code>windsurf</code> CLI (if not auto-configured)</h4>
                          <p className="text-sm mb-3" style={{ color: 'var(--cw-ink-muted)' }}>
                            If the <code>windsurf</code> command is not recognized after installation, add it to your PATH manually:
                          </p>
                          <StepList
                            steps={[
                              { title: 'Open System Properties', description: <>Press <kbd>Win + R</kbd>, type <code>sysdm.cpl</code>, and hit Enter</> },
                              { title: 'Open Environment Variables', description: <>Go to the <strong>Advanced</strong> tab and click <strong>Environment Variables</strong></> },
                              { title: 'Edit your PATH', description: <>Under <strong>&ldquo;User variables&rdquo;</strong>, select <strong>Path</strong> and click <strong>Edit</strong></> },
                              { title: 'Add the Windsurf bin path', description: <>Click <strong>New</strong> and add: <code>%LOCALAPPDATA%\Programs\Windsurf\bin</code></> },
                              { title: 'Save and restart terminal', description: <>Click <strong>OK</strong> on all dialogs, then close and reopen your terminal</> },
                            ]}
                          />
                          <CodeBlock code={`# Verify the CLI works
windsurf --version

# Open a project folder in Windsurf
windsurf .`} />
                        </Card>
                      </div>
                    ),
                  }}
                </Tabs>

                <Callout variant="purple" className="mt-4">
                  <p className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
                    <strong>Windows SmartScreen:</strong> If you see a warning when running an installer, click <strong>&ldquo;More info&rdquo;</strong> then
                    <strong> &ldquo;Run anyway.&rdquo;</strong> This is normal for newly downloaded applications.
                  </p>
                </Callout>
              </div>
            ),
            Mac: (
              <div>
                <Tabs tabs={['VS Code', 'Antigravity', 'Cursor', 'Windsurf']}>
                  {{
                    'VS Code': (
                      <div>
                        <Callout variant="blue" className="mb-4">
                          <p className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
                            <strong>Two things to install &mdash; don&apos;t skip one.</strong> <strong>VS Code</strong> is the
                            editor (steps below). <strong>Claude Code</strong> is the AI assistant and is a <em>separate</em> install.
                            If you haven&apos;t installed Claude Code yet, do{' '}
                            <a href="#claude-terminal" style={{ color: 'var(--cw-primary)' }}>Option B: Terminal Installation</a>{' '}
                            higher up this page first &mdash; VS Code is only <em>where you run it</em>.
                          </p>
                        </Callout>

                        <StepList
                          steps={[
                            { title: 'Download VS Code', description: <>Go to <a href="https://code.visualstudio.com/download" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cw-primary)' }}>code.visualstudio.com/download</a> and click <strong>&ldquo;Mac&rdquo;</strong></> },
                            { title: 'Install the app', description: 'Open the downloaded .zip, then drag Visual Studio Code to your Applications folder' },
                            { title: 'Install the code CLI (optional but handy)', description: <>Open VS Code, press <kbd>Cmd+Shift+P</kbd>, type <strong>&ldquo;Shell Command: Install &apos;code&apos; command in PATH&rdquo;</strong> and select it. This lets you open a project with <code>code .</code></> },
                            { title: 'Open the integrated terminal', description: <>In VS Code, press <kbd>Cmd + `</kbd> (the backtick key, top-left under <kbd>Esc</kbd>). A terminal panel opens at the bottom &mdash; every command below goes here</> },
                            { title: 'Start Claude Code', description: <>Type <code>claude</code> and press <kbd>Enter</kbd>. The first time, it opens your browser to sign in with your Claude account (the same one IT approved)</> },
                          ]}
                        />

                        <Callout variant="sage" className="mt-4">
                          <p className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
                            <strong>That&apos;s it &mdash; you&apos;re in.</strong> From now on: open VS Code, press <kbd>Cmd + `</kbd>,
                            type <code>claude</code>. To work on a specific project, open that folder first
                            (<strong>File &gt; Open Folder&hellip;</strong>), then start Claude from the terminal so it sees your code.
                          </p>
                        </Callout>

                        <Callout variant="warning" className="mt-4">
                          <p className="text-sm mb-2" style={{ color: 'var(--cw-ink-secondary)' }}>
                            <strong>Terminal says <code>command not found: claude</code>?</strong> That means Claude Code itself
                            isn&apos;t installed yet &mdash; installing VS Code does <em>not</em> install it. Run the native
                            installer (see <a href="#claude-terminal" style={{ color: 'var(--cw-primary)' }}>Option B</a> above),
                            then <strong>close and reopen the terminal</strong> and try <code>claude</code> again:
                          </p>
                          <CodeBlock code={`curl -fsSL https://claude.ai/install.sh | bash`} />
                        </Callout>

                        <Callout variant="purple" className="mt-4">
                          <p className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
                            <strong>Optional:</strong> for a richer in-editor experience, open Extensions (<kbd>Cmd+Shift+X</kbd>),
                            search <strong>&ldquo;Claude Code&rdquo;</strong> by Anthropic, and install it. The terminal steps
                            above work with or without the extension.
                          </p>
                        </Callout>

                        <Card className="mt-6 mb-4">
                          <h4 className="mb-3">PATH Setup for <code>code</code> CLI (only if Step 3 didn&apos;t work)</h4>
                          <p className="text-sm mb-3" style={{ color: 'var(--cw-ink-muted)' }}>
                            If the <code>code</code> command isn&apos;t recognized after the Command Palette step, add it to your PATH manually:
                          </p>
                          <CodeBlock code={`# Add to your shell profile (~/.zshrc for macOS Catalina+)
echo 'export PATH="/Applications/Visual Studio Code.app/Contents/Resources/app/bin:$PATH"' >> ~/.zshrc

# Reload your shell
source ~/.zshrc

# Verify
code --version`} />
                          <Callout variant="blue" className="mt-3">
                            <p className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
                              <strong>Homebrew alternative:</strong> You can also install VS Code via Homebrew, which handles PATH automatically:
                            </p>
                          </Callout>
                          <CodeBlock code={`brew install --cask visual-studio-code`} />
                        </Card>
                      </div>
                    ),
                    'Antigravity': (
                      <div>
                        <Callout variant="blue" className="mb-4">
                          <p className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
                            Google now ships <strong>Antigravity IDE</strong> and the <strong>Antigravity CLI (<code>agy</code>)</strong> as two
                            separate installs. Install the IDE first, then the CLI.
                          </p>
                        </Callout>

                        <h4 className="mb-3">Step 1: Install Antigravity IDE</h4>
                        <StepList
                          steps={[
                            { title: 'Download the installer', description: <>Go to <a href="https://antigravity.google/download" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cw-primary)' }}>antigravity.google/download</a> and click <strong>&ldquo;Download for Apple Silicon&rdquo;</strong> (or Intel if applicable)</> },
                            { title: 'Install the app', description: 'Open the downloaded .dmg file and drag Google Antigravity to your Applications folder' },
                            { title: 'Launch Antigravity', description: <>Open from Applications or use Spotlight (<kbd>Cmd + Space</kbd>, type &ldquo;Antigravity&rdquo;)</> },
                            { title: 'First launch setup', description: 'Choose to import VS Code/Cursor settings or start fresh, then select your theme' },
                            { title: 'Configure agent behavior', description: <>Select your autonomy level. <strong>&ldquo;Review-driven development&rdquo;</strong> is recommended for beginners</> },
                            { title: 'Sign in with Google', description: 'Your browser will open for authentication. Sign in with your personal Gmail account' },
                          ]}
                        />

                        <Card className="mt-6 mb-4">
                          <h4 className="mb-3">Step 2: Install Antigravity CLI (<code>agy</code>)</h4>
                          <p className="text-sm mb-3" style={{ color: 'var(--cw-ink-muted)' }}>
                            The CLI is a separate Go binary. Run the official one-liner from{' '}
                            <a href="https://antigravity.google/docs/cli-getting-started" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cw-primary)' }}>
                              antigravity.google/docs/cli-getting-started
                            </a>:
                          </p>
                          <CodeBlock code={`curl -fsSL https://antigravity.google/cli/install.sh | bash`} />
                          <p className="text-sm mt-3 mb-2" style={{ color: 'var(--cw-ink-muted)' }}>
                            The installer drops the <code>agy</code> binary into <code>~/.local/bin/</code>.
                            Reload your shell, then verify:
                          </p>
                          <CodeBlock code={`# Reload PATH (zsh)
source ~/.zshrc

# Verify
agy --version`} />
                          <p className="text-xs mt-2" style={{ color: 'var(--cw-ink-muted)' }}>
                            On first run, <code>agy</code> opens your browser for Google Sign-In; subsequent runs reuse the
                            credentials stored in the system keyring. Use <code>/logout</code> to sign out.
                          </p>
                        </Card>

                        <Card className="mt-6 mb-4">
                          <h4 className="mb-3">PATH Setup (if <code>agy</code> is not found)</h4>
                          <p className="text-sm mb-3" style={{ color: 'var(--cw-ink-muted)' }}>
                            If <code>agy --version</code> reports &ldquo;command not found&rdquo; after reloading your shell,
                            confirm <code>~/.local/bin</code> is on your PATH:
                          </p>
                          <CodeBlock code={`# Add to your shell profile (~/.zshrc for macOS Catalina+)
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc

# Reload your shell
source ~/.zshrc

# Verify
agy --version`} />
                        </Card>
                      </div>
                    ),
                    'Cursor': (
                      <div>
                        <StepList
                          steps={[
                            { title: 'Download Cursor', description: <>Go to <a href="https://www.cursor.com/downloads" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cw-primary)' }}>cursor.com/downloads</a> and click <strong>&ldquo;Download for Mac&rdquo;</strong></> },
                            { title: 'Install the app', description: 'Open the downloaded .dmg file and drag Cursor to your Applications folder' },
                            { title: 'Install the CLI tool', description: <>Open Cursor, press <kbd>Cmd+Shift+P</kbd>, type <strong>&ldquo;Shell Command: Install &apos;cursor&apos; command in PATH&rdquo;</strong> and select it</> },
                          ]}
                        />
                        <Card className="mt-6 mb-4">
                          <h4 className="mb-3">PATH Setup for <code>cursor</code> CLI (alternative)</h4>
                          <p className="text-sm mb-3" style={{ color: 'var(--cw-ink-muted)' }}>
                            If the Command Palette method above doesn&apos;t work, add it to your PATH manually:
                          </p>
                          <CodeBlock code={`# Add to your shell profile (~/.zshrc for macOS Catalina+)
echo 'export PATH="/Applications/Cursor.app/Contents/Resources/app/bin:$PATH"' >> ~/.zshrc

# Reload your shell
source ~/.zshrc

# Verify
cursor --version`} />
                        </Card>
                      </div>
                    ),
                    'Windsurf': (
                      <div>
                        <StepList
                          steps={[
                            { title: 'Download Windsurf', description: <>Go to <a href="https://windsurf.com/download" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cw-primary)' }}>windsurf.com/download</a> and click <strong>&ldquo;Download for Mac&rdquo;</strong></> },
                            { title: 'Install the app', description: 'Open the downloaded .dmg file and drag Windsurf to your Applications folder' },
                            { title: 'Install the CLI tool', description: <>Open Windsurf, press <kbd>Cmd+Shift+P</kbd>, type <strong>&ldquo;Shell Command: Install &apos;windsurf&apos; command in PATH&rdquo;</strong> and select it</> },
                          ]}
                        />
                        <Card className="mt-6 mb-4">
                          <h4 className="mb-3">PATH Setup for <code>windsurf</code> CLI (alternative)</h4>
                          <p className="text-sm mb-3" style={{ color: 'var(--cw-ink-muted)' }}>
                            If the Command Palette method above doesn&apos;t work, add it to your PATH manually:
                          </p>
                          <CodeBlock code={`# Add to your shell profile (~/.zshrc for macOS Catalina+)
echo 'export PATH="/Applications/Windsurf.app/Contents/Resources/app/bin:$PATH"' >> ~/.zshrc

# Reload your shell
source ~/.zshrc

# Verify
windsurf --version`} />
                        </Card>
                      </div>
                    ),
                  }}
                </Tabs>

                <Callout variant="purple" className="mt-4">
                  <p className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
                    If you see &ldquo;can&apos;t be opened because it&apos;s from an unidentified developer,&rdquo;
                    go to <strong>System Settings &gt; Privacy &amp; Security</strong> and click <strong>&ldquo;Open Anyway.&rdquo;</strong>
                  </p>
                </Callout>
              </div>
            ),
            Linux: (
              <div>
                <Tabs tabs={['VS Code', 'Antigravity', 'Cursor', 'Windsurf']}>
                  {{
                    'VS Code': (
                      <div>
                        <CodeBlock code={`# Debian/Ubuntu — download .deb from code.visualstudio.com/download
sudo dpkg -i code_*.deb

# Fedora/RHEL — download .rpm
sudo rpm -i code_*.rpm

# Verify CLI (auto-added to PATH)
code --version

# Open a project folder
code .`} />
                      </div>
                    ),
                    'Antigravity': (
                      <div>
                        <Callout variant="blue" className="mb-4">
                          <p className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
                            Google now ships <strong>Antigravity IDE</strong> and the <strong>Antigravity CLI (<code>agy</code>)</strong> as two
                            separate installs. Install the IDE first, then the CLI.
                          </p>
                        </Callout>

                        <h4 className="mb-3">Step 1: Install Antigravity IDE</h4>
                        <StepList
                          steps={[
                            { title: 'Download the installer', description: <>Go to <a href="https://antigravity.google/download" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cw-primary)' }}>antigravity.google/download</a> and download the Linux package (.deb or .rpm)</> },
                            { title: 'Install the package', description: 'Use your package manager to install the downloaded file' },
                            { title: 'Launch and configure', description: 'Follow the same first-launch setup as Windows/Mac above' },
                          ]}
                        />
                        <CodeBlock code={`# Debian/Ubuntu
sudo dpkg -i google-antigravity_*.deb

# Fedora/RHEL
sudo rpm -i google-antigravity_*.rpm`} />

                        <Card className="mt-6 mb-4">
                          <h4 className="mb-3">Step 2: Install Antigravity CLI (<code>agy</code>)</h4>
                          <p className="text-sm mb-3" style={{ color: 'var(--cw-ink-muted)' }}>
                            The CLI is a separate Go binary. Run the official one-liner from{' '}
                            <a href="https://antigravity.google/docs/cli-getting-started" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cw-primary)' }}>
                              antigravity.google/docs/cli-getting-started
                            </a>:
                          </p>
                          <CodeBlock code={`curl -fsSL https://antigravity.google/cli/install.sh | bash`} />
                          <p className="text-sm mt-3 mb-2" style={{ color: 'var(--cw-ink-muted)' }}>
                            The installer drops the <code>agy</code> binary into <code>~/.local/bin/</code>.
                            Reload your shell (<code>source ~/.bashrc</code> or <code>source ~/.zshrc</code>), then verify:
                          </p>
                          <CodeBlock code={`agy --version`} />
                          <p className="text-xs mt-2" style={{ color: 'var(--cw-ink-muted)' }}>
                            On first run, <code>agy</code> opens your browser for Google Sign-In (or prints an
                            authorization URL for headless/SSH sessions). Use <code>/logout</code> to sign out.
                          </p>
                        </Card>
                      </div>
                    ),
                    'Cursor': (
                      <div>
                        <CodeBlock code={`# Download AppImage from cursor.com/downloads
chmod +x cursor-*.AppImage
./cursor-*.AppImage

# Or extract and add to PATH
./cursor-*.AppImage --appimage-extract
sudo ln -s $(pwd)/squashfs-root/resources/app/bin/cursor /usr/local/bin/cursor

# Verify
cursor --version`} />
                      </div>
                    ),
                    'Windsurf': (
                      <div>
                        <CodeBlock code={`# Download .deb from windsurf.com/download
sudo dpkg -i windsurf_*.deb

# Verify CLI
windsurf --version

# Open a project folder
windsurf .`} />
                      </div>
                    ),
                  }}
                </Tabs>
              </div>
            ),
          }}
        </PlatformTabs>

        <Card className="mt-6">
          <h4 className="mb-2">Using Claude Code Inside Any IDE</h4>
          <p className="text-sm mb-3" style={{ color: 'var(--cw-ink-muted)' }}>
            After installing your IDE and Claude Code, open your IDE&apos;s integrated terminal
            and start Claude Code:
          </p>
          <CodeBlock code={`# Open the integrated terminal in any IDE
# Press Ctrl+\` (Windows/Linux) or Cmd+\` (Mac), then type:
claude`} />
        </Card>
      </section>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8 mt-8" style={{ borderTop: '1px solid var(--cw-border)' }}>
        <Link
          href="/road-to-agentic-engineering"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all pill-btn"
        >
          <ArrowLeft size={16} /> Getting Started
        </Link>
        <Link
          href="/road-to-agentic-engineering/setup"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:gap-3"
          style={{ background: 'var(--cw-primary)', color: '#fff' }}
        >
          Next: CW Setup <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

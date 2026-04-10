'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Card, CardGrid } from '@/components/content/Card';
import { Callout } from '@/components/content/Callout';
import { CodeBlock } from '@/components/content/CodeBlock';
import { TierBadge } from '@/components/content/TierBadge';

export default function ChampionsPage() {
  return (
    <div>
      <TierBadge tier="expert" />
      <h1 className="mt-4 mb-4">AI Enablement Champions</h1>
      <p className="mb-12">
        Champions go beyond the basics. Connect Claude Code to Cover Whale&apos;s
        AI frameworks, sync all repos automatically, and switch between dev and ops
        toolsets on the fly. This is the full setup used by the AI Enablement team.
      </p>

      <Callout variant="purple" className="mb-8">
        <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
          <strong>Prerequisites:</strong> Complete the{' '}
          <Link href="/vibe-coding/installation" style={{ color: 'var(--cw-primary)' }}>
            Installation Guide
          </Link>{' '}
          and{' '}
          <Link href="/vibe-coding/setup" style={{ color: 'var(--cw-primary)' }}>
            CW Setup
          </Link>{' '}
          first. You need Claude Code installed, GitHub org access, and your
          <code> .env.tools.local</code> configured before proceeding.
        </p>
      </Callout>

      {/* Section: What You Get */}
      <section className="mb-16" id="overview">
        <div className="section-label">What This Unlocks</div>
        <h2 className="mb-6">The Full AI Toolkit</h2>

        <CardGrid columns={3}>
          <Card number="01">
            <h4 className="mb-1">86 Skills</h4>
            <p className="text-sm" style={{ color: 'var(--cw-ink-muted)' }}>
              TDD, debugging, security review, database analysis, rate validation, and more
            </p>
          </Card>
          <Card number="02">
            <h4 className="mb-1">56 Agents</h4>
            <p className="text-sm" style={{ color: 'var(--cw-ink-muted)' }}>
              Autonomous task handlers for code review, deployment, testing, and investigation
            </p>
          </Card>
          <Card number="03">
            <h4 className="mb-1">40+ Commands</h4>
            <p className="text-sm" style={{ color: 'var(--cw-ink-muted)' }}>
              Slash commands for Jira, Slack, specs, plans, implementation, and shipping
            </p>
          </Card>
        </CardGrid>
      </section>

      {/* Section: Clone Framework Repos */}
      <section className="mb-16" id="clone-frameworks">
        <div className="section-label">Step 1</div>
        <h2 className="mb-4">
          Clone the <span className="text-highlight">Framework Repos</span>
        </h2>
        <p className="mb-6">
          The AI frameworks live in separate repos. Clone them alongside the main platform:
        </p>

        <CodeBlock
          title="Clone AI framework repos"
          code={`cd ~/workspace

# Claude Code frameworks (GitHub)
git clone git@github.com:CoverWhale/cw-agentic-framework.git
git clone git@github.com:CoverWhale/cw-operational-framework.git

# Documentation & knowledge base
git clone git@github.com:CoverWhale/cw-documentation.git

# Internal sites
git clone git@github.com:CoverWhale/cw-how-we-work.git`}
        />

        <Card className="mt-6">
          <h4 className="mb-3">Optional Repos</h4>
          <p className="text-sm mb-3" style={{ color: 'var(--cw-ink-muted)' }}>
            Clone these as needed for your work:
          </p>
          <CodeBlock
            code={`git clone git@github.com:CoverWhale/cw-playwright-ui-automation.git
git clone git@github.com:CoverWhale/cw-internal-developer-platform.git
git clone git@github.com:CoverWhale/cw-doi-complaint-automation.git
git clone git@github.com:CoverWhale/Insurance_Rater.git
git clone git@github.com:CoverWhale/coverwhale-docs.git
git clone git@github.com:CoverWhale/cw-policy-docs.git`}
          />
        </Card>
      </section>

      {/* Section: Link the Framework */}
      <section className="mb-16" id="link-framework">
        <div className="section-label">Step 2</div>
        <h2 className="mb-4">
          Link the <span className="text-highlight">Claude Code Framework</span>
        </h2>
        <p className="mb-6">
          The agentic framework&apos;s <code>.claude/</code> directory becomes your global
          Claude Code config &mdash; providing 86 skills, 56 agents, 40+ commands, and
          ATOM enforcement hooks.
        </p>

        <CardGrid columns={2}>
          <Card>
            <h4 className="mb-2">Windows (PowerShell as Admin)</h4>
            <CodeBlock
              code={`# Copy the switch script
cp ~/workspace/cw-agentic-framework/switch-framework.ps1 ~/workspace/

# Create junctions from ~/.claude -> framework
powershell -ExecutionPolicy Bypass \\
  -File ~/workspace/switch-framework.ps1 agentic`}
            />
          </Card>
          <Card>
            <h4 className="mb-2">Mac / Linux</h4>
            <CodeBlock
              code={`# Back up existing config
mv ~/.claude ~/.claude.backup 2>/dev/null

# Symlink the framework
ln -s ~/workspace/cw-agentic-framework/.claude ~/.claude`}
            />
          </Card>
        </CardGrid>

        <CodeBlock
          title="Verify the link"
          code={`ls ~/.claude/skills/ | head -10
# Should show: abacus-4-lob, abacus-al, arch-decisions, etc.`}
        />
      </section>

      {/* Section: Sync Script */}
      <section className="mb-16" id="sync">
        <div className="section-label">Step 3</div>
        <h2 className="mb-4">
          Set Up the <span className="text-highlight">Sync Script</span>
        </h2>
        <p className="mb-6">
          Pull all repos with one command. Run this at the start of each session:
        </p>

        <CodeBlock
          title="Install and run the sync script"
          code={`cp ~/workspace/cw-agentic-framework/sync-repos.sh ~/workspace/
chmod +x ~/workspace/sync-repos.sh
bash ~/workspace/sync-repos.sh`}
        />

        <Callout variant="blue" className="mt-4">
          <p className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
            <strong>What it does:</strong> Runs <code>git pull --ff-only</code> on every
            repo in <code>~/workspace/</code>. Skips repos with uncommitted changes and
            reports what updated, skipped, or failed.
          </p>
        </Callout>
      </section>

      {/* Section: Docker Platform */}
      <section className="mb-16" id="docker">
        <div className="section-label">Step 4</div>
        <h2 className="mb-4">
          Set Up the <span className="text-highlight">Platform</span> (Docker)
        </h2>

        <CodeBlock
          title="One-command platform setup"
          code={`cd ~/workspace/coverwhale

# Setup (Intel + Apple Silicon)
make setup

# See your auto-assigned ports
make ports

# Login: agent@coverwhale.local / password123`}
        />

        <Callout variant="sage" className="mt-4">
          <p className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
            <strong>Worktree isolation:</strong> Each git worktree gets fully isolated
            containers, ports, and databases. Ports are auto-derived from the directory
            name &mdash; zero configuration needed.
          </p>
        </Callout>
      </section>

      {/* Section: Internal Sites & Tools */}
      <section className="mb-16" id="internal-tools">
        <div className="section-label">Step 5</div>
        <h2 className="mb-4">
          CW Internal <span className="text-highlight">Sites &amp; Tools</span>
        </h2>
        <p className="mb-6">
          Cover Whale uses <strong>Google Apps Script</strong> for internal tools and
          <strong> Vite static sites</strong> deployed to AWS Amplify.
        </p>

        <CardGrid columns={2}>
          <Card>
            <h4 className="mb-2">Google Apps Script (clasp)</h4>
            <p className="text-sm mb-3" style={{ color: 'var(--cw-ink-muted)' }}>
              Internal tools like legislative monitoring and spend dashboards.
            </p>
            <CodeBlock
              code={`npm install -g @google/clasp
clasp login

# Work with a GAS project
cd ~/workspace/coverwhale/legislative-monitoring
clasp pull   # Pull from Google
clasp push   # Push local changes
clasp open   # Open in browser`}
            />
            <p className="text-xs mt-3" style={{ color: 'var(--cw-ink-muted)' }}>
              Secrets go in <strong>Project Settings &rarr; Script Properties</strong>.
              Deploy as Web app &rarr; &ldquo;Anyone within Cover Whale.&rdquo;
            </p>
          </Card>
          <Card>
            <h4 className="mb-2">How-We-Work Site (Vite)</h4>
            <p className="text-sm mb-3" style={{ color: 'var(--cw-ink-muted)' }}>
              Internal site at how-we-work.coverwhale.dev.
            </p>
            <CodeBlock
              code={`cd ~/workspace/cw-how-we-work
npm install
npx vite dev    # Local dev
npx vite build  # Production`}
            />
            <p className="text-xs mt-3" style={{ color: 'var(--cw-ink-muted)' }}>
              Use <code>/hww-content-update</code> in Claude Code to edit, build, and deploy.
            </p>
          </Card>
        </CardGrid>

        <Card className="mt-6">
          <h4 className="mb-3">GAS Project Conventions</h4>
          <p className="text-sm mb-3" style={{ color: 'var(--cw-ink-muted)' }}>
            All Google Apps Script projects follow the <code>legislative-monitoring/</code> pattern:
          </p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {[
              ['.clasp.json', 'Links to Google project'],
              ['appsscript.json', 'Manifest (timezone, runtime)'],
              ['Code.gs', 'Entry point, trigger runners'],
              ['config.gs', 'Constants, Script Properties'],
              ['services/sheets.gs', 'Google Sheets helpers'],
              ['utils/retry.gs', 'Exponential backoff'],
              ['tests/', 'Lightweight test runner'],
            ].map(([file, desc]) => (
              <div key={file} className="flex items-baseline gap-3">
                <code className="text-xs flex-shrink-0" style={{ color: 'var(--cw-primary)' }}>{file}</code>
                <span style={{ color: 'var(--cw-ink-muted)' }}>{desc}</span>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Section: Framework Switching */}
      <section className="mb-16" id="switching">
        <div className="section-label">Step 6</div>
        <h2 className="mb-4">
          Switching <span className="text-highlight">Frameworks</span>
        </h2>
        <p className="mb-6">
          Switch between dev and ops contexts depending on your work:
        </p>

        <CardGrid columns={2}>
          <Card>
            <div className="flex items-center gap-2 mb-2">
              <h4>agentic</h4>
              <span
                className="text-[10px] uppercase font-bold tracking-wide px-2 py-0.5 rounded-full"
                style={{ background: 'var(--cw-primary-light)', color: 'var(--cw-primary)' }}
              >
                86 skills
              </span>
            </div>
            <p className="text-sm" style={{ color: 'var(--cw-ink-muted)' }}>
              Full dev: TDD, SpecKit, debugging, security, Docker, AWS
            </p>
          </Card>
          <Card>
            <div className="flex items-center gap-2 mb-2">
              <h4>operational</h4>
              <span
                className="text-[10px] uppercase font-bold tracking-wide px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(74,111,165,0.1)', color: 'var(--cw-info)' }}
              >
                ~30 skills
              </span>
            </div>
            <p className="text-sm" style={{ color: 'var(--cw-ink-muted)' }}>
              Ops: Jira, Metabase, HubSpot, n8n, triage, reports
            </p>
          </Card>
        </CardGrid>

        <CodeBlock
          title="Switch frameworks"
          code={`# Show what's available
powershell -File ~/workspace/switch-framework.ps1

# Switch to ops framework
powershell -File ~/workspace/switch-framework.ps1 operational

# Switch back to dev framework
powershell -File ~/workspace/switch-framework.ps1 agentic`}
        />
      </section>

      {/* Section: Verify & Daily Workflow */}
      <section className="mb-16" id="verify">
        <div className="section-label">Step 7</div>
        <h2 className="mb-4">
          Verify &amp; <span className="text-highlight">Daily Workflow</span>
        </h2>

        <h3 className="mb-4">Verify Champion Setup</h3>
        <CodeBlock
          title="Run these in Claude Code"
          code={`/health          # Check environment status
/cw-sync         # Pull latest framework changes
/jira -b         # Test Jira integration`}
        />

        <h3 className="mt-8 mb-4">Daily Workflow</h3>
        <CodeBlock
          title="Start of day"
          code={`# Sync everything (from terminal)
bash ~/workspace/sync-repos.sh

# Or from inside Claude Code
/cw-sync`}
        />
      </section>

      {/* Section: Directory Layout */}
      <section className="mb-16" id="layout">
        <div className="section-label">Reference</div>
        <h2 className="mb-4">Directory Layout</h2>

        <Card>
          <CodeBlock
            code={`~/workspace/
├── coverwhale/                    # Main Laravel platform
│   └── legislative-monitoring/    # GAS project (clasp)
├── cw-agentic-framework/         # Dev framework → ~/.claude
│   └── .claude/
│       ├── skills/    (86)
│       ├── agents/    (56)
│       ├── commands/  (40+)
│       └── hooks/     (24 scripts)
├── cw-operational-framework/     # Ops framework (switchable)
├── cw-documentation/             # Business & architecture docs
├── cw-how-we-work/               # Internal site (Vite + Amplify)
├── sync-repos.sh                 # Pull all repos
└── switch-framework.ps1          # Swap active framework`}
          />
        </Card>
      </section>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8 mt-8" style={{ borderTop: '1px solid var(--cw-border)' }}>
        <Link
          href="/vibe-coding/setup"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all pill-btn"
        >
          <ArrowLeft size={16} /> CW Setup
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

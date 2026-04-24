'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Card, CardGrid } from '@/components/content/Card';
import { Callout } from '@/components/content/Callout';
import { CodeBlock } from '@/components/content/CodeBlock';
import { TierBadge } from '@/components/content/TierBadge';
import { ChampionGate } from '@/components/auth/ChampionGate';

export default function ChampionsPage() {
  return (
    <div>
      <TierBadge tier="expert" />
      <h1 className="mt-4 mb-4">AI Enablement Champions</h1>

      <ChampionGate>
      <p className="mb-12">
        Champions go beyond the basics. Connect Claude Code to Cover Whale&apos;s
        operational framework &mdash; skills and commands for rate investigation,
        ratings triage, Jira, Metabase, Slack, HubSpot, and more. This is the
        full setup used by the AI Enablement team.
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
        <h2 className="mb-6">The Operational Framework</h2>

        <CardGrid columns={3}>
          <Card number="01">
            <h4 className="mb-1">8 Skills</h4>
            <p className="text-sm" style={{ color: 'var(--cw-ink-muted)' }}>
              Rate investigation (abacus-al, abacus-4-lob), ratings triage,
              prompt engineering, overlap checks, and more
            </p>
          </Card>
          <Card number="02">
            <h4 className="mb-1">3 Commands</h4>
            <p className="text-sm" style={{ color: 'var(--cw-ink-muted)' }}>
              <code>/cw-sync</code>, <code>/check-overlap</code>, <code>/prompt-architect</code>
            </p>
          </Card>
          <Card number="03">
            <h4 className="mb-1">Cloud Integrations</h4>
            <p className="text-sm" style={{ color: 'var(--cw-ink-muted)' }}>
              Jira, Metabase, Slack, HubSpot, Atlassian, n8n, GitHub
            </p>
          </Card>
        </CardGrid>
      </section>

      {/* Section: Clone Framework Repo */}
      <section className="mb-16" id="clone-framework">
        <div className="section-label">Step 1</div>
        <h2 className="mb-4">
          Clone the <span className="text-highlight">Operational Framework</span>
        </h2>
        <p className="mb-6">
          Clone the operational framework repo alongside the main platform:
        </p>

        <CodeBlock
          title="Clone the operational framework"
          code={`cd ~/workspace
git clone git@github.com:CoverWhale/cw-operational-framework.git`}
        />

        <Card className="mt-6">
          <h4 className="mb-3">Optional Repos</h4>
          <p className="text-sm mb-3" style={{ color: 'var(--cw-ink-muted)' }}>
            Clone these as needed for your work:
          </p>
          <CodeBlock
            code={`git clone git@github.com:CoverWhale/cw-documentation.git
git clone git@github.com:CoverWhale/cw-how-we-work.git
git clone git@github.com:CoverWhale/cw-playwright-ui-automation.git
git clone git@github.com:CoverWhale/cw-internal-developer-platform.git
git clone git@github.com:CoverWhale/cw-doi-complaint-automation.git
git clone git@github.com:CoverWhale/Insurance_Rater.git
git clone git@github.com:CoverWhale/coverwhale-docs.git
git clone git@github.com:CoverWhale/cw-policy-docs.git`}
          />
        </Card>
      </section>

      {/* Section: Set Up Credentials */}
      <section className="mb-16" id="credentials">
        <div className="section-label">Step 2</div>
        <h2 className="mb-4">
          Set Up <span className="text-highlight">Credentials</span>
        </h2>
        <p className="mb-6">
          The framework connects to Jira, Metabase, n8n, and other services
          through a local credentials file that is never committed to git.
        </p>

        <CardGrid columns={2}>
          <Card>
            <h4 className="mb-2">Windows (PowerShell)</h4>
            <CodeBlock
              code={`cd $env:USERPROFILE\\workspace\\cw-operational-framework
copy .claude\\templates\\env.tools.local.tmpl .env.tools.local`}
            />
          </Card>
          <Card>
            <h4 className="mb-2">Mac / Linux</h4>
            <CodeBlock
              code={`cd ~/workspace/cw-operational-framework
cp .claude/templates/env.tools.local.tmpl .env.tools.local`}
            />
          </Card>
        </CardGrid>

        <p className="mt-6 mb-3">
          Open <code>.env.tools.local</code> and fill in the integrations you
          need. You don&apos;t need them all to start &mdash; Jira and Metabase
          are the most commonly used.
        </p>

        <Card>
          <div className="grid grid-cols-1 gap-y-2 text-sm">
            {[
              ['Jira', 'API token — id.atlassian.com → Security → API tokens'],
              ['Metabase', 'Username & password (your normal Metabase login)'],
              ['n8n', 'API key — n8n → Settings → API → Create API Key'],
              ['GitHub', 'Personal access token (read-only scope)'],
              ['Slack Bot', 'Bot token (xoxb-…) — ask your Slack admin'],
            ].map(([svc, desc]) => (
              <div key={svc} className="flex items-baseline gap-3">
                <code className="text-xs flex-shrink-0" style={{ color: 'var(--cw-primary)' }}>{svc}</code>
                <span style={{ color: 'var(--cw-ink-muted)' }}>{desc}</span>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Section: Enable MCP Plugins */}
      <section className="mb-16" id="mcp-plugins">
        <div className="section-label">Step 3</div>
        <h2 className="mb-4">
          Enable <span className="text-highlight">MCP Cloud Plugins</span>
        </h2>
        <p className="mb-6">
          HubSpot, Slack, and Atlassian integrations use Anthropic&apos;s cloud
          plugins &mdash; no credential files needed.
        </p>

        <CodeBlock
          title="Enable cloud plugins"
          code={`# Inside Claude Code:
/settings

# Find the integrations / plugins section
# Enable: HubSpot, Slack, Atlassian
# Each plugin opens your browser for OAuth — log in with Cover Whale`}
        />
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

      {/* Section: Verify & Daily Workflow */}
      <section className="mb-16" id="verify">
        <div className="section-label">Step 6</div>
        <h2 className="mb-4">
          Verify &amp; <span className="text-highlight">Daily Workflow</span>
        </h2>

        <h3 className="mb-4">Verify Setup</h3>
        <CodeBlock
          title="Run these in Claude Code"
          code={`/health          # Check environment status
/cw-sync         # Pull latest framework changes
/jira -b         # Test Jira integration`}
        />

        <h3 className="mt-8 mb-4">Daily Workflow</h3>
        <CodeBlock
          title="Start of day"
          code={`# Pull latest framework changes from inside Claude Code
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
├── cw-operational-framework/      # Ops framework
│   ├── claude/
│   │   ├── skills/    (8)
│   │   ├── commands/  (3)
│   │   └── hooks/
│   └── .env.tools.local           # Your credentials (not committed)
├── cw-documentation/              # Business & architecture docs
└── cw-how-we-work/                # Internal site (Vite + Amplify)`}
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
      </ChampionGate>
    </div>
  );
}

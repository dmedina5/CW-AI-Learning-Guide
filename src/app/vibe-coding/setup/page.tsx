'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Card, CardGrid } from '@/components/content/Card';
import { Callout } from '@/components/content/Callout';
import { CodeBlock } from '@/components/content/CodeBlock';
import { StepList } from '@/components/content/StepList';
import { TierBadge } from '@/components/content/TierBadge';

export default function SetupPage() {
  return (
    <div>
      <TierBadge tier="beginner" />
      <h1 className="mt-4 mb-4">Cover Whale Setup</h1>
      <p className="mb-12">
        Now that Claude Code is installed, connect it to Cover Whale&apos;s codebase and tools.
        This guide walks you through GitHub access, repository setup, and credential configuration.
      </p>

      {/* Section: Overview */}
      <section className="mb-16" id="overview">
        <div className="section-label">What You&apos;ll Set Up</div>
        <h2 className="mb-6">Setup Overview</h2>

        <CardGrid columns={3}>
          {[
            { title: 'Step 3: GitHub Access', desc: 'Create your account and join the CoverWhale organization' },
            { title: 'Step 4: Platform Access', desc: 'Clone the main repository and get read-only database credentials' },
            { title: 'Step 5: Tool Credentials', desc: 'Configure HubSpot, Metabase, and other API access' },
          ].map((item, i) => (
            <Card key={i}>
              <h4 className="mb-1">{item.title}</h4>
              <p className="text-sm" style={{ color: 'var(--cw-ink-muted)' }}>{item.desc}</p>
            </Card>
          ))}
        </CardGrid>

        <Callout variant="blue" className="mt-6">
          <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
            <strong>Steps 1 &amp; 2 already done?</strong> If you have a Claude account and
            Claude Code installed from the{' '}
            <Link href="/vibe-coding/installation" style={{ color: 'var(--cw-primary)' }}>
              Installation Guide
            </Link>
            , you&apos;re ready to continue here with Step 3.
          </p>
        </Callout>
      </section>

      {/* Section: Step 3 — GitHub Account & Organization */}
      <section className="mb-16" id="github">
        <div className="section-label">Step 3</div>
        <h2 className="mb-4">
          GitHub <span className="text-highlight">Account &amp; Organization</span>
        </h2>
        <p className="mb-6">
          Cover Whale&apos;s source code lives on GitHub. You need a GitHub account and
          membership in the CoverWhale organization to access our repositories.
        </p>

        <h3 className="mb-4">Create Your GitHub Account</h3>
        <p className="mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
          If you don&apos;t already have a GitHub account, create one now. Use your Cover Whale
          email or a personal account &mdash; either works.
        </p>

        <StepList
          steps={[
            {
              title: 'Go to github.com/signup',
              description: (
                <>
                  Visit{' '}
                  <a href="https://github.com/signup" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cw-primary)' }}>
                    github.com/signup
                  </a>{' '}
                  and create a free account
                </>
              ),
            },
            {
              title: 'Choose a professional username',
              description: (
                <>
                  We recommend a format like <code>firstname-lastname-cw</code> or{' '}
                  <code>firstnamelastname-cw</code>
                </>
              ),
            },
            {
              title: 'Verify your email',
              description: 'Check your inbox and click the verification link from GitHub',
            },
          ]}
        />

        <h3 className="mt-8 mb-4">Join the CoverWhale Organization</h3>
        <p className="mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
          After creating your GitHub account, you need to be added to the CoverWhale
          organization. This gives you access to our private repositories.
        </p>

        <StepList
          steps={[
            {
              title: 'Submit an IT ticket',
              description: (
                <>
                  Open an{' '}
                  <a
                    href="https://coverwhale.atlassian.net/servicedesk/customer/portal/8/group/26/create/10089"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--cw-primary)' }}
                  >
                    IT Access Request
                  </a>{' '}
                  and request to be added to the <strong>CoverWhale GitHub organization</strong>. Include your GitHub username in the ticket.
                </>
              ),
            },
            {
              title: 'Accept the organization invitation',
              description: (
                <>
                  Once IT processes your request, you&apos;ll receive an email invitation from GitHub.
                  You can also check{' '}
                  <a href="https://github.com/settings/organizations" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cw-primary)' }}>
                    github.com/settings/organizations
                  </a>{' '}
                  for pending invitations.
                </>
              ),
            },
            {
              title: 'Verify your access',
              description: (
                <>
                  Visit{' '}
                  <a href="https://github.com/CoverWhale" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cw-primary)' }}>
                    github.com/CoverWhale
                  </a>{' '}
                  and confirm you can see the organization&apos;s repositories
                </>
              ),
            },
          ]}
        />

        <Callout variant="sage" className="mt-6">
          <p className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
            <strong>Already have a GitHub account?</strong> You can use your existing personal account.
            Just submit the IT ticket with your current GitHub username to get added to the
            CoverWhale organization.
          </p>
        </Callout>
      </section>

      {/* Section: Step 4 — Platform Access */}
      <section className="mb-16" id="platform">
        <div className="section-label">Step 4</div>
        <h2 className="mb-4">
          Platform <span className="text-highlight">Access</span>
        </h2>
        <p className="mb-6">
          Clone the main Cover Whale repository and get read-only access to the production
          database for investigation and debugging.
        </p>

        <h3 className="mb-4">Clone the Repository</h3>
        <p className="mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
          Once you have GitHub organization access, clone the main platform repository:
        </p>

        <CodeBlock
          title="Clone the Cover Whale repository"
          code={`# Navigate to where you keep projects
cd ~/workspace

# Clone the repo (requires org membership)
git clone https://github.com/CoverWhale/coverwhale.git

# Enter the project directory
cd coverwhale`}
        />

        <Callout variant="blue" className="mt-4 mb-8">
          <p className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
            <strong>SSH vs HTTPS:</strong> If you prefer SSH, set up an SSH key first at{' '}
            <a href="https://github.com/settings/keys" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cw-primary)' }}>
              github.com/settings/keys
            </a>{' '}
            and use <code>git clone git@github.com:CoverWhale/coverwhale.git</code> instead.
          </p>
        </Callout>

        <h3 className="mb-4">Request Read-Only Database Access</h3>
        <p className="mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
          For investigating issues and debugging, you&apos;ll need read-only access to the
          production database replica. This is a safe, read-only copy &mdash; you cannot
          accidentally modify production data.
        </p>

        <StepList
          steps={[
            {
              title: 'Submit an IT ticket for database credentials',
              description: (
                <>
                  Open an{' '}
                  <a
                    href="https://coverwhale.atlassian.net/servicedesk/customer/portal/8/group/26/create/10089"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--cw-primary)' }}
                  >
                    IT Access Request
                  </a>{' '}
                  and request <strong>read-only production database (read replica) credentials</strong>
                </>
              ),
            },
            {
              title: 'Receive your credentials',
              description: 'IT will provide a username and password for the read replica. Keep these secure and never share them.',
            },
            {
              title: 'Add credentials to your local environment',
              description: (
                <>
                  Store them in your <code>.env.tools.local</code> file (see the{' '}
                  <a href="#credentials" style={{ color: 'var(--cw-primary)' }}>Credentials Setup</a> section below)
                </>
              ),
            },
          ]}
        />
      </section>

      {/* Section: Step 5 — Tool Credentials */}
      <section className="mb-16" id="credentials">
        <div className="section-label">Step 5</div>
        <h2 className="mb-4">
          Tool <span className="text-highlight">Credentials</span>
        </h2>
        <p className="mb-6">
          Claude Code integrates with several Cover Whale tools. Each requires API credentials
          stored in a local file that is <strong>never committed to Git</strong>.
        </p>

        <h3 className="mb-4">The <code>.env.tools.local</code> File</h3>
        <p className="mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
          All tool credentials live in a single file called <code>.env.tools.local</code> in the
          project root. This file is already in <code>.gitignore</code>, so it will never be
          accidentally pushed to GitHub.
        </p>

        <CodeBlock
          title="Create your .env.tools.local file"
          code={`# From the project root (e.g., ~/workspace/coverwhale)
# Create the file — it should NOT already exist
touch .env.tools.local`}
        />

        <Card className="mt-6 mb-6">
          <h4 className="mb-3">File Format</h4>
          <p className="text-sm mb-3" style={{ color: 'var(--cw-ink-muted)' }}>
            Add your credentials as key-value pairs. Here&apos;s the template:
          </p>
          <CodeBlock
            code={`# .env.tools.local — DO NOT COMMIT THIS FILE
# Cover Whale tool credentials for local development

# Jira API (for ticket management)
JIRA_API_TOKEN=your-jira-api-token
JIRA_USER_EMAIL=your.name@coverwhale.com

# Read-only production database (read replica)
DB_READONLY_HOST=your-read-replica-host
DB_READONLY_USER=your-username
DB_READONLY_PASSWORD=your-password
DB_READONLY_DATABASE=coverwha_prod

# Metabase API (for data queries and dashboards)
METABASE_API_KEY=your-metabase-api-key

# HubSpot API (for CRM integration)
HUBSPOT_API_KEY=your-hubspot-api-key`}
          />
        </Card>

        <Callout variant="warning" className="mb-8">
          <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
            <strong>Security Rules:</strong>
          </p>
          <div className="mt-2 space-y-1">
            {[
              'Never commit .env.tools.local to Git',
              'Never paste credentials into Slack, email, or documents',
              'Never share credentials with other team members — each person gets their own',
              'If you suspect credentials are compromised, notify IT immediately',
            ].map((rule, i) => (
              <div key={i} className="flex items-baseline gap-2 text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: 'var(--cw-warning)' }} />
                <span>{rule}</span>
              </div>
            ))}
          </div>
        </Callout>

        <h3 className="mb-4">Requesting Tool Access</h3>
        <p className="mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
          Submit IT tickets to obtain credentials for each tool you need. You can request
          multiple in the same ticket.
        </p>

        <CardGrid columns={2}>
          {[
            {
              tool: 'Jira API Token',
              how: 'Self-service',
              desc: (
                <>
                  Generate at{' '}
                  <a href="https://id.atlassian.com/manage-profile/security/api-tokens" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cw-primary)' }}>
                    id.atlassian.com
                  </a>{' '}
                  using your Cover Whale Atlassian account
                </>
              ),
            },
            {
              tool: 'Database Read Replica',
              how: 'IT ticket required',
              desc: 'Read-only access to production data for debugging and investigation',
            },
            {
              tool: 'Metabase API Key',
              how: 'IT ticket required',
              desc: 'Query dashboards and data programmatically for analysis and reporting',
            },
            {
              tool: 'HubSpot API Key',
              how: 'IT ticket required',
              desc: 'Access CRM data for broker and submission lookups',
            },
          ].map((item) => (
            <Card key={item.tool}>
              <div className="flex items-center justify-between mb-2">
                <h4>{item.tool}</h4>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-semibold"
                  style={{
                    background: item.how === 'Self-service' ? 'rgba(58,158,110,0.1)' : 'rgba(74,111,165,0.1)',
                    color: item.how === 'Self-service' ? 'var(--cw-success)' : 'var(--cw-info)',
                  }}
                >
                  {item.how}
                </span>
              </div>
              <p className="text-sm" style={{ color: 'var(--cw-ink-muted)' }}>{item.desc}</p>
            </Card>
          ))}
        </CardGrid>

        <Callout variant="purple" className="mt-6">
          <p className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
            <strong>IT Access Request Portal:</strong>{' '}
            <a
              href="https://coverwhale.atlassian.net/servicedesk/customer/portal/8/group/26/create/10089"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--cw-primary)' }}
            >
              Submit a ticket here
            </a>{' '}
            for any credentials marked &ldquo;IT ticket required.&rdquo; Include which tools you
            need access to and your role/team.
          </p>
        </Callout>
      </section>

      {/* Section: Verify Your Setup */}
      <section className="mb-16" id="verify">
        <div className="section-label">Verify</div>
        <h2 className="mb-4">
          Verify Your <span className="text-highlight">Setup</span>
        </h2>
        <p className="mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
          Run through this checklist to confirm everything is connected:
        </p>

        <Card>
          <div className="space-y-3">
            {[
              { check: 'GitHub organization', verify: 'Can see repos at github.com/CoverWhale' },
              { check: 'Repository cloned', verify: 'coverwhale directory exists with code' },
              { check: '.env.tools.local created', verify: 'File exists in project root, not tracked by Git' },
              { check: 'Claude Code runs in repo', verify: 'cd coverwhale && claude responds without errors' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
                <div
                  className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 text-xs font-bold"
                  style={{ background: 'rgba(58,158,110,0.1)', color: 'var(--cw-success)' }}
                >
                  {i + 1}
                </div>
                <span><strong>{item.check}</strong> &mdash; {item.verify}</span>
              </div>
            ))}
          </div>
        </Card>

        <div className="mt-6">
          <CodeBlock
            title="Quick verification commands"
            code={`# Verify Git can reach CoverWhale repos
git ls-remote https://github.com/CoverWhale/coverwhale.git

# Verify .env.tools.local is gitignored
cd ~/workspace/coverwhale
git status .env.tools.local
# Should show nothing (ignored)

# Start Claude Code in the repo
claude`}
          />
        </div>

        <Callout variant="sage" className="mt-4">
          <p className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
            <strong>You&apos;re all set!</strong> You now have Claude Code installed, GitHub access to
            Cover Whale&apos;s codebase, and a secure place to store your tool credentials.
            Head to the Fundamentals page to start using Claude Code effectively.
          </p>
        </Callout>
      </section>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8 mt-8" style={{ borderTop: '1px solid var(--cw-border)' }}>
        <Link
          href="/vibe-coding/installation"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all pill-btn"
        >
          <ArrowLeft size={16} /> Installation
        </Link>
        <Link
          href="/vibe-coding/champions"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:gap-3"
          style={{ background: 'var(--cw-primary)', color: '#fff' }}
        >
          Next: AI Enablement Champions <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

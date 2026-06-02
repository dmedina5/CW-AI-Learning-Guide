'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, Bot, Scale, Truck, FileSpreadsheet, MapPin } from 'lucide-react';
import { Card, CardGrid } from '@/components/content/Card';
import { Callout } from '@/components/content/Callout';
import { CodeBlock } from '@/components/content/CodeBlock';
import { TierBadge } from '@/components/content/TierBadge';

// Real AI tools built by Cover Whale teammates. Context / use case / build prompt
// are derived from each tool's README or source.
const CW_TOOLS = [
  {
    id: 'cw-data-bot',
    icon: Bot,
    name: 'CW Data Bot',
    tagline: 'Ask your data a question in Slack — get a real answer.',
    stack: 'Python · Slack Bolt · Claude · Metabase · sqlglot',
    context:
      'A Slack bot that turns plain-English questions into safe, read-only queries against the data warehouse. One bot, persona-injected per department (v1 is the Underwriting persona, /ask-underwriting). A saved-card-first, three-tier engine runs a vetted Metabase report when one fits, otherwise generates a guarded SELECT from a YAML business glossary. A sqlglot guard enforces SELECT-only, a table allowlist, and PII-column rejection; every query is audit-logged to CloudWatch.',
    useCase:
      'Anyone in the workspace can ask "how many submissions are in review?" or "bound premium by carrier this year" without knowing SQL or having a Metabase login. It democratizes data access while keeping it governed — each answer tells you whether it came from a vetted report or guarded generated SQL.',
    buildPromptTitle: 'Build Prompt — Slack data bot',
    buildPrompt: `CONTEXT: We want every employee to query our Metabase-connected
data warehouse (Postgres) from Slack in plain English, safely.

ROLE: Act as a senior Python engineer building an internal Slack bot.

INSTRUCTION: Build a Slack bot (Bolt + Socket Mode) that answers
natural-language data questions with a saved-card-first, 3-tier router.

SPECIFICS:
- Tier 1: run a vetted Metabase saved card as-is (no model SQL).
- Tier 2: adapt a vetted card's SQL as a template.
- Tier 3: generate a fresh read-only SELECT from a YAML glossary that
  maps business terms -> schema-qualified tables.
- Wrap Tiers 2-3 in a sqlglot guard: SELECT-only, table allowlist,
  PII-column rejection, enforced LIMIT, dialect/schema validation.
- "One bot, persona per department" — inject department context so
  out-of-scope questions are politely refused.
- Audit-log every query, refusal, and save-back to CloudWatch.

PREFERENCES: TDD with an adversarial-refusal test corpus. Ack the
Slack message immediately, then reply in-thread. Label each answer's
source (vetted report vs generated SQL).`,
  },
  {
    id: 'doi-complaint-automation',
    icon: Scale,
    name: 'DOI Complaint Automation',
    tagline: 'A regulator complaint arrives — minutes later, compliance has a drafted response.',
    stack: 'PHP · Claude · Playwright · Google Workspace · Slack',
    context:
      'A standalone service that processes Department of Insurance complaints end-to-end. An inbound complaint email hits a webhook, passes a fail-closed 4-tier classifier (pattern → sender → positive patterns → Claude), then Claude parses the complaint PDF (with OCR fallback for scans). It cross-references the policy database and HubSpot tickets to generate preliminary findings, logs a row to the CWIS Complaints Sheet, builds a Drive folder and collects endorsement docs via Playwright, generates a branded DOCX response letter, and DMs the compliance team in Slack.',
    useCase:
      'Compliance used to triage each complaint by hand — reading the PDF, digging through the platform, drafting a letter. Now the work arrives pre-assembled: parsed details, preliminary findings, a documents folder, and a draft response, ready for human review. Hours of manual assembly become a review-and-send step.',
    buildPromptTitle: 'Build Prompt — complaint intake pipeline',
    buildPrompt: `CONTEXT: Regulator (DOI) complaints arrive by email with PDF
attachments. Compliance manually parses them, researches the policy,
and drafts a response — slow and error-prone.

ROLE: Act as a backend engineer building an automated intake service.

INSTRUCTION: Build a webhook service that ingests a complaint email
and produces a review-ready package.

SPECIFICS:
- Classify inbound mail with a fail-closed pipeline; only escalate
  ambiguous cases to an LLM. Reject auto-replies/newsletters early.
- Extract structured fields from the PDF with Claude; fall back to
  pdftotext, then tesseract OCR for scanned documents.
- Generate findings by cross-referencing the policy DB + CRM tickets.
- Log to a Google Sheet, create a Drive folder, collect related docs
  via authenticated Playwright download, render a branded DOCX letter.
- Notify the compliance team in Slack with links.

PREFERENCES: Fail closed on every error path (never silently drop a
complaint — notify a human). HMAC-validate the webhook. Make each
pipeline step independently skippable for testing.`,
  },
  {
    id: 'fleet-submission-analyzer',
    icon: Truck,
    name: 'Fleet Submission Analyzer',
    tagline: 'Every fleet submission, pre-graded and fully documented before an underwriter opens it.',
    stack: 'Python · Claude · Playwright · Metabase · HubSpot · GitHub Actions',
    context:
      'A daily underwriting pipeline for fleet submissions (6+ power units). It discovers new submissions, evaluates them against a CSV-driven UW rules engine (editable by underwriters, no code changes), and grades each GREEN / YELLOW / RED. It generates a 22-section branded .docx report — FMCSA/SAFER detail, driver roster, vehicle fleet, loss history, BASIC scores, and Claude-written narratives — then distributes results to Google Drive, the #fleet-analyzer-report Slack channel, a Google Sheet log, and HubSpot deal properties. Playwright runs the DOT pre-screen and pulls loss-run PDFs; all DB access goes through the Metabase API so it runs on GitHub Actions.',
    useCase:
      'Underwriters and BDMs open each morning to a triaged queue: GREEN deals ready to submit, YELLOW deals with a specific action-item list, RED hard declines — each backed by a complete report. It replaces manually pulling data from five systems per submission with a one-glance grade and a document they can act on.',
    buildPromptTitle: 'Build Prompt — submission grading pipeline',
    buildPrompt: `CONTEXT: Underwriters manually research each fleet submission across
the platform, FMCSA/SAFER, loss runs, and BASIC scores before deciding
whether it's worth pursuing.

ROLE: Act as a Python engineer building a read-only analysis pipeline.

INSTRUCTION: Build a daily pipeline that grades each fleet submission
and produces a branded report.

SPECIFICS:
- Discover submissions (6+ power units) via the Metabase SQL API — no
  direct DB/VPC access, so it can run on GitHub Actions.
- Evaluate against a CSV-driven rules engine (drivers, violations,
  BASIC thresholds, commodities) editable by UW without code changes.
- Grade GREEN/YELLOW/RED with an action-item list per submission.
- Use Playwright for the DOT pre-screen and to download loss-run PDFs;
  use Claude to parse those PDFs and write executive/strengths narratives.
- Emit a 22-section branded .docx; write results back to Drive, Slack,
  a Google Sheet (dedup + trends), and HubSpot deal properties.

PREFERENCES: Partial-failure tolerant — if any integration is down,
continue with available data and log a warning, never block the grade.
Deduplicate within a configurable window.`,
  },
  {
    id: 'loss-run-generator',
    icon: FileSpreadsheet,
    name: 'Loss Run Generator',
    builtBy: 'Sean Johnson',
    tagline: 'Type a policy number, get a clean loss run — and let the platform call the same logic.',
    stack: 'Google Apps Script · Metabase (DW) · server-to-server JSON API',
    context:
      'A self-contained Apps Script web app that produces a branded loss-run document from a single policy number. It runs one canonical claims query against the data warehouse and reconciles against the actuarial TOTAL_CLAIMS_LIST so the numbers are consistent. Beyond the browser UI, it exposes a secured (X-Api-Key) server-to-server JSON endpoint that returns the structured claims map without rendering a PDF — so the Cover Whale platform can plug its own templates on top while the query, aggregation, and reconciliation logic stays the single source of truth.',
    useCase:
      'Producing a loss run used to mean a manual claims pull and hand-reconciliation. Now anyone enters a policy number and gets a consistent loss run in seconds, and the platform can fetch the exact same data programmatically — one definition of "the loss run," used everywhere.',
    buildPromptTitle: 'Build Prompt — loss run web app + API',
    buildPrompt: `CONTEXT: Generating a loss run for a policy is a manual claims query
plus reconciliation. We need it self-serve AND callable by our platform,
with one canonical definition of the numbers.

ROLE: Act as an engineer building a Google Apps Script web app.

INSTRUCTION: Build a web app that takes a policy number and renders a
branded loss-run document, plus a JSON API for server-to-server use.

SPECIFICS:
- doGet: HTML UI — enter a policy number, render a branded PDF.
- doPost: JSON API returning the structured claims map (no PDF), so
  consumers can apply their own template.
- Run ONE canonical claims query against the warehouse and reconcile
  against the actuarial total-claims list; keep this the single source
  of truth shared by both surfaces.
- Validate the policy exists before querying; return clear not-found.

PREFERENCES: Secure the API with a shared-secret key (fail closed if
unset). Read config from Script Properties (no secrets in code).
Validate and normalize the policy number.`,
  },
  {
    id: 'coverages-by-state',
    icon: MapPin,
    name: 'Coverages by State',
    builtBy: 'JJ & D³',
    tagline: 'Can we write this line on whose paper, in which state? Answered instantly.',
    stack: 'React · Tailwind · CW SSO · data snapshot + change monitor',
    context:
      'A single-page tool: type a state and see which carriers are active and which coverage lines (AL, APD, MTC, TGL, NTL) are available there, split admitted vs. non-admitted / surplus, including UIIA eligibility. It is driven by a snapshot of carrier-by-state availability, paired with a change monitor (content hash + row count) that flags when a carrier or state availability shifts so the data stays trustworthy.',
    useCase:
      'Agents and underwriters constantly need to know "can we write Auto Liability in this state, on which carrier, admitted or surplus?" This replaces digging through filings and spreadsheets with a searchable, filterable state view they can answer from in seconds.',
    buildPromptTitle: 'Build Prompt — coverage availability explorer',
    buildPrompt: `CONTEXT: Agents and UW need to know which carriers/coverage lines are
available in a given state (admitted vs surplus). Today that lives in
filings and spreadsheets that are slow to search.

ROLE: Act as a frontend engineer building an internal single-page tool.

INSTRUCTION: Build a searchable app that shows carrier and coverage
availability by state from a data snapshot.

SPECIFICS:
- Search/select a state -> show active carriers and the lines (AL, APD,
  MTC, TGL, NTL) available, grouped admitted vs non-admitted/surplus,
  with UIIA eligibility.
- Snapshot the carrier-by-state data; add a monitor that hashes the
  dataset and flags when availability changes (so it can't go stale).
- Filterable summary cards (e.g. admitted AL vs non-admitted AL).

PREFERENCES: Gate behind company SSO. Keep it a fast, single-page UI.
Make the snapshot easy to refresh and the change-detection visible.`,
  },
] as const;

export default function UseCasesPage() {
  return (
    <div>
      <TierBadge tier="expert" />
      <h1 className="mt-4 mb-4">CW-Specific Use Cases</h1>
      <p className="mb-12">
        Real-world AI applications organized by department. Each use case includes example prompts
        you can adapt for your daily work at Cover Whale.
      </p>

      {/* Underwriting Section */}
      <section className="mb-16" id="underwriting" data-tier="expert">
        <div className="section-label">Underwriting</div>
        <h2 className="mb-4">
          Submission Analysis &amp; <span className="text-highlight">Risk Assessment</span>
        </h2>
        <p className="mb-8">
          AI can accelerate underwriting workflows &mdash; from initial submission triage to detailed
          risk analysis. These prompts help you move faster while maintaining underwriting rigor.
        </p>

        <div className="space-y-6">
          <Card number="UW-01">
            <h3 className="mb-2">Submission Analysis</h3>
            <p className="text-base mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
              Quickly extract key risk factors and flag potential concerns from new business submissions.
            </p>
            <CodeBlock
              title="Submission Triage Prompt"
              code={`CONTEXT: I'm a trucking insurance underwriter reviewing a new
business submission for a fleet operating in the Southeast US.

ROLE: Act as a senior commercial auto underwriter with 15 years
of experience in trucking risks.

INSTRUCTION: Analyze the following submission details and provide
a risk assessment summary with recommended next steps.

SPECIFICS:
- Fleet size: 35 power units (mix of owned and leased)
- Operations: Regional refrigerated freight, 500-mile radius
- Driver count: 42 (including owner-operators)
- Years in business: 7
- Loss history: 6 claims in 36 months
  (3 cargo, 2 auto liability, 1 physical damage)
- Current carrier: non-renewing due to loss ratio
- Safety tech: ELDs compliant, no dash cams

PREFERENCES: Provide a structured analysis with:
1. Top 5 risk factors ranked by severity
2. Red flags requiring further investigation
3. Information gaps I should request from the broker
4. Preliminary appetite assessment (pursue/decline/conditional)
Use bullet points. Keep professional but direct.`}
            />
          </Card>

          <Card number="UW-02">
            <h3 className="mb-2">Coverage Comparison</h3>
            <p className="text-base mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
              Compare coverage options and identify gaps for complex accounts.
            </p>
            <CodeBlock
              title="Coverage Gap Analysis"
              code={`CONTEXT: A medium-sized fleet (25 units) currently has auto
liability, physical damage, and motor truck cargo coverage.
They're expanding into hazmat transport (fuel tankers).

ROLE: Act as a coverage specialist in commercial trucking insurance.

INSTRUCTION: Identify the coverage gaps and additional endorsements
needed for this expansion into hazmat operations.

SPECIFICS: Focus on:
- Pollution liability exposure
- MCS-90 endorsement requirements
- Cargo coverage adequacy for hazmat loads
- Any state-specific requirements for fuel transport
- Umbrella/excess liability considerations

PREFERENCES: Present as a comparison table where possible.
Flag mandatory vs. recommended coverages. Keep under 400 words.`}
            />
          </Card>

          <Card number="UW-03">
            <h3 className="mb-2">Loss Run Analysis</h3>
            <p className="text-base mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
              Extract patterns and trends from loss history to inform pricing and risk selection.
            </p>
            <CodeBlock
              title="Loss Run Review"
              code={`CONTEXT: I'm reviewing 3 years of loss runs for a trucking
account renewal. The fleet operates 50 power units doing
long-haul dry van freight across 30+ states.

ROLE: Act as an experienced underwriting analyst specializing
in trucking loss development.

INSTRUCTION: Analyze the following loss summary and identify
trends, concerns, and positive indicators.

SPECIFICS:
Year 1: 8 claims / $420K incurred (3 open)
Year 2: 5 claims / $180K incurred (1 open)
Year 3: 3 claims / $95K incurred (0 open)
- Largest single loss: $210K auto liability (Year 1, rear-end)
- Most frequent type: cargo (6 of 16 total)
- Driver turnover: decreased from 85% to 45% over period

PREFERENCES: Provide:
1. Overall trend assessment (improving/stable/deteriorating)
2. Frequency and severity analysis
3. Areas of concern that need monitoring
4. Positive factors to consider in pricing
5. Recommended loss picks for the renewal quote
Bullet format. Be specific with numbers.`}
            />
          </Card>

          <Card number="UW-04">
            <h3 className="mb-2">Risk Factor Deep Dive</h3>
            <p className="text-base mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
              Investigate specific risk characteristics for better-informed decisions.
            </p>
            <div className="p-4 rounded-lg mb-3" style={{ background: 'rgba(217,85,80,0.06)', border: '1px solid rgba(217,85,80,0.15)' }}>
              <div className="text-[11px] font-semibold uppercase mb-2" style={{ color: 'var(--cw-warning)' }}>Vague</div>
              &ldquo;Tell me about the risks of this trucking account&rdquo;
            </div>
            <div className="p-4 rounded-lg" style={{ background: 'rgba(58,158,110,0.06)', border: '1px solid rgba(58,158,110,0.15)' }}>
              <div className="text-[11px] font-semibold uppercase mb-2" style={{ color: 'var(--cw-success)' }}>Specific</div>
              &ldquo;A fleet with 40% owner-operators is applying for auto liability coverage. Analyze the specific risks associated with a high owner-operator ratio, including: control over driver selection, maintenance standards variability, higher turnover impact on loss frequency, and any underwriting considerations for independent contractor vs. employee driver models. Provide your analysis as a risk matrix with likelihood and impact ratings.&rdquo;
            </div>
          </Card>
        </div>
      </section>

      {/* Broker Communication Section */}
      <section className="mb-16" id="broker-communication" data-tier="expert">
        <div className="section-label">Broker Communication</div>
        <h2 className="mb-4">
          Professional <span className="text-highlight">Correspondence</span>
        </h2>
        <p className="mb-8">
          Draft polished, accurate broker communications in seconds. Always review AI-generated
          correspondence for accuracy before sending.
        </p>

        <div className="space-y-6">
          <Card number="BC-01">
            <h3 className="mb-2">Quote Follow-Up Email</h3>
            <p className="text-base mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
              Professional follow-ups that maintain broker relationships.
            </p>
            <CodeBlock
              title="Quote Follow-Up Prompt"
              code={`CONTEXT: I sent a quote to a broker 5 business days ago for a
regional fleet account. The quote was competitive but included
subjectivities around driver MVRs and a fleet inspection.

ROLE: Act as a professional underwriter at a trucking MGA.

INSTRUCTION: Draft a follow-up email to the broker checking on
the status of the quote and offering to discuss any questions.

SPECIFICS:
- Tone: Professional, helpful, not pushy
- Mention the outstanding subjectivities gently
- Offer to schedule a call to walk through the quote
- Reference that the quote is valid for 30 days
- Keep it under 150 words

PREFERENCES: Email format with subject line.
Professional but warm tone.`}
            />
          </Card>

          <Card number="BC-02">
            <h3 className="mb-2">Declination Letter</h3>
            <p className="text-base mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
              Respectful, clear declinations that preserve the broker relationship.
            </p>
            <CodeBlock
              title="Declination Letter Prompt"
              code={`CONTEXT: I need to decline a submission for a long-haul fleet
with a poor loss history and several concerning risk factors.
I want to maintain the broker relationship for future submissions.

ROLE: Act as a senior underwriter communicating a declination.

INSTRUCTION: Draft a declination letter that is clear about
the decision but leaves the door open for future business.

SPECIFICS:
- Reason: Adverse loss history (loss ratio above 90% for 3 years)
- Secondary concern: High driver turnover (95%+)
- Do NOT include specific financial details in the letter
- Suggest what improvements would make the account reconsiderable
- Keep it professional and brief (under 200 words)

PREFERENCES: Business letter format. Empathetic but firm tone.
Include a constructive suggestion for the insured.`}
            />
          </Card>

          <Card number="BC-03">
            <h3 className="mb-2">Information Request</h3>
            <p className="text-base mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
              Clear, organized requests for missing submission information.
            </p>
            <CodeBlock
              title="Info Request Prompt"
              code={`CONTEXT: I've received an incomplete submission for a 20-truck
fleet. Several key underwriting data points are missing.

ROLE: Act as an underwriter requesting additional information.

INSTRUCTION: Draft a professional email to the broker listing
the missing items I need to complete my review.

SPECIFICS: I need the following:
- 3-year loss runs (only 1 year provided)
- Current driver roster with MVR dates
- Vehicle schedule with VIN and year/make/model
- Copy of DOT safety rating or ISS score
- Radius of operations confirmation
- Current MCS-90/BMC-91 filings

PREFERENCES: Numbered list format for easy reference.
Professional tone. Mention a timeline (need within 5 business
days to maintain quote validity). Under 200 words.`}
            />
          </Card>
        </div>

        <Callout variant="warning" className="mt-6">
          <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
            <strong>Always review AI-drafted communications</strong> before sending. Verify all
            policy details, numbers, and specific account references. AI may generate plausible
            but inaccurate details.
          </p>
        </Callout>
      </section>

      {/* Claims Section */}
      <section className="mb-16" id="claims" data-tier="expert">
        <div className="section-label">Claims</div>
        <h2 className="mb-4">
          Claims Processing <span className="text-highlight">Assistance</span>
        </h2>
        <p className="mb-8">
          Streamline claims workflows with AI-assisted documentation, investigation planning,
          and communication drafting.
        </p>

        <div className="space-y-6">
          <Card number="CL-01">
            <h3 className="mb-2">FNOL Processing Assistance</h3>
            <p className="text-base mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
              Structure first notice of loss information and identify immediate action items.
            </p>
            <CodeBlock
              title="FNOL Structuring Prompt"
              code={`CONTEXT: I've received a first notice of loss call for a
trucking accident. I need to organize the information and
identify next steps.

ROLE: Act as a claims intake specialist for commercial trucking.

INSTRUCTION: Help me structure the following FNOL details into
a complete report and identify any gaps in the information.

SPECIFICS: Information received:
- Date of loss: [generalized date]
- Location: Interstate highway in a Southern state
- Description: Tractor-trailer rear-ended a passenger vehicle
  at a construction zone
- Injuries: Passenger vehicle driver reports neck/back pain
- Driver status: Company driver, passed post-accident drug test
- Vehicle damage: Moderate front-end damage to tractor,
  significant rear damage to passenger vehicle
- Police report: Filed, report number pending

PREFERENCES: Organize into standard FNOL sections:
1. Loss details
2. Vehicle/property damage assessment
3. Injury summary
4. Immediate action items
5. Missing information to obtain
6. Recommended reserves range (general guidance only)
Flag any red flags or litigation indicators.`}
            />
          </Card>

          <Card number="CL-02">
            <h3 className="mb-2">Investigation Checklist</h3>
            <p className="text-base mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
              Generate comprehensive investigation plans for complex claims.
            </p>
            <CodeBlock
              title="Investigation Plan Prompt"
              code={`CONTEXT: A single-vehicle rollover involving a loaded tanker
truck on a rural highway. The driver claims a tire blowout
caused the accident. There is a potential environmental cleanup
exposure due to product spill.

ROLE: Act as a senior claims adjuster specializing in
commercial trucking.

INSTRUCTION: Create a detailed investigation checklist for
this claim, prioritized by urgency.

SPECIFICS:
- Consider: driver factors, vehicle maintenance, road conditions,
  cargo securement, environmental exposure
- Include documentation to obtain
- Include parties to contact
- Flag any subrogation potential
- Note any coverage concerns (pollution, cargo)

PREFERENCES: Organized by priority (immediate / within 48 hours /
within 1 week). Checkbox-style list format. Include the "why"
for each investigation step.`}
            />
          </Card>
        </div>
      </section>

      {/* General Use Cases */}
      <section className="mb-16" id="general" data-tier="expert">
        <div className="section-label">General Productivity</div>
        <h2 className="mb-4">
          Everyday <span className="text-highlight">Productivity</span> Use Cases
        </h2>
        <p className="mb-8">
          These prompts work for any department &mdash; from document summarization to meeting
          preparation and data analysis.
        </p>

        <div className="space-y-6">
          <Card number="GP-01">
            <h3 className="mb-2">Document Summarization</h3>
            <p className="text-base mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
              Distill long documents into actionable summaries.
            </p>
            <CodeBlock
              title="Document Summary Prompt"
              code={`CONTEXT: I need to review a lengthy industry report on
commercial auto insurance market trends for an upcoming
leadership meeting.

ROLE: Act as a business analyst in the trucking insurance space.

INSTRUCTION: Summarize the key takeaways from the following
document, focusing on what's actionable for a trucking MGA.

SPECIFICS:
- Focus on: rate trends, loss cost drivers, regulatory changes,
  and technology adoption
- Highlight anything that directly impacts trucking MGAs
- Note any data points useful for underwriting strategy
- Flag competitive intelligence insights

PREFERENCES:
- Executive summary (3-4 sentences) at the top
- Then 5-7 key takeaways as bullet points
- End with "Implications for Cover Whale" section
- Keep total under 500 words`}
            />
          </Card>

          <Card number="GP-02">
            <h3 className="mb-2">Data Analysis Assistance</h3>
            <p className="text-base mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
              Get help interpreting data sets and identifying trends.
            </p>
            <CodeBlock
              title="Data Analysis Prompt"
              code={`CONTEXT: I have quarterly production data for our trucking
book of business and need to identify trends for a board report.

ROLE: Act as an insurance data analyst.

INSTRUCTION: Help me analyze the following data and identify
the most significant trends and anomalies.

SPECIFICS:
- Q1: 450 quotes, 180 binds (40% hit ratio), $2.1M premium
- Q2: 520 quotes, 195 binds (37.5% hit ratio), $2.4M premium
- Q3: 480 quotes, 168 binds (35% hit ratio), $2.0M premium
- Q4: 600 quotes, 240 binds (40% hit ratio), $3.1M premium

PREFERENCES:
- Identify the top 3 trends
- Suggest possible explanations for each trend
- Recommend 2-3 metrics to track going forward
- Present in a format suitable for a board presentation
- Include quarter-over-quarter percentage changes`}
            />
          </Card>

          <Card number="GP-03">
            <h3 className="mb-2">Meeting Preparation</h3>
            <p className="text-base mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
              Prepare agendas, talking points, and pre-read materials.
            </p>
            <CodeBlock
              title="Meeting Prep Prompt"
              code={`CONTEXT: I have a quarterly business review with a top broker
partner who produces $5M+ in annual premium for our trucking
program.

ROLE: Act as a relationship manager preparing for a key
partner meeting.

INSTRUCTION: Help me prepare a meeting agenda and talking points.

SPECIFICS:
- Meeting duration: 1 hour
- Their production is up 15% YoY
- We've had some service complaints about quote turnaround time
- We're launching a new telematics discount program
- Their loss ratio on our book is 52% (favorable)

PREFERENCES:
- Structured agenda with time allocations
- 3-5 talking points per agenda item
- Include a "prepare for" section (potential tough questions)
- Suggest 2-3 value-adds to bring to the meeting
- Professional, partnership-oriented tone`}
            />
          </Card>
        </div>
      </section>

      {/* CW AI Tools in Production */}
      <section className="mb-16" id="cw-tools" data-tier="advanced">
        <TierBadge tier="advanced" />
        <div className="section-label mt-4">Built at Cover Whale</div>
        <h2 className="mb-4">
          Real AI Tools <span className="text-highlight">Shipped by Our Team</span>
        </h2>
        <p className="mb-6">
          These aren&apos;t hypotheticals &mdash; they&apos;re production tools built by Cover Whale
          teammates using the same techniques taught across this guide. Each one started as a
          plain-English brief to an AI coding agent. For every tool below you&apos;ll find what it
          does, the problem it solves, and an <strong>example build prompt</strong> you could adapt to
          create something similar.
        </p>

        <Callout variant="purple" className="mb-8">
          <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
            <strong>This is agentic engineering in practice.</strong> Want to build one of your own?
            Start with the{' '}
            <Link href="/road-to-agentic-engineering" className="text-highlight underline">Road to Agentic Engineering</Link>{' '}
            and the{' '}
            <Link href="/context-engineering" className="text-highlight underline">Context Engineering</Link> guide.
          </p>
        </Callout>

        <div className="space-y-6">
          {CW_TOOLS.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <Card key={tool.id} number={`TOOL ${String(i + 1).padStart(2, '0')}`}>
                <div className="flex items-start gap-4 mb-4">
                  <span
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--cw-primary-light)' }}
                  >
                    <Icon size={22} style={{ color: 'var(--cw-primary)' }} />
                  </span>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <h3>{tool.name}</h3>
                      {'builtBy' in tool && tool.builtBy && (
                        <span
                          className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                          style={{ background: 'rgba(58,158,110,0.12)', color: 'var(--cw-success)' }}
                        >
                          Built by {tool.builtBy}
                        </span>
                      )}
                    </div>
                    <p className="text-sm italic mt-1" style={{ color: 'var(--cw-ink-secondary)' }}>
                      {tool.tagline}
                    </p>
                    <p className="text-[11px] font-mono mt-2" style={{ color: 'var(--cw-ink-muted)' }}>
                      {tool.stack}
                    </p>
                  </div>
                </div>

                <CardGrid columns={2} className="mb-4">
                  <div className="p-4 rounded-lg" style={{ background: 'var(--cw-surface)', border: '1px solid var(--cw-border)' }}>
                    <div className="text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--cw-primary)' }}>Context</div>
                    <p className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>{tool.context}</p>
                  </div>
                  <div className="p-4 rounded-lg" style={{ background: 'var(--cw-surface)', border: '1px solid var(--cw-border)' }}>
                    <div className="text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--cw-success)' }}>Use Case</div>
                    <p className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>{tool.useCase}</p>
                  </div>
                </CardGrid>

                <CodeBlock title={tool.buildPromptTitle} code={tool.buildPrompt} />
              </Card>
            );
          })}
        </div>

        <Callout variant="warning" className="mt-8">
          <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
            <strong>Build prompts are starting points, not the whole story.</strong> Each of these
            tools took iteration, testing, and review to ship safely &mdash; especially the ones that
            touch policy data, PII, or regulators. Pair the prompt with the guardrails: tests,
            human-in-the-loop review, and fail-closed error handling.
          </p>
        </Callout>
      </section>

      {/* CRISP Quick Reference */}
      <section className="mb-16" id="crisp-reference" data-tier="expert">
        <div className="section-label">Quick Reference</div>
        <h2 className="mb-4">
          CRISP Framework <span className="text-highlight">Refresher</span>
        </h2>
        <p className="mb-6">
          Remember to structure your prompts using the CRISP framework for the best results.
        </p>

        <CardGrid columns={2}>
          <div className="p-6 rounded-xl" style={{ background: 'var(--cw-surface)', border: '1px solid var(--cw-border)' }}>
            <h4 className="text-lg font-bold mb-4" style={{ color: 'var(--cw-primary)' }}>CRISP Breakdown</h4>
            <div className="space-y-3">
              {[
                { letter: 'C', word: 'Context', desc: 'Background, situation, domain' },
                { letter: 'R', word: 'Role', desc: 'Who the AI should act as' },
                { letter: 'I', word: 'Instruction', desc: 'The specific task (use action verbs)' },
                { letter: 'S', word: 'Specifics', desc: 'Data, constraints, requirements' },
                { letter: 'P', word: 'Preferences', desc: 'Output format, tone, length' },
              ].map(item => (
                <div key={item.letter} className="flex items-center gap-3">
                  <span
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                    style={{ background: 'var(--cw-primary)' }}
                  >
                    {item.letter}
                  </span>
                  <div>
                    <span className="font-semibold text-sm">{item.word}</span>
                    <span className="text-xs ml-2" style={{ color: 'var(--cw-ink-muted)' }}>{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-xl" style={{ background: 'var(--cw-surface)', border: '1px solid var(--cw-border)' }}>
            <h4 className="text-lg font-bold mb-4" style={{ color: 'var(--cw-primary)' }}>Pro Tips</h4>
            <div className="space-y-3">
              {[
                'Start with Context to anchor the AI in your domain',
                'Use specific roles: "senior UW" beats "insurance person"',
                'Action verbs in Instructions: Analyze, Compare, Draft, Identify',
                'Include real numbers in Specifics (generalized for PII safety)',
                'Always specify format in Preferences: bullets, table, email',
                'Iterate: refine your prompt if the first result isn\'t right',
              ].map((tip, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: 'var(--cw-success)' }} />
                  <span className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </CardGrid>
      </section>

      {/* Prompt Tips */}
      <section className="mb-16">
        <Callout variant="sage">
          <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
            <strong>Remember:</strong> These prompts are starting points. Customize them with your
            specific situation details. The more relevant context you provide (while protecting PII),
            the better the AI output will be. Visit the{' '}
            <Link href="/prompt-engineering" className="text-highlight underline">Prompt Engineering</Link>{' '}
            page for the full CRISP framework and PII safety guidelines.
          </p>
        </Callout>
      </section>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8 mt-8" style={{ borderTop: '1px solid var(--cw-border)' }}>
        <Link
          href="/agentic-ai/skills"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all pill-btn"
        >
          <ArrowLeft size={16} /> AI Skills
        </Link>
        <Link
          href="/resources"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:gap-3"
          style={{ background: 'var(--cw-primary)', color: '#fff' }}
        >
          Next: Resources <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

'use client';

import { type ReactNode } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Bot, Scale, Truck, FileSpreadsheet, MapPin, Sparkles } from 'lucide-react';
import { Card, CardGrid } from '@/components/content/Card';
import { Callout } from '@/components/content/Callout';
import { CodeBlock } from '@/components/content/CodeBlock';
import { TierBadge } from '@/components/content/TierBadge';

// The lever that matters most for each department, called out above its prompts.
function StyleNote({ children }: { children: ReactNode }) {
  return (
    <div
      className="flex items-start gap-3 p-4 rounded-xl mb-8"
      style={{ background: 'var(--cw-primary-light)', border: '1px solid rgba(107,45,139,0.18)' }}
    >
      <Sparkles size={16} style={{ color: 'var(--cw-primary)', marginTop: 3 }} className="flex-shrink-0" />
      <p className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>{children}</p>
    </div>
  );
}

// What the prompts on this page used to do, and what replaced it.
const PROMPT_SHIFT = [
  {
    retire: '"Act as a senior underwriter with 15 years of experience"',
    instead: 'State the facts and the decision you need',
    why: 'The facts already tell Claude it is doing trucking underwriting. Role-play existed to pull domain register out of weaker models; it now mostly adds words.',
  },
  {
    retire: 'A numbered output template — "1. Top 5 risks 2. Red flags 3. Gaps…"',
    instead: 'Name the decision and the standard to hit',
    why: 'A fixed template caps the answer at the shape you already imagined. Describe the job and Claude picks a better structure than you specified.',
  },
  {
    retire: '"Do NOT include X. Never mention Y. Avoid Z."',
    instead: 'One sentence describing the standard',
    why: 'Stacked prohibitions compete with the model’s own judgment. "Keep the reasoning at the pattern level" does more work than three don’ts.',
  },
  {
    retire: 'Pasting a hand-typed summary of a document',
    instead: 'Attach the actual file',
    why: 'A real loss run, ACORD, or report beats your summary of it — and Claude reads the parts you would have skipped.',
  },
  {
    retire: 'Retyping who you are at the top of every chat',
    instead: 'Put standing context in a Project',
    why: 'Your role, your book, and your standards should load automatically, not cost you a paragraph in every conversation.',
  },
];

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
      <p className="mb-12 text-xl" style={{ color: 'var(--cw-ink-secondary)' }}>
        Real-world AI applications organized by department &mdash; written in the prompt style the
        newest Claude models actually reward. Adapt them for your daily work at Cover Whale.
      </p>

      {/* Overview */}
      <section className="mb-16" id="overview" data-tier="expert">
        <div className="section-label">Overview</div>
        <h2 className="mb-4">
          These prompts were rewritten for <span className="text-highlight">Claude 5</span>
        </h2>
        <p className="mb-6">
          Every prompt on this page used to open with a role-play preamble and close with a numbered
          output template. Both were scaffolding &mdash; useful when models needed to be told how to
          behave, and now mostly in the way. When Anthropic tuned Claude Code for the Claude 5
          generation they cut <strong>over 80% of its system prompt</strong> with no measurable loss
          on their evaluations. The same over-specification that used to help is now its own failure
          mode.
        </p>
        <p className="mb-8">
          Nothing here asks you to give Claude <em>less information</em>. It asks you to give it
          fewer <em>instructions</em> &mdash; the facts, the decision you need, and the standard you
          hold the answer to. The full principle is on the{' '}
          <Link href="/context-engineering#claude5" className="text-highlight" style={{ textDecoration: 'underline' }}>Context Engineering</Link>{' '}
          page; this is what it looks like in a Claude chat or a Cowork session.
        </p>

        <div className="overflow-x-auto rounded-xl mb-8" style={{ border: '1px solid var(--cw-border)' }}>
          <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--cw-surface)' }}>
                <th className="text-left p-4 font-semibold" style={{ color: 'var(--cw-ink-muted)', width: '28%' }}>Retire this</th>
                <th className="text-left p-4 font-semibold" style={{ color: 'var(--cw-primary)', width: '26%' }}>Do this instead</th>
                <th className="text-left p-4 font-semibold" style={{ color: 'var(--cw-ink-muted)' }}>Why</th>
              </tr>
            </thead>
            <tbody>
              {PROMPT_SHIFT.map((row, i) => (
                <tr key={row.instead} style={{ borderTop: '1px solid var(--cw-border)', background: i % 2 ? 'rgba(255,255,255,0.25)' : 'transparent' }}>
                  <td className="p-4 align-top" style={{ color: 'var(--cw-ink-muted)' }}>{row.retire}</td>
                  <td className="p-4 font-semibold align-top" style={{ color: 'var(--cw-ink-secondary)' }}>{row.instead}</td>
                  <td className="p-4 align-top" style={{ color: 'var(--cw-ink-muted)' }}>{row.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Callout variant="sage">
          <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
            <strong>CRISP still applies &mdash; the weight moved.</strong> Context and Specifics are
            doing the real work in every prompt below, and they got <em>longer</em>, not shorter:
            grounding an answer in your actual numbers is still the single biggest defense against a
            confident wrong answer. What got trimmed is Role and the prescriptive half of
            Preferences. Keep telling Claude the facts. Stop telling it how to think.
          </p>
        </Callout>
      </section>

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

        <StyleNote>
          <strong>The lever here: attach the artifact, and ask for a call.</strong> Underwriting
          prompts get the biggest lift from dropping the real ACORD, loss run, or SAFER printout into
          the chat instead of retyping a summary of it &mdash; Claude reads the rows you would have
          skimmed past. Then ask for the decision you actually have to make, not a survey of
          considerations.
        </StyleNote>

        <div className="space-y-6">
          <Card number="UW-01">
            <h3 className="mb-2">Submission Analysis</h3>
            <p className="text-base mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
              Quickly extract key risk factors and flag potential concerns from new business submissions.
            </p>
            <CodeBlock
              title="Submission Triage Prompt"
              code={`New-business fleet submission, Southeast US. I need to decide
whether to pursue it. Submission attached — the summary below is
the fallback if you can't read the file.

- 35 power units, mix of owned and leased
- Regional refrigerated freight, 500-mile radius
- 42 drivers, including owner-operators
- 7 years in business
- 6 claims in 36 months (3 cargo, 2 AL, 1 PD)
- Incumbent carrier non-renewing on loss ratio
- ELD compliant, no dash cams

Give me your read: pursue, decline, or conditional — and what
would change your answer. Lead with the call, then the reasoning
behind it. Tell me what I'd need from the broker before I could
put a price on this.

Flag anything you're inferring rather than reading straight off
the submission.`}
            />
          </Card>

          <Card number="UW-02">
            <h3 className="mb-2">Coverage Comparison</h3>
            <p className="text-base mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
              Compare coverage options and identify gaps for complex accounts.
            </p>
            <CodeBlock
              title="Coverage Gap Analysis"
              code={`A 25-unit fleet on auto liability, physical damage, and motor
truck cargo is expanding into hazmat — fuel tankers.

What breaks? I want the gaps and endorsements this expansion
creates, including pollution exposure, MCS-90, whether their
cargo limit still holds up for hazmat loads, state-specific fuel
transport requirements, and where excess should sit.

Separate what's legally mandatory from what you'd recommend —
that distinction is the whole point of the exercise for me. If a
requirement depends on which states they actually run, say so
instead of picking one.`}
            />
          </Card>

          <Card number="UW-03">
            <h3 className="mb-2">Loss Run Analysis</h3>
            <p className="text-base mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
              Extract patterns and trends from loss history to inform pricing and risk selection.
            </p>
            <CodeBlock
              title="Loss Run Review"
              code={`Renewal review, 50-unit long-haul dry van fleet running 30+
states. Three years of loss runs attached.

(No file handy? Paste the summary instead:
 Yr1  8 claims / $420K incurred (3 open)
 Yr2  5 claims / $180K incurred (1 open)
 Yr3  3 claims / $95K incurred (0 open)
 Largest single loss: $210K AL rear-end, Yr1
 Most frequent: cargo, 6 of 16
 Driver turnover: 85% -> 45% across the period)

Tell me whether this risk is improving or deteriorating, and what
loss pick you'd support at renewal. I care more about why the
trend is moving than a restatement of the numbers back to me.

If the open claims could still develop far enough to change your
answer, say what they'd have to do.`}
            />
          </Card>

          <Card number="UW-04">
            <h3 className="mb-2">Risk Factor Deep Dive</h3>
            <p className="text-base mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
              Investigate specific risk characteristics for better-informed decisions.
            </p>
            <div className="p-4 rounded-lg mb-3" style={{ background: 'rgba(217,85,80,0.06)', border: '1px solid rgba(217,85,80,0.15)' }}>
              <div className="text-[11px] font-semibold uppercase mb-2" style={{ color: 'var(--cw-warning)' }}>Too vague &mdash; no facts to stand on</div>
              &ldquo;Tell me about the risks of this trucking account&rdquo;
            </div>
            <div className="p-4 rounded-lg mb-3" style={{ background: 'var(--cw-surface)', border: '1px solid var(--cw-border)' }}>
              <div className="text-[11px] font-semibold uppercase mb-2" style={{ color: 'var(--cw-ink-muted)' }}>Over-specified &mdash; what we used to teach</div>
              <span style={{ color: 'var(--cw-ink-muted)' }}>&ldquo;A fleet with 40% owner-operators is applying for auto liability coverage. Analyze the specific risks associated with a high owner-operator ratio, including: control over driver selection, maintenance standards variability, higher turnover impact on loss frequency, and any underwriting considerations for independent contractor vs. employee driver models. Provide your analysis as a risk matrix with likelihood and impact ratings.&rdquo;</span>
              <p className="text-xs mt-3" style={{ color: 'var(--cw-ink-muted)' }}>
                The facts are good. But the enumerated sub-topics cap the answer at the four things
                you already thought of, and the mandated risk matrix forces a shape that may not fit
                the finding.
              </p>
            </div>
            <div className="p-4 rounded-lg" style={{ background: 'rgba(58,158,110,0.06)', border: '1px solid rgba(58,158,110,0.15)' }}>
              <div className="text-[11px] font-semibold uppercase mb-2" style={{ color: 'var(--cw-success)' }}>Claude 5 style &mdash; same facts, room to think</div>
              &ldquo;A fleet applying for auto liability runs 40% owner-operators. Walk me through how that ratio actually changes the risk versus an all-company-driver fleet, and tell me where you'd land on it. If your answer depends on how they contract and supervise the O/Os, tell me what to go ask.&rdquo;
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

        <StyleNote>
          <strong>The lever here: describe the standard, not the rules.</strong> Correspondence
          prompts used to carry a stack of tone rules and &ldquo;do NOT&rdquo; lines. One sentence
          about what good looks like &mdash; <em>&ldquo;the way an underwriter writes to a broker
          they want to keep&rdquo;</em> &mdash; outperforms five constraints, because the
          constraints only ever fence off the bad without describing the good.
        </StyleNote>

        <div className="space-y-6">
          <Card number="BC-01">
            <h3 className="mb-2">Quote Follow-Up Email</h3>
            <p className="text-base mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
              Professional follow-ups that maintain broker relationships.
            </p>
            <CodeBlock
              title="Quote Follow-Up Prompt"
              code={`I quoted a regional fleet account 5 business days ago.
Competitive number, but it carried subjectivities on driver MVRs
and a fleet inspection. Nothing back yet.

Draft the follow-up email. Surface the open subjectivities
without it reading as chasing, offer a call, and note the quote
holds for 30 days.

Write it the way a good underwriter actually writes to a broker
they want to keep — warm, short, no filler. Subject line included.`}
            />
          </Card>

          <Card number="BC-02">
            <h3 className="mb-2">Declination Letter</h3>
            <p className="text-base mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
              Respectful, clear declinations that preserve the broker relationship.
            </p>
            <CodeBlock
              title="Declination Letter Prompt"
              code={`I'm declining a long-haul fleet: loss ratio above 90% three
years running, and driver turnover north of 95%. I want this
broker's next submission, so the relationship matters more to me
than the letter does.

Draft the declination. Be unambiguous that it's a no, keep the
reasoning at the level of the pattern rather than specific
figures, and tell them what would make this workable next time.

Firm, respectful, brief. Business letter format.`}
            />
          </Card>

          <Card number="BC-03">
            <h3 className="mb-2">Information Request</h3>
            <p className="text-base mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
              Clear, organized requests for missing submission information.
            </p>
            <CodeBlock
              title="Info Request Prompt"
              code={`Incomplete submission on a 20-truck fleet. Still missing:

- 3-year loss runs (only 1 year came through)
- Driver roster with MVR dates
- Vehicle schedule with VIN and year/make/model
- DOT safety rating or ISS score
- Radius of operations confirmation
- Current MCS-90 / BMC-91 filings

Draft the email asking for these. Make it easy to action — the
broker should be able to work straight down it and tick items
off. I need it inside 5 business days to hold the quote.`}
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

        <StyleNote>
          <strong>The lever here: hand over the mess, and say why it matters.</strong> Don&apos;t
          tidy your intake notes before pasting them &mdash; the disorder is signal, and
          pre-structuring the input pre-decides the output. Then tell Claude what you&apos;re
          worried about and why. &ldquo;Rear-end plus construction zone plus soft-tissue is a
          combination I want you thinking hard about&rdquo; gets you a sharper read than any
          checklist of sections would.
        </StyleNote>

        <div className="space-y-6">
          <Card number="CL-01">
            <h3 className="mb-2">FNOL Processing Assistance</h3>
            <p className="text-base mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
              Structure first notice of loss information and identify immediate action items.
            </p>
            <CodeBlock
              title="FNOL Structuring Prompt"
              code={`FNOL call just came in on a trucking accident. My raw notes,
unedited:

- Interstate, Southern state, construction zone
- Our tractor-trailer rear-ended a passenger vehicle
- Other driver reporting neck and back pain
- Company driver, passed the post-accident drug screen
- Moderate front-end damage to our tractor, significant rear
  damage to the other vehicle
- Police report filed, number still pending
- Date generalized for privacy

Turn this into a clean FNOL record, then tell me what I should be
doing in the next 24 hours and what I still don't know.

Rear-end plus a construction zone plus soft-tissue complaints is
a combination I want you thinking hard about — say plainly if you
see litigation or reserve-development risk building here, and how
confident you are.`}
            />
          </Card>

          <Card number="CL-02">
            <h3 className="mb-2">Investigation Checklist</h3>
            <p className="text-base mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
              Generate comprehensive investigation plans for complex claims.
            </p>
            <CodeBlock
              title="Investigation Plan Prompt"
              code={`Single-vehicle rollover, loaded tanker, rural highway. Driver
says a tire blowout caused it. Product spilled, so there's
environmental cleanup exposure on top of the physical damage.

Build me the investigation plan. Order it by what genuinely has
to happen first — evidence that disappears, notifications with
clocks on them — rather than by category.

Cover the driver, maintenance and tire history, road conditions,
cargo securement, and the pollution exposure. Where you see
subrogation potential or a coverage question, flag it rather than
assuming it resolves my way. I want to know why each step is on
the list, not just that it is.`}
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

        <StyleNote>
          <strong>The lever here: a Project, and asking for the decision.</strong> If you run the
          same kind of task weekly, your role, your book, and your standards belong in a Claude
          Project or a Cowork workspace &mdash; loaded once, not retyped every session. Then ask for
          the judgment rather than the artifact: <em>&ldquo;what should change what we do&rdquo;</em>{' '}
          beats <em>&ldquo;summarize this.&rdquo;</em>
        </StyleNote>

        <div className="space-y-6">
          <Card number="GP-01">
            <h3 className="mb-2">Document Summarization</h3>
            <p className="text-base mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
              Distill long documents into actionable summaries.
            </p>
            <CodeBlock
              title="Document Summary Prompt"
              code={`Attached is an industry report on commercial auto market
trends. I'm presenting to leadership Thursday.

Read it and tell me what actually matters for a trucking MGA —
rate trends, loss cost drivers, regulatory movement, tech
adoption. I don't need a faithful summary of the document; I need
the parts that should change what we do.

Open with the one thing I should lead the meeting with. Keep it
tight enough to read on the way in.

Be explicit about which claims are the report's and which are
your read of them — I'll get challenged on the difference.`}
            />
          </Card>

          <Card number="GP-02">
            <h3 className="mb-2">Data Analysis Assistance</h3>
            <p className="text-base mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
              Get help interpreting data sets and identifying trends.
            </p>
            <CodeBlock
              title="Data Analysis Prompt"
              code={`Quarterly production for our trucking book, headed into a board
report:

Q1   450 quotes   180 binds (40.0%)   $2.1M
Q2   520 quotes   195 binds (37.5%)   $2.4M
Q3   480 quotes   168 binds (35.0%)   $2.0M
Q4   600 quotes   240 binds (40.0%)   $3.1M

What's the story here, and what would you want to check before I
put it in front of a board?

Give me your best read on why the hit ratio sagged mid-year and
recovered — and label it as a hypothesis, because you can't see
the underlying mix and I don't want a guess presented as a
finding.`}
            />
          </Card>

          <Card number="GP-03">
            <h3 className="mb-2">Meeting Preparation</h3>
            <p className="text-base mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
              Prepare agendas, talking points, and pre-read materials.
            </p>
            <CodeBlock
              title="Meeting Prep Prompt"
              code={`Quarterly business review with a broker partner doing $5M+ a
year with us. One hour. Where things stand:

- Their production is up 15% YoY
- We've taken service complaints on quote turnaround time
- We're launching a telematics discount program
- Their loss ratio on our book is 52%

Help me run this well. I need an agenda that genuinely fits the
hour, and I need to walk in ready for the turnaround-time
conversation rather than surprised by it.

Tell me what you'd lead with, what you'd hold until late, and
what you'd bring that they didn't ask for.`}
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
          CRISP is still the backbone &mdash; but on the Claude 5 models the weight sits differently.
          <strong> Context and Specifics carry the prompt.</strong> Role is usually redundant once
          the facts are there, and Preferences works better as one line about the standard than as an
          output template. See the{' '}
          <Link href="#overview" className="text-highlight" style={{ textDecoration: 'underline' }}>Overview</Link>{' '}
          for the before and after.
        </p>

        <CardGrid columns={2}>
          <div className="p-6 rounded-xl" style={{ background: 'var(--cw-surface)', border: '1px solid var(--cw-border)' }}>
            <h4 className="text-lg font-bold mb-4" style={{ color: 'var(--cw-primary)' }}>CRISP Breakdown</h4>
            <div className="space-y-3">
              {[
                { letter: 'C', word: 'Context', desc: 'Background, situation, domain — carries the prompt' },
                { letter: 'R', word: 'Role', desc: 'Usually skippable now; the facts imply it' },
                { letter: 'I', word: 'Instruction', desc: 'The decision you need (use action verbs)' },
                { letter: 'S', word: 'Specifics', desc: 'Your real data — the highest-value part' },
                { letter: 'P', word: 'Preferences', desc: 'The standard to hit, not an output template' },
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
                'Attach the real document instead of describing what it says',
                'Action verbs in Instructions: Analyze, Compare, Draft, Identify',
                'Include real numbers in Specifics (generalized for PII safety)',
                'Ask for the decision you owe someone, not a survey of options',
                'Say what good looks like once — beats a stack of "do NOT" rules',
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
            specific situation details. More relevant <em>context</em> makes the output better &mdash;
            more <em>instruction</em> usually doesn&apos;t, so add facts freely and rules sparingly
            (while protecting PII). Visit the{' '}
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

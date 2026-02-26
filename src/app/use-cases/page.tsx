'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Card, CardGrid } from '@/components/content/Card';
import { Callout } from '@/components/content/Callout';
import { CodeBlock } from '@/components/content/CodeBlock';
import { TierBadge } from '@/components/content/TierBadge';

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

'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Card, CardGrid } from '@/components/content/Card';
import { Callout } from '@/components/content/Callout';
import { CodeBlock } from '@/components/content/CodeBlock';
import { StepList } from '@/components/content/StepList';
import { TierBadge } from '@/components/content/TierBadge';

export default function SkillsPage() {
  return (
    <div>
      <TierBadge tier="beginner" />
      <h1 className="mt-4 mb-4">AI Skills</h1>
      <p className="mb-12">
        Skills are reusable sets of instructions that teach AI tools how to handle specific tasks
        consistently. Think of them as saved recipes &mdash; instead of explaining what you want every time,
        you create a skill once and reuse it forever.
      </p>

      {/* Section: What Are Skills */}
      <section className="mb-16" id="what-are-skills">
        <div className="section-label">The Concept</div>
        <h2 className="mb-4">
          What Are <span className="text-highlight">Skills</span>?
        </h2>
        <p className="mb-6" style={{ color: 'var(--cw-ink-secondary)' }}>
          Every time you ask AI to do something &mdash; draft an email, summarize a document, format
          data &mdash; you give it instructions. A skill packages those instructions into a reusable
          template so you get consistent, high-quality results without repeating yourself.
        </p>

        <CardGrid columns={3}>
          <Card number="1">
            <h3 className="mb-2">Without Skills</h3>
            <p className="text-sm" style={{ color: 'var(--cw-ink-muted)' }}>
              You re-explain your formatting preferences, tone, structure, and rules every single
              time. Results vary. You spend time fixing inconsistencies.
            </p>
          </Card>
          <Card number="2">
            <h3 className="mb-2">With Skills</h3>
            <p className="text-sm" style={{ color: 'var(--cw-ink-muted)' }}>
              You invoke a skill and provide only the new content. The AI already knows your
              preferences, format, and quality standards. Consistent results every time.
            </p>
          </Card>
          <Card number="3">
            <h3 className="mb-2">Shared Skills</h3>
            <p className="text-sm" style={{ color: 'var(--cw-ink-muted)' }}>
              Your whole team uses the same skill. Everyone produces work in the same format
              and style. Onboarding new team members becomes easier.
            </p>
          </Card>
        </CardGrid>

        <Callout variant="purple" className="mt-8">
          <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
            <span className="text-highlight">The key insight:</span> Skills turn one-off prompt
            engineering into a reusable asset. Instead of being good at asking AI the right way
            each time, you figure it out once and capture it as a skill.
          </p>
        </Callout>
      </section>

      {/* Section: Why Skills Matter */}
      <section className="mb-16" id="why-skills-matter">
        <div className="section-label">The Value</div>
        <h2 className="mb-4">
          Why Skills <span className="text-highlight">Matter</span>
        </h2>
        <p className="mb-6" style={{ color: 'var(--cw-ink-secondary)' }}>
          Skills solve the three biggest frustrations people have when working with AI tools:
          inconsistent output, wasted time re-explaining context, and results that don&apos;t
          match their standards.
        </p>

        <div className="space-y-4 mb-6">
          {[
            {
              benefit: 'Consistency',
              desc: 'The same skill produces the same quality and format every time. No more "sometimes great, sometimes useless" AI output.',
              color: '#3A9E6E',
            },
            {
              benefit: 'Speed',
              desc: 'Skip the 5 minutes of explaining what you want. Invoke a skill, provide your content, and get results in seconds.',
              color: '#4A6FA5',
            },
            {
              benefit: 'Quality',
              desc: 'Refine a skill over time as you discover edge cases. Each improvement benefits every future use automatically.',
              color: '#D97706',
            },
            {
              benefit: 'Shareability',
              desc: 'One person figures out the best prompt and packages it as a skill. The entire team benefits without learning prompt engineering.',
              color: '#6B2D8B',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-5 p-5 rounded-2xl transition-colors"
              style={{
                background: 'var(--cw-surface)',
                border: '1px solid var(--cw-border)',
                borderLeft: `4px solid ${item.color}`,
              }}
            >
              <div className="flex-shrink-0 w-28">
                <span
                  className="text-[10px] font-bold tracking-widest px-2 py-0.5 rounded-full"
                  style={{ background: `${item.color}15`, color: item.color }}
                >
                  {item.benefit.toUpperCase()}
                </span>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold mb-1" style={{ color: 'var(--cw-ink)' }}>{item.benefit}</h4>
                <p className="text-xs" style={{ color: 'var(--cw-ink-secondary)' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section: Everyday Use Cases */}
      <section className="mb-16" id="use-cases">
        <div className="section-label">Practical</div>
        <h2 className="mb-4">
          Everyday <span className="text-highlight">Use Cases</span>
        </h2>
        <p className="mb-6" style={{ color: 'var(--cw-ink-secondary)' }}>
          Skills are not just for developers. Anyone who uses AI tools regularly can benefit.
          Here are real-world examples organized by the type of work they support.
        </p>

        {/* Communication */}
        <Card className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <h3>Communication</h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(74,111,165,0.1)', color: 'var(--cw-info)' }}>EMAILS &amp; MESSAGES</span>
          </div>
          <CardGrid columns={2}>
            {[
              {
                name: 'Professional Email Formatter',
                problem: 'You draft quick notes but need them polished before sending.',
                skill: 'Takes your rough draft and reformats it with proper greeting, clear structure, professional tone, and a call to action. Matches your company\'s communication style.',
              },
              {
                name: 'Meeting Follow-Up Generator',
                problem: 'After meetings, you struggle to send timely follow-ups.',
                skill: 'Takes meeting notes or a quick summary and produces a structured follow-up email with action items, owners, deadlines, and next steps.',
              },
              {
                name: 'Difficult Conversation Drafter',
                problem: 'Sensitive emails take forever to get the tone right.',
                skill: 'Helps you draft messages that are direct but empathetic. Handles escalations, deadline reminders, and feedback delivery with appropriate tone.',
              },
              {
                name: 'Slack Status Update',
                problem: 'Weekly status updates feel repetitive and time-consuming.',
                skill: 'Takes bullet points of what you worked on and formats them into a consistent status update with highlights, blockers, and next week\'s priorities.',
              },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-lg" style={{ background: 'var(--cw-primary-light)' }}>
                <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--cw-ink)' }}>{item.name}</h4>
                <p className="text-xs mb-2" style={{ color: 'var(--cw-ink-muted)' }}>
                  <strong>Problem:</strong> {item.problem}
                </p>
                <p className="text-xs" style={{ color: 'var(--cw-ink-secondary)' }}>
                  <strong>Skill:</strong> {item.skill}
                </p>
              </div>
            ))}
          </CardGrid>
        </Card>

        {/* Documents & Presentations */}
        <Card className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <h3>Documents &amp; Presentations</h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(107,45,139,0.1)', color: 'var(--cw-primary)' }}>SLIDES &amp; REPORTS</span>
          </div>
          <CardGrid columns={2}>
            {[
              {
                name: 'Presentation Outline Builder',
                problem: 'Starting a PowerPoint from scratch is the hardest part.',
                skill: 'Takes your topic and audience, then generates a structured outline with slide titles, key talking points per slide, and suggested visuals. Gives you a blueprint you can build from.',
              },
              {
                name: 'Executive Summary Writer',
                problem: 'Long reports need a concise summary for leadership.',
                skill: 'Takes a detailed document and produces a one-page executive summary with key findings, recommendations, and impact. Adjusts formality based on audience.',
              },
              {
                name: 'Report Section Drafter',
                problem: 'Quarterly reports follow the same structure but take hours to write.',
                skill: 'Takes raw data and metrics, then fills in your report template with analysis, comparisons to prior periods, and narrative explanations of trends.',
              },
              {
                name: 'Document Reviewer',
                problem: 'Reviewing long documents for consistency and clarity is tedious.',
                skill: 'Scans a document for inconsistencies, jargon, unclear sections, and formatting issues. Returns a prioritized list of suggested improvements.',
              },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-lg" style={{ background: 'var(--cw-primary-light)' }}>
                <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--cw-ink)' }}>{item.name}</h4>
                <p className="text-xs mb-2" style={{ color: 'var(--cw-ink-muted)' }}>
                  <strong>Problem:</strong> {item.problem}
                </p>
                <p className="text-xs" style={{ color: 'var(--cw-ink-secondary)' }}>
                  <strong>Skill:</strong> {item.skill}
                </p>
              </div>
            ))}
          </CardGrid>
        </Card>

        {/* Data & Analysis */}
        <Card className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <h3>Data &amp; Analysis</h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(58,158,110,0.1)', color: 'var(--cw-success)' }}>NUMBERS &amp; INSIGHTS</span>
          </div>
          <CardGrid columns={2}>
            {[
              {
                name: 'Data Formatter',
                problem: 'Data from different sources comes in different formats.',
                skill: 'Takes messy data (CSV, pasted tables, unstructured text) and reformats it into a clean, consistent structure. Handles column reordering, date normalization, and missing value flags.',
              },
              {
                name: 'Trend Summarizer',
                problem: 'You have numbers but need to explain what they mean.',
                skill: 'Takes a dataset or metrics and produces a plain-English summary of trends, anomalies, and notable changes. Highlights what\'s worth paying attention to.',
              },
              {
                name: 'Comparison Table Builder',
                problem: 'Comparing options across multiple criteria is hard to organize.',
                skill: 'Takes two or more options and your evaluation criteria, then produces a structured comparison table with pros, cons, and a recommendation.',
              },
              {
                name: 'Survey Response Analyzer',
                problem: 'Free-text survey responses are hard to summarize at scale.',
                skill: 'Groups free-text responses into themes, identifies sentiment, and produces a summary with direct quotes as evidence for each finding.',
              },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-lg" style={{ background: 'var(--cw-primary-light)' }}>
                <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--cw-ink)' }}>{item.name}</h4>
                <p className="text-xs mb-2" style={{ color: 'var(--cw-ink-muted)' }}>
                  <strong>Problem:</strong> {item.problem}
                </p>
                <p className="text-xs" style={{ color: 'var(--cw-ink-secondary)' }}>
                  <strong>Skill:</strong> {item.skill}
                </p>
              </div>
            ))}
          </CardGrid>
        </Card>

        {/* Process & Workflow */}
        <Card className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <h3>Process &amp; Workflow</h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(217,85,80,0.1)', color: 'var(--cw-warning)' }}>AUTOMATE ROUTINES</span>
          </div>
          <CardGrid columns={2}>
            {[
              {
                name: 'Meeting Notes Organizer',
                problem: 'Raw meeting notes are messy and hard to share.',
                skill: 'Takes your rough notes (or a transcript) and produces structured minutes: attendees, decisions made, action items with owners, and open questions.',
              },
              {
                name: 'Checklist Generator',
                problem: 'Complex processes have steps that are easy to miss.',
                skill: 'Takes a process description and creates a detailed checklist with dependencies, common pitfalls, and verification steps. Useful for onboarding, reviews, or compliance.',
              },
              {
                name: 'SOW / Proposal Formatter',
                problem: 'Proposals follow a template but the formatting takes time.',
                skill: 'Takes your scope, timeline, and pricing details and formats them into your standard proposal structure with proper sections, terms, and professional language.',
              },
              {
                name: 'Jira Ticket Writer',
                problem: 'Writing clear, well-structured tickets is a skill in itself.',
                skill: 'Takes a brief description of work needed and produces a structured ticket with context, acceptance criteria, technical notes, and appropriate labels.',
              },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-lg" style={{ background: 'var(--cw-primary-light)' }}>
                <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--cw-ink)' }}>{item.name}</h4>
                <p className="text-xs mb-2" style={{ color: 'var(--cw-ink-muted)' }}>
                  <strong>Problem:</strong> {item.problem}
                </p>
                <p className="text-xs" style={{ color: 'var(--cw-ink-secondary)' }}>
                  <strong>Skill:</strong> {item.skill}
                </p>
              </div>
            ))}
          </CardGrid>
        </Card>
      </section>

      {/* Section: How Skills Fit In */}
      <section className="mb-16" id="bigger-picture">
        <div className="section-label">The Bigger Picture</div>
        <h2 className="mb-4">
          How Skills Fit <span className="text-highlight">Together</span>
        </h2>
        <p className="mb-6" style={{ color: 'var(--cw-ink-secondary)' }}>
          Skills do not work in isolation. In our framework, they are part of a chain that connects
          your request to the right expertise automatically.
        </p>

        {/* Execution Chain */}
        <div className="flex flex-col gap-3 max-w-3xl mb-8">
          {[
            {
              stage: 'YOU TYPE',
              title: 'A Command',
              desc: 'You invoke a simple slash command like /implement or /review-code. No need to know which skill or agent will handle it.',
              color: '#D97706',
              example: '/implement',
            },
            {
              stage: 'ROUTES TO',
              title: 'An Agent',
              desc: 'The command activates a specialized agent that plans the approach, breaks the work into steps, and coordinates execution.',
              color: '#4A6FA5',
              example: 'implement-orchestrator',
            },
            {
              stage: 'DRAWS ON',
              title: 'Skills',
              desc: 'The agent loads the skills it needs — testing standards, code review rules, security checks — each one an expertise module with deep domain knowledge.',
              color: '#3A9E6E',
              example: 'test-tdd, code-review, security-review',
            },
          ].map((item, i) => (
            <div key={i}>
              <div
                className="flex items-center gap-5 p-5 rounded-2xl transition-colors"
                style={{
                  background: 'var(--cw-surface)',
                  border: '1px solid var(--cw-border)',
                  borderLeft: `4px solid ${item.color}`,
                }}
              >
                <div className="flex flex-col items-center gap-1 flex-shrink-0 w-20">
                  <span
                    className="text-[10px] font-bold tracking-widest px-2 py-0.5 rounded-full"
                    style={{ background: `${item.color}15`, color: item.color }}
                  >
                    {item.stage}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold mb-1" style={{ color: 'var(--cw-ink)' }}>{item.title}</h4>
                  <p className="text-xs mb-1.5" style={{ color: 'var(--cw-ink-secondary)' }}>{item.desc}</p>
                  <code className="text-[11px] px-2 py-0.5 rounded" style={{ background: 'var(--cw-primary-light)', color: 'var(--cw-primary)' }}>{item.example}</code>
                </div>
              </div>
              {i < 2 && (
                <div className="flex justify-center">
                  <div className="w-px h-3" style={{ background: 'var(--cw-border)' }} />
                </div>
              )}
            </div>
          ))}
        </div>

        <Card className="mb-6">
          <h4 className="mb-3">AI Models and When They&apos;re Used</h4>
          <p className="text-sm mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
            Different skills use different AI models depending on the task. The framework handles
            this automatically &mdash; you do not need to choose.
          </p>
          <CardGrid columns={3}>
            {[
              {
                model: 'Haiku',
                speed: 'Fastest',
                use: 'Quick lookups, file searches, simple formatting tasks',
                color: '#3A9E6E',
              },
              {
                model: 'Sonnet',
                speed: 'Balanced',
                use: 'Code generation, analysis, most day-to-day work',
                color: '#4A6FA5',
              },
              {
                model: 'Opus',
                speed: 'Deepest',
                use: 'Complex reasoning, architectural decisions, specification writing',
                color: '#6B2D8B',
              },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-lg" style={{ background: 'var(--cw-primary-light)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold text-white" style={{ background: item.color }}>
                    {item.model[0]}
                  </div>
                  <h4 className="text-sm font-semibold">{item.model}</h4>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full ml-auto" style={{ background: `${item.color}15`, color: item.color }}>{item.speed.toUpperCase()}</span>
                </div>
                <p className="text-xs" style={{ color: 'var(--cw-ink-muted)' }}>{item.use}</p>
              </div>
            ))}
          </CardGrid>
        </Card>

        <Callout variant="sage">
          <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
            <strong>You do not need to memorize this.</strong> The framework routes your request to the
            right model and skill automatically. Understanding the chain just helps you see why skills
            are so powerful &mdash; they scale expertise across the entire organization.
          </p>
        </Callout>
      </section>

      {/* Section: Anatomy of a Skill */}
      <section className="mb-16" id="anatomy">
        <div className="section-label">How It Works</div>
        <h2 className="mb-4">
          Anatomy of a <span className="text-highlight">Skill</span>
        </h2>
        <p className="mb-6" style={{ color: 'var(--cw-ink-secondary)' }}>
          A skill is just a markdown file with clear instructions. You do not need to be technical
          to write one &mdash; if you can describe what you want, you can create a skill.
        </p>

        <CodeBlock
          title="Example: Professional Email Skill"
          code={`# Professional Email Formatter

## When to Use
When you have a rough draft or bullet points that need to
become a polished professional email.

## Instructions
1. Start with an appropriate greeting based on the recipient
2. Organize the content into clear paragraphs:
   - Opening: Context or purpose of the email
   - Body: Key information, one idea per paragraph
   - Close: Clear next steps or call to action
3. Use professional but warm tone (not robotic)
4. Keep sentences short and direct
5. End with an appropriate sign-off

## Rules
- Never use "Dear Sir/Madam" — use the recipient's name
- Avoid jargon unless the recipient is technical
- Maximum 3 paragraphs for routine emails
- Always include a specific call to action
- Match the formality level to the relationship`}
        />

        <Callout variant="sage" className="mt-6">
          <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
            <strong>Notice the pattern:</strong> A good skill has three parts &mdash; <em>when</em> to
            use it, <em>how</em> it works (step by step), and <em>rules</em> that prevent common
            mistakes. The clearer your instructions, the more consistent your results.
          </p>
        </Callout>
      </section>

      {/* Section: Building Your First Skill */}
      <section className="mb-16" id="getting-started">
        <div className="section-label">Start Here</div>
        <h2 className="mb-4">
          Building Your <span className="text-highlight">First Skill</span>
        </h2>
        <p className="mb-6" style={{ color: 'var(--cw-ink-secondary)' }}>
          The best first skill solves a task you already do repeatedly. Follow these steps to
          identify and build it.
        </p>

        <StepList
          steps={[
            {
              title: 'Pick your most repetitive AI task',
              description: 'What do you ask AI to do at least once a week? Email formatting, meeting summaries, data cleanup — choose the one that wastes the most time.',
            },
            {
              title: 'Write it as if explaining to a new coworker',
              description: 'Describe exactly how you want the output to look. Include formatting rules, tone preferences, and what to avoid. Be specific — "professional tone" is vague, "direct but warm, no jargon" is useful.',
            },
            {
              title: 'Test it with real examples',
              description: 'Run the skill against 3-5 real inputs from your past work. Compare the output to what you would have produced manually. Note any gaps or inconsistencies.',
            },
            {
              title: 'Refine based on what went wrong',
              description: 'Add rules to handle the edge cases you discovered. If the AI missed something, add an explicit instruction. Skills get better with each iteration.',
            },
            {
              title: 'Share it with your team',
              description: 'Once your skill produces reliable results, share it. Have a teammate try it without context — if they get good output, the skill is ready.',
            },
          ]}
        />

        <Card className="mt-6">
          <h4 className="mb-3">Starter Skill Ideas by Role</h4>
          <div className="space-y-3">
            {[
              { role: 'Underwriting', idea: 'Risk summary formatter — takes submission data and produces a standardized risk assessment outline' },
              { role: 'Claims', idea: 'Claim narrative writer — takes adjuster notes and creates a structured claim summary for the file' },
              { role: 'Operations', idea: 'Process documentation — takes your notes about a workflow and produces step-by-step documentation' },
              { role: 'Sales / Brokers', idea: 'Quote follow-up drafter — takes quote details and produces a personalized follow-up email' },
              { role: 'Engineering', idea: 'PR description writer — takes a diff summary and produces a structured pull request description' },
              { role: 'Any Role', idea: 'Meeting notes organizer — takes raw notes and outputs decisions, action items, and open questions' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-lg" style={{ background: 'var(--cw-primary-light)' }}>
                <span className="font-bold text-xs flex-shrink-0 px-2 py-0.5 rounded-full" style={{ background: 'rgba(107,45,139,0.1)', color: 'var(--cw-primary)' }}>{item.role.toUpperCase()}</span>
                <p className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>{item.idea}</p>
              </div>
            ))}
          </div>
        </Card>

        <Callout variant="coral" className="mt-6">
          <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
            <strong>Ready to build?</strong> For the technical steps of creating a skill file in
            Claude Code, see the{' '}
            <Link href="/vibe-coding/tips#skills" className="font-semibold underline" style={{ color: 'var(--cw-primary)' }}>
              Creating Custom Skills
            </Link>{' '}
            section in Tips &amp; Tricks.
          </p>
        </Callout>
      </section>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8 mt-8" style={{ borderTop: '1px solid var(--cw-border)' }}>
        <Link
          href="/agentic-ai"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all pill-btn"
        >
          <ArrowLeft size={16} /> Agentic AI
        </Link>
        <Link
          href="/use-cases"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:gap-3"
          style={{ background: 'var(--cw-primary)', color: '#fff' }}
        >
          Next: Use Cases <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

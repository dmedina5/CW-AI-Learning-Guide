'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { Card, CardGrid } from '@/components/content/Card';
import { Callout } from '@/components/content/Callout';
import { CodeBlock } from '@/components/content/CodeBlock';
import { TierBadge } from '@/components/content/TierBadge';

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
      style={{ background: 'var(--cw-primary)', color: '#fff' }}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
      {copied ? 'Copied!' : 'Copy Reality Filter'}
    </button>
  );
}

export default function PromptEngineeringPage() {
  return (
    <div>
      <TierBadge tier="beginner" />
      <h1 className="mt-4 mb-4">Prompt Engineering</h1>
      <p className="mb-12">Getting the most from AI tools while protecting sensitive information.</p>

      {/* Basics Section */}
      <section className="mb-16" data-tier="beginner">
        <div className="section-label">The Basics</div>
        <h2 className="mb-6">What is Prompt Engineering?</h2>
        <p className="mb-8">
          Prompt engineering is the skill of crafting clear, effective instructions for AI tools.
          Think of it like giving directions to a very capable but literal assistant &mdash; the
          better your instructions, the better the results.
        </p>

        <div className="space-y-6">
          <Card number="01">
            <h3 className="mb-2">Be Specific, Not Vague</h3>
            <p className="text-base mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
              The clearer your request, the more accurate the output.
            </p>
            <div className="p-4 rounded-lg mb-3" style={{ background: 'rgba(217,85,80,0.06)', border: '1px solid rgba(217,85,80,0.15)' }}>
              <div className="text-[11px] font-semibold uppercase mb-2" style={{ color: 'var(--cw-warning)' }}>Vague</div>
              &ldquo;Tell me about trucking insurance&rdquo;
            </div>
            <div className="p-4 rounded-lg" style={{ background: 'rgba(58,158,110,0.06)', border: '1px solid rgba(58,158,110,0.15)' }}>
              <div className="text-[11px] font-semibold uppercase mb-2" style={{ color: 'var(--cw-success)' }}>Specific</div>
              &ldquo;Explain the key differences between Motor Truck Cargo insurance and Truckers General Liability for a long-haul refrigerated freight operation in Texas.&rdquo;
            </div>
          </Card>

          <Card number="02">
            <h3 className="mb-2">Define the Role</h3>
            <p className="text-base mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
              Tell the AI who it should act as &mdash; this shapes tone, expertise, and perspective.
            </p>
            <div className="p-4 rounded-lg font-mono text-sm" style={{ background: 'var(--cw-primary-light)' }}>
              &ldquo;Act as a [ROLE] with expertise in [DOMAIN]...&rdquo;
            </div>
          </Card>

          <Card number="03">
            <h3 className="mb-2">Provide Context First</h3>
            <p className="text-base mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
              Structure your prompt logically: background → rules/constraints → actual task.
            </p>
          </Card>

          <Card number="04">
            <h3 className="mb-2">State Your Desired Output Format</h3>
            <p className="text-base mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
              Tell the AI exactly how you want the answer &mdash; bullets, tables, paragraphs, or structured sections.
            </p>
            <CardGrid columns={2}>
              <div className="p-4 rounded-lg" style={{ background: 'var(--cw-primary-light)' }}>
                <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--cw-primary-dark)' }}>Format Options</h4>
                <p className="text-xs" style={{ color: 'var(--cw-ink-muted)' }}>Bullet points, numbered lists, tables, step-by-step, summary + details, pros/cons</p>
              </div>
              <div className="p-4 rounded-lg" style={{ background: 'var(--cw-primary-light)' }}>
                <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--cw-primary-dark)' }}>Length Controls</h4>
                <p className="text-xs" style={{ color: 'var(--cw-ink-muted)' }}>&ldquo;Keep it under 200 words&rdquo; or &ldquo;Provide a comprehensive analysis&rdquo;</p>
              </div>
            </CardGrid>
          </Card>

          <Card number="05">
            <h3 className="mb-2">Set Boundaries &amp; Constraints</h3>
            <p className="text-base mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
              Tell the AI what to avoid &mdash; this keeps responses focused.
            </p>
            <div className="p-4 rounded-lg font-mono text-sm" style={{ background: 'var(--cw-primary-light)' }}>
              &ldquo;Do NOT include [X]. Avoid [Y]. Focus only on [Z].&rdquo;
            </div>
          </Card>
        </div>
      </section>

      {/* CRISP Framework */}
      <section className="mb-16" id="crisp" data-tier="intermediate">
        <TierBadge tier="intermediate" />
        <div className="section-label mt-4">Framework</div>
        <h2 className="mb-4">The CRISP Framework</h2>
        <p className="mb-6">Use this simple framework to structure any prompt for maximum effectiveness:</p>

        <div className="p-6 rounded-xl text-center text-lg font-mono mb-8" style={{ background: 'var(--cw-primary-light)' }}>
          <strong>C</strong>ontext → <strong>R</strong>ole → <strong>I</strong>nstruction → <strong>S</strong>pecifics → <strong>P</strong>references
        </div>

        <div className="space-y-4">
          {[
            { letter: 'C', title: 'Context', desc: 'Background information that helps the AI understand the situation.', example: 'We\'re a trucking insurance MGA that specializes in long-haul operations. Our target market is fleets with 5-50 power units operating primarily in the continental US.' },
            { letter: 'R', title: 'Role', desc: 'Who should the AI be? This shapes expertise and tone.', example: 'Act as a senior commercial auto underwriter with 15 years of experience in trucking risks.' },
            { letter: 'I', title: 'Instruction', desc: 'The specific task you want completed. Use action verbs.', example: 'Identify the key risk factors I should investigate further before quoting this account.' },
            { letter: 'S', title: 'Specifics', desc: 'Details, data, constraints, and requirements.', example: 'Focus on these factors: driver experience levels, radius of operation, cargo types, and safety technology adoption. Limit analysis to the top 5 most impactful items.' },
            { letter: 'P', title: 'Preferences', desc: 'Output format, tone, length, and style preferences.', example: 'Present your findings in a bulleted list with brief explanations. Keep the tone professional but accessible. Aim for 300-400 words total.' },
          ].map(item => (
            <Card key={item.letter}>
              <div className="flex items-start gap-4">
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                  style={{ background: 'var(--cw-primary)' }}
                >
                  {item.letter}
                </span>
                <div>
                  <h3 className="mb-2">{item.title}</h3>
                  <p className="text-base mb-3" style={{ color: 'var(--cw-ink-secondary)' }}>{item.desc}</p>
                  <div className="p-4 rounded-lg" style={{ background: 'rgba(58,158,110,0.06)', border: '1px solid rgba(58,158,110,0.15)' }}>
                    <div className="text-[11px] font-semibold uppercase mb-2" style={{ color: 'var(--cw-success)' }}>Example</div>
                    <span className="text-sm">&ldquo;{item.example}&rdquo;</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <CodeBlock
          title="Complete CRISP Example"
          code={`CONTEXT: I'm an underwriter reviewing a new business submission
for a 25-truck fleet that operates refrigerated goods across
the Southeast region.

ROLE: Act as a senior trucking insurance underwriter.

INSTRUCTION: Identify the key risk factors I should investigate
further before quoting this account.

SPECIFICS: The fleet has been in operation for 3 years, has a
mix of owner-operators and company drivers, and reported
4 claims in the past 24 months (2 cargo, 1 physical damage,
1 auto liability).

PREFERENCES: Provide a prioritized list of 5-7 items with
a brief explanation of why each matters. Use bullet points.`}
        />
      </section>

      {/* Techniques */}
      <section className="mb-16" id="techniques" data-tier="intermediate">
        <div className="section-label">Techniques</div>
        <h2 className="mb-6">Advanced Prompting Techniques</h2>

        <div className="space-y-6">
          <Card>
            <div className="flex items-center gap-3 mb-3">
              <h3>Zero-Shot vs. Few-Shot Prompting</h3>
              <TierBadge tier="beginner" size="sm" />
            </div>
            <p className="text-base mb-2" style={{ color: 'var(--cw-ink-secondary)' }}>
              <strong>Zero-shot:</strong> Ask directly without examples &mdash; relies on the AI&apos;s training.
            </p>
            <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
              <strong>Few-shot:</strong> Provide examples to guide the response format and quality.
            </p>
          </Card>

          <Card>
            <div className="flex items-center gap-3 mb-3">
              <h3>Chain-of-Thought (Step-by-Step)</h3>
              <TierBadge tier="intermediate" size="sm" />
            </div>
            <p className="text-base mb-3" style={{ color: 'var(--cw-ink-secondary)' }}>
              Ask the AI to think through problems step-by-step for better reasoning.
            </p>
            <div className="p-4 rounded-lg font-mono text-sm" style={{ background: 'var(--cw-primary-light)' }}>
              &ldquo;Think through this step-by-step...&rdquo; or &ldquo;Walk me through your reasoning...&rdquo;
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3 mb-3">
              <h3>Dual-Pass / Self-Check</h3>
              <TierBadge tier="intermediate" size="sm" />
            </div>
            <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
              Have the AI draft first, then refine against criteria. Great for important documents.
            </p>
          </Card>

          <Card>
            <div className="flex items-center gap-3 mb-3">
              <h3>Prompt Chaining</h3>
              <TierBadge tier="expert" size="sm" />
            </div>
            <p className="text-base mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
              Break complex tasks into a series of connected prompts.
            </p>
            <CardGrid columns={4}>
              {['List all risk factors...', 'Prioritize by impact...', 'Suggest mitigation...', 'Draft broker response...'].map((step, i) => (
                <div key={i} className="p-3 rounded-lg" style={{ background: 'var(--cw-primary-light)' }}>
                  <h4 className="text-xs font-semibold mb-1" style={{ color: 'var(--cw-primary-dark)' }}>Step {i + 1}</h4>
                  <p className="text-xs" style={{ color: 'var(--cw-ink-muted)' }}>&ldquo;{step}&rdquo;</p>
                </div>
              ))}
            </CardGrid>
          </Card>
        </div>
      </section>

      {/* Reality Filter */}
      <section className="mb-16" id="reality-filter" data-tier="intermediate">
        <div className="section-label">Reliability</div>
        <h2 className="mb-4">The Reality Filter</h2>
        <p className="mb-6">
          A custom system prompt that makes AI responses more reliable, honest, and transparent.
        </p>

        <CardGrid columns={2} className="mb-8">
          <div className="p-4 rounded-lg" style={{ background: 'rgba(74,144,164,0.08)' }}>
            <h4 className="text-sm font-semibold mb-2">Score Confidence</h4>
            <p className="text-xs" style={{ color: 'var(--cw-ink-muted)' }}>Output confidence levels (0.0-1.0) on every response</p>
          </div>
          <div className="p-4 rounded-lg" style={{ background: 'rgba(74,144,164,0.08)' }}>
            <h4 className="text-sm font-semibold mb-2">Label Uncertainty</h4>
            <p className="text-xs" style={{ color: 'var(--cw-ink-muted)' }}>Clearly mark inferences, speculation, or unverified claims</p>
          </div>
          <div className="p-4 rounded-lg" style={{ background: 'rgba(74,144,164,0.08)' }}>
            <h4 className="text-sm font-semibold mb-2">Prevent Hallucination</h4>
            <p className="text-xs" style={{ color: 'var(--cw-ink-muted)' }}>Stop AI from presenting generated content as verified fact</p>
          </div>
          <div className="p-4 rounded-lg" style={{ background: 'rgba(74,144,164,0.08)' }}>
            <h4 className="text-sm font-semibold mb-2">Forward-Thinking</h4>
            <p className="text-xs" style={{ color: 'var(--cw-ink-muted)' }}>Get pros/cons analysis and suggestions for improving outputs</p>
          </div>
        </CardGrid>

        <CodeBlock
          title="Reality Filter Prompt"
          code={`REALITY FILTER DIRECTIVE

CONFIDENCE SCORING:
• Output your confidence score (0.0-1.0) on every response
• If confidence is below 0.85, explain what information would increase it
• For brainstorming prompts, list pros/cons with verification labels
• Take a forward-thinking view and flag speculation clearly

VERIFICATION REQUIREMENTS:
• Never present generated, inferred, speculated, or deduced content as fact
• If you cannot verify something directly, say:
  - "I cannot verify this."
  - "I do not have access to that information."
  - "My knowledge base does not contain that."

LABELING REQUIREMENTS:
• Label unverified content at the START of the sentence:
  [Inference] [Speculation] [Unverified] [Pattern-Based]
• If ANY part of a response is unverified, label it clearly

FLAGGED WORDS - Label these claims unless directly sourced:
Prevent, Guarantee, Will never, Fixes, Eliminates, Ensures that

CLARIFICATION:
• Ask for clarification if information is missing
• Do not guess or fill gaps with assumptions`}
        />
        <div className="mt-4">
          <CopyButton text={`REALITY FILTER DIRECTIVE\n\nCONFIDENCE SCORING:\n• Output your confidence score (0.0-1.0) on every response\n• If confidence is below 0.85, explain what information would increase it\n• For brainstorming prompts, list pros/cons with verification labels\n• Take a forward-thinking view and flag speculation clearly\n\nVERIFICATION REQUIREMENTS:\n• Never present generated, inferred, speculated, or deduced content as fact\n• If you cannot verify something directly, say:\n  - "I cannot verify this."\n  - "I do not have access to that information."\n  - "My knowledge base does not contain that."\n\nLABELING REQUIREMENTS:\n• Label unverified content at the START of the sentence:\n  [Inference] [Speculation] [Unverified] [Pattern-Based]\n• If ANY part of a response is unverified, label it clearly\n\nFLAGGED WORDS - Label these claims unless directly sourced:\nPrevent, Guarantee, Will never, Fixes, Eliminates, Ensures that\n\nCLARIFICATION:\n• Ask for clarification if information is missing\n• Do not guess or fill gaps with assumptions`} />
        </div>
      </section>

      {/* PII Safety */}
      <section className="mb-16" id="pii" data-tier="intermediate">
        <div className="section-label">Data Safety</div>
        <h2 className="mb-4">PII Safety</h2>

        <div
          className="rounded-xl p-6 mb-6 text-white"
          style={{ background: 'linear-gradient(135deg, #A85858, #8C4848)' }}
        >
          <h3 className="text-lg font-bold text-white mb-3">CRITICAL: Protecting Private Information</h3>
          <p className="text-sm text-white/90 mb-4">
            AI tools process data on external servers. Never input actual personally identifiable information (PII) or sensitive business data.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {['Real names', 'DOT numbers', 'SSN / EIN', 'Driver\'s licenses', 'Policy numbers', 'VIN numbers', 'Actual addresses', 'Phone numbers', 'Email addresses', 'Bank accounts', 'Claim numbers', 'MC numbers'].map(item => (
              <div key={item} className="px-3 py-2 rounded-md text-xs" style={{ background: 'rgba(255,255,255,0.15)' }}>
                ❌ {item}
              </div>
            ))}
          </div>
        </div>

        <Card>
          <h3 className="mb-4">The Generalization Technique</h3>
          <p className="text-base mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
            Convert specific data to categorical descriptions:
          </p>
          <div className="p-4 rounded-lg font-mono text-sm space-y-1" style={{ background: 'var(--cw-primary-light)' }}>
            <div>&ldquo;ABC Trucking&rdquo; → &ldquo;a regional carrier&rdquo;</div>
            <div>&ldquo;Chicago, IL&rdquo; → &ldquo;a major Midwest metro area&rdquo;</div>
            <div>&ldquo;47 trucks&rdquo; → &ldquo;a medium-sized fleet (40-60 units)&rdquo;</div>
            <div>&ldquo;$2.3M in claims&rdquo; → &ldquo;claims exceeding $2M&rdquo;</div>
            <div>&ldquo;John Smith&rdquo; → &ldquo;the primary driver&rdquo; or &ldquo;Driver A&rdquo;</div>
          </div>
        </Card>

        <Callout variant="warning" className="mt-6">
          <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
            <strong>When in doubt, leave it out.</strong> If you&apos;re unsure whether information
            is sensitive, err on the side of caution and use a generic description instead.
          </p>
        </Callout>
      </section>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8 mt-8" style={{ borderTop: '1px solid var(--cw-border)' }}>
        <Link
          href="/ai-basics"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all pill-btn"
        >
          <ArrowLeft size={16} /> AI Basics
        </Link>
        <Link
          href="/prompt-builder"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:gap-3"
          style={{ background: 'var(--cw-primary)', color: '#fff' }}
        >
          Next: Prompt Builder <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

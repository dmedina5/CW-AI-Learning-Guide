'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { Card, CardGrid } from '@/components/content/Card';
import { Callout } from '@/components/content/Callout';
import { CodeBlock } from '@/components/content/CodeBlock';
import { TierBadge } from '@/components/content/TierBadge';
import { REALITY_FILTER } from '@/lib/reality-filter';

// Marks advice that shifted with the Claude 5 generation.
function ThenNow({ then: thenText, now: nowText }: { then: string; now: string }) {
  return (
    <div className="mt-4 rounded-lg overflow-hidden" style={{ border: '1px solid var(--cw-border)' }}>
      <div className="px-4 py-3" style={{ background: 'var(--cw-surface)' }}>
        <div className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--cw-ink-muted)', letterSpacing: '1px' }}>Then</div>
        <span className="text-sm" style={{ color: 'var(--cw-ink-muted)' }}>{thenText}</span>
      </div>
      <div className="px-4 py-3" style={{ background: 'var(--cw-primary-light)', borderTop: '1px solid var(--cw-border)' }}>
        <div className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--cw-primary)', letterSpacing: '1px' }}>Now</div>
        <span className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>{nowText}</span>
      </div>
    </div>
  );
}

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
      <p className="mb-8">Getting the most from AI tools while protecting sensitive information.</p>

      <Callout variant="blue" className="mb-12">
        <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
          <strong>Updated for the Claude 5 models.</strong> The fundamentals on this page haven&apos;t
          moved &mdash; be specific, lead with context, protect PII. What changed is how much
          <em> instruction</em> a good prompt needs. Newer models read intent well enough that
          role-play preambles, output templates, and stacked &ldquo;do NOT&rdquo; rules now compete
          with their judgment instead of guiding it. Cards below marked{' '}
          <span className="font-semibold" style={{ color: 'var(--cw-primary)' }}>Then &rarr; Now</span>{' '}
          show where the advice shifted; the{' '}
          <Link href="/context-engineering#claude5" className="text-highlight" style={{ textDecoration: 'underline' }}>Context Engineering</Link>{' '}
          page has the full reasoning.
        </p>
      </Callout>

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
            <h3 className="mb-2">Let the Facts Set the Role</h3>
            <p className="text-base mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
              Role-play preambles existed to pull the right expertise out of weaker models. State a
              real situation in real terms and the newest models already know what hat to wear.
            </p>
            <ThenNow
              then={'"Act as a senior commercial auto underwriter with 15 years of experience in trucking risks."'}
              now={'"I\'m underwriting a 35-unit refrigerated fleet and need to decide whether to pursue it." — the domain, the seniority, and the task are all implied by the facts.'}
            />
            <p className="text-sm mt-4" style={{ color: 'var(--cw-ink-muted)' }}>
              Still worth naming a role when you want a genuinely different lens than the situation
              implies &mdash; &ldquo;review this as the broker would&rdquo; or &ldquo;argue the
              plaintiff&apos;s side.&rdquo; That&apos;s adding information, not decoration.
            </p>
          </Card>

          <Card number="03">
            <h3 className="mb-2">Provide Context First</h3>
            <p className="text-base mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
              Structure your prompt logically: background → rules/constraints → actual task.
            </p>
          </Card>

          <Card number="04">
            <h3 className="mb-2">Name the Deliverable, Not the Template</h3>
            <p className="text-base mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
              Format steering still works &mdash; it&apos;s <em>dictated structure</em> that costs
              you. A numbered output template caps the answer at the shape you already imagined;
              describing the job lets the model pick a better one.
            </p>
            <ThenNow
              then={'"Provide: 1. Top 5 risk factors 2. Red flags 3. Information gaps 4. Appetite assessment. Use bullet points. Keep under 400 words."'}
              now={'"Give me your read — pursue, decline, or conditional — and what would change your answer. Lead with the call, then the reasoning. Keep it tight."'}
            />
            <CardGrid columns={2} className="mt-4">
              <div className="p-4 rounded-lg" style={{ background: 'var(--cw-primary-light)' }}>
                <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--cw-primary-dark)' }}>Still worth asking for</h4>
                <p className="text-xs" style={{ color: 'var(--cw-ink-muted)' }}>A real container: an email, a table, a one-pager, a letter. These are genuine constraints, not decoration.</p>
              </div>
              <div className="p-4 rounded-lg" style={{ background: 'var(--cw-primary-light)' }}>
                <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--cw-primary-dark)' }}>Length controls</h4>
                <p className="text-xs" style={{ color: 'var(--cw-ink-muted)' }}>Keep these &mdash; Claude 5 writes longer by default, so &ldquo;keep it tight&rdquo; or a word cap earns its place.</p>
              </div>
            </CardGrid>
          </Card>

          <Card number="05">
            <h3 className="mb-2">Describe the Standard, Not the Prohibitions</h3>
            <p className="text-base mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
              A stack of &ldquo;do NOT&rdquo; rules only fences off the bad without ever describing
              the good &mdash; and on newer models those rules actively compete with the judgment
              you&apos;re trying to use. One sentence about what good looks like does more work.
            </p>
            <ThenNow
              then={'"Do NOT include specific financial details. Avoid technical jargon. Do not be pushy. Keep it under 200 words."'}
              now={'"Keep the reasoning at the level of the pattern rather than specific figures. Write it the way an underwriter writes to a broker they want to keep — firm, respectful, brief."'}
            />
            <p className="text-sm mt-4" style={{ color: 'var(--cw-ink-muted)' }}>
              Hard rules still belong in a prompt when they&apos;re genuinely hard &mdash; a
              compliance line you cannot cross, a figure that must not leave the building. Say those
              once, plainly. The problem is the pile, not the principle.
            </p>
          </Card>
        </div>
      </section>

      {/* CRISP Framework */}
      <section className="mb-16" id="crisp" data-tier="intermediate">
        <TierBadge tier="intermediate" />
        <div className="section-label mt-4">Framework</div>
        <h2 className="mb-4">The CRISP Framework</h2>
        <p className="mb-6">
          Use this framework to structure any prompt. It still holds &mdash; but the weight has moved.
          <strong> Context and Specifics carry the prompt</strong> and should be generous; Role is
          usually redundant once the facts are in; Preferences works better as one line about the
          standard than as an output template.
        </p>

        <div className="p-6 rounded-xl text-center text-lg font-mono mb-3" style={{ background: 'var(--cw-primary-light)' }}>
          <strong>C</strong>ontext → <span style={{ opacity: 0.5 }}><strong>R</strong>ole</span> → <strong>I</strong>nstruction → <strong>S</strong>pecifics → <strong>P</strong>references
        </div>
        <p className="text-sm mb-8 text-center" style={{ color: 'var(--cw-ink-muted)' }}>
          Role is faded on purpose &mdash; keep it in the acronym, skip it in most prompts.
        </p>

        <div className="space-y-4">
          {[
            { letter: 'C', title: 'Context', desc: 'The situation. Be generous here — this is what the answer stands on.', example: 'We\'re a trucking insurance MGA that specializes in long-haul operations. Our target market is fleets with 5-50 power units operating primarily in the continental US.' },
            { letter: 'R', title: 'Role', desc: 'Usually skippable. Add one only when you want a lens the facts don\'t already imply.', example: 'Skip it: "I\'m underwriting this account" already sets the role. Add one only for a deliberate shift — "review this the way the broker will read it."' },
            { letter: 'I', title: 'Instruction', desc: 'The decision you owe someone, not the artifact you want back.', example: 'Tell me whether to pursue this account, and what would change your answer.' },
            { letter: 'S', title: 'Specifics', desc: 'Your real data. The highest-value part of the prompt — attach files where you have them.', example: 'Loss runs attached. 3 years in operation, mix of owner-operators and company drivers, 4 claims in 24 months (2 cargo, 1 PD, 1 AL).' },
            { letter: 'P', title: 'Preferences', desc: 'The standard to hit. One line beats a template.', example: 'Lead with the recommendation, then the reasoning. Flag anything you\'re inferring rather than reading off the file. Keep it tight.' },
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
          title="The same prompt, written the old way"
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

        <CodeBlock
          title="The same prompt, written for Claude 5"
          code={`New business submission, 25-truck refrigerated fleet running
the Southeast. Submission and loss runs attached.

3 years in operation, mix of owner-operators and company
drivers, 4 claims in the past 24 months (2 cargo, 1 PD, 1 AL).

What should I be digging into before I quote this? Rank by what
would actually change the price, not by category.

Flag anything you're inferring rather than reading off the file.`}
        />

        <Callout variant="sage" className="mt-6">
          <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
            <strong>Both work.</strong> The first one isn&apos;t broken &mdash; if you have prompts
            in that style, keep using them. The second is shorter, says more about the actual
            situation and less about the format, and leaves room for a finding you didn&apos;t think
            to ask for. Note what got <em>longer</em>: the facts. What got shorter: the instructions.
          </p>
        </Callout>
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
            <p className="text-base mb-2" style={{ color: 'var(--cw-ink-secondary)' }}>
              <strong>Few-shot:</strong> Provide examples to guide the response.
            </p>
            <ThenNow
              then={'Add examples to almost any prompt — they raise quality across the board.'}
              now={'Reach for examples when you need to match something specific: a house voice, a fixed report layout, a schema. Skip them on open analysis — on newer models an example narrows the answer to the pattern it demonstrates, so you get back a variation on your example rather than the model\'s best thinking.'}
            />
            <p className="text-sm mt-4" style={{ color: 'var(--cw-ink-muted)' }}>
              Rule of thumb: examples are for <em>matching</em>, not for <em>teaching</em>. If you
              can describe the standard in a sentence, do that instead.
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
            <p className="text-sm mt-4" style={{ color: 'var(--cw-ink-muted)' }}>
              <strong>Mostly built in now.</strong> The Claude 5 models reason before answering
              without being told to, so this phrase buys less than it used to. It still earns its
              place when you want the reasoning <em>shown</em> &mdash; because you need to check the
              logic, not just the conclusion.
            </p>
          </Card>

          <Card>
            <div className="flex items-center gap-3 mb-3">
              <h3>Dual-Pass / Self-Check</h3>
              <TierBadge tier="intermediate" size="sm" />
            </div>
            <p className="text-base mb-3" style={{ color: 'var(--cw-ink-secondary)' }}>
              Have the AI draft first, then refine against criteria. Great for important documents.
            </p>
            <ThenNow
              then={'Bolt "double-check your work before responding" into the prompt itself.'}
              now={'Drop that line. Newer models already verify their own work, and telling them to do it again produces over-checking and padding. Anthropic\'s own guidance for these models is to delete self-check instructions — one of the few places where standard prompting advice inverts.'}
            />
            <p className="text-sm mt-4" style={{ color: 'var(--cw-ink-muted)' }}>
              Dual-pass as a <em>workflow</em> is still excellent: get the draft, read it, then come
              back with what specifically needs to change. That&apos;s a real second look with your
              judgment in the loop &mdash; not a self-check the model grades itself on.
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
          A standing instruction that makes AI responses more honest about what they actually know.
          The idea is more valuable than ever &mdash; a confident wrong answer is the expensive
          failure in underwriting and claims. The <em>implementation</em> needed an update.
        </p>

        <Callout variant="blue" className="mb-8">
          <p className="text-base mb-3" style={{ color: 'var(--cw-ink-secondary)' }}>
            <strong>What changed in v2.</strong> The original was written for models that would
            confidently invent things and rarely volunteer doubt. Newer models are better calibrated
            on their own, so the filter can do less &mdash; and several of its mechanics were working
            against it:
          </p>
          <ul className="space-y-2 text-sm" style={{ color: 'var(--cw-ink-muted)' }}>
            <li className="flex items-start gap-2">
              <span style={{ color: 'var(--cw-primary)' }}>&bull;</span>
              <span><strong>Dropped the 0.0&ndash;1.0 confidence score.</strong> A self-reported
              &ldquo;0.72&rdquo; is a generated number, not a measurement &mdash; false precision from
              a filter built to stop false precision. Replaced with what actually helps: what would
              raise the confidence.</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: 'var(--cw-primary)' }}>&bull;</span>
              <span><strong>Four labels became three, and one marks the good.</strong>{' '}
              <code>[Inference]</code> and <code>[Pattern-Based]</code> were the same act. Adding{' '}
              <code>[Sourced]</code> means you can tell verified from merely unlabeled.</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: 'var(--cw-primary)' }}>&bull;</span>
              <span><strong>The flagged-word list became a standard.</strong> A blocklist of six
              words misses every overclaim phrased differently, and trips on the legitimate uses.
              &ldquo;Write probabilistic things probabilistically&rdquo; catches both.</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: 'var(--cw-primary)' }}>&bull;</span>
              <span><strong>Check before you disclaim.</strong> &ldquo;I cannot verify this&rdquo;
              was the right answer when models had no tools. Now they can often just look it
              up.</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: 'var(--cw-primary)' }}>&bull;</span>
              <span><strong>Added a guard against over-verification.</strong> Newer models already
              re-check their work; standing instructions that sound like &ldquo;verify
              yourself&rdquo; make them do it twice and pad the answer. The filter now says
              explicitly that it wants disclosure, not a second pass.</span>
            </li>
          </ul>
        </Callout>

        <CardGrid columns={2} className="mb-8">
          <div className="p-4 rounded-lg" style={{ background: 'rgba(74,144,164,0.08)' }}>
            <h4 className="text-sm font-semibold mb-2">Separate What&apos;s Known</h4>
            <p className="text-xs" style={{ color: 'var(--cw-ink-muted)' }}>Sourced, inferred, or unknown &mdash; marked as it goes, not buried in a caveat at the end</p>
          </div>
          <div className="p-4 rounded-lg" style={{ background: 'rgba(74,144,164,0.08)' }}>
            <h4 className="text-sm font-semibold mb-2">Say What Would Settle It</h4>
            <p className="text-xs" style={{ color: 'var(--cw-ink-muted)' }}>Not just &ldquo;I&apos;m unsure&rdquo; but the specific document or number that would close the gap</p>
          </div>
          <div className="p-4 rounded-lg" style={{ background: 'rgba(74,144,164,0.08)' }}>
            <h4 className="text-sm font-semibold mb-2">No Invented Specifics</h4>
            <p className="text-xs" style={{ color: 'var(--cw-ink-muted)' }}>Never a number, date, name, or citation that isn&apos;t actually in front of it</p>
          </div>
          <div className="p-4 rounded-lg" style={{ background: 'rgba(74,144,164,0.08)' }}>
            <h4 className="text-sm font-semibold mb-2">Check First, Disclaim Second</h4>
            <p className="text-xs" style={{ color: 'var(--cw-ink-muted)' }}>With search available, looking it up beats declining to answer</p>
          </div>
        </CardGrid>

        <CodeBlock
          title="Reality Filter v2"
          code={REALITY_FILTER}
        />
        <div className="mt-4">
          <CopyButton text={REALITY_FILTER} />
        </div>

        <CardGrid columns={2} className="mt-8">
          <Card>
            <h3 className="mb-2">Where to put it</h3>
            <p className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
              Standing context belongs somewhere standing. Paste it once into a Claude{' '}
              <strong>Project&apos;s custom instructions</strong> or a Cowork workspace and every
              conversation inherits it. Retyping it at the top of each chat is the exact habit the{' '}
              <Link href="/context-engineering#claude5" className="text-highlight" style={{ textDecoration: 'underline' }}>progressive disclosure</Link>{' '}
              principle exists to kill.
            </p>
          </Card>
          <Card>
            <h3 className="mb-2">When to skip it</h3>
            <p className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
              It costs output length and adds friction, so it isn&apos;t free. Use it for anything
              that gets quoted, priced, filed, or acted on &mdash; risk analysis, loss review,
              regulatory questions, board material. Skip it for drafting an email or tidying your
              notes, where the labels are just noise.
            </p>
          </Card>
        </CardGrid>

        <Callout variant="warning" className="mt-6">
          <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
            <strong>If you already run v1, the labels changed.</strong>{' '}
            <code>[Pattern-Based]</code> folds into <code>[Inference]</code>,{' '}
            <code>[Speculation]</code> is covered by <code>[Inference]</code> with its
            &ldquo;say what from&rdquo; showing the weak grounding, and <code>[Sourced]</code> is
            new. If you have Projects or saved prompts using the old four, update them together so
            your team reads one vocabulary &mdash; and note that no filter, old or new, removes the
            need to check anything you&apos;re about to act on.
          </p>
        </Callout>
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

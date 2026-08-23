'use client';

import Link from 'next/link';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  CircleCheck,
  CircleX,
  MonitorSmartphone,
  Terminal,
  Waypoints,
} from 'lucide-react';
import { Card, CardGrid } from '@/components/content/Card';
import { Callout } from '@/components/content/Callout';
import { TierBadge } from '@/components/content/TierBadge';
import { QuizBlock } from '@/components/interactive/QuizBlock';
import { ModelRightSizer } from '@/components/interactive/ModelRightSizer';
import { EffortDial } from '@/components/interactive/EffortDial';
import { TokenCostLadder } from '@/components/interactive/TokenCostLadder';
import { CLAUDE_MODELS } from '@/lib/claude-models';

const OVERBUYING = [
  {
    habit: 'Opus 5 to rephrase an email',
    why: 'The answer is already in the text. You are paying for reasoning you will never read.',
    instead: 'Haiku 4.5. It will finish before Opus has finished thinking.',
  },
  {
    habit: 'max effort on a formatting job',
    why: 'max is the correctness-first setting. Nothing about reformatting a table is a correctness problem.',
    instead: 'low, and only step up if the output is actually wrong.',
  },
  {
    habit: 'Pasting the whole document when one section matters',
    why: 'Input tokens are billed on every run, and burying the relevant part makes the answer worse, not better.',
    instead: 'Paste the section. A smaller, sharper context beats a bigger one.',
  },
  {
    habit: 'Re-explaining your context in every new chat',
    why: 'You pay to re-send the same background repeatedly, and it drifts a little each time.',
    instead: 'Put it in a project, a Cowork folder, or a CLAUDE.md once.',
  },
  {
    habit: 'ultracode because the task feels important',
    why: 'It fans out a team of sub-agents. Feeling important is not the same as being hard to verify.',
    instead: 'Opus at xhigh. Save ultracode for audits and migrations.',
  },
  {
    habit: 'Frontier-first, so it is definitely right',
    why: 'Fable 5 costs ten times Haiku per token, and on easy work it produces the same answer.',
    instead: 'Start where the work sits on the ladder. Escalate on evidence.',
  },
];

const ESCALATION = [
  {
    step: 'Start at the cheapest rung that could plausibly work',
    detail:
      'For most people, most days, that is Sonnet 5. For lookups, classification and tidying, it is Haiku 4.5.',
  },
  {
    step: 'Read the answer before you judge the model',
    detail:
      'Most disappointing answers are a prompt problem, not a model problem. A vague ask gets a vague answer at every price point.',
  },
  {
    step: 'Turn the effort dial before you change the model',
    detail:
      'Going from high to xhigh on Sonnet is usually cheaper than going from Sonnet to Opus, and often fixes the same gap.',
  },
  {
    step: 'Step up one rung, not three',
    detail:
      'Sonnet to Opus. If Opus genuinely stalls on a hard, long-horizon problem, that is when Fable 5 earns its price.',
  },
  {
    step: 'Remember what worked',
    detail:
      'If a task type reliably needs Opus, stop re-deciding it. If it reliably works on Haiku, stop paying more out of habit.',
  },
];

const QUIZ_QUESTIONS = [
  {
    question:
      'You need to rewrite a three-sentence email so it sounds warmer before sending it to a broker. Which is right-sized?',
    options: [
      'Opus 5 at xhigh — it goes to a customer, so it matters',
      'Haiku 4.5 — the content already exists, you are just restating it',
      'Fable 5 at max — never risk an external message',
      'Sonnet 5 at max — a compromise',
    ],
    correctIndex: 1,
    explanation:
      'External stakes nudge you up, but the cognitive job is still reshaping text you already wrote, and you would spot a bad rewrite instantly. Haiku answers in a second. The stakes argument only wins when a wrong answer would be hard to catch.',
  },
  {
    question: 'Which change usually saves more money on a task that runs a thousand times a week?',
    options: [
      'Dropping from Opus 5 to Sonnet 5',
      'Dropping the effort from max to low',
      'Both matter, and they multiply',
      'Neither — per-run cost is too small to matter',
    ],
    correctIndex: 2,
    explanation:
      'Model choice moves the per-token rate, and effort moves how many output tokens you generate. Opus at max against Haiku at low is a difference of more than an order of magnitude. At volume, the two levers compound.',
  },
  {
    question: 'You are debugging a bug that spans several files in a large repository. What is the default?',
    options: [
      'Haiku 4.5 at low, to keep it cheap',
      'Opus 5 at xhigh — this is exactly what it is for',
      'Fable 5 at max, since bugs are expensive',
      'Sonnet 5 at low, then escalate immediately',
    ],
    correctIndex: 1,
    explanation:
      'Long-horizon, multi-step tool use is the case Opus and xhigh were built for, and it is the Claude Code default for that reason. Haiku cannot even hold a large repository. Fable is the rung above, reached after Opus has actually fallen short.',
  },
  {
    question: 'Why does "would I notice if it was wrong?" change the recommendation so much?',
    options: [
      'It does not — it is a comfort question',
      'Because a mistake you catch instantly is cheap, while a plausible wrong answer is expensive',
      'Because harder tasks are always wrong more often',
      'Because it determines the context window you need',
    ],
    correctIndex: 1,
    explanation:
      'If a bad answer fails loudly, the cheap model is a free bet — you lose seconds. If a bad answer looks exactly like a good one, you may act on it. Silent failure is the one place where spending more up front is genuinely the cheaper choice.',
  },
  {
    question: 'Claude Haiku 4.5 has no effort dial. What does that tell you?',
    options: [
      'It is broken and should be avoided',
      'Effort is a paid add-on you have to enable',
      'It answers rather than deliberates — which is exactly why it is fast and cheap',
      'You have to set effort in your prompt instead',
    ],
    correctIndex: 2,
    explanation:
      'The dial is the model spending extra tokens thinking before it answers. Haiku is built to respond quickly on work that does not need deliberation. If your task genuinely needs thinking time, that is your signal to move up to Sonnet, not to fight Haiku.',
  },
];

export default function RightSizeYourModelPage() {
  return (
    <div>
      <TierBadge tier="intermediate" />
      <h1 className="mt-4 mb-4">Right-Size Your Model</h1>
      <p className="mb-6">
        Choose Your Claude told you <em>where</em> to work. This tells you how much engine to spend
        once you get there — which model, and how hard it should think.
      </p>

      <Callout variant="purple" className="mb-12">
        <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
          <strong>The whole rule, in one line:</strong> start with the smallest model that reliably
          does the job, and step up only when it struggles. Cost and depth rise together as you
          climb — so climbing without a reason is just paying more for the same answer.
        </p>
      </Callout>

      {/* Section: The Right-Sizer */}
      <section className="mb-16" id="right-sizer">
        <div className="section-label">Find Your Fit — Intermediate</div>
        <h2 className="mb-4">
          Right-size <span className="text-highlight">this task</span>
        </h2>
        <p className="mb-6" style={{ color: 'var(--cw-ink-secondary)' }}>
          Five questions about the work in front of you. The answer is a model and an effort level,
          plus the reasoning behind it — because the goal is to stop needing the tool.
        </p>

        <ModelRightSizer />
      </section>

      {/* Section: The Ladder */}
      <section className="mb-16" id="ladder">
        <div className="section-label">Part One</div>
        <h2 className="mb-4">
          The Claude <span className="text-highlight">model family</span>
        </h2>
        <p className="mb-6" style={{ color: 'var(--cw-ink-secondary)' }}>
          Four models, one dial from fast-and-light to frontier. They are not four grades of
          quality — they are four points on a cost-and-depth curve, and most work does not sit at
          the top of it.
        </p>

        <div className="space-y-3 mb-6">
          {CLAUDE_MODELS.map(model => (
            <div
              key={model.id}
              className="glass-card p-6 relative overflow-hidden"
            >
              <div
                className="absolute top-0 left-0 w-1 h-full"
                style={{ background: model.color }}
              />
              <div className="pl-3">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold" style={{ color: 'var(--cw-ink)' }}>
                    {model.name}
                  </h3>
                  <span className="text-sm font-mono font-bold" style={{ color: model.color }}>
                    {model.priceTier}
                  </span>
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider"
                    style={{ background: `${model.color}18`, color: model.color }}
                  >
                    {model.label}
                  </span>
                </div>

                <p className="text-base mb-3" style={{ color: 'var(--cw-ink-secondary)' }}>
                  {model.summary}
                </p>

                <p className="text-sm mb-3" style={{ color: 'var(--cw-ink-secondary)' }}>
                  <strong style={{ color: 'var(--cw-ink)' }}>Best for:</strong> {model.bestFor}
                </p>

                <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs" style={{ color: 'var(--cw-ink-muted)' }}>
                  <span>
                    <strong>Context:</strong> {model.context}
                  </span>
                  <span>
                    <strong>Rate:</strong> ${model.inputPrice} in / ${model.outputPrice} out per 1M
                  </span>
                  <span>
                    <strong>Per token vs Haiku:</strong> {model.relativeCost}×
                  </span>
                  <span>
                    <strong>Effort dial:</strong> {model.hasEffortDial ? 'yes' : 'no'}
                  </span>
                </div>

                <p className="text-sm mt-3 italic" style={{ color: 'var(--cw-ink-muted)' }}>
                  {model.notes}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Callout variant="sage">
          <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
            Most everyday work is a great fit for <strong>Sonnet 5</strong>. Reach for{' '}
            <strong>Opus 5</strong> when a task is hard or long-running, and{' '}
            <strong>Haiku 4.5</strong> when speed and volume matter most. Sonnet is not the timid
            choice — it is the correct one for the large middle of what we do.
          </p>
        </Callout>
      </section>

      {/* Section: Effort */}
      <section className="mb-16" id="effort">
        <div className="section-label">Part Two</div>
        <h2 className="mb-4">
          Dial the <span className="text-highlight">effort</span>
        </h2>
        <p className="mb-6" style={{ color: 'var(--cw-ink-secondary)' }}>
          Effort sets how hard Claude thinks before it acts. Higher means more thorough, but slower
          and more tokens. It is a separate decision from the model, and on a task that is merely
          fiddly rather than genuinely hard, it is the cheaper lever to pull.
        </p>

        <EffortDial />
      </section>

      {/* Section: Cost */}
      <section className="mb-16" id="cost">
        <div className="section-label">Part Three</div>
        <h2 className="mb-4">
          What it <span className="text-highlight">actually costs</span>
        </h2>
        <p className="mb-6" style={{ color: 'var(--cw-ink-secondary)' }}>
          Per-run differences look trivial until you multiply them. Move the sliders and watch the
          same task get ten or twenty times more expensive without getting any better.
        </p>

        <TokenCostLadder />

        <Callout variant="blue" className="mt-6">
          <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
            The number worth carrying around: <strong>Sonnet costs about 3× Haiku per token,
            Opus about 5×, and Fable about 10×</strong> — before the effort dial multiplies the
            output side again. Nothing else on this page is as easy to remember or as useful.
          </p>
        </Callout>
      </section>

      {/* Section: Where you pick it */}
      <section className="mb-16" id="where">
        <div className="section-label">In Practice</div>
        <h2 className="mb-6">
          Where you <span className="text-highlight">actually pick it</span>
        </h2>

        <CardGrid columns={3}>
          <Card>
            <Terminal size={20} className="mb-3" style={{ color: 'var(--cw-primary)' }} />
            <h4 className="mb-2" style={{ color: 'var(--cw-ink)' }}>Claude Code</h4>
            <p className="text-sm" style={{ color: 'var(--cw-ink-muted)' }}>
              Type{' '}
              <code
                className="px-1.5 py-0.5 rounded text-xs"
                style={{ background: 'var(--cw-primary-light)', color: 'var(--cw-primary)' }}
              >
                /model
              </code>{' '}
              to switch. The effort dial and <code>ultracode</code> live here too.
            </p>
          </Card>
          <Card>
            <MonitorSmartphone size={20} className="mb-3" style={{ color: 'var(--cw-info)' }} />
            <h4 className="mb-2" style={{ color: 'var(--cw-ink)' }}>Claude chat</h4>
            <p className="text-sm" style={{ color: 'var(--cw-ink-muted)' }}>
              Pick from the model dropdown on claude.ai, in the browser or the desktop app.
            </p>
          </Card>
          <Card>
            <Waypoints size={20} className="mb-3" style={{ color: 'var(--cw-success)' }} />
            <h4 className="mb-2" style={{ color: 'var(--cw-ink)' }}>Cowork</h4>
            <p className="text-sm" style={{ color: 'var(--cw-ink-muted)' }}>
              The same model selector as chat, in the Cowork tab of the desktop app.
            </p>
          </Card>
        </CardGrid>

        <Callout variant="coral" className="mt-6">
          <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
            <strong>Models work everywhere. Effort levels and ultracode are Claude Code.</strong>{' '}
            In chat and Cowork you still control depth — you just do it with your prompt. Asking
            Claude to think it through before answering is the manual version of turning the dial
            up.
          </p>
        </Callout>
      </section>

      {/* Section: Over-buying */}
      <section className="mb-16" id="overbuying">
        <div className="section-label">Anti-Patterns</div>
        <h2 className="mb-4">
          Signs you are <span className="text-highlight">over-buying</span>
        </h2>
        <p className="mb-6" style={{ color: 'var(--cw-ink-secondary)' }}>
          None of these are dramatic mistakes. They are habits, which is exactly why they are
          expensive — a habit runs every day.
        </p>

        <div className="space-y-3">
          {OVERBUYING.map((item, i) => (
            <div
              key={i}
              className="p-5 rounded-xl"
              style={{ background: 'var(--cw-surface)', border: '1px solid var(--cw-border)' }}
            >
              <div className="flex items-start gap-3 mb-2">
                <CircleX size={16} className="flex-shrink-0 mt-1" style={{ color: 'var(--cw-warning)' }} />
                <p className="text-base font-semibold" style={{ color: 'var(--cw-ink)' }}>
                  {item.habit}
                </p>
              </div>
              <p className="text-sm mb-2 pl-7" style={{ color: 'var(--cw-ink-secondary)' }}>
                {item.why}
              </p>
              <div className="flex items-start gap-3 pl-7">
                <CircleCheck size={15} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--cw-success)' }} />
                <p className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
                  {item.instead}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section: Escalation */}
      <section className="mb-16" id="escalation">
        <div className="section-label">The Habit to Build</div>
        <h2 className="mb-4">
          Escalate on <span className="text-highlight">evidence</span>
        </h2>
        <p className="mb-6" style={{ color: 'var(--cw-ink-secondary)' }}>
          Over-buying is usually anxiety, not analysis — reaching for the biggest model because you
          are not sure. The fix is a ladder you climb one rung at a time, with a reason for each
          step.
        </p>

        <div className="space-y-1">
          {ESCALATION.map((item, i) => (
            <div key={i}>
              <div
                className="p-5 rounded-xl flex items-start gap-4"
                style={{ background: 'var(--cw-surface)', border: '1px solid var(--cw-border)' }}
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold text-white"
                  style={{ background: 'var(--cw-primary)' }}
                >
                  {i + 1}
                </div>
                <div>
                  <p className="text-base font-semibold mb-1" style={{ color: 'var(--cw-ink)' }}>
                    {item.step}
                  </p>
                  <p className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
                    {item.detail}
                  </p>
                </div>
              </div>
              {i < ESCALATION.length - 1 && (
                <div className="flex justify-center py-1">
                  <ArrowDown size={14} style={{ color: 'var(--cw-ink-muted)' }} />
                </div>
              )}
            </div>
          ))}
        </div>

        <Callout variant="purple" className="mt-6">
          <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
            The one exception worth naming: if a wrong answer would be{' '}
            <strong>hard to detect and expensive to act on</strong> — a rate, a filing, a number
            going to a regulator — skip the ladder and start high. That is not over-buying, that is
            the case the expensive models exist for.
          </p>
        </Callout>
      </section>

      {/* Section: Quiz */}
      <section className="mb-16" id="check">
        <div className="section-label">Check Yourself</div>
        <h2 className="mb-6">
          The <span className="text-highlight">reflex test</span>
        </h2>

        <QuizBlock title="Right-Sizing" questions={QUIZ_QUESTIONS} />
      </section>

      {/* Navigation */}
      <div
        className="flex justify-between items-center pt-8 mt-8"
        style={{ borderTop: '1px solid var(--cw-border)' }}
      >
        <Link
          href="/choose-your-claude"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all pill-btn"
        >
          <ArrowLeft size={16} /> Choose Your Claude
        </Link>
        <Link
          href="/road-to-agentic-engineering"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:gap-3"
          style={{ background: 'var(--cw-primary)', color: '#fff' }}
        >
          Next: Road to Agentic Engineering <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

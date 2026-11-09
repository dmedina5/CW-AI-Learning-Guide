'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, CircleCheck, CircleX } from 'lucide-react';
import { Callout } from '@/components/content/Callout';
import { CodeBlock } from '@/components/content/CodeBlock';
import { TierBadge } from '@/components/content/TierBadge';
import { QuizBlock } from '@/components/interactive/QuizBlock';

/**
 * Token Efficiency guidelines, November 2026.
 *
 * Every rule here is grounded in Anthropic's own documentation, read on
 * 2026-11-09:
 *   - code.claude.com/docs/en/costs            (Manage costs effectively)
 *   - code.claude.com/docs/en/prompt-caching   (How Claude Code uses prompt caching)
 *   - code.claude.com/docs/en/sub-agents       (Isolate high-volume operations)
 *   - support.claude.com/en/articles/9797557   (Usage limit best practices)
 *   - anthropic.com/engineering/effective-harnesses-for-long-running-agents
 * The habits are organized after Simon Scrapes' video "Claude Pros Don't Pay
 * for Max" (7 Nov 2026). Three of its claims are corrected against the docs:
 * /compact is cheap while the cache is warm; on the 5.5 models and Fable 5.1
 * changing effort keeps the cache; and Anthropic publishes no multiplier for
 * a cold cache on subscriptions. content-checks.sh pins all three.
 */

const SOURCES = [
  { label: 'Manage costs effectively (Claude Code docs)', url: 'https://code.claude.com/docs/en/costs' },
  { label: 'How Claude Code uses prompt caching', url: 'https://code.claude.com/docs/en/prompt-caching' },
  { label: 'Subagents: isolate high-volume operations', url: 'https://code.claude.com/docs/en/sub-agents' },
  { label: 'Usage limit best practices (Claude Help Center)', url: 'https://support.claude.com/en/articles/9797557-usage-limit-best-practices' },
  { label: 'Effective harnesses for long-running agents (Anthropic Engineering)', url: 'https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents' },
  { label: "Claude Pros Don't Pay for Max (Simon Scrapes, YouTube)", url: 'https://www.youtube.com/watch?v=ZRKAw472Nmk' },
];

const EVERYONE = [
  {
    title: 'Put reference material in a project',
    body: 'Files you reuse in a project are cached, so they count less against your limit each time Claude reads them again than the same files pasted into new chats.',
  },
  {
    title: 'Plan the ask, then send it once',
    body: 'Decide what you need, group related questions into one message, and give the background up front. Every round of "what did you mean?" is another full trip.',
  },
  {
    title: 'Be specific',
    body: 'A clear, complete request avoids the clarifying back-and-forth. Read your message once before you send it.',
  },
  {
    title: 'Refer back instead of repeating',
    body: 'Say "as we agreed above" instead of pasting it again. Claude can also search your past chats and use memory to pick up context.',
  },
  {
    title: 'Start a new chat for a new job',
    body: 'A long chat costs more on every message, because Claude rereads all of it. When the job changes, start fresh and bring only what matters.',
  },
  {
    title: 'Use the smallest model and effort that work',
    body: 'Haiku 5.5 for lookups and tidying, Sonnet 5.5 for most work, Opus 5.5 for hard problems. Max effort can use five times the usage or more.',
  },
  {
    title: 'Watch the meter',
    body: 'Settings > Usage shows your five-hour and weekly bars. Check it before a big job, not after the limit message.',
  },
];

const HABITS = [
  {
    id: 'handoff',
    title: 'Hand off, then /clear',
    body: (
      <>
        <p className="mb-3">
          When you finish a stretch of work, ask Claude to write a short <strong>handoff</strong>{' '}
          file, run <code>/clear</code>, and start the next session from it. <code>/clear</code>{' '}
          costs nothing, and the new session reads a page instead of the whole history. This is how
          Anthropic&apos;s own long-running agents work: each session ends with a progress note and a
          commit, so the next one can pick up the state quickly.
        </p>
        <p className="mb-3">
          The handoff only needs what a fresh session cannot work out for itself:
        </p>
        <CodeBlock
          title="Prompt"
          code={`Before we stop, write handoff.md with:
1. The goal
2. What is done
3. What comes next
4. Files you touched
5. Decisions we made, and why
6. What we tried that did not work`}
        />
        <p className="mt-3">
          <code>/compact</code> is the other option: it replaces the history with a summary. While
          the conversation is still cached, that costs a fraction of its size. After a long break,
          the cache is gone and <code>/compact</code> has to reread everything at full price, so a
          handoff and <code>/clear</code> is the cheaper way back into old work. Abandoning a path?{' '}
          <code>/rewind</code> to an earlier turn keeps the cache.
        </p>
      </>
    ),
  },
  {
    id: 'files',
    title: 'Keep context in files, not chat history',
    body: (
      <>
        <p className="mb-3">
          Coming back to yesterday&apos;s chat feels efficient, but every message there resends the
          whole conversation, and after a break it is no longer cached. Instead, end the chat by
          saving what you agreed:
        </p>
        <CodeBlock title="Prompt" code={`Save the pricing we agreed into pricing.md`} />
        <p className="mt-3">
          Tomorrow, start a fresh chat with <em>&quot;Read pricing.md and draft the pricing page.&quot;</em>{' '}
          Claude gets the conclusions without rereading an hour of getting there.
        </p>
      </>
    ),
  },
  {
    id: 'preload',
    title: 'Trim what loads before you type',
    body: (
      <>
        <p className="mb-3">
          Every message also carries what loads at the start: your CLAUDE.md, memory files, skills
          and plugins. Run <code>/context</code> in a new session to see it, then:
        </p>
        <ul className="list-disc pl-5 space-y-1 mb-3">
          <li>Keep CLAUDE.md <strong>under 200 lines</strong>, with only what every session needs.</li>
          <li>Move workflow instructions, such as your weekly report, into a skill. Skills load only when used.</li>
          <li>Move finished tasks and old project notes out of CLAUDE.md and memory into files Claude reads on request.</li>
          <li>Uninstall plugins you tried once, and turn off MCP servers you do not use with <code>/mcp</code>.</li>
          <li>Prefer a command-line tool such as <code>gh</code> or <code>aws</code> over an MCP server when both exist.</li>
        </ul>
        <p>
          MCP tools themselves are no longer the main culprit: Claude Code defers their definitions
          and loads one only when Claude needs it.
        </p>
      </>
    ),
  },
  {
    id: 'model',
    title: 'Pick the model and effort at the start',
    body: (
      <>
        <p className="mb-3">
          <strong>Switching model</strong> mid-session throws the cache away: each model has its own,
          so the next message rereads the whole conversation uncached. Choose the model before you
          start.
        </p>
        <p>
          Effort is gentler on our models. On Opus 5.5, Sonnet 5.5, Haiku 5.5 and Fable 5.1,
          changing effort keeps the cache, so turning it down for a routine step is fine. Do not
          leave it on max for work that does not need it: you pay for thinking you never use.
        </p>
      </>
    ),
  },
  {
    id: 'walk-away',
    title: 'Do not walk away mid-task',
    body: (
      <>
        <p className="mb-3">
          On our plan, the main Claude Code conversation stays cached for <strong>one hour</strong>{' '}
          after your last message. Come back later and type &quot;continue&quot;, and that one word
          rereads the whole session at full price. Before lunch or the end of the day, finish the
          step, or write the handoff and close the session.
        </p>
        <p>
          Check what keeps running while you are gone. A <code>/loop</code> or scheduled task, a
          goal waiting on background work, and messages from your other sessions each start a new
          turn that sends the whole conversation again, even while you are away.
        </p>
      </>
    ),
  },
  {
    id: 'subagents',
    title: 'Use subagents for noisy work, and say what to bring back',
    body: (
      <>
        <p className="mb-3">
          A subagent keeps bulky output, such as test runs, logs or documentation, out of your main
          conversation. It is not free: it draws on the same allowance. Use one when a job produces
          a lot of output, and tell it exactly what to return. Anthropic&apos;s own example:
        </p>
        <CodeBlock
          title="Prompt"
          code={`Use a subagent to run the test suite and report only the failing tests with their error messages`}
        />
        <p className="mt-3">
          For small jobs, let Claude decide; a subagent there is extra overhead. Subagents keep their
          cache for only <strong>five minutes</strong>, even on our plan. If yours run long jobs
          with pauses, setting <code>CLAUDE_CODE_SUBAGENT_PROMPT_CACHE_TTL=1h</code> keeps their
          cache for an hour. One-hour cache writes cost more, so only do it for jobs that idle.
        </p>
      </>
    ),
  },
  {
    id: 'measure',
    title: 'Measure with /usage, and let it fix things',
    body: (
      <>
        <p className="mb-3">
          Before deciding the limits are too tight, run <code>/usage</code> in Claude Code. On our
          plan it shows what your usage went to:
        </p>
        <ul className="list-disc pl-5 space-y-1 mb-3">
          <li>Each skill, subagent, plugin and MCP server&apos;s share of your recent usage.</li>
          <li>Press <strong>w</strong> for the last 7 days, <strong>d</strong> for the last 24 hours.</li>
          <li>A recommendation for anything behind 10% or more of your usage, such as &quot;Trim CLAUDE.md · 49k tokens per request&quot;.</li>
          <li>Press <strong>f</strong> to have Claude apply the fixes it can. It shows each change first.</li>
          <li>A row for each heavy <code>/loop</code>, and a prompt cache line that counts misses and names the likely cause.</li>
        </ul>
        <p>
          It reads this machine&apos;s history only, so chat on claude.ai does not show up there.
        </p>
      </>
    ),
  },
];

const CORRECTIONS = [
  {
    claim: 'Claim: /compact is one of the most expensive things you can do.',
    fact: 'Only after a break. While the conversation is still cached, Anthropic says /compact costs a fraction of what its size suggests. Run it at natural breaks, not after lunch.',
  },
  {
    claim: 'Claim: Changing effort halfway through throws the cache away, like changing the model.',
    fact: 'True for model switches, and for effort on older models. On Opus 5.5, Sonnet 5.5, Haiku 5.5 and Fable 5.1 on our plan, changing effort keeps the cache.',
  },
  {
    claim: 'Claim: After an hour your next message costs ten times as much.',
    fact: 'The one-hour cache is right for the main Claude Code conversation on our plan. Anthropic does not publish a multiplier for subscription usage, so this guide does not either.',
  },
];

const QUIZ_QUESTIONS = [
  {
    question: 'You worked with Claude Code all morning on a report and come back after lunch. What is the cheapest way to carry on?',
    options: [
      'Type "continue" in the same session',
      'Run /compact first, then continue',
      'Start a fresh session from the handoff file you wrote before lunch',
      'Switch to Opus so it catches up faster',
    ],
    correctIndex: 2,
    explanation:
      'After an hour the cache is gone, so "continue" and /compact both reread the whole morning at full price. A handoff file plus /clear gives the next session only what it needs. Switching model throws away the cache too.',
  },
  {
    question: 'Which of these does NOT make the next message reread your whole conversation uncached?',
    options: [
      'Switching from Sonnet 5.5 to Opus 5.5 mid-session',
      'Turning effort down from high to medium on Sonnet 5.5',
      'Coming back after a two-hour break',
      'Running /compact on a session you left yesterday',
    ],
    correctIndex: 1,
    explanation:
      'On Opus 5.5, Sonnet 5.5, Haiku 5.5 and Fable 5.1, changing effort keeps the cache. A model switch, a break longer than the cache lifetime, and compacting a cold session all reread the history uncached.',
  },
  {
    question: 'Where do Claude Code, chat and Cowork usage go on the Cover Whale Teams plan?',
    options: [
      'Three separate limits, one per product',
      'One allowance per person, shared across all three, resetting every five hours and weekly',
      'A company-wide pool everyone draws from',
      'Claude Code is unlimited; only chat has a limit',
    ],
    correctIndex: 1,
    explanation:
      'Each seat has one allowance, shared across chat, Cowork and Claude Code, that resets on a rolling five-hour window and a weekly window. A heavy Claude Code morning leaves less for chat in the afternoon.',
  },
];

export default function TokenEfficiencyPage() {
  return (
    <div>
      <TierBadge tier="intermediate" />
      <h1 className="mt-4 mb-4">Token Efficiency</h1>
      <p className="mb-6">
        Most wasted usage is not new work. It is Claude rereading things it has already read. These
        guidelines come from Anthropic&apos;s own documentation, so the same allowance gets more done.
      </p>

      <Callout variant="purple" className="mb-12">
        <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
          <strong>Your allowance on the Cover Whale Teams plan.</strong> Each person has one
          allowance, shared across chat, Cowork and Claude Code. It resets on a rolling five-hour
          window and a weekly window. A heavy Claude Code morning leaves less for chat in the
          afternoon, so these habits matter even if you only use one of them.
        </p>
      </Callout>

      {/* Section: How the meter runs */}
      <section className="mb-16" id="how-it-works">
        <div className="section-label">The Mental Model</div>
        <h2 className="mb-6">
          How the meter <span className="text-highlight">actually runs</span>
        </h2>
        <ol className="list-decimal pl-5 space-y-3 mb-6 max-w-3xl" style={{ color: 'var(--cw-ink-secondary)' }}>
          <li>
            <strong>Claude has no memory between messages, so every message sends the whole conversation</strong>,
            plus everything loaded at the start. A one-line question in a chat that has been open all
            day is charged for the whole day.
          </li>
          <li>
            <strong>Caching makes rereading cheap, for a while.</strong> Claude keeps what it just
            read so the next message rereads it at a reduced rate. In Claude Code on our plan the main
            conversation stays cached for <strong>one hour</strong> after your last message;
            subagents for <strong>five minutes</strong>. Chat and project caches also expire after a
            period of inactivity.
          </li>
          <li>
            <strong>Some actions throw the cache away</strong>: a long break, switching model, and
            adding or removing an MCP server. The next message then rereads everything at full price.
          </li>
        </ol>
        <p className="max-w-3xl" style={{ color: 'var(--cw-ink-secondary)' }}>
          So the two levers are: keep conversations short and focused, and avoid rebuilding the cache
          for no reason.
        </p>
      </section>

      {/* Section: Everyone */}
      <section className="mb-16" id="everyone">
        <div className="section-label">For Everyone</div>
        <h2 className="mb-4">
          Chat, projects and the <span className="text-highlight">desktop app</span>
        </h2>
        <p className="mb-6" style={{ color: 'var(--cw-ink-secondary)' }}>
          From Anthropic&apos;s help-center article <em>Usage limit best practices</em>, with our
          model names.
        </p>
        <div className="space-y-3 max-w-3xl">
          {EVERYONE.map((item, i) => (
            <div
              key={item.title}
              className="flex items-start gap-4 p-5 rounded-xl"
              style={{ background: 'var(--cw-surface)', border: '1px solid var(--cw-border)' }}
            >
              <span className="text-sm font-bold flex-shrink-0 w-6 mt-0.5" style={{ color: 'var(--cw-primary)' }}>
                {i + 1}
              </span>
              <div>
                <h3 className="text-[17px] font-semibold mb-1" style={{ color: 'var(--cw-ink)' }}>
                  {item.title}
                </h3>
                <p className="text-[15px]" style={{ color: 'var(--cw-ink-muted)' }}>
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section: Claude Code habits */}
      <section className="mb-16" id="claude-code">
        <div className="section-label">For Claude Code</div>
        <h2 className="mb-4">
          Seven habits that make the <span className="text-highlight">same limit last</span>
        </h2>
        <p className="mb-6" style={{ color: 'var(--cw-ink-secondary)' }}>
          Claude Code sessions carry files, tool results and long reasoning, so one debugging session
          can use more than a day of chat. These habits make the biggest difference.
        </p>
        <div className="space-y-6 max-w-3xl">
          {HABITS.map((habit, i) => (
            <div
              key={habit.id}
              id={habit.id}
              className="p-6 rounded-xl"
              style={{ background: 'var(--cw-surface)', border: '1px solid var(--cw-border)' }}
            >
              <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--cw-ink)' }}>
                <span style={{ color: 'var(--cw-primary)' }}>{i + 1}.</span> {habit.title}
              </h3>
              <div className="text-[15px] leading-relaxed" style={{ color: 'var(--cw-ink-secondary)' }}>
                {habit.body}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section: Corrections */}
      <section className="mb-16" id="corrections">
        <div className="section-label">Checked Against the Docs</div>
        <h2 className="mb-4">
          What the popular advice <span className="text-highlight">gets wrong</span>
        </h2>
        <p className="mb-6" style={{ color: 'var(--cw-ink-secondary)' }}>
          These habits are popularized in Simon Scrapes&apos; video <em>Claude Pros Don&apos;t Pay for
          Max</em>. In paraphrase, three of its claims do not match Anthropic&apos;s documentation for our plan and
          models:
        </p>
        <div className="space-y-3 max-w-3xl">
          {CORRECTIONS.map(item => (
            <div
              key={item.claim}
              className="p-5 rounded-xl"
              style={{ background: 'var(--cw-surface)', border: '1px solid var(--cw-border)' }}
            >
              <div className="flex items-start gap-3 mb-2">
                <CircleX size={16} className="flex-shrink-0 mt-1" style={{ color: 'var(--cw-warning)' }} />
                <p className="text-base font-semibold" style={{ color: 'var(--cw-ink)' }}>
                  {item.claim}
                </p>
              </div>
              <div className="flex items-start gap-3 pl-0">
                <CircleCheck size={15} className="flex-shrink-0 mt-1" style={{ color: 'var(--cw-success)' }} />
                <p className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
                  {item.fact}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section: Quiz */}
      <section className="mb-16" id="check">
        <div className="section-label">Check Yourself</div>
        <h2 className="mb-6">
          The <span className="text-highlight">efficiency test</span>
        </h2>
        <QuizBlock title="Token Efficiency" questions={QUIZ_QUESTIONS} />
      </section>

      {/* Section: Sources */}
      <section className="mb-16" id="sources">
        <div className="section-label">Sources</div>
        <h2 className="mb-4">Where this comes from</h2>
        <ol className="list-decimal pl-5 space-y-1 text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
          {SOURCES.map(source => (
            <li key={source.url}>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
                style={{ color: 'var(--cw-primary)' }}
              >
                {source.label}
              </a>
            </li>
          ))}
        </ol>
        <p className="text-xs mt-3" style={{ color: 'var(--cw-ink-muted)' }}>
          Checked against Anthropic&apos;s documentation in November 2026. Claude Code changes
          often; where this page and the docs disagree, the docs win.
        </p>
      </section>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8 mt-8" style={{ borderTop: '1px solid var(--cw-border)' }}>
        <Link
          href="/right-size-your-model"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all pill-btn"
        >
          <ArrowLeft size={16} /> Right-Size Your Model
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

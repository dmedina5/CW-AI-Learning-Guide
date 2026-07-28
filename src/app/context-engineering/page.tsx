'use client';

import Link from 'next/link';
import {
  ArrowLeft, ArrowRight, BookText, Database, Wrench, History,
  Scissors, FileStack, Cpu, Search, Sparkles,
  Scale, Layers, FileCode, Stethoscope,
} from 'lucide-react';
import { Card, CardGrid } from '@/components/content/Card';
import { Callout } from '@/components/content/Callout';
import { CodeBlock } from '@/components/content/CodeBlock';
import { TierBadge } from '@/components/content/TierBadge';
import { StepList } from '@/components/content/StepList';
import { ContextLayers } from '@/components/interactive/ContextLayers';

// The core distinction the page is built around.
const COMPARISON = [
  {
    dimension: 'The question it answers',
    prompt: 'How do I word this request so the AI understands it?',
    context: 'What information does the AI need in front of it to succeed at this task?',
  },
  {
    dimension: 'Unit of work',
    prompt: 'A single message or instruction.',
    context: 'The entire input window — instructions, data, examples, tools, history.',
  },
  {
    dimension: 'Mindset',
    prompt: 'Writing — finding the right words.',
    context: 'Engineering — designing an information system.',
  },
  {
    dimension: 'When it happens',
    prompt: 'You craft it once, up front.',
    context: 'It is assembled dynamically, per request, as the task evolves.',
  },
  {
    dimension: 'The analogy',
    prompt: 'Casting a single magic spell.',
    context: 'Writing the full screenplay for the AI.',
  },
  {
    dimension: 'Fails when',
    prompt: 'The phrasing is vague or ambiguous.',
    context: 'The window is missing key facts — or stuffed with irrelevant noise.',
  },
];

const ANATOMY = [
  {
    icon: BookText,
    title: 'Instructional',
    desc: 'Who the AI should be and what it should do.',
    items: ['Role & persona', 'Task definition', 'Few-shot examples', 'Constraints & guardrails', 'Tone and format rules'],
  },
  {
    icon: Database,
    title: 'Knowledge',
    desc: 'The facts the task actually depends on.',
    items: ['Retrieved documents (RAG)', 'Policy & product data', 'Schemas & specs', 'Logs & error traces', 'Reference material'],
  },
  {
    icon: Wrench,
    title: 'Tools',
    desc: 'Live input pulled from the environment.',
    items: ['Web search results', 'Database query output', 'Code / calculation results', 'API responses', 'Prior tool calls'],
  },
  {
    icon: History,
    title: 'History & Memory',
    desc: 'State carried across the conversation.',
    items: ['Conversation transcript', 'Running summaries', 'Decisions already made', 'Persistent memory files', 'Progress checkpoints'],
  },
];

const TECHNIQUES = [
  {
    title: 'Right-size the window',
    description: (
      <>Include everything the task truly needs &mdash; and nothing else. Too little and the model
      guesses; too much irrelevant text and quality drops while cost and latency climb. More context
      is not better context.</>
    ),
  },
  {
    title: 'Retrieve, don’t recite',
    description: (
      <>Pull the specific, current facts into the window (a policy clause, a schema, the relevant
      ticket) instead of trusting the model to remember them. Grounding answers in supplied data is
      the single biggest defense against hallucination.</>
    ),
  },
  {
    title: 'Compress as you go',
    description: (
      <>Long sessions accumulate noise. Summarize the conversation into a tight running brief and
      carry the summary forward instead of the full transcript. Send function signatures, not whole
      files; the last 5 lines of an error, not 100.</>
    ),
  },
  {
    title: 'Structure for parsing',
    description: (
      <>Label every block so the model knows what it is reading: <em>&ldquo;User request:&rdquo;</em>,
      <em> &ldquo;Relevant policy:&rdquo;</em>, <em>&ldquo;Tool output:&rdquo;</em>. Use headings,
      lists, and clear delimiters. Provenance and hierarchy beat a wall of text.</>
    ),
  },
  {
    title: 'Externalize memory',
    description: (
      <>Write important facts and decisions to a persistent store (a notes file, a memory tool) and
      retrieve them when needed, rather than re-pasting everything into every turn.</>
    ),
  },
  {
    title: 'Decompose long tasks',
    description: (
      <>Break a monolithic request into focused steps, each with its own clean, minimal context. A
      pipeline of small well-fed prompts beats one giant prompt carrying everything at once.</>
    ),
  },
];

// Anthropic's six reversals for the Claude 5 generation.
const CLAUDE5_SHIFT = [
  {
    then: 'Give Claude rules',
    now: 'Let Claude use judgment',
    detail: 'Detailed prohibitions were written to compensate for weaker instruction-following. Newer models read intent and surrounding context well enough that rigid rules now fight their judgment instead of guiding it.',
  },
  {
    then: 'Give Claude examples',
    now: 'Design the interface',
    detail: 'Few-shot examples constrain the model to the exploration space they demonstrate. Expressive tool parameters and clear enum values now steer behavior better than a sample of it.',
  },
  {
    then: 'Put it all upfront',
    now: 'Use progressive disclosure',
    detail: 'Load context at the moment it is needed — via skills and deferred tool loading — instead of making one standing document carry every practice the model might need.',
  },
  {
    then: 'Repeat yourself',
    now: 'Simple tool descriptions',
    detail: 'Saying the same thing in the system prompt and again in a tool description is redundancy the model no longer needs. Usage guidance belongs in the tool definition, stated once.',
  },
  {
    then: 'Memory in CLAUDE.md',
    now: 'Auto-memory',
    detail: 'Claude now saves relevant memories on its own, rather than depending on a human to hand-edit a standing instructions file after every lesson learned.',
  },
  {
    then: 'Simple specs',
    now: 'Rich references',
    detail: 'A spec no longer has to be plain markdown. Point at HTML artifacts, real code, test suites, and rubrics — concrete references beat prose descriptions of the same thing.',
  },
];

const STACK = [
  {
    icon: Cpu,
    title: 'System prompt',
    desc: 'Product context and core operating parameters. Rarely touched by the end user — this is where builders should spend their time.',
  },
  {
    icon: BookText,
    title: 'CLAUDE.md / Project instructions',
    desc: 'Lightweight. What the repo or project is for, plus the gotchas a newcomer would trip on. Not a manual of everything Claude already knows.',
  },
  {
    icon: Layers,
    title: 'Skills',
    desc: 'Team-specific opinions and best practices, loaded only when the task calls for them. Use progressive disclosure for anything long.',
  },
  {
    icon: FileCode,
    title: 'References',
    desc: 'Files you point at on demand for in-depth specs. Prefer a code reference, mockup, or test over a paragraph describing it.',
  },
];

export default function ContextEngineeringPage() {
  return (
    <div>
      <TierBadge tier="intermediate" />
      <h1 className="mt-4 mb-4">Context Engineering</h1>
      <p className="mb-12 text-xl" style={{ color: 'var(--cw-ink-secondary)' }}>
        The next step beyond prompt engineering: designing <em>everything</em> the AI sees, not just
        the sentence you type.
      </p>

      {/* The Shift */}
      <section className="mb-16" data-tier="beginner">
        <div className="section-label">The Shift</div>
        <h2 className="mb-6">From clever sentences to information systems</h2>
        <p className="mb-6">
          Early on, getting good results from AI felt like a wording game &mdash; find the magic
          phrase and the model behaves. That skill, <Link href="/prompt-engineering" className="text-highlight" style={{ textDecoration: 'underline' }}>prompt engineering</Link>,
          still matters. But teams quickly learned that real, reliable results don&apos;t come from
          one perfect sentence. They come from putting the <strong>right information</strong> in front
          of the model at the right moment.
        </p>
        <p className="mb-8">
          That discipline is <strong>context engineering</strong>: dynamically assembling all the
          information an AI needs to plausibly succeed &mdash; instructions, data, examples, tools,
          and history &mdash; into the model&apos;s working memory for each request. The model&apos;s
          knowledge is fixed. What you control is the context, and output quality tracks the quality
          of that context almost one-for-one.
        </p>

        <Callout variant="purple">
          <p className="text-base italic" style={{ color: 'var(--cw-ink-secondary)' }}>
            &ldquo;If prompt engineering was about coming up with a magical sentence, context
            engineering is about writing the full screenplay for the AI.&rdquo;
          </p>
          <p className="text-sm mt-3" style={{ color: 'var(--cw-ink-muted)' }}>
            The term gained traction in 2025 through Andrej Karpathy and Shopify CEO Tobi L&uuml;tke,
            who framed it as <em>&ldquo;the art of providing all the context for the task to be
            plausibly solvable by the LLM.&rdquo;</em>
          </p>
        </Callout>
      </section>

      {/* Context vs Prompt Engineering — the key distinction */}
      <section className="mb-16" id="vs-prompt" data-tier="intermediate">
        <TierBadge tier="intermediate" />
        <div className="section-label mt-4">The Distinction</div>
        <h2 className="mb-4">Context engineering vs. prompt engineering</h2>
        <p className="mb-8">
          They&apos;re not rivals &mdash; prompt engineering is one ingredient <em>inside</em> context
          engineering. The difference is scope. One crafts the instruction; the other designs the
          whole environment the instruction lives in.
        </p>

        <CardGrid columns={2} className="mb-8">
          <div className="p-6 rounded-xl" style={{ background: 'rgba(74,111,165,0.08)', border: '1px solid rgba(74,111,165,0.18)' }}>
            <div className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--cw-info)' }}>Prompt Engineering</div>
            <h3 className="mb-2">Wording the request</h3>
            <p className="text-sm" style={{ color: 'var(--cw-ink-muted)' }}>
              Choosing the role, the task phrasing, the examples, and the output format for a single
              message. &ldquo;Programming in prose.&rdquo;
            </p>
          </div>
          <div className="p-6 rounded-xl" style={{ background: 'var(--cw-primary-light)', border: '1px solid rgba(107,45,139,0.18)' }}>
            <div className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--cw-primary)' }}>Context Engineering</div>
            <h3 className="mb-2">Designing the whole input</h3>
            <p className="text-sm" style={{ color: 'var(--cw-ink-muted)' }}>
              Orchestrating instructions, retrieved data, tool outputs, and history into the window &mdash;
              dynamically, per request. Systems thinking, not phrasing.
            </p>
          </div>
        </CardGrid>

        {/* Comparison table */}
        <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid var(--cw-border)' }}>
          <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--cw-surface)' }}>
                <th className="text-left p-4 font-semibold" style={{ color: 'var(--cw-ink-muted)', width: '22%' }}></th>
                <th className="text-left p-4 font-semibold" style={{ color: 'var(--cw-info)' }}>Prompt Engineering</th>
                <th className="text-left p-4 font-semibold" style={{ color: 'var(--cw-primary)' }}>Context Engineering</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row, i) => (
                <tr key={row.dimension} style={{ borderTop: '1px solid var(--cw-border)', background: i % 2 ? 'rgba(255,255,255,0.25)' : 'transparent' }}>
                  <td className="p-4 font-semibold align-top" style={{ color: 'var(--cw-ink-secondary)' }}>{row.dimension}</td>
                  <td className="p-4 align-top" style={{ color: 'var(--cw-ink-muted)' }}>{row.prompt}</td>
                  <td className="p-4 align-top" style={{ color: 'var(--cw-ink-secondary)' }}>{row.context}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Callout variant="sage" className="mt-8">
          <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
            <strong>The one-line takeaway:</strong> prompt engineering asks <em>&ldquo;what do I
            say?&rdquo;</em> &mdash; context engineering asks <em>&ldquo;what does the model need to
            see?&rdquo;</em> Master the first to write a great message; master the second to build
            something that works reliably.
          </p>
        </Callout>
      </section>

      {/* Mental model */}
      <section className="mb-16" id="mental-model" data-tier="intermediate">
        <div className="section-label">The Mental Model</div>
        <h2 className="mb-4">Think of the context window as RAM</h2>
        <div className="flex items-start gap-3 mb-6">
          <Cpu size={22} style={{ color: 'var(--cw-primary)', marginTop: 2 }} className="flex-shrink-0" />
          <p>
            Karpathy&apos;s framing: treat the model like a <strong>CPU</strong> and its context
            window like <strong>RAM</strong> &mdash; the limited working memory it can actively use.
            Your job is the operating system: load that working memory with exactly the right code and
            data for the task, and nothing that crowds it out. The same model produces wildly different
            output depending on what you load.
          </p>
        </div>

        <ContextLayers />

        <Callout variant="coral" className="mt-8">
          <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
            <strong>Watch for &ldquo;context rot.&rdquo;</strong> As a chat gets long, it fills with
            dead ends, corrections, and contradictions. Quality quietly degrades. The fix is the same
            as managing RAM: clear it out. Summarize what matters, start a fresh session, and reload
            only the essentials.
          </p>
        </Callout>
      </section>

      {/* Anatomy */}
      <section className="mb-16" id="anatomy" data-tier="intermediate">
        <div className="section-label">The Anatomy of Context</div>
        <h2 className="mb-6">Four kinds of information fill the window</h2>
        <p className="mb-8">
          Strong context balances all four. Lean too hard on instructions alone and the model lacks
          facts; dump in knowledge with no instructions and it lacks direction.
        </p>

        <CardGrid columns={2}>
          {ANATOMY.map(block => {
            const Icon = block.icon;
            return (
              <Card key={block.title}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'var(--cw-primary-light)' }}>
                    <Icon size={18} style={{ color: 'var(--cw-primary)' }} />
                  </span>
                  <h3>{block.title}</h3>
                </div>
                <p className="text-sm mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>{block.desc}</p>
                <ul className="space-y-1.5">
                  {block.items.map(item => (
                    <li key={item} className="text-sm flex items-start gap-2" style={{ color: 'var(--cw-ink-muted)' }}>
                      <span style={{ color: 'var(--cw-primary)' }}>&bull;</span> {item}
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </CardGrid>

        <Callout variant="blue" className="mt-8">
          <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
            <strong>One of these has changed.</strong> Few-shot examples and heavy guardrails were
            load-bearing on older models. On the newest ones they can <em>narrow</em> the answer
            rather than sharpen it &mdash; see{' '}
            <Link href="#claude5" className="text-highlight" style={{ textDecoration: 'underline' }}>The Claude 5 Shift</Link> below.
          </p>
        </Callout>
      </section>

      {/* Techniques */}
      <section className="mb-16" id="techniques" data-tier="expert">
        <TierBadge tier="expert" />
        <div className="section-label mt-4">The Practice</div>
        <h2 className="mb-4">Six techniques for managing context efficiently</h2>
        <p className="mb-8">
          Every technique serves one goal: keep the window dense with relevant signal and free of
          noise.
        </p>
        <StepList steps={TECHNIQUES} />
      </section>

      {/* The Claude 5 shift */}
      <section className="mb-16" id="claude5" data-tier="advanced">
        <TierBadge tier="advanced" />
        <div className="section-label mt-4">What Changed in 2026</div>
        <h2 className="mb-4">The Claude 5 shift: less scaffolding, better results</h2>
        <p className="mb-6">
          Everything above still holds &mdash; but the newest models changed <em>how much</em>{' '}
          instruction good context needs. When Anthropic tuned Claude Code for the Claude 5
          generation, they removed <strong>over 80% of its system prompt</strong> and measured{' '}
          <strong>no loss</strong> on their coding evaluations. Most of what came out wasn&apos;t
          information the model needed. It was scaffolding built to compensate for older models.
        </p>
        <p className="mb-8">
          Anthropic calls this <strong>&ldquo;unhobbling&rdquo;</strong>. Earlier guardrails were
          written to force a specific behavior; a model that reads intent well enough to make its
          own call now has to reconcile those rules with its own better judgment &mdash; and
          conflicting instructions make output worse, not safer.
        </p>

        <Callout variant="coral" className="mb-10">
          <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
            <strong>The rule that flipped.</strong> &ldquo;More instruction is safer&rdquo; was true
            when models needed the handholding. It isn&apos;t anymore. Over-specifying is now its
            own failure mode &mdash; the same category of mistake as stuffing the window with
            irrelevant documents.
          </p>
        </Callout>

        {/* Then / Now table */}
        <h3 className="mb-4">Six practices that reversed</h3>
        <div className="overflow-x-auto rounded-xl mb-10" style={{ border: '1px solid var(--cw-border)' }}>
          <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--cw-surface)' }}>
                <th className="text-left p-4 font-semibold" style={{ color: 'var(--cw-ink-muted)', width: '20%' }}>Then</th>
                <th className="text-left p-4 font-semibold" style={{ color: 'var(--cw-primary)', width: '22%' }}>Now</th>
                <th className="text-left p-4 font-semibold" style={{ color: 'var(--cw-ink-muted)' }}>Why it changed</th>
              </tr>
            </thead>
            <tbody>
              {CLAUDE5_SHIFT.map((row, i) => (
                <tr key={row.then} style={{ borderTop: '1px solid var(--cw-border)', background: i % 2 ? 'rgba(255,255,255,0.25)' : 'transparent' }}>
                  <td className="p-4 align-top" style={{ color: 'var(--cw-ink-muted)' }}>{row.then}</td>
                  <td className="p-4 font-semibold align-top" style={{ color: 'var(--cw-ink-secondary)' }}>{row.now}</td>
                  <td className="p-4 align-top" style={{ color: 'var(--cw-ink-muted)' }}>{row.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Concrete before/after */}
        <div className="flex items-start gap-3 mb-2">
          <Scale size={22} style={{ color: 'var(--cw-primary)', marginTop: 2 }} className="flex-shrink-0" />
          <h3>What &ldquo;rules &rarr; judgment&rdquo; looks like in practice</h3>
        </div>
        <p className="mb-2 text-sm" style={{ color: 'var(--cw-ink-muted)' }}>
          Anthropic&apos;s own instruction about code comments, before and after. The replacement is
          shorter, states the goal instead of the prohibition, and produces better output.
        </p>
        <CodeBlock
          title="Before — a rule to obey"
          code={`Default to writing no comments. Never write multi-paragraph
docstrings or multi-line comment blocks — one short line max.`}
        />
        <CodeBlock
          title="After — a standard to apply"
          code={`Write code that reads like the surrounding code:
match its comment density, naming, and idiom.`}
        />

        {/* The stack */}
        <h3 className="mt-10 mb-4">Where each piece of context belongs</h3>
        <p className="mb-6">
          Progressive disclosure only works if the layers have clear jobs. Anthropic&apos;s
          recommended split:
        </p>
        <CardGrid columns={2}>
          {STACK.map(layer => {
            const Icon = layer.icon;
            return (
              <Card key={layer.title}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'var(--cw-primary-light)' }}>
                    <Icon size={18} style={{ color: 'var(--cw-primary)' }} />
                  </span>
                  <h3>{layer.title}</h3>
                </div>
                <p className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>{layer.desc}</p>
              </Card>
            );
          })}
        </CardGrid>

        <Card className="mt-6">
          <div className="flex items-center gap-3 mb-2">
            <Stethoscope size={20} style={{ color: 'var(--cw-primary)' }} />
            <h3>Rightsizing what you already wrote</h3>
          </div>
          <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
            If you have a CLAUDE.md or a set of skills written for an older model, they are probably
            carrying instructions that no longer earn their tokens. Claude Code ships a{' '}
            <strong>/doctor</strong> command that reviews your skills and CLAUDE.md and helps trim
            them down for the newer models. Run it before you add anything else.
          </p>
        </Card>

        <Callout variant="sage" className="mt-8">
          <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
            <strong>If you don&apos;t write code, this still applies to you.</strong> The lesson
            translates directly to Projects and long chats: give Claude the facts, the goal, and the
            standard you&apos;re holding it to &mdash; then stop. A saved instruction block full of
            &ldquo;never do X&rdquo; and &ldquo;always phrase it like Y&rdquo; rules written for last
            year&apos;s model is now working against you. Prune it the same way you&apos;d prune a
            bloated context window.
          </p>
        </Callout>
      </section>

      {/* Latest Claude */}
      <section className="mb-16" id="claude" data-tier="advanced">
        <TierBadge tier="advanced" />
        <div className="section-label mt-4">In the Latest Claude</div>
        <h2 className="mb-4">Context engineering with today&apos;s Claude</h2>
        <p className="mb-8">
          The Claude 5 models (Opus 5, Sonnet 5, and Fable 5) and the Claude Developer Platform ship
          features built specifically to make context management easier. These turn the principles
          above into product capabilities.
        </p>

        <div className="space-y-6">
          <Card>
            <div className="flex items-center gap-3 mb-2">
              <FileStack size={20} style={{ color: 'var(--cw-primary)' }} />
              <h3>The 1M-token context window</h3>
              <TierBadge tier="advanced" size="sm" />
            </div>
            <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
              Opus 5, Sonnet 5, and Fable 5 all carry a <strong>1 million token</strong> window
              &mdash; and on these models it&apos;s the default, not a beta opt-in. That&apos;s large
              enough for entire codebases or document sets. But a bigger window raises the ceiling;
              it doesn&apos;t repeal the rules. Relevance and structure still decide quality. Use the
              room to include the <em>right</em> material, not all of it.
            </p>
          </Card>

          <Card>
            <div className="flex items-center gap-3 mb-2">
              <Search size={20} style={{ color: 'var(--cw-primary)' }} />
              <h3>Prompt caching</h3>
              <TierBadge tier="advanced" size="sm" />
            </div>
            <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
              Reuse a large, stable block of context &mdash; a system prompt, a knowledge base, a long
              document &mdash; across calls and Claude caches it. Cached reads cost roughly a tenth of
              fresh input, cutting cost up to ~90% and latency up to ~85% on long prompts. This makes
              it practical to give Claude rich background on <em>every</em> turn instead of trimming to
              save money.
            </p>
            <p className="text-base mt-3" style={{ color: 'var(--cw-ink-secondary)' }}>
              The catch is that caching is a <strong>prefix match</strong>: one changed byte anywhere
              early invalidates everything after it. Keep the stable content first and the volatile
              content (timestamps, the user&apos;s actual question) last. Writing to the cache costs a
              premium over normal input, so it pays off from about the second reuse onward &mdash;
              not on a one-off.
            </p>
          </Card>

          <Card>
            <div className="flex items-center gap-3 mb-2">
              <Scissors size={20} style={{ color: 'var(--cw-primary)' }} />
              <h3>Context editing &amp; the memory tool</h3>
              <TierBadge tier="advanced" size="sm" />
            </div>
            <p className="text-base mb-3" style={{ color: 'var(--cw-ink-secondary)' }}>
              For long-running agentic tasks, the platform automates the compress-and-externalize
              pattern:
            </p>
            <ul className="space-y-2 text-sm" style={{ color: 'var(--cw-ink-muted)' }}>
              <li className="flex items-start gap-2">
                <span style={{ color: 'var(--cw-primary)' }}>&bull;</span>
                <span><strong>Context editing</strong> automatically clears stale tool results as the
                window fills &mdash; warning Claude first so it can save anything important.</span>
              </li>
              <li className="flex items-start gap-2">
                <span style={{ color: 'var(--cw-primary)' }}>&bull;</span>
                <span><strong>Compaction</strong> automates &ldquo;compress as you go&rdquo; &mdash; when a
                conversation approaches the window limit, earlier turns are summarized server-side and
                the summary carries forward in their place.</span>
              </li>
              <li className="flex items-start gap-2">
                <span style={{ color: 'var(--cw-primary)' }}>&bull;</span>
                <span><strong>The memory tool</strong> lets Claude read and write files in a persistent
                memory directory, building knowledge that survives across sessions instead of living in
                the window.</span>
              </li>
            </ul>
          </Card>

          <Card>
            <div className="flex items-center gap-3 mb-2">
              <Sparkles size={20} style={{ color: 'var(--cw-primary)' }} />
              <h3>Project knowledge &amp; persistent instructions</h3>
              <TierBadge tier="intermediate" size="sm" />
            </div>
            <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
              You don&apos;t need the API to do this. In the Claude apps, <strong>Projects</strong> let
              you attach reference documents and custom instructions that ride along with every chat.
              In Claude Code, a <strong>CLAUDE.md</strong> file feeds standing context into each
              session automatically. Both are context engineering: curating what Claude sees by default
              so you stop re-explaining yourself.
            </p>
            <p className="text-base mt-3" style={{ color: 'var(--cw-ink-secondary)' }}>
              Keep both <em>lean</em>. Claude now records relevant memories on its own, so these files
              no longer need to be the hand-maintained log of everything it should remember &mdash;
              they work best holding the things it genuinely couldn&apos;t infer: what the project is
              for, and the gotchas that would trip up someone new.
            </p>
          </Card>
        </div>

        <div className="mt-8 p-5 rounded-xl text-sm" style={{ background: 'var(--cw-surface)', border: '1px solid var(--cw-border)' }}>
          <div className="font-semibold mb-2" style={{ color: 'var(--cw-ink-secondary)' }}>Sources &amp; further reading</div>
          <ul className="space-y-1" style={{ color: 'var(--cw-ink-muted)' }}>
            <li>&bull; Anthropic, <a href="https://claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cw-primary)', textDecoration: 'underline' }}>&ldquo;The New Rules of Context Engineering for Claude 5 Generation Models&rdquo;</a> &mdash; the source for The Claude 5 Shift section</li>
            <li>&bull; Addy Osmani, <a href="https://addyo.substack.com/p/context-engineering-bringing-engineering" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cw-primary)', textDecoration: 'underline' }}>&ldquo;Context Engineering: Bringing Engineering Discipline to Prompts&rdquo;</a></li>
            <li>&bull; Anthropic, <a href="https://www.anthropic.com/news/context-management" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cw-primary)', textDecoration: 'underline' }}>Managing context on the Claude Developer Platform</a></li>
            <li>&bull; Anthropic, <a href="https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cw-primary)', textDecoration: 'underline' }}>Prompt caching</a> &amp; <a href="https://docs.claude.com/en/docs/agents-and-tools/tool-use/memory-tool" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cw-primary)', textDecoration: 'underline' }}>Memory tool</a> docs</li>
          </ul>
        </div>
      </section>

      {/* Putting it to work */}
      <section className="mb-16" id="practice" data-tier="beginner">
        <div className="section-label">At Cover Whale</div>
        <h2 className="mb-6">Putting it to work</h2>
        <p className="mb-8">
          You&apos;re already doing context engineering whenever you paste a submission summary, an
          email thread, or a guideline into a chat. Do it deliberately:
        </p>

        <CardGrid columns={2}>
          <Card>
            <h3 className="mb-2">Lead with the relevant facts</h3>
            <p className="text-sm" style={{ color: 'var(--cw-ink-muted)' }}>
              Paste the actual policy language, loss history, or guideline &mdash; generalized for
              safety &mdash; instead of hoping the model recalls it. Grounded answers beat confident
              guesses.
            </p>
          </Card>
          <Card>
            <h3 className="mb-2">Build a reusable brief</h3>
            <p className="text-sm" style={{ color: 'var(--cw-ink-muted)' }}>
              Keep a saved block describing your role, your book, and your standards. Drop it in at the
              top of a chat (or save it as a Project) so every conversation starts informed.
            </p>
          </Card>
          <Card>
            <h3 className="mb-2">Refresh long chats</h3>
            <p className="text-sm" style={{ color: 'var(--cw-ink-muted)' }}>
              When a thread gets messy or starts repeating itself, ask for a summary, then start fresh
              with that summary. You&apos;ll get sharper answers and faster responses.
            </p>
          </Card>
          <Card>
            <h3 className="mb-2">Never paste raw PII</h3>
            <p className="text-sm" style={{ color: 'var(--cw-ink-muted)' }}>
              Context engineering is about the <em>right</em> information &mdash; which never includes
              real names, DOT numbers, or policy numbers. Generalize first. See the{' '}
              <Link href="/prompt-engineering#pii" className="text-highlight" style={{ textDecoration: 'underline' }}>PII Safety</Link> guide.
            </p>
          </Card>
        </CardGrid>
      </section>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8 mt-8" style={{ borderTop: '1px solid var(--cw-border)' }}>
        <Link
          href="/prompt-builder"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all pill-btn"
        >
          <ArrowLeft size={16} /> Prompt Builder
        </Link>
        <Link
          href="/agentic-ai"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:gap-3"
          style={{ background: 'var(--cw-primary)', color: '#fff' }}
        >
          Next: Agentic AI <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import {
  ArrowLeft, ArrowRight, BookText, Database, Wrench, History,
  Scissors, FileStack, Cpu, Search, Sparkles,
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

      {/* Latest Claude */}
      <section className="mb-16" id="claude" data-tier="advanced">
        <TierBadge tier="advanced" />
        <div className="section-label mt-4">In the Latest Claude</div>
        <h2 className="mb-4">Context engineering with today&apos;s Claude</h2>
        <p className="mb-8">
          The newest Claude models (Opus 4.8, Sonnet 4.6) and the Claude Developer Platform ship
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
              Opus 4.8 and Sonnet 4.6 support up to a <strong>1 million token</strong> window (beta,
              via the API) &mdash; large enough for entire codebases or document sets. A bigger window
              raises the ceiling, but it doesn&apos;t repeal the rules: relevance and structure still
              decide quality. Use the room to include the <em>right</em> material, not all of it.
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
          </Card>
        </div>

        <div className="mt-8 p-5 rounded-xl text-sm" style={{ background: 'var(--cw-surface)', border: '1px solid var(--cw-border)' }}>
          <div className="font-semibold mb-2" style={{ color: 'var(--cw-ink-secondary)' }}>Sources &amp; further reading</div>
          <ul className="space-y-1" style={{ color: 'var(--cw-ink-muted)' }}>
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

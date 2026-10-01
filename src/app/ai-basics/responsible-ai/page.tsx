'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Callout } from '@/components/content/Callout';
import { CodeBlock } from '@/components/content/CodeBlock';
import { StepList } from '@/components/content/StepList';
import { TierBadge } from '@/components/content/TierBadge';
import { QuizBlock } from '@/components/interactive/QuizBlock';
import { AUP_REPORT_EMAIL } from '@/lib/constants';

const REVIEW_CHECKS = [
  {
    title: 'Did it answer the question you actually asked?',
    description: 'AI answers the most likely version of your question. Check it did not quietly answer a nearby, easier one.',
  },
  {
    title: 'Can you trace every fact and number?',
    description: 'Tie each one to a source you trust: the Metabase report it names, the policy record, the Agent Resource Center article. If you cannot trace it, do not use it.',
  },
  {
    title: 'What did it leave out?',
    description: 'Ask Claude what it is unsure about and what it assumed. The Reality Filter in Prompt Engineering makes it mark what it sourced, what it inferred and what it does not know.',
  },
  {
    title: 'Would you sign your name to it?',
    description: 'Accuracy, tone and audience are yours once you send it. "The AI wrote it" is not a defense.',
  },
  {
    title: 'Is this a regulated decision?',
    description: 'For underwriting, pricing, claims and HR screening, a licensed professional makes the call and documents why. AI can recommend; it is never the sole basis for an adverse action.',
  },
];

const SPLIT = [
  { ai: 'Gathers, drafts and summarizes', sme: 'Supplies the context only you have' },
  { ai: 'Finds patterns in what you give it', sme: 'Knows which patterns matter here' },
  { ai: 'Answers in seconds', sme: 'Knows what a right answer looks like' },
  { ai: 'Sounds confident either way', sme: 'Checks it against the system of record' },
  { ai: 'Is never accountable', sme: 'Owns the decision and the outcome' },
];

const STRESS_TEST_PROMPT = `I am about to propose the plan below to my team.

Act as a thoughtful skeptic who knows our industry. Give me:
1. The strongest case against this plan
2. The risks I have not addressed
3. The assumptions I have not tested
4. The questions my team is most likely to ask

Be specific. Do not soften it.

[paste your plan]`;

const QUIZ_QUESTIONS = [
  {
    question:
      'The CW Data Bot gives you a premium figure for a report you know well, and the number looks off. What do you do?',
    options: [
      'Use it anyway. The bot reads the data warehouse, so it must be right',
      'Check it against the report the bot names, mark the answer wrong, and post the miss with the right answer',
      'Ask the same question again until the number looks right',
      'Stop using the bot',
    ],
    correctIndex: 1,
    explanation:
      'You are the subject matter expert in that moment. Checking against the named source catches the error, and reporting it is how the tool gets better for everyone. A confidently wrong answer is the most valuable thing you can report.',
  },
  {
    question: 'Claude drafts an underwriting recommendation. Who owns the decision?',
    options: [
      'Claude, because it did the analysis',
      'Whoever built the tool',
      'The licensed underwriter who reviews it, accepts it and documents the reasons',
      'Nobody, as long as it is labeled AI-assisted',
    ],
    correctIndex: 2,
    explanation:
      'AI can recommend, but a licensed professional makes regulated decisions and is accountable for them. The AI Acceptable Use Policy is explicit: AI is never the sole basis for an adverse action.',
  },
  {
    question: 'What does "AI-assisted" mean at Cover Whale?',
    options: [
      'The AI produced it and it is ready to send',
      'AI did some of the drafting or analysis, and a person who knows the subject checked it and owns it',
      'It is exempt from review because a tool was used',
      'Only engineers used AI on it',
    ],
    correctIndex: 1,
    explanation:
      'AI-assisted describes a partnership, not a hand-off. The assist is the speed; the person with subject knowledge supplies the judgment and the accountability.',
  },
  {
    question: 'You are about to announce a process change to your team. What is the best use of AI?',
    options: [
      'Have AI write the announcement and send it right away',
      'Ask AI for the strongest objections first, then talk to the people affected, then decide',
      'Skip AI. Process changes are not an AI task',
      'Ask AI whether the team will like it',
    ],
    correctIndex: 1,
    explanation:
      'Stress-testing with AI surfaces general categories of concern. Only the people affected can tell you which ones matter most to them. Think with AI, then listen, then announce.',
  },
  {
    question: 'An anonymous, AI-written critique of your plan starts circulating. What is the most useful response?',
    options: [
      'Find out who wrote it',
      'Dismiss it, since an AI wrote it',
      'Judge the points on their merits, and ask yourself why someone did not feel able to raise them directly',
      'Ban AI-written documents',
    ],
    correctIndex: 2,
    explanation:
      'A concern that arrives through AI is a signal about the concern and about how safe people feel raising it. Curiosity reads that signal; defensiveness confirms the reason the workaround was needed.',
  },
];

export default function ResponsibleAIPage() {
  return (
    <div>
      <TierBadge tier="beginner" />
      <h1 className="mt-4 mb-4">Using AI Responsibly</h1>
      <p className="mb-6">
        AI-assisted, human-owned. How to review what AI gives you, and why the subject matter expert
        is the most important part of every AI tool we use.
      </p>

      <Callout variant="purple" className="mb-12">
        <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
          <strong>The one rule:</strong> every AI output is a draft until a person who knows the
          subject has checked it. The AI Acceptable Use Policy calls this keeping a human in the loop:
          a qualified person reviews and accepts the output before anything is sent, posted or acted
          on. You are the loop.
        </p>
      </Callout>

      {/* Section: Review */}
      <section className="mb-16" id="review">
        <div className="section-label">Review Every Answer</div>
        <h2 className="mb-4">
          Confident and wrong <span className="text-highlight">look the same</span>
        </h2>
        <p className="mb-6">
          AI is a{' '}
          <Link href="/ai-basics/core-concepts" className="text-highlight underline">prediction engine</Link>
          : it writes the most likely-sounding answer, not a checked one. That is why it can invent a
          citation, give a number that does not tie to the report, or leave out the one inconvenient
          fact, all in the same calm tone as a correct answer. Five checks before you use anything it
          gives you:
        </p>

        <StepList steps={REVIEW_CHECKS} />
      </section>

      {/* Section: SME */}
      <section className="mb-16" id="sme">
        <div className="section-label">The Role of the SME</div>
        <h2 className="mb-4">
          What <span className="text-highlight">AI-assisted</span> really means
        </h2>
        <p className="mb-6">
          AI-assisted means AI did some of the gathering, drafting or analysis, and a subject matter
          expert supplied the context, checked the result and owns the outcome. The subject matter
          expert, or SME, is whoever knows the work best: the underwriter on a submission, the adjuster
          on a claim, the analyst on a report. On most days, that is you.
        </p>

        <div className="overflow-x-auto max-w-3xl mb-6">
          <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--cw-border)' }}>
                <th className="text-left py-2 pr-4">AI does</th>
                <th className="text-left py-2">The SME does</th>
              </tr>
            </thead>
            <tbody>
              {SPLIT.map(row => (
                <tr key={row.ai} style={{ borderBottom: '1px solid var(--cw-border)' }}>
                  <td className="py-2 pr-4">{row.ai}</td>
                  <td className="py-2 font-semibold">{row.sme}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mb-6">
          Writing in Harvard Business Review, Jayshree Seth and Amy C. Edmondson make the same point
          about using AI to test decisions: a general-purpose AI tool surfaces general patterns, a
          useful start but no substitute for what your organization actually knows. In their example
          from 3M, AI did not give a scientist marketing expertise. It gave them a structured way to
          ask good questions in a field outside their own. The expertise stayed human.
        </p>

        <h3 className="mb-3">How SMEs keep our tools honest</h3>
        <p className="mb-4">
          Cover Whale&apos;s tools are only as good as the knowledge teams put into them, and only as
          safe as the review their answers get. The CW Data Bot was built from champions&apos; own
          reports, questions and business terms, and they tested it by marking every answer right or
          wrong. When you use a Cover Whale tool:
        </p>
        <ul className="list-disc pl-6 space-y-1.5 mb-6 max-w-3xl" style={{ color: 'var(--cw-ink-secondary)' }}>
          <li>Check the source it names: the report and card number, or the Agent Resource Center article and its last-updated date.</li>
          <li>Mark answers right or wrong where the tool asks you to.</li>
          <li>Report misses in the tool&apos;s channel, with what the right answer should have been. A confidently wrong answer is the most useful thing you can find.</li>
        </ul>
      </section>

      {/* Section: Think with AI */}
      <section className="mb-16" id="think-then-talk">
        <div className="section-label">Better Decisions, Not Just Faster Ones</div>
        <h2 className="mb-4">
          Think with AI, then <span className="text-highlight">talk to people</span>
        </h2>
        <p className="mb-6">
          The same HBR article looks at how people use AI to raise concerns they do not feel able to
          raise themselves, and at what leaders can learn from that. Three habits from it are worth
          keeping, whatever your role.
        </p>

        <h3 className="mb-3">1. Stress-test your own thinking first</h3>
        <p className="mb-4">
          Before you share a plan, ask Claude to argue against it. Asking for the strongest objections
          before you announce anything means the hard questions get faced early, and it shows your team
          you want to hear them.
        </p>
        <CodeBlock code={STRESS_TEST_PROMPT} language="text" title="Stress-test prompt" />

        <h3 className="mt-8 mb-3">2. Then listen to the people affected</h3>
        <p className="mb-4">
          AI can name general categories of concern. Only the people doing the work can tell you which
          ones matter most to them, and why. A stress test you run and then ignore is worse than none.
        </p>
        <Callout variant="sage" className="mb-6">
          <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
            <em>&ldquo;Think with AI, then listen to people, then announce.&rdquo;</em>
            <br />
            <span className="text-sm" style={{ color: 'var(--cw-ink-muted)' }}>
              Jayshree Seth and Amy C. Edmondson, &ldquo;What Leaders Need to Know About AI and
              Psychological Safety,&rdquo; Harvard Business Review, September 17, 2026
            </span>
          </p>
        </Callout>

        <h3 className="mb-3">3. Treat an AI-surfaced concern as a signal</h3>
        <p className="mb-4">
          If a concern reaches you through AI, such as an AI-written critique of a decision, judge the
          points on their merits and get curious about why nobody raised them directly. Responding
          defensively teaches people not to speak up. And if you use AI to find the words for a
          concern of your own, still own it: our Claude plan keeps an audit trail, so a prompt is never
          as anonymous as it feels.
        </p>
      </section>

      {/* Section: Label and protect */}
      <section className="mb-16" id="label-and-protect">
        <div className="section-label">Label It, Protect It</div>
        <h2 className="mb-4">
          Say when AI helped, and <span className="text-highlight">guard the data</span>
        </h2>
        <ul className="list-disc pl-6 space-y-2 mb-6 max-w-3xl" style={{ color: 'var(--cw-ink-secondary)' }}>
          <li>
            <strong>Disclose it where it is required.</strong> Content shared outside Cover Whale that
            was materially AI-assisted carries a disclosure when law or policy requires one, and
            engineers tag AI-generated code in version control. Inside Cover Whale, a line like
            &ldquo;Drafted with Claude, reviewed by Jordan&rdquo; is good practice.
          </li>
          <li>
            <strong>Never paste passwords, API keys or other credentials</strong> into any AI tool.
          </li>
          <li>
            <strong>Keep customer and claim data in the tools approved for it</strong>, and share only
            what the task needs. See{' '}
            <Link href="/prompt-engineering#pii" className="text-highlight underline">PII Safety</Link>.
          </li>
          <li>
            <strong>Something went wrong?</strong> Report it to {AUP_REPORT_EMAIL} the same day.
            Good-faith reports are protected, and speed matters more than polish.
          </li>
        </ul>
      </section>

      {/* Section: Quiz */}
      <section className="mb-16" id="check">
        <div className="section-label">Check Yourself</div>
        <h2 className="mb-6">
          Responsible use, <span className="text-highlight">in practice</span>
        </h2>
        <QuizBlock title="Using AI Responsibly" questions={QUIZ_QUESTIONS} />
      </section>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8 mt-8" style={{ borderTop: '1px solid var(--cw-border)' }}>
        <Link
          href="/ai-basics/how-we-got-here"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all pill-btn"
        >
          <ArrowLeft size={16} /> How We Got Here
        </Link>
        <Link
          href="/prompt-engineering"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:gap-3"
          style={{ background: 'var(--cw-primary)', color: '#fff' }}
        >
          Next: Prompt Engineering <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

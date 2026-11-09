'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, CircleCheck, CircleX, FileText } from 'lucide-react';
import { Card, CardGrid } from '@/components/content/Card';
import { Callout } from '@/components/content/Callout';
import { ClaudePlanNotice } from '@/components/content/ClaudePlanNotice';
import { StepList } from '@/components/content/StepList';
import { Tabs } from '@/components/content/Tabs';
import { TierBadge } from '@/components/content/TierBadge';
import {
  AI_HELP_CONTACT,
  AUP_REPORT_EMAIL,
  CHATGPT_END_DATE,
  CHATGPT_SOP,
  CLAUDE_PLAN,
  CLAUDE_PLAN_WORKSPACE,
  LEGACY_CLAUDE_PLAN,
} from '@/lib/constants';

const PHASES = ['Memory', 'Instructions', 'Projects', 'Custom GPTs', 'Chats'];

const SIDE_BY_SIDE = [
  { saved: 'The list ChatGPT kept about you (memory)', claude: 'Memory', how: <>Settings &gt; Your Claude &gt; <strong>Start import</strong></> },
  { saved: 'Your custom instructions', claude: 'Instructions', how: <>Settings &gt; Your Claude &gt; Instructions (called <strong>Instructions for Claude</strong> in the older layout)</> },
  { saved: 'Project instructions and files', claude: 'A Claude project', how: 'Rebuild once, then share' },
  { saved: 'A custom GPT’s instructions and files', claude: 'A Claude project, or a skill', how: 'Rebuild once, then share' },
  { saved: 'Chat summaries or copies', claude: 'A new chat, or project knowledge', how: 'Paste' },
];

const OKAY = [
  `Claude on the ${CLAUDE_PLAN}: chat, Cowork and Claude Code`,
  'Cover Whale custom skills (type / in Claude) and Claude in the Slack channels set up for it',
  'Other tools on the approved list in the AI Acceptable Use Policy, used with your Cover Whale account',
];

const NOT_OKAY = [
  `ChatGPT for Cover Whale work after ${CHATGPT_END_DATE}, on any account`,
  'Personal or free AI accounts for work: personal ChatGPT, Gemini or Claude',
  'Browser add-ons or outside websites that export your ChatGPT chats',
  'AI browser extensions, and DeepSeek or other Chinese-origin AI tools',
  'Any AI tool that is not on the approved list and has not been reported',
];

export default function MovingFromChatGPTPage() {
  return (
    <div>
      <TierBadge tier="beginner" />
      <h1 className="mt-4 mb-4">Moving from ChatGPT to Claude</h1>
      <p className="mb-6">
        <strong>ChatGPT has ended: here is where to put what you saved.</strong> Cover Whale&apos;s
        ChatGPT for Business subscription ended on <strong>{CHATGPT_END_DATE}</strong>, and ChatGPT
        is blocked on company devices. This page shows where each thing you kept from ChatGPT goes
        in Claude, the AI assistant Cover Whale uses.
      </p>

      <Callout variant="warning" className="mb-6">
        <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
          <strong>ChatGPT can no longer be reached.</strong> Anything you did not copy out before{' '}
          {CHATGPT_END_DATE} is gone, so work from your own saved copies and notes. Didn&apos;t save
          something you need? Rebuild it in Claude from memory; the steps below still apply.
        </p>
      </Callout>

      <Card className="mb-12">
        <div className="flex items-start gap-4">
          <FileText size={22} className="flex-shrink-0 mt-1" style={{ color: 'var(--cw-primary)' }} />
          <div>
            <h3 className="mb-2">The full procedure, with screenshots</h3>
            <p className="text-base mb-3" style={{ color: 'var(--cw-ink-secondary)' }}>
              This page is the short version of the standard operating procedure{' '}
              <strong>
                {CHATGPT_SOP.id} {CHATGPT_SOP.title}
              </strong>
              , which shows where to click at every step.
            </p>
            <a
              href={CHATGPT_SOP.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline"
              style={{ color: 'var(--cw-primary)' }}
            >
              Open the SOP in Google Drive
            </a>
            <p className="text-sm mt-3" style={{ color: 'var(--cw-ink-muted)' }}>
              Do every step on the {CLAUDE_PLAN}. Where the SOP mentions the {LEGACY_CLAUDE_PLAN}{' '}
              account, use {CLAUDE_PLAN_WORKSPACE} instead. The SOP&apos;s steps inside ChatGPT no
              longer apply.
            </p>
          </div>
        </div>
      </Card>

      {/* Section: Which Claude */}
      <section className="mb-16" id="which-claude">
        <div className="section-label">Before You Start</div>
        <h2 className="mb-4">
          Sign in to the <span className="text-highlight">right Claude</span>
        </h2>
        <p className="mb-6">
          Everything here works in Claude in a web browser at claude.ai, and in the Claude desktop
          app. Have your saved copies of instructions, files and notes to hand.
        </p>
        <ClaudePlanNotice />
      </section>

      {/* Section: Side by side */}
      <section className="mb-16" id="side-by-side">
        <div className="section-label">What Goes Where</div>
        <h2 className="mb-4">
          What you saved, and <span className="text-highlight">where it goes</span>
        </h2>
        <p className="mb-6">
          Five kinds of things may have come with you. Do them in any order, one at a time, and skip
          any you did not save.
        </p>

        <div className="overflow-x-auto max-w-3xl">
          <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--cw-border)' }}>
                <th className="text-left py-2 pr-4">What you saved</th>
                <th className="text-left py-2 pr-4">In Claude</th>
                <th className="text-left py-2">How</th>
              </tr>
            </thead>
            <tbody>
              {SIDE_BY_SIDE.map(row => (
                <tr key={row.saved} style={{ borderBottom: '1px solid var(--cw-border)' }}>
                  <td className="py-2 pr-4 font-semibold">{row.saved}</td>
                  <td className="py-2 pr-4">{row.claude}</td>
                  <td className="py-2">{row.how}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm mt-4" style={{ color: 'var(--cw-ink-muted)' }}>
          Relied on ChatGPT scheduled tasks or connected apps? Contact {AI_HELP_CONTACT.name}{' '}
          ({AI_HELP_CONTACT.email}) about the Claude equivalent.
        </p>
      </section>

      {/* Section: Steps */}
      <section className="mb-16" id="steps">
        <div className="section-label">Step by Step</div>
        <h2 className="mb-6">
          Put it in Claude, <span className="text-highlight">one thing at a time</span>
        </h2>

        <Tabs tabs={PHASES}>
          {{
            Memory: (
              <>
                <p className="mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
                  If you saved the list of what ChatGPT remembered about you, Claude can import it.
                </p>
                <StepList
                  steps={[
                    { title: 'Read the list before it goes anywhere', description: 'Delete anything wrong, out of date or private. Leave out passwords and other people’s details.' },
                    { title: 'Open the import', description: <>In Claude, click your initials in the lower-left corner, then <strong>Settings</strong>, then <strong>Your Claude</strong>, and select <strong>Start import</strong>.</> },
                    { title: 'Add it to Claude', description: <>Paste the list into the text box and click <strong>Add to memory</strong>. Claude saves it as separate memory entries you can review.</> },
                  ]}
                />
                <p className="text-sm mt-4" style={{ color: 'var(--cw-ink-muted)' }}>
                  Didn&apos;t save it? Write a few lines about your role and how you like answers,
                  and put them in your Instructions (see the next tab).
                </p>
              </>
            ),
            Instructions: (
              <>
                <p className="mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
                  If you ever told ChatGPT how to answer you, like &ldquo;keep it short&rdquo; or
                  &ldquo;I work in claims,&rdquo; and kept a copy, those words move to Claude as they
                  are.
                </p>
                <StepList
                  steps={[
                    { title: 'Open your instructions in Claude', description: <>Click your initials in the lower-left corner, then <strong>Settings</strong>, then <strong>Your Claude</strong>.</> },
                    { title: 'Paste them in', description: <>Paste under <strong>Instructions</strong> (called <strong>Instructions for Claude</strong> in the older layout). Claude uses these in every conversation.</> },
                  ]}
                />
              </>
            ),
            Projects: (
              <>
                <p className="mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
                  Do this once per project you saved. Shared projects are rebuilt once by their owner
                  and shared, so teammates do not each rebuild the same one.
                </p>
                <StepList
                  steps={[
                    { title: 'Create the project', description: <>Click <strong>Projects</strong> in the left-side menu, then <strong>+ New Project</strong>. Name it and choose <strong>Keep it private</strong> or <strong>Share with your broader organization</strong>.</> },
                    { title: 'Add the instructions', description: <>Click <strong>Set project instructions</strong>, paste, then click <strong>Save instructions</strong>.</> },
                    { title: 'Add the files', description: <>Click the <strong>+</strong> button in the project knowledge area on the right and upload your files, or paste notes as text.</> },
                  ]}
                />
              </>
            ),
            'Custom GPTs': (
              <>
                <p className="mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
                  Claude has no GPTs. If you saved a GPT&apos;s instructions and files, a Claude
                  project does the same job, with saved instructions and reference files ready every
                  time you start a chat. If the GPT did one repeatable task, a{' '}
                  <Link href="/agentic-ai/skills" className="text-highlight underline">skill</Link>{' '}
                  can work better.
                </p>
                <StepList
                  steps={[
                    { title: 'Rebuild it as a project', description: 'In Claude, create a project named after the GPT and add the instructions and files, as in the Projects steps.' },
                    { title: 'Share it', description: <>Share the project with everyone who used the GPT: choose <strong>Share with your broader organization</strong> when you create it, or click <strong>Share project</strong> next to the project name.</> },
                  ]}
                />
              </>
            ),
            Chats: (
              <>
                <p className="mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
                  If you saved a summary or a copy of a chat you still need, carry it on in Claude.
                </p>
                <StepList
                  steps={[
                    { title: 'Carry it on in a chat', description: 'Paste the summary into a new Claude chat and keep going from there.' },
                    { title: 'Keep it with a project', description: <>Open the project and click the <strong>+</strong> button in the project knowledge area to add it as a file or as text.</> },
                  ]}
                />
              </>
            ),
          }}
        </Tabs>

        <Callout variant="sage" className="mt-6">
          <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
            <strong>Check your work.</strong> After each step, look in Claude: the import shows in
            your memory, your instructions are saved, and your files are listed in the project.
          </p>
        </Callout>
      </section>

      {/* Section: What's okay */}
      <section className="mb-16" id="okay">
        <div className="section-label">The Rules Still Apply</div>
        <h2 className="mb-4">
          What is okay to use <span className="text-highlight">now</span>
        </h2>
        <p className="mb-6">
          With the Cover Whale ChatGPT workspace closed, there is no approved way to use ChatGPT for
          work: the AI Acceptable Use Policy allowed ChatGPT only inside that workspace, and personal
          accounts are prohibited. Using an AI tool for work that is not approved and not reported is
          what the policy calls <strong>Shadow AI</strong>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
          <div className="p-6 rounded-2xl" style={{ background: 'var(--cw-surface)', border: '1px solid var(--cw-border)' }}>
            <h3 className="mb-3 text-base">Okay</h3>
            <ul className="space-y-2">
              {OKAY.map(item => (
                <li key={item} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
                  <CircleCheck size={15} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--cw-success)' }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-6 rounded-2xl" style={{ background: 'var(--cw-surface)', border: '1px solid var(--cw-border)' }}>
            <h3 className="mb-3 text-base">Not okay</h3>
            <ul className="space-y-2">
              {NOT_OKAY.map(item => (
                <li key={item} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
                  <CircleX size={15} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--cw-warning)' }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Callout variant="blue" className="mt-6">
          <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
            <strong>Where the policy lives.</strong> The AI Acceptable Use Policy, with its approved and
            prohibited tool lists, is in HiBob, where you read and confirm it. Not sure about a tool?
            Email <strong>{AUP_REPORT_EMAIL}</strong> before you use it. Never paste passwords or
            login details into any AI tool.
          </p>
        </Callout>
      </section>

      {/* Section: Help */}
      <section className="mb-16" id="help">
        <div className="section-label">Need a Hand?</div>
        <h2 className="mb-6">Getting help</h2>
        <CardGrid columns={2}>
          <Card>
            <h4 className="mb-2">Sign-in, the desktop app, or anything not covered here</h4>
            <p className="text-sm" style={{ color: 'var(--cw-ink-muted)' }}>
              Contact {AI_HELP_CONTACT.name} ({AI_HELP_CONTACT.email}).
            </p>
          </Card>
          <Card>
            <h4 className="mb-2">New to Claude?</h4>
            <p className="text-sm" style={{ color: 'var(--cw-ink-muted)' }}>
              Start with{' '}
              <Link href="/choose-your-claude" className="text-highlight underline">Choose Your Claude</Link>{' '}
              to find the right way to work, then{' '}
              <Link href="/prompt-engineering" className="text-highlight underline">Prompt Engineering</Link>.
            </p>
          </Card>
        </CardGrid>
      </section>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8 mt-8" style={{ borderTop: '1px solid var(--cw-border)' }}>
        <Link
          href="/context-engineering"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all pill-btn"
        >
          <ArrowLeft size={16} /> Context Engineering
        </Link>
        <Link
          href="/claude-cowork"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:gap-3"
          style={{ background: 'var(--cw-primary)', color: '#fff' }}
        >
          Next: The Claude App <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

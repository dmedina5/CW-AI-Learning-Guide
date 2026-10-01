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

const PHASES = ['Memory', 'Custom instructions', 'Projects', 'Custom GPTs', 'Chats', 'Cowork (optional)'];

const SUMMARY_PROMPT =
  'Summarize this whole conversation so I can pick it up somewhere else. Include what I was trying to do, what we decided, key facts and numbers, and anything still open. Write it as plain notes.';

const SIDE_BY_SIDE = [
  { chatgpt: 'Memory', claude: 'Memory', who: 'Everyone', how: 'Claude’s built-in import' },
  { chatgpt: 'Custom instructions', claude: 'Instructions for Claude', who: 'Everyone who set them', how: 'Copy and paste' },
  { chatgpt: 'Projects', claude: 'Projects', who: 'The project owner, once', how: 'Rebuild, then share' },
  { chatgpt: 'Custom GPTs', claude: 'A Claude project', who: 'The person who built the GPT', how: 'Rebuild, then share' },
  { chatgpt: 'Chats you still need', claude: 'A summary in a new chat', who: 'Everyone', how: 'Ask ChatGPT for a summary' },
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
        Cover Whale&apos;s ChatGPT for Business subscription ends on{' '}
        <strong>{CHATGPT_END_DATE}</strong>, and ChatGPT is blocked on company devices after that.
        This page walks you through moving the ChatGPT work you still need into Claude, the AI
        assistant Cover Whale uses.
      </p>

      <Callout variant="warning" className="mb-6">
        <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
          <strong>Finish before {CHATGPT_END_DATE}.</strong> Our ChatGPT plan has no way to download
          everything at once, so each move is a short copy-and-paste job. Anything you have not
          moved by then cannot be reached once the subscription ends.
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
              account, use {CLAUDE_PLAN_WORKSPACE} instead.
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
          Phases one to five happen in Claude in a web browser at claude.ai. The last, optional
          phase needs the Claude desktop app for Mac or Windows. Have your own copies of any files you
          added to ChatGPT projects or GPTs.
        </p>
        <ClaudePlanNotice />
      </section>

      {/* Section: Side by side */}
      <section className="mb-16" id="side-by-side">
        <div className="section-label">What Moves</div>
        <h2 className="mb-4">
          ChatGPT and Claude, <span className="text-highlight">side by side</span>
        </h2>
        <p className="mb-6">
          Five things can come with you. Do them in any order, one at a time, and skip any that do
          not apply to you.
        </p>

        <div className="overflow-x-auto max-w-3xl">
          <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--cw-border)' }}>
                <th className="text-left py-2 pr-4">In ChatGPT</th>
                <th className="text-left py-2 pr-4">In Claude</th>
                <th className="text-left py-2 pr-4">Who moves it</th>
                <th className="text-left py-2">How</th>
              </tr>
            </thead>
            <tbody>
              {SIDE_BY_SIDE.map(row => (
                <tr key={row.chatgpt} style={{ borderBottom: '1px solid var(--cw-border)' }}>
                  <td className="py-2 pr-4 font-semibold">{row.chatgpt}</td>
                  <td className="py-2 pr-4">{row.claude}</td>
                  <td className="py-2 pr-4">{row.who}</td>
                  <td className="py-2">{row.how}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm mt-4" style={{ color: 'var(--cw-ink-muted)' }}>
          ChatGPT scheduled tasks and connected apps are not covered here. If you rely on either,
          contact {AI_HELP_CONTACT.name} ({AI_HELP_CONTACT.email}).
        </p>
      </section>

      {/* Section: Steps */}
      <section className="mb-16" id="steps">
        <div className="section-label">Step by Step</div>
        <h2 className="mb-6">
          Move it <span className="text-highlight">phase by phase</span>
        </h2>

        <Tabs tabs={PHASES}>
          {{
            Memory: (
              <>
                <p className="mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
                  Claude has a built-in import. It gives you a message to paste into ChatGPT, and
                  ChatGPT answers with everything it has saved about you.
                </p>
                <StepList
                  steps={[
                    { title: 'Open Claude’s memory settings', description: <>In Claude, click your name in the bottom-left corner, then <strong>Settings</strong>, then <strong>Memory</strong>, then <strong>Start import</strong>. It sits next to &ldquo;Import memory from other AI providers.&rdquo;</> },
                    { title: 'Copy the import message', description: <>In the <strong>Import memory to Claude</strong> box, click <strong>Copy</strong>. Leave the box open.</> },
                    { title: 'Ask ChatGPT', description: 'In ChatGPT, start a new chat, paste the message and send it. ChatGPT replies with a list of what it remembers about you.' },
                    { title: 'Read the list before it goes anywhere', description: 'Delete anything wrong, out of date or private, then copy what is left. Leave out passwords and other people’s details.' },
                    { title: 'Add it to Claude', description: <>Back in Claude, paste the list into the box and click <strong>Add to memory</strong>. It can take a little while to appear under Memory.</> },
                  ]}
                />
                <p className="text-sm mt-4" style={{ color: 'var(--cw-ink-muted)' }}>
                  No <strong>Start import</strong> button? Ask ChatGPT to list everything it remembers
                  about you, then paste the answer into Instructions for Claude (see Custom
                  instructions).
                </p>
              </>
            ),
            'Custom instructions': (
              <>
                <p className="mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
                  If you ever told ChatGPT how to answer you, like &ldquo;keep it short&rdquo; or
                  &ldquo;I work in claims,&rdquo; those words move to Claude as they are. Never set any
                  up? Skip this one.
                </p>
                <StepList
                  steps={[
                    { title: 'Find them in ChatGPT', description: <>Click your name in the bottom-left corner, then <strong>Personalization</strong>. Under <strong>Custom instructions</strong>, click <strong>ChatGPT</strong>.</> },
                    { title: 'Copy both boxes', description: <>Copy the top box and the <strong>More about you</strong> box.</> },
                    { title: 'Paste them into Claude', description: <>In Claude, click your name, then <strong>Settings</strong>, then <strong>Account</strong>, and paste into the <strong>Instructions for Claude</strong> box. Claude uses these in every new chat and in Cowork.</> },
                  ]}
                />
              </>
            ),
            Projects: (
              <>
                <p className="mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
                  Do this once per project. The instructions and files come across; the chats inside
                  the project do not, so save any you still need with the Chats steps. Shared
                  projects are rebuilt once by their owner and shared, so teammates do not each
                  rebuild the same one.
                </p>
                <StepList
                  steps={[
                    { title: 'Copy the project out of ChatGPT', description: <>Open the project, click <strong>•••</strong>, then <strong>Project settings</strong>, and copy the instructions. Download the files you added. Can&apos;t find them? Look under <strong>Library</strong> in the ChatGPT sidebar.</> },
                    { title: 'Create the project in Claude', description: <>Click <strong>Projects</strong> in the sidebar, then <strong>New project</strong>. Name it, choose who can see it (the whole Cover Whale workspace, or private to people you invite) and click <strong>Create project</strong>.</> },
                    { title: 'Add the instructions', description: <>Click the pencil next to <strong>Instructions</strong>, paste, then click <strong>Save instructions</strong>.</> },
                    { title: 'Add the files', description: <>Click <strong>+</strong> next to <strong>Context</strong>, then <strong>Upload from device</strong>. <strong>Add text content</strong> lets you paste notes instead of a file.</> },
                  ]}
                />
              </>
            ),
            'Custom GPTs': (
              <>
                <p className="mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
                  Claude has no GPTs. A Claude project does the same job, with saved instructions and
                  reference files ready every time you start a chat. The person who built the GPT
                  does this; if someone else built one you use, ask them to move it.
                </p>
                <StepList
                  steps={[
                    { title: 'Find your GPTs', description: <>In ChatGPT, click <strong>Explore</strong>, then <strong>GPTs</strong>, then <strong>My GPTs</strong>. Under <strong>Created by me</strong>, click <strong>Edit</strong> on the GPT you built.</> },
                    { title: 'Copy what makes it work', description: <>Open the <strong>Configure</strong> tab. Copy the <strong>Instructions</strong>, and download the files under <strong>Knowledge</strong> or find your own copies.</> },
                    { title: 'Rebuild it as a project', description: 'In Claude, create a project named after the GPT and add the instructions and files, as in the Projects steps.' },
                    { title: 'Share it', description: <>Share the project with everyone who used the GPT: choose the Cover Whale workspace when you create it, or use the <strong>Share</strong> button on the project page.</> },
                  ]}
                />
              </>
            ),
            Chats: (
              <>
                <p className="mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
                  Most old chats can stay behind. For the few that matter, carry over a summary:
                  Claude picks up a summary more easily than a long copy of the whole chat.
                </p>
                <StepList
                  steps={[
                    { title: 'Open the chat in ChatGPT', description: 'Open the chat you want to keep.' },
                    { title: 'Ask for a summary', description: <>Send this message: <em>&ldquo;{SUMMARY_PROMPT}&rdquo;</em></> },
                    { title: 'Carry it into Claude', description: <>Copy the summary and paste it into a new Claude chat to carry on. To keep it with a project, click <strong>+</strong> next to <strong>Context</strong>, then <strong>Add text content</strong>.</> },
                    { title: 'Only need it for reference?', description: `Copy the useful part into a document before ${CHATGPT_END_DATE}.` },
                  ]}
                />
              </>
            ),
            'Cowork (optional)': (
              <>
                <p className="mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
                  Cowork lives in the Claude desktop app and can copy any Claude project, files and
                  instructions included. Anthropic is folding Cowork into the main Claude app, so
                  these screens may change.
                </p>
                <StepList
                  steps={[
                    { title: 'Install the desktop app', description: <>In Claude on the web, click your name, then <strong>Get apps and extensions</strong>. Install the desktop app and sign in.</> },
                    { title: 'Switch to Cowork', description: <>Open the desktop app, switch to Cowork, find <strong>Projects</strong> in the left panel and click <strong>+</strong>.</> },
                    { title: 'Import the project', description: <>Choose <strong>Import from project</strong> and search for your Claude project, one project at a time.</> },
                    { title: 'Pick where it lives', description: <>Pick where to save it on your computer and click <strong>Create</strong>. Files already on your computer? Choose <strong>Use an existing folder</strong> instead.</> },
                  ]}
                />
              </>
            ),
          }}
        </Tabs>

        <Callout variant="sage" className="mt-6">
          <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
            <strong>Check your work.</strong> After each phase, look in Claude: the import shows under
            Memory, your instructions are saved, and your files are listed under Context.
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
          Once the Cover Whale ChatGPT workspace closes, there is no approved way to use ChatGPT for
          work: the AI Acceptable Use Policy allows ChatGPT only inside that workspace, and personal
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
              Contact {AI_HELP_CONTACT.name} ({AI_HELP_CONTACT.email}). Raise it before{' '}
              {CHATGPT_END_DATE}, because ChatGPT access ends that day.
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
          Next: Claude Cowork <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

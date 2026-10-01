'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Callout } from '@/components/content/Callout';
import { TierBadge } from '@/components/content/TierBadge';
import { CHATGPT_END_DATE, CLAUDE_PLAN, HARBOR_AI_TOOLS_URL } from '@/lib/constants';

/**
 * Sources, so the next edit can re-check rather than re-derive: the CoE/Automations
 * Jira board (COE project, status Deployed), #ai-center-of-excellence and #general
 * announcements, the AI Acceptable Use Policy training deck, and TC-SOP-002.
 * Counts are as of October 1, 2026.
 */
const TIMELINE = [
  {
    when: 'January',
    title: 'Two assistants, a few experiments',
    body: 'AI at Cover Whale was spread across two chat tools, ChatGPT for Business and Claude, plus early experiments by a few teams.',
  },
  {
    when: 'February',
    title: 'The first builds',
    body: 'A new CoE/Automations board took its first projects: regulatory change management, OFAC sanction review and DOI complaint automation.',
  },
  {
    when: 'March',
    title: 'The AI Center of Excellence',
    body: 'AI Champions from across the business completed Anthropic’s courses, installed Claude Code and started meeting every week to turn “this is annoying and I do it every week” into automations.',
  },
  {
    when: 'April',
    title: 'Rules everyone can follow',
    body: 'The AI Acceptable Use Policy took effect, with training for every employee tracked in HiBob. It set out which tools are approved, which data goes where, and that a person reviews every AI output.',
  },
  {
    when: 'May',
    title: 'Our first AI hackathon',
    body: 'Champions captured their teams’ reports, questions and business terms so a Slack bot could answer data questions in Cover Whale’s own language: the start of the CW Data Bot.',
  },
  {
    when: 'June',
    title: 'Data answers in Slack',
    body: 'The CW Data Bot went live with five department personas, and champions tested it by marking every answer right or wrong.',
  },
  {
    when: 'July',
    title: 'Claude joins Slack',
    body: 'The CW Data Bot moved into Claude in Slack: @-mention Claude in a channel set up for it and the answer lands in the thread.',
  },
  {
    when: 'August',
    title: 'One plan, shared skills',
    body: `The ${CLAUDE_PLAN} became the primary Claude plan, with a growing library of Cover Whale custom skills. This guide moved onto the Harbor.`,
  },
  {
    when: 'September',
    title: 'Writing it down',
    body: 'The video-to-sop skill turned screen recordings into numbered SOPs, and the Moving from ChatGPT to Claude SOP set out how to bring work across.',
  },
  {
    when: 'October',
    title: 'Claude is our AI assistant',
    body: `ChatGPT for Business ends ${CHATGPT_END_DATE}. From here, Claude on the ${CLAUDE_PLAN} is the AI assistant Cover Whale uses.`,
  },
];

const BY_THE_NUMBERS = [
  { value: '2 → 1', label: 'AI assistants, from January to October' },
  { value: '70+', label: 'AI and automation items shipped from the CoE board since February' },
  { value: '16', label: 'AI Enablement Champions' },
  { value: '6', label: 'department personas in the CW Data Bot' },
  { value: '7+', label: 'Cover Whale custom skills on the Teams plan' },
];

const TOOL_GROUPS = [
  {
    team: 'Everyone',
    tools: [
      { name: 'Custom skills on the Teams plan', what: 'Type / in Claude: /ai-chief-of-staff for a daily briefing, /arc-knowledge for Agent Resource Center answers, /role-context-document, /writing-clearly, /prompt-architect, /brand-assets and /video-to-sop.' },
      { name: 'Claude in Slack (Claude Tag)', what: 'Claude answers in channels set up with a Cover Whale access bundle: Is It A Bug? triages reported issues, PayFlex 2.0 answers payment-status questions, and the CW Data Bot answers data and how-to questions.' },
      { name: 'This AI Learning Guide', what: 'Built with Claude Code, and kept current on the Harbor.' },
    ],
  },
  {
    team: 'Underwriting',
    tools: [
      { name: 'Fleet Submission Analyzer', what: 'Grades every fleet submission green, yellow or red and writes a full report before an underwriter opens it.' },
      { name: 'GARANT fleet underwriting dashboard', what: 'A dashboard view of fleet underwriting work.' },
      { name: 'Submission Notes Drawer', what: 'A follow-up surface for broker and underwriter conversations on a submission.' },
      { name: 'Fraud-risk and endorsement alerts', what: 'Scheduled alerts for high fraud-risk submissions and for endorsements made after a warning.' },
      { name: 'Coverages by State', what: 'Which carriers and coverage lines are available in a state, admitted or surplus, in seconds.' },
    ],
  },
  {
    team: 'Compliance',
    tools: [
      { name: 'DOI Complaint Automation', what: 'Turns a Department of Insurance complaint email into parsed details, preliminary findings and a draft response for review.' },
      { name: 'Regulatory Change Management', what: 'Tracks regulatory changes so the team sees what affects Cover Whale.' },
      { name: 'OFAC Sanction Review Automation', what: 'Automates the sanctions review step.' },
      { name: 'Agency Tracker', what: 'Flags agency risk signals, assigns investigations and keeps coaching records, shared with Growth and Customer Success.' },
      { name: 'cw-forms Slack bot', what: 'Self-serve compliance forms in Slack, including on-demand MCS-90s with a built-in federal-minimum check.' },
    ],
  },
  {
    team: 'Claims',
    tools: [
      { name: 'Loss Run Generator', what: 'Type a policy number, get a consistent loss run; the platform calls the same logic, and a public portal adds claim-status checks.' },
      { name: 'Legislative updates for claims', what: 'Automates tracking of legislative changes that affect claims handling.' },
    ],
  },
  {
    team: 'Rating and Product',
    tools: [
      { name: 'Rate testing automation', what: 'Creates test submissions headlessly and checks rates, with an endorsement calculator.' },
    ],
  },
  {
    team: 'HR',
    tools: [
      { name: 'HR Job Description Generator', what: 'An intranet page that drafts job descriptions for HR to review.' },
    ],
  },
  {
    team: 'Finance and AI Enablement',
    tools: [
      { name: 'Anthropic Spend Dashboard', what: 'Claude spend on an intranet page, refreshed every 24 hours.' },
    ],
  },
];

export default function HowWeGotHerePage() {
  return (
    <div>
      <TierBadge tier="beginner" />
      <h1 className="mt-4 mb-4">How We Got Here</h1>
      <p className="mb-6">
        A year of learning by doing: how Cover Whale went from scattered experiments to one AI
        assistant, shared rules, and tools built on our own work.
      </p>

      <Callout variant="purple" className="mb-12">
        <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
          <strong>The short version.</strong> We picked one assistant, wrote down the rules, trained a
          group of champions, and started building on top of our own data and processes. None of it
          replaced anyone&apos;s judgment. Every tool on this page drafts, gathers or flags, and a
          person who knows the work decides.
        </p>
      </Callout>

      {/* Section: Timeline */}
      <section className="mb-16" id="timeline">
        <div className="section-label">2026, Month by Month</div>
        <h2 className="mb-6">
          From two tools to <span className="text-highlight">one way of working</span>
        </h2>

        <ol className="relative max-w-3xl" style={{ borderLeft: '2px solid var(--cw-border)' }}>
          {TIMELINE.map(item => (
            <li key={item.when} className="relative mb-6 ml-6">
              {/* Centered on the 2px rail: 24px of margin plus half the rail and half the dot. */}
              <span
                className="absolute -left-[31px] top-1 w-3 h-3 rounded-full"
                style={{ background: 'var(--cw-primary)' }}
              />
              <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--cw-primary)' }}>
                {item.when}
              </p>
              <h3 className="text-base font-semibold mb-1" style={{ color: 'var(--cw-ink)' }}>
                {item.title}
              </h3>
              <p className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
                {item.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Section: Numbers */}
      <section className="mb-16" id="numbers">
        <div className="section-label">AI Adoption This Year</div>
        <h2 className="mb-6">
          By the <span className="text-highlight">numbers</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 max-w-4xl">
          {BY_THE_NUMBERS.map(stat => (
            <div
              key={stat.label}
              className="p-4 rounded-xl"
              style={{ background: 'var(--cw-surface)', border: '1px solid var(--cw-border)' }}
            >
              <p className="text-2xl font-extrabold tabular-nums mb-1" style={{ color: 'var(--cw-primary)' }}>
                {stat.value}
              </p>
              <p className="text-xs" style={{ color: 'var(--cw-ink-muted)' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
        <p className="text-xs mt-3" style={{ color: 'var(--cw-ink-muted)' }}>
          As of October 1, 2026. Shipped items are work on the AI Center of Excellence board that
          reached production, counting new tools and the fixes that keep them right.
        </p>
      </section>

      {/* Section: Tools */}
      <section className="mb-16" id="tools">
        <div className="section-label">Built With Our Teams</div>
        <h2 className="mb-4">
          The AI tools our <span className="text-highlight">departments</span> use
        </h2>
        <p className="mb-6">
          Each of these started as a team describing a problem it knew well. The team supplied the
          knowledge (its reports, rules, terms and examples) and AI supplied the speed.
        </p>

        <div className="space-y-6 max-w-3xl">
          {TOOL_GROUPS.map(group => (
            <div key={group.team}>
              <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--cw-ink)' }}>
                {group.team}
              </h3>
              <div className="space-y-2">
                {group.tools.map(tool => (
                  <div
                    key={tool.name}
                    className="p-4 rounded-xl"
                    style={{ background: 'var(--cw-surface)', border: '1px solid var(--cw-border)' }}
                  >
                    <p className="text-sm font-semibold mb-1" style={{ color: 'var(--cw-ink)' }}>
                      {tool.name}
                    </p>
                    <p className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
                      {tool.what}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Callout variant="blue" className="mt-6">
          <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
            The current list, with links, lives on the Harbor&apos;s{' '}
            <a href={HARBOR_AI_TOOLS_URL} target="_blank" rel="noopener noreferrer" className="font-semibold underline" style={{ color: 'var(--cw-primary)' }}>
              AI Tools page
            </a>
            . For how several of these were built, with prompts you can adapt, see{' '}
            <Link href="/use-cases#cw-tools" className="text-highlight underline">AI Tools Built at CW</Link>.
          </p>
        </Callout>
      </section>

      {/* Section: What it means */}
      <section className="mb-16" id="what-it-means">
        <div className="section-label">What This Means for You</div>
        <h2 className="mb-4">Faster work, same accountability</h2>
        <p className="mb-6">
          The tools changed this year. The responsibility did not. Every answer an AI tool gives you is
          a draft until someone who knows the subject has checked it, and that is usually you. The next
          page covers how to do that well.
        </p>
      </section>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8 mt-8" style={{ borderTop: '1px solid var(--cw-border)' }}>
        <Link
          href="/ai-basics/strengths"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all pill-btn"
        >
          <ArrowLeft size={16} /> Strengths & Limits
        </Link>
        <Link
          href="/ai-basics/responsible-ai"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:gap-3"
          style={{ background: 'var(--cw-primary)', color: '#fff' }}
        >
          Next: Using AI Responsibly <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

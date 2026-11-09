'use client';

import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Columns2,
  FolderOpen,
  Gauge,
  LayoutList,
  ListChecks,
  MessagesSquare,
  Shield,
} from 'lucide-react';
import { Card, CardGrid } from '@/components/content/Card';
import { Callout } from '@/components/content/Callout';
import { TierBadge } from '@/components/content/TierBadge';
import { StepList } from '@/components/content/StepList';
import { PlatformTabs } from '@/components/content/PlatformTabs';
import { ClaudePlanNotice } from '@/components/content/ClaudePlanNotice';
import { AI_HELP_CONTACT } from '@/lib/constants';
import { shotSrc } from '@/lib/claude-app-shots';

/**
 * The Claude app on the Cover Whale Teams plan, November 2026.
 *
 * Route stays /claude-cowork so the hand-built Harbor page keeps working.
 * The sidebar, model and effort menus, Projects, Artifacts, chat groups and
 * Customize were checked on the Cover Whale Teams account in claude.ai on
 * 2026-11-08 (screenshots in images/claude-app/ at the repo root, cropped and redacted
 * for the public repo). Side chat, split view, the context card and nested
 * sessions are desktop-app features taken from the November release
 * walkthrough and not yet captured on our account.
 */

function Shot({ file, alt, caption }: { file: string; alt: string; caption: string }) {
  return (
    <figure className="my-6">
      <img
        src={shotSrc(file)}
        alt={alt}
        loading="lazy"
        className="rounded-xl w-full h-auto"
        style={{ border: '1px solid var(--cw-border)', maxWidth: 720 }}
      />
      <figcaption className="text-xs mt-2" style={{ color: 'var(--cw-ink-muted)' }}>
        {caption}
      </figcaption>
    </figure>
  );
}

const EFFORT_NAMES = [
  { chat: 'Low', code: 'low', use: 'Quick answers, tidying text, simple lookups.' },
  { chat: 'Medium', code: 'medium', use: 'The recommended starting point for everyday work.' },
  { chat: 'High', code: 'high', use: 'Anything that matters, and the first step up when medium falls short.' },
  { chat: 'Extra', code: 'xhigh', use: 'Hard analysis and long multi-step work.' },
  { chat: 'Max', code: 'max', use: 'Correctness first. The app warns it can use 5× or more usage.' },
];

const SESSION_FEATURES = [
  {
    icon: ListChecks,
    title: 'A to-do list you can watch',
    body: 'When Claude makes a plan, it shows as a checklist in the chat and ticks each step off as it goes.',
  },
  {
    icon: FolderOpen,
    title: 'An outputs panel',
    body: 'The panel button at the top right lists every file Claude made or used in this chat, so nothing gets lost in the scroll.',
  },
  {
    icon: Gauge,
    title: 'A context card',
    body: 'In the desktop app, shows how full the chat is and what is filling it, with a button to compact it: Claude summarizes the chat so far to free up room.',
  },
  {
    icon: MessagesSquare,
    title: 'Side chat',
    body: 'In the desktop app, open the three-dot menu at the top right and pick side chat. Ask a question about the work without interrupting it; nothing you ask there lands in the main chat unless you send it back.',
  },
  {
    icon: Columns2,
    title: 'Split view',
    body: 'In the desktop app, drag a chat from the sidebar into the one you are in to keep an eye on two jobs side by side.',
  },
  {
    icon: LayoutList,
    title: 'Groups for your chats',
    body: 'Open the three dots next to any chat in the sidebar, choose Move to group, and name the group. Drag related chats in.',
  },
];

export default function ClaudeCoworkPage() {
  return (
    <div>
      <TierBadge tier="beginner" />
      <h1 className="mt-4 mb-4">The Claude App</h1>
      <p className="mb-12">
        Chat, Cowork and Claude Code used to be three places you had to choose between. Now there
        is one app: you set your context once, and Claude uses it whether you are chatting, working
        with files, or building.
      </p>

      {/* Section: What changed */}
      <section className="mb-16" id="what-changed">
        <div className="section-label">The Big Idea</div>
        <h2 className="mb-6">
          One app, <span className="text-highlight">not three</span>
        </h2>
        <p className="mb-6" style={{ color: 'var(--cw-ink-secondary)' }}>
          Cowork is now part of the Claude app. You no longer pick a tool before you start. The
          sidebar gives you everything in one place: <strong>New</strong>, <strong>Search</strong>,{' '}
          <strong>Projects</strong>, <strong>Artifacts</strong>, <strong>Scheduled</strong> and{' '}
          <strong>Customize</strong>, with a switch at the top between chat and code. The same app
          runs in the browser at claude.ai, on your phone, and as the desktop app.
        </p>

        <Callout variant="sage">
          <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
            <strong>Every seat on the Cover Whale Teams plan includes all of it.</strong> No extra
            license or approval needed. Some newer features roll out to other plans first, and this
            page says so wherever the Teams plan differs.
          </p>
        </Callout>
      </section>

      {/* Section: Model and effort */}
      <section className="mb-16" id="model-and-effort">
        <div className="section-label">Right-Size It</div>
        <h2 className="mb-6">
          Pick the model <span className="text-highlight">and the effort</span>
        </h2>
        <p className="mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
          Click the model name under the message box. Four models are on the menu: Fable 5.1, Opus
          5.5, Sonnet 5.5 and <strong>Haiku 5.5</strong>, the new fast model, which costs a tenth of
          what Haiku 4.5 did.
        </p>
        <Shot
          file="model-picker.jpg"
          alt="Claude model picker with Haiku 5.5, Sonnet 5.5, Opus 5.5 and Fable 5.1"
          caption="The model picker on the Cover Whale Teams plan."
        />
        <p className="mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
          Chat now has an <strong>Effort</strong> setting in the same menu. Higher effort means
          Claude thinks longer before it answers, which is more thorough but slower and uses your
          limits faster. Chat names the levels slightly differently from Claude Code:
        </p>
        <div className="space-y-2 mb-4 max-w-3xl">
          {EFFORT_NAMES.map(level => (
            <div
              key={level.chat}
              className="flex items-baseline gap-3 p-3 rounded-lg text-sm"
              style={{ background: 'var(--cw-surface)', border: '1px solid var(--cw-border)' }}
            >
              <strong className="w-16 flex-shrink-0" style={{ color: 'var(--cw-ink)' }}>
                {level.chat}
              </strong>
              <code className="w-16 flex-shrink-0 text-xs" style={{ color: 'var(--cw-ink-muted)' }}>
                {level.code}
              </code>
              <span style={{ color: 'var(--cw-ink-secondary)' }}>{level.use}</span>
            </div>
          ))}
        </div>
        <Shot
          file="effort-menu.jpg"
          alt="Effort menu in Claude chat: Low, Medium (recommended), High, Extra, Max"
          caption="Max carries a warning: 5× or more usage."
        />
        <p className="text-sm" style={{ color: 'var(--cw-ink-muted)' }}>
          Not sure which to pick?{' '}
          <Link href="/right-size-your-model" className="underline">
            Right-Size Your Model
          </Link>{' '}
          asks five questions about the task and recommends both.
        </p>
      </section>

      {/* Section: Projects */}
      <section className="mb-16" id="projects">
        <div className="section-label">Set Context Once</div>
        <h2 className="mb-6">
          <span className="text-highlight">Projects</span> carry your context
        </h2>
        <p className="mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
          A project holds your instructions, your files and the chats about one piece of work. Put
          the background in once, such as a style guide, a template or a sample of good output, and
          every chat in the project starts with it. Open <strong>Projects</strong> in the sidebar,
          then <strong>New project</strong>.
        </p>
        <Shot
          file="projects.jpg"
          alt="Claude Projects page with Your projects, Organization and Shared with you tabs"
          caption="Projects: yours, ones shared across Cover Whale, and ones shared with you."
        />
        <Callout variant="blue">
          <p className="text-base mb-2" style={{ color: 'var(--cw-ink-secondary)' }}>
            <strong>What the Teams plan gets.</strong> Anthropic&apos;s newest version of projects
            runs one conversation that hands each task to its own thread, keeps running in the
            cloud after you close your laptop, and shares one project memory across threads. That
            version is on <strong>Pro and Max plans only</strong> for now.
          </p>
          <p className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
            On the Cover Whale Teams plan you get <strong>nested sessions</strong> instead. It is the
            same idea, with two differences: each sub-session gets a written brief from the main
            chat rather than a shared memory, and it runs on your own computer rather than in the
            cloud, so leave the app open until it finishes.
          </p>
        </Callout>
      </section>

      {/* Section: Inside a chat */}
      <section className="mb-16" id="inside-a-chat">
        <div className="section-label">Less Intimidating</div>
        <h2 className="mb-6">
          See what Claude is <span className="text-highlight">doing</span>
        </h2>
        <p className="mb-6" style={{ color: 'var(--cw-ink-secondary)' }}>
          The chat itself was rebuilt so you can follow longer work without reading technical
          detail.
        </p>

        <CardGrid columns={2}>
          {SESSION_FEATURES.map(feature => (
            <Card key={feature.title}>
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'var(--cw-primary-light)' }}
                >
                  <feature.icon size={20} style={{ color: 'var(--cw-primary)' }} />
                </div>
                <h3 className="text-base font-bold" style={{ color: 'var(--cw-ink)' }}>
                  {feature.title}
                </h3>
              </div>
              <p className="text-sm" style={{ color: 'var(--cw-ink-muted)' }}>
                {feature.body}
              </p>
            </Card>
          ))}
        </CardGrid>

        <Shot
          file="chat-groups.jpg"
          alt="Chat menu in the Claude sidebar with Move to group"
          caption="Move to group, from the three dots next to any chat."
        />
        <Callout variant="purple">
          <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
            <strong>One chat per job.</strong> If you ask for something unrelated in the middle of
            a chat, Claude may offer to start a new one. Say yes: a chat that stays on one job stays
            sharp for longer.
          </p>
        </Callout>
      </section>

      {/* Section: Artifacts */}
      <section className="mb-16" id="artifacts">
        <div className="section-label">Where the Work Lives</div>
        <h2 className="mb-6">
          Everything you make, <span className="text-highlight">in one list</span>
        </h2>
        <p className="mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
          Docs, slide decks and designs are now <strong>artifacts</strong>: pages you and Claude
          edit together. They all sit in <strong>Artifacts</strong> in the sidebar, instead of being
          buried in old chats.
        </p>
        <Shot
          file="artifacts-view.jpg"
          alt="Claude Artifacts view with Docs, Slides, Design, Dashboard and Motion"
          caption="Make something new: Docs, Slides and Design, with Dashboard and Motion in beta."
        />
        <div className="space-y-2 mb-6 max-w-3xl text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
          <p><strong>Docs</strong>: a shared document with tabs, like a Google Doc.</p>
          <p><strong>Slides</strong>: a deck you can present from Claude or download as PowerPoint.</p>
          <p><strong>Design</strong>: a canvas for a one-pager, a social post or a landing page.</p>
          <p><strong>Dashboard</strong> (beta): pulls from your connectors and keeps the numbers current.</p>
        </div>
        <p className="mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
          On any of them you can comment on one section and send it to Claude to fix, look back
          through the version history, or share it with your team.
        </p>
        <Callout variant="coral">
          <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
            <strong>Sharing is publishing.</strong> Treat a shared link like an email attachment:
            keep customer, broker and claims data inside Cover Whale, and follow the AI Acceptable
            Use Policy.
          </p>
        </Callout>
      </section>

      {/* Section: Customize */}
      <section className="mb-16" id="customize">
        <div className="section-label">Make It Yours</div>
        <h2 className="mb-6">
          <span className="text-highlight">Customize</span>: skills, connectors, plugins
        </h2>
        <p className="mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
          <strong>Customize</strong> in the sidebar is where you add what Claude can use everywhere
          in the app: <strong>Skills</strong> (packaged know-how, including ones Cover Whale
          publishes to the organization library), <strong>Connectors</strong> (Jira, Google Drive,
          Slack and more) and <strong>Plugins</strong>.
        </p>
        <Shot
          file="customize-skills.jpg"
          alt="Claude Customize page with Skills, Connectors and Plugins tabs"
          caption="Turn a skill on here once, and every chat and project can use it."
        />
      </section>

      {/* Section: Installation */}
      <section className="mb-16" id="installation">
        <div className="section-label">Get Started</div>
        <h2 className="mb-6">
          Get the <span className="text-highlight">desktop app</span>
        </h2>
        <p className="mb-6" style={{ color: 'var(--cw-ink-secondary)' }}>
          Everything above works at claude.ai in the browser. The desktop app adds side chat, split
          view, the session cards, and work with the files on your computer. Sign in with your Cover
          Whale Teams plan account.
        </p>

        <ClaudePlanNotice compact className="mb-6" />

        <PlatformTabs>
          {{
            Windows: (
              <StepList
                steps={[
                  {
                    title: 'Download the installer',
                    description: (
                      <>
                        Go to{' '}
                        <a
                          href="https://claude.ai/download"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold underline"
                          style={{ color: 'var(--cw-primary)' }}
                        >
                          claude.ai/download
                        </a>{' '}
                        and click <strong>Download for Windows</strong>. The installer
                        (<code className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'var(--cw-surface)' }}>
                          Claude-Setup.exe
                        </code>) will save to your Downloads folder.
                      </>
                    ),
                  },
                  {
                    title: 'Run the installer',
                    description: (
                      <>
                        Double-click <strong>Claude-Setup.exe</strong> and follow the
                        prompts. The app installs like any standard Windows application &mdash; no
                        admin privileges required.
                      </>
                    ),
                  },
                  {
                    title: 'Sign in',
                    description: (
                      <>
                        Open Claude from the Start menu or desktop shortcut. Sign in with
                        your <strong>Cover Whale Teams plan account</strong> (the same credentials you
                        use for claude.ai in the browser).
                      </>
                    ),
                  },
                  {
                    title: 'Start your first job',
                    description: (
                      <>
                        Click <strong>New</strong>, pick a model under the message box, and describe
                        the job. For anything you will come back to, start a{' '}
                        <strong>project</strong> first so your context is set once.
                      </>
                    ),
                  },
                ]}
              />
            ),
            Mac: (
              <StepList
                steps={[
                  {
                    title: 'Download the installer',
                    description: (
                      <>
                        Go to{' '}
                        <a
                          href="https://claude.ai/download"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold underline"
                          style={{ color: 'var(--cw-primary)' }}
                        >
                          claude.ai/download
                        </a>{' '}
                        and click <strong>Download for Mac</strong>. The disk image
                        (<code className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'var(--cw-surface)' }}>
                          Claude.dmg
                        </code>) will save to your Downloads folder.
                      </>
                    ),
                  },
                  {
                    title: 'Install the app',
                    description: (
                      <>
                        Open <strong>Claude.dmg</strong> and drag the Claude icon into your
                        Applications folder. Eject the disk image when done.
                      </>
                    ),
                  },
                  {
                    title: 'Sign in',
                    description: (
                      <>
                        Open Claude from Applications or Spotlight (Cmd+Space, type
                        &quot;Claude&quot;). Sign in with your{' '}
                        <strong>Cover Whale Teams plan account</strong> (same credentials as
                        claude.ai in the browser).
                      </>
                    ),
                  },
                  {
                    title: 'Start your first job',
                    description: (
                      <>
                        Click <strong>New</strong>, pick a model under the message box, and describe
                        the job. For anything you will come back to, start a{' '}
                        <strong>project</strong> first so your context is set once.
                      </>
                    ),
                  },
                ]}
              />
            ),
            Linux: (
              <Callout variant="blue">
                <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
                  The Claude desktop app is available for <strong>Windows and Mac</strong> only.
                  Linux users get the same app at{' '}
                  <a
                    href="https://claude.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold underline"
                    style={{ color: 'var(--cw-primary)' }}
                  >
                    claude.ai
                  </a>{' '}
                  in any browser, without the desktop-only features.
                </p>
              </Callout>
            ),
          }}
        </PlatformTabs>
      </section>

      {/* Section: Tips */}
      <section className="mb-16" id="tips">
        <div className="section-label">Pro Tips</div>
        <h2 className="mb-6">
          Getting the most from <span className="text-highlight">the app</span>
        </h2>

        <div className="space-y-4 max-w-3xl">
          {[
            {
              title: 'Set your context once, in a project',
              description:
                'Instructions, style guides, templates and sample outputs go in the project, not pasted into every chat.',
            },
            {
              title: 'Start on the smallest model that could work',
              description:
                'Haiku 5.5 for lookups and tidying, Sonnet 5.5 for everyday work, and Opus 5.5 when the job is hard. Turn effort up before you change model.',
            },
            {
              title: 'Be specific about the output',
              description:
                '"Summarize these five loss runs into a one-page executive brief" works better than "help me with these files."',
            },
            {
              title: 'Review before sharing',
              description:
                'Claude keeps consequential decisions with you. Always review generated files before sending them externally, especially anything with numbers or client data.',
            },
            {
              title: 'Use it for the assembly, not the judgment',
              description:
                'Claude excels at gathering, organizing and drafting. Your expertise is the judgment calls, final review and domain knowledge that make the output trustworthy.',
            },
          ].map((tip, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-5 rounded-xl"
              style={{
                background: 'var(--cw-surface)',
                border: '1px solid var(--cw-border)',
              }}
            >
              <span
                className="text-sm font-bold tracking-widest flex-shrink-0 w-8 mt-0.5"
                style={{ color: 'var(--cw-primary)', letterSpacing: '2px' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-[17px] font-semibold mb-1" style={{ color: 'var(--cw-ink)' }}>
                  {tip.title}
                </h3>
                <p className="text-[15px] leading-relaxed" style={{ color: 'var(--cw-ink-muted)' }}>
                  {tip.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Callout variant="purple" className="mb-8">
        <p className="text-base flex items-start gap-2" style={{ color: 'var(--cw-ink-secondary)' }}>
          <Shield size={18} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--cw-primary)' }} />
          <span>
            Features roll out plan by plan, and the Teams plan sometimes gets them later. If
            something on this page is missing from your app, update the app first, then ask{' '}
            <a
              href={`mailto:${AI_HELP_CONTACT.email}`}
              className="font-semibold underline"
              style={{ color: 'var(--cw-primary)' }}
            >
              {AI_HELP_CONTACT.name}
            </a>
            .
          </span>
        </p>
      </Callout>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8 mt-8" style={{ borderTop: '1px solid var(--cw-border)' }}>
        <Link
          href="/prompt-builder"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all pill-btn"
        >
          <ArrowLeft size={16} /> Prompt Builder
        </Link>
        <Link
          href="/choose-your-claude"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:gap-3"
          style={{ background: 'var(--cw-primary)', color: '#fff' }}
        >
          Next: Choose Your Claude <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

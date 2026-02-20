'use client';

import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Card, CardGrid } from '@/components/content/Card';
import { Callout } from '@/components/content/Callout';
import { CodeBlock } from '@/components/content/CodeBlock';
import { TierBadge } from '@/components/content/TierBadge';

const glossaryTerms = [
  {
    term: 'Vibe Coding',
    definition: 'A style of programming where you describe what you want in natural language and an AI tool generates the code. You guide the direction and the AI handles the syntax. Coined by Andrej Karpathy (co-founder of OpenAI).',
  },
  {
    term: 'Agentic AI',
    definition: 'AI systems that can autonomously plan, execute multi-step tasks, use tools, and make decisions with minimal human intervention. They go beyond simple question-and-answer to take actions in the real world or in software environments.',
  },
  {
    term: 'Claude Code',
    definition: 'Anthropic\'s command-line AI coding assistant that runs in your terminal. It can read your codebase, edit files, run commands, and execute multi-step development tasks autonomously.',
  },
  {
    term: 'Desktop App',
    definition: 'A standalone application installed on your computer (as opposed to a browser-based web app). Claude Desktop and Cursor are examples of AI desktop apps.',
  },
  {
    term: 'IDE (Integrated Development Environment)',
    definition: 'A software application that provides comprehensive tools for software development, including a code editor, debugger, and build tools. Examples: VS Code, Cursor, WebStorm.',
  },
  {
    term: 'Markdown',
    definition: 'A lightweight text formatting language using simple symbols like # for headings, ** for bold, and - for bullet points. Used extensively in AI prompts, documentation, and developer tools.',
  },
  {
    term: 'Terminal / CLI',
    definition: 'A text-based interface for interacting with your computer using typed commands instead of clicking. CLI stands for Command Line Interface. Essential for developer tools like Claude Code, Git, and npm.',
  },
  {
    term: 'npm (Node Package Manager)',
    definition: 'A package manager for JavaScript/Node.js that lets you install, share, and manage code libraries and tools. Used to install many AI development tools.',
  },
  {
    term: 'PATH',
    definition: 'An environment variable on your computer that tells the system where to find executable programs. When you install a CLI tool, it needs to be on your PATH to run from any directory.',
  },
  {
    term: 'Git',
    definition: 'A version control system that tracks changes to files over time. It lets you save snapshots of your work, collaborate with others, and revert to previous versions. GitHub is a cloud platform built around Git.',
  },
  {
    term: 'API Key',
    definition: 'A unique secret code that authenticates you with an AI service. Like a password for programmatic access. Never share your API keys or paste them into public places.',
  },
  {
    term: 'Authentication',
    definition: 'The process of verifying your identity to access a service. For AI tools, this typically involves signing in with an email, OAuth (Google/GitHub login), or an API key.',
  },
  {
    term: 'Prompt',
    definition: 'The text input you give to an AI model. A prompt can be a question, instruction, or any text the AI should respond to. Better prompts produce better outputs.',
  },
  {
    term: 'Context',
    definition: 'The background information available to an AI during a conversation. This includes your current message, previous messages in the conversation, any attached files, and system instructions. More relevant context leads to better predictions.',
  },
  {
    term: 'LLM (Large Language Model)',
    definition: 'The type of AI model behind tools like Claude, ChatGPT, and Gemini. Trained on vast amounts of text data, LLMs predict the most likely next words given context, enabling them to generate human-like text, answer questions, and complete tasks.',
  },
  {
    term: 'Token',
    definition: 'The basic unit of text that AI models process. Roughly 1 token equals 3/4 of a word. Models have token limits (context windows) that determine how much text they can consider at once. Claude Opus has a 200K token context window.',
  },
  {
    term: 'MCP (Model Context Protocol)',
    definition: 'An open standard (created by Anthropic) that lets AI assistants connect to external data sources and tools. Think of it as a USB-C port for AI \u2014 one standard protocol that connects to many different services like databases, file systems, and APIs.',
  },
  {
    term: 'Hallucination',
    definition: 'When an AI generates information that sounds plausible but is factually incorrect or entirely fabricated. This is why human verification of AI outputs is critical, especially for business decisions, policy details, and regulatory information.',
  },
];

const usefulLinks = [
  {
    name: 'NotebookLM AI Onboarding Guide',
    url: 'https://notebooklm.google.com/',
    description: 'Google\'s AI-powered research and note-taking tool. Great for uploading documents and having AI conversations about your content.',
    color: '#4285F4',
  },
  {
    name: 'Claude AI',
    url: 'https://claude.ai',
    description: 'Anthropic\'s AI assistant. Our recommended tool for most tasks. Excellent reasoning, long context window, and strong safety practices.',
    color: '#D97706',
  },
  {
    name: 'Gemini',
    url: 'https://gemini.google.com',
    description: 'Google\'s AI assistant with deep integration into Google Workspace (Docs, Sheets, Gmail). 1M token context window for massive documents.',
    color: '#4285F4',
  },
  {
    name: 'ChatGPT',
    url: 'https://chat.openai.com',
    description: 'OpenAI\'s widely-used AI assistant. Strong general capabilities, image generation (DALL-E), and a large plugin ecosystem.',
    color: '#10A37F',
  },
];

export default function ResourcesPage() {
  return (
    <div>
      <h1 className="mt-4 mb-4">Resources &amp; Glossary</h1>
      <p className="mb-12">
        Everything you need in one place &mdash; AI terminology, useful links, quick references,
        and your learning path forward.
      </p>

      {/* Glossary Section */}
      <section className="mb-16" id="glossary">
        <div className="section-label">Glossary</div>
        <h2 className="mb-4">
          AI &amp; Technical <span className="text-highlight">Terms</span>
        </h2>
        <p className="mb-8">
          A plain-language reference for the terminology you will encounter when working with AI tools.
        </p>

        <div className="space-y-3">
          {glossaryTerms.map((item) => (
            <div
              key={item.term}
              className="glass-card p-5"
            >
              <div className="flex items-start gap-4">
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wide flex-shrink-0 mt-0.5"
                  style={{ background: 'var(--cw-primary-light)', color: 'var(--cw-primary)' }}
                >
                  {item.term}
                </span>
                <p className="text-sm leading-relaxed m-0" style={{ color: 'var(--cw-ink-secondary)', maxWidth: 'none' }}>
                  {item.definition}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Useful Links */}
      <section className="mb-16" id="links">
        <div className="section-label">Tools &amp; Links</div>
        <h2 className="mb-4">
          Useful <span className="text-highlight">Resources</span>
        </h2>
        <p className="mb-8">
          The AI tools and platforms most relevant to Cover Whale employees.
        </p>

        <CardGrid columns={2}>
          {usefulLinks.map((link) => (
            <Card key={link.name}>
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-extrabold text-white flex-shrink-0"
                  style={{ background: link.color }}
                >
                  {link.name[0]}
                </div>
                <div className="flex-1">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-semibold text-base mb-1 transition-colors"
                    style={{ color: 'var(--cw-ink)' }}
                  >
                    {link.name}
                    <ExternalLink size={14} style={{ color: 'var(--cw-ink-muted)' }} />
                  </a>
                  <p className="text-sm m-0" style={{ color: 'var(--cw-ink-muted)', maxWidth: 'none' }}>
                    {link.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </CardGrid>
      </section>

      {/* Quick Reference */}
      <section className="mb-16" id="quick-reference">
        <div className="section-label">Quick Reference</div>
        <h2 className="mb-4">
          Prompt Engineering <span className="text-highlight">Cheat Sheet</span>
        </h2>
        <p className="mb-8">
          Keep these principles handy for every AI interaction.
        </p>

        <CardGrid columns={2}>
          <Card>
            <h3 className="mb-4" style={{ color: 'var(--cw-primary)' }}>The CRISP Framework</h3>
            <div className="space-y-2">
              {[
                { letter: 'C', label: 'Context', tip: 'Set the scene: domain, situation, background' },
                { letter: 'R', label: 'Role', tip: 'Assign expertise: "Act as a senior underwriter..."' },
                { letter: 'I', label: 'Instruction', tip: 'Action verb + task: Analyze, Compare, Draft' },
                { letter: 'S', label: 'Specifics', tip: 'Data, constraints, numbers, requirements' },
                { letter: 'P', label: 'Preferences', tip: 'Format, length, tone, structure' },
              ].map((item) => (
                <div key={item.letter} className="flex items-start gap-3 p-2.5 rounded-lg" style={{ background: 'var(--cw-primary-005)' }}>
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
                    style={{ background: 'var(--cw-primary)' }}
                  >
                    {item.letter}
                  </span>
                  <div>
                    <span className="text-sm font-semibold">{item.label}</span>
                    <p className="text-xs m-0 mt-0.5" style={{ color: 'var(--cw-ink-muted)', maxWidth: 'none' }}>
                      {item.tip}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="mb-4" style={{ color: 'var(--cw-primary)' }}>5 Golden Rules</h3>
            <div className="space-y-3">
              {[
                { rule: 'Be Specific, Not Vague', detail: 'The clearer your request, the more accurate the output. Include numbers, names, and constraints.' },
                { rule: 'Define the Role', detail: 'Tell the AI who it should be. A "senior UW" gives different output than "insurance professional."' },
                { rule: 'Provide Context First', detail: 'Structure: Background then Rules/Constraints then Task. Lead with what matters.' },
                { rule: 'State Output Format', detail: 'Bullets, table, email, numbered list? Tell the AI exactly what you want.' },
                { rule: 'Set Boundaries', detail: '"Do NOT include X. Focus only on Y." Constraints keep responses focused.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                    style={{ background: 'var(--cw-primary-light)', color: 'var(--cw-primary)' }}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <span className="text-sm font-semibold">{item.rule}</span>
                    <p className="text-xs m-0 mt-0.5" style={{ color: 'var(--cw-ink-muted)', maxWidth: 'none' }}>
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </CardGrid>

        <div className="mt-6">
          <Card>
            <h3 className="mb-4" style={{ color: 'var(--cw-primary)' }}>Reality Filter (Copy &amp; Paste)</h3>
            <p className="text-base mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
              Paste this at the start of any AI conversation to improve output reliability and reduce hallucinations.
            </p>
            <CodeBlock
              title="Reality Filter System Prompt"
              code={`REALITY FILTER DIRECTIVE

CONFIDENCE SCORING:
- Output your confidence score (0.0-1.0) on every response
- If confidence is below 0.85, explain what information would increase it
- For brainstorming prompts, list pros/cons with verification labels

VERIFICATION REQUIREMENTS:
- Never present generated, inferred, or speculated content as fact
- If you cannot verify something, say so clearly
- Label unverified content: [Inference] [Speculation] [Unverified]

FLAGGED WORDS - Label these claims unless directly sourced:
Prevent, Guarantee, Will never, Fixes, Eliminates, Ensures that

CLARIFICATION:
- Ask for clarification if information is missing
- Do not guess or fill gaps with assumptions`}
            />
          </Card>
        </div>

        <div className="mt-6">
          <Card>
            <h3 className="mb-4" style={{ color: 'var(--cw-primary)' }}>PII Safety Quick Check</h3>
            <p className="text-base mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
              Before submitting any prompt, scan for these items and replace with generalized descriptions.
            </p>
            <CardGrid columns={3}>
              <div className="p-4 rounded-lg" style={{ background: 'rgba(217,85,80,0.06)', border: '1px solid rgba(217,85,80,0.15)' }}>
                <div className="text-[11px] font-semibold uppercase mb-2" style={{ color: 'var(--cw-warning)' }}>Never Include</div>
                <div className="space-y-1 text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
                  <div>Real names</div>
                  <div>DOT / MC numbers</div>
                  <div>SSN / EIN</div>
                  <div>Policy numbers</div>
                  <div>VIN numbers</div>
                  <div>Phone / Email</div>
                </div>
              </div>
              <div className="p-4 rounded-lg" style={{ background: 'rgba(58,158,110,0.06)', border: '1px solid rgba(58,158,110,0.15)' }}>
                <div className="text-[11px] font-semibold uppercase mb-2" style={{ color: 'var(--cw-success)' }}>Use Instead</div>
                <div className="space-y-1 text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
                  <div>&ldquo;a regional carrier&rdquo;</div>
                  <div>&ldquo;a medium fleet&rdquo;</div>
                  <div>&ldquo;Driver A / Driver B&rdquo;</div>
                  <div>&ldquo;the insured&rdquo;</div>
                  <div>&ldquo;a Southern state&rdquo;</div>
                  <div>&ldquo;the primary contact&rdquo;</div>
                </div>
              </div>
              <div className="p-4 rounded-lg" style={{ background: 'rgba(74,111,165,0.06)', border: '1px solid rgba(74,111,165,0.15)' }}>
                <div className="text-[11px] font-semibold uppercase mb-2" style={{ color: 'var(--cw-info)' }}>The Rule</div>
                <p className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
                  Convert specifics to categories. Use ranges instead of exact figures.
                  <strong className="block mt-2">When in doubt, leave it out.</strong>
                </p>
              </div>
            </CardGrid>
          </Card>
        </div>
      </section>

      {/* Learning Path */}
      <section className="mb-16" id="learning-path">
        <div className="section-label">Your Journey</div>
        <h2 className="mb-4">
          Learning <span className="text-highlight">Path</span>
        </h2>
        <p className="mb-8">
          Follow this progression to build your AI skills from the ground up.
        </p>

        <div className="space-y-4">
          {[
            {
              tier: 'beginner' as const,
              title: 'Foundations',
              pages: ['AI Basics \u2014 Understand what AI is and how it works', 'Prompt Engineering (Basics) \u2014 Learn the 5 golden rules'],
              outcome: 'You can have effective conversations with AI tools and get useful outputs.',
            },
            {
              tier: 'intermediate' as const,
              title: 'Core Skills',
              pages: ['CRISP Framework \u2014 Structure prompts for maximum effectiveness', 'Prompt Builder \u2014 Practice building prompts interactively', 'Advanced Techniques \u2014 Chain-of-thought, few-shot, dual-pass'],
              outcome: 'You can craft sophisticated prompts, use the Reality Filter, and handle PII safely.',
            },
            {
              tier: 'expert' as const,
              title: 'Mastery',
              pages: ['CW Use Cases \u2014 Department-specific prompts and workflows', 'Vibe Coding (Fundamentals) \u2014 Use AI to build and modify software', 'Vibe Coding (Workflows) \u2014 Real development patterns with AI'],
              outcome: 'You can apply AI to your specific CW role and start using AI-assisted development tools.',
            },
            {
              tier: 'advanced' as const,
              title: 'The Frontier',
              pages: ['Agentic AI \u2014 Autonomous AI systems and MCP', 'Vibe Coding (Advanced) \u2014 Claude Code, multi-agent workflows', 'Building with AI \u2014 Create custom tools and automations'],
              outcome: 'You can build AI-powered tools, configure agents, and drive innovation at Cover Whale.',
            },
          ].map((level) => (
            <div
              key={level.tier}
              className="glass-card p-6"
              style={{ borderLeft: `4px solid var(--tier-${level.tier})` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <TierBadge tier={level.tier} />
                <h3 className="mb-0">{level.title}</h3>
              </div>
              <div className="ml-1 mb-3">
                {level.pages.map((page, i) => (
                  <div key={i} className="flex items-start gap-2 my-1.5">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: `var(--tier-${level.tier})` }} />
                    <span className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>{page}</span>
                  </div>
                ))}
              </div>
              <div
                className="p-3 rounded-lg text-sm"
                style={{ background: 'var(--cw-primary-005)', color: 'var(--cw-ink-secondary)' }}
              >
                <strong>Outcome:</strong> {level.outcome}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final Callout */}
      <section className="mb-16">
        <Callout variant="purple">
          <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
            <strong>AI is a skill, not a switch.</strong> The more you practice, the better your results.
            Start with the basics, use CRISP for every prompt, and gradually explore advanced techniques.
            Every interaction is a chance to get better.
          </p>
        </Callout>
      </section>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8 mt-8" style={{ borderTop: '1px solid var(--cw-border)' }}>
        <Link
          href="/use-cases"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all pill-btn"
        >
          <ArrowLeft size={16} /> Use Cases
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:gap-3"
          style={{ background: 'var(--cw-primary)', color: '#fff' }}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

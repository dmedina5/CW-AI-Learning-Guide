'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Card, CardGrid } from '@/components/content/Card';
import { Callout } from '@/components/content/Callout';
import { CodeBlock } from '@/components/content/CodeBlock';
import { StepList } from '@/components/content/StepList';
import { TierBadge } from '@/components/content/TierBadge';

export default function AgenticAIPage() {
  return (
    <div>
      <TierBadge tier="advanced" />
      <h1 className="mt-4 mb-4">Agentic AI</h1>
      <p className="mb-12">
        Moving from personal tools to orchestrating AI agents. Understand what agents are,
        how to map your workflow, and the tools available for building agentic pipelines.
      </p>

      {/* Section: What Are Agents */}
      <section className="mb-16" id="what-are-agents">
        <div className="section-label">The Shift</div>
        <h2 className="mb-4">
          What are <span className="text-highlight">AI Agents</span>?
        </h2>
        <p className="mb-6" style={{ color: 'var(--cw-ink-secondary)' }}>
          An AI agent is software that can take actions on its own &mdash; like reading files,
          searching the web, executing code, or making changes &mdash; rather than just answering
          questions. It is like an assistant who can actually <em>do</em> tasks, not just give advice.
        </p>

        <CardGrid columns={3}>
          <Card number="A">
            <h3 className="mb-2">Chatbot</h3>
            <p className="text-sm" style={{ color: 'var(--cw-ink-muted)' }}>
              Answers questions based on what it knows. Cannot take actions or access external systems.
              <strong> You do the work.</strong>
            </p>
          </Card>
          <Card number="B">
            <h3 className="mb-2">Copilot</h3>
            <p className="text-sm" style={{ color: 'var(--cw-ink-muted)' }}>
              Suggests next steps and autocompletes your work. <strong>You still drive</strong>,
              but with AI-assisted suggestions inline.
            </p>
          </Card>
          <Card number="C">
            <h3 className="mb-2">Agent</h3>
            <p className="text-sm" style={{ color: 'var(--cw-ink-muted)' }}>
              Plans, executes, and verifies autonomously. Can use tools, read/write files,
              and chain multiple steps. <strong>You supervise.</strong>
            </p>
          </Card>
        </CardGrid>

        <Callout variant="purple" className="mt-8">
          <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
            <span className="text-highlight">The key difference:</span> Traditional AI responds to prompts.
            Agentic AI takes a goal and figures out the steps to achieve it, using tools and making
            decisions along the way. Claude Code is our primary example of an agentic tool.
          </p>
        </Callout>
      </section>

      {/* Section: From Personal to Orchestration */}
      <section className="mb-16" id="personal-to-orchestration">
        <div className="section-label">Evolution</div>
        <h2 className="mb-4">
          From Personal Tools to <span className="text-highlight">Orchestrating Agents</span>
        </h2>
        <p className="mb-6" style={{ color: 'var(--cw-ink-secondary)' }}>
          The journey from using AI as a chatbot to orchestrating teams of AI agents happens in stages.
          Each stage builds capability and trust.
        </p>

        <StepList
          steps={[
            {
              title: 'Stage 1: AI as a Chat Partner',
              description: 'Ask questions, get answers. Use ChatGPT, Claude.ai, or Gemini web for one-off tasks. Manual copy-paste workflow.',
            },
            {
              title: 'Stage 2: AI as a Coding Assistant',
              description: 'Use Claude Code in your terminal. AI reads your files, suggests edits, runs commands. You approve each action.',
            },
            {
              title: 'Stage 3: Multi-Agent Workflows',
              description: 'Run multiple Claude Code instances in parallel. Separate research, implementation, and testing roles. Share context via markdown files.',
            },
            {
              title: 'Stage 4: Automated Pipelines',
              description: 'AI agents trigger other agents. Automated review, testing, and deployment. Human oversight at key decision points only.',
            },
          ]}
        />
      </section>

      {/* Section: Mapping Your Workflow */}
      <section className="mb-16" id="mapping-workflow">
        <div className="section-label">Practical</div>
        <h2 className="mb-4">
          Mapping Your <span className="text-highlight">Workflow</span>
        </h2>
        <p className="mb-6" style={{ color: 'var(--cw-ink-secondary)' }}>
          Before building an agentic pipeline, map your current manual workflow. Identify the steps
          that are repetitive, well-defined, and low-risk &mdash; those are your first automation targets.
        </p>

        <Card className="mb-6">
          <h3 className="mb-4">Workflow Audit Questions</h3>
          <div className="space-y-3">
            {[
              { q: 'What tasks do I do repeatedly?', why: 'Repetitive tasks have the highest automation ROI' },
              { q: 'Which steps have clear inputs and outputs?', why: 'Well-defined steps are easiest to automate' },
              { q: 'Where do I spend time on low-judgment work?', why: 'Reserve human judgment for high-stakes decisions' },
              { q: 'What are the handoff points between people?', why: 'Handoffs are natural places to insert agents' },
              { q: 'Where do errors happen most often?', why: 'Agents can enforce consistency and catch mistakes' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-lg" style={{ background: 'var(--cw-primary-light)' }}>
                <span className="font-bold text-sm flex-shrink-0" style={{ color: 'var(--cw-primary)' }}>{i + 1}.</span>
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--cw-ink)' }}>{item.q}</p>
                  <p className="text-xs mt-1" style={{ color: 'var(--cw-ink-muted)' }}>{item.why}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Section: Agentic Pipeline Example */}
      <section className="mb-16" id="pipeline">
        <div className="section-label">Pipeline</div>
        <h2 className="mb-4">
          Agentic Pipeline <span className="text-highlight">Example</span>
        </h2>
        <p className="mb-6" style={{ color: 'var(--cw-ink-secondary)' }}>
          A real-world example of how an agentic pipeline can handle a support ticket from intake to
          resolution and deployment.
        </p>

        {/* Pipeline Visualization */}
        <div className="flex flex-col gap-3 max-w-3xl mb-8">
          {[
            {
              stage: 'SUPPORT',
              title: 'Ticket Intake',
              desc: 'Customer reports a bug. Support agent classifies, prioritizes, and gathers reproduction steps.',
              color: '#D95550',
              agent: 'Triage Agent',
            },
            {
              stage: 'HANDOFF',
              title: 'Context Transfer',
              desc: 'Structured handoff document generated with bug details, logs, and affected systems.',
              color: '#D97706',
              agent: 'Handoff Agent',
            },
            {
              stage: 'ENGINEERING',
              title: 'Investigation & Fix',
              desc: 'Claude Code analyzes the codebase, identifies root cause, creates plan, and implements fix.',
              color: '#4A6FA5',
              agent: 'Claude Code',
            },
            {
              stage: 'RESOLUTION',
              title: 'Review & Test',
              desc: 'Automated tests run. Claude Code validates across the full codebase. Review agent checks quality.',
              color: '#3A9E6E',
              agent: 'Claude Code + Review Agent',
            },
            {
              stage: 'DEPLOY',
              title: 'Ship It',
              desc: 'CI/CD pipeline triggered. Canary deployment. Monitoring agent watches for regressions.',
              color: '#6B2D8B',
              agent: 'Deploy Agent',
            },
          ].map((item, i) => (
            <div key={i}>
              <div
                className="flex items-center gap-5 p-5 rounded-2xl transition-colors"
                style={{
                  background: 'var(--cw-surface)',
                  border: '1px solid var(--cw-border)',
                  borderLeft: `4px solid ${item.color}`,
                }}
              >
                <div className="flex flex-col items-center gap-1 flex-shrink-0 w-20">
                  <span
                    className="text-[10px] font-bold tracking-widest px-2 py-0.5 rounded-full"
                    style={{ background: `${item.color}15`, color: item.color }}
                  >
                    {item.stage}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold mb-1" style={{ color: 'var(--cw-ink)' }}>{item.title}</h4>
                  <p className="text-xs mb-1.5" style={{ color: 'var(--cw-ink-secondary)' }}>{item.desc}</p>
                  <span className="text-[10px] font-semibold" style={{ color: item.color }}>{item.agent}</span>
                </div>
              </div>
              {i < 4 && (
                <div className="flex justify-center">
                  <div className="w-px h-3" style={{ background: 'var(--cw-border)' }} />
                </div>
              )}
            </div>
          ))}
        </div>

        <Callout variant="purple">
          <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
            Each stage in this pipeline can be handled by a different agent with specialized capabilities.
            The human reviews at key checkpoints (before deploying, for example) but the routine work
            is handled autonomously.
          </p>
        </Callout>
      </section>

      {/* Section: Tool Landscape */}
      <section className="mb-16" id="tool-landscape">
        <div className="section-label">Ecosystem</div>
        <h2 className="mb-4">
          The Agentic <span className="text-highlight">Tool Landscape</span>
        </h2>
        <p className="mb-6" style={{ color: 'var(--cw-ink-secondary)' }}>
          Beyond Claude Code, there is a growing ecosystem of tools for building and
          orchestrating AI agent workflows. Here are the key categories and tools to know.
        </p>

        <div className="space-y-6">
          {/* Orchestration Frameworks */}
          <Card>
            <div className="flex items-center gap-3 mb-4">
              <h3>Orchestration Frameworks</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(107,45,139,0.1)', color: 'var(--cw-primary)' }}>BUILD PIPELINES</span>
            </div>
            <CardGrid columns={3}>
              {[
                { name: 'n8n', desc: 'Visual workflow automation. Connect AI models to business tools with a drag-and-drop interface. Self-hostable.', color: '#EA4B71' },
                { name: 'LangChain', desc: 'Python/JS framework for chaining LLM calls with tools, memory, and retrieval. The most popular agent framework.', color: '#1C3C3C' },
                { name: 'LangGraph', desc: 'Extension of LangChain for building stateful, multi-agent workflows as graphs. Handles complex agent coordination.', color: '#3B82F6' },
              ].map(tool => (
                <div key={tool.name} className="p-4 rounded-lg" style={{ background: 'var(--cw-primary-light)' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold text-white" style={{ background: tool.color }}>
                      {tool.name[0]}
                    </div>
                    <h4 className="text-sm font-semibold">{tool.name}</h4>
                  </div>
                  <p className="text-xs" style={{ color: 'var(--cw-ink-muted)' }}>{tool.desc}</p>
                </div>
              ))}
            </CardGrid>
          </Card>

          {/* Multi-Agent Frameworks */}
          <Card>
            <div className="flex items-center gap-3 mb-4">
              <h3>Multi-Agent Frameworks</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(58,158,110,0.1)', color: 'var(--cw-success)' }}>TEAM OF AGENTS</span>
            </div>
            <CardGrid columns={3}>
              {[
                { name: 'CrewAI', desc: 'Define agents with roles, goals, and backstories. Agents collaborate like a team to complete complex tasks.', color: '#FF6B35' },
                { name: 'AutoGen', desc: 'Microsoft framework for multi-agent conversations. Agents can debate, review each other, and reach consensus.', color: '#0078D4' },
                { name: 'Swarm', desc: 'OpenAI\'s lightweight multi-agent framework. Agents hand off tasks to each other based on expertise.', color: '#10A37F' },
              ].map(tool => (
                <div key={tool.name} className="p-4 rounded-lg" style={{ background: 'var(--cw-primary-light)' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold text-white" style={{ background: tool.color }}>
                      {tool.name[0]}
                    </div>
                    <h4 className="text-sm font-semibold">{tool.name}</h4>
                  </div>
                  <p className="text-xs" style={{ color: 'var(--cw-ink-muted)' }}>{tool.desc}</p>
                </div>
              ))}
            </CardGrid>
          </Card>

          {/* Coding Agents */}
          <Card>
            <div className="flex items-center gap-3 mb-4">
              <h3>Coding Agents</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(74,111,165,0.1)', color: 'var(--cw-info)' }}>WRITE CODE</span>
            </div>
            <CardGrid columns={3}>
              {[
                { name: 'Claude Code', desc: 'Anthropic\'s terminal-based coding agent. Deep reasoning, plan mode, and strong code quality. Our primary tool.', color: '#D97706' },
                { name: 'Gemini CLI', desc: 'Google\'s coding agent with 2M token context. Sub-agent delegation, persistent memory, and free tier.', color: '#4285F4' },
                { name: 'Devin / SWE-Agent', desc: 'Autonomous software engineering agents that can plan, code, test, and debug entire features end-to-end.', color: '#7C3AED' },
              ].map(tool => (
                <div key={tool.name} className="p-4 rounded-lg" style={{ background: 'var(--cw-primary-light)' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold text-white" style={{ background: tool.color }}>
                      {tool.name[0]}
                    </div>
                    <h4 className="text-sm font-semibold">{tool.name}</h4>
                  </div>
                  <p className="text-xs" style={{ color: 'var(--cw-ink-muted)' }}>{tool.desc}</p>
                </div>
              ))}
            </CardGrid>
          </Card>

          {/* Infrastructure */}
          <Card>
            <div className="flex items-center gap-3 mb-4">
              <h3>Infrastructure &amp; Protocols</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(217,85,80,0.1)', color: 'var(--cw-warning)' }}>CONNECT EVERYTHING</span>
            </div>
            <CardGrid columns={3}>
              {[
                { name: 'MCP', desc: 'Model Context Protocol by Anthropic. A standard for connecting AI models to external tools, databases, and APIs.', color: '#6B2D8B' },
                { name: 'Vercel AI SDK', desc: 'TypeScript toolkit for building AI-powered applications. Supports streaming, tool calling, and multi-step agents.', color: '#000000' },
                { name: 'Ollama', desc: 'Run open-source LLMs locally. Use local models for sensitive data or offline development. Supports tool calling.', color: '#2D2D2D' },
              ].map(tool => (
                <div key={tool.name} className="p-4 rounded-lg" style={{ background: 'var(--cw-primary-light)' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold text-white" style={{ background: tool.color }}>
                      {tool.name[0]}
                    </div>
                    <h4 className="text-sm font-semibold">{tool.name}</h4>
                  </div>
                  <p className="text-xs" style={{ color: 'var(--cw-ink-muted)' }}>{tool.desc}</p>
                </div>
              ))}
            </CardGrid>
          </Card>
        </div>
      </section>

      {/* Section: Getting Started with Agents */}
      <section className="mb-16" id="getting-started">
        <div className="section-label">Start Here</div>
        <h2 className="mb-4">
          Getting Started with <span className="text-highlight">Agents</span>
        </h2>

        <StepList
          steps={[
            {
              title: 'Master the basics first',
              description: 'Get comfortable with Claude Code as your primary tool before orchestrating multiple agents.',
            },
            {
              title: 'Identify your first pipeline',
              description: 'Pick a repetitive workflow (code review, documentation, testing) and map it as a series of agent steps.',
            },
            {
              title: 'Start with multi-instance Claude',
              description: 'Run separate Claude Code sessions for research, implementation, and testing. Share context via markdown files.',
            },
            {
              title: 'Add automation gradually',
              description: 'Start with manual handoffs, then automate with scripts. Only remove human checkpoints when you trust the output.',
            },
          ]}
        />

        <div className="mt-6">
          <CodeBlock
            title="Minimal Agentic Pipeline Script"
            code={`#!/bin/bash
# simple-pipeline.sh - Automated bug fix pipeline

BUG_DESC="$1"

# Step 1: Claude investigates
claude -p "Investigate this bug: $BUG_DESC. \\
  Search the codebase for the root cause. \\
  Write findings to INVESTIGATION.md" \\
  --add src/

# Step 2: Claude creates fix plan
claude -p "Based on INVESTIGATION.md, create a fix plan. \\
  Write to PLAN.md with specific file changes needed." \\
  --add INVESTIGATION.md

# Step 3: Second Claude instance executes the plan
claude -p "Based on PLAN.md, implement the fix. \\
  Make the code changes described. \\
  Run tests after each change." \\
  --add PLAN.md

# Step 4: Claude reviews
claude -p "Review all changes since the last commit. \\
  Check for correctness, edge cases, and test coverage. \\
  Write review to REVIEW.md" \\
  --diff HEAD

echo "Pipeline complete. Check REVIEW.md for results."`}
          />
        </div>

        <Callout variant="sage" className="mt-6">
          <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
            <strong>Start simple.</strong> The most effective agentic workflows start with just two agents
            and a shared markdown file for handoff. Complexity should grow organically as you build trust
            in the system.
          </p>
        </Callout>
      </section>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8 mt-8" style={{ borderTop: '1px solid var(--cw-border)' }}>
        <Link
          href="/vibe-coding/cheatsheet"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all pill-btn"
        >
          <ArrowLeft size={16} /> Cheatsheet
        </Link>
        <Link
          href="/agentic-ai/skills"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:gap-3"
          style={{ background: 'var(--cw-primary)', color: '#fff' }}
        >
          Next: AI Skills <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Card, CardGrid } from '@/components/content/Card';
import { Callout } from '@/components/content/Callout';
import { TierBadge } from '@/components/content/TierBadge';
import { ClaudePlanNotice } from '@/components/content/ClaudePlanNotice';
import { ClaudeRecommender } from '@/components/interactive/ClaudeRecommender';
import { CLAUDE_PRODUCTS } from '@/lib/claude-products';

export default function ChooseYourClaudePage() {
  return (
    <div>
      <TierBadge tier="beginner" />
      <h1 className="mt-4 mb-4">Choose Your Claude</h1>
      <p className="mb-6">
        Same AI. Two ways to use it: the Claude app for everyday work, and Claude Code for
        building software. Both come with every seat on the Cover Whale Teams plan.
      </p>

      <ClaudePlanNotice compact className="mb-12" />

      {/* Section: Interactive Recommender */}
      <section className="mb-16" id="recommender">
        <div className="section-label">Find Your Fit</div>
        <h2 className="mb-6">
          Which Claude is <span className="text-highlight">Right for You?</span>
        </h2>
        <p className="mb-6" style={{ color: 'var(--cw-ink-secondary)' }}>
          Not sure which to pick? Describe what you want to do and we&apos;ll point you in the
          right direction.
        </p>

        <ClaudeRecommender />
      </section>

      {/* Section: Quick Overview */}
      <section className="mb-16" id="overview">
        <div className="section-label">The Big Picture</div>
        <h2 className="mb-6">
          Two Ways to <span className="text-highlight">Use Claude</span>
        </h2>

        <CardGrid columns={2}>
          {CLAUDE_PRODUCTS.map((product) => (
            <Card key={product.id}>
              <div className="mb-3">
                <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--cw-ink)' }}>
                  {product.name}
                </h3>
                <p className="text-sm italic" style={{ color: 'var(--cw-primary)' }}>
                  {product.tagline}
                </p>
              </div>

              <div className="space-y-3 mb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--cw-ink-muted)' }}>
                    The vibe
                  </p>
                  <p className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
                    {product.vibe}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--cw-ink-muted)' }}>
                    Access
                  </p>
                  <p className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
                    {product.access}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--cw-ink-muted)' }}>
                    Setup
                  </p>
                  <p className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
                    {product.setupTime}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--cw-ink-muted)' }}>
                  Best for
                </p>
                <div className="space-y-1.5">
                  {product.bestFor.map((item, i) => (
                    <div key={i} className="flex items-baseline gap-2 text-xs" style={{ color: 'var(--cw-ink-secondary)' }}>
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1" style={{ background: 'var(--cw-primary)' }} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </CardGrid>

        <Callout variant="warning" className="mt-6">
          <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
            <strong>Cowork is now part of the Claude app.</strong> There is no separate tab: chat,
            projects, artifacts, effort and model choice all live in one app, in the browser and on
            your phone too. Working directly with the files on your computer still needs the desktop
            app. See{' '}
            <Link href="/claude-cowork" className="underline">The Claude App</Link>.
          </p>
        </Callout>
      </section>

      {/* Section: Capabilities Comparison */}
      <section className="mb-16" id="capabilities">
        <div className="section-label">Side by Side</div>
        <h2 className="mb-6">
          Capability <span className="text-highlight">Comparison</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm" style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
            <thead>
              <tr>
                <th
                  className="text-left px-4 py-3 font-semibold"
                  style={{ color: 'var(--cw-ink-muted)', borderBottom: '2px solid var(--cw-border)' }}
                >
                  What it can do
                </th>
                {CLAUDE_PRODUCTS.map((p) => (
                  <th
                    key={p.id}
                    className="text-left px-4 py-3 font-bold"
                    style={{ color: 'var(--cw-ink)', borderBottom: '2px solid var(--cw-border)' }}
                  >
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {([
                { label: 'Answer questions', key: 'answerQuestions' as const },
                { label: 'Create real files', key: 'createFiles' as const },
                { label: 'Build interactive things', key: 'buildInteractive' as const },
                { label: 'Use plugins / add-ons', key: 'usePlugins' as const },
                { label: 'Connect to your tools', key: 'connectTools' as const },
                { label: 'Search the internet', key: 'searchInternet' as const },
                { label: 'Extended thinking', key: 'extendedThinking' as const },
                { label: 'Work with files on your computer', key: 'localFiles' as const },
              ]).map((row, i) => (
                <tr key={row.key}>
                  <td
                    className="px-4 py-3 font-medium"
                    style={{
                      color: 'var(--cw-ink-secondary)',
                      borderBottom: '1px solid var(--cw-border)',
                      background: i % 2 === 0 ? 'var(--cw-surface)' : 'transparent',
                    }}
                  >
                    {row.label}
                  </td>
                  {CLAUDE_PRODUCTS.map((p) => (
                    <td
                      key={p.id}
                      className="px-4 py-3"
                      style={{
                        color: 'var(--cw-ink-muted)',
                        borderBottom: '1px solid var(--cw-border)',
                        background: i % 2 === 0 ? 'var(--cw-surface)' : 'transparent',
                      }}
                    >
                      {p.capabilities[row.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section: Context & Identity */}
      <section className="mb-16" id="context">
        <div className="section-label">How It Remembers You</div>
        <h2 className="mb-6">
          Context &amp; <span className="text-highlight">Identity</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm" style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
            <thead>
              <tr>
                <th
                  className="text-left px-4 py-3 font-semibold"
                  style={{ color: 'var(--cw-ink-muted)', borderBottom: '2px solid var(--cw-border)' }}
                />
                {CLAUDE_PRODUCTS.map((p) => (
                  <th
                    key={p.id}
                    className="text-left px-4 py-3 font-bold"
                    style={{ color: 'var(--cw-ink)', borderBottom: '2px solid var(--cw-border)' }}
                  >
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {([
                { label: 'Your Identity', key: 'contextIdentity' as const },
                { label: 'Context Input', key: 'contextInput' as const },
                { label: 'Context Between Chats', key: 'contextPersistence' as const },
              ]).map((row, i) => (
                <tr key={row.key}>
                  <td
                    className="px-4 py-3 font-semibold"
                    style={{
                      color: 'var(--cw-ink-secondary)',
                      borderBottom: '1px solid var(--cw-border)',
                      background: i % 2 === 0 ? 'var(--cw-surface)' : 'transparent',
                    }}
                  >
                    {row.label}
                  </td>
                  {CLAUDE_PRODUCTS.map((p) => (
                    <td
                      key={p.id}
                      className="px-4 py-3"
                      style={{
                        color: 'var(--cw-ink-muted)',
                        borderBottom: '1px solid var(--cw-border)',
                        background: i % 2 === 0 ? 'var(--cw-surface)' : 'transparent',
                      }}
                    >
                      {p[row.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section: Quick Decision Guide */}
      <section className="mb-16" id="decision-guide">
        <div className="section-label">TL;DR</div>
        <h2 className="mb-6">
          Quick <span className="text-highlight">Decision Guide</span>
        </h2>

        <CardGrid columns={2}>
          <Card>
            <div
              className="w-3 h-3 rounded-full mb-3"
              style={{ background: 'var(--cw-primary)' }}
            />
            <h4 className="mb-2" style={{ color: 'var(--cw-ink)' }}>Building?</h4>
            <p className="text-sm" style={{ color: 'var(--cw-ink-muted)' }}>
              Use <strong>Claude Code</strong>. It sees your whole project, writes real code,
              and runs things for you.
            </p>
          </Card>
          <Card>
            <div
              className="w-3 h-3 rounded-full mb-3"
              style={{ background: 'var(--cw-info)' }}
            />
            <h4 className="mb-2" style={{ color: 'var(--cw-ink)' }}>Documents, analysis, recurring tasks?</h4>
            <p className="text-sm" style={{ color: 'var(--cw-ink-muted)' }}>
              Use <strong>the Claude app</strong>. It reads your files, creates real documents,
              sounds like you, and keeps your context in a project so you set it up once.
            </p>
          </Card>
        </CardGrid>
      </section>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8 mt-8" style={{ borderTop: '1px solid var(--cw-border)' }}>
        <Link
          href="/claude-cowork"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all pill-btn"
        >
          <ArrowLeft size={16} /> The Claude App
        </Link>
        <Link
          href="/right-size-your-model"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:gap-3"
          style={{ background: 'var(--cw-primary)', color: '#fff' }}
        >
          Next: Right-Size Your Model <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

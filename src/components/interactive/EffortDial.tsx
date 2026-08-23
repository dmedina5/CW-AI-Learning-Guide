'use client';

import { useState } from 'react';
import { Layers, Zap } from 'lucide-react';
import { EFFORT_LEVELS } from '@/lib/claude-models';

export function EffortDial() {
  const [index, setIndex] = useState(2); // high — the default
  const level = EFFORT_LEVELS[index];
  const peak = EFFORT_LEVELS[EFFORT_LEVELS.length - 1].costMultiplier;

  return (
    <div>
      <div
        className="rounded-2xl p-6 md:p-8"
        style={{ background: 'var(--cw-surface)', border: '1px solid var(--cw-border)' }}
      >
        {/* Slider */}
        <label htmlFor="effort-dial" className="sr-only">
          Effort level
        </label>
        <input
          id="effort-dial"
          type="range"
          min={0}
          max={EFFORT_LEVELS.length - 1}
          step={1}
          value={index}
          onChange={e => setIndex(Number(e.target.value))}
          className="w-full mb-3 cursor-pointer"
          style={{ accentColor: level.color }}
        />

        <div className="flex gap-1.5 mb-6">
          {EFFORT_LEVELS.map((l, i) => {
            const active = i === index;
            return (
              <button
                key={l.id}
                onClick={() => setIndex(i)}
                className="flex-1 py-2 px-1 rounded-lg text-center transition-all"
                style={{
                  background: active ? l.color : 'var(--cw-bg)',
                  border: `1px solid ${active ? l.color : 'var(--cw-border)'}`,
                }}
              >
                <span
                  className="text-xs font-mono font-semibold"
                  style={{ color: active ? '#fff' : 'var(--cw-ink-muted)' }}
                >
                  {l.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Detail */}
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <h3 className="text-2xl font-extrabold font-mono" style={{ color: level.color }}>
            {level.name}
          </h3>
          <span
            className="text-xs px-2.5 py-1 rounded-full font-semibold uppercase tracking-wider"
            style={{ background: `${level.color}18`, color: level.color }}
          >
            {level.label}
          </span>
        </div>

        <p className="text-base mb-2" style={{ color: 'var(--cw-ink-secondary)' }}>
          {level.what}
        </p>
        <p className="text-base mb-6" style={{ color: 'var(--cw-ink-secondary)' }}>
          <strong style={{ color: 'var(--cw-ink)' }}>Best for:</strong> {level.bestFor}
        </p>

        {/* Relative spend */}
        <div
          className="rounded-xl p-5"
          style={{ background: 'var(--cw-bg)', border: '1px solid var(--cw-border)' }}
        >
          <div className="flex items-baseline justify-between mb-3">
            <p
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: 'var(--cw-ink-muted)' }}
            >
              Thinking tokens, relative to low
            </p>
            <p className="text-lg font-extrabold tabular-nums" style={{ color: level.color }}>
              ~{level.costMultiplier}x
            </p>
          </div>
          <div className="h-3 rounded-full overflow-hidden" style={{ background: 'var(--cw-ink-10)' }}>
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${(level.costMultiplier / peak) * 100}%`,
                background: level.color,
              }}
            />
          </div>
          <p className="text-[11px] mt-3" style={{ color: 'var(--cw-ink-muted)' }}>
            Thinking bills as output. Same model, same prompt — turning the dial from{' '}
            <code>low</code> to <code>max</code> multiplies the expensive half of the bill roughly
            eightfold. Illustrative; real thinking depth varies by task.
          </p>
        </div>
      </div>

      {/* ultracode — a mode, not a level */}
      <div
        className="rounded-2xl p-6 mt-4"
        style={{ background: 'var(--cw-surface)', border: '1px solid var(--cw-border)' }}
      >
        <div className="flex items-center gap-2.5 mb-2">
          <Layers size={18} style={{ color: 'var(--cw-warning)' }} />
          <h3 className="text-lg font-bold" style={{ color: 'var(--cw-ink)' }}>
            <code className="font-mono">ultracode</code> is a mode, not a level
          </h3>
        </div>
        <p className="text-base mb-3" style={{ color: 'var(--cw-ink-secondary)' }}>
          It does not sit on the dial above. <code>ultracode</code> fans out a team of sub-agents
          and adversarially verifies the result, so a single request can become dozens of model
          runs. That makes it the largest single cost decision on this page.
        </p>
        <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
          <strong style={{ color: 'var(--cw-ink)' }}>Best for:</strong> audits, exhaustive reviews,
          big migrations — the work where missing something is far more expensive than the tokens.
          Reach for it deliberately, never as a default.
        </p>
      </div>

      {/* The one-line rule */}
      <div
        className="flex items-start gap-4 p-6 rounded-xl mt-4"
        style={{ background: 'var(--cw-surface)', border: '1px solid var(--cw-border)' }}
      >
        <div
          className="w-[3px] flex-shrink-0 rounded-sm self-stretch"
          style={{ background: 'var(--cw-primary)' }}
        />
        <div className="flex items-start gap-3">
          <Zap size={18} className="flex-shrink-0 mt-1" style={{ color: 'var(--cw-primary)' }} />
          <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
            <strong style={{ color: 'var(--cw-ink)' }}>Match the effort to the stakes.</strong>{' '}
            <code>high</code> by default, <code>xhigh</code> when you are building, and{' '}
            <code>max</code> or <code>ultracode</code> only when correctness must beat speed and
            cost. <code>low</code> and <code>medium</code> are not lesser settings — they are the
            right answer for quick, simple, high-volume work.
          </p>
        </div>
      </div>
    </div>
  );
}

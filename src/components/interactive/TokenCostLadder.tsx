'use client';

import { useMemo, useState } from 'react';
import {
  CLAUDE_MODELS,
  EFFORT_LEVELS,
  TASK_SHAPES,
  estimateCost,
  fitsContext,
  getEffort,
  type EffortId,
} from '@/lib/claude-models';

const SHAPE_KEYS = ['snippet', 'pages', 'pile', 'corpus'] as const;

function money(n: number): string {
  if (n < 0.01) return `${(n * 100).toFixed(2)}¢`;
  if (n < 1) return `$${n.toFixed(3)}`;
  if (n < 100) return `$${n.toFixed(2)}`;
  return `$${Math.round(n).toLocaleString()}`;
}

export function TokenCostLadder() {
  const [shapeKey, setShapeKey] = useState<string>('pages');
  const [effortId, setEffortId] = useState<EffortId>('high');
  const [runs, setRuns] = useState(100);

  const shape = TASK_SHAPES[shapeKey];
  const effort = getEffort(effortId);

  const rows = useMemo(() => {
    const computed = CLAUDE_MODELS.map(model => {
      const fits = fitsContext(model, shape);
      return {
        model,
        fits,
        perRun: fits ? estimateCost(model, effort, shape) : 0,
      };
    });
    const cheapest = Math.min(...computed.filter(r => r.fits).map(r => r.perRun));
    const peak = Math.max(...computed.map(r => r.perRun));
    return computed.map(r => ({
      ...r,
      multiple: cheapest > 0 ? r.perRun / cheapest : 1,
      pct: peak > 0 ? (r.perRun / peak) * 100 : 0,
    }));
  }, [shape, effort]);

  return (
    <div
      className="rounded-2xl p-6 md:p-8"
      style={{ background: 'var(--cw-surface)', border: '1px solid var(--cw-border)' }}
    >
      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        <div>
          <p
            className="text-xs font-semibold uppercase tracking-wider mb-2"
            style={{ color: 'var(--cw-ink-muted)' }}
          >
            How much goes in
          </p>
          <div className="flex flex-wrap gap-1.5">
            {SHAPE_KEYS.map(key => {
              const active = key === shapeKey;
              return (
                <button
                  key={key}
                  onClick={() => setShapeKey(key)}
                  className="text-xs px-3 py-1.5 rounded-full font-medium transition-all"
                  style={{
                    background: active ? 'var(--cw-primary)' : 'var(--cw-bg)',
                    color: active ? '#fff' : 'var(--cw-ink-muted)',
                    border: `1px solid ${active ? 'var(--cw-primary)' : 'var(--cw-border)'}`,
                  }}
                >
                  {TASK_SHAPES[key].label}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <p
            className="text-xs font-semibold uppercase tracking-wider mb-2"
            style={{ color: 'var(--cw-ink-muted)' }}
          >
            Effort
          </p>
          <div className="flex flex-wrap gap-1.5">
            {EFFORT_LEVELS.map(level => {
              const active = level.id === effortId;
              return (
                <button
                  key={level.id}
                  onClick={() => setEffortId(level.id)}
                  className="text-xs px-3 py-1.5 rounded-full font-mono font-medium transition-all"
                  style={{
                    background: active ? level.color : 'var(--cw-bg)',
                    color: active ? '#fff' : 'var(--cw-ink-muted)',
                    border: `1px solid ${active ? level.color : 'var(--cw-border)'}`,
                  }}
                >
                  {level.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Run count */}
      <div className="flex flex-wrap items-center gap-2 mb-5">
        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--cw-ink-muted)' }}>
          Runs
        </span>
        {[1, 100, 1000, 10000].map(n => {
          const active = n === runs;
          return (
            <button
              key={n}
              onClick={() => setRuns(n)}
              className="text-xs px-3 py-1.5 rounded-full font-medium tabular-nums transition-all"
              style={{
                background: active ? 'var(--cw-ink)' : 'var(--cw-bg)',
                color: active ? '#fff' : 'var(--cw-ink-muted)',
                border: `1px solid ${active ? 'var(--cw-ink)' : 'var(--cw-border)'}`,
              }}
            >
              {n.toLocaleString()}
            </button>
          );
        })}
        <span className="text-xs ml-1" style={{ color: 'var(--cw-ink-muted)' }}>
          × {shape.inputTokens.toLocaleString()} in / {shape.outputTokens.toLocaleString()} out
        </span>
      </div>

      {/* Rows */}
      <div className="space-y-3">
        {rows.map(row => (
          <div key={row.model.id}>
            <div className="flex items-baseline justify-between mb-1.5 gap-3">
              <div className="flex items-baseline gap-2 min-w-0">
                <span className="text-sm font-bold truncate" style={{ color: 'var(--cw-ink)' }}>
                  {row.model.name}
                </span>
                <span className="text-xs font-mono flex-shrink-0" style={{ color: row.model.color }}>
                  {row.model.priceTier}
                </span>
                {!row.model.hasEffortDial && row.fits && (
                  <span className="text-[10px] flex-shrink-0" style={{ color: 'var(--cw-ink-muted)' }}>
                    no effort dial
                  </span>
                )}
              </div>
              <div className="flex items-baseline gap-3 flex-shrink-0">
                {row.fits && row.multiple > 1.05 && (
                  <span className="text-xs tabular-nums" style={{ color: 'var(--cw-ink-muted)' }}>
                    {row.multiple.toFixed(1)}× cheapest
                  </span>
                )}
                <span
                  className="text-base font-extrabold font-mono tabular-nums"
                  style={{ color: row.fits ? 'var(--cw-ink)' : 'var(--cw-ink-muted)' }}
                >
                  {row.fits ? money(row.perRun * runs) : 'will not fit'}
                </span>
              </div>
            </div>
            <div className="h-2.5 rounded-full overflow-hidden" style={{ background: 'var(--cw-ink-10)' }}>
              {row.fits && (
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.max(row.pct, 1.5)}%`, background: row.model.color }}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      <p className="text-[11px] mt-5" style={{ color: 'var(--cw-ink-muted)' }}>
        List API rates per 1M tokens. Effort scales the output side only, using illustrative
        thinking-token estimates — treat these as ratios to reason with, not a billing statement.
        Haiku 4.5 has no effort dial, so the effort buttons do not move its bar. Prompt caching can
        cut the input side of repeated runs substantially, which is its own lever.
      </p>
    </div>
  );
}

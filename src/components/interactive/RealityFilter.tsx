'use client';

import { useState } from 'react';
import { REALITY_FILTER_LABELS } from '@/lib/reality-filter';

const EXAMPLE_WITHOUT = `Adding dash cams will prevent fraudulent claims and guarantees lower premiums. The fleet's loss ratio will improve by 15-20% within the first year. This technology eliminates the need for manual claims investigation.`;

const EXAMPLE_WITH = `[Sourced] Your submission lists 42 drivers, 35 power units, and no dash cams currently installed.

[Inference] Fleets that add cameras generally see fewer disputed liability claims — the pattern is well established in the industry, but I'm applying it to your fleet, not measuring it. Expect a directional improvement, not the 15-20% you'd get from a vendor deck.

[Unverified] I can't tell you the premium impact. That turns on the carrier's telematics credit, which isn't in anything you've sent me. Share their underwriting guidelines and I can be specific.

Nothing here supports "guarantees lower premiums." The direction is likely; the size isn't knowable from what I have.`;

export function RealityFilter() {
  const [filterOn, setFilterOn] = useState(false);

  return (
    <div className="mt-5">
      {/* Toggle */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => setFilterOn(!filterOn)}
          className={`
            relative inline-flex h-7 w-14 items-center rounded-full transition-colors cursor-pointer
          `}
          style={{ background: filterOn ? 'var(--cw-success)' : '#ccc' }}
        >
          <span
            className={`
              inline-block h-5 w-5 rounded-full bg-white transition-transform
              ${filterOn ? 'translate-x-8' : 'translate-x-1'}
            `}
          />
        </button>
        <span className="text-sm font-semibold" style={{ color: 'var(--cw-ink)' }}>
          Reality Filter: {filterOn ? 'ON' : 'OFF'}
        </span>
      </div>

      {/* Preview panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Without filter */}
        <div
          className={`rounded-2xl overflow-hidden transition-all ${!filterOn ? 'ring-2 ring-offset-2 ring-red-400' : 'opacity-60'}`}
          style={{
            background: 'var(--cw-surface)',
            border: '1px solid var(--cw-border)',
          }}
        >
          <div
            className="px-5 py-3 text-xs font-bold uppercase tracking-wider"
            style={{ background: 'rgba(217,85,80,0.08)', color: 'var(--cw-warning)' }}
          >
            Without Reality Filter
          </div>
          <div className="p-5">
            <pre className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: 'var(--cw-ink-secondary)', fontFamily: 'inherit' }}>
              {EXAMPLE_WITHOUT}
            </pre>
            {!filterOn && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {['will prevent', 'guarantees', 'eliminates'].map(word => (
                  <span
                    key={word}
                    className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                    style={{ background: 'rgba(217,85,80,0.1)', color: 'var(--cw-warning)' }}
                  >
                    Flagged: &ldquo;{word}&rdquo;
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* With filter */}
        <div
          className={`rounded-2xl overflow-hidden transition-all ${filterOn ? 'ring-2 ring-offset-2 ring-green-500' : 'opacity-60'}`}
          style={{
            background: 'var(--cw-surface)',
            border: '1px solid var(--cw-border)',
          }}
        >
          <div
            className="px-5 py-3 text-xs font-bold uppercase tracking-wider"
            style={{ background: 'rgba(58,158,110,0.08)', color: 'var(--cw-success)' }}
          >
            With Reality Filter
          </div>
          <div className="p-5">
            <pre className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: 'var(--cw-ink-secondary)', fontFamily: 'inherit' }}>
              {EXAMPLE_WITH}
            </pre>
          </div>
        </div>
      </div>

      {/* Labels reference */}
      <div className="flex flex-wrap gap-2 mt-4">
        {REALITY_FILTER_LABELS.map(item => (
          <div
            key={item.label}
            className="px-3 py-2 rounded-lg"
            style={{ background: 'var(--cw-primary-light)' }}
          >
            <span className="text-xs font-bold" style={{ color: 'var(--cw-primary-dark)' }}>
              {item.label}
            </span>
            <span className="text-xs ml-1.5" style={{ color: 'var(--cw-ink-muted)' }}>
              {item.desc}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

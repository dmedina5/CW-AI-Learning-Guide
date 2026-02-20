'use client';

import { useState } from 'react';

const EXAMPLE_WITHOUT = `Adding dash cams will prevent fraudulent claims and guarantees lower premiums. The fleet's loss ratio will improve by 15-20% within the first year. This technology eliminates the need for manual claims investigation.`;

const EXAMPLE_WITH = `Adding dash cams [Inference] may help reduce fraudulent claims based on industry patterns, and [Speculation] could potentially contribute to lower premiums depending on carrier guidelines.

Confidence: 0.72

[Pattern-Based] Industry data suggests a correlation between dash cam adoption and reduced fraud claims, though specific percentage improvements vary significantly by fleet size, region, and existing safety programs.

[Unverified] I cannot verify specific premium impact percentages without knowing the carrier's underwriting guidelines.

To increase confidence, I would need:
• Specific carrier guidelines on telematics discounts
• Fleet size and current loss ratio data
• Region-specific fraud statistics`;

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
        {[
          { label: '[Inference]', desc: 'Conclusions drawn from data' },
          { label: '[Speculation]', desc: 'Predictions without evidence' },
          { label: '[Unverified]', desc: 'Cannot be confirmed' },
          { label: '[Pattern-Based]', desc: 'Based on common patterns' },
        ].map(item => (
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

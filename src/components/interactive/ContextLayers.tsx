'use client';

import { useState } from 'react';

const LAYERS = [
  {
    label: 'No Context',
    hasContext: false,
    output: 'A generic, unfocused response. The model has knowledge but no direction.',
    insight: 'Without context, the model draws from everything it knows — which means the output is broad and unhelpful. This is why vague prompts get vague answers.',
    response: 'Generic, unfocused output',
  },
  {
    label: 'Claims Adjuster',
    hasContext: true,
    output: 'A detailed response about FNOL procedures, investigation checklists, and settlement workflows — specific to trucking insurance claims.',
    insight: '<strong>Same model.</strong> But now it knows you\'re a claims adjuster at a trucking insurer. The context layer focused the prediction on exactly what you need.',
    response: 'Focused, relevant output',
  },
  {
    label: 'Underwriter',
    hasContext: true,
    output: 'A risk assessment framework covering fleet size, driver MVR scores, cargo type, and loss history — tailored to commercial auto underwriting.',
    insight: '<strong>Same model again.</strong> Different context, completely different output. The underwriting lens surfaces knowledge the claims lens never would.',
    response: 'Focused, relevant output',
  },
  {
    label: 'Marketing Team',
    hasContext: true,
    output: 'A campaign brief with messaging angles for fleet safety programs, competitive positioning against legacy insurers, and social proof data points.',
    insight: '<strong>Still the same model.</strong> Marketing context surfaces creative and strategic knowledge. The model didn\'t learn anything new — your context changed the shape of the reply.',
    response: 'Focused, relevant output',
  },
];

export function ContextLayers() {
  const [activeLayer, setActiveLayer] = useState(0);
  const layer = LAYERS[activeLayer];

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start mt-5">
      {/* Stack visualization */}
      <div className="flex flex-col w-full lg:w-[340px] flex-shrink-0">
        <div className="flex flex-col gap-0">
          {/* Output layer */}
          <div
            className="rounded-t-xl p-5 text-center text-white"
            style={{ background: 'var(--cw-ink)' }}
          >
            <h3 className="text-base font-semibold text-white mb-1">▾ Output</h3>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>
              {layer.response}
            </p>
          </div>

          {/* Context layer (conditionally visible) */}
          <div
            className="overflow-hidden text-center text-white transition-all duration-500"
            style={{
              background: 'var(--cw-primary)',
              maxHeight: layer.hasContext ? '120px' : '0',
              padding: layer.hasContext ? '20px 24px' : '0 24px',
              opacity: layer.hasContext ? 1 : 0.4,
              transform: layer.hasContext ? 'scaleX(1)' : 'scaleX(0.94)',
            }}
          >
            <h3 className="text-base font-semibold text-white mb-1">Your Context</h3>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Prompts, documents, conversation history
            </p>
          </div>

          {/* Model layer */}
          <div
            className="rounded-b-xl p-5 text-center"
            style={{ background: 'var(--cw-surface)', border: '1px solid var(--cw-border)' }}
          >
            <h3 className="text-base font-semibold mb-1">The Model</h3>
            <p className="text-xs" style={{ color: 'var(--cw-ink-muted)' }}>
              Vast, static knowledge base — same for everyone
            </p>
          </div>
        </div>

        {/* AI Response box */}
        <div
          className="mt-5 p-5 rounded-xl transition-all"
          style={{ background: 'var(--cw-surface)', border: '1px solid var(--cw-border)' }}
        >
          <div
            className="text-[10px] uppercase tracking-widest font-bold mb-2"
            style={{ color: 'var(--cw-ink-muted)', letterSpacing: '2px' }}
          >
            AI Response
          </div>
          <p className="text-[15px] leading-relaxed" style={{ color: 'var(--cw-ink-secondary)' }}>
            {layer.output}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex-1">
        <div className="flex flex-wrap gap-2">
          {LAYERS.map((l, i) => (
            <button
              key={i}
              onClick={() => setActiveLayer(i)}
              className={`pill-btn ${activeLayer === i ? 'active' : ''}`}
            >
              {l.label}
            </button>
          ))}
        </div>
        <div
          className="mt-4 text-[15px] leading-relaxed min-h-[48px]"
          style={{ color: 'var(--cw-ink-muted)' }}
          dangerouslySetInnerHTML={{ __html: layer.insight }}
        />
      </div>
    </div>
  );
}

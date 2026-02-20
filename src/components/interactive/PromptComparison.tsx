'use client';

import { useState } from 'react';

export function PromptComparison() {
  const [showResults, setShowResults] = useState(false);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
        {/* Vague prompt */}
        <div
          className={`rounded-2xl overflow-hidden transition-all ${showResults ? 'border-2' : ''}`}
          style={{
            background: 'var(--cw-surface)',
            border: showResults ? '1px solid var(--cw-warning)' : '1px solid var(--cw-border)',
            boxShadow: showResults ? '0 4px 24px rgba(217,85,80,0.12)' : 'none',
          }}
        >
          <div
            className="px-5 py-4 text-xs font-bold uppercase tracking-widest"
            style={{ background: 'rgba(217, 85, 80, 0.08)', color: 'var(--cw-warning)' }}
          >
            Vague Prompt
          </div>
          <div className="p-5 text-sm leading-relaxed" style={{ color: 'var(--cw-ink-secondary)' }}>
            &ldquo;Write me something about our claims process.&rdquo;
          </div>
          {showResults && (
            <div
              className="px-5 py-4 text-[13px] leading-relaxed"
              style={{ borderTop: '1px solid var(--cw-border)', color: 'var(--cw-ink-muted)' }}
            >
              <strong style={{ color: 'var(--cw-warning)' }}>✘ Result:</strong>{' '}
              A generic 3-paragraph overview of insurance claims that could apply to any company.
              No structure, no specifics, nothing actionable.
            </div>
          )}
        </div>

        {/* Rich prompt */}
        <div
          className={`rounded-2xl overflow-hidden transition-all ${showResults ? 'border-2' : ''}`}
          style={{
            background: 'var(--cw-surface)',
            border: showResults ? '1px solid var(--cw-primary)' : '1px solid var(--cw-border)',
            boxShadow: showResults ? '0 4px 24px rgba(107,45,139,0.12)' : 'none',
          }}
        >
          <div
            className="px-5 py-4 text-xs font-bold uppercase tracking-widest"
            style={{ background: 'var(--cw-primary-light)', color: 'var(--cw-primary)' }}
          >
            Rich Prompt
          </div>
          <div className="p-5 text-sm leading-relaxed" style={{ color: 'var(--cw-ink-secondary)' }}>
            &ldquo;You are a claims operations analyst at a trucking insurance company. Write a 1-page
            summary of our claims process for new adjusters. Include:{' '}
            <em className="font-medium" style={{ color: 'var(--cw-ink-80)' }}>
              FNOL intake, investigation steps, resolution timeline, and escalation criteria
            </em>
            . Tone: professional but approachable.&rdquo;
          </div>
          {showResults && (
            <div
              className="px-5 py-4 text-[13px] leading-relaxed"
              style={{ borderTop: '1px solid var(--cw-border)', color: 'var(--cw-ink-muted)' }}
            >
              <strong style={{ color: 'var(--cw-success)' }}>✔ Result:</strong>{' '}
              A well-structured 1-page guide with clear sections for FNOL, investigation, timeline,
              and escalation. Uses trucking-specific language. Ready to hand to a new adjuster on day one.
            </div>
          )}
        </div>
      </div>

      {!showResults && (
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => setShowResults(true)}
            className="pill-btn active"
          >
            See the difference →
          </button>
        </div>
      )}

      {showResults && (
        <div className="mt-4">
          <Callout>
            <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
              <strong>Remember:</strong> Context is the lens. The more you give, the sharper the output.
              You don&apos;t need to be technical &mdash; just be specific about what you need.
            </p>
          </Callout>
        </div>
      )}
    </div>
  );
}

// Inline import to avoid circular dependency
function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex items-start gap-4 p-6 rounded-xl max-w-3xl"
      style={{ background: 'var(--cw-surface)', border: '1px solid var(--cw-border)' }}
    >
      <div className="w-[3px] flex-shrink-0 rounded-sm self-stretch" style={{ background: 'var(--cw-primary)' }} />
      <div className="flex-1">{children}</div>
    </div>
  );
}

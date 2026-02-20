'use client';

import { useState } from 'react';

type ContextType = null | 'nursery' | 'barnyard';

export function ContextDemo() {
  const [context, setContext] = useState<ContextType>(null);

  const results: Record<Exclude<ContextType, null>, { completion: string; color: string; explanation: string }> = {
    nursery: {
      completion: 'jumped over the moon',
      color: 'var(--cw-primary)',
      explanation: 'In the context of nursery rhymes, the AI predicts the most famous association.',
    },
    barnyard: {
      completion: 'goes moo',
      color: 'var(--cw-warning)',
      explanation: 'In the context of barnyard sounds, the prediction shifts entirely.',
    },
  };

  return (
    <div
      className="rounded-2xl p-8 mt-5 max-w-3xl"
      style={{ background: 'var(--cw-surface)', border: '1px solid var(--cw-border)' }}
    >
      <div
        className="text-[11px] uppercase tracking-wider font-semibold mb-4"
        style={{ color: 'var(--cw-ink-muted)', letterSpacing: '2.5px' }}
      >
        Choose a context
      </div>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setContext('nursery')}
          className={`pill-btn ${context === 'nursery' ? 'active' : ''}`}
          style={context === 'nursery' ? { background: 'var(--cw-primary)', color: '#fff', borderColor: 'var(--cw-primary)' } : {}}
        >
          Nursery Rhymes
        </button>
        <button
          onClick={() => setContext('barnyard')}
          className={`pill-btn ${context === 'barnyard' ? 'active' : ''}`}
          style={context === 'barnyard' ? { background: 'var(--cw-warning)', color: '#fff', borderColor: 'var(--cw-warning)' } : {}}
        >
          Barnyard Sounds
        </button>
      </div>

      <div className="flex items-center gap-2 flex-wrap my-3">
        <span className="text-[28px] font-semibold" style={{ letterSpacing: '-0.5px' }}>
          &ldquo;The cow{' '}
          {context ? (
            <strong style={{ color: results[context].color }}>
              {results[context].completion}
            </strong>
          ) : (
            <span style={{ color: 'var(--cw-ink-muted)' }}>___</span>
          )}
          &rdquo;
        </span>
      </div>

      {context && (
        <div
          className="mt-4 text-[15px] leading-relaxed transition-all"
          style={{ color: 'var(--cw-ink-muted)' }}
          dangerouslySetInnerHTML={{ __html: results[context].explanation }}
        />
      )}
    </div>
  );
}

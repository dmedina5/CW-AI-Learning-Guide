'use client';

const STATS = [
  {
    value: '43M/mo',
    color: 'var(--cw-primary)',
    description: 'Developers are merging 43 million code changes per month on GitHub — 1 billion annually — a pace never seen before, driven by AI coding tools.',
    source: 'Microsoft, 2026',
  },
  {
    value: '8% → 34%',
    color: 'var(--cw-warning)',
    description: 'Insurance industry AI adoption surged 325% in a single year (2024–2025). Our industry is moving fast.',
    source: 'Multimodal.dev Agentic AI Statistics',
  },
  {
    value: '93%',
    color: 'var(--cw-success)',
    description: 'of US IT executives are extremely interested in agentic workflows — AI systems that act autonomously.',
    source: 'Automation Anywhere',
  },
];

export function InnovationFlywheel() {
  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start mt-6">
      {/* Spinning flywheel */}
      <div className="relative w-[280px] h-[280px] flex-shrink-0 mx-auto lg:mx-0">
        <svg
          className="w-full h-full"
          viewBox="0 0 280 280"
          style={{ animation: 'spin 20s linear infinite' }}
        >
          <defs>
            <linearGradient id="fwg1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6B2D8B" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#6B2D8B" stopOpacity="0.03" />
            </linearGradient>
          </defs>
          <circle cx="140" cy="140" r="130" fill="none" stroke="url(#fwg1)" strokeWidth="20" />
          <circle
            cx="140" cy="140" r="130" fill="none" stroke="var(--cw-primary)"
            strokeWidth="3" strokeDasharray="60 22" strokeLinecap="round" opacity="0.6"
          />
          <circle
            cx="140" cy="140" r="108" fill="none" stroke="var(--cw-warning)"
            strokeWidth="2" strokeDasharray="40 30" strokeLinecap="round" opacity="0.35"
          />
          <g fill="var(--cw-primary)" opacity="0.7">
            <polygon points="140,7 147,20 133,20" transform="rotate(0,140,140)" />
            <polygon points="140,7 147,20 133,20" transform="rotate(90,140,140)" />
            <polygon points="140,7 147,20 133,20" transform="rotate(180,140,140)" />
            <polygon points="140,7 147,20 133,20" transform="rotate(270,140,140)" />
          </g>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          <div className="text-[28px] mb-1">⚡</div>
          <div
            className="text-[11px] font-bold uppercase tracking-widest"
            style={{ color: 'var(--cw-primary)', letterSpacing: '2px' }}
          >
            Magic Cycle
          </div>
        </div>

        <style jsx>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>

      {/* Stats */}
      <div className="flex-1 flex flex-col gap-4">
        {STATS.map((stat, i) => (
          <div
            key={i}
            className="p-5 rounded-2xl transition-colors"
            style={{ background: 'var(--cw-surface)', border: '1px solid var(--cw-border)' }}
          >
            <div
              className="text-[28px] font-extrabold leading-none"
              style={{ color: stat.color, letterSpacing: '-1px' }}
            >
              {stat.value}
            </div>
            <p className="text-sm mt-1 leading-relaxed" style={{ color: 'var(--cw-ink-muted)' }}>
              {stat.description}
            </p>
            <p className="text-[10px] mt-1 italic" style={{ color: 'var(--cw-ink-muted)' }}>
              {stat.source}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

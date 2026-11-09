'use client';

/**
 * Each statistic is quoted from its primary source, read 2026-11-09. Refresh
 * them from the same sources when a new edition comes out (Octoverse each
 * October; the Datos Insights insurer survey each summer; the Anthropic
 * Economic Index each release), and keep content-checks.sh in step.
 */
const STATS = [
  {
    value: '1.3B',
    color: 'var(--cw-primary)',
    description:
      'Pull requests merged on GitHub in the year to September 2026, more than triple the year before. By September, over 40% of new pull requests started with an AI agent’s first draft, up from 17% in March.',
    source: 'GitHub Octoverse 2026',
    url: 'https://github.blog/news-insights/octoverse/octoverse-commits-pushes-reach-new-highs-in-2026-as-developers-build-with-agents/',
  },
  {
    value: '22% → 74%',
    color: 'var(--cw-warning)',
    description:
      'Large P&C insurers running agentic AI pilots, 2025 to 2026. Midsize carriers went from 4% to 24%. Our industry is moving fast.',
    source: 'Datos Insights, survey of 44 P&C insurer CIOs, August 2026',
    url: 'https://datos-insights.com/reports/insurance-technology-trends-2026-pc-insurers-ins-2025-102223/',
  },
  {
    value: '5 h → 40 min',
    color: 'var(--cw-success)',
    description:
      'Tasks estimated to take a person about five hours working alone took about 40 minutes of conversation with Claude. These are model estimates of task time from Claude usage, not measured hours.',
    source: 'Anthropic Economic Index, May 2026 data',
    url: 'https://www.anthropic.com/economic-index',
  },
];

export function InnovationFlywheel() {
  return (
    <div data-export-widget="Innovation flywheel" className="flex flex-col lg:flex-row gap-8 items-start mt-6">
      {/* Spinning flywheel */}
      <div className="relative w-[280px] h-[280px] flex-shrink-0 mx-auto lg:mx-0">
        <svg
          className="w-full h-full animate-spin"
          viewBox="0 0 280 280"
          style={{ animationDuration: '20s' }}
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
      </div>

      {/* Stats */}
      <div className="flex-1 flex flex-col gap-4">
        {STATS.map(stat => (
          <div
            key={stat.source}
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
              <a href={stat.url} target="_blank" rel="noopener noreferrer" className="underline">
                {stat.source}
              </a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

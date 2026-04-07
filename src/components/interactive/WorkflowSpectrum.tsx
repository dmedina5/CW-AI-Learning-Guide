'use client';

import { useState } from 'react';

interface PatternInfo {
  id: number;
  name: string;
  subtitle: string;
  description: string;
  manages: string;
  parallelism: string;
  cost: string;
  bestFor: string;
}

const patterns: PatternInfo[] = [
  {
    id: 1,
    name: 'Sequential',
    subtitle: 'One session, one task at a time',
    description: 'Open a terminal, start Claude Code, and every task builds on the last. One conversation, growing context.',
    manages: 'You (1 session)',
    parallelism: 'None',
    cost: 'Low',
    bestFor: 'Simple, linear tasks',
  },
  {
    id: 2,
    name: 'Operator',
    subtitle: 'You run multiple terminals',
    description: 'Multiple terminal windows, each with its own Claude instance. You are the orchestrator, coordinating between them.',
    manages: 'You (multi-terminal)',
    parallelism: 'Manual',
    cost: 'Low-Medium',
    bestFor: 'Independent tasks, max control',
  },
  {
    id: 3,
    name: 'Split & Merge',
    subtitle: 'Claude runs sub-agents',
    description: 'Claude spawns and manages multiple sub-agents in parallel from a single terminal. Claude is the hub; sub-agents are the spokes.',
    manages: 'Claude (auto sub-agents)',
    parallelism: 'Auto (up to 10)',
    cost: 'Medium',
    bestFor: 'Parallel research, builder-validator',
  },
  {
    id: 4,
    name: 'Agent Teams',
    subtitle: 'Specialized agent collaboration',
    description: 'A Team Lead coordinates specialized Teammates with a shared task list. Full instances that build on each other\u2019s work.',
    manages: 'Team Lead Claude',
    parallelism: 'Specialists',
    cost: 'High (4-7x)',
    bestFor: 'Complex cross-collaboration',
  },
  {
    id: 5,
    name: 'Headless',
    subtitle: 'Fully autonomous, no human',
    description: 'Claude works independently with no terminal window, no back-and-forth. Set a task, walk away, come back to results.',
    manages: 'None (fully auto)',
    parallelism: 'Any',
    cost: 'Varies',
    bestFor: 'Recurring, automated tasks',
  },
];

export function WorkflowSpectrum() {
  const [active, setActive] = useState<number | null>(null);

  const nodePositions = [
    { x: 80, y: 140 },
    { x: 220, y: 140 },
    { x: 360, y: 140 },
    { x: 500, y: 140 },
    { x: 640, y: 140 },
  ];

  return (
    <div className="my-8">
      {/* SVG Spectrum */}
      <div
        className="glass-card p-6 overflow-x-auto"
        style={{ background: 'var(--cw-surface)' }}
      >
        <svg
          viewBox="0 0 720 240"
          className="w-full"
          style={{ minWidth: '600px', maxHeight: '240px' }}
        >
          <defs>
            <linearGradient id="spectrumGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3A9E6E" stopOpacity={0.8} />
              <stop offset="25%" stopColor="#4A6FA5" stopOpacity={0.8} />
              <stop offset="50%" stopColor="#6B2D8B" stopOpacity={0.8} />
              <stop offset="75%" stopColor="#D95550" stopOpacity={0.7} />
              <stop offset="100%" stopColor="#D95550" stopOpacity={0.9} />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Labels */}
          <text x="80" y="30" textAnchor="middle" fill="var(--cw-success)" fontSize="10" fontWeight="600" letterSpacing="2">
            SIMPLE
          </text>
          <text x="640" y="30" textAnchor="middle" fill="var(--cw-warning)" fontSize="10" fontWeight="600" letterSpacing="2">
            ADVANCED
          </text>

          {/* Spectrum line */}
          <line x1="80" y1="140" x2="640" y2="140" stroke="url(#spectrumGrad)" strokeWidth="3" strokeLinecap="round" />

          {/* Arrow head */}
          <polygon points="645,134 660,140 645,146" fill="var(--cw-warning)" opacity={0.9} />

          {/* Control labels */}
          <text x="80" y="220" textAnchor="middle" fill="var(--cw-ink-muted)" fontSize="9" fontWeight="500">
            HIGH CONTROL
          </text>
          <text x="640" y="220" textAnchor="middle" fill="var(--cw-ink-muted)" fontSize="9" fontWeight="500">
            FULL AUTONOMY
          </text>

          {/* Dotted line for control spectrum */}
          <line x1="80" y1="210" x2="640" y2="210" stroke="var(--cw-ink-muted)" strokeWidth="1" strokeDasharray="4 4" opacity={0.4} />

          {/* Pattern nodes */}
          {nodePositions.map((pos, i) => {
            const isActive = active === i;
            const colors = ['#3A9E6E', '#4A6FA5', '#6B2D8B', '#D95550', '#D95550'];
            const color = colors[i];

            return (
              <g
                key={i}
                onClick={() => setActive(isActive ? null : i)}
                style={{ cursor: 'pointer' }}
              >
                {/* Pulse ring */}
                {isActive && (
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r="28"
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    opacity={0.3}
                  >
                    <animate
                      attributeName="r"
                      values="22;32;22"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.3;0.1;0.3"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
                {/* Node circle */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isActive ? 22 : 18}
                  fill={isActive ? color : 'var(--cw-surface)'}
                  stroke={color}
                  strokeWidth={isActive ? 3 : 2}
                  filter={isActive ? 'url(#glow)' : undefined}
                  style={{ transition: 'all 0.3s' }}
                />
                {/* Number */}
                <text
                  x={pos.x}
                  y={pos.y + 5}
                  textAnchor="middle"
                  fill={isActive ? '#fff' : color}
                  fontSize="14"
                  fontWeight="800"
                  style={{ transition: 'fill 0.3s' }}
                >
                  {i + 1}
                </text>
                {/* Label */}
                <text
                  x={pos.x}
                  y={pos.y - 32}
                  textAnchor="middle"
                  fill="var(--cw-ink)"
                  fontSize="11"
                  fontWeight="700"
                >
                  {patterns[i].name}
                </text>
                {/* Subtitle */}
                <text
                  x={pos.x}
                  y={pos.y + 45}
                  textAnchor="middle"
                  fill="var(--cw-ink-muted)"
                  fontSize="8"
                  fontWeight="400"
                >
                  {patterns[i].subtitle}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Detail panel */}
      {active !== null && (
        <div
          className="glass-card p-6 mt-4"
          style={{
            borderLeft: `3px solid ${['#3A9E6E', '#4A6FA5', '#6B2D8B', '#D95550', '#D95550'][active]}`,
            transition: 'all 0.3s',
          }}
        >
          <div className="flex items-center gap-3 mb-3">
            <span
              className="inline-flex items-center justify-center w-8 h-8 rounded-full text-white text-sm font-bold"
              style={{ background: ['#3A9E6E', '#4A6FA5', '#6B2D8B', '#D95550', '#D95550'][active] }}
            >
              {active + 1}
            </span>
            <h3 className="text-lg font-bold" style={{ letterSpacing: '-0.3px' }}>
              {patterns[active].name}
            </h3>
          </div>
          <p className="text-sm mb-4" style={{ color: 'var(--cw-ink-secondary)', maxWidth: '100%' }}>
            {patterns[active].description}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Manages', value: patterns[active].manages },
              { label: 'Parallelism', value: patterns[active].parallelism },
              { label: 'Token Cost', value: patterns[active].cost },
              { label: 'Best For', value: patterns[active].bestFor },
            ].map((item) => (
              <div key={item.label} className="p-3 rounded-lg" style={{ background: 'var(--cw-primary-005)' }}>
                <div className="text-[10px] uppercase tracking-widest font-semibold mb-1" style={{ color: 'var(--cw-primary)' }}>
                  {item.label}
                </div>
                <div className="text-xs font-medium" style={{ color: 'var(--cw-ink-secondary)' }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="text-xs mt-3 text-center" style={{ color: 'var(--cw-ink-muted)' }}>
        Click a node to see details
      </p>
    </div>
  );
}

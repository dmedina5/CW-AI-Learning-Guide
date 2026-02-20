'use client';

import { useLocalStorage } from '@/hooks/useLocalStorage';
import { TIERS, type TierKey } from '@/lib/constants';
import { CheckCircle2, Circle } from 'lucide-react';

interface Section {
  id: string;
  title: string;
  href: string;
  tier: TierKey;
}

const SECTIONS: Section[] = [
  { id: 'ai-basics', title: 'AI Basics', href: '/ai-basics', tier: 'beginner' },
  { id: 'prompt-basics', title: 'Prompt Engineering Basics', href: '/prompt-engineering', tier: 'beginner' },
  { id: 'vibe-coding-intro', title: 'Getting Started with Vibe Coding', href: '/vibe-coding', tier: 'beginner' },
  { id: 'installation', title: 'Installation Guide', href: '/vibe-coding/installation', tier: 'beginner' },
  { id: 'crisp', title: 'CRISP Framework', href: '/prompt-engineering#crisp', tier: 'intermediate' },
  { id: 'prompt-builder', title: 'Prompt Builder', href: '/prompt-builder', tier: 'intermediate' },
  { id: 'reality-filter', title: 'Reality Filter', href: '/prompt-engineering#reality-filter', tier: 'intermediate' },
  { id: 'techniques', title: 'Prompting Techniques', href: '/prompt-engineering#techniques', tier: 'intermediate' },
  { id: 'pii-safety', title: 'PII Safety', href: '/prompt-engineering#pii', tier: 'intermediate' },
  { id: 'fundamentals', title: 'Vibe Coding Fundamentals', href: '/vibe-coding/fundamentals', tier: 'intermediate' },
  { id: 'workflows', title: 'Workflows', href: '/vibe-coding/workflows', tier: 'expert' },
  { id: 'tips-tricks', title: 'Tips & Tricks', href: '/vibe-coding/tips', tier: 'expert' },
  { id: 'use-cases', title: 'CW Use Cases', href: '/use-cases', tier: 'expert' },
  { id: 'cheatsheet', title: 'Cheatsheet', href: '/vibe-coding/cheatsheet', tier: 'expert' },
  { id: 'agentic-ai', title: 'Agentic AI', href: '/agentic-ai', tier: 'advanced' },
  { id: 'resources', title: 'Resources', href: '/resources', tier: 'advanced' },
];

export function ProgressTracker() {
  const [completedSections, setCompletedSections] = useLocalStorage<string[]>('cw-progress', []);

  const toggleSection = (id: string) => {
    setCompletedSections(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const totalCompleted = completedSections.length;
  const totalSections = SECTIONS.length;
  const percentage = Math.round((totalCompleted / totalSections) * 100);

  // Group by tier
  const grouped = SECTIONS.reduce<Record<TierKey, Section[]>>((acc, section) => {
    if (!acc[section.tier]) acc[section.tier] = [];
    acc[section.tier].push(section);
    return acc;
  }, {} as Record<TierKey, Section[]>);

  return (
    <div
      className="rounded-2xl p-6"
      style={{ background: 'var(--cw-surface)', border: '1px solid var(--cw-border)' }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">Learning Progress</h3>
        <span className="text-sm font-semibold" style={{ color: 'var(--cw-primary)' }}>
          {percentage}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 rounded-full mb-6" style={{ background: 'var(--cw-border)' }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${percentage}%`, background: 'var(--cw-primary)' }}
        />
      </div>

      <p className="text-xs mb-6" style={{ color: 'var(--cw-ink-muted)' }}>
        {totalCompleted} of {totalSections} sections completed. Click to mark as done.
      </p>

      {(Object.entries(grouped) as [TierKey, Section[]][]).map(([tier, sections]) => {
        const config = TIERS[tier];
        const tierCompleted = sections.filter(s => completedSections.includes(s.id)).length;

        return (
          <div key={tier} className="mb-5 last:mb-0">
            <div className="flex items-center gap-2 mb-2">
              <span
                className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full"
                style={{ background: config.bgColor, color: config.color }}
              >
                {config.label}
              </span>
              <span className="text-[10px]" style={{ color: 'var(--cw-ink-muted)' }}>
                {tierCompleted}/{sections.length}
              </span>
            </div>

            <div className="space-y-1">
              {sections.map(section => {
                const isCompleted = completedSections.includes(section.id);
                return (
                  <button
                    key={section.id}
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-left transition-all hover:bg-white/30"
                  >
                    {isCompleted ? (
                      <CheckCircle2 size={14} style={{ color: config.color }} />
                    ) : (
                      <Circle size={14} style={{ color: 'var(--cw-ink-muted)' }} />
                    )}
                    <span
                      style={{
                        color: isCompleted ? 'var(--cw-ink-muted)' : 'var(--cw-ink-secondary)',
                        textDecoration: isCompleted ? 'line-through' : 'none',
                      }}
                    >
                      {section.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

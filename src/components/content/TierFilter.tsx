'use client';

import { TIERS, type TierKey } from '@/lib/constants';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export function TierFilter() {
  const [activeTiers, setActiveTiers] = useLocalStorage<TierKey[]>(
    'cw-active-tiers',
    ['beginner', 'intermediate', 'expert', 'advanced']
  );

  const toggleTier = (tier: TierKey) => {
    setActiveTiers(prev => {
      if (prev.includes(tier)) {
        // Don't allow deselecting all
        if (prev.length === 1) return prev;
        return prev.filter(t => t !== tier);
      }
      return [...prev, tier];
    });
  };

  return (
    <div className="flex flex-wrap gap-2">
      {(Object.entries(TIERS) as [TierKey, typeof TIERS[TierKey]][]).map(([key, config]) => {
        const isActive = activeTiers.includes(key);
        return (
          <button
            key={key}
            onClick={() => toggleTier(key)}
            className={`
              px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider
              transition-all duration-200
              ${isActive ? 'text-white shadow-sm' : 'opacity-40'}
            `}
            style={{
              background: isActive ? config.color : config.bgColor,
              color: isActive ? '#fff' : config.color,
              border: `1px solid ${isActive ? config.color : 'transparent'}`,
            }}
          >
            {config.label}
          </button>
        );
      })}
    </div>
  );
}

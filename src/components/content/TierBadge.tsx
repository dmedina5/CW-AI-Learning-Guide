'use client';

import { TIERS, type TierKey } from '@/lib/constants';

interface TierBadgeProps {
  tier: TierKey;
  size?: 'xs' | 'sm' | 'md';
}

export function TierBadge({ tier, size = 'md' }: TierBadgeProps) {
  const config = TIERS[tier];

  const sizeClasses = {
    xs: 'text-[9px] px-1.5 py-0',
    sm: 'text-[10px] px-2 py-0.5',
    md: 'text-xs px-3 py-1',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full font-semibold uppercase tracking-wider ${sizeClasses[size]}`}
      style={{
        background: config.bgColor,
        color: config.color,
      }}
    >
      {config.label}
    </span>
  );
}

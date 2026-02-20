'use client';

import { type ReactNode } from 'react';
import { PLATFORM_TABS, type PlatformTab } from '@/lib/constants';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { usePlatform } from '@/hooks/usePlatform';

interface PlatformTabsProps {
  children: Record<PlatformTab, ReactNode>;
}

export function PlatformTabs({ children }: PlatformTabsProps) {
  const detectedPlatform = usePlatform();
  const [activeTab, setActiveTab] = useLocalStorage<PlatformTab>('cw-platform-tab', detectedPlatform);

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {PLATFORM_TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pill-btn ${activeTab === tab ? 'active' : ''}`}
          >
            {tab === 'Windows' && '🪟 '}
            {tab === 'Mac' && '🍎 '}
            {tab === 'Linux' && '🐧 '}
            {tab}
          </button>
        ))}
      </div>
      <div>
        {children[activeTab]}
      </div>
    </div>
  );
}

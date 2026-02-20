'use client';

import { type ReactNode } from 'react';
import { TOOL_TABS, type ToolTab } from '@/lib/constants';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface ToolTabsProps {
  children: Record<ToolTab, ReactNode>;
}

export function ToolTabs({ children }: ToolTabsProps) {
  const [activeTab, setActiveTab] = useLocalStorage<ToolTab>('cw-tool-tab', 'Claude');

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {TOOL_TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pill-btn ${activeTab === tab ? 'active' : ''}`}
          >
            {tab === 'Claude' && '🤖 '}
            {tab === 'Gemini' && '✨ '}
            {tab === 'Shared' && '🔗 '}
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

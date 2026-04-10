'use client';

import { useState, type ReactNode } from 'react';

interface TabsProps {
  tabs: string[];
  children: Record<string, ReactNode>;
  defaultTab?: string;
  storageKey?: string;
}

export function Tabs({ tabs, children, defaultTab, storageKey }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab ?? tabs[0]);

  return (
    <div>
      <div className="flex gap-2 mb-4 flex-wrap">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pill-btn ${activeTab === tab ? 'active' : ''}`}
          >
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

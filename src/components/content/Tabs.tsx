'use client';

import { useState, type ReactNode } from 'react';
import { isExportMode } from '@/lib/export-mode';

interface TabsProps {
  tabs: string[];
  children: Record<string, ReactNode>;
  defaultTab?: string;
  storageKey?: string;
}

export function Tabs({ tabs, children, defaultTab, storageKey }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab ?? tabs[0]);

  // The document export cannot click, so it gets every panel, each under its tab name.
  if (isExportMode()) {
    return (
      <div>
        {tabs.map(tab => (
          <div key={tab} data-export-panel={tab}>
            <h4 className="mt-4 mb-2 font-semibold">{tab}</h4>
            {children[tab]}
          </div>
        ))}
      </div>
    );
  }

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

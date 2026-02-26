'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home, Brain, MessageSquare, Wand2, Code2, Bot,
  Briefcase, BookOpen, ChevronDown, LogOut,
} from 'lucide-react';
import { NAV_ITEMS, TIERS, type TierKey } from '@/lib/constants';
import { useAuth } from '@/hooks/useAuth';
import { TierBadge } from '@/components/content/TierBadge';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ICON_MAP: Record<string, any> = {
  Home, Brain, MessageSquare, Wand2, Code2, Bot, Briefcase, BookOpen,
};

export function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpand = (label: string) => {
    setExpandedItems(prev =>
      prev.includes(label) ? prev.filter(i => i !== label) : [...prev, label]
    );
  };

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/' || pathname === '';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <nav
        className={`
          fixed top-0 left-0 h-full z-50 w-72 flex flex-col
          transition-transform duration-300
          lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{
          background: 'var(--cw-bg-warm)',
          borderRight: '1px solid var(--cw-border)',
        }}
      >
        {/* Header */}
        <div className="p-5 flex items-center gap-3">
          <img
            src="https://coverwhale.com/hubfs/CoverWhale_Purple.png"
            alt="Cover Whale"
            className="h-7 opacity-70"
            onError={(e) => {
              (e.target as HTMLImageElement).outerHTML = '<span class="text-xl font-extrabold" style="color: var(--cw-primary)">CW</span>';
            }}
          />
          <span className="font-bold text-sm" style={{ color: 'var(--cw-ink)' }}>
            AI Learning Guide
          </span>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-2 custom-scrollbar">
          {NAV_ITEMS.map(item => {
            const Icon = ICON_MAP[item.icon];
            const active = isActive(item.href);
            const hasChildren = 'children' in item && item.children;
            const isExpanded = expandedItems.includes(item.label) || (hasChildren && isActive(item.href));

            return (
              <div key={item.label} className="mb-0.5">
                <div className="flex items-center">
                  <Link
                    href={item.href}
                    onClick={() => { if (!hasChildren) onClose(); }}
                    className={`
                      flex-1 flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                      transition-all duration-150
                      ${active
                        ? 'text-white'
                        : 'hover:bg-white/30'
                      }
                    `}
                    style={active ? {
                      background: 'var(--cw-primary)',
                      color: '#fff',
                    } : {
                      color: 'var(--cw-ink-secondary)',
                    }}
                  >
                    {Icon && <Icon size={18} />}
                    <span className="flex-1">{item.label}</span>
                    {item.tier && <TierBadge tier={item.tier} size="sm" />}
                  </Link>

                  {hasChildren && (
                    <button
                      onClick={() => toggleExpand(item.label)}
                      className="p-1.5 rounded-lg transition-colors hover:bg-white/30"
                      style={{ color: 'var(--cw-ink-muted)' }}
                    >
                      <ChevronDown
                        size={14}
                        className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                      />
                    </button>
                  )}
                </div>

                {/* Children */}
                {hasChildren && isExpanded && (
                  <div className="ml-8 mt-1 space-y-0.5">
                    {item.children!.map(child => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={onClose}
                        className={`
                          flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium
                          transition-all
                          ${pathname === child.href ? 'bg-white/40' : 'hover:bg-white/20'}
                        `}
                        style={{
                          color: pathname === child.href ? 'var(--cw-primary)' : 'var(--cw-ink-muted)',
                        }}
                      >
                        <span className="flex-1">{child.label}</span>
                        {child.tier && <TierBadge tier={child.tier} size="xs" />}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t" style={{ borderColor: 'var(--cw-border)' }}>
          <div className="flex items-center justify-between">
            <span className="text-xs truncate" style={{ color: 'var(--cw-ink-muted)' }}>
              {user?.email || ''}
            </span>
            <button
              onClick={logout}
              className="p-2 rounded-lg transition-colors hover:bg-white/30"
              style={{ color: 'var(--cw-ink-muted)' }}
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

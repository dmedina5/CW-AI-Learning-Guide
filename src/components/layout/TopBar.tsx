'use client';

import { Menu, Search } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface TopBarProps {
  onMenuClick: () => void;
  onSearchClick: () => void;
}

export function TopBar({ onMenuClick, onSearchClick }: TopBarProps) {
  const { user } = useAuth();

  return (
    <header
      className="sticky top-0 z-30 flex items-center gap-4 px-4 py-3 lg:px-6"
      style={{
        background: 'rgba(195, 195, 213, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--cw-border)',
      }}
    >
      {/* Mobile menu button */}
      <button
        onClick={onMenuClick}
        className="p-2 rounded-lg transition-colors hover:bg-white/30 lg:hidden"
        style={{ color: 'var(--cw-ink-secondary)' }}
        aria-label="Toggle menu"
      >
        <Menu size={20} />
      </button>

      {/* Search trigger */}
      <button
        onClick={onSearchClick}
        className="flex-1 max-w-md flex items-center gap-3 px-4 py-2 rounded-xl text-sm transition-all hover:bg-white/40"
        style={{
          background: 'var(--cw-surface)',
          border: '1px solid var(--cw-border)',
          color: 'var(--cw-ink-muted)',
        }}
      >
        <Search size={16} />
        <span className="flex-1 text-left">Search docs...</span>
        <kbd
          className="hidden sm:inline-flex px-2 py-0.5 rounded text-xs font-mono"
          style={{
            background: 'rgba(255,255,255,0.6)',
            border: '1px solid var(--cw-ink-10)',
            color: 'var(--cw-ink-muted)',
          }}
        >
          Ctrl+K
        </kbd>
      </button>

      <div className="flex items-center gap-2">
        <span className="hidden md:block text-xs" style={{ color: 'var(--cw-ink-muted)' }}>
          {user?.email}
        </span>
      </div>
    </header>
  );
}

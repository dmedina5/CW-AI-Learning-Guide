'use client';

import { type ReactNode } from 'react';
import { Lock } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { CHAMPION_EMAILS } from '@/lib/constants';

export function isChampion(email: string | undefined): boolean {
  if (!email) return false;
  return CHAMPION_EMAILS.includes(email.toLowerCase());
}

export function ChampionGate({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  if (isChampion(user?.email)) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
        style={{ background: 'var(--cw-primary-light)' }}
      >
        <Lock size={28} style={{ color: 'var(--cw-primary)' }} />
      </div>
      <h2 className="mb-3">AI Enablement Champions Only</h2>
      <p className="max-w-md mb-6" style={{ color: 'var(--cw-ink-muted)' }}>
        This section is restricted to members of the AI Enablement Champions program.
        If you believe you should have access, contact Daniel Medina.
      </p>
      <div
        className="text-xs px-4 py-2 rounded-full font-medium"
        style={{
          background: 'var(--cw-surface)',
          border: '1px solid var(--cw-border)',
          color: 'var(--cw-ink-muted)',
        }}
      >
        Signed in as {user?.email || 'unknown'}
      </div>
    </div>
  );
}

/**
 * Replaces the client-side Champions allowlist for the Apps Script build.
 *
 * The verdict is computed on the server in Code.gs, against an address Google
 * supplied, and arrives already decided. The browser cannot change it: on the
 * public build the check ran on an email the page itself had fetched, so a
 * viewer could edit it in memory. Here there is nothing to edit.
 *
 * Residual, stated plainly: the section's text still ships inside the bundle,
 * exactly as it does on the public build. This closes the "claim to be someone
 * else" bypass, not the "read the page source" one.
 */
import { type ReactNode } from 'react';
import { Lock } from 'lucide-react';
import { boot } from '../src/boot';

export function isChampion(email: string | undefined): boolean {
  if (!email) return false;
  return boot().isChampion && email.toLowerCase() === boot().email.toLowerCase();
}

export function ChampionGate({ children }: { children: ReactNode }) {
  const { isChampion: allowed, email } = boot();

  if (allowed) return <>{children}</>;

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
        Signed in as {email || 'unknown'}
      </div>
    </div>
  );
}

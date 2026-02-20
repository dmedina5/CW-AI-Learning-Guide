'use client';

import { getLoginUrl } from '@/lib/auth';

export function LoginScreen() {
  const handleLogin = () => {
    window.location.href = getLoginUrl();
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--cw-bg)' }}>
      <div className="glass-card p-12 max-w-md w-full mx-4 text-center">
        <div className="mb-8">
          <img
            src="https://coverwhale.com/hubfs/CoverWhale_Purple.png"
            alt="Cover Whale"
            className="h-12 mx-auto mb-6 opacity-80"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <h1 className="text-2xl font-extrabold mb-2" style={{ color: 'var(--cw-ink)' }}>
            AI Learning Platform
          </h1>
          <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
            Sign in with your Cover Whale account to access training resources
          </p>
        </div>

        <button
          onClick={handleLogin}
          className="w-full py-3 px-6 rounded-full font-semibold text-white transition-all hover:opacity-90 hover:-translate-y-0.5"
          style={{ background: 'linear-gradient(135deg, var(--cw-primary-dark), var(--cw-primary))' }}
        >
          Sign in with Google
        </button>

        <p className="mt-6 text-xs" style={{ color: 'var(--cw-ink-muted)' }}>
          Requires a @coverwhale.com email address
        </p>
      </div>
    </div>
  );
}

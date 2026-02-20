'use client';

import { type ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { LoginScreen } from './LoginScreen';

export function AuthGuard({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--cw-bg)' }}>
        <div className="w-8 h-8 border-3 border-cw-purple border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  return <>{children}</>;
}

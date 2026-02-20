'use client';

import { useState, useEffect, useCallback, type ReactNode } from 'react';
import { AuthContext } from '@/hooks/useAuth';
import {
  verifyToken,
  getLoginUrl,
  getStoredToken,
  setStoredToken,
  clearAuth,
  getTokenFromUrl,
  isDevMode,
  DEV_USER,
  type AuthUser,
} from '@/lib/auth';
import { LoginScreen } from './LoginScreen';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function initAuth() {
      // Dev mode: skip auth
      if (isDevMode()) {
        setUser(DEV_USER);
        setIsLoading(false);
        return;
      }

      // Check for token in URL (OAuth redirect)
      const urlToken = getTokenFromUrl();
      if (urlToken) {
        setStoredToken(urlToken);
        const verified = await verifyToken(urlToken);
        if (verified) {
          setUser(verified);
          setIsLoading(false);
          return;
        }
      }

      // Check stored token
      const storedToken = getStoredToken();
      if (storedToken) {
        const verified = await verifyToken(storedToken);
        if (verified) {
          setUser(verified);
          setIsLoading(false);
          return;
        }
      }

      // Not authenticated
      setIsLoading(false);
    }

    initAuth();
  }, []);

  // Token refresh every hour
  useEffect(() => {
    if (!user || isDevMode()) return;

    const interval = setInterval(async () => {
      const token = getStoredToken();
      if (token) {
        const verified = await verifyToken(token);
        if (!verified) {
          clearAuth();
          setUser(null);
        }
      }
    }, 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, [user]);

  const logout = useCallback(() => {
    clearAuth();
    setUser(null);
    if (!isDevMode()) {
      window.location.href = getLoginUrl();
    }
  }, []);

  const isAuthenticated = user !== null;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--cw-bg)' }}>
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-cw-purple border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-cw-ink mb-2">Verifying CoverWhale Credentials...</h2>
          <p className="text-cw-ink-muted">Accessing AI Learning Platform</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

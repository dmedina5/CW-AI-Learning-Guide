/**
 * Replaces the Vercel OAuth AuthProvider for the Apps Script build.
 *
 * There is no sign-in step here. Google has already verified the viewer is on
 * the Cover Whale domain before the page is served, and Code.gs injects the
 * address it read server-side. Nothing about identity is supplied by the
 * browser, so there is no token to forge and no redirect to be blocked by the
 * frame the guide runs inside on Harbor.
 */
import { type ReactNode } from 'react';
import { AuthContext } from '@/hooks/useAuth';
import { boot } from '../src/boot';

export function AuthProvider({ children }: { children: ReactNode }) {
  const email = boot().email;

  return (
    <AuthContext.Provider
      value={{
        user: email ? { email } : null,
        isAuthenticated: Boolean(email),
        isLoading: false,
        logout: () => {
          window.open('https://accounts.google.com/Logout', '_blank', 'noopener');
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

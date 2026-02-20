import { AUTH_BACKEND } from './constants';

export interface AuthUser {
  email: string;
  name?: string;
}

const isLocalhost = (): boolean => {
  if (typeof window === 'undefined') return false;
  const hostname = window.location.hostname;
  return (
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname.startsWith('192.168.') ||
    window.location.protocol === 'file:'
  );
};

export async function verifyToken(token: string): Promise<AuthUser | null> {
  try {
    const response = await fetch(`${AUTH_BACKEND}/api/verify`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      const data = await response.json();
      return data.user;
    }
    return null;
  } catch {
    return null;
  }
}

export function getLoginUrl(): string {
  const returnUrl = encodeURIComponent(window.location.href);
  return `${AUTH_BACKEND}/api/auth?return_url=${returnUrl}`;
}

export function getStoredToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('cw_auth_token');
}

export function setStoredToken(token: string): void {
  localStorage.setItem('cw_auth_token', token);
}

export function clearAuth(): void {
  localStorage.removeItem('cw_auth_token');
  localStorage.removeItem('cw_user_email');
}

export function getTokenFromUrl(): string | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  if (token) {
    // Clean the URL
    window.history.replaceState({}, document.title, window.location.pathname);
  }
  return token;
}

export function isDevMode(): boolean {
  return isLocalhost();
}

export const DEV_USER: AuthUser = { email: 'dev@coverwhale.com' };

'use client';

import { createContext, useContext } from 'react';
import type { AuthUser } from '@/lib/auth';

export interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  logout: () => {},
});

export function useAuth(): AuthContextType {
  return useContext(AuthContext);
}

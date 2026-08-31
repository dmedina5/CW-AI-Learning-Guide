/**
 * Drop-in replacement for `next/navigation` in the Apps Script build.
 * Covers the three call sites: Sidebar (usePathname), SearchModal and
 * RedirectStub (useRouter().push / .replace).
 */
import { navigate, usePathname as useRoutePathname } from '../src/router';

export function usePathname(): string {
  return useRoutePathname();
}

export function useRouter() {
  return {
    push: (href: string) => navigate(href),
    replace: (href: string) => navigate(href, { replace: true }),
    back: () => window.history.back(),
    forward: () => window.history.forward(),
    refresh: () => {},
    prefetch: () => {},
  };
}

export function useSearchParams(): URLSearchParams {
  return new URLSearchParams();
}

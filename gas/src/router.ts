/**
 * Hash router for the Apps Script build.
 *
 * Apps Script serves the page inside a nested sandbox iframe, so path-based
 * routing (what Next.js uses on GitHub Pages) is not available: the frame's
 * real URL belongs to googleusercontent.com, not to us. Hash routing works
 * there because the fragment never reaches the server.
 *
 * The initial route comes from the server (Code.gs reads ?page= and injects it),
 * so a Harbor page can deep-link straight to any of the 34 routes.
 */
import { useSyncExternalStore } from 'react';

export type Route = { path: string; hash: string };

const listeners = new Set<() => void>();
let current: Route = { path: '/', hash: '' };
let snapshot = '/';

function bootValue(): string {
  const injected = (window as unknown as { __CW__?: { route?: string } }).__CW__;
  if (injected?.route) return injected.route;
  const fromHash = window.location.hash.replace(/^#/, '');
  return fromHash || '/';
}

export function normalize(href: string): Route {
  const raw = href.replace(/^#/, '') || '/';
  const [pathPart, hashPart = ''] = raw.split('#');
  let path = pathPart || '/';
  if (path.length > 1) path = path.replace(/\/+$/, '');
  if (!path.startsWith('/')) path = '/' + path;
  return { path, hash: hashPart };
}

export function toHash(href: string): string {
  const { path, hash } = normalize(href);
  return '#' + path + (hash ? '#' + hash : '');
}

function emit() {
  snapshot = current.path + (current.hash ? '#' + current.hash : '');
  listeners.forEach((l) => l());
}

function scrollToAnchor(hash: string) {
  // Two frames: let React commit the new page before we look for the target.
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      if (!hash) {
        window.scrollTo({ top: 0 });
        document.getElementById('cw-scroll-root')?.scrollTo({ top: 0 });
        return;
      }
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    })
  );
}

export function navigate(href: string, opts: { replace?: boolean } = {}) {
  const next = normalize(href);
  const changedPage = next.path !== current.path;
  current = next;

  try {
    const target = toHash(href);
    if (opts.replace) window.location.replace(target);
    else window.location.hash = target.slice(1);
  } catch {
    /* Sandboxed frames can refuse history writes; in-memory state still works. */
  }

  emit();
  if (changedPage || next.hash) scrollToAnchor(next.hash);
}

export function initRouter() {
  current = normalize(bootValue());
  snapshot = current.path + (current.hash ? '#' + current.hash : '');
  window.addEventListener('hashchange', () => {
    const next = normalize(window.location.hash);
    if (next.path === current.path && next.hash === current.hash) return;
    current = next;
    emit();
    scrollToAnchor(next.hash);
  });
  if (current.hash) scrollToAnchor(current.hash);
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function usePathname(): string {
  const full = useSyncExternalStore(subscribe, () => snapshot, () => snapshot);
  return full.split('#')[0];
}

export function useRoute(): Route {
  useSyncExternalStore(subscribe, () => snapshot, () => snapshot);
  return current;
}

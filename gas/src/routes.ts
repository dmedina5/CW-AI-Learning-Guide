/**
 * Route table, derived from the filesystem at build time.
 *
 * Uses the same src/app/**\/page.tsx files the GitHub Pages build uses, so a
 * page added there appears here automatically — the two builds cannot drift.
 */
import type { ComponentType } from 'react';

// Relative, NOT '/src/app/**': an absolute glob resolves against Vite's root
// (gas/), where no src/app exists, and Vite matches nothing *silently* —
// which builds a guide with every route registered and every page empty.
const modules = import.meta.glob('../../src/app/**/page.tsx', { eager: true }) as Record<
  string,
  { default: ComponentType }
>;

export type RouteEntry = { path: string; Component: ComponentType };

function pathFor(file: string): string {
  const route = file.replace(/^.*\/src\/app/, '').replace(/\/page\.tsx$/, '');
  return route === '' ? '/' : route;
}

export const ROUTES: RouteEntry[] = Object.entries(modules)
  .map(([file, mod]) => ({ path: pathFor(file), Component: mod.default }))
  .sort((a, b) => a.path.localeCompare(b.path));

export const ROUTE_MAP = new Map(ROUTES.map((r) => [r.path, r.Component]));

/** The eight /vibe-coding/* routes are redirect stubs kept for old links. */
export const REDIRECT_PREFIX = '/vibe-coding';
export const CONTENT_ROUTES = ROUTES.filter((r) => !r.path.startsWith(REDIRECT_PREFIX));

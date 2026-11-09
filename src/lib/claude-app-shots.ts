import { CLAUDE_APP_SHOTS_URL } from '@/lib/constants';

/**
 * Where a Claude app screenshot loads from. The GitHub Pages build links to
 * the copy served from images/claude-app/; the Harbor build swaps this module
 * for gas/shims/claude-app-shots.ts, which inlines the files, because the
 * Apps Script frame does not load images from other sites.
 */
export function shotSrc(file: string): string {
  return `${CLAUDE_APP_SHOTS_URL}/${file}`;
}

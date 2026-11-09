import { SITE_IMAGES_URL } from '@/lib/constants';

/**
 * Where an image under public/images/ loads from, by its path inside that
 * folder: siteImage('cover-whale-logo.png'), siteImage('claude-app/projects.jpg').
 *
 * The GitHub Pages build links to the copy it serves. The Harbor build swaps
 * this module for gas/shims/site-images.ts, which inlines the files, because
 * the Apps Script frame does not load images from other sites.
 */
export function siteImage(path: string): string {
  return `${SITE_IMAGES_URL}/${path}`;
}

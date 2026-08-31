#!/usr/bin/env node
/**
 * Builds the exact document Code.gs assembles, as a local file.
 *
 * Verifies the packaging end to end — chunk concatenation, lifted font links,
 * inlined styles, injected boot data — without needing a Google session. What
 * it deliberately cannot cover is the two things only the live deployment can
 * show: the identity Google injects, and behaviour inside a Harbor frame.
 *
 *   node gas/scripts/preview.mjs [route] [--no-embed]
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, '..', 'apps-script');

const route = process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : '/';
const embed = !process.argv.includes('--no-embed');

const assets = readFileSync(join(src, 'Assets.gs'), 'utf8');
const chunks = JSON.parse(assets.match(/BUNDLE_CHUNKS = (\[[\s\S]*?\]);/)[1]);
const fonts = JSON.parse(assets.match(/FONT_URLS = (\[[\s\S]*?\]);/)[1]);

const config = readFileSync(join(src, 'Config.gs'), 'utf8');
const routes = JSON.parse(config.match(/PUBLISHED_ROUTES = (\[[\s\S]*?\]);/)[1]);
if (!routes.includes(route)) {
  console.error(`Route "${route}" is not published. Known routes:\n  ${routes.join('\n  ')}`);
  process.exit(1);
}

const boot = {
  route,
  email: 'daniel.medina@coverwhale.com',
  isChampion: true,
  embed,
  deploymentId: 'local-preview',
};

const html = [
  '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">',
  '<meta name="viewport" content="width=device-width, initial-scale=1">',
  '<title>Cover Whale AI Learning Guide</title>',
  fonts.map((u) => `<link rel="stylesheet" href="${u}">`).join(''),
  '<style>', readFileSync(join(src, 'Styles.html'), 'utf8'), '</style>',
  '<style>html,body{margin:0;padding:0;background:var(--cw-bg,#c3c3d5);}</style>',
  '</head><body>',
  '<div id="root"></div>',
  `<script>window.__CW__=${JSON.stringify(boot)};</script>`,
  '<script>', chunks.map((c) => readFileSync(join(src, `${c}.html`), 'utf8')).join(''), '</script>',
  '</body></html>',
].join('');

const out = process.env.CW_PREVIEW_OUT || join(here, '..', 'dist', 'preview.html');
writeFileSync(out, html);
console.log(`${out}  (route=${route}, embed=${embed}, ${(html.length / 1024).toFixed(0)} KB)`);

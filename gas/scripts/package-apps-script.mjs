#!/usr/bin/env node
/**
 * Packages the Vite bundle into the Apps Script project directory.
 *
 * Apps Script has no static file hosting: a web app serves exactly one HTML
 * document, and requests for /assets/app.js inside the sandbox frame would go
 * nowhere. So the CSS and JS are carried as .html files and concatenated into
 * the response by Code.gs.
 *
 * The bundle is carried as BASE64, and that is the whole trick.
 *
 * Apps Script stores a project file as HTML and re-serializes it on the way
 * out, and raw JavaScript does not survive the trip. Two separate failures were
 * measured against a live deployment:
 *   1. Bare JS had every `<` HTML-escaped to `&lt;` — minified code is full of
 *      `i<n`, so the bundle stopped being JavaScript and the page rendered as
 *      visible wreckage.
 *   2. Wrapping it in <script> fixed the escaping but the parser still dropped
 *      content from the middle: 648,436 characters in, 522,627 back, while
 *      still ending in a well-formed closing tag so the damage was silent.
 *
 * Base64 is pure ASCII with no `<`, `&`, or `<!--` for any parser to act on, so
 * it round-trips byte for byte. The chunks are string literals pushed onto an
 * array; a small loader decodes them and injects the real script. The stylesheet
 * needs none of this — it is plain ASCII and was verified to round-trip exactly.
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, unlinkSync, statSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, '..', '..');
const dist = join(here, '..', 'dist');
const out = join(here, '..', 'apps-script');
mkdirSync(out, { recursive: true });
for (const f of readdirSync(out)) {
  if (/^(Bundle\d*|Styles|Loader)\.html$/.test(f)) unlinkSync(join(out, f));
}

// --- CSS -------------------------------------------------------------------
let css = readFileSync(join(dist, 'app.css'), 'utf8');

// Font @import rules are only honoured at the very top of a stylesheet. Once
// this CSS is inlined into a <style> tag they would sit after other rules and
// be dropped, so they are lifted out and re-emitted as <link> tags instead.
const fontUrls = [];
// Both spellings: `@import url("...")` and the bare `@import "..."` Vite emits.
css = css.replace(/@import\s*(?:url\()?\s*['"]([^'"]+)['"]\s*\)?\s*;?/g, (_m, url) => {
  fontUrls.push(url);
  return '';
});

writeFileSync(join(out, 'Styles.html'), '<style>' + css.trim() + '</style>');

// --- JS, base64 in chunks -------------------------------------------------
const js = readFileSync(join(dist, 'app.js'), 'utf8');
const b64 = Buffer.from(js, 'utf8').toString('base64');

// Far below the point where re-serialization damage was observed (~522k chars).
const CHUNK = 120_000;
const parts = [];
for (let i = 0; i < b64.length; i += CHUNK) parts.push(b64.slice(i, i + CHUNK));

parts.forEach((part, i) => {
  writeFileSync(
    join(out, `Bundle${i}.html`),
    `<script>(window.__CWB=window.__CWB||[]).push("${part}");</script>`
  );
});

// Decodes the chunks and injects the real bundle. Kept in its own file so the
// only thing Code.gs does is concatenate.
writeFileSync(
  join(out, 'Loader.html'),
  `<script>
(function () {
  var raw = atob((window.__CWB || []).join(''));
  var bytes = new Uint8Array(raw.length);
  for (var i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i);
  var code = new TextDecoder('utf-8').decode(bytes);
  var el = document.createElement('script');
  el.textContent = code;
  document.body.appendChild(el);
})();
</script>`
);

// The payload must contain nothing an HTML parser will act on. Both shipped
// failures were silent — the page still had a well-formed closing tag — so this
// is asserted at build time rather than trusted.
parts.forEach((part, i) => {
  const bad = part.match(/[^A-Za-z0-9+/=]/);
  if (bad) {
    throw new Error(
      `Bundle${i} carries a non-base64 character (${JSON.stringify(bad[0])}). ` +
        'Apps Script re-serializes project files as HTML; anything a parser ' +
        'recognises gets escaped or dropped, silently.'
    );
  }
});

// --- Routes and allowlist, read from source so they cannot drift -----------
function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

const appDir = join(repoRoot, 'src', 'app');
const routes = walk(appDir)
  .filter((f) => f.endsWith('page.tsx'))
  .map((f) => '/' + relative(appDir, f).replace(/\\/g, '/').replace(/\/?page\.tsx$/, ''))
  .map((r) => (r === '/' ? '/' : r.replace(/\/$/, '')))
  .sort();

if (routes.length === 0) throw new Error('No routes found under src/app — refusing to package.');

// Redirect stubs from the section's old name. They stay reachable so old links
// resolve, but they are not content and get no Harbor page of their own.
const contentRoutes = routes.filter((r) => !r.startsWith('/vibe-coding'));

const constantsSrc = readFileSync(join(repoRoot, 'src', 'lib', 'constants.ts'), 'utf8');
const championBlock = constantsSrc.match(
  /CHAMPION_EMAILS[^=]*=\s*\[([\s\S]*?)\]/
);
if (!championBlock) {
  throw new Error('Could not read CHAMPION_EMAILS from src/lib/constants.ts — refusing to package.');
}
const champions = [...championBlock[1].matchAll(/['"]([^'"]+@[^'"]+)['"]/g)].map((m) => m[1]);
if (champions.length === 0) {
  throw new Error('CHAMPION_EMAILS parsed to an empty list — refusing to package.');
}

writeFileSync(
  join(out, 'Config.gs'),
  `/**
 * GENERATED by gas/scripts/package-apps-script.mjs — do not edit by hand.
 *
 * Both lists are read out of the shared source at build time, so the Harbor
 * build cannot fall behind the public one. Edit src/lib/constants.ts (for the
 * allowlist) or add a page under src/app (for a route), then rebuild.
 */

// Every route this build publishes. doGet matches ?page= against this list,
// because the value is interpolated into a script tag.
var PUBLISHED_ROUTES = ${JSON.stringify(routes, null, 2)};

// The ${contentRoutes.length} routes that are real content and get a Harbor page.
// The remainder are redirect stubs for the section's former name.
var CONTENT_ROUTES = ${JSON.stringify(contentRoutes, null, 2)};

var CHAMPION_EMAILS = ${JSON.stringify(champions, null, 2)};
`
);

// --- Manifest --------------------------------------------------------------
writeFileSync(
  join(out, 'Assets.gs'),
  `/**
 * GENERATED by gas/scripts/package-apps-script.mjs — do not edit by hand.
 * Regenerate with: npm run harbor:build
 */

var BUNDLE_CHUNKS = ${JSON.stringify(parts.map((_, i) => `Bundle${i}`))};

var FONT_URLS = ${JSON.stringify(fontUrls, null, 2)};

var BUILD_STAMP = ${JSON.stringify(new Date().toISOString())};
`
);

const total = (b64.length + css.length) / 1024;
console.log(
  `Packaged ${parts.length} base64 chunk(s) + styles (${total.toFixed(0)} KB), ` +
    `${routes.length} routes (${contentRoutes.length} content), ` +
    `${champions.length} champions -> gas/apps-script/`
);

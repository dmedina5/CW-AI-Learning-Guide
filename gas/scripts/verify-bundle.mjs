#!/usr/bin/env node
/**
 * Post-build gate for the Apps Script bundle.
 *
 * Exists because the first build of this target produced a bundle in which
 * every route was registered and every page was EMPTY: an absolute
 * import.meta.glob matched nothing, and Vite reports that as success. The
 * route list alone cannot detect it — those strings also live in the nav
 * config and the search index — so this checks page BODY text too.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, '..', '..');
const bundle = readFileSync(join(here, '..', 'dist', 'app.js'), 'utf8');

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

const pageFiles = walk(join(repoRoot, 'src', 'app')).filter((f) => f.endsWith('page.tsx'));

const failures = [];

// 1. Every route the source declares must be reachable in the bundle.
for (const file of pageFiles) {
  const route =
    relative(join(repoRoot, 'src', 'app'), file).replace(/\/?page\.tsx$/, '') || '';
  const path = '/' + route;
  if (!bundle.includes(path === '/' ? '"/"' : path)) {
    failures.push(`route missing from bundle: ${path}`);
  }
}

// 2. Page BODY content must be present — the check the route list cannot make.
//    Each probe is a phrase that appears in a page file and nowhere in the
//    nav config or the search index.
const bodyProbes = [
  'Anthropic',
  'brew install',
  'npm install -g',
  'context window',
  'underwriting',
];
for (const probe of bodyProbes) {
  const inSource = pageFiles.some((f) =>
    readFileSync(f, 'utf8').toLowerCase().includes(probe.toLowerCase())
  );
  const inBundle = bundle.toLowerCase().includes(probe.toLowerCase());
  if (inSource && !inBundle) {
    failures.push(`page body text missing from bundle: "${probe}" — pages did not compile in`);
  }
}

// 3. A bundle this far under the page count is empty pages wearing a full build.
const MIN_BYTES = 400_000;
if (bundle.length < MIN_BYTES) {
  failures.push(
    `bundle is ${bundle.length} bytes, under the ${MIN_BYTES} floor for ${pageFiles.length} pages`
  );
}

if (failures.length) {
  console.error('\nBundle verification FAILED:\n');
  failures.forEach((f) => console.error('  x ' + f));
  console.error('');
  process.exit(1);
}

console.log(
  `Bundle verified: ${pageFiles.length} routes, ${(bundle.length / 1024).toFixed(0)} KB, body text present.`
);

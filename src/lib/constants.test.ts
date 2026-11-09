/**
 * Every file the guide links on its own GitHub Pages site must exist where
 * Pages serves it from. Run with:
 *
 *   node --test src/lib/constants.test.ts
 *
 * Pages builds this repo from the root of main (legacy build type), so
 * https://dmedina5.github.io/CW-AI-Learning-Guide/<path> is <repo root>/<path>.
 * Files under public/ are never served; the WSL setup bundle sat there as a
 * 404 from when it was added until November 2026.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const SITE = 'https://dmedina5.github.io/CW-AI-Learning-Guide/';
const constants = readFileSync(join(repoRoot, 'src/lib/constants.ts'), 'utf8');
const linked = [...constants.matchAll(/'(https:\/\/dmedina5\.github\.io\/CW-AI-Learning-Guide\/[^']+)'/g)]
  .map(m => m[1].slice(SITE.length));

test('constants.ts links at least the WSL bundle and the screenshot folder', () => {
  assert.ok(linked.includes('downloads/wsl-claude-code-setup.zip'), linked.join(', '));
  assert.ok(linked.includes('images/claude-app'), linked.join(', '));
});

test('every linked file or folder exists at the repo root, where Pages serves it', () => {
  for (const path of linked) {
    assert.ok(existsSync(join(repoRoot, path)), `${path} is linked but not at the repo root`);
  }
});

test('every screenshot the Claude App page uses is in the served folder', () => {
  const page = readFileSync(join(repoRoot, 'src/app/claude-cowork/page.tsx'), 'utf8');
  const used = [...page.matchAll(/file="([^"]+)"/g)].map(m => m[1]);
  const served = readdirSync(join(repoRoot, 'images/claude-app'));
  assert.ok(used.length > 0);
  for (const file of used) assert.ok(served.includes(file), `${file} missing from images/claude-app`);
});

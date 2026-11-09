/**
 * Every file the guide links on its own GitHub Pages site must exist where
 * Pages serves it from. Run with:
 *
 *   node --test src/lib/constants.test.ts
 *
 * Pages deploys the Next build (out/) from the Actions workflow, and the
 * build copies public/ into it, so
 * https://dmedina5.github.io/CW-AI-Learning-Guide/<path> is public/<path>.
 * In November 2026 these files were moved to the repo root by mistake, and
 * the live links returned 404 until they came back here.
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

test('constants.ts links at least the WSL bundle and the images folder', () => {
  assert.ok(linked.includes('downloads/wsl-claude-code-setup.zip'), linked.join(', '));
  assert.ok(linked.includes('images'), linked.join(', '));
});

test('every image the Harbor build inlines exists under public/images', () => {
  const shim = readFileSync(join(repoRoot, 'gas/shims/site-images.ts'), 'utf8');
  const imported = [...shim.matchAll(/from '\.\.\/\.\.\/(public\/images\/[^']+)'/g)].map(m => m[1]);
  assert.ok(imported.length > 0);
  for (const path of imported) assert.ok(existsSync(join(repoRoot, path)), `${path} missing`);
});

test('the champions allowlist does not include people who have left', () => {
  // Jose Selemi left around 2026-10-10; removed at the owner's request 2026-11-09.
  assert.doesNotMatch(constants, /jose\.selemi@coverwhale\.com/);
});

test('every linked file or folder exists under public/, where Pages serves it', () => {
  for (const path of linked) {
    assert.ok(existsSync(join(repoRoot, 'public', path)), `${path} is linked but not under public/`);
  }
});

test('every screenshot the Claude App page uses is in the served folder', () => {
  const page = readFileSync(join(repoRoot, 'src/app/claude-cowork/page.tsx'), 'utf8');
  const used = [...page.matchAll(/file="([^"]+)"/g)].map(m => m[1]);
  const served = readdirSync(join(repoRoot, 'public/images/claude-app'));
  assert.ok(used.length > 0);
  for (const file of used) assert.ok(served.includes(file), `${file} missing from public/images/claude-app`);
});

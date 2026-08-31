#!/usr/bin/env node
/**
 * Emits the Harbor page tree and the embed URL for each page.
 *
 * New Google Sites has no API, so the pages themselves are created by hand.
 * This generates the exact list and the exact URL to paste into each one, so
 * the manual step is transcription rather than judgement.
 *
 *   node gas/scripts/harbor-pages.mjs [--deployment <id>] [--format md|csv]
 */
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, '..', 'apps-script');

const argv = process.argv.slice(2);
const format = argv.includes('--csv') ? 'csv' : 'md';
const depFlag = argv.indexOf('--deployment');
let deployment = depFlag > -1 ? argv[depFlag + 1] : process.env.CW_HARBOR_DEPLOYMENT;

if (!deployment) {
  const cached = join(here, '..', '.deployment');
  if (existsSync(cached)) deployment = readFileSync(cached, 'utf8').trim();
}
if (!deployment) {
  console.error('No deployment id. Pass --deployment <id> or write gas/.deployment');
  process.exit(1);
}

const BASE = `https://script.google.com/a/macros/coverwhale.com/s/${deployment}/exec`;

const config = readFileSync(join(src, 'Config.gs'), 'utf8');
const contentRoutes = JSON.parse(config.match(/CONTENT_ROUTES = (\[[\s\S]*?\]);/)[1]);

// Titles as they should read in Harbor's navigation. Taken from the guide's own
// nav labels so the two agree.
const TITLES = {
  '/': 'AI Learning Guide',
  '/ai-basics': 'AI Basics',
  '/ai-basics/core-concepts': 'Core Concepts',
  '/ai-basics/how-it-works': 'How It Works',
  '/ai-basics/innovation': 'Innovation Flywheel',
  '/ai-basics/models': 'Models',
  '/ai-basics/strengths': 'Strengths & Limits',
  '/prompt-engineering': 'Prompt Engineering',
  '/prompt-builder': 'Prompt Builder',
  '/context-engineering': 'Context Engineering',
  '/claude-cowork': 'Claude Cowork',
  '/choose-your-claude': 'Choose Your Claude',
  '/right-size-your-model': 'Right-Size Your Model',
  '/road-to-agentic-engineering': 'Road to Agentic Engineering',
  '/road-to-agentic-engineering/installation': 'Installation',
  '/road-to-agentic-engineering/setup': 'CW Setup',
  '/road-to-agentic-engineering/champions': 'AI Enablement Champions',
  '/road-to-agentic-engineering/fundamentals': 'Fundamentals',
  '/road-to-agentic-engineering/workflows': 'Workflows',
  '/road-to-agentic-engineering/tips': 'Tips & Tricks',
  '/road-to-agentic-engineering/cheatsheet': 'Cheatsheet',
  '/agentic-ai': 'Agentic AI',
  '/agentic-ai/skills': 'Skills',
  '/use-cases': 'Use Cases',
  '/resources': 'Resources',
};

// Harbor nav order, parents before their children.
const ORDER = Object.keys(TITLES);
const ordered = ORDER.filter((r) => contentRoutes.includes(r));
const missing = contentRoutes.filter((r) => !ORDER.includes(r));
if (missing.length) {
  console.error(`Routes with no Harbor title — add them to TITLES: ${missing.join(', ')}`);
  process.exit(1);
}

const urlFor = (route) =>
  route === '/' ? BASE : `${BASE}?page=${encodeURIComponent(route)}`;
const depth = (route) => (route === '/' ? 0 : route.split('/').length - 1);

if (format === 'csv') {
  console.log('level,title,route,embed_url');
  ordered.forEach((r) => console.log(`${depth(r)},"${TITLES[r]}",${r},${urlFor(r)}`));
} else {
  console.log(`# Harbor page tree — ${ordered.length} pages\n`);
  console.log(`Parent: **AI Adoption at CW** on The Harbor.`);
  console.log(`Each page is one "Embed → By URL" block, full width, set to the URL below.\n`);
  ordered.forEach((r) => {
    const indent = '  '.repeat(depth(r));
    console.log(`${indent}- **${TITLES[r]}**`);
    console.log(`${indent}  \`${urlFor(r)}\``);
  });
}

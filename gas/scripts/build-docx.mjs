#!/usr/bin/env node
/**
 * Turns the painted pages under dist/export/ into one Word document.
 *
 *   node gas/scripts/build-docx.mjs <dir-of-rendered-pages> <out.docx>
 *
 * Input is what export-docx.sh dumped from a real browser with --export-all:
 * one HTML file per Harbor page, every tab panel and quiz answer present. Only
 * the <main> element is read — the top bar, footer and search modal are chrome,
 * not content.
 *
 * The mapping is structural, not visual. Headings keep their level, block
 * elements become paragraphs, <ul>/<ol> become Word lists, <pre> becomes a
 * shaded monospace block, <table> becomes a table, links keep their URL in
 * brackets so they survive printing. Buttons, form controls and icons are
 * dropped: they are the interactive layer, and a document cannot click.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'node-html-parser';
import {
  Document, Packer, Paragraph, TextRun, HeadingLevel, TableOfContents,
  Table, TableRow, TableCell, WidthType, LevelFormat, AlignmentType,
  ShadingType, BorderStyle,
} from 'docx';
import { TITLES, ORDER, slugFor } from './harbor-titles.mjs';

const [, , inDir, outPath] = process.argv;
if (!inDir || !outPath) {
  console.error('usage: build-docx.mjs <dir-of-rendered-pages> <out.docx>');
  process.exit(1);
}

const SITE_URL = 'https://sites.google.com/coverwhale.com/whaliecentral/ai-adoption-at-cw/ai-learning-guide';
const PURPLE = '6B2D8B';
const MONO = 'Consolas';

const SKIP = new Set(['script', 'style', 'svg', 'button', 'input', 'select', 'textarea', 'nav', 'template', 'noscript', 'canvas', 'img']);
const BLOCK = new Set(['div', 'section', 'article', 'p', 'li', 'ul', 'ol', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'table', 'thead', 'tbody', 'tr', 'td', 'th', 'blockquote', 'header', 'footer', 'aside', 'main', 'figure',
  'figcaption', 'details', 'summary', 'label', 'form', 'fieldset', 'hr', 'br', 'dl', 'dt', 'dd']);
const HEADING = { h1: 1, h2: 2, h3: 3, h4: 4, h5: 5, h6: 6 };

const collapse = (s) => s.replace(/\s+/g, ' ');

/**
 * The parser keeps <pre> contents as raw markup (turning that off drops them
 * entirely in node-html-parser 7), so a code block's text still carries the
 * <code> tags and entities the browser wrote. Strip and decode them here.
 */
const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: '\u00a0' };
const decodeRaw = (raw) => raw
  .replace(/<[^>]+>/g, '')
  .replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) => {
    if (e[0] === '#') return String.fromCodePoint(e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10));
    return ENTITIES[e.toLowerCase()] ?? m;
  });

/** True for the "← Previous / Next: …" footer every page ends with. */
const isPageFooterNav = (node) => {
  const kids = node.childNodes.filter((n) => n.nodeType === 1);
  return kids.length > 0 && kids.every((k) => k.rawTagName?.toLowerCase() === 'a') && /Next:/.test(node.text);
};

/**
 * Walks one page's <main> and returns { title, blocks }: the page's own h1 as
 * its title (falling back to the Harbor label) and a flat list of blocks.
 */
function extractBlocks(main, fallbackTitle) {
  const blocks = [];
  let runs = [];          // inline runs for the paragraph being built
  let heading = 0;        // >0 while inside h1..h6
  let listStack = [];     // [{kind, instance}] for enclosing ul/ol
  let pendingItem = null; // list marker waiting for its first paragraph
  let numberedLists = 0;
  let title = null;       // first h1 becomes the section title, not a block
  let lastHeading = 1;    // level of the last heading written, for tab panels
  let panelFloor = 0;     // >0 inside a tab panel: headings nest under its label

  const flush = () => {
    const text = runs.map((r) => r.text).join('');
    if (!text.trim()) { runs = []; return; }
    // Trim the paragraph's outer whitespace without disturbing inner runs.
    runs[0].text = runs[0].text.replace(/^\s+/, '');
    runs[runs.length - 1].text = runs[runs.length - 1].text.replace(/\s+$/, '');
    runs = runs.filter((r) => r.text.length);
    const plain = text.trim();
    if (heading) {
      if (heading === 1 && title === null) title = plain;
      else {
        const level = Math.min(Math.max(heading, panelFloor + 1), 6);
        blocks.push({ type: 'heading', level, runs });
        lastHeading = level;
      }
    } else if (plain.length <= 2) {
      // Decorative step counters ("01"), avatar letters ("C") and arrows ("→") on the site's cards.
    } else {
      const list = pendingItem;
      pendingItem = null;
      blocks.push({ type: 'para', runs, list });
    }
    runs = [];
  };

  const pushText = (text, fmt) => {
    if (!text) return;
    runs.push({ text, ...fmt });
  };

  const walk = (node, fmt) => {
    if (node.nodeType === 3) { // text
      pushText(collapse(node.text), fmt);
      return;
    }
    if (node.nodeType !== 1) return;
    const tag = node.rawTagName?.toLowerCase();
    if (!tag || SKIP.has(tag)) return;
    if (node.getAttribute('aria-hidden') === 'true') return;
    if (tag === 'div' && isPageFooterNav(node)) return;

    const widget = node.getAttribute('data-export-widget');
    if (widget) {
      flush();
      blocks.push({ type: 'para', runs: [{ text: `Interactive on the site: ${widget}. Its text follows.`, italic: true }] });
    }

    // A tab panel (Tabs / PlatformTabs in export mode): its label becomes a
    // heading one level under the last heading, and everything inside nests
    // beneath it, so "Windows" sits above its own install steps.
    const panel = node.getAttribute('data-export-panel');
    if (panel) {
      flush();
      // Every tab group on the site sits directly under an h2 section, so its
      // panels are h3; a tab group nested inside a panel goes one deeper.
      const level = Math.min(panelFloor ? panelFloor + 1 : 3, 6);
      blocks.push({ type: 'heading', level, runs: [{ text: panel }] });
      const outerFloor = panelFloor;
      const outerLast = lastHeading;
      panelFloor = level; lastHeading = level;
      let labelSkipped = false;
      for (const child of node.childNodes) {
        if (!labelSkipped && child.nodeType === 1 && child.rawTagName?.toLowerCase() === 'h4') { labelSkipped = true; continue; }
        walk(child, fmt);
      }
      flush();
      panelFloor = outerFloor; lastHeading = outerLast;
      return;
    }

    if (tag === 'pre') {
      flush();
      blocks.push({ type: 'code', text: decodeRaw(node.text).replace(/\r/g, '') });
      return;
    }
    if (tag === 'table') {
      flush();
      blocks.push({ type: 'table', rows: extractTable(node) });
      return;
    }
    if (tag === 'br' || tag === 'hr') { flush(); return; }

    let nextFmt = fmt;
    if (tag === 'strong' || tag === 'b') nextFmt = { ...fmt, bold: true };
    if (tag === 'em' || tag === 'i') nextFmt = { ...fmt, italic: true };
    if (tag === 'code') nextFmt = { ...fmt, code: true };

    if (HEADING[tag]) { flush(); heading = HEADING[tag]; }
    if (tag === 'ul' || tag === 'ol') {
      flush();
      listStack.push({ kind: tag === 'ol' ? 'number' : 'bullet', instance: tag === 'ol' ? ++numberedLists : 0 });
    }
    if (tag === 'li') {
      flush();
      const top = listStack[listStack.length - 1] ?? { kind: 'bullet', instance: 0 };
      pendingItem = { kind: top.kind, level: Math.max(0, listStack.length - 1), instance: top.instance };
    }
    if (BLOCK.has(tag) && !HEADING[tag]) flush();

    // Two inline elements butted together (<span>Rate</span><span>$3</span>)
    // are laid out side by side on the site; in running text they need a space.
    let prevWasElement = false;
    for (const child of node.childNodes) {
      if (child.nodeType === 1 && prevWasElement && runs.length && !/\s$/.test(runs[runs.length - 1].text)) {
        pushText(' ', nextFmt);
      }
      walk(child, nextFmt);
      if (child.nodeType === 1) prevWasElement = true;
      else if (child.nodeType === 3 && child.text.trim()) prevWasElement = false;
    }

    if (tag === 'a') {
      const href = node.getAttribute('href') ?? '';
      if (/^https?:\/\//.test(href)) pushText(` (${href})`, { ...fmt, link: true });
    }
    if (HEADING[tag]) { flush(); heading = 0; }
    else if (BLOCK.has(tag)) flush();
    if (tag === 'ul' || tag === 'ol') listStack.pop();
    if (tag === 'li') pendingItem = null;
  };

  walk(main, {});
  flush();
  return { title: title ?? fallbackTitle, blocks };
}

/** A table as rows of cells, each cell a list of inline runs. */
function extractTable(table) {
  const rows = [];
  for (const tr of table.querySelectorAll('tr')) {
    const cells = [];
    for (const cell of tr.childNodes.filter((n) => n.nodeType === 1 && /^t[dh]$/i.test(n.rawTagName))) {
      const header = cell.rawTagName.toLowerCase() === 'th';
      cells.push({ header, text: collapse(cell.text).trim() });
    }
    if (cells.length) rows.push(cells);
  }
  return rows;
}

// --- docx ----------------------------------------------------------------

const toRuns = (runs) => runs.map((r) => new TextRun({
  text: r.text,
  bold: r.bold || undefined,
  italics: r.italic || undefined,
  font: r.code ? MONO : undefined,
  size: r.code ? 19 : undefined,
  color: r.link ? '555555' : undefined,
}));

const HEADING_LEVELS = [null, HeadingLevel.HEADING_1, HeadingLevel.HEADING_2, HeadingLevel.HEADING_3,
  HeadingLevel.HEADING_4, HeadingLevel.HEADING_5, HeadingLevel.HEADING_6];

function blockToDocx(block) {
  if (block.type === 'heading') {
    return [new Paragraph({ heading: HEADING_LEVELS[block.level], children: toRuns(block.runs) })];
  }
  if (block.type === 'para') {
    const numbering = block.list
      ? { reference: block.list.kind === 'number' ? 'numbers' : 'bullets', level: Math.min(block.list.level, 2),
          instance: block.list.instance }
      : undefined;
    return [new Paragraph({ children: toRuns(block.runs), numbering, spacing: { after: 120 } })];
  }
  if (block.type === 'code') {
    const lines = block.text.replace(/^\n+|\n+$/g, '').split('\n');
    return lines.map((line, i) => new Paragraph({
      children: [new TextRun({ text: line || ' ', font: MONO, size: 18 })],
      shading: { type: ShadingType.CLEAR, fill: 'F2F0F5' },
      spacing: { before: 0, after: i === lines.length - 1 ? 160 : 0, line: 260 },
      indent: { left: 360 },
    }));
  }
  if (block.type === 'table') {
    if (!block.rows.length) return [];
    const width = Math.max(...block.rows.map((r) => r.length));
    const rows = block.rows.map((cells) => new TableRow({
      children: Array.from({ length: width }, (_, i) => {
        const c = cells[i] ?? { header: false, text: '' };
        return new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: c.text, bold: c.header || undefined })] })],
          shading: c.header ? { type: ShadingType.CLEAR, fill: 'EDE7F1' } : undefined,
        });
      }),
    }));
    return [new Table({ rows, width: { size: 100, type: WidthType.PERCENTAGE } }), new Paragraph({ text: '' })];
  }
  return [];
}

const children = [];
const now = new Date();
const generated = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
children.push(
  new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun('Cover Whale AI Learning Guide')] }),
  new Paragraph({ children: [new TextRun({ text: 'Full text of the guide as published on The Harbor', size: 26 })] }),
  new Paragraph({ children: [new TextRun({ text: `Exported ${generated} from ${SITE_URL}`, size: 20, color: '555555' })],
    spacing: { after: 240 } }),
  new Paragraph({ children: [new TextRun({ text:
    'This is a reading copy. Interactive parts of the site (the prompt builder, the model chooser, the sliders) ' +
    'appear here as their text only; each tab on the site is written out in full under its own sub-heading, ' +
    'and each quiz is followed by its answer key.', size: 20, italics: true })], spacing: { after: 360 } }),
  // Styled like a Heading 1 but not one, so the contents table does not list itself.
  new Paragraph({ children: [new TextRun({ text: 'Contents', size: 36, bold: true, color: PURPLE })], spacing: { before: 360, after: 200 } }),
  new TableOfContents('Contents', { hyperlink: true, headingStyleRange: '1-2' }),
);

let pageCount = 0;
let blockCount = 0;
for (const route of ORDER) {
  const title = TITLES[route];
  const html = readFileSync(join(inDir, `${slugFor(route)}.html`), 'utf8');
  const main = parse(html).querySelector('main');
  if (!main) { console.error(`no <main> in ${route}`); process.exit(1); }
  const { title: pageTitle, blocks } = extractBlocks(main, title);
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, pageBreakBefore: true, children: [new TextRun(pageTitle)] }));
  for (const b of blocks) children.push(...blockToDocx(b));
  pageCount++; blockCount += blocks.length;
}

const doc = new Document({
  creator: 'Cover Whale',
  title: 'Cover Whale AI Learning Guide',
  description: `Full text export, ${generated}`,
  features: { updateFields: true },
  styles: {
    default: { document: { run: { font: 'Calibri', size: 22 } } },
    paragraphStyles: [
      { id: 'Title', name: 'Title', basedOn: 'Normal', next: 'Normal',
        run: { size: 56, bold: true, color: PURPLE }, paragraph: { spacing: { after: 200 } } },
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 36, bold: true, color: PURPLE }, paragraph: { spacing: { before: 360, after: 200 }, outlineLevel: 0 } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 30, bold: true, color: PURPLE }, paragraph: { spacing: { before: 320, after: 160 }, outlineLevel: 1 } },
      { id: 'Heading3', name: 'Heading 3', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 26, bold: true, color: '333333' }, paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 2 } },
      { id: 'Heading4', name: 'Heading 4', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 23, bold: true, italics: true, color: '333333' }, paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 3 } },
    ],
  },
  numbering: {
    config: [
      { reference: 'bullets', levels: [0, 1, 2].map((level) => ({
        level, format: LevelFormat.BULLET, text: ['•', '◦', '▪'][level], alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720 + level * 360, hanging: 360 } } } })) },
      { reference: 'numbers', levels: [0, 1, 2].map((level) => ({
        level, format: LevelFormat.DECIMAL, text: `%${level + 1}.`, alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720 + level * 360, hanging: 360 } } } })) },
    ],
  },
  sections: [{ properties: {}, children }],
});

const buffer = await Packer.toBuffer(doc);
writeFileSync(outPath, buffer);
console.log(`${outPath}  (${pageCount} pages, ${blockCount} blocks, ${(buffer.length / 1024).toFixed(0)} KB)`);

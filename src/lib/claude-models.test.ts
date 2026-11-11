/**
 * Engine tests for the right-sizer. Run with:
 *
 *   node --test src/lib/claude-models.test.ts
 *
 * Node 22.18+ strips the TypeScript types itself, so this needs no extra
 * tooling. claude-models.ts has no imports, which is what makes that work.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  CLAUDE_MODELS,
  PREVIOUS_MODELS,
  SIZER_QUESTIONS,
  TASK_SHAPES,
  estimateCost,
  fitsContext,
  formatPrice,
  getEffort,
  getModel,
  sizeIt,
  type Answers,
} from './claude-models.ts';

test('the fast rung is Claude Haiku 5.5', () => {
  const haiku = getModel('haiku');
  assert.equal(haiku.name, 'Claude Haiku 5.5');
  assert.equal(haiku.apiId, 'claude-haiku-5-5');
  assert.equal(haiku.contextTokens, 1_000_000);
  assert.equal(haiku.inputPrice, 0.1);
  assert.equal(haiku.outputPrice, 0.5);
  assert.equal(haiku.hasEffortDial, true);
});

test('Haiku 4.5 is listed as the model Haiku 5.5 replaced', () => {
  const old = PREVIOUS_MODELS.find(m => m.name === 'Claude Haiku 4.5');
  assert.ok(old, 'Claude Haiku 4.5 missing from PREVIOUS_MODELS');
  assert.equal(old.replacedBy, 'haiku');
  assert.equal(old.inputPrice, 1);
  assert.equal(old.outputPrice, 5);
});

test('the frontier rung is Claude Fable 5.2', () => {
  const fable = getModel('fable');
  assert.equal(fable.name, 'Claude Fable 5.2');
  assert.equal(fable.apiId, 'claude-fable-5-2');
  assert.equal(fable.contextTokens, 1_000_000);
  assert.equal(fable.inputPrice, 8);
  assert.equal(fable.outputPrice, 40);
  assert.equal(fable.hasEffortDial, true);
});

test('Fable 5.1 is listed as the model Fable 5.2 replaced, and Fable 5 is gone', () => {
  const old = PREVIOUS_MODELS.find(m => m.name === 'Claude Fable 5.1');
  assert.ok(old, 'Claude Fable 5.1 missing from PREVIOUS_MODELS');
  assert.equal(old.replacedBy, 'fable');
  assert.equal(old.inputPrice, 10);
  assert.equal(old.outputPrice, 50);
  assert.equal(PREVIOUS_MODELS.find(m => m.name === 'Claude Fable 5'), undefined);
});

test('Fable 5.2 costs twice Opus 5.5 per token', () => {
  assert.equal(getModel('fable').inputPrice / getModel('opus').inputPrice, 2);
  assert.equal(getModel('fable').outputPrice / getModel('opus').outputPrice, 2);
});

test('the frontier note names Fable 5.2, keeps Opus first, and starts it at high effort, not max', () => {
  const r = sizeIt({ work: 'build', volume: 'corpus', stakes: 'binding', detect: 'silent', frequency: 'once' });
  assert.ok(r?.fableNote, 'expected the frontier note for this combination');
  assert.match(r.fableNote, /Claude Fable 5\.2/);
  assert.match(r.fableNote, /Opus 5\.5/);
  assert.match(r.fableNote, /\bhigh\b effort/);
  assert.doesNotMatch(r.fableNote, /Fable 5\.1/);
});

test('every frontier note sits on a hard, ambiguous or long-running job', () => {
  for (const answers of allAnswers()) {
    const r = sizeIt(answers)!;
    if (r.fableNote) assert.ok(['judge', 'build'].includes(answers.work!), JSON.stringify(answers));
  }
});

test('medium effort is described as where Claude Code starts every current model', () => {
  assert.equal(getEffort('medium').label, 'Where Claude Code starts every current model');
});

test('relative cost is measured against Haiku 5.5', () => {
  assert.deepEqual(
    CLAUDE_MODELS.map(m => [m.id, m.relativeCost]),
    [['haiku', 1], ['sonnet', 20], ['opus', 40], ['fable', 80]],
  );
});

test('Haiku 5.5 bills the long-prompt rate above 100K input tokens', () => {
  const haiku = getModel('haiku');
  const low = getEffort('low');
  const short = { label: 's', inputTokens: 100_000, outputTokens: 0 };
  const long = { label: 'l', inputTokens: 200_000, outputTokens: 1_000_000 };
  const close = (a: number, b: number) => assert.ok(Math.abs(a - b) < 1e-9, `${a} != ${b}`);
  close(estimateCost(haiku, low, short), 0.01);
  // 0.2M in at $0.50 + 1M out at $2.50
  close(estimateCost(haiku, low, long), 0.1 + 2.5);
});

test('models without a long-prompt rate bill one rate at any length', () => {
  const sonnet = getModel('sonnet');
  const low = getEffort('low');
  assert.equal(estimateCost(sonnet, low, { label: 'x', inputTokens: 500_000, outputTokens: 0 }), 1);
});

test('Haiku 5.5 effort now moves its cost', () => {
  const haiku = getModel('haiku');
  const shape = TASK_SHAPES.pages;
  assert.ok(estimateCost(haiku, getEffort('high'), shape) > estimateCost(haiku, getEffort('low'), shape));
});

test('formatPrice shows cents with two decimals and dollars bare', () => {
  assert.equal(formatPrice(0.1), '0.10');
  assert.equal(formatPrice(0.5), '0.50');
  assert.equal(formatPrice(2), '2');
  assert.equal(formatPrice(10), '10');
});

test('reshaping a short note lands on Haiku 5.5 at low effort', () => {
  const r = sizeIt({ work: 'transform', volume: 'snippet', stakes: 'internal', detect: 'obvious', frequency: 'once' });
  assert.ok(r);
  assert.equal(r.model.id, 'haiku');
  assert.equal(r.effort.id, 'low');
  assert.equal(r.effortApplies, true);
  assert.equal(r.headline, 'Claude Haiku 5.5 at low effort');
});

test('Haiku 5.5 holds a whole dataset, so no rung is ruled out on size', () => {
  const r = sizeIt({ work: 'extract', volume: 'corpus', stakes: 'internal', detect: 'review', frequency: 'batch' });
  assert.ok(r);
  assert.equal(r.contextNote, null);
});

// Every combination of answers, so a weight change cannot quietly produce a
// recommendation the page argues against.
function allAnswers(): Answers[] {
  let combos: Answers[] = [{}];
  for (const q of SIZER_QUESTIONS) {
    combos = combos.flatMap(a => q.options.map(o => ({ ...a, [q.id]: o.value })));
  }
  return combos;
}

test('every answer combination produces a recommendation that fits its input', () => {
  for (const answers of allAnswers()) {
    const r = sizeIt(answers);
    assert.ok(r, JSON.stringify(answers));
    assert.ok(fitsContext(r.model, r.shape), JSON.stringify(answers));
  }
});

test('Haiku 5.5 is never recommended above high effort', () => {
  for (const answers of allAnswers()) {
    const r = sizeIt(answers)!;
    if (r.model.id === 'haiku') {
      assert.ok(['low', 'medium', 'high'].includes(r.effort.id), JSON.stringify(answers));
    }
  }
});

test('no copy on the sizer still describes Haiku as unable to think or hold large input', () => {
  const text = JSON.stringify(SIZER_QUESTIONS) + JSON.stringify(CLAUDE_MODELS);
  assert.doesNotMatch(text, /No effort dial/i);
  assert.doesNotMatch(text, /past what Haiku can hold/);
});

/**
 * Model + effort reference data and the right-sizing engine behind
 * /right-size-your-model.
 *
 * Source of truth for the ladder and the "start small, step up" rule is the
 * AI CoE Week 11 sync (Models, Effort & Org Skills, 2026-07-13). Model names
 * and prices are refreshed against the current lineup — the deck's Opus 4.8
 * has been superseded by Opus 5 as the Claude Code default.
 *
 * Prices are Anthropic first-party API list rates per 1M tokens.
 */

export type ModelId = 'haiku' | 'sonnet' | 'opus' | 'fable';
export type EffortId = 'low' | 'medium' | 'high' | 'xhigh' | 'max';

export interface ClaudeModel {
  id: ModelId;
  name: string;
  apiId: string;
  priceTier: string;
  label: string;
  color: string;
  /** Context window, human-readable. */
  context: string;
  /** Context window in tokens, for the "does this even fit" check. */
  contextTokens: number;
  inputPrice: number;
  outputPrice: number;
  /** Cost per token relative to Haiku — the number worth remembering. */
  relativeCost: number;
  summary: string;
  bestFor: string;
  hasEffortDial: boolean;
  notes: string;
}

export const CLAUDE_MODELS: ClaudeModel[] = [
  {
    id: 'haiku',
    name: 'Claude Haiku 4.5',
    apiId: 'claude-haiku-4-5',
    priceTier: '$',
    label: 'Fastest',
    color: '#3A9E6E',
    context: '200K',
    contextTokens: 200_000,
    inputPrice: 1,
    outputPrice: 5,
    relativeCost: 1,
    summary: 'Fastest and most cost-effective. Snappy on simple, repetitive work.',
    bestFor: 'Quick lookups, classification, tidying text, first drafts, high-volume batches.',
    hasEffortDial: false,
    notes: 'No effort dial. Haiku answers rather than deliberates, which is exactly why it is fast and cheap.',
  },
  {
    id: 'sonnet',
    name: 'Claude Sonnet 5',
    apiId: 'claude-sonnet-5',
    priceTier: '$$',
    label: 'Balanced workhorse',
    color: '#4A6FA5',
    context: '1M',
    contextTokens: 1_000_000,
    inputPrice: 3,
    outputPrice: 15,
    relativeCost: 3,
    summary: 'The best balance of speed and intelligence. Near-Opus quality on coding.',
    bestFor: 'Most day-to-day work: writing, research, analysis, routine coding.',
    hasEffortDial: true,
    notes: 'Where most everyday work belongs. If you are unsure, this is the honest default.',
  },
  {
    id: 'opus',
    name: 'Claude Opus 5',
    apiId: 'claude-opus-5',
    priceTier: '$$$',
    label: 'Most capable · Claude Code default',
    color: '#6B2D8B',
    context: '1M',
    contextTokens: 1_000_000,
    inputPrice: 5,
    outputPrice: 25,
    relativeCost: 5,
    summary: 'Highly autonomous. State of the art on long, multi-step and knowledge work.',
    bestFor: 'Hard reasoning, complex builds, long-horizon autonomous tasks.',
    hasEffortDial: true,
    notes: 'Costs 5x Haiku per token before you touch the effort dial. Worth it on hard problems, wasted on easy ones.',
  },
  {
    id: 'fable',
    name: 'Claude Fable 5',
    apiId: 'claude-fable-5',
    priceTier: '$$$$',
    label: 'The frontier',
    color: '#B45309',
    context: '1M',
    contextTokens: 1_000_000,
    inputPrice: 10,
    outputPrice: 50,
    relativeCost: 10,
    summary: 'The most capable model available, for the most demanding reasoning.',
    bestFor: 'The hardest, longest problems, when Opus genuinely is not enough.',
    hasEffortDial: true,
    notes: 'Thinking is always on and cannot be switched off. Reach for it after Opus has fallen short, not before.',
  },
];

export function getModel(id: ModelId): ClaudeModel {
  return CLAUDE_MODELS.find(m => m.id === id)!;
}

export interface EffortLevel {
  id: EffortId;
  name: string;
  label: string;
  color: string;
  what: string;
  bestFor: string;
  /** Rough output-token multiplier vs. low effort. Illustrative, not a billing table. */
  costMultiplier: number;
}

export const EFFORT_LEVELS: EffortLevel[] = [
  {
    id: 'low',
    name: 'low',
    label: 'Quick and mechanical',
    color: '#3A9E6E',
    what: 'Barely deliberates. Fewer, more consolidated tool calls, no preamble, terse answers.',
    bestFor: 'Simple transformations, formatting, batch jobs, sub-agents doing lookups.',
    costMultiplier: 1,
  },
  {
    id: 'medium',
    name: 'medium',
    label: 'Light reasoning',
    color: '#5FA37A',
    what: 'A short think before answering. Enough to catch the obvious mistakes.',
    bestFor: 'Routine drafting, straightforward extraction, tidying a document.',
    costMultiplier: 1.7,
  },
  {
    id: 'high',
    name: 'high',
    label: 'The default',
    color: '#4A6FA5',
    what: 'Balanced thinking, the sweet spot for quality against speed and tokens.',
    bestFor: 'Most real work. The minimum for anything that actually matters.',
    costMultiplier: 3,
  },
  {
    id: 'xhigh',
    name: 'xhigh',
    label: 'Claude Code default',
    color: '#6B2D8B',
    what: 'More thinking before acting: deeper planning and more deliberate tool use.',
    bestFor: 'Coding and agentic work. Building, debugging, multi-step tasks.',
    costMultiplier: 5,
  },
  {
    id: 'max',
    name: 'max',
    label: 'Correctness first',
    color: '#D95550',
    what: 'The most thorough single-answer setting. Can over-think an easy problem.',
    bestFor: 'The hardest problems, where being right beats being fast or cheap.',
    costMultiplier: 8,
  },
];

export function getEffort(id: EffortId): EffortLevel {
  return EFFORT_LEVELS.find(e => e.id === id)!;
}

/* ─────────────────────────── The right-sizing engine ─────────────────────── */

export type QuestionId = 'work' | 'volume' | 'stakes' | 'detect' | 'frequency';

export interface SizerOption {
  value: string;
  label: string;
  detail: string;
  /** Push on the model ladder. Positive climbs toward the frontier. */
  modelWeight: number;
  /** Push on the effort dial. Positive climbs toward max. */
  effortWeight: number;
  /** Explains the push, shown back to the user as the reasoning trace. */
  because: string;
}

export interface SizerQuestion {
  id: QuestionId;
  question: string;
  hint: string;
  options: SizerOption[];
}

export const SIZER_QUESTIONS: SizerQuestion[] = [
  {
    id: 'work',
    question: 'What is the actual work?',
    hint: 'Not the topic, the cognitive job. This is the single biggest lever.',
    options: [
      {
        value: 'transform',
        label: 'Reshape text I already have',
        detail: 'Rephrase, reformat, shorten, fix the tone, translate.',
        modelWeight: 0,
        effortWeight: 0,
        because: 'The answer is already sitting in the text. This does not need reasoning, it needs restating.',
      },
      {
        value: 'extract',
        label: 'Pull facts out or sort things',
        detail: 'Summarize, classify, tag, extract fields, look something up.',
        modelWeight: 0,
        effortWeight: 0.5,
        because: 'Retrieval and classification are exactly what the fast model is built for.',
      },
      {
        value: 'draft',
        label: 'Write something new from a brief',
        detail: 'An email, a memo, a post, a first draft of a document.',
        modelWeight: 1,
        effortWeight: 1,
        because: 'Composing from scratch needs judgment about structure and tone, not just recall.',
      },
      {
        value: 'analyze',
        label: 'Analyze, compare, or explain why',
        detail: 'Reconcile numbers, find the pattern, work out what happened.',
        modelWeight: 1,
        effortWeight: 2,
        because: 'Analysis rewards thinking time more than it rewards a bigger model.',
      },
      {
        value: 'judge',
        label: 'Reason through something genuinely ambiguous',
        detail: 'Trade-offs, no clean right answer, a real decision rides on it.',
        modelWeight: 2,
        effortWeight: 2.5,
        because: 'Ambiguity is where the capable models actually separate from the cheap ones.',
      },
      {
        value: 'build',
        label: 'Build or debug across many steps',
        detail: 'Multi-file code changes, long autonomous runs, agentic work.',
        modelWeight: 2,
        effortWeight: 3,
        because: 'Long-horizon tool use is the case Opus and xhigh were built for.',
      },
    ],
  },
  {
    id: 'volume',
    question: 'How much material goes in?',
    hint: 'Input tokens are the quiet half of the bill, and they gate which models can hold the job at all.',
    options: [
      {
        value: 'snippet',
        label: 'A paragraph or two',
        detail: 'An email, a Slack thread, a short note.',
        modelWeight: 0,
        effortWeight: 0,
        because: 'A small input costs almost nothing to read, on any model.',
      },
      {
        value: 'pages',
        label: 'A few pages',
        detail: 'One document, a policy section, a short report.',
        modelWeight: 0,
        effortWeight: 0,
        because: 'Still comfortably inside every model in the family.',
      },
      {
        value: 'pile',
        label: 'A pile of documents or a big spreadsheet',
        detail: 'Dozens of files, a large export, a long loss-run set.',
        modelWeight: 0.5,
        effortWeight: 0.25,
        because: 'Holding a lot at once, and staying consistent across all of it, starts to strain the fast model.',
      },
      {
        value: 'corpus',
        label: 'A whole codebase or dataset',
        detail: 'Hundreds of thousands of tokens.',
        modelWeight: 1,
        effortWeight: 0.25,
        because: 'This is past what Haiku can hold at all, and reading it costs real money on every model.',
      },
    ],
  },
  {
    id: 'stakes',
    question: 'Where does the output land?',
    hint: 'Match the effort to the stakes. This drives the dial more than it drives the model.',
    options: [
      {
        value: 'throwaway',
        label: 'Just me, right now',
        detail: 'A scratch answer I will read once and discard.',
        modelWeight: -0.5,
        effortWeight: -0.5,
        because: 'Nobody else sees it and nothing depends on it. Buy the cheap version.',
      },
      {
        value: 'internal',
        label: 'A teammate reads it',
        detail: 'An internal doc, a Slack summary, a hand-off note.',
        modelWeight: 0,
        effortWeight: 0,
        because: 'Normal internal work. No premium and no discount.',
      },
      {
        value: 'external',
        label: 'A broker, customer, or partner sees it',
        detail: 'It leaves the building with our name on it.',
        modelWeight: 0.5,
        effortWeight: 0.5,
        because: 'External output carries our name, so it earns a step up.',
      },
      {
        value: 'binding',
        label: 'Money, a filing, or a policy decision depends on it',
        detail: 'A regulator, a bind, a payment, a rate.',
        modelWeight: 0.75,
        effortWeight: 1,
        because: 'When a real outcome rides on the answer, correctness beats cost.',
      },
    ],
  },
  {
    id: 'detect',
    question: 'If it is wrong, would you notice?',
    hint: 'The most underrated question on this page.',
    options: [
      {
        value: 'obvious',
        label: 'Instantly, I would spot it',
        detail: 'The code fails, the tone is off, the number is absurd.',
        modelWeight: -0.5,
        effortWeight: -0.5,
        because: 'A cheap wrong answer you catch immediately costs you seconds. Let the cheap model try first.',
      },
      {
        value: 'review',
        label: 'I would catch it, but I have to look',
        detail: 'It takes a careful read to verify.',
        modelWeight: 0,
        effortWeight: 0,
        because: 'Reviewable errors are a normal cost of doing business.',
      },
      {
        value: 'silent',
        label: 'No, a wrong answer looks exactly like a right one',
        detail: 'A plausible number, a confident citation, a subtle logic error.',
        modelWeight: 0.5,
        effortWeight: 0.5,
        because: 'Silent failure is the one case where paying more up front is genuinely the cheaper option.',
      },
    ],
  },
  {
    id: 'frequency',
    question: 'How many times will you run this?',
    hint: 'A cost difference you can ignore once becomes the entire bill at scale.',
    options: [
      {
        value: 'once',
        label: 'Once',
        detail: 'A one-off task.',
        modelWeight: 0,
        effortWeight: 0,
        because: 'A single run rarely justifies optimizing. Pick what fits the work.',
      },
      {
        value: 'weekly',
        label: 'Regularly, a handful of times',
        detail: 'A recurring report, a weekly summary.',
        modelWeight: 0,
        effortWeight: 0,
        because: 'Repeating work is worth setting up properly, but the per-run cost is still small.',
      },
      {
        value: 'batch',
        label: 'Many times, or in an automated loop',
        detail: 'Hundreds or thousands of runs.',
        modelWeight: -0.5,
        effortWeight: -0.5,
        because: 'At volume, the cheapest model that works is not a preference. It is the whole design.',
      },
    ],
  },
];

export type Answers = Partial<Record<QuestionId, string>>;

export interface TraceLine {
  question: string;
  answer: string;
  because: string;
  /** 'up' climbed the ladder, 'down' came back down, 'flat' did neither. */
  direction: 'up' | 'down' | 'flat';
}

export interface TaskShape {
  label: string;
  inputTokens: number;
  outputTokens: number;
}

export const TASK_SHAPES: Record<string, TaskShape> = {
  snippet: { label: 'A paragraph or two', inputTokens: 800, outputTokens: 400 },
  pages: { label: 'A few pages', inputTokens: 8_000, outputTokens: 1_500 },
  pile: { label: 'A pile of documents', inputTokens: 120_000, outputTokens: 4_000 },
  corpus: { label: 'A whole codebase or dataset', inputTokens: 500_000, outputTokens: 12_000 },
};

export interface SizerResult {
  model: ClaudeModel;
  effort: EffortLevel;
  /** False when the model has no effort dial, so the effort call is moot. */
  effortApplies: boolean;
  headline: string;
  trace: TraceLine[];
  /** Set when the answers genuinely reach the frontier. */
  fableNote: string | null;
  /** Set when the reflex pick would have cost meaningfully more. */
  overbuyWarning: string | null;
  /** What the reflex pick (Opus 5 at xhigh) costs, as a multiple of the recommendation. */
  reflexMultiple: number;
  /** Set when a cheaper model was ruled out because the input would not fit. */
  contextNote: string | null;
  shape: TaskShape;
}

/**
 * Dollar cost of one run. Thinking tokens bill as output, so effort scales the
 * output side only. The multiplier is illustrative — real thinking depth varies
 * with the task.
 */
export function estimateCost(model: ClaudeModel, effort: EffortLevel, shape: TaskShape): number {
  const effortMultiplier = model.hasEffortDial ? effort.costMultiplier : 1;
  const input = (shape.inputTokens / 1_000_000) * model.inputPrice;
  const output = ((shape.outputTokens * effortMultiplier) / 1_000_000) * model.outputPrice;
  return input + output;
}

/** False when the input simply will not fit in this model's context window. */
export function fitsContext(model: ClaudeModel, shape: TaskShape): boolean {
  return shape.inputTokens < model.contextTokens * 0.8;
}

const MODEL_LADDER: ModelId[] = ['haiku', 'sonnet', 'opus', 'fable'];
const EFFORT_LADDER: EffortId[] = ['low', 'medium', 'high', 'xhigh', 'max'];

function clamp(n: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, n));
}

export function sizeIt(answers: Answers): SizerResult | null {
  const picked = SIZER_QUESTIONS.map(q => {
    const value = answers[q.id];
    if (!value) return null;
    const option = q.options.find(o => o.value === value);
    return option ? { q, option } : null;
  });

  if (picked.some(p => p === null)) return null;
  const resolved = picked as Array<{ q: SizerQuestion; option: SizerOption }>;

  let modelScore = 0;
  let effortScore = 0;
  const trace: TraceLine[] = [];

  for (const { q, option } of resolved) {
    modelScore += option.modelWeight;
    effortScore += option.effortWeight;
    const push = option.modelWeight + option.effortWeight;
    trace.push({
      question: q.question,
      answer: option.label,
      because: option.because,
      direction: push > 0 ? 'up' : push < 0 ? 'down' : 'flat',
    });
  }

  // Real thinking needs a model that can think. Haiku has no effort dial, so a
  // high effort score has to carry the model up with it.
  let modelIndex = clamp(Math.round(modelScore), 0, 2);
  if (modelIndex === 0 && effortScore >= 2) modelIndex = 1;

  const shape = TASK_SHAPES[answers.volume as string];

  // A model that cannot hold the input is not a recommendation.
  while (
    modelIndex < MODEL_LADDER.length - 1 &&
    !fitsContext(getModel(MODEL_LADDER[modelIndex]), shape)
  ) {
    modelIndex += 1;
  }

  // Call out any cheaper rung that lost on size rather than on capability —
  // that distinction is worth teaching even when the score never selected it.
  const outgrown = MODEL_LADDER.slice(0, modelIndex)
    .map(getModel)
    .find(m => !fitsContext(m, shape));
  const contextNote = outgrown
    ? `${outgrown.name} is off the table on size, not on smarts. Its ${outgrown.context} window cannot hold this much input, so the cheapest rung is gone before capability enters the argument.`
    : null;

  const model = getModel(MODEL_LADDER[modelIndex]);
  const effort = getEffort(EFFORT_LADDER[clamp(Math.round(effortScore), 0, 4)]);

  const work = answers.work;
  const fableNote =
    modelScore >= 3.5 && (work === 'judge' || work === 'build')
      ? 'Your answers sit at the very top of the ladder: a hard, high-stakes problem where a wrong answer stays hidden. This is the narrow case where Claude Fable 5 earns its price, but only after Opus 5 has actually tried and fallen short. Going frontier-first is still over-buying.'
      : null;

  const reflexCost = estimateCost(getModel('opus'), getEffort('xhigh'), shape);
  const chosenCost = estimateCost(model, effort, shape);
  const reflexMultiple = chosenCost > 0 ? reflexCost / chosenCost : 1;

  const overbuyWarning =
    reflexMultiple >= 2
      ? `Reaching for Opus 5 at xhigh out of habit would cost roughly ${reflexMultiple.toFixed(1)}x this run, buying thinking this task never asked for.`
      : null;

  const headline = model.hasEffortDial
    ? `${model.name} at ${effort.name} effort`
    : `${model.name}, no effort dial needed`;

  return {
    model,
    effort,
    effortApplies: model.hasEffortDial,
    headline,
    trace,
    fableNote,
    overbuyWarning,
    reflexMultiple,
    contextNote,
    shape,
  };
}

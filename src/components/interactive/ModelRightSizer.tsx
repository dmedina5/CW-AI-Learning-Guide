'use client';

import { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Gauge,
  Minus,
  RotateCcw,
  TrendingDown,
  TrendingUp,
  TriangleAlert,
} from 'lucide-react';
import {
  CLAUDE_MODELS,
  EFFORT_LEVELS,
  SIZER_QUESTIONS,
  estimateCost,
  fitsContext,
  getEffort,
  getModel,
  sizeIt,
  type Answers,
  type QuestionId,
} from '@/lib/claude-models';

/** Prefilled scenarios. The first one is the whole point of this page. */
const SCENARIOS: Array<{ label: string; answers: Answers }> = [
  {
    label: 'Rephrase an email to a broker',
    answers: {
      work: 'transform',
      volume: 'snippet',
      stakes: 'external',
      detect: 'obvious',
      frequency: 'once',
    },
  },
  {
    label: 'Summarize 40 loss runs into a table',
    answers: {
      work: 'extract',
      volume: 'pile',
      stakes: 'internal',
      detect: 'review',
      frequency: 'weekly',
    },
  },
  {
    label: 'Classify 5,000 submissions automatically',
    answers: {
      work: 'extract',
      volume: 'snippet',
      stakes: 'internal',
      detect: 'review',
      frequency: 'batch',
    },
  },
  {
    label: 'Work out why a rate came back wrong',
    answers: {
      work: 'analyze',
      volume: 'pages',
      stakes: 'binding',
      detect: 'silent',
      frequency: 'once',
    },
  },
  {
    label: 'Debug a bug across the codebase',
    answers: {
      work: 'build',
      volume: 'corpus',
      stakes: 'internal',
      detect: 'review',
      frequency: 'once',
    },
  },
];

/**
 * One unit for the whole comparison column. Mixing cents and dollars across
 * four rows makes a 10x gap look like a rounding difference.
 */
function lowerFirst(s: string): string {
  return s.charAt(0).toLowerCase() + s.slice(1);
}

function moneyScale(peak: number): (n: number) => string {
  if (peak < 0.1) return n => `${(n * 100).toFixed(2)}¢`;
  if (peak < 1) return n => `$${n.toFixed(3)}`;
  return n => `$${n.toFixed(2)}`;
}

export function ModelRightSizer() {
  const [answers, setAnswers] = useState<Answers>({});
  const [step, setStep] = useState(0);

  const result = useMemo(() => sizeIt(answers), [answers]);
  const question = SIZER_QUESTIONS[step];
  const answeredCount = SIZER_QUESTIONS.filter(q => answers[q.id]).length;
  const isComplete = result !== null;

  const choose = (id: QuestionId, value: string) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
    if (step < SIZER_QUESTIONS.length - 1) {
      setStep(s => s + 1);
    }
  };

  const reset = () => {
    setAnswers({});
    setStep(0);
  };

  const loadScenario = (scenario: Answers) => {
    setAnswers(scenario);
    setStep(SIZER_QUESTIONS.length - 1);
  };

  /* Cost of this exact task on every rung of the ladder, for the comparison bars. */
  const ladder = useMemo(() => {
    if (!result) return [];
    const rows = CLAUDE_MODELS.map(model => {
      const fits = fitsContext(model, result.shape);
      const effort = model.hasEffortDial ? result.effort : getEffort('low');
      return {
        model,
        fits,
        cost: fits ? estimateCost(model, effort, result.shape) : 0,
        isPick: model.id === result.model.id,
      };
    });
    const peak = Math.max(...rows.map(r => r.cost));
    const format = moneyScale(peak);
    return rows.map(r => ({
      ...r,
      pct: peak > 0 ? (r.cost / peak) * 100 : 0,
      display: format(r.cost),
    }));
  }, [result]);

  return (
    <div>
      {/* Progress */}
      <div className="flex items-center gap-2 mb-4">
        {SIZER_QUESTIONS.map((q, i) => {
          const done = Boolean(answers[q.id]);
          const active = i === step;
          return (
            <button
              key={q.id}
              onClick={() => setStep(i)}
              aria-label={`Question ${i + 1}: ${q.question}`}
              className="flex-1 h-1.5 rounded-full transition-all"
              style={{
                background: done
                  ? 'var(--cw-primary)'
                  : active
                    ? 'var(--cw-ink-muted)'
                    : 'var(--cw-ink-10)',
                opacity: active && !done ? 0.7 : 1,
              }}
            />
          );
        })}
        <span
          className="text-xs font-semibold tabular-nums ml-1"
          style={{ color: 'var(--cw-ink-muted)' }}
        >
          {answeredCount}/{SIZER_QUESTIONS.length}
        </span>
      </div>

      {/* Question card */}
      <div
        className="rounded-2xl p-6 md:p-8 mb-6"
        style={{ background: 'var(--cw-surface)', border: '1px solid var(--cw-border)' }}
      >
        <div className="flex items-start justify-between gap-4 mb-1">
          <h3 className="text-xl font-bold" style={{ color: 'var(--cw-ink)' }}>
            {question.question}
          </h3>
          <span
            className="text-xs font-semibold whitespace-nowrap mt-1"
            style={{ color: 'var(--cw-ink-muted)' }}
          >
            {step + 1} of {SIZER_QUESTIONS.length}
          </span>
        </div>
        <p className="text-sm mb-5" style={{ color: 'var(--cw-ink-muted)' }}>
          {question.hint}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {question.options.map(option => {
            const selected = answers[question.id] === option.value;
            return (
              <button
                key={option.value}
                onClick={() => choose(question.id, option.value)}
                className="text-left p-4 rounded-xl transition-all"
                style={{
                  background: selected ? 'var(--cw-primary-light)' : 'var(--cw-bg)',
                  border: `1px solid ${selected ? 'var(--cw-primary)' : 'var(--cw-border)'}`,
                }}
              >
                <div className="flex items-start gap-2">
                  <div
                    className="w-4 h-4 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center"
                    style={{
                      border: `1.5px solid ${selected ? 'var(--cw-primary)' : 'var(--cw-ink-muted)'}`,
                      background: selected ? 'var(--cw-primary)' : 'transparent',
                    }}
                  >
                    {selected && <Check size={10} strokeWidth={3} color="#fff" />}
                  </div>
                  <div>
                    <p
                      className="text-sm font-semibold mb-0.5"
                      style={{ color: selected ? 'var(--cw-primary)' : 'var(--cw-ink)' }}
                    >
                      {option.label}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--cw-ink-muted)' }}>
                      {option.detail}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between mt-5">
          <button
            onClick={() => setStep(s => Math.max(0, s - 1))}
            disabled={step === 0}
            className="inline-flex items-center gap-2 text-sm font-semibold disabled:opacity-30"
            style={{ color: 'var(--cw-ink-secondary)' }}
          >
            <ArrowLeft size={14} /> Back
          </button>
          <div className="flex items-center gap-4">
            {answeredCount > 0 && (
              <button
                onClick={reset}
                className="inline-flex items-center gap-1.5 text-xs font-semibold"
                style={{ color: 'var(--cw-ink-muted)' }}
              >
                <RotateCcw size={12} /> Start over
              </button>
            )}
            <button
              onClick={() => setStep(s => Math.min(SIZER_QUESTIONS.length - 1, s + 1))}
              disabled={step === SIZER_QUESTIONS.length - 1}
              className="inline-flex items-center gap-2 text-sm font-semibold disabled:opacity-30"
              style={{ color: 'var(--cw-ink-secondary)' }}
            >
              Next <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Scenarios */}
      {!isComplete && (
        <div className="flex flex-wrap gap-2 mb-6">
          <p className="text-xs w-full mb-1" style={{ color: 'var(--cw-ink-muted)' }}>
            Or load a real one:
          </p>
          {SCENARIOS.map(scenario => (
            <button
              key={scenario.label}
              onClick={() => loadScenario(scenario.answers)}
              className="text-xs px-3 py-1.5 rounded-full transition-all hover:opacity-80"
              style={{
                background: 'var(--cw-surface)',
                border: '1px solid var(--cw-border)',
                color: 'var(--cw-ink-muted)',
              }}
            >
              {scenario.label}
            </button>
          ))}
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="space-y-4">
          <div
            className="rounded-2xl p-6 md:p-8 relative overflow-hidden"
            style={{
              background: 'var(--cw-surface)',
              border: `1px solid ${result.model.color}`,
            }}
          >
            <div
              className="absolute top-0 left-0 w-full h-1"
              style={{ background: result.model.color }}
            />

            <p
              className="text-xs uppercase font-semibold tracking-widest mb-2"
              style={{ color: 'var(--cw-ink-muted)', letterSpacing: '2px' }}
            >
              Right-sized for this job
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <h3 className="text-2xl font-extrabold" style={{ color: result.model.color }}>
                {result.model.name}
              </h3>
              {result.effortApplies ? (
                <span
                  className="inline-flex items-center gap-1.5 text-sm px-3 py-1 rounded-full font-mono font-semibold"
                  style={{
                    background: 'var(--cw-primary-light)',
                    color: 'var(--cw-primary)',
                  }}
                >
                  <Gauge size={13} /> effort: {result.effort.name}
                </span>
              ) : (
                <span
                  className="text-sm px-3 py-1 rounded-full font-semibold"
                  style={{ background: 'var(--cw-bg)', color: 'var(--cw-ink-muted)' }}
                >
                  no effort dial
                </span>
              )}
            </div>

            <p className="text-base mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
              {result.model.summary}{' '}
              {result.effortApplies
                ? `At ${result.effort.name} effort: ${lowerFirst(result.effort.what)}`
                : result.model.notes}
            </p>

            {/* Cost comparison */}
            <div
              className="rounded-xl p-5"
              style={{ background: 'var(--cw-bg)', border: '1px solid var(--cw-border)' }}
            >
              <div className="flex items-baseline justify-between mb-3">
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--cw-ink-muted)' }}>
                  Cost of one run, same task, every rung
                </p>
                <p className="text-xs" style={{ color: 'var(--cw-ink-muted)' }}>
                  {result.shape.inputTokens.toLocaleString()} in / {result.shape.outputTokens.toLocaleString()} out
                </p>
              </div>

              <div className="space-y-2">
                {ladder.map(row => (
                  <div key={row.model.id}>
                    <div className="flex items-baseline justify-between gap-3 mb-1">
                      <span
                        className="text-xs font-semibold"
                        style={{
                          color: row.isPick ? row.model.color : 'var(--cw-ink-muted)',
                          fontWeight: row.isPick ? 700 : 600,
                        }}
                      >
                        {row.model.name.replace('Claude ', '')}
                        {row.isPick && (
                          <span className="ml-2 font-normal" style={{ color: 'var(--cw-ink-muted)' }}>
                            your pick
                          </span>
                        )}
                      </span>
                      <span
                        className="text-xs font-mono tabular-nums flex-shrink-0"
                        style={{
                          color: row.isPick ? 'var(--cw-ink)' : 'var(--cw-ink-muted)',
                          fontWeight: row.isPick ? 700 : 400,
                        }}
                      >
                        {row.fits ? row.display : 'will not fit'}
                      </span>
                    </div>
                    <div className="h-2.5 rounded-full overflow-hidden" style={{ background: 'var(--cw-ink-10)' }}>
                      {row.fits && (
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${Math.max(row.pct, 1.5)}%`,
                            background: row.model.color,
                            opacity: row.isPick ? 1 : 0.4,
                          }}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-[11px] mt-3" style={{ color: 'var(--cw-ink-muted)' }}>
                Every bar runs at your recommended effort, so you are comparing models, not dials.
                List API rates; illustrative thinking-token estimates, not a billing statement.
              </p>
            </div>

            {result.overbuyWarning && (
              <div
                className="flex items-start gap-3 mt-4 p-4 rounded-xl"
                style={{ background: 'rgba(255, 240, 238, 0.7)', border: '1px solid rgba(217, 85, 80, 0.15)' }}
              >
                <TriangleAlert size={16} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--cw-warning)' }} />
                <p className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
                  {result.overbuyWarning}
                </p>
              </div>
            )}

            {result.contextNote && (
              <p className="text-sm mt-4 pl-4" style={{ color: 'var(--cw-ink-muted)', borderLeft: '3px solid var(--cw-info)' }}>
                {result.contextNote}
              </p>
            )}

            {result.fableNote && (
              <p className="text-sm mt-4 pl-4" style={{ color: 'var(--cw-ink-secondary)', borderLeft: '3px solid #B45309' }}>
                {result.fableNote}
              </p>
            )}
          </div>

          {/* Reasoning trace */}
          <div
            className="rounded-2xl p-6 md:p-8"
            style={{ background: 'var(--cw-surface)', border: '1px solid var(--cw-border)' }}
          >
            <h4 className="text-base font-bold mb-1" style={{ color: 'var(--cw-ink)' }}>
              Why it landed there
            </h4>
            <p className="text-sm mb-4" style={{ color: 'var(--cw-ink-muted)' }}>
              Each answer either pushed you up the ladder or pulled you back down. That reasoning is
              the part worth keeping, so that next time you do not need the tool.
            </p>

            <div className="space-y-3">
              {result.trace.map((line, i) => {
                const tone =
                  line.direction === 'up'
                    ? { icon: TrendingUp, color: 'var(--cw-warning)', word: 'stepped up' }
                    : line.direction === 'down'
                      ? { icon: TrendingDown, color: 'var(--cw-success)', word: 'stepped down' }
                      : { icon: Minus, color: 'var(--cw-ink-muted)', word: 'held steady' };
                const Icon = tone.icon;
                return (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: 'var(--cw-bg)' }}
                    >
                      <Icon size={13} style={{ color: tone.color }} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: 'var(--cw-ink)' }}>
                        {line.answer}
                        <span className="font-normal ml-2" style={{ color: tone.color }}>
                          {tone.word}
                        </span>
                      </p>
                      <p className="text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
                        {line.because}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              className="mt-5 pt-5 flex flex-wrap items-center gap-3"
              style={{ borderTop: '1px solid var(--cw-border)' }}
            >
              <button
                onClick={reset}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full"
                style={{ background: 'var(--cw-bg)', color: 'var(--cw-ink-secondary)' }}
              >
                <RotateCcw size={12} /> Size another task
              </button>
              {SCENARIOS.map(scenario => (
                <button
                  key={scenario.label}
                  onClick={() => loadScenario(scenario.answers)}
                  className="text-xs px-3 py-1.5 rounded-full transition-all hover:opacity-80"
                  style={{
                    background: 'transparent',
                    border: '1px solid var(--cw-border)',
                    color: 'var(--cw-ink-muted)',
                  }}
                >
                  {scenario.label}
                </button>
              ))}
            </div>
          </div>

          {/* How to actually set it */}
          <div
            className="rounded-2xl p-6"
            style={{ background: 'var(--cw-primary-005)', border: '1px solid var(--cw-border)' }}
          >
            <h4 className="text-sm font-bold mb-3" style={{ color: 'var(--cw-ink)' }}>
              Setting it
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-semibold mb-1" style={{ color: 'var(--cw-ink)' }}>Claude Code</p>
                <p style={{ color: 'var(--cw-ink-secondary)' }}>
                  <code
                    className="px-1.5 py-0.5 rounded text-xs"
                    style={{ background: 'var(--cw-primary-light)', color: 'var(--cw-primary)' }}
                  >
                    /model
                  </code>{' '}
                  to switch. Effort lives here too.
                </p>
              </div>
              <div>
                <p className="font-semibold mb-1" style={{ color: 'var(--cw-ink)' }}>Claude chat</p>
                <p style={{ color: 'var(--cw-ink-secondary)' }}>The model dropdown at the top of the composer.</p>
              </div>
              <div>
                <p className="font-semibold mb-1" style={{ color: 'var(--cw-ink)' }}>Cowork</p>
                <p style={{ color: 'var(--cw-ink-secondary)' }}>The same model selector.</p>
              </div>
            </div>
            {result.effortApplies && (
              <p className="text-xs mt-4" style={{ color: 'var(--cw-ink-muted)' }}>
                Models work everywhere. The effort dial is a Claude Code control, so outside Claude
                Code, treat{' '}
                <strong style={{ color: 'var(--cw-ink-secondary)' }}>{result.effort.name}</strong> as
                a signal of how much thinking to ask for in your prompt.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Unanswered nudge */}
      {!isComplete && answeredCount > 0 && (
        <p className="text-sm text-center" style={{ color: 'var(--cw-ink-muted)' }}>
          {SIZER_QUESTIONS.length - answeredCount} question
          {SIZER_QUESTIONS.length - answeredCount === 1 ? '' : 's'} to go.
        </p>
      )}

      {/* Effort reference, kept close to the tool */}
      {isComplete && result.effortApplies && (
        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--cw-ink-muted)' }}>
            Where {result.effort.name} sits
          </p>
          <div className="flex gap-1.5">
            {EFFORT_LEVELS.map(level => {
              const active = level.id === result.effort.id;
              return (
                <div
                  key={level.id}
                  className="flex-1 py-2 px-1 rounded-lg text-center transition-all"
                  style={{
                    background: active ? level.color : 'var(--cw-surface)',
                    border: `1px solid ${active ? level.color : 'var(--cw-border)'}`,
                  }}
                >
                  <span
                    className="text-xs font-mono font-semibold"
                    style={{ color: active ? '#fff' : 'var(--cw-ink-muted)' }}
                  >
                    {level.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Static reference so the page is useful before you answer anything */}
      {!isComplete && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-2">
          {CLAUDE_MODELS.map(model => (
            <div
              key={model.id}
              className="p-4 rounded-xl"
              style={{ background: 'var(--cw-surface)', border: '1px solid var(--cw-border)' }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-2 h-2 rounded-full" style={{ background: model.color }} />
                <span className="text-xs font-bold" style={{ color: 'var(--cw-ink)' }}>
                  {model.name.replace('Claude ', '')}
                </span>
                <span className="text-xs font-mono ml-auto" style={{ color: model.color }}>
                  {model.priceTier}
                </span>
              </div>
              <p className="text-xs" style={{ color: 'var(--cw-ink-muted)' }}>
                {getModel(model.id).label}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

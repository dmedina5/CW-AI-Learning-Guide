'use client';

import { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react';

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface QuizBlockProps {
  title: string;
  questions: QuizQuestion[];
}

export function QuizBlock({ title, questions }: QuizBlockProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [completed, setCompleted] = useState(false);

  const question = questions[currentQ];

  const handleSelect = (index: number) => {
    if (answered) return;
    setSelected(index);
    setAnswered(true);
    if (index === question.correctIndex) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(q => q + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setAnswered(false);
    setCompleted(false);
  };

  if (completed) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div
        className="rounded-2xl p-8 my-6"
        style={{ background: 'var(--cw-surface)', border: '1px solid var(--cw-border)' }}
      >
        <h3 className="text-lg font-bold mb-4">{title} — Results</h3>
        <div className="text-center py-6">
          <div
            className="text-5xl font-extrabold mb-2"
            style={{ color: percentage >= 70 ? 'var(--cw-success)' : 'var(--cw-warning)' }}
          >
            {percentage}%
          </div>
          <p className="text-base mb-1" style={{ color: 'var(--cw-ink-secondary)' }}>
            {score} of {questions.length} correct
          </p>
          <p className="text-sm" style={{ color: 'var(--cw-ink-muted)' }}>
            {percentage >= 70 ? 'Great job! You\'ve got a solid understanding.' : 'Review the material and try again!'}
          </p>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 mx-auto px-5 py-2.5 rounded-full text-sm font-semibold transition-all"
          style={{ background: 'var(--cw-primary)', color: '#fff' }}
        >
          <RotateCcw size={14} /> Try Again
        </button>
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl p-8 my-6"
      style={{ background: 'var(--cw-surface)', border: '1px solid var(--cw-border)' }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <span className="text-xs font-medium" style={{ color: 'var(--cw-ink-muted)' }}>
          {currentQ + 1} / {questions.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1 rounded-full mb-6" style={{ background: 'var(--cw-border)' }}>
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${((currentQ + (answered ? 1 : 0)) / questions.length) * 100}%`,
            background: 'var(--cw-primary)',
          }}
        />
      </div>

      <p className="text-base font-medium mb-5" style={{ color: 'var(--cw-ink)' }}>
        {question.question}
      </p>

      <div className="space-y-2.5">
        {question.options.map((option, i) => {
          let bgColor = 'rgba(255,255,255,0.5)';
          let borderColor = 'var(--cw-border)';
          let icon = null;

          if (answered) {
            if (i === question.correctIndex) {
              bgColor = 'rgba(58, 158, 110, 0.1)';
              borderColor = 'var(--cw-success)';
              icon = <CheckCircle2 size={18} style={{ color: 'var(--cw-success)' }} />;
            } else if (i === selected && i !== question.correctIndex) {
              bgColor = 'rgba(217, 85, 80, 0.1)';
              borderColor = 'var(--cw-warning)';
              icon = <XCircle size={18} style={{ color: 'var(--cw-warning)' }} />;
            }
          } else if (i === selected) {
            borderColor = 'var(--cw-primary)';
            bgColor = 'var(--cw-primary-light)';
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-left transition-all"
              style={{ background: bgColor, border: `1px solid ${borderColor}` }}
              disabled={answered}
            >
              <span className="flex-1" style={{ color: 'var(--cw-ink)' }}>{option}</span>
              {icon}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {answered && (
        <div
          className="mt-4 p-4 rounded-xl text-sm"
          style={{
            background: selected === question.correctIndex
              ? 'rgba(58,158,110,0.06)'
              : 'rgba(217,85,80,0.06)',
            border: `1px solid ${selected === question.correctIndex
              ? 'rgba(58,158,110,0.15)'
              : 'rgba(217,85,80,0.15)'
            }`,
          }}
        >
          {question.explanation}
        </div>
      )}

      {/* Next button */}
      {answered && (
        <button
          onClick={handleNext}
          className="mt-4 px-5 py-2.5 rounded-full text-sm font-semibold transition-all"
          style={{ background: 'var(--cw-primary)', color: '#fff' }}
        >
          {currentQ < questions.length - 1 ? 'Next Question →' : 'See Results'}
        </button>
      )}
    </div>
  );
}

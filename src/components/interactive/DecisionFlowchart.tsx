'use client';

import { useState } from 'react';

interface FlowNode {
  id: string;
  question?: string;
  answer?: string;
  yes?: string;
  no?: string;
}

const nodes: Record<string, FlowNode> = {
  start: {
    id: 'start',
    question: 'Is your task a simple, linear chain where each step builds on the last?',
    yes: 'p1',
    no: 'q2',
  },
  q2: {
    id: 'q2',
    question: 'Do you need multiple independent tasks done at the same time?',
    yes: 'q3',
    no: 'p1',
  },
  q3: {
    id: 'q3',
    question: 'Do you want to coordinate them yourself?',
    yes: 'p2',
    no: 'q4',
  },
  q4: {
    id: 'q4',
    question: 'Do tasks require specialists that need awareness of each other\u2019s work in real time?',
    yes: 'p4',
    no: 'p3',
  },
  p1: {
    id: 'p1',
    answer: 'Pattern 1: Sequential Flow \u2014 One session, one task at a time. Keep it simple.',
  },
  p2: {
    id: 'p2',
    answer: 'Pattern 2: Operator \u2014 Open multiple terminals with claude --w. You orchestrate.',
  },
  p3: {
    id: 'p3',
    answer: 'Pattern 3: Split & Merge \u2014 Let Claude manage sub-agents automatically.',
  },
  p4: {
    id: 'p4',
    answer: 'Pattern 4: Agent Teams \u2014 Team Lead + Teammates with a shared task list. (Experimental, high token cost.)',
  },
};

export function DecisionFlowchart() {
  const [currentNode, setCurrentNode] = useState('start');
  const [path, setPath] = useState<string[]>(['start']);

  const node = nodes[currentNode];

  const handleChoice = (nextId: string) => {
    setCurrentNode(nextId);
    setPath((prev) => [...prev, nextId]);
  };

  const handleReset = () => {
    setCurrentNode('start');
    setPath(['start']);
  };

  const isAnswer = !!node.answer;

  const patternColors: Record<string, string> = {
    p1: '#3A9E6E',
    p2: '#4A6FA5',
    p3: '#6B2D8B',
    p4: '#D95550',
  };

  return (
    <div className="my-6">
      <div
        className="glass-card p-8"
        style={{
          borderLeft: isAnswer ? `3px solid ${patternColors[currentNode] || 'var(--cw-primary)'}` : undefined,
        }}
      >
        {/* Breadcrumb */}
        <div className="flex items-center gap-1 mb-6 flex-wrap">
          {path.map((nodeId, i) => {
            const n = nodes[nodeId];
            const isLast = i === path.length - 1;
            return (
              <span key={i} className="flex items-center gap-1">
                {i > 0 && (
                  <span className="text-xs mx-1" style={{ color: 'var(--cw-ink-muted)' }}>&rarr;</span>
                )}
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${isLast ? '' : 'cursor-pointer'}`}
                  style={{
                    background: n.answer
                      ? patternColors[nodeId] || 'var(--cw-primary)'
                      : isLast
                        ? 'var(--cw-primary-light)'
                        : 'rgba(0,0,0,0.04)',
                    color: n.answer ? '#fff' : isLast ? 'var(--cw-primary)' : 'var(--cw-ink-muted)',
                  }}
                  onClick={() => {
                    if (!isLast) {
                      setCurrentNode(nodeId);
                      setPath(path.slice(0, i + 1));
                    }
                  }}
                >
                  {n.answer ? n.id.toUpperCase() : `Q${i + 1}`}
                </span>
              </span>
            );
          })}
        </div>

        {/* Question or Answer */}
        {isAnswer ? (
          <div>
            <div
              className="inline-block text-xs font-bold uppercase tracking-widest mb-3 px-3 py-1 rounded-full"
              style={{
                background: patternColors[currentNode],
                color: '#fff',
              }}
            >
              Recommendation
            </div>
            <p className="text-lg font-semibold mb-4" style={{ color: 'var(--cw-ink)', maxWidth: '100%' }}>
              {node.answer}
            </p>
            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={handleReset}
                className="pill-btn text-xs"
              >
                Start Over
              </button>
              <span className="text-xs" style={{ color: 'var(--cw-ink-muted)' }}>
                Need full autonomy? Consider Pattern 5: Headless (claude -p)
              </span>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-lg font-semibold mb-6" style={{ color: 'var(--cw-ink)', maxWidth: '100%' }}>
              {node.question}
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleChoice(node.yes!)}
                className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all"
                style={{ background: 'var(--cw-success)', color: '#fff' }}
              >
                Yes
              </button>
              <button
                onClick={() => handleChoice(node.no!)}
                className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all"
                style={{ background: 'var(--cw-ink)', color: '#fff' }}
              >
                No
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import { type ReactNode } from 'react';

interface Step {
  title: string;
  description: ReactNode;
}

interface StepListProps {
  steps: Step[];
  className?: string;
}

export function StepList({ steps, className = '' }: StepListProps) {
  return (
    <div className={`flex flex-col gap-3 max-w-3xl ${className}`}>
      {steps.map((step, index) => (
        <div
          key={index}
          className="flex items-center gap-6 p-6 rounded-2xl transition-colors"
          style={{
            background: 'var(--cw-surface)',
            border: '1px solid var(--cw-border)',
          }}
        >
          <span
            className="text-sm font-bold tracking-widest flex-shrink-0 w-8"
            style={{ color: 'var(--cw-primary)', letterSpacing: '2px' }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <div>
            <h3 className="text-[17px] font-semibold mb-1" style={{ color: 'var(--cw-ink)' }}>
              {step.title}
            </h3>
            <p className="text-[15px] leading-relaxed" style={{ color: 'var(--cw-ink-muted)' }}>
              {step.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

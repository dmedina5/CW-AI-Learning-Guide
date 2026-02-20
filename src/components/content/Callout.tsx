import { type ReactNode } from 'react';

type CalloutVariant = 'purple' | 'coral' | 'sage' | 'blue' | 'warning';

interface CalloutProps {
  children: ReactNode;
  variant?: CalloutVariant;
  className?: string;
}

const variantStyles: Record<CalloutVariant, { barColor: string; bgStyle?: string }> = {
  purple: { barColor: 'var(--cw-primary)' },
  coral: { barColor: 'var(--cw-warning)' },
  sage: { barColor: 'var(--cw-success)' },
  blue: { barColor: 'var(--cw-info)' },
  warning: {
    barColor: 'var(--cw-warning)',
    bgStyle: 'rgba(255, 240, 238, 0.7)',
  },
};

export function Callout({ children, variant = 'purple', className = '' }: CalloutProps) {
  const style = variantStyles[variant];

  return (
    <div
      className={`flex items-start gap-4 p-6 rounded-xl max-w-3xl ${className}`}
      style={{
        background: style.bgStyle || 'var(--cw-surface)',
        border: style.bgStyle ? `1px solid rgba(217, 85, 80, 0.1)` : '1px solid var(--cw-border)',
      }}
    >
      <div
        className="w-[3px] flex-shrink-0 rounded-sm self-stretch"
        style={{ background: style.barColor }}
      />
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}

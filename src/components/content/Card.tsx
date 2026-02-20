import { type ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  number?: string;
}

export function Card({ children, className = '', hover = true, number }: CardProps) {
  return (
    <div
      className={`glass-card p-8 ${hover ? 'cursor-default' : ''} ${className}`}
    >
      {number && (
        <div
          className="text-xs font-bold tracking-widest mb-4"
          style={{ color: 'var(--cw-primary)', letterSpacing: '2px' }}
        >
          {number}
        </div>
      )}
      {children}
    </div>
  );
}

interface CardGridProps {
  children: ReactNode;
  columns?: 2 | 3 | 4;
  className?: string;
}

export function CardGrid({ children, columns = 3, className = '' }: CardGridProps) {
  const colClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`grid ${colClasses[columns]} gap-4 ${className}`}>
      {children}
    </div>
  );
}

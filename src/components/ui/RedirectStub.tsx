'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type RedirectStubProps = {
  to: string;
  label?: string;
};

export default function RedirectStub({ to, label }: RedirectStubProps) {
  const router = useRouter();

  useEffect(() => {
    router.replace(to);
  }, [router, to]);

  return (
    <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>This page moved</h1>
      <p style={{ marginBottom: '1.5rem', color: 'var(--cw-ink-secondary)' }}>
        The Vibe Coding section was renamed to{' '}
        <strong>Road to Agentic Engineering</strong>.
      </p>
      <p>
        <Link
          href={to}
          style={{
            color: 'var(--cw-primary)',
            textDecoration: 'underline',
            fontWeight: 600,
          }}
        >
          Continue to {label ?? to}
        </Link>
      </p>
      <p
        style={{
          marginTop: '1rem',
          fontSize: '0.875rem',
          color: 'var(--cw-ink-muted)',
        }}
      >
        Redirecting automatically&hellip;
      </p>
    </div>
  );
}

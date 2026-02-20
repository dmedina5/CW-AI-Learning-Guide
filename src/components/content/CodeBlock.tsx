'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export function CodeBlock({ code, language, title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = code;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="code-panel my-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          {title && (
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--cw-ink-muted)' }}>
              {title}
            </span>
          )}
          {language && (
            <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: 'rgba(107,45,139,0.2)', color: 'var(--cw-primary)' }}>
              {language}
            </span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs transition-colors"
          style={{
            color: copied ? 'var(--cw-success)' : 'var(--cw-ink-muted)',
            background: 'rgba(255,255,255,0.08)',
          }}
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap" style={{ color: '#d4d4d8' }}>
        <code>{code}</code>
      </pre>
    </div>
  );
}

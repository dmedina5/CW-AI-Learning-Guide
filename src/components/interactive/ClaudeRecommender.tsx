'use client';

import { useState } from 'react';
import { Send, Sparkles, ArrowRight } from 'lucide-react';
import { getRecommendation, CLAUDE_PRODUCTS, type RecommendationResult } from '@/lib/claude-products';
import { Card } from '@/components/content/Card';

export function ClaudeRecommender() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<RecommendationResult | null>(null);
  const [validationMsg, setValidationMsg] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = () => {
    setValidationMsg('');
    setHasSubmitted(true);

    const trimmed = input.trim();
    if (!trimmed) {
      setValidationMsg('Please describe what you\'d like to accomplish so we can recommend the right tool.');
      setResult(null);
      return;
    }
    if (trimmed.split(/\s+/).length < 2) {
      setValidationMsg('Tell us a bit more about your task so we can make a better recommendation.');
      setResult(null);
      return;
    }

    const recommendation = getRecommendation(trimmed);
    setResult(recommendation);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const confidenceLabel = result?.confidence === 'strong' ? 'Strong Match' : 'General Recommendation';
  const confidenceColor = result?.confidence === 'strong' ? 'var(--cw-success)' : 'var(--cw-info)';

  return (
    <div>
      {/* Input Section */}
      <Card className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={20} style={{ color: 'var(--cw-primary)' }} />
          <h3 className="text-lg font-semibold" style={{ color: 'var(--cw-ink)' }}>
            What do you want to use Claude for?
          </h3>
        </div>
        <p className="text-sm mb-4" style={{ color: 'var(--cw-ink-muted)' }}>
          Describe your task or goal and we&apos;ll recommend the best Claude product for you.
        </p>

        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              if (hasSubmitted) {
                setValidationMsg('');
                setResult(null);
                setHasSubmitted(false);
              }
            }}
            onKeyDown={handleKeyDown}
            placeholder="e.g., &quot;I want to build a website&quot; or &quot;I write a weekly newsletter&quot;"
            className="flex-1 px-4 py-3 rounded-xl text-sm transition-all outline-none"
            style={{
              background: 'var(--cw-bg)',
              border: '1px solid var(--cw-border)',
              color: 'var(--cw-ink)',
            }}
          />
          <button
            onClick={handleSubmit}
            className="px-5 py-3 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 hover:opacity-90"
            style={{ background: 'var(--cw-primary)', color: '#fff' }}
          >
            <Send size={16} />
            Recommend
          </button>
        </div>

        {validationMsg && (
          <p className="mt-3 text-sm" style={{ color: 'var(--cw-warning)' }}>
            {validationMsg}
          </p>
        )}
      </Card>

      {/* Result Section */}
      {result && (
        <div className="space-y-4">
          <Card className="relative overflow-hidden">
            <div
              className="absolute top-0 left-0 w-1 h-full"
              style={{ background: confidenceColor }}
            />
            <div className="pl-4">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-xl font-bold" style={{ color: 'var(--cw-ink)' }}>
                  {result.product.name}
                </h3>
                <span
                  className="text-xs px-2.5 py-1 rounded-full font-semibold"
                  style={{
                    background: result.confidence === 'strong'
                      ? 'rgba(58,158,110,0.1)'
                      : 'rgba(74,111,165,0.1)',
                    color: confidenceColor,
                  }}
                >
                  {confidenceLabel}
                </span>
              </div>

              <p className="text-base mb-4" style={{ color: 'var(--cw-ink-secondary)' }}>
                {result.reasoning}
              </p>

              <div className="mb-4">
                <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--cw-ink)' }}>
                  Best for:
                </h4>
                <div className="space-y-1.5">
                  {result.product.bestFor.map((item, i) => (
                    <div key={i} className="flex items-baseline gap-2 text-sm" style={{ color: 'var(--cw-ink-secondary)' }}>
                      <ArrowRight size={12} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--cw-primary)' }} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg"
                style={{ background: 'var(--cw-bg)', color: 'var(--cw-ink-muted)' }}
              >
                <span><strong>Access:</strong> {result.product.access}</span>
                <span style={{ color: 'var(--cw-border)' }}>|</span>
                <span><strong>Setup:</strong> {result.product.setupTime}</span>
              </div>
            </div>
          </Card>

          {/* Alternatives */}
          {result.alternatives.length > 0 && (
            <div>
              <p className="text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: 'var(--cw-ink-muted)' }}>
                Also consider
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {result.alternatives.map((alt) => (
                  <div
                    key={alt.id}
                    className="p-4 rounded-xl text-sm"
                    style={{
                      background: 'var(--cw-surface)',
                      border: '1px solid var(--cw-border)',
                    }}
                  >
                    <h4 className="font-semibold mb-1" style={{ color: 'var(--cw-ink)' }}>
                      {alt.name}
                    </h4>
                    <p className="text-xs" style={{ color: 'var(--cw-ink-muted)' }}>
                      {alt.tagline}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* Example queries */}
      {!result && !validationMsg && (
        <div className="flex flex-wrap gap-2 mt-2">
          <p className="text-xs w-full mb-1" style={{ color: 'var(--cw-ink-muted)' }}>
            Try these examples:
          </p>
          {[
            'I want to build a website for my team',
            'I write a weekly newsletter for brokers',
            'I need to create spreadsheet analyses',
            'I want to debug code in our repo',
            'I need to draft a professional proposal',
          ].map((example) => (
            <button
              key={example}
              onClick={() => {
                setInput(example);
                setResult(null);
                setHasSubmitted(false);
                setValidationMsg('');
              }}
              className="text-xs px-3 py-1.5 rounded-full transition-all hover:opacity-80"
              style={{
                background: 'var(--cw-surface)',
                border: '1px solid var(--cw-border)',
                color: 'var(--cw-ink-muted)',
              }}
            >
              {example}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

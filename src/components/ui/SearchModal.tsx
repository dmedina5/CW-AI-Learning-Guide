'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { TIERS, type TierKey } from '@/lib/constants';

interface SearchResult {
  title: string;
  href: string;
  excerpt: string;
  tier: TierKey | null;
  section: string;
}

// Static search index (expanded at build time in a real implementation)
const SEARCH_INDEX: SearchResult[] = [
  { title: 'What is AI?', href: '/ai-basics', excerpt: 'AI is a prediction engine. It predicts what comes next.', tier: 'beginner', section: 'AI Basics' },
  { title: 'Context shapes prediction', href: '/ai-basics#context', excerpt: 'Your context is a lens that focuses AI predictions.', tier: 'beginner', section: 'AI Basics' },
  { title: 'Models & Inference', href: '/ai-basics#models', excerpt: 'A model is a giant accumulation of knowledge. Inference is how well it reasons.', tier: 'beginner', section: 'AI Basics' },
  { title: 'Strengths & Limitations', href: '/ai-basics#strengths', excerpt: 'Where AI shines and where it doesn\'t.', tier: 'beginner', section: 'AI Basics' },
  { title: 'Prompt Engineering Basics', href: '/prompt-engineering', excerpt: 'Be specific, define role, provide context, output format, set boundaries.', tier: 'beginner', section: 'Prompt Engineering' },
  { title: 'CRISP Framework', href: '/prompt-engineering#crisp', excerpt: 'Context, Role, Instruction, Specifics, Preferences.', tier: 'intermediate', section: 'Prompt Engineering' },
  { title: 'Prompting Techniques', href: '/prompt-engineering#techniques', excerpt: 'Zero-shot, few-shot, chain-of-thought, dual-pass.', tier: 'intermediate', section: 'Prompt Engineering' },
  { title: 'Reality Filter', href: '/prompt-engineering#reality-filter', excerpt: 'Confidence scoring and verification labels for reliable AI responses.', tier: 'intermediate', section: 'Prompt Engineering' },
  { title: 'PII Safety', href: '/prompt-engineering#pii', excerpt: 'What to never share with AI. Generalization technique.', tier: 'intermediate', section: 'Prompt Engineering' },
  { title: 'Prompt Builder', href: '/prompt-builder', excerpt: 'Interactive tool to build structured prompts using CRISP framework.', tier: 'intermediate', section: 'Tools' },
  { title: 'What is Vibe Coding?', href: '/vibe-coding', excerpt: 'Describe what you want in plain English and AI helps create it.', tier: 'beginner', section: 'Vibe Coding' },
  { title: 'Installation Guide', href: '/vibe-coding/installation', excerpt: 'Install Claude Code and Gemini CLI step by step.', tier: 'beginner', section: 'Vibe Coding' },
  { title: 'Fundamentals', href: '/vibe-coding/fundamentals', excerpt: 'Mental models, CLAUDE.md, permission system.', tier: 'intermediate', section: 'Vibe Coding' },
  { title: 'Workflows', href: '/vibe-coding/workflows', excerpt: 'Explore-Plan-Execute, Relay Race patterns.', tier: 'expert', section: 'Vibe Coding' },
  { title: 'Tips & Tricks', href: '/vibe-coding/tips', excerpt: 'Keyboard shortcuts, IDE integration, power-user techniques.', tier: 'expert', section: 'Vibe Coding' },
  { title: 'Cheatsheet', href: '/vibe-coding/cheatsheet', excerpt: 'Quick reference for Claude Code and Gemini CLI.', tier: 'expert', section: 'Vibe Coding' },
  { title: 'Agentic AI', href: '/agentic-ai', excerpt: 'What are agents, multi-agent orchestration, workflow tools.', tier: 'advanced', section: 'Agentic AI' },
  { title: 'Use Cases', href: '/use-cases', excerpt: 'CW-specific examples: submission analysis, broker comms, loss runs.', tier: 'expert', section: 'Use Cases' },
  { title: 'Resources & Glossary', href: '/resources', excerpt: 'Glossary of AI terms, links, NotebookLM.', tier: null, section: 'Resources' },
];

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Search logic
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const lower = query.toLowerCase();
    const filtered = SEARCH_INDEX.filter(
      item =>
        item.title.toLowerCase().includes(lower) ||
        item.excerpt.toLowerCase().includes(lower) ||
        item.section.toLowerCase().includes(lower)
    );
    setResults(filtered);
    setSelectedIndex(0);
  }, [query]);

  const navigateTo = useCallback((href: string) => {
    router.push(href);
    onClose();
  }, [router, onClose]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(i => Math.min(i + 1, results.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(i => Math.max(i - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (results[selectedIndex]) {
            navigateTo(results[selectedIndex].href);
          }
          break;
        case 'Escape':
          onClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, navigateTo, onClose]);

  if (!isOpen) return null;

  // Group results by section
  const grouped = results.reduce<Record<string, SearchResult[]>>((acc, result) => {
    const section = result.section;
    if (!acc[section]) acc[section] = [];
    acc[section].push(result);
    return acc;
  }, {});

  let flatIndex = 0;

  return (
    <div className="fixed inset-0 z-[100]" onClick={onClose}>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      <div className="relative flex justify-center pt-[15vh]">
        <div
          className="w-full max-w-xl mx-4 rounded-2xl overflow-hidden shadow-2xl"
          style={{ background: 'var(--cw-bg-warm)', border: '1px solid var(--cw-border)' }}
          onClick={e => e.stopPropagation()}
        >
          {/* Search input */}
          <div className="flex items-center gap-3 px-5 py-4" style={{ borderBottom: '1px solid var(--cw-border)' }}>
            <Search size={18} style={{ color: 'var(--cw-ink-muted)' }} />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search documentation..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-base"
              style={{ color: 'var(--cw-ink)' }}
            />
            <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/30">
              <X size={16} style={{ color: 'var(--cw-ink-muted)' }} />
            </button>
          </div>

          {/* Results */}
          {results.length > 0 && (
            <div className="max-h-80 overflow-y-auto p-2 custom-scrollbar">
              {Object.entries(grouped).map(([section, items]) => (
                <div key={section}>
                  <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--cw-ink-muted)' }}>
                    {section}
                  </div>
                  {items.map(result => {
                    const currentIndex = flatIndex++;
                    const isSelected = currentIndex === selectedIndex;
                    return (
                      <button
                        key={result.href}
                        onClick={() => navigateTo(result.href)}
                        className={`
                          w-full text-left px-4 py-3 rounded-xl flex items-start gap-3 transition-colors
                          ${isSelected ? 'bg-white/40' : 'hover:bg-white/20'}
                        `}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold" style={{ color: 'var(--cw-ink)' }}>
                              {result.title}
                            </span>
                            {result.tier && (
                              <span
                                className="text-[9px] px-1.5 rounded-full font-semibold uppercase"
                                style={{
                                  background: TIERS[result.tier].bgColor,
                                  color: TIERS[result.tier].color,
                                }}
                              >
                                {TIERS[result.tier].label}
                              </span>
                            )}
                          </div>
                          <p className="text-xs truncate mt-0.5" style={{ color: 'var(--cw-ink-muted)' }}>
                            {result.excerpt}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          )}

          {/* No results */}
          {query.trim() && results.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-sm" style={{ color: 'var(--cw-ink-muted)' }}>
                No results found for &ldquo;{query}&rdquo;
              </p>
            </div>
          )}

          {/* Empty state */}
          {!query.trim() && (
            <div className="p-6 text-center">
              <p className="text-xs" style={{ color: 'var(--cw-ink-muted)' }}>
                Type to search across all pages
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

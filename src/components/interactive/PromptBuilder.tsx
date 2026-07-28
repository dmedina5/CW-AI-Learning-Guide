'use client';

import { useState, useCallback } from 'react';
import { Copy, Check, RotateCcw } from 'lucide-react';
import { REALITY_FILTER_SHORT } from '@/lib/reality-filter';

type Mode = 'simple' | 'advanced';

const ROLES = [
  { value: '', label: 'No role — let the facts speak (recommended)' },
  { value: 'an experienced commercial auto insurance underwriter', label: 'Underwriter (Trucking Insurance)' },
  { value: 'a professional insurance communicator', label: 'Insurance Communicator' },
  { value: 'a senior data analyst with insurance expertise', label: 'Data Analyst (Insurance)' },
  { value: 'a commercial insurance coverage specialist', label: 'Coverage Specialist' },
  { value: 'a trucking insurance regulatory specialist', label: 'Regulatory Specialist' },
  { value: 'a claims specialist with commercial auto expertise', label: 'Claims Specialist' },
  { value: 'an experienced HR professional in the insurance industry', label: 'HR Professional' },
  { value: 'a supportive career coach', label: 'Career Coach' },
];

const FORMATS = [
  { value: 'a prioritized list with brief explanations', label: 'Prioritized List' },
  { value: 'bullet points', label: 'Bullet Points' },
  { value: 'a professional email draft', label: 'Email Draft' },
  { value: 'a step-by-step action plan', label: 'Step-by-Step Plan' },
  { value: 'a comparison table', label: 'Comparison Table' },
  { value: 'a detailed summary', label: 'Detailed Summary' },
  { value: 'a short 3-5 sentence summary', label: 'Short Summary' },
];

interface Example {
  ground: string;
  request: string;
  intent: string;
  proof: string;
}

const EXAMPLES: Record<string, Example> = {
  submission: {
    ground: "New business submission on a commercial trucking account. 18 power units, regional LTL on a 400-mile radius, 5 years in business, general freight plus some refrigerated. 3 claims in 36 months, including 1 large cargo claim. (Attach the submission itself if you have it.)",
    request: "Tell me what I should dig into before quoting this, and whether it looks worth pursuing. Rank by what would actually change the price, not by category.",
    intent: "I'm deciding whether to spend real time on it this week, so I care about what would kill the deal more than what's merely interesting.",
    proof: "Flag anything you're inferring rather than reading off the data.",
  },
  loss: {
    ground: "Loss runs for a trucking account up for renewal: 2 backing accidents in parking lots (minor), 1 rear-end collision on the highway (moderate BI), 1 cargo shortage claim, 1 weather-related accident.",
    request: "Tell me what these claims say about how this fleet is actually run, and whether I should be worried at renewal.",
    intent: "I have to defend the renewal number to the carrier, so I need the story behind the pattern — not a restatement of the claims.",
    proof: "If the mix points at a specific gap — training, supervision, equipment — say so, and be clear about which part is the data talking and which part is you reading into it.",
  },
  email: {
    ground: "Incomplete submission on a fleet account. Still missing: updated driver list with MVRs, current vehicle schedule, an explanation of the large cargo claim from last year, and safety program documentation.",
    request: "Draft the email asking the broker for what's missing.",
    intent: "This broker sends us good business and I don't want it to read as bureaucratic — I need the file complete without spending relationship capital.",
    proof: "Make it easy to action: the broker should be able to work straight down it and tick items off. Give them a reasonable deadline, and keep it short.",
  },
};

export function PromptBuilder() {
  const [mode, setMode] = useState<Mode>('simple');
  const [copied, setCopied] = useState(false);
  const [realityFilter, setRealityFilter] = useState(false);

  // Simple mode
  const [role, setRole] = useState(ROLES[0].value);
  const [task, setTask] = useState('');
  const [format, setFormat] = useState(FORMATS[0].value);

  // Advanced mode (GRIP)
  const [ground, setGround] = useState('');
  const [request, setRequest] = useState('');
  const [intent, setIntent] = useState('');
  const [proof, setProof] = useState('');

  const generatePrompt = useCallback(() => {
    let prompt = '';

    if (mode === 'simple') {
      const taskText = task.trim() || '[describe your task here]';
      // Role is optional now — a stated situation usually implies it.
      const roleLine = role ? `Act as ${role}.\n\n` : '';
      // Prose, not ALL-CAPS labels — same reason as the GRIP branch below.
      prompt = `${roleLine}${taskText}\n\nGive it to me as ${format}. Lead with what matters most, and flag anything you're inferring rather than reading from what I gave you.`;
    } else {
      // GRIP emits plain paragraphs. The ALL-CAPS section labels the old CRISP
      // builder produced were scaffolding the model doesn't need — and reading
      // them back teaches the wrong habit.
      const parts = [ground, request, intent, proof]
        .map(v => v.trim())
        .filter(Boolean);
      prompt = parts.length > 0 ? parts.join('\n\n') : 'Fill out the GRIP fields above...';
    }

    if (realityFilter && !prompt.includes('[describe your task here]') && !prompt.includes('Fill out the GRIP')) {
      prompt = `${REALITY_FILTER_SHORT}\n\n---\n\n${prompt}`;
    }

    return prompt;
  }, [mode, role, task, format, ground, request, intent, proof, realityFilter]);

  const handleCopy = async () => {
    const text = generatePrompt();
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setTask('');
    setRole(ROLES[0].value);
    setFormat(FORMATS[0].value);
    setGround('');
    setRequest('');
    setIntent('');
    setProof('');
    setRealityFilter(false);
  };

  const loadExample = (key: string) => {
    setMode('advanced');
    const ex = EXAMPLES[key];
    setGround(ex.ground);
    setRequest(ex.request);
    setIntent(ex.intent);
    setProof(ex.proof);
  };

  const inputClasses = "w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors border-2 focus:border-cw-purple";
  const inputStyle = { borderColor: 'var(--cw-primary-light)', background: '#fff' };

  return (
    <div className="glass-card overflow-hidden">
      {/* Header */}
      <div
        className="p-6 text-center text-white"
        style={{ background: 'linear-gradient(135deg, var(--cw-primary-dark), var(--cw-primary))' }}
      >
        <h2 className="text-xl font-bold text-white mb-2">The Prompt Perfector</h2>
        <p className="text-sm text-white/90 mb-4">Build powerful, structured prompts using the GRIP Framework</p>
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => setMode('simple')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${mode === 'simple' ? 'bg-white text-cw-purple' : 'bg-white/15 text-white border border-white/30'}`}
          >
            Simple Mode
          </button>
          <button
            onClick={() => setMode('advanced')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${mode === 'advanced' ? 'bg-white text-cw-purple' : 'bg-white/15 text-white border border-white/30'}`}
          >
            Advanced Mode
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Mode banner */}
        <div
          className="p-3 rounded-xl mb-6 text-sm"
          style={{ background: 'var(--cw-primary-light)', borderLeft: '4px solid var(--cw-primary)', color: 'var(--cw-primary-dark)' }}
        >
          <strong>{mode === 'simple' ? 'Simple Mode:' : 'Advanced Mode:'}</strong>{' '}
          {mode === 'simple'
            ? 'Quick prompt building for everyday tasks. Role is optional — the facts usually imply it.'
            : 'Full GRIP framework for complex tasks. Four plain paragraphs - no section labels needed in the prompt itself.'}
        </div>

        {/* Simple Mode */}
        {mode === 'simple' && (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-2">
                1. Who should the AI act as? <span className="font-normal" style={{ color: 'var(--cw-ink-muted)' }}>&mdash; optional on newer models</span>
              </label>
              <select value={role} onChange={e => setRole(e.target.value)} className={inputClasses} style={inputStyle}>
                {ROLES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">2. What do you need help with?</label>
              <input
                type="text"
                value={task}
                onChange={e => setTask(e.target.value)}
                placeholder="e.g., analyze risk factors, draft an email, summarize loss trends..."
                className={inputClasses}
                style={inputStyle}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">3. How do you want the output?</label>
              <select value={format} onChange={e => setFormat(e.target.value)} className={inputClasses} style={inputStyle}>
                {FORMATS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
              </select>
            </div>
          </div>
        )}

        {/* Advanced Mode */}
        {mode === 'advanced' && (
          <div className="space-y-5">
            {[
              { letter: 'G', label: 'Ground - the real material (highest-value field)', value: ground, setter: setGround, type: 'textarea' as const, placeholder: 'Attach the file in your chat, then note what it is - e.g. "Loss runs attached. 18 power units, 5 years in business, 3 claims in 36 months including 1 large cargo claim."' },
              { letter: 'R', label: 'Request - what decision do you need made?', value: request, setter: setRequest, type: 'input' as const, placeholder: 'Example: Tell me whether to pursue this account, and what would change your answer...' },
              { letter: 'I', label: 'Intent - why you need it, who it is for', value: intent, setter: setIntent, type: 'input' as const, placeholder: 'Example: This goes to the carrier Thursday, so I need to defend the number, not just state it...' },
              { letter: 'P', label: 'Proof - what to mark as sourced vs inferred', value: proof, setter: setProof, type: 'input' as const, placeholder: 'Example: Flag anything you are inferring rather than reading off the file...' },
            ].map(field => (
              <div key={field.letter}>
                <label className="block text-sm font-semibold mb-2">
                  <span className="inline-block px-2 py-0.5 rounded text-xs text-white mr-2" style={{ background: 'var(--cw-primary)' }}>
                    {field.letter}
                  </span>
                  {field.label}
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    value={field.value}
                    onChange={e => field.setter(e.target.value)}
                    placeholder={field.placeholder}
                    className={`${inputClasses} min-h-[80px] resize-y`}
                    style={inputStyle}
                  />
                ) : (
                  <input
                    type="text"
                    value={field.value}
                    onChange={e => field.setter(e.target.value)}
                    placeholder={field.placeholder}
                    className={inputClasses}
                    style={inputStyle}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Reality Filter Toggle */}
        <div
          className="flex items-center gap-3 mt-6 p-4 rounded-xl"
          style={{ background: '#FFF8F0', border: '1px solid #E8D4C0' }}
        >
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={realityFilter}
              onChange={e => setRealityFilter(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-cw-success transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
          </label>
          <span className="text-sm font-medium">
            <strong>Add Reality Filter</strong> — For anything that gets quoted, priced, or acted on. Makes Claude mark what it sourced, what it inferred, and what it doesn&apos;t know.
          </span>
        </div>

        {/* Output */}
        <div className="mt-6 rounded-xl p-5" style={{ background: 'var(--cw-primary-dark)', color: '#E8E0F0' }}>
          <span className="block font-semibold text-white mb-3">Your Optimized Prompt:</span>
          <pre
            className="text-sm leading-relaxed whitespace-pre-wrap p-4 rounded-lg overflow-y-auto max-h-[400px] font-mono"
            style={{ background: 'rgba(0,0,0,0.2)' }}
          >
            {generatePrompt()}
          </pre>
          <div className="flex gap-2 mt-3">
            <button
              onClick={handleCopy}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all"
              style={{ background: 'var(--cw-primary)', color: '#fff' }}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Copied!' : 'Copy to Clipboard'}
            </button>
            <button
              onClick={handleReset}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all"
              style={{ background: 'var(--cw-primary-light)', color: 'var(--cw-primary)' }}
            >
              <RotateCcw size={16} /> Reset
            </button>
          </div>
        </div>

        {/* Examples */}
        <div
          className="mt-6 p-5 rounded-xl"
          style={{ background: 'rgba(58,158,110,0.06)', border: '1px solid rgba(58,158,110,0.15)' }}
        >
          <h4 className="text-sm font-semibold mb-3" style={{ color: 'var(--cw-success)' }}>
            Quick Start Examples (Click to Load)
          </h4>
          <div className="space-y-2">
            {[
              { key: 'submission', label: 'Analyze a new trucking submission' },
              { key: 'loss', label: 'Review loss run patterns' },
              { key: 'email', label: 'Draft a broker communication' },
            ].map(ex => (
              <button
                key={ex.key}
                onClick={() => loadExample(ex.key)}
                className="block w-full text-left px-4 py-3 rounded-lg text-sm transition-colors"
                style={{ background: '#fff', border: '1px solid rgba(58,158,110,0.2)' }}
              >
                {ex.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

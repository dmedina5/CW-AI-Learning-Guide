'use client';

import { useState, useCallback } from 'react';
import { Copy, Check, RotateCcw } from 'lucide-react';

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
  context: string;
  role: string;
  instruction: string;
  specifics: string;
  preferences: string;
}

// Role is intentionally blank in every example — the situation already implies it.
const EXAMPLES: Record<string, Example> = {
  submission: {
    context: "I'm reviewing a new business submission for a commercial trucking insurance account.",
    role: "",
    instruction: "Tell me what I should dig into before quoting this, and whether it looks worth pursuing.",
    specifics: "18 power units. Regional LTL, 400-mile radius. 5 years in business. General freight plus some refrigerated. 3 claims in 36 months, including 1 large cargo claim.",
    preferences: "Rank by what would actually change the price, not by category. Flag anything you're inferring rather than reading off the data.",
  },
  loss: {
    context: "I have loss run data for a trucking account seeking renewal.",
    role: "",
    instruction: "Tell me what these claims say about how this fleet is actually run, and whether I should be worried at renewal.",
    specifics: "2 backing accidents in parking lots (minor), 1 rear-end collision on the highway (moderate BI), 1 cargo shortage claim, 1 weather-related accident.",
    preferences: "I care more about the pattern than the individual claims. If the mix points at a specific gap — training, supervision, equipment — say so and tell me what to ask the broker.",
  },
  email: {
    context: "I need to request additional information from a broker before providing a quote.",
    role: "",
    instruction: "Draft the email asking for what's missing.",
    specifics: "Updated driver list with MVRs, current vehicle schedule, an explanation of the large cargo claim from last year, safety program documentation.",
    preferences: "Make it easy to action — the broker should be able to work straight down it and tick items off. Give them a reasonable deadline. Keep it short.",
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

  // Advanced mode (CRISP)
  const [context, setContext] = useState('');
  const [roleAdv, setRoleAdv] = useState('');
  const [instruction, setInstruction] = useState('');
  const [specifics, setSpecifics] = useState('');
  const [preferences, setPreferences] = useState('');

  const generatePrompt = useCallback(() => {
    let prompt = '';

    if (mode === 'simple') {
      const taskText = task.trim() || '[describe your task here]';
      // Role is optional now — a stated situation usually implies it.
      const roleLine = role ? `Act as ${role}.\n\n` : '';
      prompt = `${roleLine}TASK: ${taskText}\n\nFORMAT: Give it to me as ${format}. Lead with what matters most, and flag anything you're inferring rather than reading from what I gave you.`;
    } else {
      const parts: string[] = [];
      if (context.trim()) parts.push(`CONTEXT: ${context.trim()}`);
      if (roleAdv.trim()) parts.push(`ROLE: ${roleAdv.trim()}`);
      if (instruction.trim()) parts.push(`TASK: ${instruction.trim()}`);
      if (specifics.trim()) parts.push(`SPECIFICS: ${specifics.trim()}`);
      if (preferences.trim()) parts.push(`FORMAT: ${preferences.trim()}`);
      prompt = parts.length > 0 ? parts.join('\n\n') : 'Fill out the CRISP framework fields above...';
    }

    if (realityFilter && !prompt.includes('[describe your task here]') && !prompt.includes('Fill out the CRISP')) {
      prompt = `REALITY FILTER DIRECTIVE:\n• Output your confidence score (0.0-1.0) on every response\n• If confidence is below 0.85, explain what information would increase it\n• Label unverified content: [Inference] [Speculation] [Unverified] [Pattern-Based]\n• Never present generated, inferred, or speculated content as fact\n• If uncertain, say "I cannot verify this" rather than guessing\n• Ask for clarification if information is missing\n\n---\n\n${prompt}`;
    }

    return prompt;
  }, [mode, role, task, format, context, roleAdv, instruction, specifics, preferences, realityFilter]);

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
    setContext('');
    setRoleAdv('');
    setInstruction('');
    setSpecifics('');
    setPreferences('');
    setRealityFilter(false);
  };

  const loadExample = (key: string) => {
    setMode('advanced');
    const ex = EXAMPLES[key];
    setContext(ex.context);
    setRoleAdv(ex.role);
    setInstruction(ex.instruction);
    setSpecifics(ex.specifics);
    setPreferences(ex.preferences);
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
        <p className="text-sm text-white/90 mb-4">Build powerful, structured prompts using the CRISP Framework</p>
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
            : 'Full CRISP framework for complex tasks. Spend your effort on Context and Specifics; skip Role unless it adds a lens the facts don\'t.'}
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
              { letter: 'C', label: 'Context - What\'s the background?', value: context, setter: setContext, type: 'textarea' as const, placeholder: 'Example: I\'m reviewing a commercial trucking submission for a 25-unit fleet...' },
              { letter: 'R', label: 'Role - optional, usually skip it', value: roleAdv, setter: setRoleAdv, type: 'input' as const, placeholder: 'Leave blank unless you need a lens the facts don\'t imply — e.g. "read this the way the broker will"' },
              { letter: 'I', label: 'Instruction - what decision do you need?', value: instruction, setter: setInstruction, type: 'input' as const, placeholder: 'Example: Tell me whether to pursue this account, and what would change your answer...' },
              { letter: 'S', label: 'Specifics - your real data (highest-value field)', value: specifics, setter: setSpecifics, type: 'textarea' as const, placeholder: 'Example: 18 power units, 5 years in business, 3 claims in 36 months including 1 large cargo claim...' },
              { letter: 'P', label: 'Preferences - the standard to hit, not a template', value: preferences, setter: setPreferences, type: 'input' as const, placeholder: 'Example: Lead with the recommendation, then the reasoning. Flag anything you\'re inferring...' },
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
            <strong>Add Reality Filter</strong> — For critical decisions, adds confidence scoring and verification labels
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

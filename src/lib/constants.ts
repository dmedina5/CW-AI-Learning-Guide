export const AUTH_BACKEND = 'https://coverwhale-auth.vercel.app';

export const TIERS = {
  beginner: {
    label: 'Beginner',
    sublabel: 'Foundations',
    color: '#3A9E6E',
    bgColor: 'rgba(58, 158, 110, 0.1)',
    description: 'Any employee, zero AI experience required',
  },
  intermediate: {
    label: 'Intermediate',
    sublabel: 'Core Skills',
    color: '#4A6FA5',
    bgColor: 'rgba(74, 111, 165, 0.1)',
    description: 'Employees who\'ve used AI a few times',
  },
  expert: {
    label: 'Expert',
    sublabel: 'Mastery',
    color: '#D95550',
    bgColor: 'rgba(217, 85, 80, 0.1)',
    description: 'Regular AI users ready for power-user techniques',
  },
  advanced: {
    label: 'Advanced',
    sublabel: 'The Frontier',
    color: '#6B2D8B',
    bgColor: 'rgba(107, 45, 139, 0.1)',
    description: 'Technical users, team leads, builders',
  },
} as const;

export type TierKey = keyof typeof TIERS;

export const NAV_ITEMS = [
  {
    label: 'Home',
    href: '/',
    icon: 'Home',
    tier: null,
  },
  {
    label: 'AI Basics',
    href: '/ai-basics',
    icon: 'Brain',
    tier: 'beginner' as TierKey,
    children: [
      { label: 'Overview', href: '/ai-basics', tier: 'beginner' as TierKey },
      { label: 'Core Concepts', href: '/ai-basics/core-concepts', tier: 'beginner' as TierKey },
      { label: 'How It Works', href: '/ai-basics/how-it-works', tier: 'beginner' as TierKey },
      { label: 'Innovation Flywheel', href: '/ai-basics/innovation', tier: 'beginner' as TierKey },
      { label: 'Models', href: '/ai-basics/models', tier: 'beginner' as TierKey },
      { label: 'Strengths & Limits', href: '/ai-basics/strengths', tier: 'beginner' as TierKey },
    ],
  },
  {
    label: 'Prompt Engineering',
    href: '/prompt-engineering',
    icon: 'MessageSquare',
    tier: 'beginner' as TierKey,
    children: [
      { label: 'The Basics', href: '/prompt-engineering', tier: 'beginner' as TierKey },
      { label: 'GRIP Framework', href: '/prompt-engineering#grip', tier: 'intermediate' as TierKey },
      { label: 'Techniques', href: '/prompt-engineering#techniques', tier: 'intermediate' as TierKey },
      { label: 'Reality Filter', href: '/prompt-engineering#reality-filter', tier: 'intermediate' as TierKey },
      { label: 'PII Safety', href: '/prompt-engineering#pii', tier: 'intermediate' as TierKey },
    ],
  },
  {
    label: 'Prompt Builder',
    href: '/prompt-builder',
    icon: 'Wand2',
    tier: 'intermediate' as TierKey,
  },
  {
    label: 'Context Engineering',
    href: '/context-engineering',
    icon: 'Layers',
    tier: 'intermediate' as TierKey,
    children: [
      { label: 'The Shift', href: '/context-engineering', tier: 'beginner' as TierKey },
      { label: 'vs. Prompt Engineering', href: '/context-engineering#vs-prompt', tier: 'intermediate' as TierKey },
      { label: 'Mental Model', href: '/context-engineering#mental-model', tier: 'intermediate' as TierKey },
      { label: 'Anatomy of Context', href: '/context-engineering#anatomy', tier: 'intermediate' as TierKey },
      { label: 'Techniques', href: '/context-engineering#techniques', tier: 'expert' as TierKey },
      { label: 'The Claude 5 Shift', href: '/context-engineering#claude5', tier: 'advanced' as TierKey },
      { label: 'In the Latest Claude', href: '/context-engineering#claude', tier: 'advanced' as TierKey },
    ],
  },
  {
    label: 'Claude Cowork',
    href: '/claude-cowork',
    icon: 'MonitorSmartphone',
    tier: 'beginner' as TierKey,
  },
  {
    label: 'Choose Your Claude',
    href: '/choose-your-claude',
    icon: 'Compass',
    tier: 'beginner' as TierKey,
  },
  {
    label: 'Right-Size Your Model',
    href: '/right-size-your-model',
    icon: 'Gauge',
    tier: 'intermediate' as TierKey,
    children: [
      { label: 'Right-Size This Task', href: '/right-size-your-model#right-sizer', tier: 'intermediate' as TierKey },
      { label: 'The Model Family', href: '/right-size-your-model#ladder', tier: 'beginner' as TierKey },
      { label: 'Dial the Effort', href: '/right-size-your-model#effort', tier: 'intermediate' as TierKey },
      { label: 'What It Actually Costs', href: '/right-size-your-model#cost', tier: 'intermediate' as TierKey },
      { label: 'Where You Pick It', href: '/right-size-your-model#where', tier: 'beginner' as TierKey },
      { label: 'Signs You Are Over-Buying', href: '/right-size-your-model#overbuying', tier: 'intermediate' as TierKey },
      { label: 'Escalate on Evidence', href: '/right-size-your-model#escalation', tier: 'expert' as TierKey },
      { label: 'The Reflex Test', href: '/right-size-your-model#check', tier: 'intermediate' as TierKey },
    ],
  },
  {
    label: 'Road to Agentic Engineering',
    href: '/road-to-agentic-engineering',
    icon: 'Code2',
    tier: 'beginner' as TierKey,
    children: [
      { label: 'Getting Started', href: '/road-to-agentic-engineering', tier: 'beginner' as TierKey },
      { label: 'Installation', href: '/road-to-agentic-engineering/installation', tier: 'beginner' as TierKey },
      { label: 'CW Setup', href: '/road-to-agentic-engineering/setup', tier: 'beginner' as TierKey },
      { label: 'AI Enablement Champions', href: '/road-to-agentic-engineering/champions', tier: 'expert' as TierKey },
      { label: 'Fundamentals', href: '/road-to-agentic-engineering/fundamentals', tier: 'intermediate' as TierKey },
      { label: 'Workflows', href: '/road-to-agentic-engineering/workflows', tier: 'expert' as TierKey },
      { label: 'Tips & Tricks', href: '/road-to-agentic-engineering/tips', tier: 'expert' as TierKey },
      { label: 'Cheatsheet', href: '/road-to-agentic-engineering/cheatsheet', tier: 'expert' as TierKey },
    ],
  },
  {
    label: 'Agentic AI',
    href: '/agentic-ai',
    icon: 'Bot',
    tier: 'advanced' as TierKey,
    children: [
      { label: 'Overview', href: '/agentic-ai', tier: 'advanced' as TierKey },
      { label: 'What Are Agents', href: '/agentic-ai#what-are-agents', tier: 'advanced' as TierKey },
      { label: 'Building Blocks', href: '/agentic-ai#building-blocks', tier: 'advanced' as TierKey },
      { label: 'Evolution', href: '/agentic-ai#personal-to-orchestration', tier: 'advanced' as TierKey },
      { label: 'Map Your Workflow', href: '/agentic-ai#mapping-workflow', tier: 'advanced' as TierKey },
      { label: 'Pipeline Example', href: '/agentic-ai#pipeline', tier: 'advanced' as TierKey },
      { label: 'Tool Landscape', href: '/agentic-ai#tool-landscape', tier: 'advanced' as TierKey },
      { label: 'Getting Started', href: '/agentic-ai#getting-started', tier: 'advanced' as TierKey },
      { label: 'Skills', href: '/agentic-ai/skills', tier: 'beginner' as TierKey },
    ],
  },
  {
    label: 'Use Cases',
    href: '/use-cases',
    icon: 'Briefcase',
    tier: 'expert' as TierKey,
    children: [
      { label: 'Overview', href: '/use-cases', tier: 'expert' as TierKey },
      { label: 'Underwriting', href: '/use-cases#underwriting', tier: 'expert' as TierKey },
      { label: 'Broker Communication', href: '/use-cases#broker-communication', tier: 'expert' as TierKey },
      { label: 'Claims', href: '/use-cases#claims', tier: 'expert' as TierKey },
      { label: 'General Productivity', href: '/use-cases#general', tier: 'expert' as TierKey },
      { label: 'AI Tools Built at CW', href: '/use-cases#cw-tools', tier: 'advanced' as TierKey },
    ],
  },
  {
    label: 'Resources',
    href: '/resources',
    icon: 'BookOpen',
    tier: null,
    children: [
      { label: 'Overview', href: '/resources', tier: null },
      { label: 'Glossary', href: '/resources#glossary', tier: null },
      { label: 'Essential Videos', href: '/resources#videos', tier: null },
      { label: 'Tools & Links', href: '/resources#links', tier: null },
      { label: 'Quick Reference', href: '/resources#quick-reference', tier: null },
      { label: 'Learning Path', href: '/resources#learning-path', tier: null },
    ],
  },
] as const;

export const PLATFORM_TABS = ['Windows', 'Mac', 'Linux'] as const;
export type PlatformTab = typeof PLATFORM_TABS[number];

// AI Enablement Champions — allowlist for /road-to-agentic-engineering/champions
export const CHAMPION_EMAILS: readonly string[] = [
  'abigail.fassbender@coverwhale.com',
  'bryan.glenn@coverwhale.com',
  'bryan.salvadore@coverwhale.com',
  'charisse.skeete@coverwhale.com',
  'daniel.medina@coverwhale.com',
  'david.castellanos@coverwhale.com',
  'ian@coverwhale.com',
  'jose.selemi@coverwhale.com',
  'ken@coverwhale.com',
  'kevin@coverwhale.com',
  'lennie.cohen@coverwhale.com',
  'mercedes.mojica@coverwhale.com',
  'sabina.atkinson@coverwhale.com',
  'sam.englander@coverwhale.com',
  'sean.johnson@coverwhale.com',
  'william.fahrner@coverwhale.com',
];

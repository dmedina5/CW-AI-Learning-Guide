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
      { label: 'CRISP Framework', href: '/prompt-engineering#crisp', tier: 'intermediate' as TierKey },
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
    label: 'Vibe Coding',
    href: '/vibe-coding',
    icon: 'Code2',
    tier: 'beginner' as TierKey,
    children: [
      { label: 'Getting Started', href: '/vibe-coding', tier: 'beginner' as TierKey },
      { label: 'Installation', href: '/vibe-coding/installation', tier: 'beginner' as TierKey },
      { label: 'Fundamentals', href: '/vibe-coding/fundamentals', tier: 'intermediate' as TierKey },
      { label: 'Workflows', href: '/vibe-coding/workflows', tier: 'expert' as TierKey },
      { label: 'Tips & Tricks', href: '/vibe-coding/tips', tier: 'expert' as TierKey },
      { label: 'Cheatsheet', href: '/vibe-coding/cheatsheet', tier: 'expert' as TierKey },
    ],
  },
  {
    label: 'Agentic AI',
    href: '/agentic-ai',
    icon: 'Bot',
    tier: 'advanced' as TierKey,
  },
  {
    label: 'Use Cases',
    href: '/use-cases',
    icon: 'Briefcase',
    tier: 'expert' as TierKey,
  },
  {
    label: 'Resources',
    href: '/resources',
    icon: 'BookOpen',
    tier: null,
  },
] as const;

export const PLATFORM_TABS = ['Windows', 'Mac', 'Linux'] as const;
export type PlatformTab = typeof PLATFORM_TABS[number];

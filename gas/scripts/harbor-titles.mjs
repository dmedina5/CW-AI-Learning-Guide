/**
 * The 28 Harbor pages, in Harbor's navigation order (parents before children),
 * with the title each one carries there. Titles come from the guide's own nav
 * labels so the two agree.
 *
 * Shared by harbor-pages.mjs (the page tree to build by hand) and
 * build-docx.mjs (the document export), so the two can never disagree about
 * which pages exist or what order they read in.
 */
export const TITLES = {
  '/': 'AI Learning Guide',
  '/ai-basics': 'AI Basics',
  '/ai-basics/core-concepts': 'Core Concepts',
  '/ai-basics/how-it-works': 'How It Works',
  '/ai-basics/innovation': 'Innovation Flywheel',
  '/ai-basics/models': 'Models',
  '/ai-basics/strengths': 'Strengths & Limits',
  '/ai-basics/how-we-got-here': 'How We Got Here',
  '/ai-basics/responsible-ai': 'Using AI Responsibly',
  '/prompt-engineering': 'Prompt Engineering',
  '/prompt-builder': 'Prompt Builder',
  '/context-engineering': 'Context Engineering',
  '/moving-from-chatgpt': 'Moving from ChatGPT',
  '/claude-cowork': 'Claude Cowork',
  '/choose-your-claude': 'Choose Your Claude',
  '/right-size-your-model': 'Right-Size Your Model',
  '/road-to-agentic-engineering': 'Road to Agentic Engineering',
  '/road-to-agentic-engineering/installation': 'Installation',
  '/road-to-agentic-engineering/setup': 'CW Setup',
  '/road-to-agentic-engineering/champions': 'AI Enablement Champions',
  '/road-to-agentic-engineering/fundamentals': 'Fundamentals',
  '/road-to-agentic-engineering/workflows': 'Workflows',
  '/road-to-agentic-engineering/tips': 'Tips & Tricks',
  '/road-to-agentic-engineering/cheatsheet': 'Cheatsheet',
  '/agentic-ai': 'Agentic AI',
  '/agentic-ai/skills': 'Skills',
  '/use-cases': 'Use Cases',
  '/resources': 'Resources',
};

/** Harbor nav order. */
export const ORDER = Object.keys(TITLES);

/** A route as a safe file name: '/ai-basics/models' -> 'ai-basics__models'. */
export const slugFor = (route) => (route === '/' ? 'home' : route.slice(1).replace(/\//g, '__'));

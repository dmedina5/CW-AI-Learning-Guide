export type ClaudeProductId = 'app' | 'code';

export interface ClaudeProduct {
  id: ClaudeProductId;
  name: string;
  tagline: string;
  vibe: string;
  access: string;
  setupTime: string;
  capabilities: {
    answerQuestions: string;
    createFiles: string;
    buildInteractive: string;
    usePlugins: string;
    connectTools: string;
    searchInternet: string;
    extendedThinking: string;
    localFiles: string;
  };
  contextIdentity: string;
  contextInput: string;
  contextPersistence: string;
  bestFor: string[];
}

export interface RecommendationResult {
  product: ClaudeProduct;
  reasoning: string;
  confidence: 'strong' | 'general';
  alternatives: ClaudeProduct[];
}

// Thinking is always on for the current models; Effort sets how much of it.
const THINKING = 'Always on. Set how hard it thinks with Effort (Low to Max).';

export const CLAUDE_PRODUCTS: ClaudeProduct[] = [
  {
    id: 'app',
    name: 'The Claude app',
    tagline: 'Chat, projects, Cowork and artifacts in one place',
    vibe: 'A team member who knows your playbook and does the work',
    access: 'Browser, phone, or desktop app',
    setupTime: '~5 minutes',
    capabilities: {
      answerQuestions: 'Yes',
      createFiles: 'Yes. Documents, spreadsheets and slides you can open or download.',
      buildInteractive: 'Yes, via Artifacts',
      usePlugins: 'Yes. Install them from Customize > Plugins.',
      connectTools: 'Yes. Customize > Connectors.',
      searchInternet: 'Yes',
      extendedThinking: THINKING,
      localFiles: 'Desktop app only',
    },
    contextIdentity: 'Yes, from your instructions in Settings > Your Claude, plus memory.',
    contextInput: 'You add instructions and files to a project once. They stick.',
    contextPersistence: 'Yes. Every new chat or task in the project has it, on any device.',
    bestFor: [
      'You\'re doing real work (analysis, spreadsheets, reports)',
      'You want Claude to create actual files',
      'You do the same task every week (newsletter, reports)',
      'You want it to sound like you',
      'You want your context saved, not retyped every session',
    ],
  },
  {
    id: 'code',
    name: 'Claude Code',
    tagline: 'Like a technical assistant on your team',
    vibe: 'Having a developer who builds what you describe',
    access: 'Terminal, desktop app, VS Code or JetBrains, or the web (claude.ai/code)',
    setupTime: '~5 minutes',
    capabilities: {
      answerQuestions: 'Yes',
      createFiles: 'Yes. Saves files directly into your project folder.',
      buildInteractive: 'Not just previews. It builds real apps you can run.',
      usePlugins: 'Yes. Connect any tool with add-ons.',
      connectTools: 'Yes. Connects to Jira, GitHub, Slack, and more.',
      searchInternet: 'Yes',
      extendedThinking: THINKING,
      localFiles: 'Yes. It works inside your project folder.',
    },
    contextIdentity: 'You write a short instructions file in your project. Claude reads it every time.',
    contextInput: 'Your instructions file + your entire project. Claude reads it all automatically.',
    contextPersistence: 'Yes. Your project instructions stay. You can also resume where you left off.',
    bestFor: [
      'You want to build software or a website',
      'You want Claude to write and save code',
      'You need changes across many files at once',
      'You want help publishing project updates',
      'You need long, hands-free building sessions',
    ],
  },
];

interface KeywordCategory {
  productId: ClaudeProductId;
  keywords: string[];
  weight: number;
}

const KEYWORD_CATEGORIES: KeywordCategory[] = [
  {
    productId: 'code',
    weight: 1,
    keywords: [
      'build', 'code', 'coding', 'software', 'website', 'web app', 'app',
      'deploy', 'publish', 'repository', 'repo', 'git', 'github',
      'ide', 'editor', 'vs code', 'vscode', 'debug', 'refactor',
      'multi-file', 'multiple files', 'project updates', 'hands-free',
      'programming', 'developer', 'engineer', 'terminal', 'command line',
      'api', 'backend', 'frontend', 'database', 'migration', 'automate code',
      'pull request', 'commit', 'branch', 'merge', 'pipeline', 'ci/cd',
    ],
  },
  {
    productId: 'app',
    weight: 1,
    keywords: [
      'analysis', 'analyze', 'spreadsheet', 'excel', 'document',
      'write', 'writing', 'draft', 'memo', 'report',
      'sound like me', 'my voice', 'my style', 'my tone',
      'create files', 'create a file', 'real work', 'deep session',
      'slides', 'presentation', 'pdf', 'word doc',
      'research', 'summarize', 'brief', 'proposal',
      'edit document', 'review document', 'proofread',
      'recurring', 'weekly', 'monthly', 'daily', 'every week', 'every month',
      'newsletter', 'template', 'saved', 'remember', 'context',
      'ongoing', 'every time', 'always', 'repeat', 'persistent',
      'routine', 'same task', 'reuse', 'phone', 'mobile',
      'quick question', 'ask', 'help me understand', 'explain',
      'brainstorm', 'idea', 'think through', 'conversation',
    ],
  },
];

export function getRecommendation(input: string): RecommendationResult | null {
  const trimmed = input.trim();
  if (!trimmed || trimmed.split(/\s+/).length < 2) {
    return null;
  }

  const lower = trimmed.toLowerCase();

  const scores: Record<ClaudeProductId, number> = { app: 0, code: 0 };

  for (const category of KEYWORD_CATEGORIES) {
    for (const keyword of category.keywords) {
      if (lower.includes(keyword)) {
        scores[category.productId] += category.weight;
      }
    }
  }

  const maxScore = Math.max(scores.app, scores.code);

  // No matches — default to the Claude app as the most general
  if (maxScore === 0) {
    const app = CLAUDE_PRODUCTS.find(p => p.id === 'app')!;
    return {
      product: app,
      reasoning: `Based on your description, the Claude app is a great starting point. It's the most versatile option — it works on any device and keeps your context in projects.`,
      confidence: 'general',
      alternatives: CLAUDE_PRODUCTS.filter(p => p.id !== 'app'),
    };
  }

  // Tie-breaking: the app wins (most general)
  const winnerId: ClaudeProductId = scores.app >= scores.code ? 'app' : 'code';

  const winner = CLAUDE_PRODUCTS.find(p => p.id === winnerId)!;
  const isStrong = maxScore >= 2 && scores[winnerId] > Math.min(scores.app, scores.code);

  const reasoningMap: Record<ClaudeProductId, string> = {
    code: `Claude Code is built for development workflows — it reads your entire project, writes and saves code across multiple files, and integrates with Git, GitHub, and your IDE.`,
    app: `The Claude app is perfect for this. It reads your documents, creates real files, keeps your context in projects, and works on any device.`,
  };

  return {
    product: winner,
    reasoning: reasoningMap[winnerId],
    confidence: isStrong ? 'strong' : 'general',
    alternatives: CLAUDE_PRODUCTS.filter(p => p.id !== winnerId),
  };
}

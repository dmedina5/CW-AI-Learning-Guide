export interface ClaudeProduct {
  id: 'code' | 'cowork' | 'chat';
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

export const CLAUDE_PRODUCTS: ClaudeProduct[] = [
  {
    id: 'code',
    name: 'Claude Code',
    tagline: 'Like a technical assistant on your team',
    vibe: 'Having a developer who builds what you describe',
    access: 'Browser, desktop app, or code editor (VS Code, etc.)',
    setupTime: '~5 minutes',
    capabilities: {
      answerQuestions: 'Yes',
      createFiles: 'Yes. Saves files directly into your project folder.',
      buildInteractive: 'Not just previews. It builds real apps you can run.',
      usePlugins: 'Yes. Connect any tool with add-ons.',
      connectTools: 'Yes. Connects to Jira, GitHub, Slack, and more.',
      searchInternet: 'Yes',
      extendedThinking: 'On by default',
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
  {
    id: 'cowork',
    name: 'Claude Cowork',
    tagline: 'It reads your files, creates new ones',
    vibe: 'Working with an assistant who read every brief',
    access: 'Desktop app only (click the Cowork tab)',
    setupTime: '~10 minutes',
    capabilities: {
      answerQuestions: 'Yes',
      createFiles: 'Yes. Files appear in your folders, ready to open.',
      buildInteractive: 'Yes, via Artifacts',
      usePlugins: 'Yes, install from a library. Use slash commands.',
      connectTools: 'Yes',
      searchInternet: 'Yes',
      extendedThinking: 'On by default',
    },
    contextIdentity: 'Yes, if you put info about yourself in text files inside your folder.',
    contextInput: 'You write .md or .txt files once. Drop them in a folder. Point Claude to it.',
    contextPersistence: 'Yes, as long as you\'re in the same folder.',
    bestFor: [
      'You\'re doing real work (analysis, spreadsheets)',
      'You want Claude to create actual files',
      'You want it to sound like you',
      'You need long, deep sessions that don\'t break',
    ],
  },
  {
    id: 'chat',
    name: 'Claude Chat (Browser)',
    tagline: 'A saved workspace',
    vibe: 'A team member who knows your playbook',
    access: 'Browser, phone, or desktop app',
    setupTime: '~5 minutes',
    capabilities: {
      answerQuestions: 'Yes',
      createFiles: 'Yes. Files can be saved or downloaded.',
      buildInteractive: 'Yes, via Artifacts',
      usePlugins: 'No',
      connectTools: 'Yes',
      searchInternet: 'Yes',
      extendedThinking: 'Yes, you turn it on manually',
    },
    contextIdentity: 'Yes, from the files and instructions you added to the project.',
    contextInput: 'You upload files and write instructions once. They stick.',
    contextPersistence: 'Yes. Every new chat inside the project has it.',
    bestFor: [
      'You do the same task every week (newsletter, reports)',
      'You\'re tired of repeating yourself',
      'You want your context saved forever, not just for one session',
    ],
  },
];

interface KeywordCategory {
  productId: 'code' | 'cowork' | 'chat';
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
    productId: 'cowork',
    weight: 1,
    keywords: [
      'analysis', 'analyze', 'spreadsheet', 'excel', 'document',
      'write', 'writing', 'draft', 'memo', 'report',
      'sound like me', 'my voice', 'my style', 'my tone',
      'create files', 'create a file', 'real work', 'deep session',
      'slides', 'presentation', 'pdf', 'word doc',
      'research', 'summarize', 'brief', 'proposal',
      'edit document', 'review document', 'proofread',
    ],
  },
  {
    productId: 'chat',
    weight: 1,
    keywords: [
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

  const scores: Record<string, number> = { code: 0, cowork: 0, chat: 0 };

  for (const category of KEYWORD_CATEGORIES) {
    for (const keyword of category.keywords) {
      if (lower.includes(keyword)) {
        scores[category.productId] += category.weight;
      }
    }
  }

  const maxScore = Math.max(scores.code, scores.cowork, scores.chat);

  // No matches — default to Chat as most general
  if (maxScore === 0) {
    const chat = CLAUDE_PRODUCTS.find(p => p.id === 'chat')!;
    return {
      product: chat,
      reasoning: `Based on your description, Claude Chat (Browser) is a great starting point. It's the most versatile option — accessible from any device with persistent context across sessions.`,
      confidence: 'general',
      alternatives: CLAUDE_PRODUCTS.filter(p => p.id !== 'chat'),
    };
  }

  // Tie-breaking: Chat > Cowork > Code (most general wins)
  const tieOrder: Array<'chat' | 'cowork' | 'code'> = ['chat', 'cowork', 'code'];
  let winnerId: 'code' | 'cowork' | 'chat' = 'chat';
  for (const id of tieOrder) {
    if (scores[id] === maxScore) {
      winnerId = id;
      break;
    }
  }

  const winner = CLAUDE_PRODUCTS.find(p => p.id === winnerId)!;
  const isStrong = maxScore >= 2 && scores[winnerId] > Math.min(...Object.values(scores));

  const reasoningMap: Record<string, string> = {
    code: `Claude Code is built for development workflows — it reads your entire project, writes and saves code across multiple files, and integrates with Git, GitHub, and your IDE.`,
    cowork: `Claude Cowork excels at creating real files and deep work sessions. It reads your existing documents, matches your style, and saves output directly to your folders.`,
    chat: `Claude Chat (Browser) is perfect for this. It saves your context permanently across sessions, works on any device, and handles recurring tasks without repeating setup.`,
  };

  return {
    product: winner,
    reasoning: reasoningMap[winnerId],
    confidence: isStrong ? 'strong' : 'general',
    alternatives: CLAUDE_PRODUCTS.filter(p => p.id !== winnerId),
  };
}

# Cover Whale AI Learning Guide

**Internal AI Learning Platform for Cover Whale**

A comprehensive Next.js learning platform covering AI fundamentals, prompt engineering, vibe coding, and agentic AI - built for Cover Whale team members at every skill level.

## Live Guide

Visit the guide at: **[https://dmedina5.github.io/CW-AI-Learning-Guide/](https://dmedina5.github.io/CW-AI-Learning-Guide/)**

## Authentication

This guide is **restricted to CoverWhale team members only**. Authentication is enforced via Google OAuth:

- Only `@coverwhale.com` email addresses can access
- Authentication backend: [https://coverwhale-auth.vercel.app](https://coverwhale-auth.vercel.app)
- Automatic redirect to Google sign-in for unauthorized users

## Features

- **Tiered Content** - Beginner, Intermediate, Expert, and Advanced levels with filtering
- **Interactive Demos** - Context prediction, prompt comparison, reality filter toggle
- **Prompt Builder** - Full CRISP Framework tool with Simple/Advanced modes
- **Claude/Gemini Tabs** - Side-by-side content for both AI tools
- **Platform Tabs** - Windows/Mac/Linux with localStorage persistence
- **Ctrl+K Search** - Global search across all pages
- **Progress Tracking** - Per-section completion state
- **Responsive Design** - Works on desktop and mobile

## What's Inside

| Page | Tier | Description |
|------|------|-------------|
| **Home** | -- | Overview, learning path, quick links |
| **AI Basics** | Beginner | Core AI concepts and terminology |
| **Prompt Engineering** | Beginner/Intermediate | 7-tab guide to effective prompting |
| **Prompt Builder** | Intermediate | Interactive CRISP Framework tool |
| **Vibe Coding** | Beginner | Introduction to AI-assisted development |
| **Installation** | Beginner | Setup guides for Claude Code and Gemini CLI |
| **Fundamentals** | Intermediate | Context management, CLAUDE.md/GEMINI.md |
| **Workflows** | Expert | Proven patterns: Explore-Plan-Execute, Relay Race |
| **Tips & Tricks** | Expert | Keyboard shortcuts, commands, power-user techniques |
| **Cheatsheet** | Expert | Side-by-side quick reference |
| **Agentic AI** | Advanced | Multi-agent workflows, MCP, automation |
| **Use Cases** | Expert | Cover Whale-specific workflows and examples |
| **Resources** | -- | Glossary and quick reference |

## Tech Stack

- **Framework**: Next.js 14 (App Router, static export)
- **Styling**: Tailwind CSS with custom design tokens
- **Authentication**: Google OAuth via coverwhale-auth Vercel backend
- **Hosting**: GitHub Pages with GitHub Actions CI/CD
- **Language**: TypeScript

## Repository Structure

```
CW-AI-Learning-Guide/
├── src/
│   ├── app/                 # Next.js pages (App Router)
│   ├── components/          # React components
│   │   ├── auth/            # AuthProvider, AuthGuard, LoginScreen
│   │   ├── content/         # TierBadge, Card, CodeBlock, Tabs, etc.
│   │   ├── interactive/     # ContextDemo, PromptBuilder, QuizBlock, etc.
│   │   ├── layout/          # Sidebar, TopBar, Footer
│   │   └── ui/              # SearchModal
│   ├── hooks/               # useAuth, useLocalStorage, usePlatform
│   ├── lib/                 # auth, constants
│   └── styles/              # Global CSS
├── public/                  # Static assets
├── .github/workflows/       # GitHub Actions deploy workflow
├── next.config.js           # Static export + basePath config
└── README.md
```

## Local Development

```bash
# Clone the repository
git clone git@github.com:dmedina5/CW-AI-Learning-Guide.git
cd CW-AI-Learning-Guide

# Install dependencies
npm install

# Start dev server
npm run dev

# Open in browser
open http://localhost:3000
```

## Maintenance

- **Owner**: Daniel Medina (daniel.medina@coverwhale.com)
- **Last Updated**: February 2026

## Support

- **Questions?** Reach out to IT Support or your team lead
- **Feedback on this guide?** Contact the Core Systems team
- **Authentication issues?** Email daniel.medina@coverwhale.com

---

**Internal Use Only** | Cover Whale Insurance | 2026

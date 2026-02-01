# Cover Whale Vibe Code Guide

**Internal Documentation for AI-Augmented Development at Cover Whale**

A comprehensive multi-page guide to mastering Claude Code and Gemini CLI for Cover Whale team members. From first-time setup to advanced multi-agent workflows - everything you need to supercharge your productivity with AI-assisted development.

## Live Guide

Visit the guide at: **[https://dmedina5.github.io/CW-Vibe-Code-Guide/](https://dmedina5.github.io/CW-Vibe-Code-Guide/)**

## Authentication

This guide is **restricted to CoverWhale team members only**. Authentication is enforced via Google OAuth:

- Only `@coverwhale.com` email addresses can access
- Authentication backend: [https://coverwhale-auth.vercel.app](https://coverwhale-auth.vercel.app)
- Automatic redirect to Google sign-in for unauthorized users

## Features

- **Multi-Page Navigation** - Organized sections for easy learning
- **Claude/Gemini Tabs** - Side-by-side content for both tools
- **Copy Code Buttons** - One-click copy on all code blocks
- **Skill Level Filters** - Show/hide Beginner, Intermediate, Advanced content
- **Dark/Light Mode** - Theme toggle with persistence
- **Ctrl+K Search** - Quick search across all documentation
- **Responsive Design** - Works on desktop and mobile
- **Print-Friendly Cheatsheet** - For quick reference

## What's Inside

| Page | Description |
|------|-------------|
| **Home** | Overview, tool comparison, quick links |
| **Installation** | Setup guides for Claude Code and Gemini CLI |
| **Fundamentals** | Mental models, context management, CLAUDE.md/GEMINI.md |
| **Tips & Tricks** | Keyboard shortcuts, commands, power-user techniques |
| **Use Cases** | Cover Whale-specific workflows and examples |
| **Workflows** | Proven patterns: Explore-Plan-Execute, Relay Race |
| **Advanced** | Headless mode, MCP, Docker, automation pipelines |
| **Cheatsheet** | Side-by-side quick reference (printable) |

## Tech Stack

- **Authentication**: Custom Google OAuth with CoverWhale domain restriction
- **Hosting**: GitHub Pages
- **Design**: Custom CSS with lighter purple palette for readability
- **JavaScript**: Modular ES6 for tabs, search, copy, themes, filters

## Repository Structure

```
CW-Vibe-Code-Guide/
├── index.html              # Landing page
├── installation.html       # Installation guide
├── fundamentals.html       # Mental model, context, setup
├── tips-tricks.html        # Tool-specific tips
├── use-cases.html          # Cover Whale use cases
├── workflows.html          # Workflow frameworks
├── advanced.html           # Advanced techniques
├── cheatsheet.html         # Quick reference
├── css/
│   └── styles.css          # Shared styles
├── js/
│   ├── auth.js             # Authentication
│   ├── tabs.js             # Tab switching
│   ├── nav.js              # Navigation
│   ├── copy-code.js        # Copy functionality
│   ├── theme.js            # Dark/light mode
│   ├── filter.js           # Skill level filtering
│   └── search.js           # Ctrl+K search
├── .nojekyll               # Disable Jekyll processing
└── README.md               # This file
```

## Local Development

To run locally:

```bash
# Clone the repository
git clone git@github.com:dmedina5/CW-Vibe-Code-Guide.git
cd CW-Vibe-Code-Guide

# Start local server
python -m http.server 8000

# Open in browser
open http://localhost:8000
```

**Note**: Authentication will work on GitHub Pages but not on localhost (unless you update the auth.js redirect URI).

## Verification Checklist

After making changes, verify:

- [ ] All pages load without JavaScript errors
- [ ] Tab switching works on all pages
- [ ] Copy buttons copy correct content
- [ ] Skill filters show/hide content properly
- [ ] Dark/light mode persists across pages
- [ ] Search finds content across all pages
- [ ] Navigation highlights current page
- [ ] Mobile responsive (test at 375px, 768px)
- [ ] Authentication works after deployment

## Maintenance

- **Owner**: Daniel Medina (daniel.medina@coverwhale.com)
- **Last Updated**: January 2026
- **Updates**: Pull requests welcome from CoverWhale team members

## Support

- **Questions about Claude Code?** Reach out to IT Support or your team lead
- **Questions about Gemini CLI?** Check the official Google docs or ask the team
- **Feedback on this guide?** Contact the Core Systems team
- **Authentication issues?** Email daniel.medina@coverwhale.com

## Additional Resources

- [Official Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code)
- [Gemini CLI Documentation](https://ai.google.dev/gemini-cli)
- [Claude.ai Help Center](https://support.anthropic.com)
- [Google AI Studio](https://aistudio.google.com)

---

**Internal Use Only** | Cover Whale Insurance | 2026

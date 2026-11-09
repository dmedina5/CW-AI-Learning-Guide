#!/usr/bin/env bash
# Content the guide must paint, and retired wording it must not, asserted in a
# real browser one route at a time through check-route-text.sh. Run it after
# `npm run harbor:build` and before any push; a MISSING or PRESENT line names
# the route and phrase that broke.
#
#   bash gas/scripts/content-checks.sh
#
# Grouped by the change that introduced each check, so a later edit that
# undoes one shows which promise it broke.
set -uo pipefail
cd "$(dirname "$0")/.."

fail=0
check() {
  echo "$*" | cut -c1-110
  bash scripts/check-route-text.sh "$@" || fail=1
}

# ── October 2026: current Claude models on Right-Size Your Model ────────────
check /right-size-your-model \
  "Claude Opus 5.5" "Claude Sonnet 5.5" "Claude Fable 5.1" "Claude Haiku 4.5" \
  '$4 in / $20 out per 1M' '$2 in / $10 out per 1M' '$10 in / $50 out per 1M' \
  "replaces Claude Opus 5 and costs less" "replaces Claude Sonnet 5 at the same" \
  "older Sonnet 4.6 price" \
  "Where Opus 5.5 and Sonnet 5.5 start" \
  "/effort ultracode" \
  '!$3 in / $15 out' '!$5 in / $25 out' '!Sonnet costs about 3×' '!Fable 5 costs'

check /context-engineering "Opus 5.5, Sonnet 5.5, and Fable 5.1"

# ── November 2026: Claude Haiku 5.5 replaces Haiku 4.5 on the ladder ────────
# Supersedes the October "2× / 4×" ratio line and the October callout heading.
check /right-size-your-model \
  "Claude Haiku 5.5" '$0.10 in / $0.50 out per 1M' \
  "replaces Claude Haiku 4.5 and costs less" "What changed this autumn" \
  "Sonnet costs about 20× Haiku per token, Opus about 40×, and Fable about 100×" \
  "above 100K tokens" "Haiku 5.5 now has an effort dial" \
  '!Haiku 4.5 has no effort dial' '!Sonnet costs about 2× Haiku' \
  '!Haiku cannot even hold' '!Fable 5.1 costs ten times Haiku' \
  '!What changed in October 2026'

# ── November 2026: Cowork folded into one Claude app (Teams plan view) ──────
# Facts checked on the Cover Whale Teams account in claude.ai on 2026-11-08;
# the screenshots are cropped and redacted for the public repo.
check /claude-cowork \
  "The Claude App" "Cowork is now part of the Claude app" \
  "Cover Whale Teams plan" "nested sessions" "Pro and Max plans only" \
  "Haiku 5.5" "Extra" "5× or more usage" \
  "Move to group" "Side chat" "Split view" \
  "Docs" "Slides" "Design" "Dashboard" \
  "Skills" "Connectors" "Plugins" \
  "Claude model picker with Haiku 5.5" \
  '!Open the Cowork tab' '!click the Cowork tab'
# The Harbor frame does not load images from other sites (they showed broken
# in the @HEAD preview), so the Harbor build must carry them inline.
check /claude-cowork 'src="data:image/jpeg;base64' '!src="https://dmedina5.github.io'
check /right-size-your-model \
  "Effort is in chat too" "Extra" \
  '!Effort levels and ultracode are Claude Code' \
  '!inside Cowork in the Claude desktop app'
check /choose-your-claude '!click the Cowork tab'

# ── November 2026: Token Efficiency guidelines ──────────────────────────────
# Grounded in code.claude.com/docs/en/costs and /prompt-caching and the
# help-center "Usage limit best practices" article, read 2026-11-09. The
# video's three overstated claims are corrected on the page and must stay so.
check --export-all /token-efficiency \
  "Token Efficiency" "Cover Whale Teams plan" "rolling five-hour window" \
  "shared across chat, Cowork and Claude Code" \
  "every message sends the whole conversation" "one hour" "five minutes" \
  "handoff" "/clear" "/compact" "/context" "/usage" "under 200 lines" \
  "/rewind" "CLAUDE_CODE_SUBAGENT_PROMPT_CACHE_TTL" \
  "report only the failing tests" "Usage limit best practices" \
  "changing effort keeps the cache" "Switching model" \
  "costs a fraction of what its size suggests" \
  "Anthropic does not publish a multiplier"
check /right-size-your-model "Token Efficiency"

# ── October 2026: the Cover Whale Teams plan is the plan to use ─────────────
check / "Cover Whale Teams plan" "Moving from ChatGPT"
check /road-to-agentic-engineering "Cover Whale Teams plan" '!Pro/Max account'
check --export-all /road-to-agentic-engineering/installation \
  "Cover Whale Teams plan" '!Claude Pro/Max account'
check /road-to-agentic-engineering/setup "Coverwhale Teams"
check /claude-cowork "Cover Whale Teams plan"
check /choose-your-claude "Cover Whale Teams plan"

# ── October 2026: moving from ChatGPT to Claude ─────────────────────────────
check /moving-from-chatgpt \
  "Moving from ChatGPT to Claude" "October 8, 2026" "TC-SOP-002" \
  "Start import" "Instructions for Claude" "Cover Whale Teams plan" \
  "cyber@coverwhale.com" "Shadow AI" "daniel.medina@coverwhale.com"
check /ai-basics/models "prohibited under the AI Acceptable Use Policy"
check /agentic-ai '!Use ChatGPT, Claude.ai, or Gemini web'

# ── October 2026: AI Basics — how we got here, and using AI responsibly ─────
check /ai-basics "How We Got Here" "Using AI Responsibly"
check /ai-basics/how-we-got-here \
  "How We Got Here" "AI Center of Excellence" "AI Acceptable Use Policy" \
  "CW Data Bot" "Claude Tag" "Fleet Submission Analyzer" \
  "DOI Complaint Automation" "HR Job Description Generator"
# Product and Technology progress, drawn from how-we-work without naming it.
check /ai-basics/how-we-got-here \
  "Product and Technology" "rolls back on its own" "one command" \
  "same definition of good" "Proof before it ships" \
  '!The Standard' '!how-we-work'
check --export-all /ai-basics/responsible-ai \
  "Using AI Responsibly" "AI-assisted" "subject matter expert" \
  "Think with AI, then listen to people, then announce." \
  "Harvard Business Review" "licensed professional"

echo
(( fail )) && { echo "content checks FAILED"; exit 1; }
echo "content checks passed"

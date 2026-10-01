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
  "Sonnet costs about 2× Haiku per token, Opus about 4×" \
  "What changed in October 2026" \
  "replaces Claude Opus 5 and costs less" "replaces Claude Sonnet 5 at the same" \
  "older Sonnet 4.6 price" \
  "Where Opus 5.5 and Sonnet 5.5 start" \
  "/effort ultracode" \
  '!$3 in / $15 out' '!$5 in / $25 out' '!Sonnet costs about 3×' '!Fable 5 costs'

check /context-engineering "Opus 5.5, Sonnet 5.5, and Fable 5.1"

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
check --export-all /ai-basics/responsible-ai \
  "Using AI Responsibly" "AI-assisted" "subject matter expert" \
  "Think with AI, then listen to people, then announce." \
  "Harvard Business Review" "licensed professional"

echo
(( fail )) && { echo "content checks FAILED"; exit 1; }
echo "content checks passed"

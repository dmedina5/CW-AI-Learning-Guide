#!/usr/bin/env bash
# Exports the whole guide as one Word document, for people who need the text
# outside the site (HR building a tracked training from it, for instance).
#
#   bash gas/scripts/export-docx.sh [out.docx]
#
# Renders each of the 25 Harbor pages in a real browser with --export-all, so
# every platform tab, nested tab and quiz answer is in the DOM at once, then
# build-docx.mjs turns the painted HTML into headings, paragraphs, lists, code
# and tables. Rendering rather than reading the source is deliberate: the
# source is JSX spread across 33 files and 14 components, and what the reader
# sees is the only honest definition of "the content".
#
# Needs Windows Chrome, like smoke-routes.sh. Fails if any page paints nothing,
# because a silent empty section is worse than no document.
set -uo pipefail
cd "$(dirname "$0")/.."

out="${1:-dist/ai-learning-guide.docx}"
CHROME=$(ls "/mnt/c/Program Files/Google/Chrome/Application/chrome.exe" 2>/dev/null | head -1)
[[ -z "$CHROME" ]] && { echo "Chrome not found"; exit 1; }
WINTMP="/mnt/c/Users/${WINUSER:-daniel.medina}/AppData/Local/Temp"

[[ -f apps-script/Config.gs ]] || { echo "No packaged bundle — run: npm run harbor:build"; exit 1; }
mkdir -p dist/export
rm -f dist/export/*.html

ROUTES=$(node -e "import('./scripts/harbor-titles.mjs').then(m => console.log(m.ORDER.join(' ')))")
SLUGS=$(node -e "import('./scripts/harbor-titles.mjs').then(m => console.log(m.ORDER.map(m.slugFor).join(' ')))")
read -r -a routes <<< "$ROUTES"; read -r -a slugs <<< "$SLUGS"

fail=0
for i in "${!routes[@]}"; do
  route="${routes[$i]}"; slug="${slugs[$i]}"
  CW_PREVIEW_OUT="dist/export.html" node scripts/preview.mjs "$route" --no-nav --export-all >/dev/null \
    || { echo "  BUILD-FAIL $route"; fail=1; continue; }
  cp dist/export.html "$WINTMP/cw-export.html"
  "$CHROME" --headless --disable-gpu --window-size=1400,2000 \
      --virtual-time-budget=8000 --dump-dom \
      "file:///C:/Users/${WINUSER:-daniel.medina}/AppData/Local/Temp/cw-export.html" 2>/dev/null \
      > "dist/export/$slug.html"
  # The bundle is inlined as a <script>; strip it or every page's SOURCE would
  # count as painted text (the same trap check-route-text.sh names).
  python3 - "dist/export/$slug.html" <<'PY'
import re, sys
p = sys.argv[1]
h = open(p, encoding='utf-8').read()
open(p, 'w', encoding='utf-8').write(re.sub(r'<script[\s\S]*?</script>', '', h))
PY
  painted=$(python3 -c "
import re,sys
h=open(sys.argv[1],encoding='utf-8').read()
m=re.search(r'<main[\s\S]*?</main>',h)
print(len(re.sub(r'\s+',' ',re.sub(r'<[^>]+>',' ',m.group(0) if m else '')).strip()))" "dist/export/$slug.html")
  if [[ "$painted" -gt 400 ]]; then
    printf "  OK    %-46s %6s chars\n" "$route" "$painted"
  else
    printf "  EMPTY %-46s %6s chars\n" "$route" "$painted"; fail=1
  fi
done
(( fail )) && { echo "Some pages did not render; not writing the document."; exit 1; }

node scripts/build-docx.mjs dist/export "$out"

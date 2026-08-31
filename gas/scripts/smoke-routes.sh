#!/usr/bin/env bash
# Renders every published route in a real browser and reports how much each one
# actually painted. A route that compiles but throws on mount still produces a
# valid bundle, so the only honest check is to run it.
set -uo pipefail
cd "$(dirname "$0")/.."

CHROME=$(ls "/mnt/c/Program Files/Google/Chrome/Application/chrome.exe" 2>/dev/null | head -1)
[[ -z "$CHROME" ]] && { echo "Chrome not found"; exit 1; }

WINTMP="/mnt/c/Users/${WINUSER:-daniel.medina}/AppData/Local/Temp"
ROUTES=$(node -e "
  const {readFileSync}=require('node:fs');
  const c=readFileSync('apps-script/Config.gs','utf8');
  console.log(JSON.parse(c.match(/PUBLISHED_ROUTES = (\[[\s\S]*?\]);/)[1]).join(' '));
")

pass=0; fail=0; failed_routes=()
for route in $ROUTES; do
  CW_PREVIEW_OUT="dist/smoke.html" node scripts/preview.mjs "$route" >/dev/null || { echo "  BUILD-FAIL $route"; ((fail++)); continue; }
  cp dist/smoke.html "$WINTMP/cw-smoke.html"
  dom=$("$CHROME" --headless --disable-gpu --window-size=1400,2000 \
        --virtual-time-budget=8000 --dump-dom \
        "file:///C:/Users/${WINUSER:-daniel.medina}/AppData/Local/Temp/cw-smoke.html" 2>/dev/null)
  painted=$(printf '%s' "$dom" | python3 -c "
import re,sys
h=sys.stdin.read()
b=h.split('<body',1)[1] if '<body' in h else h
b=re.sub(r'<script[\s\S]*?</script>','',b)
print(len(re.sub(r'\s+',' ',re.sub(r'<[^>]+>',' ',b)).strip()))
")
  if [[ "$painted" -gt 400 ]]; then
    printf "  OK    %-46s %6s chars\n" "$route" "$painted"; ((pass++))
  else
    printf "  EMPTY %-46s %6s chars\n" "$route" "$painted"; ((fail++)); failed_routes+=("$route")
  fi
done

echo
echo "passed: $pass   failed: $fail"
(( fail > 0 )) && { echo "failing routes: ${failed_routes[*]}"; exit 1; }
exit 0

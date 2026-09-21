#!/usr/bin/env bash
# Renders one route in a real browser and asserts each given phrase is painted
# into the DOM. Content checks live here rather than in verify-bundle.mjs
# because a phrase can be in the bundle and still never render (a tab that is
# not the active one, a component that throws on mount).
#
#   bash gas/scripts/check-route-text.sh [--tab Windows|Mac|Linux] <route> <phrase> [<phrase>...]
#
# --tab pre-selects the platform tab the page would otherwise pick from the
# browser's user agent (headless Chrome on this machine reads as Windows), so
# content inside the Mac or Linux tab can be asserted too.
#
# Exit 0 when every phrase is present, 1 otherwise. Needs Windows Chrome, like
# smoke-routes.sh.
set -uo pipefail
cd "$(dirname "$0")/.."

tab=""
if [[ "${1:-}" == "--tab" ]]; then tab="$2"; shift 2; fi
route="$1"; shift
CHROME=$(ls "/mnt/c/Program Files/Google/Chrome/Application/chrome.exe" 2>/dev/null | head -1)
[[ -z "$CHROME" ]] && { echo "Chrome not found"; exit 1; }
WINTMP="/mnt/c/Users/${WINUSER:-daniel.medina}/AppData/Local/Temp"

CW_PREVIEW_OUT="dist/routecheck.html" node scripts/preview.mjs "$route" >/dev/null || { echo "BUILD-FAIL $route"; exit 1; }
if [[ -n "$tab" ]]; then
  # localStorage is read on mount, so the choice must be in place before the
  # bundle runs. Same key and JSON shape as useLocalStorage in PlatformTabs.
  sed -i "s|<head>|<head><script>localStorage.setItem('cw-platform-tab', JSON.stringify('$tab'))</script>|" dist/routecheck.html
fi
cp dist/routecheck.html "$WINTMP/cw-routecheck.html"
# Written to a file rather than a variable: under pipefail, `grep -q` closing
# the pipe early makes the printf feeding it fail, and a real match reads as
# a miss. The file also survives for inspection after a failure.
"$CHROME" --headless --disable-gpu --window-size=1400,2000 \
      --virtual-time-budget=8000 --dump-dom \
      "file:///C:/Users/${WINUSER:-daniel.medina}/AppData/Local/Temp/cw-routecheck.html" 2>/dev/null > dist/routecheck-dom-raw.html

# The bundle is inlined into the page as a <script>, so the raw dump contains
# every page's SOURCE, rendered or not. Strip scripts first, or a phrase in an
# inactive tab reads as painted.
python3 - <<'PY'
import re
h = open('dist/routecheck-dom-raw.html', encoding='utf-8').read()
open('dist/routecheck-dom.html', 'w', encoding='utf-8').write(re.sub(r'<script[\s\S]*?</script>', '', h))
PY

fail=0
for phrase in "$@"; do
  if grep -qF -- "$phrase" dist/routecheck-dom.html; then
    printf '  OK      %s\n' "$phrase"
  else
    printf '  MISSING %s\n' "$phrase"; fail=1
  fi
done
exit $fail

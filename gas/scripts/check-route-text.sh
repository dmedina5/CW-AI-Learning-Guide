#!/usr/bin/env bash
# Renders one route in a real browser and asserts each given phrase is painted
# into the DOM. Content checks live here rather than in verify-bundle.mjs
# because a phrase can be in the bundle and still never render (a tab that is
# not the active one, a component that throws on mount).
#
#   bash gas/scripts/check-route-text.sh [--tab Windows|Mac|Linux] [--export-all] <route> <phrase> [<phrase>...]
#
# --tab pre-selects the platform tab the page would otherwise pick from the
# browser's user agent (headless Chrome reads as Windows from WSL and as Mac on
# macOS), so content inside any platform tab can be asserted.
#
# --export-all renders the page the way the document export sees it: every tab
# panel and every quiz answer at once. Use it to assert the export mode itself.
#
# A phrase starting with "!" must NOT be painted, for retired wording that
# should be gone: '!Claude Pro/Max account'.
#
# Exit 0 when every phrase is present (and every "!" phrase absent), 1 otherwise. Needs Chrome (Windows from
# WSL, or macOS), found by chrome.sh.
set -uo pipefail
cd "$(dirname "$0")/.."

tab=""; export_all=""
while [[ "${1:-}" == --* ]]; do
  case "$1" in
    --tab)
      # The value lands inside a perl substitution and inline JavaScript, so
      # only the three tab names PlatformTabs knows are accepted.
      case "${2:-}" in Windows|Mac|Linux) tab="$2" ;; *) echo "--tab must be Windows, Mac or Linux"; exit 1 ;; esac
      shift 2 ;;
    --export-all) export_all="--export-all"; shift ;;
    *) echo "unknown option $1"; exit 1 ;;
  esac
done
route="$1"; shift
source scripts/chrome.sh

CW_PREVIEW_OUT="dist/routecheck.html" node scripts/preview.mjs "$route" $export_all >/dev/null || { echo "BUILD-FAIL $route"; exit 1; }
if [[ -n "$tab" ]]; then
  # localStorage is read on mount, so the choice must be in place before the
  # bundle runs. Same key and JSON shape as useLocalStorage in PlatformTabs.
  # perl rather than sed -i, whose in-place flag differs between GNU and BSD.
  perl -pi -e "s|<head>|<head><script>localStorage.setItem('cw-platform-tab', JSON.stringify('$tab'))</script>|" dist/routecheck.html
fi
# Written to a file rather than a variable: under pipefail, `grep -q` closing
# the pipe early makes the printf feeding it fail, and a real match reads as
# a miss. The file also survives for inspection after a failure.
render_dom dist/routecheck.html > dist/routecheck-dom-raw.html

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
  if [[ "$phrase" == '!'* ]]; then
    if grep -qF -- "${phrase:1}" dist/routecheck-dom.html; then
      printf '  PRESENT %s\n' "${phrase:1}"; fail=1
    else
      printf '  GONE    %s\n' "${phrase:1}"
    fi
  elif grep -qF -- "$phrase" dist/routecheck-dom.html; then
    printf '  OK      %s\n' "$phrase"
  else
    printf '  MISSING %s\n' "$phrase"; fail=1
  fi
done
exit $fail

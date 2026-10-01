# Sourced by the scripts that render routes in a real browser (not meant for
# an interactive shell: it exits when no Chrome is found). Finds a Chrome
# to drive headless and gives them one way to dump a local page's DOM, so the
# Windows (from WSL) and macOS differences live in one place.
#
#   source scripts/chrome.sh
#   render_dom dist/page.html > dist/page-dom.html
#
# Windows Chrome cannot read a WSL path, so on WSL the page is copied into the
# Windows temp folder first. On macOS Chrome reads the file where it is, and
# gets a throwaway profile so it never touches the signed-in one.
#
# On a Mac with no display session (reached over SSH), headless Chrome prints
# the whole DOM and then never exits. So on macOS the dump is read as it is
# written and Chrome is stopped once the closing </html> arrives.

MAC_CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
WIN_CHROME="/mnt/c/Program Files/Google/Chrome/Application/chrome.exe"

if [[ -x "$MAC_CHROME" ]]; then
  CHROME="$MAC_CHROME"; CHROME_HOST=mac
elif [[ -f "$WIN_CHROME" ]]; then
  CHROME="$WIN_CHROME"; CHROME_HOST=wsl
else
  echo "Chrome not found" >&2
  exit 1
fi

render_dom() {
  local src="$1" url profile
  if [[ "$CHROME_HOST" == wsl ]]; then
    local winuser="${WINUSER:-daniel.medina}" name
    name="cw-$(basename "$src")"
    cp "$src" "/mnt/c/Users/$winuser/AppData/Local/Temp/$name"
    url="file:///C:/Users/$winuser/AppData/Local/Temp/$name"
    "$CHROME" --headless --disable-gpu --window-size=1400,2000 \
      --virtual-time-budget=8000 --dump-dom "$url" 2>/dev/null
  else
    url="file://$(cd "$(dirname "$src")" && pwd)/$(basename "$src")"
    profile=$(mktemp -d)
    local out pid i
    out=$(mktemp)
    "$CHROME" --headless --disable-gpu --use-mock-keychain --window-size=1400,2000 \
      --user-data-dir="$profile" --no-first-run --no-default-browser-check \
      --virtual-time-budget=8000 --dump-dom "$url" 2>/dev/null > "$out" &
    pid=$!
    for i in $(seq 1 120); do
      grep -q '</html>' "$out" 2>/dev/null && break
      kill -0 "$pid" 2>/dev/null || break
      sleep 0.25
    done
    # Stop the helpers first, then the browser, by recorded PID only.
    kill $(command pgrep -P "$pid") "$pid" 2>/dev/null
    wait "$pid" 2>/dev/null
    cat "$out"
    rm -rf "$profile" "$out"
  fi
}

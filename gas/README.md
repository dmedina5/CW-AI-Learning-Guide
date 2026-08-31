# Harbor build (Google Apps Script)

A second build target for the same guide. `src/` is shared with the GitHub Pages
build — the 33 page files and 14 interactive components are not duplicated, so a
content edit ships to both sites.

## Why this exists rather than an iframe to the public site

The public site signs viewers in by redirecting to an external service. Browsers
block that redirect inside an embedded frame, so a Harbor page pointed at the
public site would show a sign-in screen that can never finish. Serving from Apps
Script instead means Google verifies the viewer against the Cover Whale domain
before a byte is sent, and the app reads that verified address on the server.

## Commands

```bash
npm run harbor:build     # bundle + verify + package into gas/apps-script/
npm run harbor:smoke     # render every route in a real browser, report painted size
npm run harbor:preview /prompt-builder   # write gas/dist/preview.html for one route
npm run harbor:push      # build, then clasp push
npm run harbor:deploy    # build, push, and cut a new deployment version
node gas/scripts/harbor-pages.mjs        # the 25 Harbor pages and their embed URLs
```

`clasp` needs the Windows credential file on this machine:

```bash
export clasp_config_auth=/mnt/c/Users/daniel.medina/.clasprc.json
```

## How the pieces fit

| Piece | Job |
|---|---|
| `vite.config.ts` | Aliases the four Next.js-specific imports so `src/` builds unchanged |
| `shims/next-link.tsx` | `next/link` → hash-router anchor |
| `shims/next-navigation.ts` | `next/navigation` → hash-router hooks |
| `shims/auth-provider.tsx` | Identity injected by the server, no sign-in step |
| `shims/champion-gate.tsx` | Allowlist decided on the server |
| `?nav=0` | Hides the guide's own sidebar for a given embed (on by default) |
| `src/router.ts` | Hash routing — path routing is unavailable inside the sandbox frame |
| `src/routes.ts` | Route table from `import.meta.glob` over `src/app/**/page.tsx` |
| `scripts/package-apps-script.mjs` | Bundle → `.html` chunks + generated `Config.gs` |
| `apps-script/Code.gs` | `doGet`: verify identity, validate `?page=`, assemble the document |

## Things that will bite you

**Hash routing is not a preference.** Apps Script serves the page inside a
sandboxed frame whose real URL belongs to `googleusercontent.com`. Path routing
cannot work there.

**`executeAs` must be `USER_ACCESSING`.** Under `USER_DEPLOYING`,
`Session.getActiveUser()` returns the *deploying* account, so every viewer would
be reported as Daniel and the Champions section would unlock for everyone.

**`import.meta.glob` must use a relative path.** An absolute `/src/app/**` glob
resolves against Vite's root (`gas/`), matches nothing, and Vite reports that as
a successful build. The first build here produced a bundle with every route
registered and every page empty. `scripts/verify-bundle.mjs` exists to catch
exactly that, and checks page *body* text, because the route list alone cannot
tell the two apart — those strings also live in the nav config and search index.

**Raw JavaScript does not survive an Apps Script project file.** The bundle is
carried as base64 for that reason, not for neatness. Apps Script stores a file as
HTML and re-serializes it on the way out, and it damaged the bundle twice, both
times silently:

| stored as | what came back |
|---|---|
| bare JS | every `<` escaped to `&lt;` — `i<n` became `i&lt;n`, so it stopped being JavaScript |
| JS inside `<script>` | 648,436 characters in, 522,627 out, still ending in a well-formed closing tag |

Base64 gives the parser nothing to recognise. `package-apps-script.mjs` refuses to
emit a chunk containing any character outside the base64 alphabet, because both
failures above produce no error of their own.

To re-check the round-trip after any change to how assets are stored, compare each
file's local sha256 against what the server hands back — a local preview cannot see
this class of damage, since it reads the files straight off disk.

**A new deployment id changes every Harbor URL.** `clasp create-deployment` mints
a new id. To ship a content change without re-editing 25 Harbor pages, update the
*existing* deployment instead of creating one:

```bash
npm run harbor:push
cd gas/apps-script && clasp update-deployment "$(cat ../.deployment)"
```

## Not covered

- The 25 Harbor pages are created by hand. New Google Sites has no API.
- The Champions section's text still ships inside the bundle, as it does on the
  public build. The server decides *access*; it does not withhold the bytes.

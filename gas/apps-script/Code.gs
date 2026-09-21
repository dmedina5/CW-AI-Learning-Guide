/**
 * Cover Whale AI Learning Guide — Harbor edition.
 *
 * Serves the guide as a single HTML document for embedding in The Harbor.
 * Each Harbor page embeds this same web app with ?page= set to the route it
 * should open on, so the 25 content pages deep-link correctly.
 *
 * Identity: this app is deployed to the Cover Whale domain only, so Google has
 * already verified the viewer before doGet runs. The address below is read
 * from that verified session, never from the browser, which is what lets the
 * Champions allowlist be decided here instead of in page JavaScript.
 */

function doGet(e) {
  var params = (e && e.parameter) || {};

  var route = sanitizeRoute_(params.page);
  var embed = params.embed !== '0';
  // The guide's own navigation, on unless explicitly switched off with ?nav=0.
  var showNav = params.nav !== '0';
  var email = activeEmail_();

  var page = renderPage_({
    route: route,
    email: email,
    isChampion: isChampionEmail_(email),
    embed: embed,
    showNav: showNav,
    deploymentId: ScriptApp.getScriptId()
  });

  return HtmlService.createHtmlOutput(page)
    .setTitle('Cover Whale AI Learning Guide')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    // Required for the page to render inside a Harbor embed. Harbor is
    // domain-restricted and this app is too, so the frame is not a public
    // surface; the guide takes no input and performs no state change, which is
    // what makes the clickjacking exposure of ALLOWALL acceptable here.
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .setSandboxMode(HtmlService.SandboxMode.IFRAME);
}

/**
 * The viewer's verified address.
 *
 * getActiveUser() returns an address only for a viewer in the same Workspace
 * domain as the script. That is exactly the population this app is deployed
 * to, so an empty string here means something is misconfigured rather than
 * that an outsider got in — Google would have refused them first.
 */
function activeEmail_() {
  try {
    return (Session.getActiveUser().getEmail() || '').toLowerCase();
  } catch (err) {
    return '';
  }
}

function isChampionEmail_(email) {
  if (!email) return false;
  for (var i = 0; i < CHAMPION_EMAILS.length; i++) {
    if (CHAMPION_EMAILS[i].toLowerCase() === email) return true;
  }
  return false;
}

/**
 * Constrains ?page= to a route this build actually publishes.
 *
 * Whatever comes back is interpolated into a script tag, so an unchecked value
 * here would be a script injection through a query string. Matching against
 * the known route list means nothing outside it can reach the page.
 */
function sanitizeRoute_(raw) {
  if (!raw) return '/';
  var candidate = String(raw).split('#')[0].split('?')[0];
  if (candidate.charAt(0) !== '/') candidate = '/' + candidate;
  if (candidate.length > 1) candidate = candidate.replace(/\/+$/, '');

  for (var i = 0; i < PUBLISHED_ROUTES.length; i++) {
    if (PUBLISHED_ROUTES[i] === candidate) return candidate;
  }
  return '/';
}

/**
 * Reads a project file verbatim.
 *
 * Every asset file carries its own <script> or <style> tag, and the bundle is
 * carried as base64 inside those tags. Both are load-bearing: Apps Script
 * re-serializes a project file as HTML on the way out, which escaped every `<`
 * in raw JS, and then dropped content from the middle even once the JS was
 * wrapped. Base64 gives the parser nothing to act on. See the header of
 * gas/scripts/package-apps-script.mjs for the measurements.
 */
function assetContent_(name) {
  return HtmlService.createHtmlOutputFromFile(name).getContent();
}

function renderPage_(boot) {
  var fonts = '';
  for (var i = 0; i < FONT_URLS.length; i++) {
    fonts += '<link rel="stylesheet" href="' + FONT_URLS[i] + '">';
  }

  var script = '';
  for (var j = 0; j < BUNDLE_CHUNKS.length; j++) {
    script += assetContent_(BUNDLE_CHUNKS[j]);
  }

  return [
    '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    '<title>Cover Whale AI Learning Guide</title>',
    fonts,
    assetContent_('Styles'),
    '<style>html,body{margin:0;padding:0;background:var(--cw-bg,#c3c3d5);}</style>',
    '</head><body>',
    '<div id="root"></div>',
    '<script>window.__CW__=', JSON.stringify(boot), ';</script>',
    script,
    assetContent_('Loader'),
    '</body></html>'
  ].join('');
}

/**
 * True when the page is being rendered for the document export
 * (gas/scripts/export-docx.sh), which needs every tab panel and every quiz
 * answer in the DOM at once so nothing is lost to a click the reader never made.
 *
 * Set only through the boot object the Harbor preview injects
 * (`window.__CW__.exportAll`); the public site never sets it, so the live
 * guides are unaffected.
 */
export function isExportMode(): boolean {
  if (typeof window === 'undefined') return false;
  return Boolean((window as { __CW__?: { exportAll?: boolean } }).__CW__?.exportAll);
}

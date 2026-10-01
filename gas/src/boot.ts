/** Values Code.gs injects into the page before the bundle runs. */
export type BootData = {
  route: string;
  email: string;
  /** Computed on the server against the allowlist — never from the browser. */
  isChampion: boolean;
  /** 1 when rendered inside a Harbor page. Controls frame-height reporting. */
  embed: boolean;
  /**
   * Whether the guide shows its own navigation.
   *
   * On by default, including inside Harbor. Harbor's rail names the 25 pages
   * but cannot move you between sections of the page you are on, or show you
   * where you are within the guide — so the two are not duplicates. Pass
   * ?nav=0 to suppress it.
   */
  showNav: boolean;
  deploymentId: string;
  /**
   * Render every tab panel and quiz answer at once, for the document export
   * (gas/scripts/export-docx.sh). Only the local preview ever sets it.
   */
  exportAll?: boolean;
};

const FALLBACK: BootData = {
  route: '/',
  email: '',
  isChampion: false,
  embed: false,
  showNav: true,
  deploymentId: '',
};

export function boot(): BootData {
  const injected = (window as unknown as { __CW__?: Partial<BootData> }).__CW__;
  return { ...FALLBACK, ...(injected ?? {}) };
}

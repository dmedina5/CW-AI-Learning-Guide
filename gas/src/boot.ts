/** Values Code.gs injects into the page before the bundle runs. */
export type BootData = {
  route: string;
  email: string;
  /** Computed on the server against the allowlist — never from the browser. */
  isChampion: boolean;
  /** 1 when rendered inside a Harbor page, so the guide's own sidebar is hidden. */
  embed: boolean;
  deploymentId: string;
};

const FALLBACK: BootData = {
  route: '/',
  email: '',
  isChampion: false,
  embed: false,
  deploymentId: '',
};

export function boot(): BootData {
  const injected = (window as unknown as { __CW__?: Partial<BootData> }).__CW__;
  return { ...FALLBACK, ...(injected ?? {}) };
}

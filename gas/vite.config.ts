import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

const repoRoot = resolve(__dirname, '..');

/**
 * Apps Script build for The Harbor.
 *
 * Shares src/ with the GitHub Pages build. The aliases below stand in for the
 * four Next.js-specific pieces so none of the 33 page files or 14 interactive
 * components need editing:
 *
 *   next/link        -> hash-router anchor
 *   next/navigation  -> hash-router hooks
 *   AuthProvider     -> Google Workspace identity injected by Code.gs
 *   ChampionGate     -> allowlist decided on the server
 */
export default defineConfig({
  root: __dirname,
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /^@\/components\/auth\/AuthProvider$/,
        replacement: resolve(__dirname, 'shims/auth-provider.tsx'),
      },
      {
        find: /^@\/components\/auth\/ChampionGate$/,
        replacement: resolve(__dirname, 'shims/champion-gate.tsx'),
      },
      { find: /^next\/link$/, replacement: resolve(__dirname, 'shims/next-link.tsx') },
      {
        find: /^next\/navigation$/,
        replacement: resolve(__dirname, 'shims/next-navigation.ts'),
      },
      { find: /^@\//, replacement: repoRoot + '/src/' },
    ],
  },
  css: {
    postcss: repoRoot,
  },
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    // Apps Script serves one HTML document; a code-split bundle would ask for
    // chunk files over paths that do not exist inside the sandbox frame.
    cssCodeSplit: false,
    assetsInlineLimit: 100 * 1024 * 1024,
    modulePreload: { polyfill: false },
    target: 'es2019',
    rollupOptions: {
      input: resolve(__dirname, 'index.html'),
      output: {
        inlineDynamicImports: true,
        entryFileNames: 'app.js',
        assetFileNames: 'app.[ext]',
      },
    },
  },
});

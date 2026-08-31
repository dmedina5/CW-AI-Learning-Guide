/**
 * Application shell for the Apps Script build.
 *
 * Mirrors src/app/layout.tsx.
 *
 * The guide keeps its own navigation inside a Harbor page. That reverses an
 * earlier call to hide it: Harbor's rail lists the 25 pages, but it cannot jump
 * between sections within a page, and it does not show where you are in the
 * guide's own structure. Below the sidebar's breakpoint it collapses to the
 * menu button in the top bar, so a narrow embed loses no width to it.
 */
import { useState, useEffect, useCallback } from 'react';
import '@/styles/globals.css';
import { AuthProvider } from '@/components/auth/AuthProvider';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopBar } from '@/components/layout/TopBar';
import { Footer } from '@/components/layout/Footer';
import { SearchModal } from '@/components/ui/SearchModal';
import { ROUTE_MAP } from './routes';
import { useRoute, navigate } from './router';
import { boot } from './boot';

function NotFound({ path }: { path: string }) {
  return (
    <div className="py-20 text-center">
      <h1 className="mb-3">Page not found</h1>
      <p className="mb-6" style={{ color: 'var(--cw-ink-muted)' }}>
        Nothing is published at <code>{path}</code>.
      </p>
      <button
        onClick={() => navigate('/')}
        className="px-4 py-2 rounded-xl text-sm font-medium"
        style={{ background: 'var(--cw-primary)', color: '#fff' }}
      >
        Back to the guide
      </button>
    </div>
  );
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { path } = useRoute();
  const { embed, showNav } = boot();

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      setSearchOpen(true);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Harbor sizes its embed box itself; tell the parent how tall we actually are
  // so the frame does not clip the page or leave a band of dead space.
  useEffect(() => {
    if (!embed) return;
    const report = () => {
      const height = document.documentElement.scrollHeight;
      try {
        window.parent.postMessage({ type: 'cw-guide-height', height }, '*');
      } catch {
        /* Cross-origin parents may refuse; the fixed box still renders. */
      }
    };
    report();
    const observer = new ResizeObserver(report);
    observer.observe(document.body);
    return () => observer.disconnect();
  }, [embed, path]);

  const Page = ROUTE_MAP.get(path);

  return (
    <AuthProvider>
      <div className="flex min-h-screen">
        {showNav && <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />}

        <div className={`flex-1 min-h-screen flex flex-col ${showNav ? 'lg:ml-72' : ''}`}>
          <TopBar
            onMenuClick={() => setSidebarOpen(true)}
            onSearchClick={() => setSearchOpen(true)}
          />

          <main
            id="cw-scroll-root"
            className="flex-1 px-4 py-8 lg:px-8 lg:py-10 max-w-5xl mx-auto w-full"
          >
            {Page ? <Page /> : <NotFound path={path} />}
          </main>

          <Footer />
        </div>
      </div>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </AuthProvider>
  );
}

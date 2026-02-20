'use client';

import { useState, useEffect, useCallback } from 'react';
import '@/styles/globals.css';
import { AuthProvider } from '@/components/auth/AuthProvider';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopBar } from '@/components/layout/TopBar';
import { Footer } from '@/components/layout/Footer';
import { SearchModal } from '@/components/ui/SearchModal';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Ctrl+K shortcut
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

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Cover Whale AI Learning Guide</title>
        <link rel="icon" href="/images/cover-whale-logo.png" />
      </head>
      <body className="min-h-screen">
        <AuthProvider>
          <div className="flex min-h-screen">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="flex-1 lg:ml-72 min-h-screen flex flex-col">
              <TopBar
                onMenuClick={() => setSidebarOpen(true)}
                onSearchClick={() => setSearchOpen(true)}
              />

              <main className="flex-1 px-4 py-8 lg:px-8 lg:py-10 max-w-5xl mx-auto w-full">
                {children}
              </main>

              <Footer />
            </div>
          </div>

          <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
        </AuthProvider>
      </body>
    </html>
  );
}

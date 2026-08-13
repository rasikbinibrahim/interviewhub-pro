import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/shared/hooks/redux';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

// This shell's <main> is the real scrolling container (fixed h-svh height
// + overflow-y-auto here, not the window) — react-router-dom's built-in
// <ScrollRestoration>, which only tracks window scroll, would be a no-op
// in this layout. Restore scroll on <main> itself instead, keyed by each
// history entry's unique location.key, so navigating into a question and
// back returns the list to the exact scroll position it was left at.
const scrollPositions = new Map<string, number>();

export function AppShell() {
  const theme = useAppSelector((state) => state.ui.theme);
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;

    main.scrollTop = scrollPositions.get(location.key) ?? 0;

    function handleScroll() {
      if (main) scrollPositions.set(location.key, main.scrollTop);
    }

    main.addEventListener('scroll', handleScroll, { passive: true });
    return () => main.removeEventListener('scroll', handleScroll);
  }, [location.key]);

  return (
    <div className="flex h-svh w-full overflow-hidden">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />
        <main ref={mainRef} className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

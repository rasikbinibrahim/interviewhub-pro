import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Moon, Sun, Search } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux';
import { toggleTheme } from '@/store/slices/uiSlice';

export function TopBar() {
  const theme = useAppSelector((state) => state.ui.theme);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  function handleSearchSubmit(e: FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/practice?search=${encodeURIComponent(query.trim())}`);
  }

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border bg-surface px-4">
      <form onSubmit={handleSearchSubmit} className="relative max-w-xs flex-1">
        <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search problems…"
          className="w-full rounded-md border border-border bg-surface-raised py-1.5 pl-8 pr-3 text-sm outline-none focus:border-brand"
        />
      </form>

      <div className="ml-auto flex items-center gap-2">
        <button
          onClick={() => dispatch(toggleTheme())}
          className="flex h-8 w-8 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-surface-raised hover:text-text-primary"
          aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </header>
  );
}

import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Code2, Star, RotateCcw, Settings, type LucideIcon } from 'lucide-react';
import { useAppSelector } from '@/shared/hooks/redux';
import { selectDueRevisions, selectBookmarkedIds } from '@/shared/selectors/progressSelectors';

interface NavItem {
  label: string;
  to?: string; // omitted => not yet implemented
  icon: LucideIcon;
  count?: number;
}

export function Sidebar() {
  const dueRevisionCount = useAppSelector(selectDueRevisions).length;
  const bookmarkCount = useAppSelector(selectBookmarkedIds).length;

  // Every item from the product vision is listed here (so the intended
  // information architecture is visible), but only routes that are
  // actually implemented get a `to` — the rest render disabled rather
  // than linking to an empty/broken page. See PROGRESS.md's
  // Implementation Phases for what's still pending.
  const navItems: NavItem[] = [
    { label: 'Dashboard', to: '/', icon: LayoutDashboard },
    { label: 'Practice', to: '/practice', icon: Code2 },
    { label: 'Bookmarks', to: '/bookmarks', icon: Star, ...(bookmarkCount > 0 && { count: bookmarkCount }) },
    { label: 'Revision', to: '/revision', icon: RotateCcw, ...(dueRevisionCount > 0 && { count: dueRevisionCount }) },
    { label: 'Settings', to: '/settings', icon: Settings },
  ];

  return (
    <aside className="flex h-svh w-64 shrink-0 flex-col border-r border-border bg-surface p-4">
      <div className="mb-6 flex items-center gap-2 px-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/15 text-brand">
          <Code2 size={18} />
        </div>
        <div>
          <div className="text-sm font-bold leading-tight">InterviewHub Pro</div>
          <div className="text-[11px] text-text-secondary">Frontend interview prep</div>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;

          if (!item.to) {
            return (
              <div
                key={item.label}
                className="flex cursor-not-allowed items-center gap-3 rounded-md px-3 py-2 text-sm text-text-secondary/50"
                title="Not implemented yet — see PROGRESS.md"
              >
                <Icon size={16} />
                <span className="flex-1">{item.label}</span>
                <span className="text-[10px] uppercase tracking-wide">Soon</span>
              </div>
            );
          }

          return (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-brand/10 text-brand'
                    : 'text-text-secondary hover:bg-surface-raised hover:text-text-primary'
                }`
              }
            >
              <Icon size={16} />
              <span className="flex-1">{item.label}</span>
              {item.count !== undefined && (
                <span className="rounded-full bg-brand/15 px-1.5 py-0.5 text-[10px] font-bold text-brand">
                  {item.count}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

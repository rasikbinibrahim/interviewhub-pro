import { useState } from 'react';
import { Moon, Sun, Trash2, Download } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux';
import { toggleTheme } from '@/store/slices/uiSlice';
import { resetProgress } from '@/store/slices/progressSlice';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';

export function SettingsPage() {
  const theme = useAppSelector((state) => state.ui.theme);
  const progress = useAppSelector((state) => state.progress);
  const dispatch = useAppDispatch();
  const [confirmingReset, setConfirmingReset] = useState(false);

  function handleExport() {
    const blob = new Blob([JSON.stringify(progress, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'interviewhub-progress.json';
    link.click();
    URL.revokeObjectURL(url);
  }

  function handleConfirmReset() {
    dispatch(resetProgress());
    setConfirmingReset(false);
  }

  return (
    <div className="mx-auto max-w-2xl p-8">
      <h1 className="text-2xl font-bold">Settings</h1>
      <p className="mt-1 text-sm text-text-secondary">
        All settings and progress here are stored locally in this browser — see{' '}
        <code className="rounded bg-surface-raised px-1 py-0.5 text-xs">PROGRESS.md</code> for when
        account-based sync lands.
      </p>

      <section className="mt-6 rounded-xl border border-border bg-surface p-5">
        <h2 className="text-sm font-bold">Appearance</h2>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm text-text-secondary">Theme</span>
          <div className="flex overflow-hidden rounded-md border border-border">
            <button
              onClick={() => theme !== 'dark' && dispatch(toggleTheme())}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium ${
                theme === 'dark' ? 'bg-brand text-white' : 'text-text-secondary hover:bg-surface-raised'
              }`}
            >
              <Moon size={14} /> Dark
            </button>
            <button
              onClick={() => theme !== 'light' && dispatch(toggleTheme())}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium ${
                theme === 'light' ? 'bg-brand text-white' : 'text-text-secondary hover:bg-surface-raised'
              }`}
            >
              <Sun size={14} /> Light
            </button>
          </div>
        </div>
      </section>

      <section className="mt-4 rounded-xl border border-border bg-surface p-5">
        <h2 className="text-sm font-bold">Your data</h2>
        <p className="mt-1 text-xs text-text-secondary">
          {progress.solvedRecords.length} solved · {progress.attemptedRecords.length} attempted ·{' '}
          {progress.bookmarkedIds.length} bookmarked
        </p>
        <div className="mt-3 flex gap-2">
          <Button variant="secondary" onClick={handleExport}>
            <Download size={14} /> Export as JSON
          </Button>
          <Button variant="danger" onClick={() => setConfirmingReset(true)}>
            <Trash2 size={14} /> Reset progress
          </Button>
        </div>
      </section>

      <Modal open={confirmingReset} title="Reset all progress?" onClose={() => setConfirmingReset(false)}>
        <p className="text-sm text-text-secondary">
          This clears every solved, attempted, and bookmarked question stored in this browser.
          This cannot be undone — export your data first if you want to keep a copy.
        </p>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setConfirmingReset(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmReset}>
            Reset everything
          </Button>
        </div>
      </Modal>
    </div>
  );
}

// Local-only progress tracking, persisted to localStorage.
//
// This is explicitly a stand-in for Phase 9 (Progress System) in
// PROGRESS.md's Implementation Phases table, which depends on Phase 1
// (Authentication) and Phase 2 (Database) — neither exists yet. When
// those land, this slice's reducers stay the same shape but get backed
// by RTK Query mutations against POST /me/progress (per API_GUIDE.md)
// instead of localStorage, and cross-device sync becomes real.
//
// Solve/attempt timestamps are real (not fabricated) — they're what
// power the streak, "recent problems", and revision-schedule features
// in the Dashboard/Revision pages. Nothing derived from them is faked.

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface TimestampedRecord {
  questionId: string;
  at: string; // ISO 8601
}

interface ProgressState {
  solvedRecords: TimestampedRecord[];
  attemptedRecords: TimestampedRecord[];
  bookmarkedIds: string[];
}

const STORAGE_KEY = 'interviewhub_progress_v2';
const LEGACY_STORAGE_KEY = 'interviewhub_progress_v1';

interface LegacyProgressState {
  solvedIds?: string[];
  attemptedIds?: string[];
  bookmarkedIds?: string[];
}

function emptyState(): ProgressState {
  return { solvedRecords: [], attemptedRecords: [], bookmarkedIds: [] };
}

function migrateLegacyState(): ProgressState | null {
  try {
    const raw = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (!raw) return null;
    const legacy = JSON.parse(raw) as LegacyProgressState;
    const now = new Date().toISOString();
    return {
      solvedRecords: (legacy.solvedIds ?? []).map((questionId) => ({ questionId, at: now })),
      attemptedRecords: (legacy.attemptedIds ?? []).map((questionId) => ({ questionId, at: now })),
      bookmarkedIds: legacy.bookmarkedIds ?? [],
    };
  } catch {
    return null;
  }
}

function loadInitialState(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<ProgressState>;
      return {
        solvedRecords: parsed.solvedRecords ?? [],
        attemptedRecords: parsed.attemptedRecords ?? [],
        bookmarkedIds: parsed.bookmarkedIds ?? [],
      };
    }
    // One-time migration from the previous (untimestamped) shape, so
    // existing local progress isn't silently discarded.
    const migrated = migrateLegacyState();
    if (migrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
      return migrated;
    }
    return emptyState();
  } catch {
    return emptyState();
  }
}

function persist(state: ProgressState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

const progressSlice = createSlice({
  name: 'progress',
  initialState: loadInitialState(),
  reducers: {
    markAttempted(state, action: PayloadAction<string>) {
      const id = action.payload;
      if (!state.attemptedRecords.some((r) => r.questionId === id)) {
        state.attemptedRecords.push({ questionId: id, at: new Date().toISOString() });
      }
      persist(state);
    },
    markSolved(state, action: PayloadAction<string>) {
      const id = action.payload;
      if (!state.solvedRecords.some((r) => r.questionId === id)) {
        state.solvedRecords.push({ questionId: id, at: new Date().toISOString() });
      }
      persist(state);
    },
    toggleBookmark(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.bookmarkedIds = state.bookmarkedIds.includes(id)
        ? state.bookmarkedIds.filter((existing) => existing !== id)
        : [...state.bookmarkedIds, id];
      persist(state);
    },
    resetProgress() {
      const fresh = emptyState();
      persist(fresh);
      return fresh;
    },
  },
});

export const { markAttempted, markSolved, toggleBookmark, resetProgress } = progressSlice.actions;
export default progressSlice.reducer;

// Shared test-only store factory — the real reducers (progress, ui,
// questionsApi) wired together exactly like the production store in
// `src/store/index.ts`, but allowing a preloaded state so tests can
// seed progress/bookmarks without dispatching a long setup sequence.
// Reused by any test that needs a real Redux Provider (integration
// tests, component tests) instead of an isolated reducer function.

import { configureStore } from '@reduxjs/toolkit';
import { questionsApi } from '@/store/api/questionsApi';
import uiReducer, { type Theme } from '@/store/slices/uiSlice';
import progressReducer, { type TimestampedRecord } from '@/store/slices/progressSlice';

export interface TestPreloadedState {
  ui?: { theme: Theme; sidebarCollapsed: boolean };
  progress?: {
    solvedRecords: TimestampedRecord[];
    attemptedRecords: TimestampedRecord[];
    bookmarkedIds: string[];
  };
}

const DEFAULT_UI_STATE: { theme: Theme; sidebarCollapsed: boolean } = {
  theme: 'dark',
  sidebarCollapsed: false,
};

const DEFAULT_PROGRESS_STATE = {
  solvedRecords: [] as TimestampedRecord[],
  attemptedRecords: [] as TimestampedRecord[],
  bookmarkedIds: [] as string[],
};

export function createTestStore(preloadedState?: TestPreloadedState) {
  return configureStore({
    reducer: {
      ui: uiReducer,
      progress: progressReducer,
      [questionsApi.reducerPath]: questionsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(questionsApi.middleware),
    preloadedState: {
      ui: preloadedState?.ui ?? DEFAULT_UI_STATE,
      progress: preloadedState?.progress ?? DEFAULT_PROGRESS_STATE,
    },
  });
}

export type TestStore = ReturnType<typeof createTestStore>;

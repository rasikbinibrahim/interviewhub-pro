import { describe, it, expect, beforeEach, vi } from 'vitest';
import progressReducer, { markAttempted, markSolved, toggleBookmark, resetProgress } from './progressSlice';

const STORAGE_KEY = 'interviewhub_progress_v2';
const LEGACY_STORAGE_KEY = 'interviewhub_progress_v1';

const EMPTY_STATE = { solvedRecords: [], attemptedRecords: [], bookmarkedIds: [] };

describe('progressSlice reducers', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('markSolved adds a timestamped record', () => {
    const next = progressReducer(EMPTY_STATE, markSolved('q1'));
    expect(next.solvedRecords).toHaveLength(1);
    expect(next.solvedRecords[0]?.questionId).toBe('q1');
    expect(new Date(next.solvedRecords[0]!.at).toString()).not.toBe('Invalid Date');
  });

  it('markSolved is idempotent — solving the same question twice does not duplicate it', () => {
    const once = progressReducer(EMPTY_STATE, markSolved('q1'));
    const twice = progressReducer(once, markSolved('q1'));
    expect(twice.solvedRecords).toHaveLength(1);
  });

  it('markAttempted adds a timestamped record independently of solved state', () => {
    const next = progressReducer(EMPTY_STATE, markAttempted('q1'));
    expect(next.attemptedRecords).toHaveLength(1);
    expect(next.solvedRecords).toHaveLength(0);
  });

  it('toggleBookmark adds then removes on repeated calls', () => {
    const added = progressReducer(EMPTY_STATE, toggleBookmark('q1'));
    expect(added.bookmarkedIds).toEqual(['q1']);

    const removed = progressReducer(added, toggleBookmark('q1'));
    expect(removed.bookmarkedIds).toEqual([]);
  });

  it('resetProgress clears all three categories', () => {
    let state = progressReducer(EMPTY_STATE, markSolved('q1'));
    state = progressReducer(state, markAttempted('q2'));
    state = progressReducer(state, toggleBookmark('q3'));

    const reset = progressReducer(state, resetProgress());
    expect(reset).toEqual(EMPTY_STATE);
  });

  it('persists state to localStorage after every mutating action', () => {
    progressReducer(EMPTY_STATE, markSolved('q1'));
    const raw = localStorage.getItem(STORAGE_KEY);
    expect(raw).not.toBeNull();
    expect(JSON.parse(raw!).solvedRecords).toHaveLength(1);
  });
});

describe('progressSlice module initialization (persistence + migration)', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.resetModules();
  });

  it('starts empty with no stored state', async () => {
    const fresh = await import('./progressSlice');
    const state = fresh.default(undefined, { type: '@@INIT' });
    expect(state).toEqual(EMPTY_STATE);
  });

  it('restores state from localStorage on reload (simulated via fresh module import)', async () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ solvedRecords: [{ questionId: 'q1', at: '2024-01-01T00:00:00.000Z' }], attemptedRecords: [], bookmarkedIds: [] })
    );

    const fresh = await import('./progressSlice');
    const state = fresh.default(undefined, { type: '@@INIT' });
    expect(state.solvedRecords).toEqual([{ questionId: 'q1', at: '2024-01-01T00:00:00.000Z' }]);
  });

  it('migrates the legacy (untimestamped) v1 shape into v2 on first load, without losing data', async () => {
    localStorage.setItem(
      LEGACY_STORAGE_KEY,
      JSON.stringify({ solvedIds: ['q1', 'q2'], attemptedIds: ['q1', 'q2', 'q3'], bookmarkedIds: ['q2'] })
    );

    const fresh = await import('./progressSlice');
    const state = fresh.default(undefined, { type: '@@INIT' });

    expect(state.solvedRecords.map((r: { questionId: string }) => r.questionId)).toEqual(['q1', 'q2']);
    expect(state.attemptedRecords.map((r: { questionId: string }) => r.questionId)).toEqual(['q1', 'q2', 'q3']);
    expect(state.bookmarkedIds).toEqual(['q2']);

    // Migration should have written the new-shape key so it isn't re-migrated every load.
    expect(localStorage.getItem(STORAGE_KEY)).not.toBeNull();
  });
});

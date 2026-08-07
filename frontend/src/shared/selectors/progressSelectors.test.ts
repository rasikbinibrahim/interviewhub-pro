import { describe, it, expect } from 'vitest';
import type { RootState } from '@/store';
import type { TimestampedRecord } from '@/store/slices/progressSlice';
import {
  selectSolvedIds,
  selectIsSolved,
  selectBookmarkedIds,
  selectCurrentStreak,
  selectRevisionSchedule,
  selectDueRevisions,
} from './progressSelectors';

const DAY_MS = 24 * 60 * 60 * 1000;

function daysAgo(n: number): string {
  return new Date(Date.now() - n * DAY_MS).toISOString();
}

function buildState(overrides: {
  solvedRecords?: TimestampedRecord[];
  attemptedRecords?: TimestampedRecord[];
  bookmarkedIds?: string[];
}): RootState {
  return {
    progress: {
      solvedRecords: overrides.solvedRecords ?? [],
      attemptedRecords: overrides.attemptedRecords ?? [],
      bookmarkedIds: overrides.bookmarkedIds ?? [],
    },
  } as unknown as RootState;
}

describe('selectSolvedIds / selectIsSolved / selectBookmarkedIds', () => {
  it('extracts question ids from timestamped records', () => {
    const state = buildState({ solvedRecords: [{ questionId: 'q1', at: daysAgo(0) }] });
    expect(selectSolvedIds(state)).toEqual(['q1']);
    expect(selectIsSolved(state, 'q1')).toBe(true);
    expect(selectIsSolved(state, 'q2')).toBe(false);
  });

  it('returns bookmarked ids as-is', () => {
    const state = buildState({ bookmarkedIds: ['q1', 'q2'] });
    expect(selectBookmarkedIds(state)).toEqual(['q1', 'q2']);
  });
});

describe('selectCurrentStreak', () => {
  it('returns 0 with no solved records', () => {
    expect(selectCurrentStreak(buildState({}))).toBe(0);
  });

  it('returns 1 when only solved today', () => {
    const state = buildState({ solvedRecords: [{ questionId: 'q1', at: daysAgo(0) }] });
    expect(selectCurrentStreak(state)).toBe(1);
  });

  it('counts consecutive days including today', () => {
    const state = buildState({
      solvedRecords: [
        { questionId: 'q1', at: daysAgo(0) },
        { questionId: 'q2', at: daysAgo(1) },
        { questionId: 'q3', at: daysAgo(2) },
      ],
    });
    expect(selectCurrentStreak(state)).toBe(3);
  });

  it('still counts the streak if today has no solve yet but yesterday does', () => {
    const state = buildState({
      solvedRecords: [
        { questionId: 'q1', at: daysAgo(1) },
        { questionId: 'q2', at: daysAgo(2) },
      ],
    });
    expect(selectCurrentStreak(state)).toBe(2);
  });

  it('breaks the streak on a gap (nothing today or yesterday)', () => {
    const state = buildState({ solvedRecords: [{ questionId: 'q1', at: daysAgo(3) }] });
    expect(selectCurrentStreak(state)).toBe(0);
  });

  it('does not double-count multiple solves on the same day', () => {
    const state = buildState({
      solvedRecords: [
        { questionId: 'q1', at: daysAgo(0) },
        { questionId: 'q2', at: daysAgo(0) },
        { questionId: 'q3', at: daysAgo(0) },
      ],
    });
    expect(selectCurrentStreak(state)).toBe(1);
  });

  it('stops counting at the first gap further back', () => {
    // solved today, yesterday, then a gap, then 4 days ago — streak should stop at 2
    const state = buildState({
      solvedRecords: [
        { questionId: 'q1', at: daysAgo(0) },
        { questionId: 'q2', at: daysAgo(1) },
        { questionId: 'q3', at: daysAgo(4) },
      ],
    });
    expect(selectCurrentStreak(state)).toBe(2);
  });
});

describe('selectRevisionSchedule / selectDueRevisions', () => {
  it('is not due yet just after solving (before the 1-day interval elapses)', () => {
    const state = buildState({ solvedRecords: [{ questionId: 'q1', at: daysAgo(0.1) }] });
    const [item] = selectRevisionSchedule(state);
    expect(item?.stage).toBe(0);
    expect(item?.overdueByDays).toBeLessThan(0);
    expect(selectDueRevisions(state)).toHaveLength(0);
  });

  it('is due at stage 0 once 1 day has elapsed', () => {
    const state = buildState({ solvedRecords: [{ questionId: 'q1', at: daysAgo(1) }] });
    const due = selectDueRevisions(state);
    expect(due).toHaveLength(1);
    expect(due[0]?.stage).toBe(0);
    expect(due[0]?.overdueByDays).toBe(0);
  });

  it('advances to the correct stage for a longer gap (10 days -> stage 2 / the 7-day interval)', () => {
    const state = buildState({ solvedRecords: [{ questionId: 'q1', at: daysAgo(10) }] });
    const [item] = selectRevisionSchedule(state);
    expect(item?.stage).toBe(2); // index of 7 in [1,3,7,15,30]
    expect(item?.overdueByDays).toBe(3); // 10 days elapsed - 7 day interval
  });

  it('caps at the final stage (40 days -> stage 4 / the 30-day interval)', () => {
    const state = buildState({ solvedRecords: [{ questionId: 'q1', at: daysAgo(40) }] });
    const [item] = selectRevisionSchedule(state);
    expect(item?.stage).toBe(4); // index of 30 in [1,3,7,15,30]
    expect(item?.overdueByDays).toBe(10);
  });

  it('sorts due revisions with the most overdue first', () => {
    const state = buildState({
      solvedRecords: [
        { questionId: 'slightly-overdue', at: daysAgo(2) },
        { questionId: 'very-overdue', at: daysAgo(10) },
      ],
    });
    const due = selectDueRevisions(state);
    expect(due.map((item) => item.questionId)).toEqual(['very-overdue', 'slightly-overdue']);
  });
});

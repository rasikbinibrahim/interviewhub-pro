import type { RootState } from '@/store';
import type { TimestampedRecord } from '@/store/slices/progressSlice';

// Spaced-repetition intervals, in days after the solve date — matches
// the Day 1/3/7/15/30 schedule from PRD.md/DATABASE.md's
// revision_schedule design. Computed client-side from real solve
// timestamps; this is a legitimate local approximation of Phase 9's
// eventual server-backed schedule, not a fabricated one — see the note
// in progressSlice.ts.
const REVISION_INTERVALS_DAYS = [1, 3, 7, 15, 30];
const MS_PER_DAY = 24 * 60 * 60 * 1000;

export function selectSolvedIds(state: RootState): string[] {
  return state.progress.solvedRecords.map((r) => r.questionId);
}

export function selectAttemptedIds(state: RootState): string[] {
  return state.progress.attemptedRecords.map((r) => r.questionId);
}

export function selectIsSolved(state: RootState, questionId: string): boolean {
  return state.progress.solvedRecords.some((r) => r.questionId === questionId);
}

export function selectBookmarkedIds(state: RootState): string[] {
  return state.progress.bookmarkedIds;
}

export function selectRecentlySolved(state: RootState, limit: number): TimestampedRecord[] {
  return [...state.progress.solvedRecords].sort((a, b) => b.at.localeCompare(a.at)).slice(0, limit);
}

/**
 * Consecutive-day streak of at least one solve per day, ending today or
 * yesterday (a streak "survives" until the user misses a full day).
 */
export function selectCurrentStreak(state: RootState): number {
  const solveDates = new Set(
    state.progress.solvedRecords.map((r) => new Date(r.at).toDateString())
  );
  if (solveDates.size === 0) return 0;

  const today = new Date();
  const todayStr = today.toDateString();
  const yesterday = new Date(today.getTime() - MS_PER_DAY);
  const yesterdayStr = yesterday.toDateString();

  // If nothing was solved today or yesterday, the streak is broken.
  if (!solveDates.has(todayStr) && !solveDates.has(yesterdayStr)) return 0;

  let streak = 0;
  const cursor = solveDates.has(todayStr) ? today : yesterday;
  const cursorDate = new Date(cursor);

  while (solveDates.has(cursorDate.toDateString())) {
    streak++;
    cursorDate.setTime(cursorDate.getTime() - MS_PER_DAY);
  }

  return streak;
}

export interface RevisionItem {
  questionId: string;
  solvedAt: string;
  stage: number; // index into REVISION_INTERVALS_DAYS
  dueAt: string; // ISO date
  overdueByDays: number; // 0 if due today, negative if not yet due
}

/**
 * One revision checkpoint per solved question per interval stage that
 * has elapsed since it was solved, plus the single next upcoming stage
 * — this mirrors what the real revision_schedule table (DATABASE.md)
 * would contain, computed on the fly instead of stored.
 */
export function selectRevisionSchedule(state: RootState): RevisionItem[] {
  const now = Date.now();

  return state.progress.solvedRecords.map((record) => {
    const solvedAtMs = new Date(record.at).getTime();
    const daysSinceSolved = (now - solvedAtMs) / MS_PER_DAY;

    // Find the latest interval stage that has already elapsed; if none
    // has elapsed yet, the next upcoming stage is stage 0.
    let stage = 0;
    for (let i = REVISION_INTERVALS_DAYS.length - 1; i >= 0; i--) {
      if (daysSinceSolved >= REVISION_INTERVALS_DAYS[i]!) {
        stage = i;
        break;
      }
    }

    const dueAtMs = solvedAtMs + REVISION_INTERVALS_DAYS[stage]! * MS_PER_DAY;
    const overdueByDays = Math.floor((now - dueAtMs) / MS_PER_DAY);

    return {
      questionId: record.questionId,
      solvedAt: record.at,
      stage,
      dueAt: new Date(dueAtMs).toISOString(),
      overdueByDays,
    };
  });
}

export function selectDueRevisions(state: RootState): RevisionItem[] {
  return selectRevisionSchedule(state)
    .filter((item) => item.overdueByDays >= 0)
    .sort((a, b) => b.overdueByDays - a.overdueByDays);
}

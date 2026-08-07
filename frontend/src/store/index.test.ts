// Integration test: the real configured store (not an isolated reducer)
// wired through to the real selectors, crossing the slice + store +
// selector boundary in one test — per CLAUDE.md's "integration tests
// where a feature crosses a real boundary" requirement.

import { describe, it, expect, beforeEach } from 'vitest';
import { questionsApi } from './api/questionsApi';
import { markSolved, toggleBookmark } from './slices/progressSlice';
import { selectSolvedIds, selectIsSolved, selectBookmarkedIds } from '@/shared/selectors/progressSelectors';
import { MOCK_QUESTIONS } from '@/mocks/questions';
import { createTestStore } from '@/test/testStore';

describe('store integration', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('reflects a dispatched markSolved action through the real selectors', () => {
    const store = createTestStore();
    const questionId = MOCK_QUESTIONS[0]!.detail.id;

    expect(selectIsSolved(store.getState(), questionId)).toBe(false);

    store.dispatch(markSolved(questionId));

    expect(selectIsSolved(store.getState(), questionId)).toBe(true);
    expect(selectSolvedIds(store.getState())).toContain(questionId);
  });

  it('resolves the mock RTK Query API against the real store and mock data', async () => {
    const store = createTestStore();

    const result = await store.dispatch(questionsApi.endpoints.getQuestions.initiate());
    expect(result.data).toBeDefined();
    expect(result.data).toHaveLength(MOCK_QUESTIONS.length);
    expect(result.data?.map((q) => q.title)).toContain('Two Sum');
  });

  it('the mock API filter and the progress slice compose correctly (a solved question is still returned by the filtered list)', async () => {
    const store = createTestStore();
    const target = MOCK_QUESTIONS.find((q) => q.detail.difficulty === 'Easy')!;

    store.dispatch(markSolved(target.detail.id));
    store.dispatch(toggleBookmark(target.detail.id));

    const result = await store.dispatch(
      questionsApi.endpoints.getQuestions.initiate({ difficulty: 'Easy' })
    );

    const found = result.data?.find((q) => q.id === target.detail.id);
    expect(found).toBeDefined();
    expect(selectIsSolved(store.getState(), target.detail.id)).toBe(true);
    expect(selectBookmarkedIds(store.getState())).toContain(target.detail.id);
  });
});

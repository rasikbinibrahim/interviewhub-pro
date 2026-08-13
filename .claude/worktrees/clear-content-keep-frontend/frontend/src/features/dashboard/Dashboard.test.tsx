import { describe, it, expect } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '@/test/renderWithProviders';
import { Dashboard } from './Dashboard';
import { MOCK_QUESTIONS } from '@/mocks/questions';

const DAY_MS = 24 * 60 * 60 * 1000;
function daysAgo(n: number): string {
  return new Date(Date.now() - n * DAY_MS).toISOString();
}

const TOTAL_QUESTIONS = MOCK_QUESTIONS.length;

describe('Dashboard', () => {
  it('shows a loading skeleton before question data resolves', () => {
    renderWithProviders(<Dashboard />);
    expect(screen.queryByText(/welcome back/i)).not.toBeInTheDocument();
  });

  it('shows 0% overall progress and no streak with no history', async () => {
    renderWithProviders(<Dashboard />);
    await waitFor(() => expect(screen.getByText(/welcome back/i)).toBeInTheDocument());

    expect(screen.getByText(`Solved 0 / ${TOTAL_QUESTIONS}`)).toBeInTheDocument();
    expect(screen.getByText('Keep going')).toBeInTheDocument();
  });

  it('reflects a solved question in overall progress and recommends the next unsolved one', async () => {
    const solvedId = MOCK_QUESTIONS[0]!.detail.id;
    renderWithProviders(<Dashboard />, {
      preloadedState: {
        progress: {
          solvedRecords: [{ questionId: solvedId, at: daysAgo(0) }],
          attemptedRecords: [],
          bookmarkedIds: [],
        },
      },
    });

    await waitFor(() => expect(screen.getByText(`Solved 1 / ${TOTAL_QUESTIONS}`)).toBeInTheDocument());
    // "Continue learning" should point at the next unsolved question, not the one just solved.
    const nextQuestion = MOCK_QUESTIONS.find((q) => q.detail.id !== solvedId)!;
    expect(screen.getByText(nextQuestion.detail.title)).toBeInTheDocument();
  });

  it('shows the current streak once something was solved today and yesterday', async () => {
    renderWithProviders(<Dashboard />, {
      preloadedState: {
        progress: {
          solvedRecords: [
            { questionId: MOCK_QUESTIONS[0]!.detail.id, at: daysAgo(0) },
            { questionId: MOCK_QUESTIONS[1]!.detail.id, at: daysAgo(1) },
          ],
          attemptedRecords: [],
          bookmarkedIds: [],
        },
      },
    });

    await waitFor(() => expect(screen.getByText('2-day streak')).toBeInTheDocument());
  });

  it('lists recently solved questions', async () => {
    const solved = MOCK_QUESTIONS[0]!.detail;
    renderWithProviders(<Dashboard />, {
      preloadedState: {
        progress: {
          solvedRecords: [{ questionId: solved.id, at: daysAgo(0) }],
          attemptedRecords: [],
          bookmarkedIds: [],
        },
      },
    });

    await waitFor(() => expect(screen.getByText('Recent problems')).toBeInTheDocument());
    // Appears once in "recent problems" and once as a solved item elsewhere is fine;
    // just confirm it's present in the recent-problems section specifically.
    const recentSection = screen.getByText('Recent problems').closest('div')!.parentElement!;
    expect(recentSection.textContent).toContain(solved.title);
  });

  it('surfaces a category as a weak topic once it has an attempted-but-unsolved question', async () => {
    const attempted = MOCK_QUESTIONS.find((q) => q.detail.category === 'arrays')!.detail;
    renderWithProviders(<Dashboard />, {
      preloadedState: {
        progress: {
          solvedRecords: [],
          attemptedRecords: [{ questionId: attempted.id, at: daysAgo(0) }],
          bookmarkedIds: [],
        },
      },
    });

    await waitFor(() => expect(screen.getByText('Weak topics')).toBeInTheDocument());
    expect(screen.getByText('arrays')).toBeInTheDocument();
    expect(screen.getByText('1 to revisit')).toBeInTheDocument();
  });

  it('does not count a question as a weak topic once it has been solved', async () => {
    const question = MOCK_QUESTIONS[0]!.detail;
    renderWithProviders(<Dashboard />, {
      preloadedState: {
        progress: {
          solvedRecords: [{ questionId: question.id, at: daysAgo(0) }],
          attemptedRecords: [{ questionId: question.id, at: daysAgo(0) }],
          bookmarkedIds: [],
        },
      },
    });

    await waitFor(() => expect(screen.getByText('Weak topics')).toBeInTheDocument());
    expect(screen.getByText(/attempt a few questions to see this|no weak spots/i)).toBeInTheDocument();
  });

  it('shows an upcoming-revision count once a solved question is due', async () => {
    const solved = MOCK_QUESTIONS[0]!.detail;
    renderWithProviders(<Dashboard />, {
      preloadedState: {
        progress: {
          solvedRecords: [{ questionId: solved.id, at: daysAgo(10) }],
          attemptedRecords: [],
          bookmarkedIds: [],
        },
      },
    });

    await waitFor(() => expect(screen.getByText('Upcoming revision')).toBeInTheDocument());
    // The count is in a nested <span>, so the full sentence isn't any
    // single node's own text — getByText's default matcher won't combine
    // text across that boundary. Match against the paragraph's full
    // textContent instead.
    expect(
      screen.getByText((_, el) => el?.tagName === 'P' && /1 question.*due for review/i.test(el.textContent ?? ''))
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /go to revision/i })).toHaveAttribute('href', '/revision');
  });
});

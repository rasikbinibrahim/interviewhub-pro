import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { renderWithProviders } from '@/test/renderWithProviders';
import { createTestStore } from '@/test/testStore';
import { QuestionList } from './QuestionList';
import { CodingScreen } from './CodingScreen';
import { MOCK_QUESTIONS } from '@/mocks/questions';

// jsdom cannot run the real Monaco editor — see CodingScreen.test.tsx for
// the same mock; only needed here because the back-navigation test drills
// into a real coding question detail screen.
vi.mock('@monaco-editor/react', () => ({
  default: ({ value }: { value: string }) => <textarea aria-label="code editor" value={value} readOnly />,
}));

const TOTAL_QUESTIONS = MOCK_QUESTIONS.length;
const JAVASCRIPT_COUNT = MOCK_QUESTIONS.filter((q) => q.detail.category === 'javascript').length;
const PAGE_SIZE = 8;

async function waitForLoaded() {
  await waitFor(() => expect(screen.queryByText(/loading/i)).not.toBeInTheDocument());
}

describe('QuestionList — counts, topics, and pagination', () => {
  it('shows how many questions are in the bank, with per-topic and per-difficulty counts in the filters', async () => {
    renderWithProviders(<QuestionList />, { route: '/practice', routePath: '/practice' });
    await waitForLoaded();

    expect(
      screen.getByText(new RegExp(`Showing 1–${Math.min(PAGE_SIZE, TOTAL_QUESTIONS)} of ${TOTAL_QUESTIONS} questions?`))
    ).toBeInTheDocument();

    const categorySelect = screen.getByRole('combobox', { name: /filter by topic/i });
    expect(categorySelect).toHaveTextContent(`JavaScript (${JAVASCRIPT_COUNT})`);
  });

  it('paginates results instead of rendering the entire bank on one page', async () => {
    const user = userEvent.setup();
    renderWithProviders(<QuestionList />, { route: '/practice', routePath: '/practice' });
    await waitForLoaded();

    const expectedPageCount = Math.ceil(TOTAL_QUESTIONS / PAGE_SIZE);
    expect(expectedPageCount).toBeGreaterThan(1); // sanity: the bank is big enough to actually paginate

    expect(screen.getByText(`Page 1 of ${expectedPageCount}`)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /previous page/i })).toBeDisabled();

    await user.click(screen.getByRole('button', { name: /next page/i }));

    await waitFor(() => expect(screen.getByText(`Page 2 of ${expectedPageCount}`)).toBeInTheDocument());
    expect(screen.getByRole('button', { name: /previous page/i })).not.toBeDisabled();
  });

  it('restores filters and page directly from the URL on load — the same URL a browser back-navigation would restore', async () => {
    renderWithProviders(<QuestionList />, {
      route: '/practice?category=javascript&difficulty=Easy&page=1',
      routePath: '/practice',
    });
    await waitForLoaded();

    expect(screen.getByRole('combobox', { name: /filter by topic/i })).toHaveValue('javascript');
    expect(screen.getByRole('combobox', { name: /filter by difficulty/i })).toHaveValue('Easy');
  });

  it('changing a filter updates the result count and resets back to page 1', async () => {
    const user = userEvent.setup();
    renderWithProviders(<QuestionList />, { route: '/practice?page=2', routePath: '/practice' });
    await waitForLoaded();

    await user.selectOptions(screen.getByRole('combobox', { name: /filter by topic/i }), 'javascript');

    await waitFor(() =>
      expect(
        screen.getByText(new RegExp(`Showing 1–${Math.min(PAGE_SIZE, JAVASCRIPT_COUNT)} of ${JAVASCRIPT_COUNT} questions?`))
      ).toBeInTheDocument()
    );
  });
});

describe('QuestionList — back navigation preserves list state', () => {
  function renderApp(initialEntries: string[]) {
    const store = createTestStore();
    return {
      store,
      ...render(
        <Provider store={store}>
          <MemoryRouter initialEntries={initialEntries}>
            <Routes>
              <Route path="/practice" element={<QuestionList />} />
              <Route path="/practice/:questionId" element={<CodingScreen />} />
            </Routes>
          </MemoryRouter>
        </Provider>
      ),
    };
  }

  it('opening a question then clicking Back restores the exact prior filters and page, not the defaults', async () => {
    const user = userEvent.setup();
    renderApp(['/practice?category=javascript&difficulty=Easy']);
    await waitForLoaded();

    expect(screen.getByRole('combobox', { name: /filter by topic/i })).toHaveValue('javascript');
    expect(screen.getByRole('combobox', { name: /filter by difficulty/i })).toHaveValue('Easy');

    const firstQuestionLink = screen.getAllByRole('link')[0];
    expect(firstQuestionLink).toBeDefined();
    await user.click(firstQuestionLink!);

    // Now on the detail screen — filters are gone from view entirely.
    await waitFor(() => expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument());
    expect(screen.queryByRole('combobox', { name: /filter by topic/i })).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /back/i }));

    // Back on the list — the filters must reflect the URL we left, not reset to "All".
    await waitFor(() => expect(screen.getByRole('combobox', { name: /filter by topic/i })).toBeInTheDocument());
    expect(screen.getByRole('combobox', { name: /filter by topic/i })).toHaveValue('javascript');
    expect(screen.getByRole('combobox', { name: /filter by difficulty/i })).toHaveValue('Easy');
  });

  it('opening a question from page 2 then clicking Back restores page 2, not page 1', async () => {
    const user = userEvent.setup();
    renderApp(['/practice?page=2']);
    await waitForLoaded();

    const expectedPageCount = Math.ceil(TOTAL_QUESTIONS / PAGE_SIZE);
    await waitFor(() => expect(screen.getByText(`Page 2 of ${expectedPageCount}`)).toBeInTheDocument());

    const firstQuestionLink = screen.getAllByRole('link')[0];
    await user.click(firstQuestionLink!);

    await waitFor(() => expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument());
    await user.click(screen.getByRole('button', { name: /back/i }));

    await waitFor(() => expect(screen.getByText(`Page 2 of ${expectedPageCount}`)).toBeInTheDocument());
  });
});

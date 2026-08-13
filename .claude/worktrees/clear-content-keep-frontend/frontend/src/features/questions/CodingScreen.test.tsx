import { describe, it, expect, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/test/renderWithProviders';
import { CodingScreen } from './CodingScreen';
import { MOCK_CODING_QUESTIONS } from '@/mocks/questions';

// jsdom cannot run the real Monaco editor (it needs a real browser worker
// + canvas environment). Stand it in with a plain textarea that still
// round-trips value/onChange the same way CodeEditor expects, so the
// actual Run/Submit logic under test is exercised against real user input.
vi.mock('@monaco-editor/react', () => ({
  default: ({
    value,
    onChange,
  }: {
    value: string;
    onChange?: (value: string | undefined) => void;
  }) => (
    <textarea
      aria-label="code editor"
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
    />
  ),
}));

const QUESTION =
  MOCK_CODING_QUESTIONS.find(
    (q) => q.detail.sampleTests && q.detail.sampleTests.length > 0 && q.detail.sampleTests[0]!.description !== 'Sample test case'
  ) || MOCK_CODING_QUESTIONS[0]!;

function renderScreen() {
  return renderWithProviders(<CodingScreen />, {
    route: `/practice/${QUESTION.detail.id}`,
    routePath: '/practice/:questionId',
  });
}

describe('CodingScreen', () => {
  it('renders the question header and problem statement by default', async () => {
    renderScreen();

    await waitFor(() => expect(screen.getByText(QUESTION.detail.title)).toBeInTheDocument());
    expect(screen.getByText(QUESTION.detail.questionNumber)).toBeInTheDocument();
    expect(screen.getByText(QUESTION.detail.problemStatement)).toBeInTheDocument();
  });

  it('running the unmodified starter code does not pass (it has no real implementation)', async () => {
    const user = userEvent.setup();
    renderScreen();

    await waitFor(() => expect(screen.getByText(QUESTION.detail.title)).toBeInTheDocument());
    await user.click(screen.getByRole('button', { name: /run/i }));

    await waitFor(() => expect(screen.getByText(/sample tests passed/i)).toBeInTheDocument());
    expect(screen.getByText(`0 / ${QUESTION.detail.sampleTests.length} sample tests passed`)).toBeInTheDocument();
  });

  it('running a correct solution passes all sample tests and marks the question solved', async () => {
    const user = userEvent.setup();
    const { store } = renderScreen();

    await waitFor(() => expect(screen.getByText(QUESTION.detail.title)).toBeInTheDocument());

    const editor = screen.getByLabelText('code editor');
    await user.clear(editor);
    await user.click(editor);
    // Paste rather than keystroke-by-keystroke: this is real multi-line
    // solution code, not something a user meaningfully "types" in a test.
    await user.paste(QUESTION.solution.javascriptSolution);

    await user.click(screen.getByRole('button', { name: /run/i }));

    await waitFor(() =>
      expect(screen.getByText(`All ${QUESTION.detail.sampleTests.length} sample tests passed`)).toBeInTheDocument()
    );
    expect(store.getState().progress.solvedRecords.map((r) => r.questionId)).toContain(QUESTION.detail.id);
  });

  it('reset restores the starter code and clears previous run results', async () => {
    const user = userEvent.setup();
    renderScreen();

    await waitFor(() => expect(screen.getByText(QUESTION.detail.title)).toBeInTheDocument());
    await user.click(screen.getByRole('button', { name: /run/i }));
    await waitFor(() => expect(screen.getByText(/sample tests passed/i)).toBeInTheDocument());

    await user.click(screen.getByRole('button', { name: /reset/i }));

    expect(screen.queryByText(/sample tests passed/i)).not.toBeInTheDocument();
    // toHaveValue() requires an exact value, not an asymmetric matcher —
    // check the substring directly instead.
    const editorValue = (screen.getByLabelText('code editor') as HTMLTextAreaElement).value;
    expect(editorValue).toContain(`function ${QUESTION.detail.functionName}`);
  });

  it('toggles the bookmark state via the header button', async () => {
    const user = userEvent.setup();
    const { store } = renderScreen();

    await waitFor(() => expect(screen.getByText(QUESTION.detail.title)).toBeInTheDocument());
    const bookmarkButton = screen.getByRole('button', { name: /add bookmark/i });

    await user.click(bookmarkButton);
    expect(store.getState().progress.bookmarkedIds).toContain(QUESTION.detail.id);
    expect(screen.getByRole('button', { name: /remove bookmark/i })).toBeInTheDocument();
  });

  it('switches between the Problem and Explanation tabs', async () => {
    const user = userEvent.setup();
    renderScreen();

    await waitFor(() => expect(screen.getByText(QUESTION.detail.title)).toBeInTheDocument());
    expect(screen.getByText(QUESTION.detail.problemStatement)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Explanation' }));
    expect(screen.getByRole('button', { name: /show hint/i })).toBeInTheDocument();
    expect(screen.queryByText(QUESTION.detail.problemStatement)).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Problem' }));
    expect(screen.getByText(QUESTION.detail.problemStatement)).toBeInTheDocument();
  });

  it('switching language resets the editor to fresh starter code for that language', async () => {
    const user = userEvent.setup();
    renderScreen();

    await waitFor(() => expect(screen.getByText(QUESTION.detail.title)).toBeInTheDocument());
    const editor = screen.getByLabelText('code editor');
    await user.clear(editor);
    await user.paste('// my in-progress work');

    await user.selectOptions(screen.getByRole('combobox'), 'typescript');

    expect(editor).not.toHaveValue('// my in-progress work');
    expect((editor as HTMLTextAreaElement).value).toContain(': unknown[]');
  });
});

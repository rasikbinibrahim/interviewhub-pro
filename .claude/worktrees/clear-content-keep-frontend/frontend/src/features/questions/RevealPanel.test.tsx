import { describe, it, expect } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/test/renderWithProviders';
import { RevealPanel } from './RevealPanel';
import { MOCK_CODING_QUESTIONS } from '@/mocks/questions';

const QUESTION =
  MOCK_CODING_QUESTIONS.find(
    (q) =>
      q.solution.timeComplexity &&
      q.solution.timeComplexity !== 'Not specified in source' &&
      q.hints.hints &&
      q.hints.hints.length >= 3
  ) || MOCK_CODING_QUESTIONS[0]!;

describe('RevealPanel', () => {
  it('shows "Show Hint" from the initial state, with no hint content and no other reveal buttons yet', () => {
    renderWithProviders(<RevealPanel questionId={QUESTION.detail.id} />);

    expect(screen.getByRole('button', { name: /show hint/i })).toBeInTheDocument();
    expect(screen.queryByText(QUESTION.hints.hints[0])).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /show next hint/i })).not.toBeInTheDocument();
  });

  it('reveals hints one at a time, in order, never skipping a stage', async () => {
    const user = userEvent.setup();
    renderWithProviders(<RevealPanel questionId={QUESTION.detail.id} />);

    await user.click(screen.getByRole('button', { name: /show hint/i }));
    await waitFor(() => expect(screen.getByText(QUESTION.hints.hints[0])).toBeInTheDocument());
    // The first hint button is gone now; only the "next" button remains, and
    // hints 2/3 must not be visible yet.
    expect(screen.queryByRole('button', { name: /^show hint$/i })).not.toBeInTheDocument();
    expect(screen.queryByText(QUESTION.hints.hints[1])).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /show next hint/i }));
    await waitFor(() => expect(screen.getByText(QUESTION.hints.hints[1])).toBeInTheDocument());
    expect(screen.queryByText(QUESTION.hints.hints[2])).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /show final hint/i }));
    await waitFor(() => expect(screen.getByText(QUESTION.hints.hints[2])).toBeInTheDocument());
    // All three hints are now visible, and no further hint button remains.
    expect(screen.queryByRole('button', { name: /hint/i })).not.toBeInTheDocument();
  });

  it('reveals the full solution on "Show Answer", including both language solutions', async () => {
    const user = userEvent.setup();
    renderWithProviders(<RevealPanel questionId={QUESTION.detail.id} />);

    await user.click(screen.getByRole('button', { name: /show answer/i }));

    await waitFor(() => expect(screen.getByText(QUESTION.solution.timeComplexity)).toBeInTheDocument());
    expect(screen.getByText(QUESTION.solution.spaceComplexity)).toBeInTheDocument();
    // getByText's default matcher normalizes whitespace (collapses newlines),
    // which breaks exact matching against a multi-line <pre> code block —
    // compare raw textContent directly instead.
    expect(screen.getByText((_, el) => el?.textContent === QUESTION.solution.javascriptSolution)).toBeInTheDocument();
    expect(screen.getByText((_, el) => el?.textContent === QUESTION.solution.typescriptSolution)).toBeInTheDocument();
    // The button that reveals it should no longer be present once revealed.
    expect(screen.queryByRole('button', { name: /show answer/i })).not.toBeInTheDocument();
  });

  it('can jump straight to the solution without going through hints first', async () => {
    const user = userEvent.setup();
    renderWithProviders(<RevealPanel questionId={QUESTION.detail.id} />);

    await user.click(screen.getByRole('button', { name: /show answer/i }));
    await waitFor(() => expect(screen.getByText(QUESTION.solution.timeComplexity)).toBeInTheDocument());

    expect(screen.queryByText(QUESTION.hints.hints[0])).not.toBeInTheDocument();
  });
});

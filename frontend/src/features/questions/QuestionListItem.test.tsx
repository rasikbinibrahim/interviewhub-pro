import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import type { ComponentProps } from 'react';
import { QuestionListItem } from './QuestionListItem';
import type { QuestionSummary } from '@/shared/types/question';

const BASE_QUESTION: QuestionSummary = {
  id: 'q101',
  questionNumber: 'Q101',
  title: 'Two Sum',
  difficulty: 'Easy',
  companies: ['Google', 'Amazon', 'Microsoft', 'Adobe'],
  frequency: 5,
  part: 'DSA',
  category: 'arrays',
  concepts: ['hash map'],
  solved: false,
  attempted: false,
  bookmarked: false,
  questionType: 'coding',
};

function renderItem(props: Partial<ComponentProps<typeof QuestionListItem>> = {}) {
  return render(
    <MemoryRouter>
      <QuestionListItem question={BASE_QUESTION} solved={false} bookmarked={false} {...props} />
    </MemoryRouter>
  );
}

describe('QuestionListItem', () => {
  it('renders the title, question number, and difficulty', () => {
    renderItem();
    expect(screen.getByText('Two Sum')).toBeInTheDocument();
    expect(screen.getByText('Q101')).toBeInTheDocument();
    expect(screen.getByText('Easy')).toBeInTheDocument();
  });

  it('links to the correct practice route', () => {
    renderItem();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/practice/q101');
  });

  it('shows at most 3 companies even when more are provided', () => {
    renderItem();
    expect(screen.getByText('Google')).toBeInTheDocument();
    expect(screen.getByText('Amazon')).toBeInTheDocument();
    expect(screen.getByText('Microsoft')).toBeInTheDocument();
    expect(screen.queryByText('Adobe')).not.toBeInTheDocument();
  });

  it('dims the row and shows a check icon when solved', () => {
    const { container } = renderItem({ solved: true });
    expect(container.querySelector('.opacity-70')).not.toBeNull();
  });

  it('renders custom trailing content when provided, instead of the frequency stars', () => {
    renderItem({ trailing: <span>3 days overdue</span> });
    expect(screen.getByText('3 days overdue')).toBeInTheDocument();
  });

  it('falls back to frequency stars when no trailing content is given', () => {
    const { container } = renderItem();
    expect(container.textContent).toContain('★★★★★');
  });
});

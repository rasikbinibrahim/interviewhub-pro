import { RotateCcw } from 'lucide-react';
import { useGetQuestionsQuery } from '@/store/api/questionsApi';
import { useAppSelector } from '@/shared/hooks/redux';
import { selectDueRevisions, selectSolvedIds, selectBookmarkedIds } from '@/shared/selectors/progressSelectors';
import { QuestionListItem } from '@/features/questions/QuestionListItem';

// Day 1/3/7/15/30 spaced-repetition schedule, computed client-side from
// real solve timestamps (see shared/selectors/progressSelectors.ts).
// This is a local approximation of Phase 9's eventual server-backed
// revision_schedule table (DATABASE.md) — same intervals, same logic,
// computed on the fly instead of stored, until Phase 2/3 exist.

function formatDueLabel(overdueByDays: number): string {
  if (overdueByDays === 0) return 'Due today';
  if (overdueByDays === 1) return 'Due yesterday';
  return `${overdueByDays} days overdue`;
}

export function RevisionPage() {
  const { data: questions, isLoading } = useGetQuestionsQuery();
  const dueRevisions = useAppSelector(selectDueRevisions);
  const solvedIds = useAppSelector(selectSolvedIds);
  const bookmarkedIds = useAppSelector(selectBookmarkedIds);

  const dueQuestions = dueRevisions
    .map((item) => {
      const question = questions?.find((q) => q.id === item.questionId);
      return question ? { question, item } : null;
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null);

  return (
    <div className="mx-auto max-w-4xl p-8">
      <h1 className="text-2xl font-bold">Revision</h1>
      <p className="mt-1 text-sm text-text-secondary">
        Solved questions resurface here on a spaced schedule (1, 3, 7, 15, and 30 days after you
        solved them) — the interval proven to be most effective for retention.
      </p>

      <div className="mt-5 flex flex-col gap-2">
        {isLoading && <div className="p-6 text-center text-sm text-text-secondary">Loading…</div>}

        {!isLoading && dueQuestions.length === 0 && (
          <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-border p-10 text-center text-sm text-text-secondary">
            <RotateCcw size={24} />
            {solvedIds.length === 0
              ? "You haven't solved anything yet — revision items appear here once you do."
              : "Nothing due for revision right now — check back later."}
          </div>
        )}

        {dueQuestions.map(({ question, item }) => (
          <QuestionListItem
            key={question.id}
            question={question}
            solved={true}
            bookmarked={bookmarkedIds.includes(question.id)}
            trailing={
              <span className={item.overdueByDays > 0 ? 'font-semibold text-warning' : 'text-text-secondary'}>
                {formatDueLabel(item.overdueByDays)}
              </span>
            }
          />
        ))}
      </div>
    </div>
  );
}

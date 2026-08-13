import { Bookmark } from 'lucide-react';
import { useGetQuestionsQuery } from '@/store/api/questionsApi';
import { useAppSelector } from '@/shared/hooks/redux';
import { selectBookmarkedIds, selectSolvedIds } from '@/shared/selectors/progressSelectors';
import { QuestionListItem } from '@/features/questions/QuestionListItem';

export function BookmarksPage() {
  const { data: questions, isLoading } = useGetQuestionsQuery();
  const bookmarkedIds = useAppSelector(selectBookmarkedIds);
  const solvedIds = useAppSelector(selectSolvedIds);

  const bookmarked = questions?.filter((q) => bookmarkedIds.includes(q.id)) ?? [];

  return (
    <div className="mx-auto max-w-4xl p-8">
      <h1 className="text-2xl font-bold">Bookmarks</h1>
      <p className="mt-1 text-sm text-text-secondary">
        Questions you&apos;ve flagged for later — tap the bookmark icon on any question to add or remove it here.
      </p>

      <div className="mt-5 flex flex-col gap-2">
        {isLoading && <div className="p-6 text-center text-sm text-text-secondary">Loading…</div>}

        {!isLoading && bookmarked.length === 0 && (
          <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-border p-10 text-center text-sm text-text-secondary">
            <Bookmark size={24} />
            No bookmarks yet. Open a question and tap the bookmark icon to save it here.
          </div>
        )}

        {bookmarked.map((q) => (
          <QuestionListItem key={q.id} question={q} solved={solvedIds.includes(q.id)} bookmarked={true} />
        ))}
      </div>
    </div>
  );
}

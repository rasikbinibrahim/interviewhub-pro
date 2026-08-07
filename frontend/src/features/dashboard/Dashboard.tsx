import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { Flame, Target, ArrowRight, Clock, AlertTriangle, RotateCcw } from 'lucide-react';
import { useGetQuestionsQuery } from '@/store/api/questionsApi';
import { useAppSelector } from '@/shared/hooks/redux';
import {
  selectSolvedIds,
  selectAttemptedIds,
  selectCurrentStreak,
  selectRecentlySolved,
  selectDueRevisions,
} from '@/shared/selectors/progressSelectors';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { DifficultyBadge } from '@/components/ui/Badge';
import type { Difficulty, QuestionSummary } from '@/shared/types/question';

const DIFFICULTIES: Difficulty[] = ['Easy', 'Medium', 'Hard'];
const RECENT_LIMIT = 3;

export function Dashboard() {
  const { data: questions } = useGetQuestionsQuery();
  const solvedIds = useAppSelector(selectSolvedIds);
  const attemptedIds = useAppSelector(selectAttemptedIds);
  const streak = useAppSelector(selectCurrentStreak);
  const recentlySolved = useAppSelector((state) => selectRecentlySolved(state, RECENT_LIMIT));
  const dueRevisions = useAppSelector(selectDueRevisions);

  if (!questions) return <DashboardSkeleton />;

  const total = questions.length;
  const solvedCount = questions.filter((q) => solvedIds.includes(q.id)).length;
  const overallPercent = total > 0 ? Math.round((solvedCount / total) * 100) : 0;

  const byDifficulty = DIFFICULTIES.map((difficulty) => {
    const inDifficulty = questions.filter((q) => q.difficulty === difficulty);
    const solved = inDifficulty.filter((q) => solvedIds.includes(q.id)).length;
    return { difficulty, solved, total: inDifficulty.length };
  });

  const nextQuestion = questions.find((q) => !solvedIds.includes(q.id));

  const questionById = new Map(questions.map((q) => [q.id, q]));
  const recentQuestions = recentlySolved
    .map((r) => questionById.get(r.questionId))
    .filter((q): q is QuestionSummary => q !== undefined);

  const weakTopics = computeWeakTopics(questions, solvedIds, attemptedIds);

  return (
    <div className="mx-auto max-w-5xl p-8">
      <h1 className="text-2xl font-bold">Welcome back 👋</h1>
      <p className="mt-1 text-sm text-text-secondary">
        Note: progress shown here is stored locally in this browser only — Phase 1/2
        (Authentication, Database) aren&apos;t built yet, so nothing syncs across devices.
        See <code className="rounded bg-surface-raised px-1 py-0.5 text-xs">PROGRESS.md</code>.
      </p>

      <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-border bg-surface p-5 md:col-span-2">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-text-secondary">
            <Target size={16} /> Overall progress
          </div>
          <ProgressBar value={overallPercent} label={`Solved ${solvedCount} / ${total}`} />

          <div className="mt-5 grid grid-cols-3 gap-4">
            {byDifficulty.map(({ difficulty, solved, total: diffTotal }) => (
              <div key={difficulty}>
                <DifficultyBadge difficulty={difficulty} />
                <div className="mt-2 text-lg font-bold">
                  {solved} <span className="text-sm font-normal text-text-secondary">/ {diffTotal}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface p-5">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-text-secondary">
            <Flame size={16} /> {streak > 0 ? `${streak}-day streak` : 'Keep going'}
          </div>
          {nextQuestion ? (
            <>
              <div className="text-base font-bold">{nextQuestion.title}</div>
              <div className="mt-1 flex gap-2">
                <DifficultyBadge difficulty={nextQuestion.difficulty} />
              </div>
              <Link
                to={`/practice/${nextQuestion.id}`}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
              >
                Continue learning <ArrowRight size={14} />
              </Link>
            </>
          ) : (
            <p className="text-sm text-text-secondary">
              All available questions solved — more are on the way (see BACKLOG-JS.md).
            </p>
          )}
        </div>
      </section>

      <section className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <DashboardCard icon={Clock} title="Recent problems">
          {recentQuestions.length === 0 ? (
            <EmptyHint>Solved questions show up here.</EmptyHint>
          ) : (
            <ul className="flex flex-col gap-2">
              {recentQuestions.map((q) => (
                <li key={q.id}>
                  <Link to={`/practice/${q.id}`} className="text-sm font-medium hover:text-brand hover:underline">
                    {q.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </DashboardCard>

        <DashboardCard icon={AlertTriangle} title="Weak topics">
          {weakTopics.length === 0 ? (
            <EmptyHint>
              {attemptedIds.length === 0
                ? 'Attempt a few questions to see this.'
                : 'No weak spots detected yet — nice.'}
            </EmptyHint>
          ) : (
            <ul className="flex flex-col gap-2">
              {weakTopics.map(({ category, unsolvedAttempted }) => (
                <li key={category} className="flex items-center justify-between text-sm">
                  <Link to={`/practice?search=${encodeURIComponent(category)}`} className="font-medium capitalize hover:text-brand hover:underline">
                    {category}
                  </Link>
                  <span className="text-text-secondary">{unsolvedAttempted} to revisit</span>
                </li>
              ))}
            </ul>
          )}
        </DashboardCard>

        <DashboardCard icon={RotateCcw} title="Upcoming revision">
          {dueRevisions.length === 0 ? (
            <EmptyHint>Nothing due right now.</EmptyHint>
          ) : (
            <>
              <p className="text-sm">
                <span className="font-bold">{dueRevisions.length}</span> question
                {dueRevisions.length === 1 ? '' : 's'} due for review.
              </p>
              <Link to="/revision" className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline">
                Go to revision <ArrowRight size={14} />
              </Link>
            </>
          )}
        </DashboardCard>
      </section>
    </div>
  );
}

function computeWeakTopics(
  questions: QuestionSummary[],
  solvedIds: string[],
  attemptedIds: string[]
): Array<{ category: string; unsolvedAttempted: number }> {
  const counts = new Map<string, number>();

  for (const q of questions) {
    const wasAttempted = attemptedIds.includes(q.id);
    const wasSolved = solvedIds.includes(q.id);
    if (wasAttempted && !wasSolved) {
      counts.set(q.category, (counts.get(q.category) ?? 0) + 1);
    }
  }

  return Array.from(counts.entries())
    .map(([category, unsolvedAttempted]) => ({ category, unsolvedAttempted }))
    .sort((a, b) => b.unsolvedAttempted - a.unsolvedAttempted);
}

function DashboardCard({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Clock;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-text-secondary">
        <Icon size={16} /> {title}
      </div>
      {children}
    </div>
  );
}

function EmptyHint({ children }: { children: ReactNode }) {
  return <p className="text-sm text-text-secondary">{children}</p>;
}

function DashboardSkeleton() {
  return (
    <div className="mx-auto max-w-5xl p-8">
      <div className="h-7 w-56 animate-pulse rounded bg-surface-raised" />
      <div className="mt-6 h-40 animate-pulse rounded-xl bg-surface-raised" />
    </div>
  );
}

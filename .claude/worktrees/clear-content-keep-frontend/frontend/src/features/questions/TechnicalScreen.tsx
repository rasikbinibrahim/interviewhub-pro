import { useState } from 'react';
import { Bookmark, BookOpen, Layers, AlertTriangle, Lightbulb, CheckCircle2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux';
import { markSolved, toggleBookmark } from '@/store/slices/progressSlice';
import { selectBookmarkedIds, selectSolvedIds } from '@/shared/selectors/progressSelectors';
import { DifficultyBadge, Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useLazyGetQuestionAnswerQuery } from '@/store/api/questionsApi';
import { BackToListButton } from './BackToListButton';
import type { TechnicalQuestionDetail } from '@/shared/types/question';

interface TechnicalScreenProps {
  question: TechnicalQuestionDetail;
}

export function TechnicalScreen({ question }: TechnicalScreenProps) {
  const dispatch = useAppDispatch();
  const bookmarkedIds = useAppSelector(selectBookmarkedIds);
  const solvedIds = useAppSelector(selectSolvedIds);

  const [fetchAnswer, answerResult] = useLazyGetQuestionAnswerQuery();
  const [revealed, setRevealed] = useState(false);

  const bookmarked = bookmarkedIds.includes(question.id);
  const solved = solvedIds.includes(question.id);

  function handleReveal() {
    setRevealed(true);
    if (!answerResult.data) {
      void fetchAnswer(question.id);
    }
  }

  function handleMarkSolved() {
    dispatch(markSolved(question.id));
  }

  const answer = answerResult.data;

  return (
    <div className="flex h-full flex-col overflow-y-auto bg-canvas">
      {/* Top Bar */}
      <div className="flex items-center gap-3 border-b border-border bg-surface px-4 py-2 sticky top-0 z-10">
        <BackToListButton />
        <span className="text-sm font-mono text-text-secondary">{question.questionNumber}</span>
        <span className="text-sm font-bold">{question.title}</span>
        <DifficultyBadge difficulty={question.difficulty} />
        <Badge tone="info">{question.experienceLevel}</Badge>
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => dispatch(toggleBookmark(question.id))}
            className="flex items-center gap-1 text-sm text-text-secondary hover:text-warning"
            aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
            aria-pressed={bookmarked}
          >
            <Bookmark size={14} className={bookmarked ? 'fill-warning text-warning' : ''} />
          </button>
          {!solved ? (
            <Button variant="secondary" onClick={handleMarkSolved}>
              <CheckCircle2 size={14} /> Mark Solved
            </Button>
          ) : (
            <Badge tone="success">Solved</Badge>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto w-full max-w-4xl p-6 flex flex-col gap-6">
        {/* Question Header Card */}
        <div className="rounded-lg border border-border bg-surface p-6 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-brand mb-2">Technical Interview Question</div>
          <h1 className="text-xl font-bold text-text-primary leading-relaxed">{question.question}</h1>

          <div className="mt-4 flex flex-wrap gap-2 items-center text-xs text-text-secondary">
            <span className="font-semibold text-text-primary">Companies:</span>
            {question.companies.map((c) => (
              <Badge key={c} tone="info">{c}</Badge>
            ))}
          </div>
        </div>

        {/* Answer Reveal Control */}
        {!revealed && (
          <div className="flex flex-col items-center justify-center p-8 rounded-lg border border-dashed border-border bg-surface text-center gap-3">
            <Lightbulb size={32} className="text-warning animate-pulse" />
            <h3 className="font-bold text-lg">Think about your answer first</h3>
            <p className="text-sm text-text-secondary max-w-md">
              Formulate a 60–90 second concise explanation aloud before revealing the answer rubric.
            </p>
            <Button variant="primary" onClick={handleReveal}>
              Reveal Full Answer &amp; Senior Breakdown
            </Button>
          </div>
        )}

        {/* Revealed Answer Content */}
        {revealed && (
          <div className="flex flex-col gap-6 animate-fadeIn">
            {answerResult.isLoading && (
              <div className="p-8 text-center text-sm text-text-secondary">Loading deep explanation...</div>
            )}

            {answer && (
              <>
                {/* 1. Expected 60-second Answer */}
                <Section icon={BookOpen} title="Expected 60-Second Answer">
                  <div className="rounded-md border border-brand/30 bg-surface-raised p-4 text-sm leading-relaxed text-text-primary font-medium">
                    {answer.expectedAnswer}
                  </div>
                </Section>

                {/* 2. Deep Explanation */}
                <Section icon={Layers} title="Deep Explanation &amp; Mechanism">
                  <div className="whitespace-pre-wrap text-sm text-text-primary leading-relaxed bg-surface p-4 rounded-md border border-border">
                    {answer.deepExplanation}
                  </div>
                </Section>

                {/* 3. Production Example */}
                {answer.productionExample && (
                  <Section icon={Lightbulb} title="Production Scale Example">
                    <div className="whitespace-pre-wrap text-sm text-text-primary leading-relaxed bg-surface p-4 rounded-md border border-border">
                      {answer.productionExample}
                    </div>
                  </Section>
                )}

                {/* 4. Best Practices & Trade-offs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {answer.bestPractices?.length > 0 && (
                    <Section title="Best Practices">
                      <ul className="list-disc space-y-1.5 pl-5 text-sm text-text-primary bg-surface p-4 rounded-md border border-border">
                        {answer.bestPractices.map((bp, i) => (
                          <li key={i}>{bp}</li>
                        ))}
                      </ul>
                    </Section>
                  )}

                  {answer.tradeOffs && (
                    <Section title="Trade-offs &amp; Overhead">
                      <div className="text-sm text-text-primary leading-relaxed bg-surface p-4 rounded-md border border-border">
                        {answer.tradeOffs}
                      </div>
                    </Section>
                  )}
                </div>

                {/* 5. Common Pitfalls */}
                {answer.commonMistakes?.length > 0 && (
                  <Section icon={AlertTriangle} title="Common Mistakes Candidates Make">
                    <ul className="list-disc space-y-1.5 pl-5 text-sm text-text-primary bg-surface p-4 rounded-md border border-border">
                      {answer.commonMistakes.map((m, i) => (
                        <li key={i}>{m}</li>
                      ))}
                    </ul>
                  </Section>
                )}

                {/* 6. Follow-up Questions */}
                {answer.followUpQuestions?.length > 0 && (
                  <Section title="Interviewer Follow-up Questions">
                    <ol className="list-decimal space-y-1.5 pl-5 text-sm text-text-primary bg-surface p-4 rounded-md border border-border">
                      {answer.followUpQuestions.map((q, i) => (
                        <li key={i}>{q}</li>
                      ))}
                    </ol>
                  </Section>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon?: typeof BookOpen;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-text-secondary">
        {Icon && <Icon size={14} className="text-brand" />}
        {title}
      </div>
      {children}
    </div>
  );
}

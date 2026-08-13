import { Link } from 'react-router-dom';
import { Check, Circle, Bookmark } from 'lucide-react';
import { DifficultyBadge, Badge } from '@/components/ui/Badge';
import type { QuestionSummary } from '@/shared/types/question';
import type { ReactNode } from 'react';

interface QuestionListItemProps {
  question: QuestionSummary;
  solved: boolean;
  bookmarked: boolean;
  /** Optional trailing content shown instead of the default star-frequency indicator (e.g. a revision due date). */
  trailing?: ReactNode;
}

export function QuestionListItem({ question, solved, bookmarked, trailing }: QuestionListItemProps) {
  return (
    <Link
      to={`/practice/${question.id}`}
      className={`flex items-center gap-4 rounded-lg border border-border bg-surface p-4 transition-colors hover:border-brand ${
        solved ? 'opacity-70' : ''
      }`}
    >
      {solved ? (
        <Check size={18} className="shrink-0 text-success" />
      ) : (
        <Circle size={18} className="shrink-0 text-text-secondary" />
      )}

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-text-secondary">{question.questionNumber}</span>
          <span className="font-semibold">{question.title}</span>
          <Badge tone={question.questionType === 'coding' ? 'info' : 'warning'}>
            {question.questionType === 'coding' ? 'Coding' : 'Technical'}
          </Badge>
          {bookmarked && <Bookmark size={12} className="fill-warning text-warning" />}
        </div>
        <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
          <DifficultyBadge difficulty={question.difficulty} />
          <span className="rounded bg-surface-raised px-1.5 py-0.5 text-xs font-mono text-text-secondary">
            {question.category}
          </span>
          {question.companies.slice(0, 3).map((company) => (
            <span key={company} className="text-xs text-text-secondary">
              {company}
            </span>
          ))}
        </div>
      </div>

      <div className="shrink-0 text-xs text-text-secondary">
        {trailing ?? (
          <span title="Interview frequency">
            {'★'.repeat(question.frequency)}
            <span className="text-border">{'★'.repeat(5 - question.frequency)}</span>
          </span>
        )}
      </div>
    </Link>
  );
}

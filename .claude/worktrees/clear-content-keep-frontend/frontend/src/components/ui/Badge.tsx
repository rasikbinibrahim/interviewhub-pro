import type { ReactNode } from 'react';
import type { Difficulty } from '@/shared/types/question';

type BadgeTone = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

const DIFFICULTY_TONE: Record<Difficulty, BadgeTone> = {
  Easy: 'success',
  Medium: 'warning',
  Hard: 'danger',
};

const TONE_CLASSES: Record<BadgeTone, string> = {
  success: 'bg-success/10 text-success border-success/30',
  warning: 'bg-warning/10 text-warning border-warning/30',
  danger: 'bg-danger/10 text-danger border-danger/30',
  info: 'bg-info/10 text-info border-info/30',
  neutral: 'bg-surface-raised text-text-secondary border-border',
};

interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
}

export function Badge({ children, tone = 'neutral' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide ${TONE_CLASSES[tone]}`}
    >
      {children}
    </span>
  );
}

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return <Badge tone={DIFFICULTY_TONE[difficulty]}>{difficulty}</Badge>;
}

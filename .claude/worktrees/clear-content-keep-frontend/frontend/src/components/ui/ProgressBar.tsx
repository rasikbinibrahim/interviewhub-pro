interface ProgressBarProps {
  value: number; // 0-100
  colorClassName?: string;
  label?: string;
}

export function ProgressBar({ value, colorClassName = 'bg-brand', label }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div>
      {label && (
        <div className="mb-1 flex justify-between text-xs font-medium text-text-secondary">
          <span>{label}</span>
          <span>{clamped}%</span>
        </div>
      )}
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-surface-raised"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`h-full rounded-full transition-[width] duration-300 ${colorClassName}`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}

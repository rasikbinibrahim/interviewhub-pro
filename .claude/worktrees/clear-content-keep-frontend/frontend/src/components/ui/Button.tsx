import type { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost';

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: 'bg-brand text-white hover:brightness-110',
  secondary: 'bg-surface-raised text-text-primary border border-border hover:border-brand',
  danger: 'bg-danger/10 text-danger border border-danger/30 hover:bg-danger/20',
  ghost: 'text-text-secondary hover:text-text-primary hover:bg-surface-raised',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export function Button({ variant = 'primary', className = '', ...rest }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${VARIANT_CLASSES[variant]} ${className}`}
      {...rest}
    />
  );
}

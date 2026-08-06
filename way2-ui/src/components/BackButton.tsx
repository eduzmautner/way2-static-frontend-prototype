import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../lib/cn';
import { Icon } from './Icon';

export interface BackButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Defaults to "Voltar" — the label every secondary screen uses. */
  label?: string;
}

/** The "← VOLTAR" chip from every secondary/detail screen. */
export function BackButton({ label = 'Voltar', className, ...rest }: BackButtonProps) {
  return (
    <button
      type="button"
      {...rest}
      className={cn(
        'inline-flex h-[30px] items-center gap-2 rounded-control bg-surface-subtle px-3',
        'text-micro font-semibold uppercase tracking-[0.06em] text-primary',
        'transition-colors duration-fast hover:bg-media',
        className
      )}
    >
      <Icon name="arrowLeft" size={14} />
      {label}
    </button>
  );
}

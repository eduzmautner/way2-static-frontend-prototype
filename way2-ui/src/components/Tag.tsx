import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../lib/cn';
import { Icon } from './Icon';

export interface TagProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  label: string;
  /** Interactive chip: hover feedback + button semantics. */
  selectable?: boolean;
  selected?: boolean;
  /** Shows a trailing ×; fires onRemove instead of onClick. */
  onRemove?: () => void;
}

/**
 * Category / interest chip. Space Grotesk uppercase, stadium shape — the
 * one sanctioned exception to the two-radius scale.
 */
export function Tag({ label, selectable = false, selected = false, onRemove, className, ...rest }: TagProps) {
  const El = selectable || onRemove ? 'button' : 'span';
  return (
    <El
      {...(El === 'button' ? { type: 'button' as const, 'aria-pressed': selectable ? selected : undefined } : {})}
      {...(rest as object)}
      onClick={onRemove ?? rest.onClick}
      className={cn(
        'inline-flex h-6 items-center gap-1 rounded-full border px-3',
        'font-accent text-accent-tag uppercase',
        'transition-colors duration-fast',
        selected
          ? 'border-action bg-action text-action-text'
          : 'border-border-strong bg-transparent text-primary',
        selectable && !selected && 'cursor-pointer hover:bg-surface-subtle',
        className
      )}
    >
      {label}
      {onRemove && (
        <span className="inline-grid place-items-center text-secondary">
          <Icon name="x" size={12} />
        </span>
      )}
    </El>
  );
}

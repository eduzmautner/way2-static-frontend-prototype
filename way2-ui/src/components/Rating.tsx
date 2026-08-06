import { cn } from '../lib/cn';
import { Icon } from './Icon';

export interface RatingProps {
  value: number;
  max?: number;
  /** Interactive mode: shows the full empty track and fires onChange. The
      display mode renders only the earned sparkles, per the feed frames. */
  onChange?: (value: number) => void;
  className?: string;
}

/** Sparkle rating — Way2's star equivalent. */
export function Rating({ value, max = 5, onChange, className }: RatingProps) {
  const interactive = !!onChange;
  const slots = interactive ? max : Math.max(0, Math.min(value, max));

  return (
    <div
      role={interactive ? 'radiogroup' : 'img'}
      aria-label={`Avaliação ${value} de ${max}`}
      className={cn('flex items-center gap-2', className)}
    >
      {Array.from({ length: slots }, (_, i) => {
        const on = i < value;
        const sparkle = (
          <Icon name="sparkle" size={20} fill={on} className={on ? 'text-primary' : 'text-border-default'} />
        );
        return interactive ? (
          <button
            key={i}
            type="button"
            role="radio"
            aria-checked={value === i + 1}
            aria-label={`${i + 1} de ${max}`}
            onClick={() => onChange(i + 1)}
            className="cursor-pointer"
          >
            {sparkle}
          </button>
        ) : (
          <span key={i}>{sparkle}</span>
        );
      })}
    </div>
  );
}

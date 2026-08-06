import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '../lib/cn';

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

/**
 * Single-line text input.
 *
 * Mobile note: keep the rendered font-size ≥16px under 768px in the host
 * app — iOS Safari force-zooms into any focused field below that. The
 * phase-1 prototype does this with a global media query.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, ...rest },
  ref
) {
  return (
    <input
      ref={ref}
      {...rest}
      className={cn(
        'h-10 w-full rounded-surface border border-border-default bg-input px-4',
        'text-body text-primary placeholder:text-placeholder',
        'transition-colors duration-fast focus:border-border-strong focus:outline-none',
        className
      )}
    />
  );
});

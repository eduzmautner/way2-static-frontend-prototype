import { forwardRef, type SelectHTMLAttributes } from 'react';
import { cn } from '../lib/cn';
import { Icon } from './Icon';

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

/** Native select styled like Input, with the system chevron. */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className, children, ...rest },
  ref
) {
  return (
    <div className={cn('relative', className)}>
      <select
        ref={ref}
        {...rest}
        className={cn(
          'h-10 w-full cursor-pointer appearance-none rounded-surface border border-border-default',
          'bg-input pl-4 pr-10 text-body text-primary',
          'transition-colors duration-fast focus:border-border-strong focus:outline-none'
        )}
      >
        {children}
      </select>
      <Icon
        name="chevronDown"
        size={16}
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-secondary"
      />
    </div>
  );
});

import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '../lib/cn';
import { Icon } from './Icon';

export interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Squared corners (rounded-surface) — the Gerenciador variant. Default is the pill. */
  square?: boolean;
}

/** Search field with leading magnifier. Pill by default. */
export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(function SearchInput(
  { square = false, className, placeholder = 'Pesquisar', ...rest },
  ref
) {
  return (
    <div
      className={cn(
        'flex h-10 items-center gap-3 border border-border-default bg-search px-4 text-placeholder',
        square ? 'rounded-surface' : 'rounded-full',
        className
      )}
    >
      <Icon name="search" size={18} className="flex-none" />
      <input
        ref={ref}
        type="search"
        placeholder={placeholder}
        aria-label={rest['aria-label'] ?? placeholder}
        {...rest}
        className="min-w-0 flex-1 bg-transparent text-body text-primary outline-none placeholder:text-placeholder"
      />
    </div>
  );
});

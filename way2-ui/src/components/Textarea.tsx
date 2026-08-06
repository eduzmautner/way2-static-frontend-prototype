import { forwardRef, useState, type TextareaHTMLAttributes, type ChangeEvent } from 'react';
import { cn } from '../lib/cn';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Show the "n/maxLength" counter in the corner (requires maxLength). */
  counter?: boolean;
  /** Grow with content instead of showing a scrollbar, up to maxGrowHeight. */
  autoGrow?: boolean;
  maxGrowHeight?: number;
}

/** Multi-line input, with the prototype's counter and auto-grow behaviors. */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { counter = false, autoGrow = false, maxGrowHeight = 200, maxLength, className, onChange, defaultValue, value, ...rest },
  ref
) {
  const [length, setLength] = useState(String(value ?? defaultValue ?? '').length);

  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setLength(e.target.value.length);
    if (autoGrow) {
      e.target.style.height = 'auto';
      e.target.style.height = `${Math.min(e.target.scrollHeight, maxGrowHeight)}px`;
    }
    onChange?.(e);
  }

  const control = (
    <textarea
      ref={ref}
      maxLength={maxLength}
      value={value}
      defaultValue={defaultValue}
      onChange={handleChange}
      {...rest}
      className={cn(
        'min-h-[120px] w-full rounded-surface border border-border-default bg-input px-4 py-3',
        'text-body text-primary placeholder:text-placeholder',
        'transition-colors duration-fast focus:border-border-strong focus:outline-none',
        autoGrow ? 'resize-none overflow-y-auto' : 'resize-y',
        className
      )}
    />
  );

  if (!counter || !maxLength) return control;
  return (
    <div className="relative">
      {control}
      <span aria-hidden className="pointer-events-none absolute bottom-3 right-4 text-meta text-secondary">
        {length}/{maxLength}
      </span>
    </div>
  );
});

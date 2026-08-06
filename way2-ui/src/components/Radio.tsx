import type { ReactNode } from 'react';
import { cn } from '../lib/cn';

export interface RadioProps {
  checked: boolean;
  onChange: () => void;
  label?: ReactNode;
  disabled?: boolean;
  className?: string;
}

/** Button-based radio, controlled. Used in pay-method rows and send sheets. */
export function Radio({ checked, onChange, label, disabled, className }: RadioProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={checked}
      disabled={disabled}
      onClick={onChange}
      className={cn(
        'inline-flex items-center gap-3 text-left disabled:cursor-not-allowed disabled:opacity-50',
        label ? 'w-full' : null,
        className
      )}
    >
      <span
        aria-hidden
        className={cn(
          'grid h-5 w-5 flex-none place-items-center rounded-full border-[1.5px]',
          'transition-colors duration-fast',
          checked ? 'border-border-strong' : 'border-border-default'
        )}
      >
        {checked && <span className="h-[11px] w-[11px] rounded-full bg-primary" />}
      </span>
      {label && <span className="flex-1 text-body text-primary">{label}</span>}
    </button>
  );
}

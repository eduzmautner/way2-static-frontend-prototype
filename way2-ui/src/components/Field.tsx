import type { ReactNode } from 'react';
import { cn } from '../lib/cn';

export interface FieldProps {
  label: string;
  /** Ties the label to the control. Pass the same id to the child input. */
  htmlFor?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}

/** Label + control + optional hint — the wrapper every form screen uses. */
export function Field({ label, htmlFor, hint, children, className }: FieldProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={htmlFor} className="text-button text-primary">
        {label}
      </label>
      {children}
      {hint && <p className="text-meta text-secondary">{hint}</p>}
    </div>
  );
}

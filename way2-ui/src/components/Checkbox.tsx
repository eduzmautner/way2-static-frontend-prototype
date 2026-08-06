import type { ReactNode } from 'react';
import { cn } from '../lib/cn';
import { Icon } from './Icon';

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  /** Optional inline label (string or rich content, e.g. a StatusPill). */
  label?: ReactNode;
  /** Border weight of the unchecked box. Forms use `strong` (onboarding
      terms), list rows use `default` (table + filter panel). */
  tone?: 'strong' | 'default';
  /** Trailing content on the far edge, e.g. a result count. */
  trailing?: ReactNode;
  disabled?: boolean;
  className?: string;
}

/** Button-based checkbox, controlled. Checked fills with the action pair. */
export function Checkbox({
  checked,
  onChange,
  label,
  tone = 'strong',
  trailing,
  disabled,
  className
}: CheckboxProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        'inline-flex w-full items-center gap-3 text-left disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
    >
      <span
        aria-hidden
        className={cn(
          'grid h-5 w-5 flex-none place-items-center rounded-control border-[1.5px]',
          'transition-colors duration-fast',
          checked
            ? 'border-action bg-action text-action-text'
            : cn('text-transparent', tone === 'strong' ? 'border-border-strong' : 'border-border-default')
        )}
      >
        <Icon name="check" size={13} strokeWidth={2.4} />
      </span>
      {label && <span className="flex-1 text-body text-primary">{label}</span>}
      {trailing && <span className="text-meta text-secondary">{trailing}</span>}
    </button>
  );
}

import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../lib/cn';
import { Icon, type IconName } from './Icon';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: IconName;
  /** Accessible label — required, icon buttons have no visible text. */
  label: string;
  /** Toggled state: renders the filled glyph where one exists. */
  active?: boolean;
  iconSize?: number;
}

/** Bare icon action (like, share, save, close…). 32px square hit area. */
export function IconButton({ name, label, active = false, iconSize = 22, className, ...rest }: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active || undefined}
      {...rest}
      className={cn(
        'inline-grid h-8 w-8 place-items-center rounded-control text-icon-active',
        'transition-colors duration-fast hover:bg-surface-subtle',
        className
      )}
    >
      <Icon name={name} size={iconSize} fill={active} />
    </button>
  );
}

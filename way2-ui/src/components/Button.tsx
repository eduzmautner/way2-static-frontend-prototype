import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';
import { cn } from '../lib/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'quiet';
export type ButtonSize = 'sm' | 'md' | 'lg';

const VARIANT: Record<ButtonVariant, string> = {
  primary: 'bg-action text-action-text hover:bg-action-hover',
  secondary: 'bg-surface text-primary border border-border-default hover:border-border-strong',
  ghost: 'bg-surface-subtle text-primary hover:bg-media',
  quiet: 'bg-surface-subtle text-secondary'
};

// Size changes height only, never radius — that's what keeps a row of
// mixed-size buttons reading as one family.
const SIZE: Record<ButtonSize, string> = {
  sm: 'h-[28px] px-3 text-small-label',
  md: 'h-[36px] px-4 text-button',
  lg: 'h-[44px] px-6 text-button'
};

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-control whitespace-nowrap ' +
  'transition-colors duration-fast disabled:bg-disabled disabled:text-text-disabled ' +
  'disabled:border-transparent disabled:cursor-not-allowed';

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Full-width. */
  block?: boolean;
  children: ReactNode;
  className?: string;
}

export type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
export type LinkButtonProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

/** Renders a <button>, or an <a> when `href` is given. */
export function Button(props: ButtonProps | LinkButtonProps) {
  const { variant = 'primary', size = 'md', block, className, children, ...rest } = props;
  const classes = cn(BASE, VARIANT[variant], SIZE[size], block && 'w-full', className);

  if ('href' in props && props.href !== undefined) {
    const anchorRest = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a {...anchorRest} className={classes}>
        {children}
      </a>
    );
  }
  const buttonRest = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type="button" {...buttonRest} className={classes}>
      {children}
    </button>
  );
}

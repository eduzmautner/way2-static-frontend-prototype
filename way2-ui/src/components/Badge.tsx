import { cn } from '../lib/cn';

export interface BadgeProps {
  /** Bare dot (unread marker) when no count given. */
  count?: number;
  className?: string;
}

/**
 * Notification marker. `count` renders the pill used on filter buttons;
 * without it, the 5px unread dot from the nav rail / tab bar.
 */
export function Badge({ count, className }: BadgeProps) {
  if (count === undefined) {
    return <span aria-hidden className={cn('inline-block h-[5px] w-[5px] rounded-full bg-unread', className)} />;
  }
  return (
    <span
      className={cn(
        'inline-grid h-[18px] min-w-[18px] place-items-center rounded-full bg-action px-[5px]',
        'text-micro font-semibold text-action-text',
        className
      )}
    >
      {count}
    </span>
  );
}

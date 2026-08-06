import { cn } from '../lib/cn';

export interface ToastProps {
  children: string;
  className?: string;
}

/**
 * Presentational toast pill. Positioning/stacking/timing belong to the host
 * app's toast manager — this is only the visual atom.
 */
export function Toast({ children, className }: ToastProps) {
  return (
    <div
      role="status"
      className={cn(
        'inline-block rounded-full bg-action px-5 py-3 text-button text-action-text shadow-prominent',
        className
      )}
    >
      {children}
    </div>
  );
}

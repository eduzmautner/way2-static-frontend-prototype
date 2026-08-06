import { cn } from '../lib/cn';

export interface DividerProps {
  className?: string;
}

/** 1px rule on the subtle border token. */
export function Divider({ className }: DividerProps) {
  return <hr className={cn('h-px border-0 bg-border-subtle', className)} />;
}

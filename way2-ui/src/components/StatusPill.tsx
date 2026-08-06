import { cn } from '../lib/cn';

export type StatusTone = 'upcoming' | 'draft' | 'past';

const TONE: Record<StatusTone, string> = {
  upcoming: 'bg-accent-soft text-accent',
  draft: 'bg-[rgba(255,92,0,0.12)] text-orange-start',
  past: 'bg-surface-subtle text-secondary'
};

export interface StatusPillProps {
  tone: StatusTone;
  children: string;
  className?: string;
}

/** Status chip from the organizer table (Em breve / Rascunho / Encerrado). */
export function StatusPill({ tone, children, className }: StatusPillProps) {
  return (
    <span
      className={cn(
        'inline-flex h-6 items-center gap-2 rounded-full px-3 text-small-label',
        TONE[tone],
        className
      )}
    >
      <span aria-hidden className="h-[6px] w-[6px] rounded-full bg-current" />
      {children}
    </span>
  );
}

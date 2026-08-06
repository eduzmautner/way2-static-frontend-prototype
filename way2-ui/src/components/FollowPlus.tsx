import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../lib/cn';
import { Icon } from './Icon';

export interface FollowPlusProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Handle used only for the accessible label, e.g. "cj_parties". */
  handle: string;
  following: boolean;
}

/**
 * Inline follow control next to an organizer handle.
 *
 * 30px hit target in both states. The followed disc is 20px against the
 * outline glyph's ~22.5px drawn circle: a solid disc carries more optical
 * weight than a thin outline, so it must be geometrically smaller to read
 * as the same size.
 */
export function FollowPlus({ handle, following, className, ...rest }: FollowPlusProps) {
  return (
    <button
      type="button"
      aria-pressed={following}
      aria-label={`${following ? 'Deixar de seguir' : 'Seguir'} @${handle}`}
      {...rest}
      className={cn(
        'relative inline-grid h-[30px] w-[30px] flex-none place-items-center rounded-full',
        'transition-colors duration-fast',
        following ? 'text-action-text' : 'text-icon-active',
        className
      )}
    >
      {following && (
        <span aria-hidden className="absolute h-5 w-5 rounded-full bg-action" />
      )}
      {following ? (
        <Icon name="check" size={11} strokeWidth={2.5} className="relative" />
      ) : (
        <Icon name="plusCircle" size={30} />
      )}
    </button>
  );
}

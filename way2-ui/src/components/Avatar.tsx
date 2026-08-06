import { cn } from '../lib/cn';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const SIZE: Record<AvatarSize, string> = {
  xs: 'h-[28px] w-[28px] text-micro',
  sm: 'h-8 w-8 text-micro',
  md: 'h-10 w-10 text-meta',
  lg: 'h-[56px] w-[56px] text-body',
  xl: 'h-[120px] w-[120px] text-section'
};

/* Deterministic gradient stand-ins for photos, ported from the prototype.
   Swap for <img> content when real media exists. */
const ART: Record<string, [string, string, string]> = {
  party: ['#3B3348', '#6B5E76', '#A08C93'],
  gallery: ['#333A48', '#5D6878', '#9A9A8E'],
  stadium: ['#2C3A33', '#4E6455', '#8E9A7A'],
  river: ['#2C3A31', '#4C6152', '#8B9A85'],
  market: ['#413429', '#6E5844', '#A99172'],
  run: ['#2C3740', '#4E626E', '#8AA3A5'],
  portrait: ['#4A5464', '#7E8A9B', '#B6C0CC'],
  masp: ['#F2F2F2', '#E8E8E8', '#DCDCDC']
};

export type AvatarArt = keyof typeof ART;

export interface AvatarProps {
  /** Display name — initials are derived from it when no art/src. */
  name: string;
  /** Placeholder gradient key (prototype-era stand-in). */
  art?: AvatarArt;
  /** Real image URL — wins over art when given. */
  src?: string;
  size?: AvatarSize;
  className?: string;
}

export function Avatar({ name, art, src, size = 'md', className }: AvatarProps) {
  const initials = name
    .split(/[\s_]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  const gradient = art ? ART[art] : undefined;

  return (
    <span
      title={name}
      className={cn(
        'grid flex-none place-items-center overflow-hidden rounded-full bg-media',
        'font-semibold text-secondary',
        SIZE[size],
        className
      )}
      style={
        gradient && !src
          ? { background: `linear-gradient(145deg, ${gradient[0]} 0%, ${gradient[1]} 55%, ${gradient[2]} 100%)` }
          : undefined
      }
    >
      {src ? <img src={src} alt={name} className="h-full w-full object-cover" /> : gradient ? null : initials}
    </span>
  );
}

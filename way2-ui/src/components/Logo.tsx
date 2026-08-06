import { useId } from 'react';
import { LOGO_PATH, LOGO_VIEWBOX } from '../icons/logo-path';

export interface LogoProps {
  /** Width in px; height follows the mark's intrinsic 71:41 ratio. */
  width?: number;
  className?: string;
}

/**
 * The Way2 wordmark with the Orange Grad stroke, as it appears on the light
 * artboards. useId keeps gradient defs unique when several logos coexist.
 */
export function Logo({ width = 62, className }: LogoProps) {
  const id = useId();
  return (
    <svg
      className={className}
      width={width}
      viewBox={LOGO_VIEWBOX}
      role="img"
      aria-label="Way2"
      fill="none"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="0.6">
          <stop offset="0%" stopColor="#FF5C00" />
          <stop offset="100%" stopColor="#FF9900" />
        </linearGradient>
      </defs>
      <path
        d={LOGO_PATH}
        stroke={`url(#${id})`}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

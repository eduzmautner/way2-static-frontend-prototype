import { strokeGlyphs, filledGlyphs, type IconName } from '../icons/glyphs';

export type { IconName };

export interface IconProps {
  name: IconName;
  /** Render the filled variant where one exists (sparkle, heart, bookmark, check). */
  fill?: boolean;
  /** Pixel size — icons are square on a 24px grid. */
  size?: number;
  /** Stroke weight; the system default is 1.75, active nav uses 2.25. */
  strokeWidth?: number;
  className?: string;
}

/**
 * Way2 icon. Stroke-based, currentColor, 24x24 grid — color it with a text
 * utility on itself or a parent.
 */
export function Icon({ name, fill = false, size = 24, strokeWidth = 1.75, className }: IconProps) {
  const glyph = fill
    ? (filledGlyphs as Record<string, string>)[name] ?? strokeGlyphs[name]
    : strokeGlyphs[name];
  const isFilled = fill && name in filledGlyphs;
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={isFilled ? 'currentColor' : 'none'}
      stroke={isFilled ? 'none' : 'currentColor'}
      strokeWidth={isFilled ? undefined : strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: glyph }}
    />
  );
}

import { cn } from '../lib/cn';
import { Icon } from './Icon';

export interface SparkleLoaderProps {
  className?: string;
}

/** Three pulsing sparkles — the onboarding loading state. */
export function SparkleLoader({ className }: SparkleLoaderProps) {
  return (
    <div role="status" aria-label="Carregando" className={cn('flex justify-center gap-3', className)}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="text-primary [animation:w2-sparkle_1.2s_ease-in-out_infinite]"
          style={{ animationDelay: `${i * 0.18}s` }}
        >
          <Icon name="sparkle" size={22} fill />
        </span>
      ))}
      {/* Keyframes ship with the component so it works standalone */}
      <style>{`@keyframes w2-sparkle{0%,100%{opacity:.25;transform:scale(.86)}50%{opacity:1;transform:scale(1)}}`}</style>
    </div>
  );
}

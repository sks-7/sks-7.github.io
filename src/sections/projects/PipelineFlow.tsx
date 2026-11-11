import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Brain, Database, Layers, Server, ShieldCheck, User, type LucideIcon } from 'lucide-react';
import type { PipelineStep } from '../../types/portfolio';
import { cn } from '../../lib/cn';

const KIND: Record<PipelineStep['kind'], { icon: LucideIcon; tone: string; ring: string }> = {
  client: { icon: User, tone: 'text-fg', ring: 'border-line-strong' },
  guard: { icon: ShieldCheck, tone: 'text-accent', ring: 'border-accent/50' },
  llm: { icon: Brain, tone: 'text-accent-2', ring: 'border-accent-2/60' },
  service: { icon: Server, tone: 'text-accent', ring: 'border-accent/50' },
  queue: { icon: Layers, tone: 'text-accent-2', ring: 'border-accent-2/50' },
  store: { icon: Database, tone: 'text-metric', ring: 'border-metric/50' },
};

interface Props {
  steps: PipelineStep[];
  /** Step through the hops automatically, like a live trace. */
  autoplay?: boolean;
  className?: string;
}

/**
 * Architecture diagram: nodes joined by connectors that carry glowing data
 * packets. Hovering or focusing a node shows what that hop does.
 */
export function PipelineFlow({ steps, autoplay = true, className }: Props) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!autoplay || reduce || paused) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % steps.length), 1900);
    return () => window.clearInterval(id);
  }, [autoplay, reduce, paused, steps.length]);

  const current = steps[active];

  return (
    <div
      className={cn('relative z-10', className)}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <ol className="flex items-start" aria-label="Architecture, step by step">
        {steps.map((step, i) => {
          const { icon: Icon, tone, ring } = KIND[step.kind];
          const isActive = i === active;
          return (
            <li key={step.label} className={cn('flex min-w-0 items-start', i < steps.length - 1 && 'flex-1')}>
              <button
                type="button"
                onPointerEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                aria-label={`${step.label}: ${step.detail}`}
                className="group/node flex w-11 shrink-0 flex-col items-center gap-1.5 rounded-lg sm:w-14"
              >
                <span
                  className={cn(
                    'grid size-8 place-items-center rounded-xl border bg-surface transition-[box-shadow,transform,border-color] duration-300 sm:size-9',
                    ring,
                    tone,
                    isActive && 'scale-110 border-current shadow-[0_0_18px_-2px_currentColor]',
                  )}
                >
                  <Icon aria-hidden="true" className="size-4" />
                </span>
                <span
                  className={cn(
                    'text-center font-mono text-[9.5px] leading-tight transition-colors sm:text-[10.5px]',
                    isActive ? 'text-fg' : 'text-subtle',
                  )}
                >
                  {step.label}
                </span>
              </button>
              {i < steps.length - 1 && (
                <span aria-hidden="true" className="relative mt-4 h-px flex-1 bg-gradient-to-r from-line-strong via-accent/40 to-line-strong sm:mt-[18px]">
                  <span
                    className="absolute inset-0 animate-[travel_2.2s_linear_infinite]"
                    style={{ animationDelay: `${i * 0.3}s` }}
                  >
                    <span className="absolute -top-[2px] left-0 size-[5px] rounded-full bg-accent shadow-[0_0_8px_2px_var(--accent)]" />
                  </span>
                </span>
              )}
            </li>
          );
        })}
      </ol>

      <p aria-live="off" className="mt-3 min-h-[2.6em] font-mono text-[11px] leading-snug text-muted sm:text-xs">
        <span className="text-accent">{String(active + 1).padStart(2, '0')}</span>
        <span className="text-subtle"> › </span>
        <span className="text-fg">{current?.label}</span>
        <span className="text-subtle"> · </span>
        {current?.detail}
      </p>
    </div>
  );
}

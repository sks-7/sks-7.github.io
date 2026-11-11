import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { featuredStack as STACK } from '../data/skills';
import type { FeaturedSkill } from '../types/portfolio';
import { cn } from '../lib/cn';
import { spring } from '../lib/motion';

type Kind = FeaturedSkill['kind'];

const KIND: Record<Kind, { label: string; text: string; bar: string }> = {
  lang: { label: 'language', text: 'text-accent', bar: 'bg-accent' },
  ai: { label: 'ai / llm', text: 'text-accent-2', bar: 'bg-accent-2' },
  backend: { label: 'framework', text: 'text-accent', bar: 'bg-accent' },
  data: { label: 'data / streaming', text: 'text-metric', bar: 'bg-metric' },
  cloud: { label: 'cloud / devops', text: 'text-metric', bar: 'bg-metric' },
};

const STEP_MS = 1600;

/**
 * HUD tag inside the portrait that "detects" one skill at a time. Starts once
 * `active` is true (after the photo reveal); reduced motion shows a static list.
 */
export function StackScanner({ active }: { active: boolean }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!active || reduce) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % STACK.length), STEP_MS);
    return () => window.clearInterval(id);
  }, [active, reduce]);

  const item = STACK[index]!;
  const kind = KIND[item.kind];

  if (reduce) {
    return (
      <div className="glass absolute -top-6 left-1/2 w-[88%] -translate-x-1/2 rounded-2xl px-4 py-3 font-mono text-[0.7rem] text-muted">
        {STACK.slice(0, 6).map((s) => s.name).join(' · ')}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={active ? { opacity: 1, y: 0 } : undefined}
      transition={{ ...spring, delay: 1.1 }}
      style={{ z: 60 }}
      aria-hidden="true"
      className="glass absolute -top-7 left-1/2 w-[88%] -translate-x-1/2 overflow-hidden rounded-2xl"
    >
      <div className="flex items-center justify-between gap-2 px-3 pt-2 font-mono text-[0.6rem] uppercase tracking-[0.14em]">
        <span className="flex items-center gap-1.5 text-subtle">
          <span className="size-1.5 rounded-full bg-accent animate-[pulse-dot_0.9s_ease-in-out_infinite]" />
          scanning stack
        </span>
      </div>

      <div className="relative flex h-9 items-center gap-2 px-3">
        <span className={cn('font-mono text-sm', kind.text)}>›</span>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={item.name}
            initial={{ y: 18, opacity: 0, filter: 'blur(6px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            exit={{ y: -18, opacity: 0, filter: 'blur(6px)' }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className="flex min-w-0 flex-1 items-baseline justify-between gap-2"
          >
            <span className="truncate font-display text-lg font-semibold text-fg">{item.name}</span>
            <span className={cn('shrink-0 font-mono text-[0.6rem] uppercase tracking-wider', kind.text)}>{kind.label}</span>
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Progress bar that fills while each skill is on screen. */}
      <div className="h-[2px] w-full bg-line">
        <motion.div
          key={index}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: active ? 1 : 0 }}
          transition={{ duration: STEP_MS / 1000, ease: 'linear' }}
          className={cn('h-full origin-left shadow-[0_0_8px_currentColor]', kind.bar, kind.text)}
        />
      </div>
    </motion.div>
  );
}

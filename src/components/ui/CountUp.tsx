import { useEffect, useRef } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';

/** Splits "~1,000+" into prefix "~", number 1000, suffix "+". Ranges like "5k–10k" stay static. */
function parse(value: string) {
  const match = /^([^\d]*)(\d[\d,]*(?:\.\d+)?)(.*)$/.exec(value);
  if (!match || /\d/.test(match[3] ?? '')) return null;
  const [, prefix = '', digits = '', suffix = ''] = match;
  return { prefix, suffix, target: parseFloat(digits.replace(/,/g, '')), commas: digits.includes(',') };
}

/**
 * Counts a metric up from zero when it scrolls into view. The final value is
 * rendered from the start, so screen readers and no-JS see the real number.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const parsed = parse(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || !parsed || !inView || reduce) return;
    const { prefix, suffix, target, commas } = parsed;
    const format = (n: number) => {
      const rounded = Math.round(n);
      return `${prefix}${commas ? rounded.toLocaleString('en-US') : rounded}${suffix}`;
    };
    el.textContent = format(0);
    const controls = animate(0, target, {
      duration: Math.min(1.8, 0.8 + target / 800),
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (n) => (el.textContent = format(n)),
    });
    return () => controls.stop();
    // parsed is derived from value; re-run only when the value or visibility changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, inView, reduce]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}

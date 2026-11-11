import type { PointerEvent } from 'react';

/** Feeds the cursor position to `.glow-border` (as --mx / --my) so the glow follows it. */
export function trackGlow(event: PointerEvent<HTMLElement>) {
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
  el.style.setProperty('--my', `${event.clientY - rect.top}px`);
}

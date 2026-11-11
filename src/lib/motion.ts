import type { Transition, Variants } from 'framer-motion';

/** The site-wide spring: quick to settle, no wobble. */
export const spring: Transition = { type: 'spring', stiffness: 100, damping: 18, mass: 0.9 };

/** Parent that staggers its children's entrance. */
export const stagger = (step = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: step, delayChildren: delay } },
});

/** Child that rises into place. */
export const rise: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: spring },
};

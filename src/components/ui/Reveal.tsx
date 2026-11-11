import type { PointerEvent, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { spring } from '../../lib/motion';

interface RevealProps {
  children: ReactNode;
  as?: 'div' | 'li' | 'section';
  className?: string;
  /** Stagger in milliseconds. */
  delay?: number;
  onPointerMove?: (event: PointerEvent<HTMLElement>) => void;
}

const TAGS = { div: motion.div, li: motion.li, section: motion.section };

/**
 * Springs content into place once it scrolls into view. MotionConfig in App
 * drops the movement (keeps the fade) for visitors who prefer reduced motion.
 */
export function Reveal({ children, as = 'div', className, delay = 0, onPointerMove }: RevealProps) {
  const Tag = TAGS[as];
  return (
    <Tag
      className={className}
      onPointerMove={onPointerMove}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ ...spring, delay: delay / 1000 }}
    >
      {children}
    </Tag>
  );
}

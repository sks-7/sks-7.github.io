import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Stagger in milliseconds. */
  delay?: number;
}

/** Fades content in once it scrolls into view (disabled for reduced motion via CSS). */
export function Reveal({ children, as: Tag = 'div', className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn('reveal', visible && 'is-visible', className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

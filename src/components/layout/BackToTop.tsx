import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '../../lib/cn';

const RADIUS = 20;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/** Floating "back to top" control with a scroll-progress ring; appears after the hero. */
export function BackToTop() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <a
      href="#top"
      aria-label="Back to top"
      title="Back to top"
      inert={!visible}
      className={cn(
        'group fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 grid size-12 place-items-center rounded-full border border-line bg-surface/85 text-fg shadow-card backdrop-blur-md transition-[opacity,transform,border-color] duration-300 hover:border-accent sm:right-6 sm:bottom-6',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0',
      )}
    >
      <svg viewBox="0 0 48 48" aria-hidden="true" className="absolute inset-0 size-full -rotate-90">
        <circle
          cx="24"
          cy="24"
          r={RADIUS}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
        />
      </svg>
      <ArrowUp aria-hidden="true" className="size-5 transition-transform duration-200 group-hover:-translate-y-0.5" />
    </a>
  );
}

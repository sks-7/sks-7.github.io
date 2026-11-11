import { useRef } from 'react';
import { motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import portrait from '../Assests/me_img.jpeg';
import { experience } from '../data/experience';
import { profile } from '../data/profile';
import { spring } from '../lib/motion';
import { StackScanner } from './StackScanner';

const current = experience.find((role) => role.current);

/**
 * Portrait with an AI "scan" reveal, a rotating gradient ring, 3D tilt and a
 * light sweep on hover, a stack scanner card on top and a live status card below.
 */
export function Portrait() {
  const reduce = useReducedMotion();
  // Observe the unclipped frame: a fully clip-pathed element never reports as visible.
  const frame = useRef<HTMLDivElement>(null);
  const inView = useInView(frame, { once: true, amount: 0.35 });
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateY = useSpring(useTransform(px, [0, 1], [-10, 10]), { stiffness: 150, damping: 18 });
  const rotateX = useSpring(useTransform(py, [0, 1], [8, -8]), { stiffness: 150, damping: 18 });
  // Photo shifts slightly against the tilt for a parallax feel.
  const imgX = useSpring(useTransform(px, [0, 1], [8, -8]), { stiffness: 150, damping: 18 });
  const imgY = useSpring(useTransform(py, [0, 1], [8, -8]), { stiffness: 150, damping: 18 });

  return (
    <div className="relative mx-auto w-full max-w-[320px] [perspective:1100px]">
      {/* Ambient glow behind everything. */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -z-10 aspect-square w-[105%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_180deg,var(--accent),var(--accent-2),var(--metric),var(--accent))] opacity-30 blur-3xl motion-safe:animate-[spin_14s_linear_infinite]"
      />

      <motion.div
        onPointerMove={(event) => {
          if (reduce || event.pointerType !== 'mouse') return;
          const rect = event.currentTarget.getBoundingClientRect();
          px.set((event.clientX - rect.left) / rect.width);
          py.set((event.clientY - rect.top) / rect.height);
        }}
        onPointerLeave={() => {
          px.set(0.5);
          py.set(0.5);
        }}
        style={reduce ? undefined : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="group relative"
      >
        {/* Rotating gradient ring: an oversized conic square spinning behind a 2px gap. */}
        <div ref={frame} className="relative overflow-hidden rounded-[1.75rem] p-[2px] shadow-[0_30px_80px_-30px_var(--accent)]">
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 aspect-square w-[160%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0deg,var(--accent)_70deg,transparent_140deg,var(--accent-2)_220deg,transparent_290deg)] motion-safe:animate-[spin_6s_linear_infinite]"
          />

          <motion.div
            initial={reduce ? false : { clipPath: 'inset(0 0 100% 0)' }}
            animate={inView || reduce ? { clipPath: 'inset(0 0 0% 0)' } : undefined}
            transition={{ duration: 1.3, ease: [0.65, 0, 0.35, 1] }}
            className="relative overflow-hidden rounded-[1.65rem] bg-surface"
          >
            <motion.img
              src={portrait}
              alt={`Portrait of ${profile.name}`}
              width={1176}
              height={1337}
              loading="lazy"
              decoding="async"
              style={reduce ? undefined : { x: imgX, y: imgY, scale: 1.08 }}
              className="aspect-[4/5] w-full object-cover object-top"
            />

            {/* Subtle scanlines + tint for the "neural" look; fades on hover to show the photo clean. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgb(0_240_255/0.05)_0px,rgb(0_240_255/0.05)_1px,transparent_1px,transparent_4px)] mix-blend-screen transition-opacity duration-500 group-hover:opacity-0"
            />
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg/80 to-transparent" />

            {/* Light sweep on hover. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(105deg,transparent_35%,rgb(255_255_255/0.22)_50%,transparent_65%)] transition-transform duration-[1100ms] ease-out group-hover:translate-x-full"
            />

            {/* Scanner line that runs down once as the photo is revealed. */}
            {!reduce && (
              <motion.div
                aria-hidden="true"
                initial={{ top: '0%', opacity: 1 }}
                animate={inView ? { top: '100%', opacity: [1, 1, 0] } : undefined}
                transition={{ duration: 1.3, ease: [0.65, 0, 0.35, 1] }}
                className="pointer-events-none absolute inset-x-0 h-[2px] bg-accent shadow-[0_0_18px_4px_var(--accent)]"
              />
            )}

            {/* Corner brackets, like a detection box. */}
            {['top-3 left-3 border-t-2 border-l-2', 'top-3 right-3 border-t-2 border-r-2', 'bottom-3 left-3 border-b-2 border-l-2', 'bottom-3 right-3 border-b-2 border-r-2'].map((pos) => (
              <span key={pos} aria-hidden="true" className={`pointer-events-none absolute size-5 rounded-[3px] border-accent/80 ${pos}`} />
            ))}
          </motion.div>
        </div>


        {/* Major languages & tools, detected one by one, overlapping the top edge. */}
        <StackScanner active={inView} />

        {/* Live status card overlapping the bottom edge. */}
        {current && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...spring, delay: 1.2 }}
            style={{ z: 60 }}
            className="glass absolute -bottom-6 left-1/2 flex w-[88%] -translate-x-1/2 items-center gap-3 rounded-2xl px-4 py-3"
          >
            <span className="relative flex size-2.5 shrink-0" aria-hidden="true">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-metric opacity-60" />
              <span className="relative inline-flex size-2.5 rounded-full bg-metric" />
            </span>
            <span className="min-w-0 text-xs leading-snug">
              <span className="block font-mono uppercase tracking-wider text-metric">Currently building</span>
              <span className="block truncate text-fg">
                AI agents @ {current.company}
              </span>
            </span>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

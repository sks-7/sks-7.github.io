import { useId, useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { experience } from '../data/experience';
import type { Role } from '../types/portfolio';
import { Section } from '../components/layout/Section';
import { BadgeList } from '../components/ui/Badge';
import { CountUp } from '../components/ui/CountUp';
import { Reveal } from '../components/ui/Reveal';
import { RichText } from '../components/ui/RichText';
import { cn } from '../lib/cn';
import { trackGlow } from '../lib/pointer';

const VISIBLE_HIGHLIGHTS = 3;
const VISIBLE_STACK = 8;

export function Experience() {
  const timeline = useRef<HTMLDivElement>(null);
  // The timeline draws itself as the section scrolls through the viewport.
  const { scrollYProgress } = useScroll({ target: timeline, offset: ['start 75%', 'end 60%'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 26, restDelta: 0.001 });

  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Where I've shipped."
      lead="Three roles, from field operations to trading platforms to AI agents. Every number below is taken from my resume."
    >
      <div ref={timeline} className="relative">
        <span aria-hidden="true" className="absolute top-2 bottom-2 left-[7px] hidden w-px bg-line md:block" />
        <motion.span
          aria-hidden="true"
          style={{ scaleY }}
          className="absolute top-2 bottom-2 left-[7px] hidden w-px origin-top bg-gradient-to-b from-accent via-accent-2 to-metric shadow-[0_0_10px_var(--accent)] md:block"
        />
        <ol className="space-y-6 sm:space-y-8">
        {experience.map((role, i) => (
          <Reveal as="li" key={role.id} delay={i * 60} className="relative md:pl-12">
            <span
              aria-hidden="true"
              className={cn(
                'absolute top-7 left-0 hidden size-[15px] rounded-full border-2 border-bg md:block',
                role.current ? 'bg-accent shadow-[0_0_0_4px_var(--accent-soft),0_0_16px_var(--accent)]' : 'bg-line-strong',
              )}
            />
            <RoleCard role={role} />
          </Reveal>
        ))}
        </ol>
      </div>
    </Section>
  );
}

function RoleCard({ role }: { role: Role }) {
  const [expanded, setExpanded] = useState(false);
  const detailsId = useId();
  const hiddenHighlights = role.highlights.slice(VISIBLE_HIGHLIGHTS);
  const hiddenStack = role.stack.length - VISIBLE_STACK;
  const hasMore = hiddenHighlights.length > 0 || hiddenStack > 0;

  return (
    <article onPointerMove={trackGlow} className="glass glow-border group rounded-3xl p-5 sm:p-8">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-xl font-semibold sm:text-2xl">{role.company}</h3>
          {role.client && <p className="text-sm text-subtle">Client: {role.client}</p>}
          <p className="mt-1 text-accent">{role.title}</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted sm:flex-col sm:items-end sm:gap-1">
          <span className="font-mono">
            <time>{role.start}</time> – <time>{role.end}</time>
          </span>
          <span>{role.location}</span>
          {role.current && (
            <span className="rounded-full bg-metric-soft px-2 py-0.5 text-xs font-medium text-metric">Current</span>
          )}
        </div>
      </header>

      <ul className="mt-6 grid grid-cols-3 gap-2" aria-label="Key results">
        {role.metrics.map((metric) => (
          <li key={metric.label} className="rounded-2xl border border-line bg-bg/40 px-3 py-3 transition-colors group-hover:border-metric/30 sm:px-4">
            <CountUp value={metric.value} className="block font-mono text-lg font-medium text-metric sm:text-xl" />
            <span className="block text-[0.7rem] leading-snug text-muted sm:text-xs">{metric.label}</span>
          </li>
        ))}
      </ul>

      <ul className="mt-6 space-y-3">
        {role.highlights.slice(0, VISIBLE_HIGHLIGHTS).map((item) => (
          <Highlight key={item} text={item} />
        ))}
      </ul>

      <div
        id={detailsId}
        className={cn('grid transition-[grid-template-rows] duration-300', expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}
        inert={!expanded}
      >
        <div className="overflow-hidden">
          {hiddenHighlights.length > 0 && (
            <ul className="mt-3 space-y-3">
              {hiddenHighlights.map((item) => (
                <Highlight key={item} text={item} />
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mt-6 border-t border-line pt-5">
        <BadgeList items={expanded ? role.stack : role.stack.slice(0, VISIBLE_STACK)} />
        {hasMore && (
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls={detailsId}
            onClick={() => setExpanded((value) => !value)}
            className="mt-4 inline-flex items-center gap-1.5 rounded-full text-sm font-medium text-accent hover:underline"
          >
            {expanded ? 'Show less' : `Show all ${role.highlights.length} achievements & full stack`}
            <ChevronDown
              aria-hidden="true"
              className={cn('size-4 transition-transform duration-300', expanded && 'rotate-180')}
            />
          </button>
        )}
      </div>
    </article>
  );
}

function Highlight({ text }: { text: string }) {
  return (
    <li className="flex gap-3 leading-relaxed text-muted">
      <span aria-hidden="true" className="mt-[0.65em] size-1.5 shrink-0 rounded-full bg-accent" />
      <span>
        <RichText text={text} />
      </span>
    </li>
  );
}

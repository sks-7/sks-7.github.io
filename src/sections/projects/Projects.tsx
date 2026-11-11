import { useState, type PointerEvent } from 'react';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { ArrowUpRight, Lock } from 'lucide-react';
import { caseStudies, otherWork } from '../../data/projects';
import type { CaseStudy, ProjectCategory } from '../../types/portfolio';
import { Section } from '../../components/layout/Section';
import { BadgeList } from '../../components/ui/Badge';
import { CountUp } from '../../components/ui/CountUp';
import { Reveal } from '../../components/ui/Reveal';
import { RichText } from '../../components/ui/RichText';
import { cn } from '../../lib/cn';
import { spring } from '../../lib/motion';
import { PipelineFlow } from './PipelineFlow';
import { ProjectDialog } from './ProjectDialog';

type Filter = 'all' | ProjectCategory;

const FILTERS: Array<{ id: Filter; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'ai', label: 'AI / LLM' },
  { id: 'backend', label: 'Backend / Systems' },
];

const count = (filter: Filter) =>
  filter === 'all' ? caseStudies.length : caseStudies.filter((s) => s.category === filter).length;

export function Projects() {
  const [selected, setSelected] = useState<CaseStudy | null>(null);
  const [filter, setFilter] = useState<Filter>('all');
  const visible = caseStudies.filter((s) => filter === 'all' || s.category === filter);

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Selected engineering work."
      lead="Case studies from production systems I built for employers and clients. The code is proprietary, so each card shows the architecture, my part in it and the measured results."
    >
      <Reveal className="mb-8">
        <div role="group" aria-label="Filter projects" className="glass inline-flex max-w-full gap-1 overflow-x-auto rounded-full p-1">
          {FILTERS.map((item) => {
            const isActive = filter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setFilter(item.id)}
                className={cn(
                  'relative shrink-0 rounded-full px-4 py-2 text-sm whitespace-nowrap transition-colors',
                  isActive ? 'text-fg' : 'text-muted hover:text-fg',
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="project-filter"
                    aria-hidden="true"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute inset-0 -z-10 rounded-full border border-accent/30 bg-accent-soft shadow-[0_0_18px_-6px_var(--accent)]"
                  />
                )}
                {item.label}
                <span className="ml-1.5 font-mono text-xs text-subtle">{count(item.id)}</span>
              </button>
            );
          })}
        </div>
      </Reveal>

      <motion.ul layout className="grid gap-5 md:grid-cols-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((study, i) => {
            // In the full list, first and last span the row; a lone result always does.
            const featured = visible.length === 1 || (filter === 'all' && (i === 0 || i === visible.length - 1));
            return (
              <motion.li
                layout
                key={study.id}
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={spring}
                className={cn(featured && 'md:col-span-2')}
              >
                <Reveal className="h-full" delay={(i % 2) * 80}>
                  <CaseStudyCard study={study} featured={featured} reversed={featured && i > 0} onOpen={() => setSelected(study)} />
                </Reveal>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>

      <Reveal className="mt-16">
        <h3 className="mb-5 font-mono text-xs uppercase tracking-[0.18em] text-subtle">Also built</h3>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {otherWork.map((item, i) => (
            <Reveal
              as="li"
              key={item.title}
              delay={i * 70}
              className="glass flex flex-col rounded-2xl p-5 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-accent/40"
            >
              {item.metric && (
                <p className="mb-3">
                  <CountUp value={item.metric.value} className="font-mono text-xl text-metric" />{' '}
                  <span className="text-xs text-muted">{item.metric.label}</span>
                </p>
              )}
              <h4 className="font-medium">{item.title}</h4>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                <RichText text={item.body} />
              </p>
              <BadgeList items={item.stack} className="mt-4" />
            </Reveal>
          ))}
        </ul>
      </Reveal>

      <ProjectDialog study={selected} onClose={() => setSelected(null)} />
    </Section>
  );
}

interface CardProps {
  study: CaseStudy;
  featured: boolean;
  reversed?: boolean;
  onOpen: () => void;
}

const TILT = 5;

function CaseStudyCard({ study, featured, reversed, onOpen }: CardProps) {
  const reduce = useReducedMotion();
  const [view, setView] = useState<'architecture' | 'impact'>('architecture');
  const rotateX = useSpring(useMotionValue(0), { stiffness: 160, damping: 18 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 160, damping: 18 });
  const [primary, ...rest] = study.results;
  const isAi = study.category === 'ai';

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    el.style.setProperty('--mx', `${px * 100}%`);
    el.style.setProperty('--my', `${py * 100}%`);
    if (reduce || event.pointerType !== 'mouse') return;
    // Wide featured cards tilt less so text stays readable.
    const max = featured ? TILT * 0.5 : TILT;
    rotateY.set((px - 0.5) * 2 * max);
    rotateX.set((0.5 - py) * 2 * max);
  };

  return (
    <div className="h-full [perspective:1400px]">
      <motion.article
        onPointerMove={onPointerMove}
        onPointerLeave={() => {
          rotateX.set(0);
          rotateY.set(0);
        }}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className={cn(
          'glass glow-border group relative flex h-full flex-col overflow-hidden rounded-3xl',
          featured && (reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'),
        )}
      >
        <div
          className={cn(
            'relative flex flex-col border-b border-line bg-surface-2/40 px-5 pt-4 pb-3 sm:px-6',
            featured ? cn('lg:w-[46%] lg:justify-center lg:border-b-0', reversed ? 'lg:border-l' : 'lg:border-r') : '',
          )}
        >
          <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_75%)]" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_100%,var(--glow),transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          <div className="relative z-10 mb-4 flex items-center justify-between gap-3">
            <span
              className={cn(
                'rounded-md border px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider',
                isAi ? 'border-accent-2/40 bg-accent-2/10 text-accent-2' : 'border-metric/40 bg-metric/10 text-metric',
              )}
            >
              {isAi ? 'AI / LLM' : 'Backend / Systems'}
            </span>
            <div role="group" aria-label="Card view" className="flex rounded-full border border-line bg-bg/60 p-0.5">
              {(['architecture', 'impact'] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={view === option}
                  onClick={() => setView(option)}
                  className={cn(
                    'relative rounded-full px-2.5 py-1 font-mono text-[0.65rem] capitalize transition-colors',
                    view === option ? 'text-fg' : 'text-subtle hover:text-fg',
                  )}
                >
                  {view === option && (
                    <motion.span
                      layoutId={`view-${study.id}`}
                      aria-hidden="true"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      className="absolute inset-0 -z-10 rounded-full bg-surface-2 shadow-card"
                    />
                  )}
                  {option}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            {view === 'architecture' ? (
              <motion.div key="arch" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                <PipelineFlow steps={study.pipeline} />
              </motion.div>
            ) : (
              <motion.ul
                key="impact"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="relative z-10 grid grid-cols-2 gap-2 pb-1 sm:grid-cols-3"
                aria-label="Results"
              >
                {study.results.map((result) => (
                  <li key={result.label} className="rounded-xl border border-line bg-bg/50 px-3 py-2.5">
                    <span className="block font-mono text-lg text-metric">{result.value}</span>
                    <span className="block text-[0.7rem] leading-snug text-muted">{result.label}</span>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <p className="flex items-center gap-1.5 text-xs text-subtle">
            <Lock aria-hidden="true" className="size-3.5" />
            {study.context}
          </p>
          <h3 className={cn('mt-2 font-semibold', featured ? 'text-2xl sm:text-3xl' : 'text-xl')}>{study.title}</h3>
          <p className="mt-3 leading-relaxed text-muted">
            <RichText text={study.problem} />
          </p>

          {primary && (
            <div className="mt-5">
              <p className="flex items-baseline gap-2">
                <CountUp value={primary.value} className="font-mono text-3xl font-medium text-metric [text-shadow:0_0_24px_var(--metric-soft)]" />
                <span className="text-sm text-muted">{primary.label}</span>
              </p>
              {rest.length > 0 && (
                // Touch screens always show these; pointer devices reveal them on hover/focus.
                <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 overflow-hidden transition-[max-height,opacity] duration-500 can-hover:max-h-0 can-hover:opacity-0 can-hover:group-hover:max-h-24 can-hover:group-hover:opacity-100 can-hover:group-focus-within:max-h-24 can-hover:group-focus-within:opacity-100">
                  {rest.map((result) => (
                    <li key={result.label} className="font-mono text-xs text-muted">
                      <span className="text-metric">{result.value}</span> {result.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <BadgeList items={featured ? study.stack : study.stack.slice(0, 6)} className="mt-5" />

          <div className="mt-auto pt-6">
            {/* Stretched button: the whole card body is the click target. */}
            <button
              type="button"
              onClick={onOpen}
              aria-haspopup="dialog"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent after:absolute after:inset-0 after:rounded-3xl after:content-['']"
            >
              Read case study
              <span className="sr-only">: {study.title}</span>
              <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

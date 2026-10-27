import { useState } from 'react';
import { ArrowUpRight, Lock } from 'lucide-react';
import { caseStudies, otherWork } from '../../data/projects';
import type { CaseStudy } from '../../types/portfolio';
import { Section } from '../../components/layout/Section';
import { BadgeList } from '../../components/ui/Badge';
import { Reveal } from '../../components/ui/Reveal';
import { RichText } from '../../components/ui/RichText';
import { cn } from '../../lib/cn';
import { ProjectArt } from './ProjectArt';
import { ProjectDialog } from './ProjectDialog';

export function Projects() {
  const [selected, setSelected] = useState<CaseStudy | null>(null);

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Selected engineering work."
      lead="Case studies from production systems I built for employers and clients. The code is proprietary, so each card explains the problem, my part in it, the key decisions and the results."
    >
      <ul className="grid gap-5 md:grid-cols-2">
        {caseStudies.map((study, i) => {
          // First and last case studies span the full row so the grid stays balanced.
          const featured = i === 0 || i === caseStudies.length - 1;
          return (
            <Reveal as="li" key={study.id} delay={(i % 2) * 80} className={cn(featured && 'md:col-span-2')}>
              <CaseStudyCard
                study={study}
                featured={featured}
                reversed={featured && i > 0}
                onOpen={() => setSelected(study)}
              />
            </Reveal>
          );
        })}
      </ul>

      <Reveal className="mt-16">
        <h3 className="mb-5 font-mono text-xs uppercase tracking-[0.18em] text-subtle">Also built</h3>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {otherWork.map((item) => (
            <li key={item.title} className="flex flex-col rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-line-strong">
              {item.metric && (
                <p className="mb-3">
                  <span className="font-mono text-xl text-metric">{item.metric.value}</span>{' '}
                  <span className="text-xs text-muted">{item.metric.label}</span>
                </p>
              )}
              <h4 className="font-medium">{item.title}</h4>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                <RichText text={item.body} />
              </p>
              <BadgeList items={item.stack} className="mt-4" />
            </li>
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

function CaseStudyCard({ study, featured, reversed, onOpen }: CardProps) {
  const primary = study.results[0];
  return (
    <article
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface shadow-card transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-line-strong',
        featured && (reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'),
      )}
    >
      <div
        className={cn(
          'relative border-b border-line bg-surface-2/50 px-6 py-5',
          featured
            ? cn('h-40 lg:h-auto lg:w-[42%] lg:border-b-0', reversed ? 'lg:border-l' : 'lg:border-r')
            : 'h-36',
        )}
      >
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_100%,var(--glow),transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <ProjectArt id={study.id} />
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
          <p className="mt-5 flex items-baseline gap-2">
            <span className="font-mono text-2xl font-medium text-metric">{primary.value}</span>
            <span className="text-sm text-muted">{primary.label}</span>
          </p>
        )}

        <BadgeList items={featured ? study.stack : study.stack.slice(0, 5)} className="mt-5" />

        <div className="mt-auto pt-6">
          {/* Stretched button: the whole card is the click target, one tab stop. */}
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
    </article>
  );
}

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Reveal } from '../ui/Reveal';
import { ScrambleText } from '../ui/ScrambleText';
import { SplitReveal } from '../ui/SplitReveal';

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8', className)}>{children}</div>;
}

interface SectionProps {
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
  children: ReactNode;
  className?: string;
}

/** A page section with a consistent heading block. */
export function Section({ id, eyebrow, title, lead, children, className }: SectionProps) {
  const headingId = `${id}-title`;
  return (
    <section id={id} aria-labelledby={headingId} className={cn('py-16 sm:py-24', className)}>
      <Container>
        <div className="mb-10 max-w-2xl sm:mb-14">
          <p className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-accent">
            <span aria-hidden="true" className="h-px w-6 bg-gradient-to-r from-transparent to-accent" />
            <ScrambleText text={eyebrow} />
          </p>
          <h2 id={headingId} className="text-3xl font-semibold sm:text-4xl">
            <SplitReveal text={title} />
          </h2>
          {lead && (
            <Reveal delay={150}>
              <p className="mt-4 text-base text-muted sm:text-lg">{lead}</p>
            </Reveal>
          )}
        </div>
        {children}
      </Container>
    </section>
  );
}

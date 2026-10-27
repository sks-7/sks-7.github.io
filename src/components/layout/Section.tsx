import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Reveal } from '../ui/Reveal';

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
        <Reveal className="mb-10 max-w-2xl sm:mb-14">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-accent">{eyebrow}</p>
          <h2 id={headingId} className="text-3xl font-semibold sm:text-4xl">
            {title}
          </h2>
          {lead && <p className="mt-4 text-base text-muted sm:text-lg">{lead}</p>}
        </Reveal>
        {children}
      </Container>
    </section>
  );
}

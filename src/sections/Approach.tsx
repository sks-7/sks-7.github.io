import { principles } from '../data/skills';
import { Section } from '../components/layout/Section';
import { Reveal } from '../components/ui/Reveal';

export function Approach() {
  return (
    <Section
      id="approach"
      eyebrow="Approach"
      title="How I build."
      lead="Each principle below comes from work described in the experience section."
      className="border-y border-line bg-surface/40"
    >
      <ol className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {principles.map((principle, i) => (
          <Reveal as="li" key={principle.title} delay={(i % 3) * 60} className="bg-bg p-6 sm:p-7">
            <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="mt-3 text-lg font-medium">{principle.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{principle.body}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

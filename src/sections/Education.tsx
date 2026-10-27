import { GraduationCap } from 'lucide-react';
import { education } from '../data/profile';
import { Section } from '../components/layout/Section';
import { Reveal } from '../components/ui/Reveal';

export function Education() {
  return (
    <Section id="education" eyebrow="Education" title="Education & certifications.">
      <ul className="grid gap-4 md:grid-cols-2">
        {education.map((item, i) => (
          <Reveal as="li" key={item.institution} delay={i * 60} className="flex gap-4 rounded-3xl border border-line bg-surface p-6">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
              <GraduationCap aria-hidden="true" className="size-5" />
            </span>
            <div>
              <h3 className="font-medium">{item.institution}</h3>
              <p className="mt-1 text-muted">{item.credential}</p>
              <p className="mt-2 font-mono text-sm text-subtle">{item.period}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

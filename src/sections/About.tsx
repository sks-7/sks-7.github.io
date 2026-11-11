import { Briefcase, GraduationCap, MapPin, Terminal } from 'lucide-react';
import { experience } from '../data/experience';
import { education, profile } from '../data/profile';
import { Section } from '../components/layout/Section';
import { Reveal } from '../components/ui/Reveal';
import { RichText } from '../components/ui/RichText';
import { Portrait } from './Portrait';

const current = experience.find((role) => role.current);
const degree = education[0];

const facts = [
  { icon: MapPin, label: 'Based in', value: profile.location },
  current && {
    icon: Briefcase,
    label: 'Currently',
    value: `${current.title}, ${current.company}${current.client ? ` (client: ${current.client})` : ''}`,
  },
  { icon: Terminal, label: 'Primary languages', value: 'Go · Python · TypeScript' },
  degree && { icon: GraduationCap, label: 'Education', value: `${degree.credential}, ${degree.institution}` },
].filter((fact) => !!fact);

export function About() {
  return (
    <Section id="about" eyebrow="About" title="Backend engineer, systems thinker." className="overflow-x-clip">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-16">
        <div className="mt-8 mb-8 lg:mb-0">
          <Portrait />
        </div>

        <div>
          <Reveal>
            <p className="text-lg leading-relaxed text-muted sm:text-xl">
              <RichText text={profile.summary} />
            </p>
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-6 leading-relaxed text-muted">
              My work has moved from offline-first field operations at <span className="text-fg">Pivotroots</span>, to
              trading and streaming systems at <span className="text-fg">Winsoft Technologies</span> for Choice Broking,
              to LLM agents at <span className="text-fg">Atrina Technology</span> for 1 Finance. In each role, the
              systems I worked on had to be both correct and fast.
            </p>
          </Reveal>

          <Reveal delay={140}>
            <dl className="mt-10 grid gap-3 sm:grid-cols-2">
              {facts.map(({ icon: Icon, label, value }) => (
                <div key={label} className="glass flex gap-3 rounded-2xl p-4 transition-colors hover:border-accent/40">
                  <Icon aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-accent" />
                  <div className="min-w-0">
                    <dt className="text-xs uppercase tracking-wider text-subtle">{label}</dt>
                    <dd className="mt-1 text-sm text-fg">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

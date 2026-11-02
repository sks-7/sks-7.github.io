import { Briefcase, GraduationCap, MapPin, Terminal } from 'lucide-react';
import portrait from '../Assests/me_img.jpeg';
import { experience } from '../data/experience';
import { education, profile } from '../data/profile';
import { Section } from '../components/layout/Section';
import { Reveal } from '../components/ui/Reveal';
import { RichText } from '../components/ui/RichText';

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
    <Section id="about" eyebrow="About" title="Backend engineer, systems thinker.">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-16">
        <Reveal className="mx-auto w-full max-w-[320px]">
          <div className="relative">
            <div aria-hidden="true" className="absolute -inset-3 -z-10 rounded-[1.75rem] bg-gradient-to-br from-accent/25 to-accent-2/25 blur-2xl" />
            <img
              src={portrait}
              alt={`Portrait of ${profile.name}`}
              width={1176}
              height={1337}
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full rounded-3xl border border-line object-cover object-top"
            />
          </div>
        </Reveal>

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
                <div key={label} className="flex gap-3 rounded-2xl border border-line bg-surface p-4">
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

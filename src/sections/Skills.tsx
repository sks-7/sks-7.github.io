import { BrainCircuit, Cloud, Code2, Database, Layers, Network, type LucideIcon } from 'lucide-react';
import { skillGroups } from '../data/skills';
import { Section } from '../components/layout/Section';
import { Reveal } from '../components/ui/Reveal';

const ICONS: Record<string, LucideIcon> = {
  'Languages & Core': Code2,
  'AI & Agentic Systems': BrainCircuit,
  'Frameworks & Runtimes': Layers,
  'Distributed Systems & Messaging': Network,
  'Databases & Storage': Database,
  'DevOps, Cloud & Monitoring': Cloud,
};

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="The toolkit, grouped by what it's for."
      lead="Everything listed here comes straight from my resume."
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => {
          const Icon = ICONS[group.title] ?? Code2;
          return (
            <Reveal as="li" key={group.title} delay={(i % 3) * 60} className="rounded-3xl border border-line bg-surface p-6 transition-colors hover:border-line-strong">
              <div className="mb-4 flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-xl bg-accent-soft text-accent">
                  <Icon aria-hidden="true" className="size-[18px]" />
                </span>
                <h3 className="font-medium">{group.title}</h3>
              </div>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item} className="rounded-full border border-line px-3 py-1 text-sm text-muted transition-colors hover:border-accent hover:text-fg">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}

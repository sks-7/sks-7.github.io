import { motion } from 'framer-motion';
import { BrainCircuit, Cloud, Code2, Database, Layers, Network, Server, type LucideIcon } from 'lucide-react';
import { skillGroups } from '../data/skills';
import type { SkillGroup } from '../types/portfolio';
import { Section } from '../components/layout/Section';
import { Reveal } from '../components/ui/Reveal';
import { cn } from '../lib/cn';
import { spring, stagger } from '../lib/motion';
import { trackGlow } from '../lib/pointer';
import { usedAt } from '../lib/production';

const ICONS: Record<string, LucideIcon> = {
  'Languages & Core': Code2,
  'AI & Agentic Systems': BrainCircuit,
  'Frameworks & Runtimes': Layers,
  'Distributed Systems & Messaging': Network,
  'Databases & Storage': Database,
  'DevOps, Cloud & Monitoring': Cloud,
};

type Tone = 'ai' | 'backend';

const TONE: Record<Tone, { text: string; soft: string; hover: string }> = {
  ai: { text: 'text-accent-2', soft: 'bg-accent-2/10', hover: 'hover:border-accent-2/60 hover:shadow-[0_0_18px_-6px_var(--accent-2)]' },
  backend: { text: 'text-accent', soft: 'bg-accent-soft', hover: 'hover:border-accent/60 hover:shadow-[0_0_18px_-6px_var(--accent)]' },
};

const allItems = skillGroups.flatMap((g) => g.items);
const productionCount = allItems.filter((item) => usedAt(item).length > 0).length;

const byDomain = (domain: SkillGroup['domain']) => skillGroups.filter((g) => g.domain === domain);

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="AI systems on top, backend infrastructure underneath."
      lead="Everything here comes from my resume. A green badge means I used it in production in one of the roles above."
    >
      <Reveal className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-muted">
        <span className="inline-flex items-center gap-2">
          <ProdDot />
          Production: used in a listed role
        </span>
        <span>
          <span className="text-metric">{productionCount}</span> of {allItems.length} skills shipped to production
        </span>
      </Reveal>

      <div className="grid gap-5 lg:grid-cols-[1fr_1.45fr]">
        <div className="flex flex-col gap-5">
          <Panel title="AI / Machine Learning" icon={BrainCircuit} tone="ai" groups={byDomain('ai')} />
          <Panel title="Core languages" icon={Code2} tone="backend" groups={byDomain('core')} compact />
        </div>
        <Panel title="Backend & Infrastructure" icon={Server} tone="backend" groups={byDomain('backend')} split />
      </div>
    </Section>
  );
}

interface PanelProps {
  title: string;
  icon: LucideIcon;
  tone: Tone;
  groups: SkillGroup[];
  /** Lay sub-groups out in two columns. */
  split?: boolean;
  /** Hide the sub-group headings (single-group panels). */
  compact?: boolean;
}

function Panel({ title, icon: Icon, tone, groups, split, compact }: PanelProps) {
  const t = TONE[tone];
  return (
    <Reveal className="glass glow-border rounded-3xl p-6 sm:p-7" onPointerMove={trackGlow}>
      <header className="mb-5 flex items-center gap-3">
        <span className={cn('grid size-10 place-items-center rounded-xl', t.soft, t.text)}>
          <Icon aria-hidden="true" className="size-5" />
        </span>
        <h3 className="text-lg font-semibold">{title}</h3>
      </header>

      <div className={cn('grid gap-6', split && 'sm:grid-cols-2')}>
        {groups.map((group) => {
          const GroupIcon = ICONS[group.title] ?? Code2;
          return (
            <div key={group.title}>
              {!compact && (
                <h4 className="mb-3 flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-subtle">
                  <GroupIcon aria-hidden="true" className="size-3.5" />
                  {group.title}
                </h4>
              )}
              <motion.ul
                variants={stagger(0.035)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="flex flex-wrap gap-2"
              >
                {group.items.map((item) => {
                  const where = usedAt(item);
                  return (
                    <motion.li
                      key={item}
                      variants={{ hidden: { opacity: 0, y: 10, scale: 0.92 }, show: { opacity: 1, y: 0, scale: 1, transition: spring } }}
                      whileHover={{ y: -2 }}
                      title={where.length ? `Used in production at ${where.join(', ')}` : undefined}
                      className={cn(
                        'inline-flex items-center gap-1.5 rounded-full border border-line bg-bg/40 px-3 py-1 text-sm text-muted transition-[border-color,color,box-shadow] hover:text-fg',
                        t.hover,
                      )}
                    >
                      {item}
                      {where.length > 0 && (
                        <>
                          <ProdDot />
                          <span className="sr-only">(used in production at {where.join(', ')})</span>
                        </>
                      )}
                    </motion.li>
                  );
                })}
              </motion.ul>
            </div>
          );
        })}
      </div>
    </Reveal>
  );
}

function ProdDot() {
  return <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-metric shadow-[0_0_6px_var(--metric)]" />;
}

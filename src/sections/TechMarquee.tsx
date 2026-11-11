import { featuredStack } from '../data/skills';
import type { FeaturedSkill } from '../types/portfolio';
import { Container } from '../components/layout/Section';
import { Reveal } from '../components/ui/Reveal';
import { cn } from '../lib/cn';
import { trackGlow } from '../lib/pointer';

const DOT: Record<FeaturedSkill['kind'], string> = {
  lang: 'bg-accent',
  ai: 'bg-accent-2',
  backend: 'bg-accent',
  data: 'bg-metric',
  cloud: 'bg-metric',
};

const half = Math.ceil(featuredStack.length / 2);
const ROWS = [featuredStack.slice(0, half), featuredStack.slice(half)];

/** Two endless rows of the featured stack drifting in opposite directions. Pauses on hover. */
export function TechMarquee() {
  return (
    <section aria-labelledby="stack-title" className="py-8 sm:py-12">
      <Container>
        <Reveal onPointerMove={trackGlow} className="glass glow-border overflow-hidden rounded-3xl py-6 sm:py-7">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-2 px-6 sm:px-7">
            <h2 id="stack-title" className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-accent">
              <span aria-hidden="true" className="h-px w-6 bg-gradient-to-r from-transparent to-accent" />
              Stack I ship with
            </h2>
          </div>

          <div className="flex flex-col gap-3 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
            {ROWS.map((row, r) => (
              <div key={r} className="group flex overflow-hidden">
                {/* Two copies so the loop is seamless; the second is hidden from assistive tech. */}
                {[0, 1].map((copy) => (
                  <ul
                    key={copy}
                    aria-hidden={copy === 1 || undefined}
                    className={cn(
                      'flex shrink-0 items-center gap-3 pr-3 group-hover:[animation-play-state:paused]',
                      r === 0 ? 'animate-[marquee_38s_linear_infinite]' : 'animate-[marquee-reverse_42s_linear_infinite]',
                    )}
                  >
                    {row.map((skill) => (
                      <li
                        key={skill.name}
                        className="flex items-center gap-2 rounded-full border border-line bg-bg/40 px-4 py-2 font-mono text-sm whitespace-nowrap text-muted transition-colors hover:border-accent/50 hover:text-fg"
                      >
                        <span aria-hidden="true" className={cn('size-1.5 rounded-full', DOT[skill.kind])} />
                        {skill.name}
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

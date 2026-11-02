import { ArrowRight, Download, MapPin } from 'lucide-react';
import { experience } from '../data/experience';
import { headlineMetrics, profile } from '../data/profile';
import { Container } from '../components/layout/Section';
import { BrandIcon } from '../components/ui/BrandIcon';
import { ButtonLink } from '../components/ui/Button';
import { CodeWindow } from './CodeWindow';

const current = experience.find((role) => role.current);

/** Stagger helper for the entrance animation. */
const rise = (step: number) => ({ animationDelay: `${step * 80}ms` });

export function Hero() {
  return (
    <section id="top" aria-label="Introduction" className="relative overflow-hidden pt-28 pb-8 sm:pt-36 sm:pb-12">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[520px] w-[820px] max-w-[160vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)]"
      />

      <Container className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div>
          {current && (
            <p
              className="animate-rise mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1.5 text-xs text-muted sm:text-sm"
              style={rise(0)}
            >
              <span className="relative flex size-2" aria-hidden="true">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-metric opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-metric" />
              </span>
              <span className="truncate">
                {current.title} at <span className="text-fg">{current.company}</span>
              </span>
            </p>
          )}

          <h1 className="animate-rise text-[2.6rem] leading-[1.05] font-semibold sm:text-6xl lg:text-[4.1rem]" style={rise(1)}>
            {profile.name}
            <span className="mt-2 block text-gradient">{profile.title}</span>
          </h1>

          <p className="animate-rise mt-6 max-w-xl text-lg text-fg/90 sm:text-xl" style={rise(2)}>
            {profile.tagline}
          </p>
          <p className="animate-rise mt-3 max-w-xl text-base text-muted" style={rise(3)}>
            {profile.intro}
          </p>

          <div className="animate-rise mt-8 flex flex-col gap-3 sm:flex-row" style={rise(4)}>
            <ButtonLink href="#projects" className="group">
              View projects
              <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
            </ButtonLink>
            <ButtonLink href={profile.resume.href} download={profile.resume.downloadName} variant="secondary">
              <Download aria-hidden="true" className="size-4" />
              Download resume
            </ButtonLink>
          </div>

          <div className="animate-rise mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-muted" style={rise(5)}>
            <span className="inline-flex items-center gap-1.5">
              <MapPin aria-hidden="true" className="size-4" />
              Mumbai, India
            </span>
            <span aria-hidden="true" className="hidden h-4 w-px bg-line-strong sm:block" />
            <ul className="flex items-center gap-1" aria-label="Profiles">
              {profile.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    title={social.label}
                    className="grid size-9 place-items-center rounded-full transition-colors hover:bg-surface-2 hover:text-fg"
                  >
                    <BrandIcon name={social.label} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="animate-rise mx-auto w-full max-w-2xl min-w-0 lg:max-w-none" style={rise(3)}>
          <CodeWindow />
        </div>
      </Container>

      <Container className="mt-16 sm:mt-20">
        <dl className="animate-rise grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4" style={rise(6)}>
          {headlineMetrics.map((metric) => (
            <div key={metric.label} className="flex flex-col gap-1 bg-surface p-5 sm:p-6">
              <dt className="text-xs leading-snug text-muted sm:text-sm">{metric.label}</dt>
              <dd className="order-first font-mono text-2xl font-medium tracking-tight sm:text-3xl">{metric.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

import type { ReactNode } from 'react';
import { ArrowUpRight, Check, Copy, /* Download, TODO(Nov 2026) */ Mail, Phone } from 'lucide-react';
import { profile } from '../data/profile';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { Container } from '../components/layout/Section';
import { BrandIcon } from '../components/ui/BrandIcon';
import { Button, ButtonLink } from '../components/ui/Button';
import { Reveal } from '../components/ui/Reveal';

const COPY_MESSAGES = {
  idle: '',
  copied: 'Email address copied to clipboard.',
  error: 'Could not copy automatically. Please copy the address manually.',
} as const;

export function Contact() {
  const { state, copy } = useCopyToClipboard();

  return (
    <section id="contact" aria-labelledby="contact-title" className="py-20 sm:py-28">
      <Container>
        <Reveal className="relative overflow-hidden rounded-[2rem] border border-line bg-surface px-5 py-12 shadow-card sm:px-12 sm:py-16">
          <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-70" />
          <div aria-hidden="true" className="pointer-events-none absolute -top-32 -right-24 size-80 rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)]" />

          <div className="relative grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-end lg:gap-14">
            <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-accent">Contact</p>
            <h2 id="contact-title" className="text-3xl font-semibold sm:text-5xl">
              Let's talk about your <span className="text-gradient">next system.</span>
            </h2>
            <p className="mt-4 text-base text-muted sm:text-lg">
              Open to conversations about backend, distributed systems and agentic AI engineering roles. Email
              is the fastest way to reach me.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href={`mailto:${profile.email}`}>
                <Mail aria-hidden="true" className="size-4" />
                Email me
              </ButtonLink>
              <Button variant="secondary" onClick={() => copy(profile.email)}>
                {state === 'copied' ? (
                  <Check aria-hidden="true" className="size-4 text-metric" />
                ) : (
                  <Copy aria-hidden="true" className="size-4" />
                )}
                {state === 'copied' ? 'Copied!' : 'Copy email'}
              </Button>
              {/* TODO(Nov 2026): uncomment resume button
              <ButtonLink href={profile.resume.href} download={profile.resume.downloadName} variant="ghost">
                <Download aria-hidden="true" className="size-4" />
                Resume
              </ButtonLink>
              */}
            </div>
            <p role="status" aria-live="polite" className="mt-3 min-h-5 text-sm text-muted">
              {COPY_MESSAGES[state]}
            </p>
            </div>

            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <ContactRow href={`mailto:${profile.email}`} label="Email" value={profile.email} icon={<Mail aria-hidden="true" className="size-4" />} />
              <ContactRow
                href={`tel:${profile.phone.replace(/\s/g, '')}`}
                label="Phone"
                value={profile.phone}
                icon={<Phone aria-hidden="true" className="size-4" />}
              />
              {profile.socials.map((social) => (
                <ContactRow
                  key={social.label}
                  href={social.href}
                  label={social.label}
                  value={social.handle}
                  external
                  icon={<BrandIcon name={social.label} />}
                />
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

interface RowProps {
  href: string;
  label: string;
  value: string;
  icon: ReactNode;
  external?: boolean;
}

function ContactRow({ href, label, value, icon, external }: RowProps) {
  return (
    <li>
      <a
        href={href}
        {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
        className="group flex items-center gap-3 rounded-2xl border border-line bg-bg/60 px-4 py-3 transition-colors hover:border-accent"
      >
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-surface-2 text-muted group-hover:text-accent">
          {icon}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-xs text-subtle">{label}</span>
          <span className="block truncate text-sm text-fg">{value}</span>
        </span>
        {external && (
          <ArrowUpRight aria-hidden="true" className="size-4 text-subtle transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
        )}
      </a>
    </li>
  );
}

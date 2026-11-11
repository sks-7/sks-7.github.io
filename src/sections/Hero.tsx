import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Download, MapPin } from 'lucide-react';
import { experience } from '../data/experience';
import { headlineMetrics, profile } from '../data/profile';
import { Container } from '../components/layout/Section';
import { BrandIcon } from '../components/ui/BrandIcon';
import { ButtonLink } from '../components/ui/Button';
import { CountUp } from '../components/ui/CountUp';
import { Magnetic } from '../components/ui/Magnetic';
import { rise, spring, stagger } from '../lib/motion';
import { LiveTerminal } from './hero/LiveTerminal';
import { NeuralBackground } from './hero/NeuralBackground';

const current = experience.find((role) => role.current);
const github = profile.socials.find((s) => s.label === 'GitHub');
const linkedin = profile.socials.find((s) => s.label === 'LinkedIn');

/** Words slide up out of a clipping mask, one after another. */
const word = {
  hidden: { y: '110%', opacity: 0 },
  show: { y: '0%', opacity: 1, transition: spring },
};

export function Hero() {
  const section = useRef<HTMLElement>(null);
  // Parallax: as the hero scrolls away, copy drifts up and fades, the terminal lags behind.
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end start'] });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.15]);
  const termY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section ref={section} id="top" aria-label="Introduction" className="relative isolate overflow-hidden pt-28 pb-10 sm:pt-36 sm:pb-14">
      <NeuralBackground />
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 -z-20 opacity-60" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-48 left-1/4 -z-20 h-[560px] w-[760px] max-w-[160vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-24 -right-40 -z-20 h-[480px] w-[620px] max-w-[140vw] rounded-full bg-[radial-gradient(closest-side,var(--glow-2),transparent)]"
      />

      <Container className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
        <motion.div style={{ y: copyY, opacity: copyOpacity }}>
        <motion.div variants={stagger(0.09, 0.05)} initial="hidden" animate="show">
          {current && (
            <motion.p
              variants={rise}
              className="glass mb-6 inline-flex max-w-full items-center gap-2 rounded-full px-3 py-1.5 text-xs text-muted sm:text-sm"
            >
              <span className="relative flex size-2" aria-hidden="true">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-metric opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-metric" />
              </span>
              <span className="truncate">
                {current.title} at <span className="text-fg">{current.company}</span>
              </span>
            </motion.p>
          )}

          <h1 className="text-[2.6rem] leading-[1.04] font-semibold sm:text-6xl lg:text-[4.2rem]">
            <motion.span variants={stagger(0.08)} className="block">
              {profile.name.split(' ').map((part) => (
                <span key={part} className="mr-[0.25em] inline-block overflow-hidden pb-[0.08em] align-top last:mr-0">
                  <motion.span variants={word} className="inline-block">
                    {part}
                  </motion.span>
                </span>
              ))}
            </motion.span>
            <span className="mt-2 block overflow-hidden pb-[0.1em] text-[0.56em] leading-tight sm:text-[0.6em]">
              <motion.span variants={word} className="text-gradient inline-block">
                {profile.headline}
              </motion.span>
            </span>
          </h1>

          <motion.ul variants={stagger(0.12)} className="mt-6 flex flex-wrap items-center gap-2" aria-label="Focus areas">
            {profile.focusTags.map((tag, i) => (
              <motion.li
                key={tag}
                variants={{ hidden: { opacity: 0, scale: 0.85, y: 8 }, show: { opacity: 1, scale: 1, y: 0, transition: spring } }}
                className="flex items-center gap-2"
              >
                {i > 0 && <span aria-hidden="true" className="text-subtle">•</span>}
                <span
                  className={
                    'rounded-md border px-2.5 py-1 font-mono text-xs ' +
                    (i === 0
                      ? 'border-accent-2/40 bg-accent-2/10 text-accent-2'
                      : i === 1
                        ? 'border-accent/40 bg-accent/10 text-accent'
                        : 'border-metric/40 bg-metric/10 text-metric')
                  }
                >
                  {tag}
                </span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.p variants={rise} className="mt-6 max-w-xl text-lg text-fg/90 sm:text-xl">
            {profile.tagline}
          </motion.p>
          <motion.p variants={rise} className="mt-3 max-w-xl text-base text-muted">
            {profile.intro}
          </motion.p>

          <motion.div variants={rise} className="mt-8 flex flex-wrap items-center gap-3">
            <Magnetic>
              <ButtonLink href={profile.resume.href} download={profile.resume.downloadName}>
                <Download aria-hidden="true" className="size-4" />
                Download resume
              </ButtonLink>
            </Magnetic>
            <Magnetic>
              <ButtonLink href="#contact" variant="secondary" className="group">
                Get in touch
                <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
              </ButtonLink>
            </Magnetic>
            {[github, linkedin].map(
              (social) =>
                social && (
                  <Magnetic key={social.label} strength={0.4}>
                    <ButtonLink
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="secondary"
                      className="w-11 px-0!"
                      aria-label={`${social.label} (opens in a new tab)`}
                      title={social.label}
                    >
                      <BrandIcon name={social.label} className="size-[18px]" />
                    </ButtonLink>
                  </Magnetic>
                ),
            )}
          </motion.div>

          <motion.p variants={rise} className="mt-6 inline-flex items-center gap-1.5 text-sm text-muted">
            <MapPin aria-hidden="true" className="size-4" />
            Mumbai, India
          </motion.p>
        </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: 8 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ ...spring, delay: 0.35 }}
          className="mx-auto w-full max-w-2xl min-w-0 [perspective:1200px] lg:max-w-none"
        >
          <motion.div style={{ y: termY }}>
            <LiveTerminal />
          </motion.div>
        </motion.div>
      </Container>

      <Container className="mt-14 sm:mt-20">
        <motion.dl
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 gap-3 lg:grid-cols-4"
        >
          {headlineMetrics.map((metric) => (
            <motion.div
              key={metric.label}
              variants={rise}
              className="glass group flex flex-col gap-1 rounded-2xl p-5 transition-colors hover:border-accent/40 sm:p-6"
            >
              <dt className="text-xs leading-snug text-muted sm:text-sm">{metric.label}</dt>
              <dd className="order-first font-mono text-2xl font-medium tracking-tight text-fg transition-colors group-hover:text-accent sm:text-3xl">
                <CountUp value={metric.value} />
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      </Container>
    </section>
  );
}

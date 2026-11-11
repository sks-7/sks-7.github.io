import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { FileText, Menu, X } from 'lucide-react';
import { profile } from '../../data/profile';
import { useActiveSection } from '../../hooks/useActiveSection';
import { cn } from '../../lib/cn';
import { BrandIcon } from '../ui/BrandIcon';
import { ButtonLink } from '../ui/Button';
import { Magnetic } from '../ui/Magnetic';
import { Container } from './Section';
import { ThemeToggle } from './ThemeToggle';

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
] as const;

const SECTION_IDS = NAV_ITEMS.map((item) => item.id);
// Header order: GitHub, LeetCode, LinkedIn.
const QUICK_SOCIALS = (['GitHub', 'LeetCode', 'LinkedIn'] as const)
  .map((label) => profile.socials.find((s) => s.label === label))
  .filter((s) => !!s);

export function Navbar() {
  const active = useActiveSection(SECTION_IDS);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const menuButton = useRef<HTMLButtonElement>(null);

  // Reading progress drawn along the header's bottom edge.
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });

  // Always visible: the bar only turns from transparent to solid glass once you scroll.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 8);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const solid = scrolled || open;
  const activeLabel = NAV_ITEMS.find((item) => item.id === active)?.label;

  // Close the mobile menu on Escape or when the viewport grows to desktop.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    const desktop = window.matchMedia('(min-width: 768px)');
    const onResize = () => desktop.matches && setOpen(false);
    window.addEventListener('keydown', onKey);
    desktop.addEventListener('change', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      desktop.removeEventListener('change', onResize);
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 220, damping: 28, delay: 0.1 }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300',
        solid
          ? 'border-line bg-bg/75 shadow-[0_10px_40px_-24px_rgb(0_0_0/0.8)] backdrop-blur-xl backdrop-saturate-150'
          : 'border-transparent bg-transparent',
      )}
    >
      {/* Bottom edge doubles as a reading-progress bar. */}
      <motion.span
        aria-hidden="true"
        style={{ scaleX: progress }}
        className={cn(
          'pointer-events-none absolute inset-x-0 -bottom-px h-[2px] origin-left bg-gradient-to-r from-accent via-accent-2 to-metric shadow-[0_0_12px_var(--accent)] transition-opacity duration-500',
          solid ? 'opacity-100' : 'opacity-0',
        )}
      />

      <Container className="flex h-16 items-center justify-between gap-4">
        <a href="#top" className="group flex items-center gap-3" aria-label={`${profile.name}, back to top`}>
          {/* Logo with a rotating gradient ring. */}
          <span className="relative grid size-10 place-items-center overflow-hidden rounded-xl p-px">
            <span
              aria-hidden="true"
              className="absolute top-1/2 left-1/2 aspect-square w-[170%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(var(--accent),var(--accent-2),var(--metric),var(--accent))] motion-safe:animate-[spin_8s_linear_infinite]"
            />
            <span className="relative grid size-full place-items-center rounded-[11px] bg-surface font-mono text-sm font-bold transition-colors group-hover:text-accent">
              SK
            </span>
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block text-[0.95rem] font-semibold">{profile.name}</span>
            <span className="flex items-center gap-1.5 font-mono text-[0.68rem] text-subtle">
              <span aria-hidden="true" className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-metric opacity-60" />
                <span className="relative inline-flex size-1.5 rounded-full bg-metric" />
              </span>
              AI · Backend Engineer
            </span>
          </span>
        </a>

        {/* On smaller screens, show which section you're reading. */}
        <div aria-hidden="true" className="mr-auto -ml-1 h-6 min-w-0 overflow-hidden md:hidden">
          <AnimatePresence mode="wait" initial={false}>
            {scrolled && activeLabel && (
              <motion.span
                key={activeLabel}
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -14, opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="flex items-center gap-1.5 font-mono text-xs leading-6 text-accent"
              >
                <span className="text-subtle">/</span>
                {activeLabel}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1" onPointerLeave={() => setHovered(null)}>
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? 'location' : undefined}
                    onPointerEnter={() => setHovered(item.id)}
                    onFocus={() => setHovered(item.id)}
                    onBlur={() => setHovered(null)}
                    className={cn(
                      'relative block rounded-full px-3.5 py-2 text-sm font-medium transition-colors',
                      isActive ? 'text-fg' : 'text-muted hover:text-fg',
                    )}
                  >
                    {/* Hover highlight glides between links. */}
                    {hovered === item.id && (
                      <motion.span
                        layoutId="nav-hover"
                        aria-hidden="true"
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                        className="absolute inset-0 -z-10 rounded-full bg-surface-2/80"
                      />
                    )}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        aria-hidden="true"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        className="absolute inset-x-3 -bottom-[3px] h-[2px] rounded-full bg-gradient-to-r from-accent to-accent-2 shadow-[0_0_10px_var(--accent)]"
                      />
                    )}
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <ul className="hidden items-center gap-1 lg:flex" aria-label="Profiles">
            {QUICK_SOCIALS.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${social.label} (opens in a new tab)`}
                  title={social.label}
                  className="grid size-10 place-items-center rounded-full text-muted transition-[color,background-color,transform] hover:-translate-y-0.5 hover:bg-surface-2 hover:text-accent"
                >
                  <BrandIcon name={social.label} className="size-[18px]" />
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
          <Magnetic className="max-sm:hidden">
            <ButtonLink href={profile.resume.href} target="_blank" rel="noopener" size="sm" className="group relative overflow-hidden">
              {/* Light sheen sweeps across on hover. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[400%]"
              />
              <FileText aria-hidden="true" className="relative size-4" />
              <span className="relative">Resume</span>
            </ButtonLink>
          </Magnetic>
          <button
            ref={menuButton}
            type="button"
            className="grid size-10 place-items-center rounded-full border border-line text-fg transition-colors hover:border-accent md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
          </button>
        </div>
      </Container>

      {/* Mobile menu: grid-rows trick animates height without measuring. */}
      <div
        id="mobile-menu"
        className={cn(
          'grid transition-[grid-template-rows] duration-300 md:hidden',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
        inert={!open}
      >
        <nav aria-label="Mobile" className="overflow-hidden">
          <Container className="pb-5">
            <ul className="flex flex-col gap-1 border-t border-line pt-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === item.id ? 'location' : undefined}
                    className={cn(
                      'flex items-center justify-between rounded-xl px-3 py-3 text-base transition-colors',
                      active === item.id ? 'bg-surface-2 text-fg' : 'text-muted hover:bg-surface-2 hover:text-fg',
                    )}
                  >
                    {item.label}
                    {active === item.id && <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />}
                  </a>
                </li>
              ))}
            </ul>
            <ButtonLink
              href={profile.resume.href}
              target="_blank"
              rel="noopener"
              className="mt-4 w-full"
              onClick={() => setOpen(false)}
            >
              <FileText aria-hidden="true" className="size-4" />
              View resume
            </ButtonLink>
            <ul className="mt-3 grid grid-cols-3 gap-2" aria-label="Profiles">
              {QUICK_SOCIALS.map((social) => (
                <li key={social.label}>
                  <ButtonLink
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary"
                    className="w-full gap-1.5 px-2! text-sm"
                    onClick={() => setOpen(false)}
                  >
                    <BrandIcon name={social.label} />
                    {social.label}
                  </ButtonLink>
                </li>
              ))}
            </ul>
          </Container>
        </nav>
      </div>
    </motion.header>
  );
}

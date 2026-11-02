import { useEffect, useRef, useState } from 'react';
import { FileText, Menu, X } from 'lucide-react';
import { profile } from '../../data/profile';
import { useActiveSection } from '../../hooks/useActiveSection';
import { cn } from '../../lib/cn';
import { ButtonLink } from '../ui/Button';
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

export function Navbar() {
  const active = useActiveSection(SECTION_IDS);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300',
        scrolled || open
          ? 'border-line bg-bg/80 backdrop-blur-xl'
          : 'border-transparent bg-transparent',
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <a href="#top" className="group flex items-center gap-2.5" aria-label={`${profile.name}, back to top`}>
          <span className="grid size-9 place-items-center rounded-xl border border-line-strong bg-surface font-mono text-sm font-semibold transition-colors group-hover:border-accent">
            SK
          </span>
          <span className="hidden text-[0.95rem] font-medium sm:block">{profile.name}</span>
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1 rounded-full border border-line bg-surface/60 p-1">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? 'location' : undefined}
                    className={cn(
                      'block rounded-full px-3.5 py-1.5 text-sm transition-colors',
                      isActive ? 'bg-surface-2 text-fg shadow-card' : 'text-muted hover:text-fg',
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <ButtonLink
            href={profile.resume.href}
            target="_blank"
            rel="noopener"
            size="sm"
            className="max-sm:hidden"
          >
            <FileText aria-hidden="true" className="size-4" />
            Resume
          </ButtonLink>
          <button
            ref={menuButton}
            type="button"
            className="grid size-10 place-items-center rounded-full border border-line text-fg md:hidden"
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
          </Container>
        </nav>
      </div>
    </header>
  );
}

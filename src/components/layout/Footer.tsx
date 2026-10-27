import { profile } from '../../data/profile';
import { BrandIcon } from '../ui/BrandIcon';
import { Container } from './Section';

export function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <Container className="flex flex-col items-center justify-between gap-4 text-sm text-muted sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name} · {profile.title}
        </p>
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
      </Container>
    </footer>
  );
}

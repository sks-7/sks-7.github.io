import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { cn } from '../../lib/cn';

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        toggleTheme({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      }}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      className={cn(
        'relative grid size-10 place-items-center overflow-hidden rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-fg',
        className,
      )}
    >
      <Sun
        aria-hidden="true"
        className={cn(
          'absolute size-[18px] transition-all duration-500',
          isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-50 opacity-0',
        )}
      />
      <Moon
        aria-hidden="true"
        className={cn(
          'absolute size-[18px] transition-all duration-500',
          isDark ? 'rotate-90 scale-50 opacity-0' : 'rotate-0 scale-100 opacity-100',
        )}
      />
    </button>
  );
}

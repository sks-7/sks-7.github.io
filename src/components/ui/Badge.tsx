import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border border-line bg-surface-2 px-2 py-0.5 font-mono text-[0.72rem] leading-5 text-muted',
        className,
      )}
    >
      {children}
    </span>
  );
}

export function BadgeList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn('flex flex-wrap gap-1.5', className)} aria-label="Technologies">
      {items.map((item) => (
        <li key={item}>
          <Badge>{item}</Badge>
        </li>
      ))}
    </ul>
  );
}

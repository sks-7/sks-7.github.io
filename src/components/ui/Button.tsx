import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'md' | 'sm';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-[background-color,border-color,color,transform,box-shadow,filter] duration-200 active:scale-[0.98] disabled:opacity-60';

const variants: Record<Variant, string> = {
  primary:
    'bg-accent text-bg font-semibold shadow-[0_0_28px_-8px_var(--accent)] hover:shadow-[0_0_36px_-4px_var(--accent)] hover:brightness-110',
  secondary:
    'border border-line-strong bg-glass text-fg backdrop-blur-md hover:border-accent hover:text-accent hover:shadow-[0_0_24px_-10px_var(--accent)]',
  ghost: 'text-muted hover:text-fg hover:bg-surface-2',
};

const sizes: Record<Size, string> = {
  md: 'h-11 px-5 text-[0.95rem]',
  sm: 'h-9 px-4 text-sm',
};

interface StyleProps {
  variant?: Variant;
  size?: Size;
}

export const buttonClass = ({ variant = 'primary', size = 'md' }: StyleProps = {}) =>
  cn(base, variants[variant], sizes[size]);

export function ButtonLink({
  variant,
  size,
  className,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & StyleProps) {
  return <a className={cn(buttonClass({ variant, size }), className)} {...props} />;
}

export function Button({
  variant,
  size,
  className,
  type = 'button',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & StyleProps) {
  return <button type={type} className={cn(buttonClass({ variant, size }), className)} {...props} />;
}

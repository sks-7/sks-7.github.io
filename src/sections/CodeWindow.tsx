import type { ReactNode } from 'react';

/* Tiny hand-rolled highlighter tokens for the decorative snippet. */
const K = ({ children }: { children: ReactNode }) => <span className="text-accent-2">{children}</span>;
const T = ({ children }: { children: ReactNode }) => <span className="text-accent">{children}</span>;
const S = ({ children }: { children: ReactNode }) => <span className="text-metric">"{children}"</span>;

const strings = (items: string[]) =>
  items.map((item, i) => (
    <span key={item}>
      <S>{item}</S>
      {i < items.length - 1 && ', '}
    </span>
  ));

/** A Go-flavoured summary card for the hero. Every value mirrors the resume. */
export function CodeWindow() {
  const lines: ReactNode[] = [
    <>
      <K>type</K> <T>Engineer</T> <K>struct</K> {'{'}
    </>,
    <>
      {'  '}Role, Base <T>string</T>
    </>,
    <>
      {'  '}Builds, Stack []<T>string</T>
    </>,
    <>{'}'}</>,
    <></>,
    <>
      <K>var</K> sachin = <T>Engineer</T>
      {'{'}
    </>,
    <>
      {'  '}Role: <S>Senior Software Engineer</S>,
    </>,
    <>
      {'  '}Base: <S>Mumbai</S>,
    </>,
    <>{'  '}Builds: []<T>string</T>{'{'}</>,
    <>
      {'    '}
      {strings(['distributed systems', 'agentic AI'])},
    </>,
    <>
      {'    '}
      {strings(['streaming analytics'])},
    </>,
    <>{'  '}{'}'},</>,
    <>
      {'  '}Stack: []<T>string</T>
      {'{'}
    </>,
    <>
      {'    '}
      {strings(['Go', 'Python', 'Node.js'])},
    </>,
    <>{'  '}{'}'},</>,
    <>
      {'}'}
      <span className="ml-0.5 inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] bg-accent motion-safe:animate-[blink_1.1s_steps(1)_infinite]" />
    </>,
  ];

  return (
    <figure
      aria-label="Code-style summary: Senior Software Engineer in Mumbai building distributed systems, agentic AI and streaming analytics with Go, Python and Node.js."
      className="relative rounded-2xl border border-line bg-surface shadow-card"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -inset-px -z-10 rounded-2xl bg-gradient-to-br from-accent/40 via-transparent to-accent-2/40 opacity-60 blur-xl" />
      <div className="flex items-center gap-2 border-b border-line px-4 py-3" aria-hidden="true">
        <span className="size-2.5 rounded-full bg-line-strong" />
        <span className="size-2.5 rounded-full bg-line-strong" />
        <span className="size-2.5 rounded-full bg-line-strong" />
        <span className="ml-3 font-mono text-xs text-subtle">engineer.go</span>
      </div>
      <pre aria-hidden="true" className="overflow-x-auto p-4 font-mono text-[12px] leading-6 text-fg/90 sm:p-5 sm:text-[13px]">
        <code>
          {lines.map((line, i) => (
            <span key={i} className="flex">
              <span className="mr-4 w-5 shrink-0 text-right text-subtle/60 select-none">{i + 1}</span>
              <span className="whitespace-pre">{line}</span>
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}

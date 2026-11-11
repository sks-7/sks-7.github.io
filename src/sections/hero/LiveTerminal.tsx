import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { experience } from '../../data/experience';
import { profile } from '../../data/profile';
import { cn } from '../../lib/cn';
import { trackGlow } from '../../lib/pointer';

type Kind = 'key' | 'str' | 'num' | 'punct';
type Token = { kind: Kind; text: string };
type Line = Token[];

const COMMAND = 'curl -s localhost:8080/v1/engineers/sachin | jq';
const TYPE_MS = 26;
const LINE_MS = 75;

const current = experience.find((role) => role.current);

/** Everything in the response comes from the portfolio data files. */
const RESPONSE = {
  name: profile.name,
  role: profile.headline,
  ...(current && { current: `${current.title} @ ${current.company}` }),
  location: 'Mumbai, India',
  experience_years: 3,
  skills: {
    ai: ['LangGraph', 'RAG', 'Tool Calling', 'Guardrails'],
    backend: ['Go', 'Python', 'Node.js', 'Kafka', 'Redis'],
  },
  impact: ['30% lower API latency', '40% lower LLM token use', '5k–10k dispatches / day'],
  availability: profile.availability,
};

const p = (text: string): Token => ({ kind: 'punct', text });

/** Pretty-prints a value as JSON tokens, keeping short string arrays on one line. */
function toLines(value: unknown, indent = 0, key?: string, comma = false): Line[] {
  const pad = p('  '.repeat(indent));
  const head: Token[] = key ? [pad, { kind: 'key', text: `"${key}"` }, p(': ')] : [pad];
  const tail = comma ? [p(',')] : [];

  if (Array.isArray(value)) {
    const items = value.flatMap((item, i) => [
      { kind: 'str' as const, text: JSON.stringify(item) },
      ...(i < value.length - 1 ? [p(', ')] : []),
    ]);
    return [[...head, p('['), ...items, p(']'), ...tail]];
  }
  if (value && typeof value === 'object') {
    const entries = Object.entries(value);
    return [
      [...head, p('{')],
      ...entries.flatMap(([k, v], i) => toLines(v, indent + 1, k, i < entries.length - 1)),
      [p('  '.repeat(indent)), p('}'), ...tail],
    ];
  }
  const kind: Kind = typeof value === 'number' ? 'num' : 'str';
  return [[...head, { kind, text: JSON.stringify(value) }, ...tail]];
}

const LINES = toLines(RESPONSE);

const COLORS: Record<Kind, string> = {
  key: 'text-accent',
  str: 'text-metric',
  num: 'text-accent-2',
  punct: 'text-subtle',
};

/**
 * Hero "API playground": types a curl request, then streams a JSON response
 * describing me. Starts when scrolled into view; reduced motion shows the end state.
 */
export function LiveTerminal() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const [typed, setTyped] = useState(0);
  const [shown, setShown] = useState(0);
  const [run, setRun] = useState(0);

  const finished = reduce || shown >= LINES.length;
  const typedCount = reduce ? COMMAND.length : typed;
  const shownCount = reduce ? LINES.length : shown;

  useEffect(() => {
    if (!inView || reduce) return;
    let cancelled = false;
    const timers: number[] = [];
    const later = (fn: () => void, ms: number) => timers.push(window.setTimeout(() => !cancelled && fn(), ms));

    for (let i = 1; i <= COMMAND.length; i++) later(() => setTyped(i), 350 + i * TYPE_MS);
    const responseStart = 350 + COMMAND.length * TYPE_MS + 450;
    for (let i = 1; i <= LINES.length; i++) later(() => setShown(i), responseStart + i * LINE_MS);

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [inView, reduce, run]);

  const status = typedCount < COMMAND.length ? 'typing' : shownCount === 0 ? 'pending' : finished ? 'done' : 'streaming';

  return (
    <figure
      ref={ref}
      className="glass glow-border relative overflow-hidden rounded-2xl"
      onPointerMove={trackGlow}
    >
      <figcaption className="sr-only">
        Simulated API response: {profile.name}, {profile.headline}, based in Mumbai. {profile.availability}.
      </figcaption>

      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span aria-hidden="true" className="size-2.5 rounded-full bg-[#ff5f57]/80" />
        <span aria-hidden="true" className="size-2.5 rounded-full bg-[#febc2e]/80" />
        <span aria-hidden="true" className="size-2.5 rounded-full bg-[#28c840]/80" />
        <span className="ml-3 font-mono text-xs text-subtle">~/sachin — zsh</span>
        <span className="ml-auto flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-wider">
          <span
            aria-hidden="true"
            className={cn('size-1.5 rounded-full', status === 'done' ? 'bg-metric' : 'bg-accent animate-[pulse-dot_0.9s_ease-in-out_infinite]')}
          />
          <span className={status === 'done' ? 'text-metric' : 'text-accent'}>{status === 'done' ? '200 OK' : status}</span>
        </span>
      </div>

      <pre aria-hidden="true" className="min-h-[19rem] p-4 font-mono text-[11.5px] leading-[1.7] whitespace-pre-wrap break-words sm:p-5 sm:text-[12.5px]">
        <code>
          <span className="block">
            <span className="text-metric">➜</span> <span className="text-accent-2">~</span>{' '}
            <span className="text-fg">{COMMAND.slice(0, typedCount)}</span>
            {typedCount < COMMAND.length && <Caret />}
          </span>
          {LINES.map((line, i) => (
            <span
              key={i}
              className={cn('block transition-[opacity,transform] duration-300', i < shownCount ? 'opacity-100' : 'translate-y-1 opacity-0')}
            >
              {line.map((token, j) => (
                <span key={j} className={COLORS[token.kind]}>
                  {token.text}
                </span>
              ))}
              {finished && i === LINES.length - 1 && <Caret />}
            </span>
          ))}
        </code>
      </pre>

      {finished && !reduce && (
        <button
          type="button"
          onClick={() => {
            setTyped(0);
            setShown(0);
            setRun((n) => n + 1);
          }}
          className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/80 px-3 py-1 font-mono text-[0.7rem] text-muted transition-colors hover:border-accent hover:text-accent"
        >
          <RotateCcw aria-hidden="true" className="size-3" />
          Replay request
        </button>
      )}
    </figure>
  );
}

function Caret() {
  return (
    <span
      aria-hidden="true"
      className="ml-0.5 inline-block h-[1.05em] w-[0.5em] translate-y-[0.18em] bg-accent motion-safe:animate-[blink_1.1s_steps(1)_infinite]"
    />
  );
}

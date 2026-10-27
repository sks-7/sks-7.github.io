import type { ReactNode } from 'react';

/**
 * Original abstract illustrations for case studies (no screenshots exist for
 * proprietary client work). Purely decorative.
 */
export function ProjectArt({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 320 120" aria-hidden="true" className="h-full w-full" fill="none">
      <defs>
        <linearGradient id={`grad-${id}`} x1="0" x2="1">
          <stop offset="0" stopColor="var(--accent)" />
          <stop offset="1" stopColor="var(--accent-2)" />
        </linearGradient>
      </defs>
      {(ART[id] ?? fallback)(`url(#grad-${id})`)}
    </svg>
  );
}

const node = (x: number, y: number, stroke: string, r = 7) => (
  <circle key={`${x}-${y}`} cx={x} cy={y} r={r} fill="var(--surface)" stroke={stroke} strokeWidth="2" />
);

const ART: Record<string, (stroke: string) => ReactNode> = {
  // Five validation stages in sequence.
  'agentic-assistant': (stroke) => (
    <>
      <path d="M30 60 H290" stroke="var(--line-strong)" strokeWidth="2" />
      <path d="M30 60 H290" stroke={stroke} strokeWidth="2" strokeDasharray="6 6" className="motion-safe:animate-[flow_1.2s_linear_infinite]" />
      {[30, 95, 160, 225, 290].map((x) => node(x, 60, stroke, 10))}
      <path d="M284 60 l4 4 l8 -9" stroke="var(--metric)" strokeWidth="2.5" strokeLinecap="round" />
    </>
  ),
  // Bid/ask depth bars.
  'trading-platform': (stroke) => (
    <>
      {[70, 52, 40, 30, 22, 16].map((h, i) => (
        <rect key={`b${i}`} x={40 + i * 20} y={100 - h} width="12" height={h} rx="2" fill="var(--metric)" opacity={0.25 + i * 0.1} />
      ))}
      {[16, 24, 34, 46, 58, 74].map((h, i) => (
        <rect key={`a${i}`} x={168 + i * 20} y={100 - h} width="12" height={h} rx="2" fill={stroke} opacity={0.85 - i * 0.1} />
      ))}
      <path d="M160 18 V104" stroke="var(--line-strong)" strokeDasharray="3 4" />
    </>
  ),
  // Producers fanning into a stream processor, then into stores.
  'streaming-analytics': (stroke) => (
    <>
      {[25, 60, 95].map((y) => (
        <path key={y} d={`M40 ${y} C 110 ${y}, 110 60, 160 60`} stroke={stroke} strokeWidth="2" strokeDasharray="5 7" className="motion-safe:animate-[flow_1s_linear_infinite]" />
      ))}
      {[35, 85].map((y) => (
        <path key={y} d={`M160 60 C 210 60, 210 ${y}, 280 ${y}`} stroke="var(--line-strong)" strokeWidth="2" />
      ))}
      {[25, 60, 95].map((y) => node(40, y, stroke))}
      <rect x="146" y="46" width="28" height="28" rx="8" fill="var(--surface)" stroke={stroke} strokeWidth="2" />
      {[35, 85].map((y) => (
        <rect key={`db${y}`} x="272" y={y - 10} width="20" height="20" rx="4" fill="var(--surface)" stroke="var(--metric)" strokeWidth="2" />
      ))}
    </>
  ),
  // A route between pins with a sync loop.
  'field-ops': (stroke) => (
    <>
      <path d="M40 90 C 90 20, 150 110, 200 50 S 270 40, 285 30" stroke={stroke} strokeWidth="2.5" strokeDasharray="6 6" className="motion-safe:animate-[flow_1.4s_linear_infinite]" />
      <path d="M40 90 m-9 -12 a9 9 0 1 1 18 0 c0 7 -9 14 -9 14 s-9 -7 -9 -14z" fill="var(--surface)" stroke={stroke} strokeWidth="2" />
      <path d="M285 30 m-9 -12 a9 9 0 1 1 18 0 c0 7 -9 14 -9 14 s-9 -7 -9 -14z" fill="var(--surface)" stroke="var(--metric)" strokeWidth="2" />
      <circle cx="200" cy="50" r="5" fill={stroke} />
    </>
  ),
};

const fallback = (stroke: string) => <path d="M20 60 H300" stroke={stroke} strokeWidth="2" />;

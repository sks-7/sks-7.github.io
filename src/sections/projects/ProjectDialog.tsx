import { useEffect, useRef, useState, type ReactNode } from 'react';
import { X } from 'lucide-react';
import type { CaseStudy } from '../../types/portfolio';
import { BadgeList } from '../../components/ui/Badge';
import { RichText } from '../../components/ui/RichText';

interface Props {
  study: CaseStudy | null;
  onClose: () => void;
}

/**
 * Case-study details in a native <dialog>: focus trapping, Escape-to-close and
 * the inert background all come from the platform.
 */
export function ProjectDialog({ study, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  // Keep the last study rendered so content stays visible during the close animation.
  const [shown, setShown] = useState(study);
  if (study && study !== shown) setShown(study);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (study && !dialog.open) {
      dialog.showModal();
      document.documentElement.style.overflow = 'hidden';
    }
    if (!study && dialog.open) dialog.close();
  }, [study]);

  return (
    <dialog
      ref={ref}
      aria-labelledby="case-study-title"
      onClose={() => {
        document.documentElement.style.overflow = '';
        onClose();
      }}
      // A click on the backdrop lands on the <dialog> element itself.
      onClick={(event) => event.target === event.currentTarget && ref.current?.close()}
      className="project-dialog m-auto max-h-[min(88dvh,820px)] w-[min(100%-2rem,760px)] overflow-hidden rounded-3xl border border-line bg-surface p-0 text-fg shadow-2xl"
    >
      {shown && (
        <div className="flex max-h-[inherit] flex-col">
          <header className="flex items-start justify-between gap-4 border-b border-line px-6 py-5 sm:px-8">
            <div>
              <p className="text-xs text-subtle">{shown.context}</p>
              <h2 id="case-study-title" className="mt-1 text-xl font-semibold sm:text-2xl">
                {shown.title}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => ref.current?.close()}
              aria-label="Close case study"
              autoFocus
              className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-muted transition-colors hover:text-fg"
            >
              <X aria-hidden="true" className="size-4" />
            </button>
          </header>

          <div className="overflow-y-auto overscroll-contain px-6 py-6 sm:px-8">
            <Block title="The problem">
              <p className="leading-relaxed text-muted">
                <RichText text={shown.problem} />
              </p>
            </Block>
            <Block title="What I built">
              <List items={shown.contribution} />
            </Block>
            <Block title="Key engineering decisions">
              <List items={shown.decisions} />
            </Block>
            <Block title="Results (as stated on my resume)">
              <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {shown.results.map((result) => (
                  <li key={result.label} className="rounded-2xl border border-line bg-surface-2/60 px-4 py-3">
                    <span className="block font-mono text-xl text-metric">{result.value}</span>
                    <span className="text-xs text-muted">{result.label}</span>
                  </li>
                ))}
              </ul>
            </Block>
            <Block title="Stack">
              <BadgeList items={shown.stack} />
            </Block>
          </div>
        </div>
      )}
    </dialog>
  );
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-7 last:mb-0">
      <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-accent">{title}</h3>
      {children}
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 leading-relaxed text-muted">
          <span aria-hidden="true" className="mt-[0.65em] size-1.5 shrink-0 rounded-full bg-accent" />
          <span>
            <RichText text={item} />
          </span>
        </li>
      ))}
    </ul>
  );
}

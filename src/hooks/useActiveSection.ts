import { useEffect, useState } from 'react';

/** Returns the id of the section currently nearest the top of the viewport. */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.boundingClientRect.top);
          else visible.delete(entry.target.id);
        }
        const [first] = [...visible.entries()].sort((a, b) => a[1] - b[1]);
        setActive(first ? first[0] : '');
      },
      // A band across the upper-middle of the viewport decides what is "current".
      { rootMargin: '-30% 0px -55% 0px' },
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

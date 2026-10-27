import { useEffect, useRef, useState } from 'react';

type CopyState = 'idle' | 'copied' | 'error';

/** Fallback for browsers or contexts where the async Clipboard API is unavailable. */
function legacyCopy(text: string) {
  const field = document.createElement('textarea');
  field.value = text;
  field.setAttribute('readonly', '');
  field.style.cssText = 'position:fixed;opacity:0';
  document.body.appendChild(field);
  field.select();
  try {
    return document.execCommand('copy');
  } catch {
    return false;
  } finally {
    field.remove();
  }
}

/** Copies text and exposes a short-lived status for accessible feedback. */
export function useCopyToClipboard(resetAfterMs = 2000) {
  const [state, setState] = useState<CopyState>('idle');
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setState('copied');
    } catch {
      setState(legacyCopy(text) ? 'copied' : 'error');
    }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState('idle'), resetAfterMs);
  };

  return { state, copy };
}

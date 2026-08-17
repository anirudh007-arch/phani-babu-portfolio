import { useEffect, useState } from 'react';

/** Reactive `window.matchMedia`, SSR-safe and correct on first paint. */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/** True only on devices with a real, hoverable pointer. */
export const useFinePointer = () => useMediaQuery('(hover: hover) and (pointer: fine)');

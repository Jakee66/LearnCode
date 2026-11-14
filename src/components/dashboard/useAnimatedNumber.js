import { useEffect, useState } from 'react';

/** Counts 0 → target on mount. Rests on the final value when motion is reduced. */
export default function useAnimatedNumber(target, duration = 1200) {
  const value = Number(target) || 0;
  const [current, setCurrent] = useState(value);

  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setCurrent(value);
      return undefined;
    }
    let frame;
    let start;
    const step = (ts) => {
      if (start === undefined) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCurrent(value * eased);
      if (p < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [value, duration]);

  return current;
}
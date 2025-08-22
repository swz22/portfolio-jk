import { useEffect, useState } from 'react';

export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return prefersReducedMotion;
}

export function useMotionValue<T>(animatedValue: T, staticValue: T): T {
  const prefersReducedMotion = useReducedMotion();
  return prefersReducedMotion ? staticValue : animatedValue;
}

export function useMotionConfig() {
  const prefersReducedMotion = useReducedMotion();

  return {
    initial: prefersReducedMotion ? false : undefined,
    animate: prefersReducedMotion ? false : undefined,
    transition: prefersReducedMotion
      ? { duration: 0 }
      : { duration: 0.3, ease: 'easeOut' },
  };
}

'use client';

import { Suspense, lazy, memo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from '@/contexts/theme-context';
import { usePerformance } from '@/contexts/performance-context';
import { usePassiveControls } from '@/hooks/use-passive-controls';

const themeComponents = {
  starfall: lazy(() =>
    import('./starfall-theme').then((mod) => ({ default: mod.StarfallTheme }))
  ),
  neural: lazy(() =>
    import('./neural-theme').then((mod) => ({ default: mod.NeuralTheme }))
  ),
  matrix: lazy(() =>
    import('./matrix-theme').then((mod) => ({ default: mod.MatrixTheme }))
  ),
  ocean: lazy(() =>
    import('./ocean-theme').then((mod) => ({ default: mod.OceanTheme }))
  ),
  constellation: null, // Will be added later
  cyberpunk: null,
  underwater: null,
};

const ThemeLoader = memo(() => (
  <div className="flex h-full w-full items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary" />
  </div>
));

ThemeLoader.displayName = 'ThemeLoader';

export function ThemeScene() {
  const { currentTheme, isEffectsEnabled, isTransitioning } = useTheme();
  const { quality, isLowPerformance } = usePerformance();
  usePassiveControls();

  if (
    !isEffectsEnabled ||
    !currentTheme ||
    (isLowPerformance && quality === 'low')
  ) {
    return null;
  }

  const ThemeComponent = themeComponents[currentTheme];

  return (
    <>
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-10 bg-background"
          />
        )}
      </AnimatePresence>

      <div className="absolute inset-0 z-0">
        <Suspense fallback={<ThemeLoader />}>
          {ThemeComponent && <ThemeComponent />}
        </Suspense>
      </div>
    </>
  );
}
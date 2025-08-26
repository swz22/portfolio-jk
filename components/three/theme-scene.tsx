'use client';

import { Suspense, lazy } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from '@/contexts/theme-context';
import { usePerformance } from '@/contexts/performance-context';
import { usePassiveControls } from '@/hooks/use-passive-controls';

const StarfallTheme = lazy(() =>
  import('./starfall-theme').then((mod) => ({ default: mod.StarfallTheme }))
);
const NeuralTheme = lazy(() =>
  import('./neural-theme').then((mod) => ({ default: mod.NeuralTheme }))
);

const themeComponents = {
  starfall: StarfallTheme,
  matrix: null,
  cyberpunk: null,
  neural: NeuralTheme,
  underwater: null,
};

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
        <Suspense
          fallback={
            <div className="flex h-full w-full items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary" />
            </div>
          }
        >
          {ThemeComponent && <ThemeComponent />}
        </Suspense>
      </div>
    </>
  );
}

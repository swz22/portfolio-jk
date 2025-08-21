'use client';

import { Suspense, lazy } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from '@/contexts/theme-context';

const SpaceTheme = lazy(() =>
  import('./space-theme').then((mod) => ({ default: mod.SpaceTheme }))
);
const EarthTheme = lazy(() =>
  import('./earth-theme').then((mod) => ({ default: mod.EarthTheme }))
);
const BeachTheme = lazy(() =>
  import('./beach-theme').then((mod) => ({ default: mod.BeachTheme }))
);
const MinimalTheme = lazy(() =>
  import('./minimal-theme').then((mod) => ({ default: mod.MinimalTheme }))
);

const themeComponents = {
  space: SpaceTheme,
  earth: EarthTheme,
  beach: BeachTheme,
  matrix: null,
  cyberpunk: null,
  minimal: MinimalTheme,
};

export function ThemeScene() {
  const { currentTheme, isEffectsEnabled, isTransitioning } = useTheme();

  if (!isEffectsEnabled || !currentTheme) {
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

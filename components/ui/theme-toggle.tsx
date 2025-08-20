'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/theme-context';
import { cn } from '@/lib/utils';

export function ThemeToggle() {
  const { isEffectsEnabled, toggleEffects, currentTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleEffects}
      className={cn(
        'group relative flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-all',
        'bg-secondary/50 backdrop-blur-sm hover:bg-secondary/80',
        'border border-border/50 hover:border-border'
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative h-4 w-4">
        <AnimatePresence mode="wait">
          {isEffectsEnabled ? (
            <motion.svg
              key="enabled"
              initial={{ opacity: 0, rotate: -180 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 180 }}
              className="absolute inset-0 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </motion.svg>
          ) : (
            <motion.svg
              key="disabled"
              initial={{ opacity: 0, rotate: 180 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -180 }}
              className="absolute inset-0 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </motion.svg>
          )}
        </AnimatePresence>
      </div>

      <span className="hidden sm:inline">
        {isEffectsEnabled ? 'Effects On' : 'Effects Off'}
      </span>

      <AnimatePresence>
        {isEffectsEnabled && currentTheme !== 'none' && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            className="ml-1 hidden overflow-hidden text-xs text-muted-foreground sm:inline"
          >
            • {currentTheme}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

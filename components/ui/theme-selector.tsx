'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/theme-context';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export function ThemeSelector() {
  const { currentTheme, setTheme, themes, isEffectsEnabled } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  if (!isEffectsEnabled) return null;

  const availableThemes = themes.filter((t) => t.available);

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-medium transition-all',
          'bg-secondary/50 backdrop-blur-sm hover:bg-secondary/80',
          'border border-border/50 hover:border-border'
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg
          className="h-3 w-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a6 6 0 00-2-4l-2-2V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v6"
          />
        </svg>
        Theme
        <svg
          className={cn('h-3 w-3 transition-transform', isOpen && 'rotate-180')}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-30"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="absolute right-0 z-40 mt-1 w-44 overflow-hidden rounded-lg border border-border bg-background/95 shadow-lg backdrop-blur-lg"
            >
              <div className="p-1">
                {availableThemes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => {
                      setTheme(theme.id);
                      setIsOpen(false);
                    }}
                    className={cn(
                      'flex w-full items-center justify-between rounded-md px-2 py-1 transition-all text-xs',
                      'hover:bg-secondary/50',
                      currentTheme === theme.id && 'bg-secondary'
                    )}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium">{theme.name}</span>
                      <span className="rounded-full bg-secondary px-1 py-0.5 text-[9px] text-secondary-foreground">
                        {theme.technology === '3D WebGL' ? '3D' : '2D'}
                      </span>
                    </div>
                    <span
                      className={cn(
                        'text-[10px]',
                        theme.performance === 'light' && 'text-green-500',
                        theme.performance === 'medium' && 'text-yellow-500',
                        theme.performance === 'heavy' && 'text-red-500'
                      )}
                    >
                      {theme.performance === 'light' && '●'}
                      {theme.performance === 'medium' && '●●'}
                      {theme.performance === 'heavy' && '●●●'}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
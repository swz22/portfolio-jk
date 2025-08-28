'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePerformance } from '@/contexts/performance-context';
import { cn } from '@/lib/utils';

export function PerformanceMonitor() {
  const [isVisible, setIsVisible] = useState(false);
  const { metrics, quality, isLowPerformance } = usePerformance();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        e.preventDefault();
        setIsVisible(!isVisible);
      }
      if (e.key === 'Escape' && isVisible) {
        setIsVisible(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible]);

  const getFPSColor = (fps: number) => {
    if (fps >= 50) return 'text-green-500';
    if (fps >= 30) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getQualityColor = (quality: string) => {
    if (quality === 'high') return 'text-green-500';
    if (quality === 'medium') return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            className="fixed right-4 top-20 z-[60] w-64 rounded-lg border border-border bg-background/95 p-4 shadow-lg backdrop-blur-lg"
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold">Performance Monitor</h3>
              <button
                onClick={() => setIsVisible(false)}
                className="rounded p-1 hover:bg-secondary"
                aria-label="Close monitor"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">FPS:</span>
                <span className={getFPSColor(metrics.fps)}>
                  {Math.round(metrics.fps)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Frame Time:</span>
                <span className="text-foreground">
                  {metrics.frameTime.toFixed(1)}ms
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Quality:</span>
                <span className={getQualityColor(quality)}>
                  {quality.toUpperCase()}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Performance:</span>
                <span className={isLowPerformance ? 'text-red-500' : 'text-green-500'}>
                  {isLowPerformance ? 'LOW' : 'GOOD'}
                </span>
              </div>

              {metrics.memoryUsed && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Memory:</span>
                  <span className="text-foreground">
                    {(metrics.memoryUsed / 1024 / 1024).toFixed(1)}MB
                  </span>
                </div>
              )}

              <div className="border-t border-border pt-2">
                <p className="text-xs text-muted-foreground">
                  Press Escape to close
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating indicator */}
      <div className="fixed bottom-4 right-4 z-[50]">
        <motion.button
          onClick={() => setIsVisible(!isVisible)}
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full text-xs font-mono transition-all",
            "border border-border bg-background/80 backdrop-blur-sm",
            "hover:bg-background/90 hover:scale-110",
            getFPSColor(metrics.fps)
          )}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title="Performance Monitor (Ctrl+Shift+P)"
        >
          {Math.round(metrics.fps)}
        </motion.button>
      </div>
    </>
  );
}
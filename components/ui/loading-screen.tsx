'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Reduced from 2000 to 1500

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <motion.div
              className="h-32 w-32 rounded-full border-t-2 border-primary"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-4xl font-bold">JK</span>
            </motion.div>
          </div>
          <motion.div
            className="fixed bottom-10 left-0 right-0 flex justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-1">
              <span className="text-sm text-muted-foreground">Loading</span>
              <motion.div
                className="flex gap-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <motion.span
                  className="inline-block h-1 w-1 rounded-full bg-primary"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: 0,
                  }}
                />
                <motion.span
                  className="inline-block h-1 w-1 rounded-full bg-primary"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: 0.2,
                  }}
                />
                <motion.span
                  className="inline-block h-1 w-1 rounded-full bg-primary"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: 0.4,
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
'use client';

import { motion } from 'framer-motion';
import { useScrollProgress } from '@/hooks/use-scroll-progress';

export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <motion.div
      className="bg-primary fixed left-0 right-0 top-0 z-[60] h-1"
      style={{
        scaleX: progress / 100,
        transformOrigin: '0%',
      }}
      initial={{ scaleX: 0 }}
      transition={{ ease: 'linear' }}
    />
  );
}

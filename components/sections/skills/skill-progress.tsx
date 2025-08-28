'use client';

import { motion } from 'framer-motion';
import { TechItem } from '@/types';
import { useRef } from 'react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { usePerformance } from '@/contexts/performance-context';

interface SkillProgressProps {
  skill: TechItem;
  index: number;
}

export function SkillProgress({ skill, index }: SkillProgressProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, { threshold: 0.1 });
  const { shouldReduceMotion } = usePerformance();

  return (
    <motion.div
      ref={ref}
      initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, delay: index * 0.1 }}
      className="select-none space-y-1.5"
      style={{ transform: 'translateZ(0)' }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">{skill.icon}</span>
          <span className="text-sm font-medium">{skill.name}</span>
        </div>
        <span className="text-xs text-muted-foreground">
          {skill.proficiency}%
        </span>
      </div>

      <div className="relative h-1.5 overflow-hidden rounded-full bg-primary/10">
        <motion.div
          className="absolute left-0 top-0 h-full rounded-full"
          style={{
            backgroundColor:
              skill.color === '#000000' ? '#4B5563' : skill.color,
            transform: 'translateZ(0)',
            willChange: 'width',
          }}
          initial={{ width: 0 }}
          animate={isVisible ? { width: `${skill.proficiency}%` } : {}}
          transition={
            shouldReduceMotion 
              ? { duration: 0 }
              : {
                  duration: 1,
                  delay: index * 0.1 + 0.2,
                  ease: 'easeOut',
                }
          }
        />
      </div>
    </motion.div>
  );
}
'use client';

import { motion } from 'framer-motion';
import { TechItem } from '@/types';
import { useRef } from 'react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

interface SkillProgressProps {
  skill: TechItem;
  index: number;
}

export function SkillProgress({ skill, index }: SkillProgressProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, { threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="select-none space-y-2"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{skill.icon}</span>
          <span className="font-medium">{skill.name}</span>
        </div>
        <span className="text-sm text-muted-foreground">
          {skill.proficiency}%
        </span>
      </div>

      <div className="relative h-2 overflow-hidden rounded-full bg-secondary">
        <motion.div
          className="absolute left-0 top-0 h-full rounded-full"
          style={{
            backgroundColor:
              skill.color === '#000000' ? '#4B5563' : skill.color,
          }}
          initial={{ width: 0 }}
          animate={isVisible ? { width: `${skill.proficiency}%` } : {}}
          transition={{
            duration: 1,
            delay: index * 0.1 + 0.2,
            ease: 'easeOut',
          }}
        />
      </div>
    </motion.div>
  );
}

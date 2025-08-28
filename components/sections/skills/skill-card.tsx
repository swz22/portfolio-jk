'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TiltCard } from '@/components/three/tilt-card';
import { SkillCategory } from '@/types';
import { SkillProgress } from './skill-progress';
import { usePerformance } from '@/contexts/performance-context';

interface SkillCardProps {
  category: SkillCategory;
  index: number;
}

export const SkillCard = memo(function SkillCard({
  category,
  index,
}: SkillCardProps) {
  const { shouldReduceMotion } = usePerformance();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, delay: index * 0.1 }}
      style={{ transform: 'translateZ(0)' }}
      className="h-full"
    >
      <TiltCard max={10}>
        <Card className="h-full border-border/50 bg-card/50 backdrop-blur">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">{category.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {category.skills.map((skill, skillIndex) => (
              <SkillProgress
                key={skill.name}
                skill={skill}
                index={skillIndex}
              />
            ))}
          </CardContent>
        </Card>
      </TiltCard>
    </motion.div>
  );
});
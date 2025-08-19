'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TiltCard } from '@/components/three/tilt-card';
import { SkillCategory } from '@/types';
import { SkillProgress } from './skill-progress';

interface SkillCardProps {
  category: SkillCategory;
  index: number;
}

export function SkillCard({ category, index }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <TiltCard max={10}>
        <Card className="border-border/50 bg-card/50 h-full backdrop-blur">
          <CardHeader>
            <CardTitle className="text-xl">{category.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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
}

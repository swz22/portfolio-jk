'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { Experience } from '@/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TiltCard } from '@/components/three/tilt-card';

interface ExperienceCardProps {
  experience: Experience;
}

export const ExperienceCard = memo(function ExperienceCard({
  experience,
}: ExperienceCardProps) {
  return (
    <TiltCard max={5}>
      <Card className="h-full border-border/50 bg-card/50 backdrop-blur">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-2xl font-bold">{experience.role}</h3>
              <p className="text-lg text-muted-foreground">
                {experience.company}
              </p>
            </div>
            <Badge
              variant={
                experience.type === 'full-time' ? 'default' : 'secondary'
              }
            >
              {experience.type.replace('-', ' ')}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <h4 className="mb-3 font-semibold">Key Responsibilities</h4>
            <ul className="space-y-2">
              {experience.description.map((desc, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-primary text-primary" />
                  {desc}
                </motion.li>
              ))}
            </ul>
          </div>

          {experience.achievements.length > 0 && (
            <div>
              <h4 className="mb-3 font-semibold">Key Achievements</h4>
              <div className="space-y-3">
                {experience.achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="rounded-lg bg-secondary/50 p-4"
                  >
                    <div className="mb-2 flex items-start gap-3">
                      <span className="text-2xl">{achievement.icon}</span>
                      <div className="flex-1">
                        <h5 className="font-medium">{achievement.title}</h5>
                        <p className="text-sm text-muted-foreground">
                          {achievement.description}
                        </p>
                        {achievement.impact && (
                          <p className="mt-1 text-sm font-medium text-primary">
                            Impact: {achievement.impact}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h4 className="mb-3 font-semibold">Technologies Used</h4>
            <div className="grid grid-cols-2 gap-3">
              {experience.technologies.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="flex items-center gap-2 rounded-lg bg-background/50 p-3"
                >
                  <span className="text-2xl">{tech.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{tech.name}</p>
                    <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-secondary">
                      <motion.div
                        className="h-full bg-primary"
                        initial={{ width: 0 }}
                        animate={{ width: `${tech.proficiency}%` }}
                        transition={{
                          duration: 0.5,
                          delay: 0.5 + index * 0.05,
                        }}
                        style={{ backgroundColor: tech.color }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </TiltCard>
  );
});

'use client';

import { memo } from 'react';
import { Project } from '@/types';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TiltCard } from '@/components/three/tilt-card';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePerformance } from '@/contexts/performance-context';

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpenModal: (project: Project) => void;
}

export const ProjectCard = memo(function ProjectCard({
  project,
  index,
  onOpenModal,
}: ProjectCardProps) {
  const { shouldReduceMotion } = usePerformance();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, delay: index * 0.1 }}
    >
      <TiltCard>
        <Card className="h-full overflow-hidden">
          <CardHeader className="pb-3">
            <h3 className="text-lg font-semibold">{project.title}</h3>
          </CardHeader>

          <CardContent className="flex-1 p-4 pt-0">
            <p className="mb-3 text-sm text-muted-foreground">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-1">
              {project.techStack.slice(0, 4).map((tech) => (
                <Badge key={tech.name} variant="secondary" className="text-xs">
                  {tech.icon} {tech.name}
                </Badge>
              ))}
              {project.techStack.length > 4 && (
                <Badge variant="secondary" className="text-xs">
                  +{project.techStack.length - 4}
                </Badge>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex gap-2 p-4 pt-0">
            {project.links.live && (
              <Button variant="outline" size="sm" className="flex-1">
                <Link
                  href={project.links.live}
                  target="_blank"
                  className="flex items-center justify-center"
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  Visit Site
                </Link>
              </Button>
            )}
            {project.links.github && (
              <Button variant="outline" size="sm" className="flex-1">
                <Link
                  href={project.links.github}
                  target="_blank"
                  className="flex items-center justify-center"
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  View Code
                </Link>
              </Button>
            )}
          </CardFooter>
        </Card>
      </TiltCard>
    </motion.div>
  );
});
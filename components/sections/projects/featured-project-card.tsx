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
import { motion } from 'framer-motion';
import Link from 'next/link';
import { GitHubIcon, ExternalLinkIcon } from '@/components/ui/icons';

interface FeaturedProjectCardProps {
  project: Project;
  index: number;
  onOpenModal: (project: Project) => void;
}

export const FeaturedProjectCard = memo(function FeaturedProjectCard({
  project,
  index,
  onOpenModal,
}: FeaturedProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group h-full min-h-[450px]"
    >
      <Card className="relative flex h-full transform-gpu flex-col overflow-hidden border-border/50 bg-card/50 backdrop-blur transition-all duration-300 hover:scale-[1.02]">
        <CardHeader className="flex-none p-0">
          <div className="relative h-48 overflow-hidden">
            <img
              src={project.images.thumbnail}
              alt={project.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute right-4 top-4 flex gap-2">
              <Badge variant="default">Featured App</Badge>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                {project.title}
              </h3>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-hidden p-6">
          <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
            {project.description}
          </p>

          {project.highlights && (
            <div className="mb-4 space-y-1">
              {project.highlights.slice(0, 3).map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="mt-1 block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  <span className="line-clamp-1 text-xs text-muted-foreground">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-1">
            {project.techStack.slice(0, 5).map((tech) => (
              <Badge key={tech.name} variant="secondary" className="text-xs">
                {tech.icon} {tech.name}
              </Badge>
            ))}
            {project.techStack.length > 5 && (
              <Badge variant="secondary" className="text-xs">
                +{project.techStack.length - 5}
              </Badge>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex flex-none gap-2 border-t border-border/20 p-4">
          <Button
            variant="default"
            size="sm"
            onClick={() => onOpenModal(project)}
            className="flex-1"
          >
            View Details
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <Link
              href={project.links.live!}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center"
            >
              <ExternalLinkIcon />
            </Link>
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <Link
              href={project.links.github!}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center"
            >
              <GitHubIcon />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
});

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
          <Link
            href={project.links.live!}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <div className="group relative h-96 overflow-hidden">
              <img
                src={project.images.thumbnail}
                alt={project.title}
                className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute right-4 top-4 flex gap-2">
                <Badge variant="default">Featured App</Badge>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                  {project.title}
                </h3>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="rounded-full bg-white/90 p-3">
                  <ExternalLinkIcon className="h-6 w-6 text-black" />
                </div>
              </div>
            </div>
          </Link>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col justify-between p-6">
          <div>
            <p className="mb-6 text-base text-muted-foreground">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <Badge
                  key={tech.name}
                  variant="secondary"
                  className="px-3 py-1 text-sm"
                >
                  {tech.icon} {tech.name}
                </Badge>
              ))}
            </div>
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

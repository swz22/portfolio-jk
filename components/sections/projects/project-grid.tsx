'use client';

import { useMemo } from 'react';
import { Project } from '@/types';
import { ProjectCard } from './project-card';
import { FeaturedProjectCard } from './featured-project-card';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectGridProps {
  projects: Project[];
  onOpenModal: (project: Project) => void;
}

export function ProjectGrid({ projects, onOpenModal }: ProjectGridProps) {
  const { featuredProjects, regularProjects } = useMemo(() => {
    const featured = projects.filter(
      (p) => p.featured && p.category === 'production'
    );
    const regular = projects.filter(
      (p) => !p.featured || p.category !== 'production'
    );
    return { featuredProjects: featured, regularProjects: regular };
  }, [projects]);

  const featuredCards = useMemo(
    () =>
      featuredProjects.map((project, index) => (
        <FeaturedProjectCard
          key={project.id}
          project={project}
          index={index}
          onOpenModal={onOpenModal}
        />
      )),
    [featuredProjects, onOpenModal]
  );

  const regularCards = useMemo(
    () =>
      regularProjects.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          index={index}
          onOpenModal={onOpenModal}
        />
      )),
    [regularProjects, onOpenModal]
  );

  return (
    <div className="space-y-12">
      {featuredProjects.length > 0 && (
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Production Apps</h3>
            <p className="text-muted-foreground">
              Full-featured applications deployed to production
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <AnimatePresence mode="popLayout">{featuredCards}</AnimatePresence>
          </div>
        </div>
      )}

      {regularProjects.length > 0 && (
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-xl font-semibold">Other Projects</h3>
            <p className="text-sm text-muted-foreground">
              Prototypes and experiments
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 [&>*]:!h-[500px]">
            <AnimatePresence mode="popLayout">{regularCards}</AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import { useMemo } from 'react';
import { Project } from '@/types';
import { ProjectCard } from './project-card';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectGridProps {
  projects: Project[];
  onOpenModal: (project: Project) => void;
}

export function ProjectGrid({ projects, onOpenModal }: ProjectGridProps) {
  const projectCards = useMemo(
    () =>
      projects.map((project, index) => (
        <motion.div
          key={project.id}
          layout
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <ProjectCard
            project={project}
            index={index}
            onOpenModal={onOpenModal}
          />
        </motion.div>
      )),
    [projects, onOpenModal]
  );

  return (
    <motion.div
      layout
      className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
    >
      <AnimatePresence mode="popLayout">{projectCards}</AnimatePresence>
    </motion.div>
  );
}

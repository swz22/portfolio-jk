'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { projects } from '@/data/projects';
import { ProjectFilters } from './project-filters';
import { ProjectGrid } from './project-grid';
import { ProjectModal } from './project-modal';
import { useFilter } from '@/hooks/use-filter';
import { Project } from '@/types';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const { filter, setFilter, filteredItems } = useFilter(
    projects,
    (project, filter) => project.category === filter
  );

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 select-none text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">Projects</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Explore my latest work showcasing modern web development
          </p>
        </motion.div>

        <ProjectFilters activeFilter={filter} onFilterChange={setFilter} />

        <ProjectGrid
          projects={filteredItems}
          onOpenModal={setSelectedProject}
        />

        <ProjectModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
}

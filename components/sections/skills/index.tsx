'use client';

import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { skillCategories } from '@/data/skills';
import { SkillCard } from './skill-card';

const BentoGrid = lazy(() =>
  import('./bento-grid').then((mod) => ({ default: mod.BentoGrid }))
);

export default function Skills() {
  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 select-none text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">
            Skills & Expertise
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            A comprehensive overview of my technical skills, tools, and
            technologies I work with
          </p>
        </motion.div>

        <div className="mb-16">
          <Suspense
            fallback={
              <div className="flex h-[400px] items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
              </div>
            }
          >
            <BentoGrid />
          </Suspense>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, index) => (
            <SkillCard key={category.name} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

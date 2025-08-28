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
    <section id="skills" className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-8 select-none text-center"
        >
          <h2 className="mb-3 text-3xl font-bold md:text-4xl">
            Skills & Expertise
          </h2>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground">
            My technical toolkit at a glance
          </p>
        </motion.div>

        <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {skillCategories.map((category, index) => (
            <SkillCard key={category.name} category={category} index={index} />
          ))}
        </div>

        <div>
          <Suspense
            fallback={
              <div className="flex h-[300px] items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
              </div>
            }
          >
            <BentoGrid />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
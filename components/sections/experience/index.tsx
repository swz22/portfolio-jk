'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExperienceCard } from './experience-card';
import { Timeline } from './timeline';
import { experiences } from '@/data/experience';

export default function Experience() {
  const [selectedExperience, setSelectedExperience] = useState(
    experiences[0].id
  );

  const selectedExp = experiences.find((exp) => exp.id === selectedExperience);

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 select-none text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">
            Professional Experience
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            My journey through different roles and companies, building products
            that make a difference
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Timeline
              experiences={experiences}
              selectedId={selectedExperience}
              onSelect={setSelectedExperience}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {selectedExp && <ExperienceCard experience={selectedExp} />}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

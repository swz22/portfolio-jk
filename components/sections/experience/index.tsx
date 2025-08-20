'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Experience } from '@/types';
import { ExperienceCard } from './experience-card';
import { Timeline } from './timeline';

// Temporary: Define experiences here until import issue is resolved
const experiences: Experience[] = [
  {
    id: 'experience-id-1',
    company: 'Company Name',
    logo: '/companies/company-logo.png',
    role: 'Job Role Title',
    type: 'full-time',
    duration: {
      start: new Date('2022-01-01'),
      end: 'present',
    },
    location: 'City, State',
    description: [
      'Key responsibility or achievement description 1',
      'Key responsibility or achievement description 2',
      'Key responsibility or achievement description 3',
      'Key responsibility or achievement description 4',
    ],
    achievements: [
      {
        icon: '🏆',
        title: 'Achievement Title 1',
        description: 'Achievement description explaining what was accomplished',
        impact: 'Measurable impact or result',
      },
      {
        icon: '💡',
        title: 'Achievement Title 2',
        description: 'Achievement description explaining what was accomplished',
        impact: 'Measurable impact or result',
      },
      {
        icon: '🚀',
        title: 'Achievement Title 3',
        description: 'Achievement description explaining what was accomplished',
        impact: 'Measurable impact or result',
      },
    ],
    technologies: [
      { name: 'Technology 1', icon: '⚛️', color: '#61DAFB', proficiency: 95 },
      { name: 'Technology 2', icon: '🟢', color: '#339933', proficiency: 90 },
      { name: 'Technology 3', icon: '📘', color: '#3178C6', proficiency: 85 },
      { name: 'Technology 4', icon: '🎨', color: '#06B6D4', proficiency: 88 },
    ],
    projects: ['project-id-1', 'project-id-2'],
  },
  {
    id: 'experience-id-2',
    company: 'Previous Company',
    logo: '/companies/previous-company-logo.png',
    role: 'Previous Role Title',
    type: 'full-time',
    duration: {
      start: new Date('2020-01-01'),
      end: new Date('2021-12-31'),
    },
    location: 'City, State',
    description: [
      'Previous role responsibility 1',
      'Previous role responsibility 2',
      'Previous role responsibility 3',
      'Previous role responsibility 4',
    ],
    achievements: [
      {
        icon: '⭐',
        title: 'Previous Achievement Title',
        description: 'Previous achievement description',
        impact: 'Previous achievement impact',
      },
      {
        icon: '📈',
        title: 'Growth Achievement',
        description: 'Growth achievement description',
        impact: 'Growth metrics or results',
      },
    ],
    technologies: [
      { name: 'Past Tech 1', icon: '💻', color: '#4FC08D', proficiency: 88 },
      { name: 'Past Tech 2', icon: '🔧', color: '#3776AB', proficiency: 85 },
      { name: 'Past Tech 3', icon: '🗄️', color: '#4169E1', proficiency: 82 },
    ],
    projects: ['project-id-3'],
  },
  {
    id: 'experience-id-3',
    company: 'Contract Company',
    logo: '/companies/contract-company-logo.png',
    role: 'Contract Role Title',
    type: 'contract',
    duration: {
      start: new Date('2019-01-01'),
      end: new Date('2019-12-31'),
    },
    location: 'Remote',
    description: [
      'Contract role description 1',
      'Contract role description 2',
      'Contract role description 3',
    ],
    achievements: [
      {
        icon: '🎯',
        title: 'Contract Achievement',
        description: 'Contract achievement description',
        impact: 'Contract project impact',
      },
    ],
    technologies: [
      {
        name: 'Contract Tech 1',
        icon: '🛠️',
        color: '#61DAFB',
        proficiency: 90,
      },
      {
        name: 'Contract Tech 2',
        icon: '🎨',
        color: '#CC6699',
        proficiency: 85,
      },
    ],
    projects: [],
  },
  {
    id: 'experience-id-4',
    company: 'Internship Company',
    logo: '/companies/internship-company-logo.png',
    role: 'Intern Role Title',
    type: 'internship',
    duration: {
      start: new Date('2018-06-01'),
      end: new Date('2018-12-01'),
    },
    location: 'City, State',
    description: [
      'Internship responsibility 1',
      'Internship responsibility 2',
      'Internship learning experience',
    ],
    achievements: [
      {
        icon: '📚',
        title: 'Learning Achievement',
        description: 'What was learned during internship',
        impact: 'Internship outcome or result',
      },
    ],
    technologies: [
      { name: 'Intern Tech 1', icon: '📝', color: '#F7DF1E', proficiency: 75 },
      { name: 'Intern Tech 2', icon: '🌐', color: '#E34C26', proficiency: 80 },
    ],
    projects: [],
  },
];

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
          className="mb-12 text-center"
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

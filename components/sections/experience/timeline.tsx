'use client';

import { memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Experience } from '@/types';
import { cn } from '@/lib/utils';
import { formatDate, calculateDuration } from '@/lib/utils';

interface TimelineProps {
  experiences: Experience[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export const Timeline = memo(function Timeline({
  experiences,
  selectedId,
  onSelect,
}: TimelineProps) {
  const handleSelect = useCallback(
    (id: string) => {
      onSelect(id);
    },
    [onSelect]
  );

  return (
    <div className="relative select-none">
      <div className="absolute left-8 top-0 h-full w-0.5 bg-border" />

      <div className="space-y-8">
        {experiences.map((exp: Experience, index: number) => {
          const isSelected = exp.id === selectedId;
          const duration = calculateDuration(
            exp.duration.start,
            exp.duration.end
          );

          return (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => handleSelect(exp.id)}
              className={cn(
                'relative cursor-pointer rounded-lg p-4 transition-all',
                'hover:bg-secondary/50',
                isSelected && 'bg-secondary'
              )}
            >
              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    'relative z-10 flex h-16 w-16 items-center justify-center rounded-full transition-all',
                    isSelected
                      ? 'bg-primary text-primary-foreground'
                      : 'border-2 border-border bg-background'
                  )}
                >
                  <span className="text-2xl">
                    {exp.type === 'full-time' && '💼'}
                    {exp.type === 'contract' && '📋'}
                    {exp.type === 'internship' && '🎓'}
                  </span>

                  {index === 0 && (
                    <motion.div
                      className="absolute -inset-2 rounded-full border-2 border-primary"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  )}
                </div>

                <div className="flex-1">
                  <div className="mb-1 flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{exp.role}</h3>
                      <p className="text-muted-foreground">{exp.company}</p>
                    </div>
                    <span
                      className={cn(
                        'text-sm',
                        isSelected ? 'text-foreground' : 'text-muted-foreground'
                      )}
                    >
                      {duration}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {exp.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {formatDate(exp.duration.start)} -{' '}
                      {exp.duration.end === 'present'
                        ? 'Present'
                        : formatDate(exp.duration.end)}
                    </span>
                  </div>

                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 flex flex-wrap gap-2"
                    >
                      {exp.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech.name}
                          className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-xs"
                        >
                          <span>{tech.icon}</span>
                          <span>{tech.name}</span>
                        </span>
                      ))}
                      {exp.technologies.length > 4 && (
                        <span className="rounded-full bg-primary/10 px-2 py-1 text-xs">
                          +{exp.technologies.length - 4}
                        </span>
                      )}
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
});

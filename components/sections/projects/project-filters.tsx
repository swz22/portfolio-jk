'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { PROJECT_CATEGORIES } from '@/constants';

interface ProjectFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export const ProjectFilters = memo(function ProjectFilters({
  activeFilter,
  onFilterChange,
}: ProjectFiltersProps) {
  return (
    <div className="mb-8 flex flex-wrap justify-center gap-2">
      {PROJECT_CATEGORIES.map((category) => (
        <motion.button
          key={category.value}
          onClick={() => onFilterChange(category.value)}
          className={cn(
            'rounded-full px-4 py-2 text-sm font-medium transition-all',
            'hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
            activeFilter === category.value
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {category.label}
        </motion.button>
      ))}
    </div>
  );
});

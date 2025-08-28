'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  section: string;
  isActive: boolean;
}

export function Breadcrumb() {
  const [activeSection, setActiveSection] = useState('hero');
  const [mounted, setMounted] = useState(false);

  const sections: BreadcrumbItem[] = [
    { label: 'Home', section: 'hero', isActive: activeSection === 'hero' },
    { label: 'Projects', section: 'projects', isActive: activeSection === 'projects' },
    { label: 'Skills', section: 'skills', isActive: activeSection === 'skills' },
    { label: 'Experience', section: 'experience', isActive: activeSection === 'experience' },
    { label: 'Contact', section: 'contact', isActive: activeSection === 'contact' },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      const sectionNames = ['hero', 'projects', 'skills', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sectionNames) {
        const element = document.getElementById(section);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const elementTop = top + window.scrollY;
          const elementBottom = bottom + window.scrollY;

          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted]);

  if (!mounted) return null;

  const activeSectionIndex = sections.findIndex(s => s.isActive);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          {/* Progress line */}
          <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-border" />
          <motion.div
            className="absolute left-1/2 top-0 w-0.5 -translate-x-1/2 bg-primary"
            initial={{ height: 0 }}
            animate={{ 
              height: `${(activeSectionIndex / (sections.length - 1)) * 100}%` 
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Section dots */}
          <div className="relative space-y-8">
            {sections.map((item, index) => (
              <motion.button
                key={item.section}
                onClick={() => {
                  const target = document.getElementById(item.section);
                  target?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={cn(
                  'group relative flex h-4 w-4 items-center justify-center rounded-full border-2 transition-all',
                  'hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/20',
                  item.isActive
                    ? 'border-primary bg-primary'
                    : 'border-border bg-background hover:border-primary/50'
                )}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className={cn(
                    'h-2 w-2 rounded-full transition-all',
                    item.isActive ? 'bg-primary-foreground' : 'bg-transparent'
                  )}
                />
                
                {/* Tooltip */}
                <div className="absolute left-8 z-10 whitespace-nowrap rounded-md bg-background/90 px-2 py-1 text-xs font-medium text-foreground opacity-0 shadow-lg backdrop-blur-sm transition-opacity group-hover:opacity-100">
                  {item.label}
                  <div className="absolute right-full top-1/2 -translate-y-1/2">
                    <div className="h-2 w-2 rotate-45 bg-background/90" />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
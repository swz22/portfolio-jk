'use client';

import { motion } from 'framer-motion';
import { ThemeScene } from '@/components/three/theme-scene';
import { Terminal } from '@/components/ui/terminal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SITE_CONFIG } from '@/constants';
import Link from 'next/link';

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center"
    >
      <ThemeScene />

      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="select-none"
          >
            <Badge variant="secondary" className="mb-4">
              {SITE_CONFIG.availability}
            </Badge>

            <h1 className="mb-6 text-5xl font-bold md:text-7xl">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                John.
              </span>
            </h1>

            <p className="mb-8 text-xl text-muted-foreground md:text-2xl">
              {SITE_CONFIG.title} & Project Manager
            </p>

            <p className="mb-8 max-w-lg text-lg text-muted-foreground">
              Software engineer proficient in modern web technologies. Proven
              track record of delivering enterprise-grade solutions, leading
              cross-functional initiatives, and optimizing application
              performance and user experience. Currently driving data-driven
              insights at Samsung.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg">
                <Link href="#projects">View Projects</Link>
              </Button>
              <Button size="lg" variant="outline">
                <Link href="#contact">Contact Me</Link>
              </Button>
            </div>

            <div className="mt-12 flex items-center gap-6">
              <div>
                <p className="text-3xl font-bold">5+</p>
                <p className="text-sm text-muted-foreground">
                  Years Experience
                </p>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <p className="text-3xl font-bold">30+</p>
                <p className="text-sm text-muted-foreground">
                  Projects Completed
                </p>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <p className="text-3xl font-bold">100%</p>
                <p className="text-sm text-muted-foreground">
                  Client Satisfaction
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-start justify-center lg:justify-end lg:pt-16"
          >
            <div className="w-full max-w-2xl">
              <Terminal />
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-0 right-0 z-10 flex justify-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Link
          href="#projects"
          className="flex select-none flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
        >
          <span className="text-sm">Scroll to explore</span>
          <motion.svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </motion.svg>
        </Link>
      </motion.div>
    </section>
  );
}

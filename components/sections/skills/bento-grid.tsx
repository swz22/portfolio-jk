'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import dynamic from 'next/dynamic';
import { codeSnippets, skillCategories } from '@/data/skills';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const Scene = dynamic(
  () => import('@/components/three/scene').then((mod) => mod.Scene),
  {
    ssr: false,
    loading: () => (
      <div className="relative flex h-[300px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    ),
  }
);

const FloatingSpheres = dynamic(
  () =>
    import('@/components/three/skills/floating-spheres').then(
      (mod) => mod.FloatingSpheres
    ),
  {
    ssr: false,
  }
);

const GitHubGraph = dynamic(
  () => import('./github-graph').then((mod) => mod.GitHubGraph),
  {
    ssr: false,
  }
);

const CodeSnippet = dynamic(
  () => import('./code-snippet').then((mod) => mod.CodeSnippet),
  {
    ssr: false,
  }
);

export function BentoGrid() {
  const [activeSnippet, setActiveSnippet] = useState(0);
  const topSkills = skillCategories[0].skills.slice(0, 6);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="md:col-span-2 lg:col-span-2"
      >
        <Card className="h-full border-border/50 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle>3D Skill Visualization</CardTitle>
          </CardHeader>
          <CardContent>
            <Scene className="h-[300px] w-full">
              <FloatingSpheres skills={topSkills} />
            </Scene>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="md:col-span-2"
      >
        <Card className="h-full border-border/50 bg-card/50 backdrop-blur">
          <CardContent className="p-6">
            <GitHubGraph />
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="md:col-span-2 lg:col-span-2"
      >
        <Card className="h-full border-border/50 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle>Code Snippets</CardTitle>
            <div className="mt-2 flex gap-2">
              {codeSnippets.map((snippet, index) => (
                <button
                  key={snippet.id}
                  onClick={() => setActiveSnippet(index)}
                  className={cn(
                    'rounded-md px-3 py-1 text-sm transition-colors',
                    activeSnippet === index
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary hover:bg-secondary/80'
                  )}
                >
                  {snippet.language}
                </button>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <CodeSnippet {...codeSnippets[activeSnippet]} />
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="md:col-span-1"
      >
        <Card className="h-full border-border/50 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle>Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-4xl font-bold">50+</p>
              <p className="text-sm text-muted-foreground">
                Projects Completed
              </p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold">95%</p>
              <p className="text-sm text-muted-foreground">
                Client Satisfaction
              </p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold">5+</p>
              <p className="text-sm text-muted-foreground">Years Experience</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="md:col-span-1"
      >
        <Card className="h-full border-border/50 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle>Certifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-primary/20">
                🏆
              </div>
              <div>
                <p className="text-sm font-medium">AWS Certified</p>
                <p className="text-xs text-muted-foreground">
                  Solutions Architect
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-primary/20">
                🎓
              </div>
              <div>
                <p className="text-sm font-medium">Meta Certificate</p>
                <p className="text-xs text-muted-foreground">React Advanced</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-primary/20">
                📜
              </div>
              <div>
                <p className="text-sm font-medium">Google Cloud</p>
                <p className="text-xs text-muted-foreground">Professional</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

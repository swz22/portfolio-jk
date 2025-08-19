'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Scene } from '@/components/three/scene';
import { FloatingSpheres } from '@/components/three/skills/floating-spheres';
import { GitHubGraph } from './github-graph';
import { CodeSnippet } from './code-snippet';
import { codeSnippets, skillCategories } from '@/data/skills';
import { useState } from 'react';
import { cn } from '@/lib/utils';

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
        <Card className="border-border/50 bg-card/50 h-full backdrop-blur">
          <CardHeader>
            <CardTitle>3D Skill Visualization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative h-[300px]">
              <Scene className="h-full w-full">
                <FloatingSpheres skills={topSkills} />
              </Scene>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="md:col-span-2"
      >
        <Card className="border-border/50 bg-card/50 h-full backdrop-blur">
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
        <Card className="border-border/50 bg-card/50 h-full backdrop-blur">
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
        <Card className="border-border/50 bg-card/50 h-full backdrop-blur">
          <CardHeader>
            <CardTitle>Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-4xl font-bold">50+</p>
              <p className="text-muted-foreground text-sm">
                Projects Completed
              </p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold">95%</p>
              <p className="text-muted-foreground text-sm">
                Client Satisfaction
              </p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold">5+</p>
              <p className="text-muted-foreground text-sm">Years Experience</p>
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
        <Card className="border-border/50 bg-card/50 h-full backdrop-blur">
          <CardHeader>
            <CardTitle>Certifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="bg-primary/20 flex h-10 w-10 items-center justify-center rounded">
                🏆
              </div>
              <div>
                <p className="text-sm font-medium">AWS Certified</p>
                <p className="text-muted-foreground text-xs">
                  Solutions Architect
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-primary/20 flex h-10 w-10 items-center justify-center rounded">
                🎓
              </div>
              <div>
                <p className="text-sm font-medium">Meta Certificate</p>
                <p className="text-muted-foreground text-xs">React Advanced</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-primary/20 flex h-10 w-10 items-center justify-center rounded">
                📜
              </div>
              <div>
                <p className="text-sm font-medium">Google Cloud</p>
                <p className="text-muted-foreground text-xs">Professional</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

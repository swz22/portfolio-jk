'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import dynamic from 'next/dynamic';
import { codeSnippets } from '@/data/skills';
import { useState } from 'react';
import { cn } from '@/lib/utils';

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

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="md:col-span-1"
      >
        <Card className="h-full border-border/50 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle>Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-4xl font-bold">30+</p>
              <p className="text-sm text-muted-foreground">
                Projects Completed
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
        transition={{ duration: 0.5, delay: 0.1 }}
        className="md:col-span-1"
      >
        <Card className="h-full border-border/50 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle>Expertise</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-primary/20">
                🚀
              </div>
              <div>
                <p className="text-sm font-medium">Full Stack</p>
                <p className="text-xs text-muted-foreground">
                  End-to-end development
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-primary/20">
                📊
              </div>
              <div>
                <p className="text-sm font-medium">Project Management</p>
                <p className="text-xs text-muted-foreground">
                  Cross-functional leadership
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-primary/20">
                ⚡
              </div>
              <div>
                <p className="text-sm font-medium">Performance</p>
                <p className="text-xs text-muted-foreground">
                  Optimization expert
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="md:col-span-2"
      >
        <Card className="h-full border-border/50 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle>Languages</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-secondary/50 p-4 text-center">
                <p className="mb-1 text-2xl">🇺🇸</p>
                <p className="text-sm font-medium">English</p>
                <p className="text-xs text-muted-foreground">Native</p>
              </div>
              <div className="rounded-lg bg-secondary/50 p-4 text-center">
                <p className="mb-1 text-2xl">🇰🇷</p>
                <p className="text-sm font-medium">Korean</p>
                <p className="text-xs text-muted-foreground">Fluent</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
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
        transition={{ duration: 0.5, delay: 0.4 }}
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
    </div>
  );
}

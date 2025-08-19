'use client';

import dynamic from 'next/dynamic';

const Hero = dynamic(
  () => import('./index').then((mod) => ({ default: mod.Hero })),
  {
    ssr: false,
    loading: () => (
      <section className="relative flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading scene...</p>
        </div>
      </section>
    ),
  }
);

export { Hero };

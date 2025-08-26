'use client';

import dynamic from 'next/dynamic';

const Hero = dynamic(
  () => import('./index').then((mod) => ({ default: mod.Hero })),
  {
    ssr: false,
    loading: () => (
      <section className="relative flex min-h-screen items-center justify-center">
        <div className="container relative z-10 mx-auto px-4 py-20">
          <div className="animate-pulse">
            <div className="mb-6 h-16 w-3/4 rounded bg-secondary/20"></div>
            <div className="mb-4 h-8 w-1/2 rounded bg-secondary/20"></div>
            <div className="mb-2 h-4 w-full rounded bg-secondary/20"></div>
            <div className="h-4 w-5/6 rounded bg-secondary/20"></div>
          </div>
        </div>
      </section>
    ),
  }
);

export { Hero };

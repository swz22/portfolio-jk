'use client';

import dynamic from 'next/dynamic';

const Hero = dynamic(
  () => import('./index').then((mod) => ({ default: mod.Hero })),
  {
    ssr: false,
    loading: () => (
      <section className="relative flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="border-primary inline-block h-8 w-8 animate-spin rounded-full border-b-2"></div>
          <p className="text-muted-foreground mt-4">Loading 3D scene...</p>
        </div>
      </section>
    ),
  }
);

export { Hero };

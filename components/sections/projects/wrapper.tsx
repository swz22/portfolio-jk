'use client';

import dynamic from 'next/dynamic';

const Projects = dynamic(() => import('./index'), {
  ssr: true,
  loading: () => (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex h-[400px] items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">Loading projects...</p>
          </div>
        </div>
      </div>
    </section>
  ),
});

export { Projects };

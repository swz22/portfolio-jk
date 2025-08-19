import { Hero } from '@/components/sections/hero/wrapper';
import Projects from '@/components/sections/projects';
import Skills from '@/components/sections/skills';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Projects />
      <Skills />

      <section id="experience" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-3xl font-bold">Experience</h2>
          <p className="text-muted-foreground">Coming soon...</p>
        </div>
      </section>

      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-3xl font-bold">Contact</h2>
          <p className="text-muted-foreground">Coming soon...</p>
        </div>
      </section>
    </>
  );
}

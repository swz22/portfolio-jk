import { Hero } from '@/components/sections/hero';
import Projects from '@/components/sections/projects';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Projects />

      <section id="skills" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-3xl font-bold">Skills</h2>
          <p className="text-muted-foreground">Coming soon...</p>
        </div>
      </section>

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

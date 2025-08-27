import { Hero } from '@/components/sections/hero/wrapper';
import Projects from '@/components/sections/projects';
import Skills from '@/components/sections/skills';
import Experience from '@/components/sections/experience';
import Contact from '@/components/sections/contact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
    </>
  );
}
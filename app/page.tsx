import { Hero } from '@/components/sections/hero/wrapper';
import { Projects } from '@/components/sections/projects/wrapper';
import { Skills } from '@/components/sections/skills/wrapper';
import { Experience } from '@/components/sections/experience/wrapper';
import { Contact } from '@/components/sections/contact/wrapper';

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

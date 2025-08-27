import { Hero } from '@/components/sections/hero/wrapper';
import { ProjectsWrapper } from '@/components/sections/projects/wrapper';
import { SkillsWrapper } from '@/components/sections/skills/wrapper';
import { ExperienceWrapper } from '@/components/sections/experience/wrapper';
import { ContactWrapper } from '@/components/sections/contact/wrapper';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProjectsWrapper />
      <SkillsWrapper />
      <ExperienceWrapper />
      <ContactWrapper />
    </>
  );
}

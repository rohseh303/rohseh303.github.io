import { experience } from '@/content/experience.json';
import { projects } from '@/content/projects.json';
import Navigation from '@/components/layout/Navigation';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/sections/SectionHeader';
import ExperienceCard from '@/components/cards/ExperienceCard';
import ProjectCard from '@/components/cards/ProjectCard';
import { Experience, Project } from '@/types';

export default function ExperiencePage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-32 pb-16">
        <Container>
          <SectionHeader title="EXPERIENCE" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {(experience as Experience[]).map((exp) => (
              <ExperienceCard key={exp.id} experience={exp} />
            ))}
          </div>
          
          <SectionHeader title="PROJECTS" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(projects as Project[]).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </Container>
      </main>
    </>
  );
}

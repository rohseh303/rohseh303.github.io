import { projects } from '@/content/projects.json';
import Navigation from '@/components/layout/Navigation';
import SectionHeader from '@/components/sections/SectionHeader';
import ProjectCard from '@/components/cards/ProjectCard';
import { Project } from '@/types';

export default function ProjectsPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-8">
          <SectionHeader title="PROJECTS" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(projects as Project[]).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

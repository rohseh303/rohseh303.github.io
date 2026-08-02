import { experience } from '@/content/experience.json';
import Navigation from '@/components/layout/Navigation';
import SectionHeader from '@/components/sections/SectionHeader';
import ExperienceCard from '@/components/cards/ExperienceCard';
import { Experience } from '@/types';

export default function ExperiencePage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-8">
          <SectionHeader title="EXPERIENCE" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(experience as Experience[]).map((exp) => (
              <ExperienceCard key={exp.id} experience={exp} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

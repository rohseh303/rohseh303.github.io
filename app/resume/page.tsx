import Link from 'next/link';
import Navigation from '@/components/layout/Navigation';
import PrintButton from '@/components/ui/PrintButton';
import SectionHeader from '@/components/sections/SectionHeader';
import { experience } from '@/content/experience.json';
import { projects } from '@/content/projects.json';
import about from '@/content/about.json';
import type { Experience, Project } from '@/types';

const allExperience = experience as Experience[];
const selectedProjects = (projects as Project[]).slice(0, 3);

export default function ResumePage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-32 pb-16 print:pt-0">
        <div className="max-w-5xl mx-auto px-6 md:px-8 print:px-0 print:max-w-none">
          <header className="pb-8 border-b border-[rgba(255,255,255,0.1)] print:border-gray-300">
            <h1 className="text-3xl font-medium">Rohan Sehgal</h1>
            <p className="text-sm text-[#a0a0a0] mt-2">
              Software engineer building identity and AI systems in San Francisco.
            </p>
            <div className="flex flex-wrap gap-5 mt-5 text-xs print:hidden">
              <PrintButton />
              <a className="text-[#a0a0a0] hover:text-white" href="https://github.com/rohseh303" target="_blank" rel="noreferrer">github ↗</a>
              <a className="text-[#a0a0a0] hover:text-white" href="https://www.linkedin.com/in/rohansehgal2/" target="_blank" rel="noreferrer">linkedin ↗</a>
            </div>
          </header>

          <section className="py-10 border-b border-[rgba(255,255,255,0.1)] print:py-5 print:border-gray-300">
            <SectionHeader title="EXPERIENCE" />
            <div className="space-y-9 print:space-y-5">
              {allExperience.map((item) => (
                <article key={item.id} className="grid grid-cols-1 md:grid-cols-[13rem_minmax(0,1fr)] gap-2 md:gap-8 break-inside-avoid">
                  <div>
                    <h2 className="text-sm font-medium">{item.company}</h2>
                    <p className="text-xs text-[#777] mt-1">{item.startDate} — {item.endDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white mb-2 print:text-black">{item.role} · {item.location}</p>
                    <ul className="text-sm text-[#a0a0a0] space-y-1 list-disc pl-4 print:text-gray-700">
                      {item.description.map((line) => <li key={line}>{line}</li>)}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="py-10 border-b border-[rgba(255,255,255,0.1)] print:py-5 print:border-gray-300">
            <SectionHeader title="SELECTED WORK" />
            <div className="space-y-7 print:space-y-4">
              {selectedProjects.map((project) => (
                <article key={project.id} className="grid grid-cols-1 md:grid-cols-[13rem_minmax(0,1fr)] gap-2 md:gap-8 break-inside-avoid">
                  <h2 className="text-sm font-medium">{project.title}</h2>
                  <div>
                    <p className="text-sm text-[#a0a0a0] print:text-gray-700">{project.description}</p>
                    {project.links?.github && (
                      <a className="inline-block text-xs text-white mt-2 print:text-black" href={project.links.github} target="_blank" rel="noreferrer">github ↗</a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="py-10 print:py-5">
            <SectionHeader title="EDUCATION" />
            <div className="space-y-6">
              <article className="grid grid-cols-1 md:grid-cols-[13rem_minmax(0,1fr)] gap-2 md:gap-8">
                <h2 className="text-sm font-medium">{about.education.ucsc.school}</h2>
                <p className="text-sm text-[#a0a0a0] print:text-gray-700">
                  {about.education.ucsc.degree} · Graduated in 3 years with honors · GPA {about.education.ucsc.gpa}
                </p>
              </article>
              <article className="grid grid-cols-1 md:grid-cols-[13rem_minmax(0,1fr)] gap-2 md:gap-8">
                <h2 className="text-sm font-medium">{about.education.ucsd.school}</h2>
                <p className="text-sm text-[#a0a0a0] print:text-gray-700">
                  {about.education.ucsd.degree}, {about.education.ucsd.focus} · {about.education.ucsd.status}
                </p>
              </article>
            </div>
          </section>

          <footer className="border-t border-[rgba(255,255,255,0.1)] pt-6 text-xs text-[#777] flex justify-between print:border-gray-300 print:text-gray-600">
            <p>rohansehgal.me</p>
            <Link className="hover:text-white print:hidden" href="/">Back to home →</Link>
          </footer>
        </div>
      </main>
    </>
  );
}

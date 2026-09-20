import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/layout/Navigation';
import SectionHeader from '@/components/sections/SectionHeader';
import TechTag from '@/components/ui/TechTag';
import { experience } from '@/content/experience.json';
import { projects } from '@/content/projects.json';
import type { Experience, Project } from '@/types';

const featuredExperience = (experience as Experience[]).slice(0, 4);
const featuredProjects = (projects as Project[]).slice(0, 4);

const companyLinks: Record<string, string> = {
  'tools-for-humanity': 'https://www.linkedin.com/company/toolsforhumanity',
  broccoli: 'https://www.linkedin.com/company/broccoli-com',
  'amazon-robotics': 'https://www.linkedin.com/company/amazon-fulfillment-technologies-robotics',
  salesforce: 'https://www.linkedin.com/company/salesforce',
};

function projectDestination(project: Project) {
  return project.links?.writeup || project.links?.demo || project.links?.appStore || project.links?.github || '#';
}

export default function Home() {
  return (
    <>
      <Navigation />
      <main id="content" className="min-h-screen pt-32 pb-16">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <section className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_9rem] gap-10 md:gap-16 items-start mb-24">
            <div className="max-w-3xl">
              <h1 className="text-2xl md:text-3xl font-medium mb-2">Rohan Sehgal</h1>

              <div className="space-y-5 mt-8 text-sm md:text-base text-[#a0a0a0] leading-relaxed">
                <p>
                  I&apos;m a software engineer at{' '}
                  <a
                    className="text-white underline underline-offset-4 hover:text-[#c8c8c8]"
                    href="https://www.toolsforhumanity.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Tools for Humanity
                  </a>
                  , working on World ID.
                </p>
                <p>
                  Previously, I was employee #3 and a founding engineer at Broccoli. I helped
                  scale the company from $0 to $10M+ ARR and built systems powering millions
                  of AI voice calls for home-service businesses.
                </p>
              </div>

              <div className="flex flex-wrap gap-x-5 gap-y-2 mt-8 text-sm" aria-label="Contact links">
                <a className="text-[#a0a0a0] hover:text-white transition-colors" href="https://github.com/rohseh303" target="_blank" rel="noreferrer">github</a>
                <a className="text-[#a0a0a0] hover:text-white transition-colors" href="https://www.linkedin.com/in/rohansehgal2/" target="_blank" rel="noreferrer">linkedin</a>
                <a className="text-[#a0a0a0] hover:text-white transition-colors" href="https://x.com/rosehgal" target="_blank" rel="noreferrer">x</a>
              </div>
            </div>

            <Image
              src="/images/profile.jpg"
              alt="Rohan Sehgal"
              width={256}
              height={256}
              priority
              className="hidden md:block w-32 h-32 rounded-full border-terminal object-cover"
            />
          </section>

          <section className="mb-24" aria-labelledby="experience-heading">
            <SectionHeader id="experience-heading" title="WORK EXPERIENCE" />
            <div className="border-t border-[rgba(255,255,255,0.1)]">
              {featuredExperience.map((item) => (
                <a
                  key={item.id}
                  href={companyLinks[item.id]}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${item.company} on LinkedIn`}
                  className="group relative grid grid-cols-1 md:grid-cols-[13rem_minmax(0,1fr)] gap-2 md:gap-8 py-6 px-3 -mx-3 border-b border-[rgba(255,255,255,0.1)] hover:bg-[#111] transition-colors"
                >
                  <div>
                    <h3 className="text-sm font-medium group-hover:text-white">{item.company}</h3>
                    <p className="text-xs text-[#777] mt-1">{item.startDate} — {item.endDate}</p>
                  </div>
                  <div className="pr-7">
                    <p className="text-sm text-white mb-2">{item.role}</p>
                    <p className="text-sm text-[#a0a0a0] leading-relaxed">
                      {item.description.join(' ')}
                    </p>
                  </div>
                  <span className="absolute right-3 top-6 text-[#555] group-hover:text-white transition-colors" aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
            <div className="mt-5 text-sm">
              <Link className="text-[#a0a0a0] hover:text-white transition-colors" href="/resume">
                Full résumé →
              </Link>
            </div>
          </section>

          <section id="projects" aria-labelledby="projects-heading">
            <SectionHeader id="projects-heading" title="PROJECTS" />
            <p className="text-sm text-[#a0a0a0] max-w-2xl mb-6">
              Projects, experiments, and systems I&apos;ve built. Each item opens the work itself.
            </p>

            <div className="grid grid-cols-1 gap-4">
              {featuredProjects.map((project) => {
                const href = projectDestination(project);
                const isExternal = href.startsWith('http');

                return (
                  <a
                    key={project.id}
                    href={href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noreferrer' : undefined}
                    className="group block border-terminal p-5 md:p-6 hover:border-[rgba(255,255,255,0.28)] hover:bg-[#111] transition-colors"
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <h3 className="text-base font-medium group-hover:text-white">{project.title}</h3>
                        <p className="text-sm text-[#a0a0a0] leading-relaxed mt-2 max-w-3xl">
                          {project.description}
                        </p>
                      </div>
                      <span className="text-[#777] group-hover:text-white transition-colors" aria-hidden="true">↗</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.technologies.slice(0, 5).map((technology) => (
                        <TechTag key={technology} name={technology} />
                      ))}
                    </div>
                  </a>
                );
              })}
            </div>
          </section>

          <footer className="border-t border-[rgba(255,255,255,0.1)] mt-24 pt-6 text-xs text-[#777] flex flex-col sm:flex-row justify-between gap-2">
            <p>Rohan Sehgal · San Francisco</p>
            <Link className="hover:text-white transition-colors" href="/writing">Writing →</Link>
          </footer>
        </div>
      </main>
    </>
  );
}

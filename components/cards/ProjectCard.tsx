import { Project } from '@/types';
import TechTag from '@/components/ui/TechTag';
import Link from 'next/link';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="border-terminal p-6 hover:border-[rgba(255,255,255,0.2)] transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-medium mb-1">{project.title}</h3>
          <p className="text-xs text-[#a0a0a0] uppercase tracking-wider mb-2">
            {project.type} • {project.status}
          </p>
        </div>
      </div>
      
      <p className="text-sm mb-4 text-[#a0a0a0]">{project.description}</p>
      
      {project.metrics && project.metrics.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {project.metrics.map((metric, idx) => (
            <div key={idx} className="text-xs border-terminal px-2 py-1">
              <span className="text-[#a0a0a0]">{metric.label}: </span>
              <span className="font-medium">{metric.value}</span>
            </div>
          ))}
        </div>
      )}
      
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map((tech) => (
          <TechTag key={tech} name={tech} />
        ))}
      </div>
      
      {project.links && (
        <div className="flex gap-4 text-xs">
          {project.links.github && (
            <Link 
              href={project.links.github} 
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#a0a0a0] hover:text-white transition-colors"
            >
              GitHub →
            </Link>
          )}
          {project.links.demo && (
            <Link 
              href={project.links.demo} 
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#a0a0a0] hover:text-white transition-colors"
            >
              Demo →
            </Link>
          )}
          {project.links.appStore && (
            <Link 
              href={project.links.appStore} 
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#a0a0a0] hover:text-white transition-colors"
            >
              App Store →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

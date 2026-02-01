import { Experience } from '@/types';
import TechTag from '@/components/ui/TechTag';

// Helper function to convert URLs in text to clickable links
function parseTextWithLinks(text: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);
  
  return parts.map((part, index) => {
    if (part.match(urlRegex)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:underline"
        >
          {part}
        </a>
      );
    }
    return <span key={index}>{part}</span>;
  });
}

interface ExperienceCardProps {
  experience: Experience;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <div className="border-terminal p-6 hover:border-[rgba(255,255,255,0.2)] transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-medium mb-1">{experience.company}</h3>
          <p className="text-sm text-[#a0a0a0] mb-1">{experience.role}</p>
          <p className="text-xs text-[#a0a0a0]">
            {experience.startDate} - {experience.endDate} • {experience.location}
          </p>
        </div>
        <span className="text-xs uppercase tracking-wider text-[#a0a0a0] border-terminal px-2 py-1">
          {experience.type}
        </span>
      </div>
      
      <ul className="space-y-2 mb-4 text-sm">
        {experience.description.map((item, idx) => (
          <li key={idx} className="flex items-start">
            <span className="mr-2">•</span>
            <span className="text-[#a0a0a0]">{parseTextWithLinks(item)}</span>
          </li>
        ))}
      </ul>
      
      <div className="flex flex-wrap gap-2">
        {experience.technologies.map((tech) => (
          <TechTag key={tech} name={tech} />
        ))}
      </div>
    </div>
  );
}

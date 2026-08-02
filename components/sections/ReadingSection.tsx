import aboutData from '@/content/about.json';
import BorderBox from '@/components/ui/BorderBox';

export default function ReadingSection() {
  const { currentlyReading } = aboutData;
  
  return (
    <BorderBox>
      <h2 className="text-xs uppercase tracking-wider mb-6">WHAT I'M READING</h2>
      <p className="text-sm text-[#a0a0a0] mb-6">
        {currentlyReading || "Check back later for updates"}
      </p>
      
      {/* Engineering Stuff subsection */}
      <div className="pt-6 border-t border-terminal">
        <h3 className="text-xs uppercase tracking-wider text-[#a0a0a0] mb-4">ENGINEERING STUFF</h3>
        <p className="text-sm text-[#a0a0a0]">
          Currently exploring: Temporal workflows, Langchain agents, and scalable system design.
        </p>
      </div>
    </BorderBox>
  );
}

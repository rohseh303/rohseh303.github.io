import aboutData from '@/content/about.json';
import BorderBox from '@/components/ui/BorderBox';

export default function AboutMeSection() {
  const { philosophy } = aboutData;
  
  return (
    <BorderBox>
      <h2 className="text-xs uppercase tracking-wider mb-6">WHAT YOU OUGHT TO KNOW ABOUT ME</h2>
      <div className="space-y-4 text-sm leading-relaxed">
        {philosophy.map((paragraph, index) => (
          <p key={index} className="text-[#a0a0a0]">
            {paragraph}
          </p>
        ))}
      </div>
    </BorderBox>
  );
}

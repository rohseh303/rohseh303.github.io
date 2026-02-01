import aboutData from '@/content/about.json';
import BorderBox from '@/components/ui/BorderBox';

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

export default function ValuesSection() {
  const { values } = aboutData;
  
  return (
    <BorderBox>
      <h2 className="text-xs uppercase tracking-wider mb-6">WHAT I'M DOING</h2>
      <div className="space-y-4 text-sm leading-relaxed">
        {values.map((value, index) => (
          <p key={index} className="text-[#a0a0a0]">
            {parseTextWithLinks(value)}
          </p>
        ))}
      </div>
    </BorderBox>
  );
}

import aboutData from '@/content/about.json';
import BorderBox from '@/components/ui/BorderBox';

export default function ProfileSection() {
  const { profile, education, technologies } = aboutData;
  
  return (
    <BorderBox>
      <h2 className="text-xs uppercase tracking-wider mb-6">PROFILE</h2>
      
      <div className="flex items-start gap-6 mb-6">
        <div className="w-24 h-24 border-terminal rounded-full overflow-hidden flex-shrink-0 bg-[#1a1a1a] flex items-center justify-center">
          <span className="text-2xl text-[#a0a0a0]">{profile.name.charAt(0)}</span>
        </div>
        <div>
          <h3 className="text-xl font-medium mb-1">{profile.name}</h3>
          <p className="text-sm text-[#a0a0a0] mb-4">Age: {profile.age}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-[#1a1a1a] p-4 border-terminal">
          <p className="text-xs uppercase tracking-wider text-[#a0a0a0] mb-2">CURRENT</p>
          <p className="text-sm">{profile.currentRole}</p>
        </div>
        
        <div className="bg-[#1a1a1a] p-4 border-terminal">
          <p className="text-xs uppercase tracking-wider text-[#a0a0a0] mb-2">LANGUAGES</p>
          <p className="text-sm">{technologies.languages.join(', ')}</p>
        </div>
        
        <div className="bg-[#1a1a1a] p-4 border-terminal">
          <p className="text-xs uppercase tracking-wider text-[#a0a0a0] mb-2">TOOLS</p>
          <p className="text-sm">{technologies.tools.join(', ')}</p>
        </div>
      </div>
    </BorderBox>
  );
}

import Navigation from '@/components/layout/Navigation';
import ProfileSection from '@/components/sections/ProfileSection';
import ValuesSection from '@/components/sections/ValuesSection';
import AboutMeSection from '@/components/sections/AboutMeSection';
import GitHubEmbed from '@/components/sections/GitHubEmbed';
import WritingPreview from '@/components/sections/WritingPreview';
import aboutData from '@/content/about.json';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/sections/SectionHeader';
import BorderBox from '@/components/ui/BorderBox';

export default function Home() {
  const { education } = aboutData;
  
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-8">
          {/* Top Row: Profile and What I'm Doing */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <ProfileSection />
            <ValuesSection />
          </div>
          
          {/* About Me Section */}
          <div className="mb-8">
            <AboutMeSection />
          </div>

          {/* Writing */}
          <div className="mb-8">
            <WritingPreview />
          </div>

          {/* GitHub Profile Embed */}
          <div className="mb-16">
            <GitHubEmbed />
          </div>
          
          {/* Education */}
          <div className="mb-16">
            <SectionHeader title="EDUCATION" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BorderBox>
                <div>
                  <h4 className="text-sm font-medium mb-2">{education.ucsd.school}</h4>
                  <p className="text-sm text-[#a0a0a0] mb-1">{education.ucsd.degree}</p>
                  <p className="text-xs text-[#a0a0a0]">Focus: {education.ucsd.focus}</p>
                  <p className="text-xs text-[#a0a0a0] mt-2">{education.ucsd.status}</p>
                </div>
                {/* Logo commented out for now
                <div className="flex-shrink-0 w-16 h-16 relative">
                  <img
                    src="/images/education/ucsd-triton.png"
                    alt="UC San Diego Triton Logo"
                    className="w-full h-full object-contain opacity-60"
                    style={{ 
                      filter: 'grayscale(100%) brightness(0) invert(1)'
                    }}
                  />
                </div>
                */}
              </BorderBox>
              <BorderBox>
                <div>
                  <h4 className="text-sm font-medium mb-2">{education.ucsc.school}</h4>
                  <p className="text-sm text-[#a0a0a0] mb-1">{education.ucsc.degree}</p>
                  <p className="text-xs text-[#a0a0a0]">{education.ucsc.note}</p>
                  <p className="text-xs text-[#a0a0a0] mt-2">GPA: {education.ucsc.gpa}</p>
                </div>
                {/* Logo commented out for now
                <div className="flex-shrink-0 w-20 h-20 relative flex items-center justify-center">
                  <img
                    src="/images/education/ucsc-banana-slug.png"
                    alt="UC Santa Cruz Banana Slug Logo"
                    className="max-w-full max-h-full object-contain opacity-70"
                    style={{ 
                      filter: 'grayscale(100%) brightness(0) invert(1)',
                      width: 'auto',
                      height: 'auto'
                    }}
                  />
                </div>
                */}
              </BorderBox>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

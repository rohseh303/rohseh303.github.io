import Navigation from '@/components/layout/Navigation';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/sections/SectionHeader';
import BorderBox from '@/components/ui/BorderBox';

export default function LibraryPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-32 pb-16">
        <Container>
          <SectionHeader title="LIBRARY" />
          <BorderBox>
            <div className="text-center py-16">
              <p className="text-lg text-[#a0a0a0] mb-4">Coming Soon</p>
              <p className="text-sm text-[#666]">
                Travel destinations and places I'm exploring.
              </p>
            </div>
          </BorderBox>
        </Container>
      </main>
    </>
  );
}

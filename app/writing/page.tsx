import { posts } from '@/content/writing/posts.json';
import aboutData from '@/content/about.json';
import Navigation from '@/components/layout/Navigation';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/sections/SectionHeader';
import BlogPostCard from '@/components/cards/BlogPostCard';
import BorderBox from '@/components/ui/BorderBox';
import { BlogPost } from '@/types';

export default function WritingPage() {
  const { currentlyReading } = aboutData;
  
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-32 pb-16">
        <Container>
          <SectionHeader title="READING" />
          
          {/* Reading Section - Moved to top */}
          {currentlyReading && currentlyReading.trim() !== "" && currentlyReading !== "Check back later for updates" && (
            <div className="mb-16">
              <SectionHeader title="READING" />
              <BorderBox>
                <p className="text-sm text-[#a0a0a0]">{currentlyReading}</p>
              </BorderBox>
            </div>
          )}
          
          <div className="max-w-3xl">
            {(posts as BlogPost[]).map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        </Container>
      </main>
    </>
  );
}

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
  const allPosts = posts as BlogPost[];
  // Posts without a `url` are my own hosted writeups; posts with a `url` link out to external reading.
  const writing = allPosts.filter((post) => !post.url);
  const reading = allPosts.filter((post) => post.url);

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-32 pb-16">
        <Container>
          {/* WRITING — my own writeups */}
          <SectionHeader title="WRITING" />
          <div className="max-w-3xl mb-16">
            {writing.length > 0 ? (
              writing.map((post) => <BlogPostCard key={post.slug} post={post} />)
            ) : (
              <p className="text-sm text-[#a0a0a0]">No posts yet.</p>
            )}
          </div>

          {/* READING — external articles & books */}
          <SectionHeader title="READING" />
          {currentlyReading && currentlyReading.trim() !== "" && currentlyReading !== "Check back later for updates" && (
            <BorderBox>
              <p className="text-sm text-[#a0a0a0]">{currentlyReading}</p>
            </BorderBox>
          )}
          <div className="max-w-3xl mt-6">
            {reading.map((post) => <BlogPostCard key={post.slug} post={post} />)}
          </div>
        </Container>
      </main>
    </>
  );
}

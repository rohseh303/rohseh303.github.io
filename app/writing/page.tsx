import Navigation from '@/components/layout/Navigation';
import SectionHeader from '@/components/sections/SectionHeader';
import BlogPostCard from '@/components/cards/BlogPostCard';
import { posts } from '@/content/writing/posts.json';
import type { BlogPost } from '@/types';

const writing = (posts as BlogPost[])
  .filter((post) => !post.url)
  .sort((a, b) => b.date.localeCompare(a.date));

export default function WritingPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-32 pb-16">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <SectionHeader title="WRITING" />
          <p className="text-sm text-[#a0a0a0] max-w-2xl mb-8">
            Technical experiments, build logs, and the parts of the work that changed my mind.
          </p>
          <div className="max-w-3xl">
            {writing.map((post) => <BlogPostCard key={post.slug} post={post} />)}
          </div>
        </div>
      </main>
    </>
  );
}

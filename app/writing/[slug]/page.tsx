import { posts } from '@/content/writing/posts.json';
import Navigation from '@/components/layout/Navigation';
import Container from '@/components/ui/Container';
import { notFound } from 'next/navigation';
import Link from 'next/link';

// Generate static params for all blog posts
export function generateStaticParams() {
  return (posts as any[]).map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = (posts as any[]).find(p => p.slug === params.slug);
  
  if (!post) {
    notFound();
  }
  
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-32 pb-16">
        <Container>
          <div className="max-w-3xl mx-auto">
            <Link 
              href="/writing"
              className="text-sm text-[#a0a0a0] hover:text-white transition-colors mb-8 inline-block"
            >
              ← Back to writing
            </Link>
            <article className="border-terminal p-8">
              <h1 className="text-3xl font-medium mb-4">{post.title}</h1>
              <p className="text-sm text-[#a0a0a0] mb-8">
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
              <div className="prose prose-invert max-w-none">
                <p className="text-[#a0a0a0] leading-relaxed">
                  {post.excerpt}
                </p>
                {/* In the future, you can add MDX content here */}
              </div>
            </article>
          </div>
        </Container>
      </main>
    </>
  );
}

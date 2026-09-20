import { posts } from '@/content/writing/posts.json';
import Navigation from '@/components/layout/Navigation';
import Container from '@/components/ui/Container';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import CtfLiteWriteup from '@/components/writing/CtfLiteWriteup';
import ReverseLlmWriteup from '@/components/writing/ReverseLlmWriteup';
import OneLayerDeeperWriteup from '@/components/writing/OneLayerDeeperWriteup';
import OneLayerPriorsWriteup from '@/components/writing/OneLayerPriorsWriteup';
import RustEagle3Writeup from '@/components/writing/RustEagle3Writeup';
import GitHubIcon from '@/components/ui/GitHubIcon';
import type { BlogPost } from '@/types';

// slug → hosted writeup component. Add a line here to host a new writeup.
const WRITEUPS: Record<string, React.ComponentType> = {
  'ctf-lite-training-environment': CtfLiteWriteup,
  'reverse-llm': ReverseLlmWriteup,
  'one-layer-deeper': OneLayerDeeperWriteup,
  'one-layer-priors': OneLayerPriorsWriteup,
  'rust-eagle3': RustEagle3Writeup,
};

// Any slug not produced by generateStaticParams 404s instead of rendering an empty shell.
export const dynamicParams = false;

// Only hosted writeups (no external `url`) get an internal page; external reading links route out.
export function generateStaticParams() {
  return (posts as any[])
    .filter((post) => !post.url)
    .map((post) => ({
      slug: post.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug !== 'rust-eagle3') return {};
  const post = posts.find(p => p.slug === slug)!;
  return {
    title: `${post.title} | Rohan Sehgal`,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: 'article', url: 'https://www.rohansehgal.me/writing/rust-eagle3' },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = (posts as BlogPost[]).find(p => p.slug === slug);

  if (!post) {
    notFound();
  }
  
  return (
    <>
      <Navigation stackOnMobile={post.slug === 'rust-eagle3'} />
      <main className="min-h-screen pt-32 pb-16">
        <Container>
          <div className="max-w-3xl mx-auto">
            <Link 
              href="/writing"
              className="text-sm text-[#a0a0a0] hover:text-white transition-colors mb-8 inline-block"
            >
              ← Back to writing
            </Link>
            <article className={post.slug === 'rust-eagle3' ? "border-terminal p-5 sm:p-8" : "border-terminal p-8"}>
              <div className="flex items-start justify-between gap-5 mb-4">
                <h1 className="text-3xl font-medium">{post.title}</h1>
                {post.github && (
                  <a
                    href={post.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${post.title} GitHub repository`}
                    title="Open GitHub repository"
                    className="shrink-0 text-[#777] hover:text-white transition-colors p-1"
                  >
                    <GitHubIcon className="w-6 h-6" />
                  </a>
                )}
              </div>
              <p className="text-sm text-[#a0a0a0] mb-8">
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                  timeZone: post.slug === 'rust-eagle3' ? 'UTC' : undefined,
                })}
              </p>
              <div className="max-w-none">
                {(() => {
                  const Body = WRITEUPS[post.slug];
                  return Body ? (
                    <Body />
                  ) : (
                    <p className="text-[#a0a0a0] leading-relaxed">{post.excerpt}</p>
                  );
                })()}
              </div>
            </article>
          </div>
        </Container>
      </main>
    </>
  );
}

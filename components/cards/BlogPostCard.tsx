import type { BlogPost } from '@/types';
import Link from 'next/link';
import GitHubIcon from '@/components/ui/GitHubIcon';

interface BlogPostCardProps {
  post: BlogPost;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  const href = post.url || `/writing/${post.slug}`;
  const content = (
    <>
      <h3 className="text-base font-medium mb-1">{post.title}</h3>
      {post.excerpt && <p className="text-sm text-[#a0a0a0] mb-2">{post.excerpt}</p>}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {post.tags.map((tag) => (
            <span key={tag} className="text-xs text-[#a0a0a0] border-terminal px-2 py-1">
              {tag}
            </span>
          ))}
        </div>
      )}
    </>
  );

  return (
    <div className="border-terminal p-4 hover:border-[rgba(255,255,255,0.2)] transition-colors mb-4">
      <div className="flex items-start gap-4">
        {post.url ? (
          <a className="block min-w-0 flex-1" href={href} target="_blank" rel="noopener noreferrer">
            {content}
          </a>
        ) : (
          <Link className="block min-w-0 flex-1" href={href}>
            {content}
          </Link>
        )}

        {post.github && (
          <a
            href={post.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${post.title} GitHub repository`}
            title="Open GitHub repository"
            className="shrink-0 text-[#777] hover:text-white transition-colors p-1 -mt-1"
          >
            <GitHubIcon />
          </a>
        )}
      </div>
    </div>
  );
}

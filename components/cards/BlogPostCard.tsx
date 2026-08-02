import { BlogPost } from '@/types';
import Link from 'next/link';

interface BlogPostCardProps {
  post: BlogPost;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  const href = post.url || `/writing/${post.slug}`;
  const isExternal = !!post.url;
  
  const cardContent = (
    <div className="border-terminal p-4 hover:border-[rgba(255,255,255,0.2)] transition-colors mb-4">
      <div>
        <h3 className="text-base font-medium mb-1">{post.title}</h3>
        {post.excerpt && (
          <p className="text-sm text-[#a0a0a0] mb-2">{post.excerpt}</p>
        )}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs text-[#a0a0a0] border-terminal px-2 py-1">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {cardContent}
      </a>
    );
  }

  return (
    <Link href={href}>
      {cardContent}
    </Link>
  );
}

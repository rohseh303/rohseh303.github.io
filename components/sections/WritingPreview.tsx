import { posts } from '@/content/writing/posts.json';
import BorderBox from '@/components/ui/BorderBox';
import Link from 'next/link';
import { BlogPost } from '@/types';

export default function WritingPreview() {
  const recentPosts = (posts as BlogPost[]).slice(0, 3);
  
  return (
    <BorderBox>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xs uppercase tracking-wider">WRITING</h2>
        <Link href="/writing" className="text-xs text-[#a0a0a0] hover:text-white transition-colors">
          View All →
        </Link>
      </div>
      
      <div className="space-y-4">
        {recentPosts.length > 0 ? (
          recentPosts.map((post) => (
            <Link 
              key={post.slug} 
              href={`/writing/${post.slug}`}
              className="block group"
            >
              <h3 className="text-sm font-medium mb-1 group-hover:text-white transition-colors">
                {post.title}
              </h3>
              {post.excerpt && (
                <p className="text-xs text-[#a0a0a0]">{post.excerpt}</p>
              )}
            </Link>
          ))
        ) : (
          <p className="text-sm text-[#a0a0a0]">No posts yet. Check back soon!</p>
        )}
      </div>
    </BorderBox>
  );
}

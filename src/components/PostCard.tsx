import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

interface PostCardProps {
  post: {
    id: string; title: string; slug: string; excerpt: string | null;
    tags: string[]; createdAt: Date;
    author: { name: string; image: string | null };
    _count: { comments: number; bookmarks: number };
  };
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold text-sm">
            {post.author.name.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
            <p className="text-xs text-gray-500">{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</p>
          </div>
        </div>
        <Link href={'/posts/' + post.slug}>
          <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-indigo-600 transition-colors">{post.title}</h2>
        </Link>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (<span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">#{tag}</span>))}
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>{post._count.comments} comments</span>
          <span>{post._count.bookmarks} bookmarks</span>
        </div>
      </div>
    </article>
  );
}

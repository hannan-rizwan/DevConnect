import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

interface PostCardProps {
  post: { id: string; title: string; slug: string; excerpt: string | null; tags: string[]; createdAt: Date; author: { name: string; image: string | null }; _count: { likes: number; comments: number } };
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="card hover:shadow-md transition-shadow block">
      <div className="flex flex-wrap gap-2 mb-3">
        {post.tags.slice(0, 3).map(tag => (
          <span key={tag} className="text-xs bg-primary-50 text-primary-600 px-2 py-1 rounded-full">#{tag}</span>
        ))}
      </div>
      <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <span>{post.author.name}</span>
          <span>·</span>
          <span>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</span>
        </div>
        <span>{post._count.likes} ❤️ {post._count.comments} 💬</span>
      </div>
    </Link>
  );
}

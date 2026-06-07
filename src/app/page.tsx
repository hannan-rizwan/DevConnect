import { prisma } from '@/lib/prisma';
import { PostCard } from '@/components/PostCard';

export default async function Home() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: { select: { name: true, image: true } },
      _count: { select: { comments: true, bookmarks: true } }
    },
    orderBy: { createdAt: 'desc' },
    take: 20
  });

  return (
    <div>
      <section className="text-center py-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Where developers share & grow</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Share your projects, write technical articles, and connect with a community of developers.
        </p>
      </section>
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (<PostCard key={post.id} post={post} />))}
      </section>
    </div>
  );
}

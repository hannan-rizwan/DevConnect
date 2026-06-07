import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function Home() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: { author: { select: { name: true, image: true } }, _count: { select: { comments: true, likes: true } } },
    orderBy: { createdAt: "desc" },
    take: 10
  });

  return (
    <div>
      <section className="text-center py-16">
        <h1 className="text-5xl font-bold mb-4">DevConnect</h1>
        <p className="text-xl text-gray-600 mb-8">Where developers share, learn, and connect</p>
        <div className="flex gap-4 justify-center">
          <Link href="/explore" className="btn-primary">Explore</Link>
          <Link href="/register" className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50">Join Now</Link>
        </div>
      </section>
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map(post => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="card hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{post.author.name}</span>
              <span>{post._count.likes} likes · {post._count.comments} comments</span>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}

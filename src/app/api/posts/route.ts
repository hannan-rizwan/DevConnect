import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');
  const tag = searchParams.get('tag');
  const where: any = { published: true };
  if (tag) where.tags = { has: tag };

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where, include: { author: { select: { id: true, name: true, image: true } }, _count: { select: { comments: true, bookmarks: true } } },
      orderBy: { createdAt: 'desc' }, skip: (page - 1) * limit, take: limit,
    }),
    prisma.post.count({ where })
  ]);
  return NextResponse.json({ posts, total, pages: Math.ceil(total / limit) });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  const body = await req.json();
  const slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const post = await prisma.post.create({
    data: { title: body.title, slug: slug + '-' + Date.now(), content: body.content, excerpt: body.content.substring(0, 200), tags: body.tags || [], coverImage: body.coverImage, published: body.published ?? false, authorId: user.id }
  });
  return NextResponse.json(post, { status: 201 });
}

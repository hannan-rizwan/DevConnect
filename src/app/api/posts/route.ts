import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  const posts = await prisma.post.findMany({
    where: { published: true },
    include: { author: { select: { id: true, name: true, image: true } }, _count: { select: { comments: true, likes: true } } },
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * limit,
    take: limit
  });

  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const post = await prisma.post.create({
    data: { title: body.title, slug, content: body.content, excerpt: body.excerpt, tags: body.tags || [], published: body.published || false, authorId: (session.user as any).id }
  });

  return NextResponse.json(post, { status: 201 });
}

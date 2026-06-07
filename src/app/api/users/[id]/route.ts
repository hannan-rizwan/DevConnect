import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
    select: {
      id: true, name: true, email: true, image: true, bio: true, skills: true,
      github: true, website: true, location: true,
      posts: { where: { published: true }, orderBy: { createdAt: "desc" }, take: 5 },
      projects: { orderBy: { createdAt: "desc" }, take: 5 },
      _count: { select: { followers: true, following: true, posts: true } }
    }
  });

  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(user);
}

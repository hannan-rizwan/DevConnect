import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const projects = await prisma.project.findMany({
    include: { author: { select: { id: true, name: true, image: true } } },
    orderBy: { createdAt: "desc" },
    take: 20
  });
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const project = await prisma.project.create({
    data: { title: body.title, description: body.description, techStack: body.techStack || [], repoUrl: body.repoUrl, liveUrl: body.liveUrl, authorId: (session.user as any).id }
  });

  return NextResponse.json(project, { status: 201 });
}

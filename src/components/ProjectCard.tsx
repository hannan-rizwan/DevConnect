import Link from "next/link";

interface ProjectCardProps {
  project: { id: string; title: string; description: string; techStack: string[]; repoUrl: string | null; liveUrl: string | null; author: { name: string } };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
      <p className="text-gray-600 text-sm mb-4">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.techStack.map(tech => (
          <span key={tech} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">{tech}</span>
        ))}
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">by {project.author.name}</span>
        <div className="flex gap-3">
          {project.repoUrl && <a href={project.repoUrl} target="_blank" className="text-primary-600 hover:underline">Code</a>}
          {project.liveUrl && <a href={project.liveUrl} target="_blank" className="text-accent-600 hover:underline">Demo</a>}
        </div>
      </div>
    </div>
  );
}

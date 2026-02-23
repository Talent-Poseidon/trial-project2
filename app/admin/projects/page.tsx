import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ProjectList } from "@/components/admin/project-list";
import { prisma } from "@/lib/prisma";
import NewProjectForm from "@/components/admin/new-project-form";

export default async function ProjectPage() {
  const session = await auth();

  if (!session?.user) redirect("/auth/login");

  // Double check role from DB to be safe
  const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
  });

  if (!user || user.role !== "admin") redirect("/dashboard");

  // Fetch all projects
  const projects = await prisma.project.findMany({
      orderBy: { id: 'desc' },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Project Management</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          View and manage projects. You can also set up new projects.
        </p>
      </div>
      <NewProjectForm />
      <ProjectList projects={projects} />
    </div>
  );
}

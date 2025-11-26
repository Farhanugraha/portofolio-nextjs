import ProjectsClientUI from "./ProjectsClientUI";
import ProjectsNotFound from "./ProjectsNotFound";
import projects from "@/data/projects";
import { redirect } from "next/navigation";

export default async function ProjectsPage(props: {
  searchParams?: Promise<{
    page?: string;
    sort?: string;
    tech?: string | string[];
  }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;
  const { sort, tech } = searchParams || {};
  const PROJECTS_PER_PAGE = 6;

  const allowedSorts = ["newest", "oldest"];
  let sortOrder: "newest" | "oldest" = "newest";
  let sortIsValid: boolean;

  if (sort && allowedSorts.includes(sort as string)) {
    sortOrder = sort as "newest" | "oldest";
    sortIsValid = true;
  } else {
    sortOrder = "newest";
    sortIsValid = false;
  }

  if (sort && !sortIsValid) {
    const params = new URLSearchParams();
    if (searchParams?.page) params.set("page", String(currentPage));

    if (tech) {
      if (Array.isArray(tech)) params.set("tech", tech.join(","));
      else params.set("tech", tech);
    }

    params.set("sort", sortOrder);
    redirect(`/projects${params.toString() ? "?" + params.toString() : ""}`);
  }

  let selectedTechStack: string[] = [];
  if (tech) {
    if (Array.isArray(tech)) {
      selectedTechStack = tech.flatMap((t) => t.split(","));
    } else {
      selectedTechStack = tech.split(",");
    }
  }

  const techStackCounts: Record<string, number> = {};
  projects.forEach((p) => {
    (p.techStack || []).forEach((t) => {
      techStackCounts[t] = (techStackCounts[t] || 0) + 1;
    });
  });

  const uniqueTechStack = Object.entries(techStackCounts)
    .map(([tech, count]) => ({ tech, count }))
    .sort((a, b) => a.tech.localeCompare(b.tech));

  const filteredProjects = projects
    .filter(
      (p) =>
        selectedTechStack.length === 0 ||
        (p.techStack && selectedTechStack.some((t) => p.techStack!.includes(t)))
    )
    .sort((a, b) => {
      if (sortOrder === "newest") {
        return (
          new Date(b.endDate || "").getTime() -
          new Date(a.endDate || "").getTime()
        );
      }
      return (
        new Date(a.startDate || "").getTime() -
        new Date(b.startDate || "").getTime()
      );
    });

  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);

  if (currentPage < 1 || (totalPages > 0 && currentPage > totalPages)) {
    return <ProjectsNotFound />;
  }

  const start = (currentPage - 1) * PROJECTS_PER_PAGE;
  const paginatedProjects = filteredProjects.slice(
    start,
    start + PROJECTS_PER_PAGE
  );

  return (
    <ProjectsClientUI
      uniqueTechStack={uniqueTechStack}
      selectedTechStack={selectedTechStack}
      sortOrder={sortOrder}
      filteredProjects={filteredProjects}
      paginatedProjects={paginatedProjects}
      currentPage={currentPage}
      totalPages={totalPages}
      baseUrl="/projects"
    />
  );
}

import WorkClientUI from "./WorkClientUI";
import WorkNotFound from "./WorkNotFound";
import work from "@/data/work";
import { redirect } from "next/navigation";

export default async function WorkPage(props: {
  searchParams?: Promise<{
    page?: string;
    sort?: string;
    company?: string | string[];
  }>;
}) {
  const searchParams = await props.searchParams;

  const currentPage = Number(searchParams?.page) || 1;
  const { sort, company } = searchParams || {};
  const WORK_PER_PAGE = 6;

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
    if (company) {
      if (Array.isArray(company)) {
        params.set("company", company.join(","));
      } else {
        params.set("company", company);
      }
    }
    params.set("sort", sortOrder);
    redirect(`/experience${params.toString() ? "?" + params.toString() : ""}`);
  }

  let selectedCompanies: string[] = [];
  if (company) {
    if (Array.isArray(company)) {
      selectedCompanies = company.flatMap((c) => c.split(","));
    } else {
      selectedCompanies = company.split(",");
    }
  }

  const companyCounts: Record<string, number> = {};
  work.forEach((item) => {
    companyCounts[item.company] = (companyCounts[item.company] || 0) + 1;
  });

  const uniqueCompanies = Object.entries(companyCounts)
    .map(([company, count]) => ({ company, count }))
    .sort((a, b) => a.company.localeCompare(b.company));

  const filteredWorkItems = work
    .filter(
      (item) =>
        selectedCompanies.length === 0 ||
        (item.company && selectedCompanies.some((c) => item.company === c))
    )
    .sort((a, b) => {
      if (sortOrder === "newest") {
        return (
          new Date(b.end || "").getTime() - new Date(a.end || "").getTime()
        );
      } else {
        return (
          new Date(a.start || "").getTime() - new Date(b.start || "").getTime()
        );
      }
    });

  const totalPages = Math.ceil(filteredWorkItems.length / WORK_PER_PAGE);

  if (currentPage < 1 || (totalPages > 0 && currentPage > totalPages)) {
    return <WorkNotFound />;
  }

  const start = (currentPage - 1) * WORK_PER_PAGE;
  const paginatedWorkItems = filteredWorkItems.slice(
    start,
    start + WORK_PER_PAGE
  );

  return (
    <WorkClientUI
      uniqueCompanies={uniqueCompanies}
      selectedCompanies={selectedCompanies}
      sortOrder={sortOrder}
      filteredWorkItems={filteredWorkItems}
      paginatedWorkItems={paginatedWorkItems}
      currentPage={currentPage}
      totalPages={totalPages}
      baseUrl="/experience"
    />
  );
}

import BlogClientUI from "./BlogClientUI";
import BlogNotFound from "./BlogNotFound";
import posts from "../../data/blog";
import { redirect } from "next/navigation";

export default async function BlogPage(props: {
  searchParams?: Promise<{
    page?: string;
    sort?: string;
    tags?: string | string[];
  }>;
}) {
  const searchParams = await props.searchParams;

  const currentPage = Number(searchParams?.page) || 1;
  const { sort, tags } = searchParams || {};
  const POSTS_PER_PAGE = 5;

  const allowedSorts = ["asc", "desc"];
  let sortOrder: "asc" | "desc" = "desc";
  let sortIsValid: boolean;
  if (sort && allowedSorts.includes(sort as string)) {
    sortOrder = sort as "asc" | "desc";
    sortIsValid = true;
  } else {
    sortOrder = "desc";
    sortIsValid = false;
  }

  if (sort && !sortIsValid) {
    const params = new URLSearchParams();
    if (searchParams?.page) params.set("page", String(currentPage));
    if (tags) {
      if (Array.isArray(tags)) {
        params.set("tags", tags.join(","));
      } else {
        params.set("tags", tags);
      }
    }
    params.set("sort", sortOrder);
    redirect(`/blog${params.toString() ? "?" + params.toString() : ""}`);
  }

  let selectedTags: string[] = [];
  if (tags) {
    if (Array.isArray(tags)) {
      selectedTags = tags.flatMap((tag) => tag.split(","));
    } else {
      selectedTags = tags.split(",");
    }
  }

  const tagCounts: Record<string, number> = {};
  posts.forEach((post) => {
    (post.tags || []).forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  const uniqueTags = Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => a.tag.localeCompare(b.tag));

  const filteredPosts = posts
    .filter(
      (post) =>
        selectedTags.length === 0 ||
        (post.tags &&
          selectedTags.some((tag) => post.tags && post.tags.includes(tag)))
    )
    .sort((a, b) => {
      const dateA = new Date(a.date || "").getTime();
      const dateB = new Date(b.date || "").getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  if (currentPage < 1 || (totalPages > 0 && currentPage > totalPages)) {
    return <BlogNotFound />;
  }

  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(start, start + POSTS_PER_PAGE);

  return (
    <BlogClientUI
      uniqueTags={uniqueTags}
      selectedTags={selectedTags}
      sortOrder={sortOrder}
      filteredPosts={filteredPosts}
      paginatedPosts={paginatedPosts}
      currentPage={currentPage}
      totalPages={totalPages}
      baseUrl="/blog"
    />
  );
}

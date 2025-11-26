"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import blog from "@/data/blog";
import work from "@/data/work";
import projects from "@/data/projects";
import path from "path";

export default function Breadcrumbs() {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);

  const allowedRoots = ["blog", "projects", "experience"];
  const isAllowed = segments.length > 0 && allowedRoots.includes(segments[0]);

  let showBreadcrumbs = false;
  if (isAllowed) {
    if (segments.length === 1) {
      showBreadcrumbs = true;
    } else if (segments.length === 2) {
      const validSlugs: Record<string, string[]> = {
        blog: blog.map((item) => item.slug),
        projects: projects.map((item) => item.slug),
        experience: work.map((item) => item.slug),
      };
      showBreadcrumbs = validSlugs[segments[0]]?.includes(segments[1]) ?? false;
    }
  }

  return (
    <div className="flex items-center gap-1 text-lg text-black dark:text-white my-auto">
      <Link href="/" className="hover:text-blue-400 font-semibold">
        <span className="block md:hidden">FN</span>

        <span className="hidden md:inline">Farhan Nugraha</span>
      </Link>

      <span className="flex md:hidden items-center gap-1">
        {showBreadcrumbs &&
          segments.map((segment, i) => {
            const href = "/" + segments.slice(0, i + 1).join("/");
            const label = segment
              .replace(/[-_]/g, " ")
              .replace(/\b\w/g, (l) => l.toUpperCase());
            return (
              <span key={href} className="flex items-center gap-1">
                <span className="text-gray-500">|</span>
                <Link
                  href={href}
                  className="text-black dark:text-white hover:text-blue-400 transition-colors"
                >
                  {label}
                </Link>
              </span>
            );
          })}
      </span>
    </div>
  );
}

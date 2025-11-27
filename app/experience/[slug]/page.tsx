import { notFound } from "next/navigation";
import path from "path";
import fs from "fs";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import work from "../../../data/work";
import AnimatedArticle from "../../../components/AnimatedArticle";
import StackIcon from "tech-stack-icons";
import { techStackMap } from "../../../lib/constants";
import { Timeline, TimelineItem } from "../../../components/mdx/Timeline";
import { pageParams } from "../../../lib/type";
import BackToPageButton from "../../../components/BackToPageButton";
import remark_gfm from "remark-gfm";

export async function generateStaticParams() {
  return work.map((item) => ({
    slug: item.slug,
  }));
}

export default async function WorkItemPage(props: { params: pageParams }) {
  const { slug } = await props.params;
  const post = work.find((w) => w.slug === slug);

  if (!post) return notFound();

  const filePath = path.join(process.cwd(), "data", "work", `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return notFound();

  const mdxSource = fs.readFileSync(filePath, "utf-8");

  const { content, frontmatter } = await compileMDX<{
    name: string;
    description: string;
    techStack: string[];
  }>({
    source: mdxSource,
    components: {
      Timeline,
      TimelineItem,
    },
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remark_gfm],
        rehypePlugins: [rehypeHighlight],
      },
    },
  });

  return (
    <AnimatedArticle>
      <BackToPageButton pageUrl="/experience" />

      <h1 className="text-4xl font-bold mb-2">{frontmatter.name}</h1>
      <p className="text-lg text-gray-600 mb-6">{frontmatter.description}</p>

      <h2 className="text-xl font-semibold mb-6">Tech Stack</h2>
      <div className="flex flex-wrap gap-4 mb-8">
        {frontmatter.techStack?.map((tech) => {
          const iconName = techStackMap[tech];

          return (
            <div
              key={tech}
              className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full"
            >
              {iconName ? (
                <StackIcon
                  name={iconName}
                  style={{ width: "24px", height: "24px" }}
                />
              ) : (
                <div className="w-6 h-6 flex items-center justify-center text-xs font-medium bg-gray-300 dark:bg-gray-700 rounded">
                  {tech[0]} {/* fallback huruf pertama */}
                </div>
              )}
              <span>{tech}</span>
            </div>
          );
        })}
      </div>

      <div className="max-w-5xl prose dark:prose-invert">{content}</div>
    </AnimatedArticle>
  );
}

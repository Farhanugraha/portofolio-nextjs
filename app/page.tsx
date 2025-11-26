"use client";

import ViewAllHeader from "@/components/ViewAllHeader";
import { motion } from "framer-motion";
import work from "@/data/work";
import WorkItem from "@/components/WorkItem";
import ProjectTile from "@/components/ProjectTile";
import BlogPost from "@/components/BlogPost";
import blog from "@/data/blog";
import StackIcon from "tech-stack-icons";
import Image from "next/image";
import {
  FaMapMarkerAlt,
  FaLanguage,
  FaUniversity,
  FaTools,
  FaMobileAlt,
  FaDatabase,
} from "react-icons/fa";
import projects from "@/data/projects";

export default function Home() {
  const getTimeSafe = (dateStr: string | undefined) => {
    const date = new Date(dateStr ?? "");
    return isNaN(date.getTime()) ? 0 : date.getTime();
  };

  return (
    <section className="px-4 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="text-center mt-2"
      >
        <div className="flex justify-center mb-4">
          <div className="relative w-40 h-40 rounded-full overflow-hidden shadow-lg border-4 border-white dark:border-gray-700">
            <Image
              src="/photo/profilepicts.jpg"
              alt="Farhan Nugraha"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Hi, I&apos;m Farhan Nugraha 👋
        </h1>

        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto text-left mb-6 leading-relaxed">
          I am a Computer Science graduate with hands-on experience in mobile
          application development, full-stack web development, and data
          engineering fundamentals. I specialize in building scalable,
          maintainable, and user-centric applications by leveraging modern
          frameworks, clean architecture principles, and robust database design.
        </p>

        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto text-left  leading-relaxed">
          Beyond software development, I continuously explore emerging tools and
          technologies, optimize workflows, and adopt best practices to enhance
          productivity. I am committed to continuous professional and technical
          growth, consistently refining my skills to deliver high-quality
          solutions.
        </p>

        <div className="mt-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Quick &amp; Fun Facts</h2>

          <div className="flex flex-wrap justify-center gap-3 px-4 max-w-4xl mx-auto">
            {[
              {
                icon: FaUniversity,
                label: "Informatics Graduate @ Universitas Sriwijaya",
              },
              { icon: FaMapMarkerAlt, label: "Indonesia" },
              { icon: FaLanguage, label: "Indonesian & English" },
              { icon: FaTools, label: "Full-Stack Developer" },
              { icon: FaMobileAlt, label: "Mobile Developer" },
              { icon: FaDatabase, label: "Data Engineering Enthusiast" },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 
                             text-sm text-gray-700 dark:text-gray-300 rounded-full shadow-md transition"
                >
                  <Icon className="text-blue-500 dark:text-blue-400 text-base" />
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="mt-16"
      >
        <div className="mt-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Skills & Expertise</h2>

          <div className="flex flex-wrap justify-center gap-6 px-4 max-w-4xl mx-auto">
            {[
              "java",
              "kotlin",
              "php",
              "go",
              "python",
              "js",
              "html5",
              "css3",
              "react",
              "nextjs",
              "spring",
              "laravel",
              "docker",
              "tailwindcss",
              "mysql",
              "postgresql",
              "android",
              "git",
              "figma",
            ].map((iconName, index) => (
              <StackIcon
                key={index}
                name={iconName}
                className="text-blue-500 dark:text-blue-400 w-12 h-12 transition hover:scale-110"
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Experience */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="mt-16"
      >
        <ViewAllHeader
          title="Experience"
          pageUrl="/experience"
          itemCount={work.length}
        />
        <div className="grid gap-4">
          {work.slice(0, 3).map((job, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <WorkItem {...job} />
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="mt-16"
      >
        <ViewAllHeader
          title="Recent Projects"
          pageUrl="/projects"
          itemCount={projects.length}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {projects.slice(0, 4).map((proj) => (
            <motion.div
              key={proj.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <ProjectTile key={proj.slug} {...proj} />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Blog Post */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="mt-16 mb-12"
      >
        <ViewAllHeader
          title="Recent Blog Posts"
          pageUrl="/blog"
          itemCount={blog.length}
        />
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {blog
            .slice()
            .sort((a, b) => getTimeSafe(b.date) - getTimeSafe(a.date))
            .slice(0, 3)
            .map((post) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              >
                <BlogPost {...post} />
              </motion.div>
            ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="mt-20"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Contact Me</h2>

        <form
          action="/api/contact"
          method="POST"
          className="max-w-xl mx-auto bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow-lg space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="w-full p-3 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="w-full p-3 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            required
            rows={5}
            className="w-full p-3 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Send Message
          </button>
        </form>
      </motion.div>
    </section>
  );
}

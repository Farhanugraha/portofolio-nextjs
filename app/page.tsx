"use client";

import ViewAllHeader from "@/components/ViewAllHeader";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  FaMapMarkerAlt,
  FaLanguage,
  FaUniversity,
  FaTools,
  FaMobileAlt,
  FaDatabase,
} from "react-icons/fa";

export default function Home() {
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

        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto text-left mb-6">
          I&apos;m an Informatics Engineering graduate with experience across
          mobile development, full-stack web development, and foundational data
          engineering workflows. I enjoy turning ideas into functional,
          user-focused applications by combining clean architecture with modern
          frameworks and solid database design.
        </p>

        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto text-left">
          Outside of building software, I like exploring new tools,
          experimenting with different approaches, and learning things that help
          me work more efficiently. Continuous growth—both technically and
          personally—is something I value deeply, and I try to improve a little
          every day.
        </p>

        <div className="mt-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Quick &amp; Fun Facts</h2>

          <div className="flex flex-wrap justify-center gap-3 px-4 max-w-4xl mx-auto">
            {[
              {
                icon: FaUniversity,
                label: "Informatics Graduate @ Universitas Sriwijaya",
              },
              { icon: FaMapMarkerAlt, label: "Palembang, Indonesia" },
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
        transition={{ duration: 1, delay: 0.2 }}
        viewport={{ once: true }}
        className="text-center mt-10 mb-6"
      >
        <p className="text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Farhan Nugraha. All rights reserved.
        </p>
      </motion.div>
    </section>
  );
}

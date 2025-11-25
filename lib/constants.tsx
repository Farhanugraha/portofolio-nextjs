import packageJson from "../package.json";

export const navItems = [
  { name: "Home", path: "/" },
  { name: "Work", path: "/work" },
  { name: "Projects", path: "/projects" },
  { name: "Blog", path: "/blog" },
];

export const techStackMap: Record<string, string> = {
  React: "react",
  TypeScript: "typescript",
  TailwindCSS: "tailwindcss",
  "Node.js": "nodejs",
  NextJS: "nextjs",
  aws: "aws",
  MongoDB: "mongodb",
  PostgreSQL: "postgresql",
  Python: "python",
  Flask: "flask",
  Solidity: "solidity",
  "C#": "csharp",
  Firebase: "firebase",
  "AWS IoT": "aws",
  AWS: "aws",
  "C++": "c++",
  Azure: "azure",
  Redis: "redis",
  GraphQL: "graphql",
  Docker: "docker",
  Java: "java",
  MySQL: "mysql",
  Spring: "spring",
  "Spring Boot": "spring",
  Git: "git",
  GitLab: "gitlab",
};

export const appVersion = packageJson.version;

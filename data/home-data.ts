

// Services Section
export const servicesData = {
  services: [
    {
      id: "01",
      title: "Web Development",
      description:
        "Building fast, responsive, and SEO-friendly web applications using React, Next.js, and modern technologies.",
      features: ["Custom Web Apps", "E-commerce", "CMS Integration", "API Development"],
    },
    {
      id: "02",
      title: "Mobile Development",
      description:
        "Cross-platform mobile apps with React Native and Expo that feel native on both iOS and Android.",
      features: ["iOS & Android", "React Native", "Push Notifications", "Offline Support"],
    },
    {
      id: "03",
      title: "Full-Stack Architecture",
      description:
        "Designing robust, monolithic-style systems with Next.js, Node.js (Hono), and PostgreSQL.",
      features: ["Monolithic Arch", "Docker", "Database Design", "Hono"],
    },
  ],
};


export const techStackData = {
  technologies: [
    { name: "React", category: "Frontend" },
    { name: "Next.js", category: "Frontend" },
    { name: "React Native", category: "Mobile" },
    { name: "Expo", category: "Mobile" },
    { name: "TypeScript", category: "Language" },
    { name: "Node.js", category: "Backend" },
    { name: "Hono", category: "Backend" },
    { name: "PostgreSQL", category: "Database" },
    // { name: "Docker", category: "Deployment" },
  ],
};


// Featured Projects Section
import { getSelectedProjects } from "./shared-data";

export const homeFeaturedProjects = {
  projects: getSelectedProjects([0,1, 2, 3, 4 ,5]),
};

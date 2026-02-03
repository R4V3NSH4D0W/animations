

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
      title: "UI/UX Design",
      description:
        "Creating intuitive interfaces with a focus on user experience, accessibility, and modern design principles.",
      features: ["Wireframing", "Prototyping", "Design Systems", "User Testing"],
    },
    {
      id: "04",
      title: "Consulting",
      description:
        "Technical consulting to help you choose the right stack, architecture, and approach for your project.",
      features: ["Code Review", "Architecture", "Performance", "Best Practices"],
    },
  ],
};


export const techStackData = {
  technologies: [
    { name: "React", category: "Frontend" },
    { name: "Next.js", category: "Frontend" },
    { name: "TypeScript", category: "Frontend" },
    { name: "React Native", category: "Mobile" },
    { name: "Expo", category: "Mobile" },
    { name: "Node.js", category: "Backend" },
    { name: "Tailwind CSS", category: "Styling" },
    { name: "GSAP", category: "Animation" },
  ],
};


// Featured Projects Section
import { getSelectedProjects } from "./shared-data";

export const homeFeaturedProjects = {
  projects: getSelectedProjects([0,1, 2, 3, 4 ,5]),
};

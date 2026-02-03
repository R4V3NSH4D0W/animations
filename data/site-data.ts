// =====================================================
// PORTFOLIO SITE DATA
// Edit this file to update all text content across the site
// =====================================================

// Personal Information
export const personalInfo = {
  name: "Lenish  Magar",
  title: "Full-Stack Developer",
  tagline: "Hello, World",
  email: "lenishmagar@gmail.com",
  location: "Nepal",
};

// Social Links
export const socialLinks = [
  { name: "Email", href: "mailto:lenishmagar@gmail.com" },
  { name: "GitHub", href: "https://github.com" },
  { name: "LinkedIn", href: "https://linkedin.com" },
  { name: "Resume", href: "/resume.pdf" },
];

// Hero Section
export const heroData = {
  greeting: "(Hello, World)",
  name: "I'm Lenish Magar",
  title: "Full-Stack Developer.",
  techStack: ["React", "Next.js", "TypeScript", "Node.js", "React Native"],
};

// About Section
export const aboutData = {
  tagline: "(About Me)",
  heading: "Crafting Digital",
  headingHighlight: "Experiences",
  description:
    "I'm a Full-Stack Developer passionate about building modern web and mobile applications. With expertise in React, Next.js, and React Native, I transform complex problems into elegant, performant solutions that users love.",
  image:
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2340&auto=format&fit=crop",
  stats: [
    { value: "3+", label: "Years Experience" },
    { value: "20+", label: "Projects Delivered" },
    { value: "15+", label: "Happy Clients" },
    { value: "99%", label: "Satisfaction Rate" },
  ],
};

// Services Section
export const servicesData = {
  tagline: "(What I Do)",
  heading: "Services",
  headingHighlight: "& Expertise",
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

// Tech Stack Section
export const techStackData = {
  tagline: "(Technologies)",
  heading: "Tools & Technologies",
  headingHighlight: "I work with",
  philosophy:
    "I believe in choosing the right tool for the job. Whether it's building a performant web app or a cross-platform mobile experience, I focus on clean architecture and maintainable code.",
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

// Experience Section
export const experienceData = {
  tagline: "(Experience)",
  heading: "Where I've",
  headingHighlight: "Worked",
  experiences: [
    {
      id: 1,
      role: "Full-Stack Developer",
      company: "Your Current Company",
      period: "2023 — Present",
      description:
        "Building scalable web applications with React, Next.js, and Node.js. Leading frontend architecture decisions.",
      technologies: ["Next.js", "TypeScript", "Node.js"],
    },
    {
      id: 2,
      role: "Frontend Developer",
      company: "Previous Company",
      period: "2021 — 2023",
      description:
        "Developed responsive web applications and mobile apps using React and React Native.",
      technologies: ["React", "React Native", "JavaScript"],
    },
    {
      id: 3,
      role: "Junior Developer",
      company: "First Company",
      period: "2020 — 2021",
      description:
        "Started my journey building websites and learning modern web technologies.",
      technologies: ["HTML/CSS", "JavaScript", "React"],
    },
  ],
};

// Featured Projects Section
export const projectsData = {
  tagline: "(Featured Projects)",
  heading: "Selected",
  headingHighlight: "Work",
  projects: [
    {
      id: 1,
      imageURL:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
      title: "E-Commerce Platform",
      description:
        "A modern shopping experience with real-time inventory and seamless checkout.",
      tech: ["Next.js", "TypeScript", "Stripe"],
      year: "2024",
    },
    {
      id: 2,
      imageURL:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=2574&auto=format&fit=crop",
      title: "Mobile Banking App",
      description:
        "Secure and intuitive mobile banking with biometric authentication.",
      tech: ["React Native", "Expo", "Node.js"],
      year: "2024",
    },
    {
      id: 3,
      imageURL:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
      title: "Analytics Dashboard",
      description:
        "Real-time data visualization with interactive charts and insights.",
      tech: ["React", "D3.js", "PostgreSQL"],
      year: "2023",
    },
  ],
};

// Slogan Section
export const sloganData = {
  tagline: "(Ready to collaborate?)",
  defaultSlogan: "Let's Create Something Amazing Together",
  pageSpecificSlogans: {
    "/about": "Passionate Developer & Creative Problem Solver",
    "/works": "Building Digital Products That Make a Difference",
    "/services": "Expert Solutions for Modern Web Development",
  },
  ctaText: "Start a Project",
  ctaLink: "/contact",
};

// Footer
export const footerData = {
  copyrightName: "Lenish Magar",
  navLinks: [
    { name: "About", href: "/about" },
    { name: "Works", href: "/works" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ],
};

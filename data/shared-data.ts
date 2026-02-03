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

// SHARED ENTITIES (The Database)

export const sharedExperiences = [
    {
      from: "Jan 2024",
      to: "Present",
      company: "R4V3N Technologies",
      position: "Frontend Engineer",
      image:
        "https://i.pinimg.com/736x/11/50/10/1150106db13b0cae280f5165a8632b71.jpg",
      details:
        "Developed scalable React applications, mentored junior developers, and implemented CI/CD pipelines.",
      technologies: ["React", "TypeScript", "CI/CD", "Next.js"],
    },
    {
      from: "Jul 2022",
      to: "Dec 2023",
      company: "NextGen Solutions",
      position: "UI/UX Designer",
      image:
        "https://i.pinimg.com/736x/d1/3c/7e/d13c7ef085a3c777ad3dc2949a9aec81.jpg",
      details:
        "Created design systems, conducted user research, and collaborated with development teams.",
      technologies: ["Figma", "Adobe XD", "User Research", "Prototyping"],
    },
    {
      from: "Mar 2021",
      to: "Jun 2022",
      company: "Tech Innovations Pvt Ltd",
      position: "Full Stack Developer",
      image:
        "https://i.pinimg.com/736x/5c/30/6e/5c306e71eea40ad8729d3545bb69b8c4.jpg",
      details:
        "Worked with Node.js, React, and PostgreSQL to deliver full-stack solutions.",
      technologies: ["Node.js", "React", "PostgreSQL", "Express"],
    },
    {
      from: "Jul 2020",
      to: "Feb 2021",
      company: "Creative Labs",
      position: "Intern Developer",
      image:
        "https://i.pinimg.com/736x/ae/1f/15/ae1f15afb031ef0eb771a81eb5c77e28.jpg",
      details:
        "Assisted in web development projects and learned industry best practices.",
      technologies: ["HTML", "CSS", "JavaScript", "React"],
    },
    {
      from: "Jan 2019",
      to: "Jun 2020",
      company: "Startup Hub",
      position: "Junior Frontend Engineer",
      image:
        "https://i.pinimg.com/736x/0f/6c/c8/0f6cc807ab60aa6b0bfad6eb44b0c930.jpg",
      details:
        "Built responsive user interfaces using HTML, CSS, JavaScript, and React.",
      technologies: ["Frontend", "UI Development", "JavaScript"],
    },
];

export const sharedSkills = {
    skillSets: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "MongoDB",
      "GraphQL",
    ],
    software: [
      "Adobe Photoshop",
      "Figma",
      "Visual Studio Code",
      "GitHub",
      "Slack",
      "Jira",
      "Notion",
      "Postman",
      "Docker",
      "Microsoft Excel",
    ],
    languages: ["English", "Hindi", "Nepali", "Spanish"],
  };

export const sharedProjects = [
    {
      id: "luxstore-dashboard",
      src: "/assets/dashboard/dashboard-product.png",
      imageURL: "/assets/dashboard/dashboard-product.png",
      title: "Luxstore Dashboard",
      description:
        "A comprehensive ecommerce dashboard application managing global state and providing administration capabilities.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI", "React Query"],
      year: "2025",
      status: "In Development",
      type: "Personal",
      link: null,
      isFeatured: true,
    },
    {
      id: "luxstore-web",
      src: "/assets/web/web-all-product.png",
      imageURL: "/assets/web/web-all-product.png",
      title: "Luxstore Web Version",
      description:
        "The consumer-facing web storefront offering a premium user experience with smooth scrolling and sophisticated animations.",
      tech: ["Next.js 16", "TypeScript", "GSAP", "Stripe", "Zustand"],
      year: "2025",
      status: "In Development",
      type: "Personal",
      link: null,
      isFeatured: true,
    },
    {
      id: "luxstore-app",
      src: "/assets/app/android.png",
      imageURL: "/assets/app/android.png",
      title: "Luxstore Mobile App",
      description:
        "A cross-platform mobile application delivering a native shopping experience on Android and iOS.",
      tech: ["React Native", "Expo", "TypeScript", "Stripe", "TanStack Query"],
      year: "2025",
      status: "In Development",
      type: "Personal",
      link: null,
      isFeatured: true,
    },
    {
      id: "rural-heritage",
      src: "/assets/web/rural-heritage.png",
      imageURL: "/assets/web/rural-heritage.png",
      title: "Rural Heritage",
      description:
        "A premium digital platform for slow travel in the Himalayas, featuring curated heritage stays and immersive cultural journeys.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI", "React Query"],
      year: "2025",
      link: "https://rural-heritage.com/",
      status: "Live",
      type: "Corporate",
      isFeatured: true,
    },
    {
      id: "traveleir",
      src: "/assets/web/travelier.png",
      imageURL: "/assets/web/travelier.png",
      title: "Traveleir",
      description:
        "A luxury travel booking platform for curated stays and trips in Nepal.",
      tech: ["Next.js", "Tailwind CSS", "Shadcn UI"],
      year: "2024",
      link: "https://staging.traveleir.com/",
      status: "Beta",
      type: "Corporate",
      isFeatured: true,
    },
    {
      id: "zyabaa",
      src: "/assets/web/zyabaa.png",
      imageURL: "/assets/web/zyabaa.png",
      title: "Zyabaa",
      description:
        "A premium fashion and lifestyle e-commerce marketplace with multi-category shopping.",
      tech: ["Next.js", "React", "Tailwind CSS"],
      year: "2024",
      link: "http://frontend.zyabaa.com/",
      status: "Beta",
      type: "Corporate",
      isFeatured: true,
    },
  ];

// Utility to select specific projects by index
export const getSelectedProjects = (indices: number[]) => {
  return indices.map((index) => sharedProjects[index]).filter(Boolean);
};

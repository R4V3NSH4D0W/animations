export const personalInfo = {
  name: "Lenish Yesmali Magar",
  title: "Frontend Engineer",
  tagline: "Designing the Digital Future",
  email: "Lenishmagar@gmail.com",
  location: "Kathmandu, Nepal",
};

// Social Links
export const socialLinks = [
  { name: "Email", href: "mailto:Lenishmagar@gmail.com" },
  { name: "GitHub", href: "https://github.com/R4V3NSH4D0W" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/lenish-yesmali-magar-a8a980282" },
  { name: "Instagram", href: "https://instagram.com/lenishmagar" }, // Placeholder handle based on email
];

// Footer
export const footerData = {
  copyrightName: "Lenish Magar",
  navLinks: [
    { name: "About", href: "/about" },
    { name: "Works", href: "/works" },
    { name: "Expertise", href: "/expertise" },
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
    "/expertise": "Expert Solutions for Modern Web Development",
  },
  ctaText: "Start a Project",
  ctaLink: "/contact",
};

// SHARED ENTITIES (The Database)

export const sharedExperiences = [
    {
      from: "Apr 2025",
      to: "Present",
      company: "Curves 'n Colors",
      position: "Next.js Developer",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop", // Agency vibe
      details:
        "Specializing in building scalable, high-performance web applications using Next.js and React.",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    },
    {
      from: "Dec 2023",
      to: "Apr 2024",
      company: "Machnet Technology",
      position: "React Native Developer",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop", // Fintech vibe
      details:
        "Built and updated mobile apps (Aidemoney, Transfaypay, Equator). Collaborated with design teams and integrated animations for better UX.",
      technologies: ["React Native", "iOS", "Android", "JavaScript", "Animation"],
    },
    {
      from: "Sept 2023",
      to: "Dec 2023",
      company: "Machnet Technology",
      position: "React Native Intern",
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit=crop",
      details:
        "Assisted in development of mobile apps, bug fixing, and code reviews while learning industry best practices.",
      technologies: ["React Native", "JavaScript", "Git"],
    },
];

export const sharedSkills = {
    skillSets: [
      "React",
      "Next.js",
      "React Native",
      "TypeScript",
      "JavaScript",
      "Node.js",
      "Hono",
      "PostgreSQL",
      "Docker",
      "Prisma",
      "Tailwind CSS",
      "Git & Github",
    ],
    software: [
      "VS Code",
      "Figma",
      "Postman",
      "Docker Desktop",
      "Android Studio",
      "Xcode",
    ],
    languages: ["English", "Nepali"],
  };

export const sharedProjects = [
    {
      id: "luxstore-dashboard",
      src: "/assets/dashboard/dashboard-product.png",
      imageURL: "/assets/dashboard/dashboard-product.png",
      title: "Luxstore Dashboard",
      tagline: "The Command Center for Store Operations",
      role: "Lead Full-Stack Engineer",
      client: "Personal Project (Enterprise Scale)",
      description:
        "A comprehensive admin interface featuring CMS, Marketing engines, and Analytics. Built with Next.js 16 and Recharts, it serves as the operational heart of the headless ecosystem.",
      tech: ["Next.js 16", "TypeScript", "Tailwind CSS", "Shadcn UI", "Recharts", "dnd-kit", "Zod"],
      year: "2025",
      status: "In Development",
      type: "Personal",
      link: null,
      repoUrl: "https://github.com/R4V3NSH4D0W/Ecommerce-dashboard",
      isFeatured: true,
      sideImageURLs: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop", // Dashboard Analytics
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop", // Data visualization
        "https://images.unsplash.com/photo-1555421689-d68471e189f2?q=80&w=2670&auto=format&fit=crop", // Code/Interface
      ],
    },
    {
      id: "luxstore-web",
      src: "/assets/web/web-all-product.png",
      imageURL: "/assets/web/web-all-product.png",
      title: "Luxstore Web Version",
      tagline: "High-End Aesthetics meets Headless Commerce",
      role: "Lead Frontend Engineer",
      client: "Personal Project",
      description:
        "The primary customer-facing interface, focusing on 'scrollytelling' and premium UX. Powered by Next.js 16, GSAP, and Lenis for fluid interactions, consuming the centralized Hono API.",
      tech: ["Next.js 16", "TypeScript", "GSAP", "Lenis", "TanStack Query", "Stripe"],
      year: "2025",
      status: "In Development",
      type: "Personal",
      link: null,
      repoUrl: "https://github.com/R4V3NSH4D0W/luxstore-web-version",
      isFeatured: true,
    },
    {
      id: "luxstore-app",
      src: "/assets/app/android.png",
      imageURL: "/assets/app/android.png",
      title: "Luxstore Mobile App",
      tagline: "Native Commerce on the Go",
      role: "Mobile Engineer",
      client: "Personal Project",
      description:
        "A native mobile experience built with Expo and React Native. Features tab-based navigation, haptics, and secure storage, sharing the same consistent data layer as the web store.",
      tech: ["React Native", "Expo Router", "TypeScript", "Secure Store", "TanStack Query"],
      year: "2025",
      status: "In Development",
      type: "Personal",
      link: null,
      repoUrl: "https://github.com/R4V3NSH4D0W/luxstore_app",
      isFeatured: true,
    },
    {
      id: "luxstore-backend",
      src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop",
      imageURL: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop",
      title: "Luxstore Backend",
      tagline: "The Nerve Center of the Ecosystem",
      role: "Backend Architect",
      client: "Personal Project",
      description: "A high-performance Hono REST API managing all business logic. Implements Service-Repository pattern, background workers, and granular RBAC. Integrates Gemini AI and Meilisearch.",
      tech: ["Hono", "TypeScript", "Redis", "Meilisearch", "Zod", "Gemini AI", "Prisma"],
      year: "2025",
      link: null,
      repoUrl: "https://github.com/R4V3NSH4D0W/Hono-server",
      status: "In Development",
      type: "Personal",
      isFeatured: false,
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
    {
      id: "naamii",
      src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
      imageURL: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
      title: "Naamii",
      description: "A corporate research and innovation initiative focused on AI and computing.",
      tech: ["React", "Next.js", "TypeScript"],
      year: "2025",
      link: "http://staging.naamii.org/",
      status: "Live",
      type: "Corporate",
      isFeatured: false,
    },
    {
      id: "kitsune-app",
      src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
      imageURL: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
      title: "Kitsune App",
      description: "A mobile application for streaming anime, serving as a companion to the web platform.",
      tech: ["React Native", "Expo", "TypeScript"],
      year: "2024",
      link: "https://github.com/R4V3NSH4D0W/kitsuneev3",
      status: "In Development",
      type: "Personal",
      isFeatured: false,
    },
    {
      id: "workflow",
      src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
      imageURL: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
      title: "Workflow",
      description: "A project management tool and Jira clone enabling task tracking and team collaboration.",
      tech: ["Next.js", "React", "Tailwind CSS"],
      year: "2024",
      link: "https://github.com/R4V3NSH4D0W/workflow",
      status: "Completed",
      type: "Personal",
      isFeatured: false,
    },
    {
      id: "anistream",
      src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
      imageURL: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
      title: "AniStream",
      description: "A comprehensive anime streaming website platform.",
      tech: ["React", "Node.js", "CSS"],
      year: "2023",
      link: "https://github.com/R4V3NSH4D0W/AniStream",
      status: "Archived",
      type: "Personal",
      isFeatured: false,
    },
    {
      id: "kitsune-backend",
      src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
      imageURL: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
      title: "Kitsune Backend",
      description: "The robust backend server powering the Kitsune anime streaming platform.",
      tech: ["Node.js", "Express", "MongoDB"],
      year: "2024",
      link: "https://github.com/R4V3NSH4D0W/kitsunee-backend",
      status: "Live",
      type: "Personal",
      isFeatured: false,
    },
   
    {
      id: "travel-ideas-ai",
      src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
      imageURL: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
      title: "Travel Ideas AI",
      description: "Final Year Project: A smart travel planner utilizing Gemini Vision for landmark recognition and i18n for multi-language support.",
      tech: ["React", "Gemini AI", "Google Vision", "i18n"],
      year: "2024",
      link: "https://github.com/R4V3NSH4D0W/Travel-Ideas-AI",
      status: "Archived",
      type: "Personal",
      isFeatured: false,
    },
  ];

// Utility to select specific projects by index
export const getSelectedProjects = (indices: number[]) => {
  return indices.map((index) => sharedProjects[index]).filter(Boolean);
};

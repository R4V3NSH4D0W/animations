

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

// Tech Stack Section
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
export const homeFeaturedProjects = {
  projects: [
    {
      id: 1,
      imageURL: "/assets/dashboard/dashboard-product.png",
      title: "Luxstore Dashboard",
      description:
        "A comprehensive ecommerce dashboard application managing global state and providing administration capabilities.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI", "React Query"],
      year: "2025",
      status: "In Development",
      type: "Personal",
    },
    {
      id: 2,
      imageURL: "/assets/web/web-all-product.png",
      title: "Luxstore Web Version",
      description:
        "The consumer-facing web storefront offering a premium user experience with smooth scrolling and sophisticated animations.",
      tech: ["Next.js 16", "TypeScript", "GSAP", "Stripe", "Zustand"],
      year: "2025",
      status: "In Development",
      type: "Personal",
    },
    {
      id: 3,
      imageURL: "/assets/app/android.png",
      title: "Luxstore Mobile App",
      description:
        "A cross-platform mobile application delivering a native shopping experience on Android and iOS.",
      tech: ["React Native", "Expo", "TypeScript", "Stripe", "TanStack Query"],
      year: "2025",
      status: "In Development",
      type: "Personal",
    },
    {
      id: 4,
      imageURL: "/assets/web/rural-heritage.png",
      title: "Rural Heritage",
      description:
        "A premium digital platform for slow travel in the Himalayas, featuring curated heritage stays and immersive cultural journeys.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI", "React Query"],
      year: "2025",
      link: "https://rural-heritage.com/",
      status: "Live",
      type: "Corporate",
    },
    {
      id: 5,
      imageURL: "/assets/web/travelier.png", // Placeholder - swap with Traveleir screenshot
      title: "Traveleir",
      description:
        "A luxury travel booking platform for curated stays and trips in Nepal.",
      tech: ["Next.js", "Tailwind CSS", "Shadcn UI"],
      year: "2024",
      link: "https://staging.traveleir.com/",
      status: "Beta",
      type: "Corporate",
    },
    {
      id: 6,
      imageURL: "/assets/web/zyabba.png", // Placeholder - swap with Zyabaa screenshot
      title: "Zyabaa",
      description:
        "A premium fashion and lifestyle e-commerce marketplace with multi-category shopping.",
      tech: ["Next.js", "React", "Tailwind CSS"],
      year: "2024",
      link: "http://frontend.zyabaa.com/",
      status: "Beta",
      type: "Corporate",
    },
  ],
};

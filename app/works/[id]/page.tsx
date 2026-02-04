"use client";

import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { sharedProjects } from "@/data/shared-data";
import { homeFeaturedProjects } from "@/data/home-data";

// Helper to find project by ID in both lists
const getProjectById = (id: string) => {
  // Check sharedProjects first
  const shared = sharedProjects.find((p) => p.id === id);
  if (shared) return shared;

  // Check homeFeaturedProjects (convert id to string comparison)
  const featured = homeFeaturedProjects.projects.find(
    (p) => String(p.id) === id,
  );
  if (featured) {
    // Adapter to match sharedProjects shape if needed, or just return it
    // homeFeaturedProjects has { id, imageURL, title, description, tech, year, link, status, type }
    // sharedProjects has { id, src, title, description, tech, year, link }
    return {
      ...featured,
      src: featured.imageURL, // Map imageURL to src
    };
  }

  return null;
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProjectPage({ params }: PageProps) {
  // Unwrap params using React.use()
  const { id } = use(params);
  const project = getProjectById(id);

  if (!project) {
    notFound();
  }

  // Find next project for navigation
  const allProjects = [
    ...sharedProjects,
    ...homeFeaturedProjects.projects.map((p) => ({
      ...p,
      src: p.imageURL,
      id: String(p.id), // normalization
    })),
  ].filter(
    (v, i, a) => a.findIndex((t) => t.id === v.id) === i, // distinct by id
  );

  const currentIndex = allProjects.findIndex((p) => p.id === id);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 selection:bg-neutral-900 selection:text-white">
      {/* Hero Section - Immersive Typography */}
      <div className="relative w-full min-h-[85vh] flex flex-col justify-end pb-12 px-6 sm:px-12 md:px-24 pt-32">
        <div className="flex flex-col gap-6 relative z-10">
          <div className="flex flex-wrap gap-6 items-center uppercase tracking-widest text-xs font-bold text-neutral-500">
            <span>
              {(project as any).type ||
                ((project as any).sideImageURLs?.length
                  ? "Case Study"
                  : "Project Overview")}
            </span>
            <span className="w-1.5 h-1.5 bg-neutral-300 rounded-full" />
            <span>{project.year || "2024"}</span>
            <span className="w-1.5 h-1.5 bg-neutral-300 rounded-full" />
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${(project as any).status === "Live" ? "bg-emerald-500" : "bg-amber-500"}`}
              />
              <span>{(project as any).status || "In Development"}</span>
            </div>
          </div>

          <h1 className="text-[12vw] leading-[0.85] font-light tracking-tighter text-neutral-900 -ml-[0.5vw]">
            {project.title.split(" ").map((word, i) => (
              <span key={i} className="block">
                {word}
              </span>
            ))}
          </h1>
        </div>
      </div>

      {/* Main Feature Image */}
      <div className="w-full h-[60vh] sm:h-[80vh] relative overflow-hidden">
        <Image
          src={project.src || ""}
          alt={project.title || "Project Cover"}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="max-w-[1800px] mx-auto px-6 sm:px-12 md:px-24">
        {/* Project Meta & Description Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 py-24 sm:py-32 border-b border-neutral-200">
          {/* Left Column: Description */}
          <div className="lg:col-span-8 flex flex-col gap-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl leading-tight font-serif italic text-neutral-800">
              "{(project as any).tagline || project.description}"
            </h2>
            <div className="text-xl sm:text-2xl leading-relaxed font-light text-neutral-600 space-y-8 max-w-3xl">
              <p>{project.description}</p>
              <p>
                Our approach focused on simplifying the complex. By stripping
                away unnecessary elements, we highlighted the core
                functionality, ensuring that users could navigate the dashboard
                with intuitive ease.
              </p>
            </div>

            {/* Call to Action */}
            {(project.link || (project as any).status === "Live") && (
              <div className="pt-8">
                <a
                  href={project.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-neutral-900 text-white rounded-full text-lg font-medium hover:bg-neutral-800 transition-all hover:scale-105"
                >
                  <span>Visit Live Project</span>
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            )}
          </div>

          {/* Right Column: Metadata */}
          <div className="lg:col-span-4 flex flex-col gap-12 pt-4 lg:pt-0">
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Client
              </h3>
              <p className="text-xl font-medium border-b border-neutral-200 pb-4">
                {(project as any).client || "Personal Project"}
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                My Role
              </h3>
              <p className="text-xl font-medium border-b border-neutral-200 pb-4">
                Full Stack Development & UI/UX Design
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2 pt-2">
                {project.tech?.map((t: string) => (
                  <span
                    key={t}
                    className="px-3 py-1 bg-neutral-100 rounded-md text-sm text-neutral-600"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Visual Gallery - Staggered/Masonry Layout */}
        {(project as any).sideImageURLs?.length > 0 && (
          <div className="py-24 sm:py-32">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12">
              {/* Image 1 - Large Left */}
              {(project as any).sideImageURLs?.[0] && (
                <div className="relative w-full aspect-4/3 md:aspect-3/4 bg-neutral-100 rounded-lg overflow-hidden group">
                  <Image
                    src={(project as any).sideImageURLs[0]}
                    alt="Project View 1"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              )}

              <div className="flex flex-col gap-6 sm:gap-12 md:pt-24 lg:pt-32">
                {/* Image 2 */}
                {(project as any).sideImageURLs?.[1] && (
                  <div className="relative w-full aspect-square bg-neutral-100 rounded-lg overflow-hidden group">
                    <Image
                      src={(project as any).sideImageURLs[1]}
                      alt="Project View 2"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                )}
                {/* Image 3 */}
                {(project as any).sideImageURLs?.[2] && (
                  <div className="relative w-full aspect-4/3 bg-neutral-100 rounded-lg overflow-hidden group">
                    <Image
                      src={(project as any).sideImageURLs[2]}
                      alt="Project View 3"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Next Project Navigation */}
        {nextProject && (
          <div className="py-24 sm:py-40 border-t border-neutral-200">
            <Link
              href={`/works/${nextProject.id}`}
              className="group block w-full text-center"
            >
              <span className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-6 block">
                Next Project
              </span>
              <h2 className="text-6xl sm:text-8xl md:text-[10vw] font-light leading-[0.9] text-neutral-900 origin-left group-hover:-skew-x-6 transition-transform duration-500 ease-out">
                {nextProject.title}
              </h2>
              <div className="inline-flex items-center gap-2 mt-8 text-lg font-medium border-b border-transparent group-hover:border-neutral-900 transition-all">
                <span>View Case Study</span>
                <ArrowUpRight className="w-5 h-5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}

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

  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <div className="fixed top-0 left-0 w-full p-6 z-50 flex justify-between items-center pointer-events-none">
        <Link
          href="/works"
          className="pointer-events-auto bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-gray-200 flex items-center gap-2 text-sm uppercase font-medium hover:bg-black hover:text-white transition-colors group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span>Back to Works</span>
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative h-[60vh] sm:h-[70vh] w-full">
        <Image
          src={project.src || ""}
          alt={project.title || "Project Image"}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-0 left-0 w-full p-6 sm:p-10 md:p-16 text-white">
          <div className="max-w-7xl mx-auto">
            <span className="block text-sm sm:text-base mb-4 uppercase tracking-wider opacity-80">
              {project.year || "2024"} — {(project as any).type || "Project"}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-light leading-tight">
              {project.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-6 py-20 sm:py-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
          {/* Sidebar / Metadata */}
          <div className="md:col-span-1 space-y-10">
            <div>
              <h3 className="text-sm font-bold uppercase text-gray-400 mb-4">
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tech?.map((t: string) => (
                  <span
                    key={t}
                    className="px-3 py-1 border border-gray-200 rounded-full text-xs uppercase"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase text-gray-400 mb-4">
                Role
              </h3>
              <p className="text-lg">Full-Stack Development</p>
            </div>

            {(project.link || (project as any).status === "Live") && (
              <a
                href={project.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full uppercase text-sm font-bold hover:bg-neutral-800 transition-colors"
              >
                <span>Visit Website</span>
                <ArrowUpRight size={16} />
              </a>
            )}
          </div>

          {/* Main Description */}
          <div className="md:col-span-2">
            <h2 className="text-2xl sm:text-3xl font-light leading-relaxed mb-8">
              {project.description}
            </h2>

            {/* Context/Problem/Solution placeholder if data missing */}
            <div className="space-y-8 text-gray-600 leading-relaxed text-lg">
              <p>
                This project represents a deep dive into modern web
                technologies, focusing on performance, scalability, and user
                experience. The goal was to create a seamless interface that
                bridges the gap between complex functionality and intuitive
                design.
              </p>
              <p>
                From database architecture to frontend state management, every
                component was meticulously crafted to ensure reliability and
                speed.
              </p>
            </div>
          </div>
        </div>

        {/* Image Gallery Placeholder */}
        <div className="mt-20 sm:mt-32 space-y-8">
          {/* If sideImageURLs exist (from homeFeaturedProjects), render them */}
          {(project as any).sideImageURLs?.map((img: string, i: number) => (
            <div
              key={i}
              className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden"
            >
              <Image
                src={img}
                alt={`Screenshot ${i}`}
                fill
                className="object-cover"
              />
            </div>
          ))}

          {/* Fallback Grid if no side images */}
          {!(project as any).sideImageURLs && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
              <div className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 uppercase text-xs">
                  Process Shot 1
                </div>
              </div>
              <div className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 uppercase text-xs">
                  Process Shot 2
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

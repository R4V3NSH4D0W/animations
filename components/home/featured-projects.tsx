"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projectsData } from "@/data/site-data";

gsap.registerPlugin(ScrollTrigger);

function FeaturedProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<HTMLElement[]>([]);

  useGSAP(
    () => {
      // Animate header
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play reverse play reverse",
            },
          },
        );
      }

      // Animate each project
      projectRefs.current.forEach((project, index) => {
        if (!project) return;

        // Create timeline for each project - entire block slides as one
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: project,
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          },
        });

        // Entire block (image + content) slides from left or right
        tl.fromTo(
          project,
          {
            opacity: 0,
            x: index % 2 === 0 ? "-40vw" : "40vw",
          },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
          },
        );
      });

      // Parallax effect on images
      projectRefs.current.forEach((project) => {
        if (!project) return;
        const image = project.querySelector(".project-image img");
        if (!image) return;

        gsap.to(image, {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: project,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="py-20 sm:py-24 md:py-32 px-4 sm:px-6 md:px-10 bg-white overflow-hidden"
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div
          ref={headerRef}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-16"
        >
          <div>
            <span className="uppercase text-xs sm:text-sm font-bold text-gray-400 block mb-4">
              {projectsData.tagline}
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-tight">
              {projectsData.heading}
              <br />
              <span className="text-gray-400">
                {projectsData.headingHighlight}
              </span>
            </h2>
          </div>
          <Link
            href="/works"
            className="group flex items-center gap-3 text-sm uppercase hover:gap-4 transition-all"
          >
            <span>View All Projects</span>
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="space-y-24 sm:space-y-32 md:space-y-40">
          {projectsData.projects.map((project, index) => (
            <article
              key={project.id}
              ref={(el) => {
                if (el) projectRefs.current[index] = el;
              }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <div
                className={`project-image relative overflow-hidden group cursor-pointer ${
                  index % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <div className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full overflow-hidden">
                  <Image
                    src={project.imageURL}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-300">
                    <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-xl">
                      <ArrowUpRight size={24} className="text-black" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div
                className={`project-content ${
                  index % 2 === 1 ? "lg:order-1" : ""
                }`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-xs text-gray-400 uppercase">
                    {project.year}
                  </span>
                  <span className="w-8 h-px bg-gray-300" />
                  <span className="text-xs text-gray-400 uppercase">
                    Project {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-4">
                  {project.title}
                </h3>

                <p className="text-gray-500 text-base sm:text-lg mb-6 max-w-md">
                  {project.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="tech-tag px-3 py-1 text-xs uppercase border border-gray-200 rounded-full hover:border-black hover:bg-black hover:text-white transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/works/${project.id}`}
                  className="group inline-flex items-center gap-2 text-sm uppercase hover:gap-3 transition-all"
                >
                  <span>View Case Study</span>
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProjects;

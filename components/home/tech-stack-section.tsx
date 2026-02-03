"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { techStackData } from "@/data/site-data";

gsap.registerPlugin(ScrollTrigger);

export default function TechStackSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);
  const philosophyRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Header animation - split lines
      if (headerRef.current) {
        const tagline = headerRef.current.querySelector(".tagline");
        const title = headerRef.current.querySelector(".title");
        const subtitle = headerRef.current.querySelector(".subtitle");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          },
        });

        tl.fromTo(
          tagline,
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" },
        )
          .fromTo(
            title,
            { opacity: 0, y: 80, skewY: 5 },
            { opacity: 1, y: 0, skewY: 0, duration: 0.8, ease: "power3.out" },
            "-=0.3",
          )
          .fromTo(
            subtitle,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
            "-=0.4",
          );
      }

      // Tech items - cascade animation with rotation
      itemsRef.current.forEach((item, index) => {
        if (!item) return;

        const category = item.querySelector(".category");
        const name = item.querySelector(".tech-name");
        const line = item.querySelector(".line");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        });

        // Item slides in from different directions based on position
        tl.fromTo(
          item,
          {
            opacity: 0,
            x: index % 2 === 0 ? -100 : 100,
            rotateY: index % 2 === 0 ? -15 : 15,
          },
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: index * 0.08,
          },
        )
          .fromTo(
            category,
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
            "-=0.4",
          )
          .fromTo(
            name,
            { opacity: 0, x: -30 },
            { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" },
            "-=0.3",
          )
          .fromTo(
            line,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.6, ease: "power2.out" },
            "-=0.3",
          );
      });

      // Philosophy text - word reveal effect
      if (philosophyRef.current) {
        gsap.fromTo(
          philosophyRef.current,
          {
            opacity: 0,
            y: 60,
            clipPath: "inset(100% 0% 0% 0%)",
          },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: philosophyRef.current,
              start: "top 80%",
              toggleActions: "play reverse play reverse",
            },
          },
        );
      }
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="py-20 sm:py-28 md:py-32 px-4 sm:px-6 md:px-10 bg-white overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-16 sm:mb-20">
          <span className="tagline uppercase text-xs sm:text-sm font-bold text-gray-500 block mb-4">
            (Technologies)
          </span>
          <h2 className="title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-tight overflow-hidden">
            Tools & Technologies
          </h2>
          <span className="subtitle text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-gray-400 block mt-2">
            I work with
          </span>
        </div>

        {/* Tech Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8"
          style={{ perspective: "1000px" }}
        >
          {techStackData.technologies.map((tech, index) => (
            <div
              key={tech.name}
              ref={(el) => {
                if (el) itemsRef.current[index] = el;
              }}
              className="group relative pb-6 cursor-pointer"
              style={{ transformStyle: "preserve-3d" }}
            >
              <span className="category text-xs uppercase text-gray-400 mb-3 block">
                {tech.category}
              </span>
              <span className="tech-name text-xl sm:text-2xl md:text-3xl font-light block mb-4 group-hover:translate-x-3 transition-transform duration-300">
                {tech.name}
              </span>
              <div className="line absolute bottom-0 left-0 right-0 h-px bg-gray-200 origin-left group-hover:bg-black transition-colors duration-300" />
            </div>
          ))}
        </div>

        <div ref={philosophyRef} className="mt-24 sm:mt-32 max-w-3xl">
          <p className="text-lg sm:text-xl md:text-2xl font-light text-gray-600 leading-relaxed">
            I believe in choosing the right tool for the job. Whether it's
            building a performant web app or a cross-platform mobile experience,
            I focus on clean architecture and maintainable code.
          </p>
        </div>
      </div>
    </section>
  );
}

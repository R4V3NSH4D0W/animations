"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experienceData } from "@/data/site-data";

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const experienceRefs = useRef<HTMLDivElement[]>([]);

  useGSAP(
    () => {
      // Animate header
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play reverse play reverse",
            },
          },
        );
      }

      // Animate timeline line drawing
      if (timelineRef.current) {
        const line = timelineRef.current.querySelector(".timeline-line");
        if (line) {
          gsap.fromTo(
            line,
            { scaleY: 0 },
            {
              scaleY: 1,
              duration: 1.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: timelineRef.current,
                start: "top 70%",
                end: "bottom 30%",
                scrub: 1,
              },
            },
          );
        }
      }

      // Animate each experience card
      experienceRefs.current.forEach((exp, index) => {
        if (!exp) return;

        gsap.fromTo(
          exp,
          {
            opacity: 0,
            x: index % 2 === 0 ? -60 : 60,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: exp,
              start: "top 80%",
              toggleActions: "play reverse play reverse",
            },
          },
        );

        // Animate dot
        const dot = exp.querySelector(".timeline-dot");
        if (dot) {
          gsap.fromTo(
            dot,
            { scale: 0 },
            {
              scale: 1,
              duration: 0.4,
              ease: "back.out(2)",
              scrollTrigger: {
                trigger: exp,
                start: "top 75%",
                toggleActions: "play reverse play reverse",
              },
            },
          );
        }
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="py-20 sm:py-24 md:py-32 px-4 sm:px-6 md:px-10 bg-white"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-16 sm:mb-20">
          <span className="uppercase text-xs sm:text-sm font-bold text-gray-400 block mb-4">
            {experienceData.tagline}
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-tight">
            {experienceData.heading}
            <br />
            <span className="text-gray-400">
              {experienceData.headingHighlight}
            </span>
          </h2>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Center line - visible on desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px origin-top">
            <div className="timeline-line w-full h-full bg-gray-200" />
          </div>

          {/* Mobile line - left side */}
          <div className="md:hidden absolute left-[16px] top-0 bottom-0 w-px origin-top">
            <div className="timeline-line w-full h-full bg-gray-200" />
          </div>

          {/* Experience cards */}
          <div className="space-y-12 md:space-y-0">
            {experienceData.experiences.map((exp, index) => (
              <div
                key={exp.id}
                ref={(el) => {
                  if (el) experienceRefs.current[index] = el;
                }}
                className={`relative md:flex md:items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div
                  className={`timeline-dot absolute w-3 h-3 bg-black rounded-full z-10
                    left-[16px] -translate-x-1/2 md:left-1/2 md:-translate-x-1/2
                    top-8 md:top-1/2 md:-translate-y-1/2`}
                />

                {/* Card */}
                <div
                  className={`md:w-[calc(50%-40px)] ml-10 md:ml-0 ${
                    index % 2 === 0 ? "md:pr-10" : "md:pl-10"
                  }`}
                >
                  <div className="p-6 border border-gray-100 hover:border-gray-300 transition-colors duration-300">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-xs text-gray-400 uppercase">
                        {exp.period}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-medium mb-1">
                      {exp.role}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4">{exp.company}</p>

                    <p className="text-gray-600 text-sm sm:text-base mb-4 leading-relaxed">
                      {exp.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs uppercase border border-gray-200 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Spacer for opposite side */}
                <div className="hidden md:block md:w-[calc(50%-40px)]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

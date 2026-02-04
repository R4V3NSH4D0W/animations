"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const processItems = [
  {
    title: "Performance First",
    desc: "Optimizing load times, reducing bundle sizes, and ensuring 60fps interactions. Speed is a feature.",
  },
  {
    title: "Motion & Feel",
    desc: "Using GSAP and Framer Motion to create fluid, physics-based interactions that feel alive, not just animated.",
  },
  {
    title: "Scalable Architecture",
    desc: "Building component systems that are type-safe, maintainable, and ready for growth.",
  },
  {
    title: "Pixel Precision",
    desc: "Translating designs into code with absolute fidelity, respecting grid systems and typography.",
  },
];

export default function ProcessSection() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title Animation
      gsap.fromTo(
        titleRef.current,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        },
      );

      // Items Animation (Staggered)
      itemsRef.current.forEach((el, index) => {
        if (!el) return;

        gsap.fromTo(
          el,
          {
            y: 50,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%", // Triggers when top of item hits 85% of viewport height
              toggleActions: "play none none reverse",
            },
            delay: index * 0.1, // Stagger effect
          },
        );

        // Animate the border line width from 0 to 100%
        const border = el.querySelector(".border-line");
        if (border) {
          gsap.fromTo(
            border,
            { width: "0%" },
            {
              width: "100%",
              duration: 1,
              ease: "power3.inOut",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
              },
            },
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full py-24 px-4 sm:px-8 md:px-12 bg-[#F9F9F9]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 md:gap-24">
          {/* Left Title */}
          <div ref={titleRef} className="w-full md:w-1/3">
            <span className="uppercase text-xs font-bold tracking-widest mb-4 block opacity-50">
              (The Approach)
            </span>
            <h2 className="font-serif italic text-4xl md:text-5xl leading-tight">
              Frontend is more than just code.
            </h2>
          </div>

          {/* Right Grid */}
          <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16">
            {processItems.map((item, i) => (
              <div
                key={i}
                ref={(el) => {
                  itemsRef.current[i] = el;
                }}
                className="flex flex-col gap-3 group"
              >
                <div className="relative pb-3">
                  <h3 className="text-xl font-medium relative z-10">
                    0{i + 1}. {item.title}
                  </h3>
                  {/* Border Line for Animation */}
                  <div className="border-line absolute bottom-0 left-0 h-[1px] bg-black/10 w-full" />
                </div>

                <p className="text-neutral-600 leading-relaxed text-sm md:text-base">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

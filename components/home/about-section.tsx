"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play reverse play reverse",
        },
      });

      // Tagline slides in from left
      tl.fromTo(
        taglineRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" },
      )
        // Heading fades up
        .fromTo(
          headingRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          "-=0.3",
        )
        // Text fades up
        .fromTo(
          textRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.4",
        )
        // Link fades in
        .fromTo(
          linkRef.current,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" },
          "-=0.2",
        )
        // Image slides in from right
        .fromTo(
          imageRef.current,
          { opacity: 0, x: 60, scale: 0.95 },
          { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: "power3.out" },
          "-=0.6",
        );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="py-20 sm:py-24 md:py-32 px-4 sm:px-6 md:px-10 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <div>
            <span
              ref={taglineRef}
              className="uppercase text-xs sm:text-sm font-bold text-gray-400 block mb-6"
            >
              (About Me)
            </span>

            <h2
              ref={headingRef}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-8"
            >
              Crafting Digital
              <br />
              <span className="text-gray-400">Experiences</span>
            </h2>

            <p
              ref={textRef}
              className="text-gray-600 text-lg sm:text-xl leading-relaxed mb-8 max-w-xl"
            >
              I'm a Full-Stack Developer passionate about building modern web
              and mobile applications. With expertise in React, Next.js, and
              React Native, I transform complex problems into elegant,
              performant solutions that users love.
            </p>

            <Link
              href="/about"
              ref={linkRef}
              className="group inline-flex items-center gap-3 text-sm uppercase hover:gap-4 transition-all"
            >
              <span>Read More</span>
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>

          {/* Right: Image */}
          <div ref={imageRef} className="relative">
            <div className="relative aspect-4/5 w-full max-w-md mx-auto lg:max-w-none">
              <Image
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2340&auto=format&fit=crop"
                alt="Developer workspace"
                fill
                className="object-cover"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border border-gray-200 hidden lg:block" />
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gray-100 hidden lg:block" />
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-gray-200">
          {[
            { value: "3+", label: "Years Experience" },
            { value: "20+", label: "Projects Delivered" },
            { value: "15+", label: "Happy Clients" },
            { value: "99%", label: "Satisfaction Rate" },
          ].map((stat) => (
            <div key={stat.label}>
              <span className="text-3xl sm:text-4xl md:text-5xl font-light">
                {stat.value}
              </span>
              <p className="text-gray-500 text-sm uppercase mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutSection;

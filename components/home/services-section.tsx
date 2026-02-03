"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { servicesData } from "@/data/site-data";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement[]>([]);

  useGSAP(
    () => {
      // Header animation
      if (headerRef.current) {
        const tagline = headerRef.current.querySelector(".tagline");
        const title = headerRef.current.querySelector(".title");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          },
        });

        tl.fromTo(
          tagline,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" },
        ).fromTo(
          title,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.3",
        );
      }

      // Service cards animation
      servicesRef.current.forEach((service, index) => {
        if (!service) return;

        const number = service.querySelector(".service-number");
        const title = service.querySelector(".service-title");
        const desc = service.querySelector(".service-desc");
        const features = service.querySelectorAll(".service-feature");
        const arrow = service.querySelector(".service-arrow");
        const line = service.querySelector(".service-line");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: service,
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          },
        });

        // Slide in from alternating sides
        tl.fromTo(
          service,
          {
            opacity: 0,
            x: index % 2 === 0 ? -60 : 60,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
          },
        )
          .fromTo(
            number,
            { opacity: 0, scale: 0.5 },
            { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" },
            "-=0.4",
          )
          .fromTo(
            title,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            "-=0.3",
          )
          .fromTo(
            desc,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            "-=0.3",
          )
          .fromTo(
            features,
            { opacity: 0, x: -10 },
            {
              opacity: 1,
              x: 0,
              duration: 0.3,
              stagger: 0.05,
              ease: "power2.out",
            },
            "-=0.2",
          )
          .fromTo(
            arrow,
            { opacity: 0, scale: 0 },
            { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" },
            "-=0.2",
          )
          .fromTo(
            line,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.6, ease: "power2.out" },
            "-=0.3",
          );
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="py-20 sm:py-24 md:py-32 px-4 sm:px-6 md:px-10 bg-white overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-16 sm:mb-20">
          <span className="tagline uppercase text-xs sm:text-sm font-bold text-gray-400 block mb-4 opacity-0">
            (What I Do)
          </span>
          <h2 className="title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-tight opacity-0">
            Services
            <br />
            <span className="text-gray-400">& Expertise</span>
          </h2>
        </div>

        {/* Services Grid */}
        <div className="space-y-8 sm:space-y-12">
          {servicesData.services.map((service, index) => (
            <div
              key={service.id}
              ref={(el) => {
                if (el) servicesRef.current[index] = el;
              }}
              className="group relative opacity-0"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10 py-8 sm:py-10">
                {/* Number */}
                <span className="service-number text-6xl sm:text-7xl md:text-8xl font-light text-gray-200 group-hover:text-gray-300 transition-colors md:w-32 shrink-0 opacity-0">
                  {service.id}
                </span>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="service-title text-2xl sm:text-3xl md:text-4xl font-light mb-4 group-hover:translate-x-2 transition-transform opacity-0">
                    {service.title}
                  </h3>
                  <p className="service-desc text-gray-500 text-base sm:text-lg mb-6 max-w-xl opacity-0">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {service.features.map((feature) => (
                      <span
                        key={feature}
                        className="service-feature px-3 py-1 text-xs uppercase border border-gray-200 rounded-full hover:border-black hover:bg-black hover:text-white transition-all duration-300 opacity-0"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                <Link
                  href="/services"
                  className="service-arrow hidden md:flex items-center justify-center w-14 h-14 border border-gray-200 rounded-full group-hover:border-black group-hover:bg-black group-hover:text-white transition-all shrink-0 opacity-0"
                >
                  <ArrowUpRight
                    size={20}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </Link>
              </div>

              {/* Separator line */}
              <div className="service-line h-px bg-gray-200 origin-left scale-x-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

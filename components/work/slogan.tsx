"use client";

import { usePathname } from "next/navigation";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { socialLinks, sloganData } from "@/data/site-data";

gsap.registerPlugin(ScrollTrigger);

function Slogan() {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Animate the main text
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      // Animate social links
      if (linksRef.current) {
        const links = linksRef.current.children;
        gsap.fromTo(
          links,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: linksRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    },
    { scope: containerRef },
  );

  if (pathname === "/contact") return null;

  const getSloganText = () => {
    const pathKey = pathname as keyof typeof sloganData.pageSpecificSlogans;
    return sloganData.pageSpecificSlogans[pathKey] || sloganData.defaultSlogan;
  };

  return (
    <div
      ref={containerRef}
      className="flex flex-col w-full py-12 sm:py-16 md:py-24 lg:py-32 items-center px-4 sm:px-6"
    >
      {/* Tagline */}
      <span className="uppercase text-xs font-bold text-gray-400 mb-4 sm:mb-6">
        {sloganData.tagline}
      </span>

      {/* Main Slogan */}
      <h2
        ref={textRef}
        className="text-center font-light text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl max-w-4xl leading-snug sm:leading-tight px-2"
      >
        {getSloganText()}
      </h2>

      {/* CTA Button */}
      <Link
        href="/contact"
        className="group mt-8 sm:mt-10 md:mt-12 flex items-center gap-2 sm:gap-3 bg-black text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-gray-800 transition-all text-sm sm:text-base"
      >
        <span className="font-medium">Start a Project</span>
        <ArrowUpRight
          size={18}
          className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
        />
      </Link>

      {/* Social Links + PORTFOLIO text */}
      <div className="flex flex-col w-full mt-10 sm:mt-14 md:mt-16">
        {/* Social Links - centered on mobile, spread on desktop */}
        <div
          ref={linksRef}
          className="flex flex-wrap justify-center sm:justify-between gap-3 sm:gap-4 uppercase mx-2 sm:mx-6 md:mx-8 lg:mx-10 items-center text-xs sm:text-sm"
        >
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={
                link.href.startsWith("http") ? "noopener noreferrer" : undefined
              }
              className="hover:text-gray-500 transition-colors px-2 py-1"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* PORTFOLIO text - responsive sizing */}
        <h5 className="w-full mt-4 sm:mt-0 lg:-mt-10 uppercase text-center font-bold text-[14vw]  md:text-[16vw] leading-none select-none overflow-hidden">
          PORTFOLIO
        </h5>
      </div>
    </div>
  );
}

export default Slogan;

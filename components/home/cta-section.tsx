"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (!textRef.current) return;

      // Split text animation
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-white to-gray-100 py-20 px-4 sm:px-6 md:px-10"
    >
      <div className="max-w-4xl mx-auto text-center">
        <span className="uppercase text-xs sm:text-sm font-bold text-gray-500 mb-6 block">
          (Let&apos;s Connect)
        </span>

        <h2
          ref={textRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light leading-tight mb-8"
        >
          Have a project in mind?
          <br />
          <span className="font-medium">Let&apos;s build it together.</span>
        </h2>

        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-12">
          I&apos;m always open to discussing new projects, creative ideas, or
          opportunities to be part of your vision.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="/contact"
            className="group flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-all"
          >
            <span className="font-medium">Get In Touch</span>
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
          <a
            href="mailto:hello@lenish.dev"
            className="flex items-center gap-3 border border-black px-8 py-4 rounded-full hover:bg-black hover:text-white transition-all"
          >
            <Mail size={20} />
            <span className="font-medium">Send Email</span>
          </a>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-6">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full border border-gray-300 hover:border-black hover:bg-black hover:text-white transition-all"
            aria-label="GitHub"
          >
            <Github size={24} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full border border-gray-300 hover:border-black hover:bg-black hover:text-white transition-all"
            aria-label="LinkedIn"
          >
            <Linkedin size={24} />
          </a>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import React from "react";
import { Copyright } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { useGsapLineReveal } from "@/components/shared/useGsapLineReveal";
import Slogan from "./work/slogan";
import HoverFlip from "@/components/shared/hover-flip";

function Footer() {
  const lineRef = useGsapLineReveal({
    fromWidth: 0,
    toWidth: "100%",
    delay: 0.8,
  });
  const inputLineRef = useGsapLineReveal({
    fromWidth: 0,
    toWidth: "100%",
    delay: 0.8,
  });

  const firstLineRef = useGsapLineReveal({
    fromWidth: 0,
    toWidth: "100%",
    delay: 0.8,
  });

  return (
    <footer className="mx-4 sm:mx-6 md:mx-8 lg:mx-10 flex flex-col">
      <Slogan />
      <div
        ref={firstLineRef}
        className="w-full border-[0.2px] border-black my-6 md:my-10"
      />
      <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-20 mt-10 mb-10">
        <div className="flex flex-col gap-8 lg:gap-12">
          <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.9] font-serif italic">
            Based in Kathmandu, <br />
            working worldwide.
          </span>
          <div className="flex flex-col">
            <label className="text-xs uppercase font-bold tracking-widest text-neutral-500 mb-2">
              (Get in touch)
            </label>
            <a
              href="mailto:lenishmagar@gmail.com"
              className="text-xl sm:text-2xl hover:opacity-50 transition-opacity"
            >
              lenishmagar@gmail.com
            </a>
          </div>
        </div>

        <div className="flex flex-row gap-16 sm:gap-24 uppercase text-base font-medium tracking-wide">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-neutral-400 mb-4 block">
              (Menu)
            </span>
            {[
              { name: "About", href: "/about" },
              { name: "Expertise", href: "/expertise" },
              { name: "Works", href: "/works" },
              { name: "Contact", href: "/contact" },
            ].map((link) => (
              <Link key={link.name} href={link.href} className="w-fit">
                <HoverFlip>{link.name}</HoverFlip>
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-neutral-400 mb-4 block">
              (Socials)
            </span>
            {["Instagram", "LinkedIn", "Twitter"].map((social) => (
              <a key={social} href="#" target="_blank" className="w-fit">
                <HoverFlip>{social}</HoverFlip>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center items-center mt-10 md:mt-20 mb-4 overflow-hidden select-none">
        <h1 className="text-[12.8vw] font-black opacity-[0.08] leading-none tracking-tighter hover:opacity-20 transition-opacity duration-500">
          R4V3NSH4D0W
        </h1>
      </div>

      <div
        ref={lineRef}
        className="w-full border-[0.2px] border-black my-6 md:my-10"
      />
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-10">
        <span className="flex items-center gap-1 text-xs sm:text-sm text-neutral-500">
          <Copyright size={14} className="inline-block shrink-0" />
          2024 Lenish. All rights reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;

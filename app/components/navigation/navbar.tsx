"use client";

import { usePathname } from "next/navigation";
import AnimatedClock from "../shared/animated-clock";
import HoverFlip from "../shared/hover-flip";
import Shuffle from "../shared/shuffle-text";
import ViewReveal from "../shared/view-reveal";
import { usePageTransition } from "@/app/hooks/use-page-transition";

const navItems = [
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Experties", href: "/experties" },
  { name: "Work", href: "/work" },
  { name: "o-word", href: "/o-word" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const { navigateWithTransition } = usePageTransition();
  const pathname = usePathname(); // 👈 GET CURRENT ROUTE

  const handleNavClick = (href: string) => {
    navigateWithTransition(href);
  };

  return (
    <div className="flex fixed top-0 left-0 right-0 z-9999 flex-row justify-between items-center p-5 ">
      <div onClick={() => handleNavClick("/")} className="cursor-pointer">
        <Shuffle
          text="Luxstore"
          shuffleDirection="right"
          duration={0.5}
          animationMode="evenodd"
          shuffleTimes={2}
          ease="power3.out"
          stagger={0.05}
          threshold={0.1}
          triggerOnce={false}
          triggerOnHover={true}
          respectReducedMotion={true}
          className="text-foreground uppercase font-extrabold"
          style={{
            fontSize: "clamp(1rem, 3vw, 1.5rem)",
            fontFamily: "inherit",
          }}
        />
      </div>

      {/* NAVIGATION */}
      <ViewReveal startHidden revealAfter={0.5} enableBlur={false}>
        <div className="space-x-8 flex items-center">
          {navItems.map((item, idx) => {
            const isActive = pathname === item.href;

            return (
              <span
                key={idx}
                onClick={() => handleNavClick(item.href)}
                className="relative cursor-pointer inline-block"
              >
                <HoverFlip flipDuration={500} className="text-sm">
                  {item.name}
                </HoverFlip>

                {/* ACTIVE UNDERLINE */}
                {isActive && (
                  <span className="absolute left-0 -bottom-1 w-full h-px bg-gray-500  rounded-full" />
                )}
              </span>
            );
          })}
        </div>
      </ViewReveal>

      <AnimatedClock />
    </div>
  );
}

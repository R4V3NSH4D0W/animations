"use client";

import { useEffect, useRef, useState } from "react";
import AnimatedClock from "../shared/animated-clock";
import HoverFlip from "../shared/hover-flip";
import Shuffle from "../shared/shuffle-text";
import ViewReveal from "../shared/view-reveal";
import { useNavigation } from "@/hooks/use-navigation";
import { useWindowScroll } from "react-use";
import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";

const navItems = [
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Experties", href: "/experties" },
  { name: "Work", href: "/work" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const navContainerRef = useRef<HTMLDivElement>(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const { y: currentScrollY } = useWindowScroll();
  const { navigate, isActive } = useNavigation();

  useEffect(() => {
    const el = navContainerRef.current;
    if (!el) return;

    const floatingNavClass = "floating-nav";
    const delta = currentScrollY - lastScrollY;

    if (currentScrollY === 0) {
      el.classList.remove(floatingNavClass);
      setIsNavVisible(true);
    } else if (delta > 10) {
      setIsNavVisible(false);
      el.classList.add(floatingNavClass);
    } else if (delta < -10) {
      setIsNavVisible(true);
      el.classList.add(floatingNavClass);
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useGSAP(() => {
    if (!navContainerRef.current) return;

    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.3,
      ease: "power2.inOut",
    });
  }, [isNavVisible]);

  return (
    <div
      ref={navContainerRef}
      className="flex fixed top-0 left-0 right-0 z-50 flex-row justify-between items-center p-5 "
    >
      <div onClick={() => navigate("/")} className="cursor-pointer">
        <Shuffle
          text="PORTFOLIO"
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
            const active = isActive(item.href);

            return (
              <span
                key={idx}
                onClick={() => navigate(item.href)}
                className="relative cursor-pointer inline-block"
              >
                <HoverFlip flipDuration={500} className="text-sm">
                  {item.name}
                </HoverFlip>

                {/* ACTIVE UNDERLINE */}
                {active && (
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

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
  // { name: "Services", href: "/services" },
  // { name: "Experties", href: "/experties" },
  { name: "Work", href: "/work" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const navContainerRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  // Mobile menu animation
  useGSAP(() => {
    if (!mobileMenuRef.current) return;

    if (isMobileMenuOpen) {
      // Animate menu sheet down
      gsap.fromTo(
        mobileMenuRef.current,
        {
          height: 0,
          opacity: 0,
        },
        {
          height: "100vh",
          opacity: 1,
          duration: 0.6,
          ease: "power3.inOut",
        }
      );

      // Stagger menu items
      if (menuItemsRef.current) {
        const items = menuItemsRef.current.children;
        gsap.fromTo(
          items,
          {
            y: -30,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            delay: 0.3,
            ease: "power2.out",
          }
        );
      }
    } else {
      // Fade out menu items first
      if (menuItemsRef.current) {
        const items = menuItemsRef.current.children;
        gsap.to(items, {
          y: -20,
          opacity: 0,
          duration: 0.3,
          stagger: 0.05,
          ease: "power2.in",
        });
      }

      // Then slide menu sheet up
      gsap.to(mobileMenuRef.current, {
        height: 0,
        duration: 0.5,
        delay: 0.2,
        ease: "power3.inOut",
      });
    }
  }, [isMobileMenuOpen]);

  const handleMobileMenuItemClick = (href: string) => {
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      navigate(href);
    }, 400);
  };

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
            fontSize: "1.5rem",
            fontFamily: "inherit",
          }}
        />
      </div>

      <div className="hidden lg:block">
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
      </div>
      <div className=" hidden lg:block">
        <AnimatedClock />
      </div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="relative w-8 h-8 flex flex-col justify-center items-center gap-1.5 group"
          aria-label="Toggle menu"
        >
          <span
            className={`w-6 h-0.5 bg-foreground transition-all duration-300 ${
              isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-foreground transition-all duration-300 ${
              isMobileMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-foreground transition-all duration-300 ${
              isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        ref={mobileMenuRef}
        className="fixed top-0 left-0 right-0 bg-white overflow-hidden lg:hidden"
        style={{
          height: 0,
          opacity: 0,
          zIndex: 40,
        }}
      >
        <div className="absolute top-5 right-0 ">
          <AnimatedClock />
        </div>
        <div className="h-full flex flex-col justify-center items-center px-8">
          <div ref={menuItemsRef} className="space-y-8 text-center">
            {navItems.map((item, idx) => {
              const active = isActive(item.href);

              return (
                <div
                  key={idx}
                  onClick={() => handleMobileMenuItemClick(item.href)}
                  className="relative cursor-pointer"
                >
                  <div className="text-4xl font-medium text-gray-900 hover:text-gray-600 transition-colors">
                    {item.name}
                  </div>
                  {active && (
                    <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-12 h-1 bg-gray-900 rounded-full" />
                  )}
                </div>
              );
            })}

            {/* Close button at bottom */}
            <div className="pt-12">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm uppercase tracking-wider text-gray-500 hover:text-gray-900 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

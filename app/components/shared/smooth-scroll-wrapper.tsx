"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollWrapperProps {
  children: React.ReactNode;
  speed?: number; // Lower = smoother, higher = faster (default: 1.2)
}

export default function SmoothScrollWrapper({
  children,
  speed = 1.2,
}: SmoothScrollWrapperProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef.current) return;

    const scrollContent = scrollRef.current;

    // Set up smooth scrolling
    let scrollY = 0;
    let currentY = 0;

    const smoothScroll = () => {
      scrollY = window.scrollY;
      currentY += (scrollY - currentY) * (0.1 / speed);

      if (scrollContent) {
        scrollContent.style.transform = `translate3d(0, ${-currentY}px, 0)`;
      }

      requestAnimationFrame(smoothScroll);
    };

    // Start the smooth scroll animation
    smoothScroll();

    // Update body height to match content
    const updateHeight = () => {
      if (scrollContent) {
        document.body.style.height = `${scrollContent.offsetHeight}px`;
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    // Refresh ScrollTrigger after content loads
    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("resize", updateHeight);
      document.body.style.height = "";
    };
  }, [speed]);

  return (
    <div
      ref={scrollRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}

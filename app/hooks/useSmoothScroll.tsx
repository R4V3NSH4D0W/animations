"use client";
import { useRef, MutableRefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface UseSmoothScrollOptions {
  speed?: number; // Lower = smoother, higher = faster
  enabled?: boolean; // Toggle smooth scroll on/off
}

interface UseSmoothScrollReturn {
  scrollRef: MutableRefObject<HTMLDivElement | null>;
  isEnabled: boolean;
}

export function useSmoothScroll({
  speed = 1.2,
  enabled = true,
}: UseSmoothScrollOptions = {}): UseSmoothScrollReturn {
  const scrollRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!scrollRef.current || !enabled) return;

      const scrollContent = scrollRef.current;
      let scrollY = 0;
      let currentY = 0;
      let animationId: number;

      // Configure ScrollTrigger for smooth scroll compatibility
      ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(value?: number) {
          if (value !== undefined) {
            window.scrollTo(0, value);
          }
          return window.pageYOffset;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
        pinType: "transform",
      });

      const smoothScroll = () => {
        scrollY = window.scrollY;
        currentY += (scrollY - currentY) * (0.1 / speed);

        if (scrollContent) {
          scrollContent.style.transform = `translate3d(0, ${-currentY}px, 0)`;
        }

        // Update ScrollTrigger on each frame
        ScrollTrigger.update();

        animationId = requestAnimationFrame(smoothScroll);
      };

      // Start smooth scroll
      smoothScroll();

      // Update body height to match content
      const updateHeight = () => {
        if (scrollContent) {
          document.body.style.height = `${scrollContent.offsetHeight}px`;
        }
      };

      updateHeight();
      window.addEventListener("resize", updateHeight);

      // Refresh ScrollTrigger
      ScrollTrigger.refresh();

      return () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener("resize", updateHeight);
        document.body.style.height = "";
        ScrollTrigger.clearScrollMemory();
      };
    },
    { scope: scrollRef, dependencies: [speed, enabled] }
  );

  return {
    scrollRef,
    isEnabled: enabled,
  };
}

"use client";
import { useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger);

interface GsapLineRevealOptions {
  fromWidth?: number;
  toWidth?: string;
  duration?: number;
  ease?: string;
  triggerOffset?: string;
  delay?: number;
  backgroundColor?: string;
  height?: string;
  opacity?: number;
}

export function useGsapLineReveal({
  fromWidth = 0,
  toWidth = "100%",
  duration = 1,
  ease = "power3.out",
  triggerOffset = "top 90%",
  delay = 0,
  backgroundColor = "currentColor",
  height = "1px",
  opacity = 1,
}: GsapLineRevealOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const animationRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    // Kill existing animation if any
    if (animationRef.current) {
      animationRef.current.kill();
      if (animationRef.current.scrollTrigger) {
        animationRef.current.scrollTrigger.kill();
      }
    }

    // Apply static styles
    if (backgroundColor) el.style.backgroundColor = backgroundColor;
    if (height) el.style.height = height;

    // Reset to initial state
    gsap.set(el, { width: fromWidth, opacity: 0 });

    // Create new animation
    animationRef.current = gsap.fromTo(
      el,
      { width: fromWidth, opacity: 0 },
      {
        width: toWidth,
        opacity,
        duration,
        ease,
        delay,
        scrollTrigger: {
          trigger: el,
          start: triggerOffset,
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
        if (animationRef.current.scrollTrigger) {
          animationRef.current.scrollTrigger.kill();
        }
      }
    };
  }, { dependencies: [pathname, fromWidth, toWidth, duration, ease, triggerOffset, delay, backgroundColor, height, opacity], scope: ref });

  return ref;
}

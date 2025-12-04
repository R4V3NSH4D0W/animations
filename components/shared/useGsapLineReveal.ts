"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

interface GsapLineRevealOptions {
  fromWidth?: number;
  toWidth?: string;
  duration?: number;
  ease?: string;
  triggerOffset?: string;
  delay?: number;
}

export function useGsapLineReveal({
  fromWidth = 0,
  toWidth = "100%",
  duration = 1,
  ease = "power3.out",
  triggerOffset = "top 90%",
  delay = 0,
}: GsapLineRevealOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(
      el,
      { width: fromWidth },
      {
        width: toWidth,
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
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [fromWidth, toWidth, duration, ease, triggerOffset]);

  return ref;
}

"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

interface StackTransitionOptions {
  start?: string;
  end?: string;
  scale?: number;
  offsetY?: number;
}

export const useStackTransition = (
  containerRef: React.RefObject<HTMLDivElement>,
  firstRef: React.RefObject<HTMLDivElement>,
  secondRef: React.RefObject<HTMLDivElement>,
  options: StackTransitionOptions = {}
) => {
  const {
    start = "top top",
    end = "+=100%",
    scale = 0.9,
    offsetY = 40,
  } = options;

  useGSAP(
    () => {
      // Initial position
      gsap.set(secondRef.current, { y: "100%", zIndex: 20 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start,
            end,
            scrub: true,
            pin: true,
          },
        })
        .to(firstRef.current!, {
          scale,
          y: offsetY,
          zIndex: 5,
          ease: "none",
        })
        .to(
          secondRef.current!,
          {
            y: "0%",
            ease: "none",
          },
          0
        );
    },
    { scope: containerRef }
  );
};

"use client";
import { useEffect } from "react";
import { gsap } from "gsap";

interface PageTransitionSplashProps {
  isTransitioning: boolean;
  text?: string;
}

export default function PageTransitionSplash({
  isTransitioning,
  text = "Loading...",
}: PageTransitionSplashProps) {
  useEffect(() => {
    const blackPanel = document.getElementById("transition-splash-black");
    const whitePanel = document.getElementById("transition-splash-white");

    if (!blackPanel || !whitePanel) return;

    let tl: gsap.core.Timeline | null = null;

    if (isTransitioning) {
      // Start: white panel visible immediately to cover content, black panel above viewport
      gsap.set(whitePanel, { y: "0%", opacity: 1 });
      gsap.set(blackPanel, { y: "-100%" });

      tl = gsap.timeline();

      // Step 1: Black panel slides down immediately over white background
      tl.to(blackPanel, {
        y: "0%",
        duration: 0.4,
        ease: "power3.inOut",
      });

      // Step 2: Black panel stays showing quote, then both slide down together
      tl.to([blackPanel, whitePanel], {
        y: "100%",
        duration: 0.8,
        ease: "power3.inOut",
        delay: 0.8, // Hold black panel with quote
      });
    }

    // Cleanup to prevent memory leaks
    return () => {
      if (tl) {
        tl.kill();
      }
    };
  }, [isTransitioning]);

  if (!isTransitioning) return null;

  return (
    <div className="fixed inset-0" style={{ zIndex: 99999 }}>
      {/* White Panel - Behind */}
      <div
        id="transition-splash-white"
        className="absolute inset-0 bg-gray-100 z-10"
      />

      {/* Black Panel - Front */}
      <div
        id="transition-splash-black"
        className="absolute inset-0 bg-black flex items-center justify-center z-20"
      >
        <div className="text-white uppercase text-4xl font-bold text-center px-8 max-w-3xl">
          {text}
        </div>
      </div>
    </div>
  );
}

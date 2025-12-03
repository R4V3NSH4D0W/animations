"use client";
import { useEffect } from "react";
import { gsap } from "gsap";

interface PageTransitionSplashProps {
  isTransitioning: boolean;
}

export default function PageTransitionSplash({
  isTransitioning,
}: PageTransitionSplashProps) {
  useEffect(() => {
    const blackPanel = document.getElementById("transition-splash-black");
    const whitePanel = document.getElementById("transition-splash-white");

    if (!blackPanel || !whitePanel) return;

    if (isTransitioning) {
      // Start: panels above viewport
      gsap.set(blackPanel, { y: "-100%" });
      gsap.set(whitePanel, { y: "-100%" });

      const tl = gsap.timeline();

      // Step 1: Black panel slides down
      tl.to(blackPanel, {
        y: "0%",
        duration: 0.7,
        ease: "power3.inOut",
      });

      // Step 2: White panel follows
      tl.to(
        whitePanel,
        {
          y: "0%",
          duration: 0.7,
          ease: "power3.inOut",
        },
        "-=0.4"
      );

      // Step 3: After navigation, slide both panels down to reveal page
      tl.to([blackPanel, whitePanel], {
        y: "100%",
        duration: 0.8,
        ease: "power3.inOut",
        delay: 0.3,
      });
    }
  }, [isTransitioning]);

  if (!isTransitioning) return null;

  return (
    <div className="fixed inset-0" style={{ zIndex: 99999 }}>
      {/* White Panel - Behind */}
      <div
        id="transition-splash-white"
        className="absolute inset-0 bg-white z-10"
      />

      {/* Black Panel - Front */}
      <div
        id="transition-splash-black"
        className="absolute inset-0 bg-black flex items-center justify-center z-20"
      >
        <div className="text-white text-6xl font-bold">LUXSTORE</div>
      </div>
    </div>
  );
}

"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { usePageTransition } from "@/hooks/use-page-transition";

interface PageTransitionSplashProps {
  text?: string;
}

export default function PageTransitionSplash({
  text = "Loading...",
}: PageTransitionSplashProps) {
  const { isTransitioning, shouldReveal, onTransitionComplete } =
    usePageTransition();
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Enter Animation
  useEffect(() => {
    const blackPanel = document.getElementById("transition-splash-black");
    const whitePanel = document.getElementById("transition-splash-white");

    if (!blackPanel || !whitePanel || !isTransitioning) return;

    // Reset positions for Entry
    // Start at Top (-100%)
    gsap.set(whitePanel, { y: "0%", opacity: 1 });
    gsap.set(blackPanel, { y: "-100%" });

    const tl = gsap.timeline();
    timelineRef.current = tl;

    // Animate to Center (0%)
    tl.to(blackPanel, {
      y: "0%",
      duration: 0.5,
      ease: "power3.inOut",
    });
  }, [isTransitioning]);

  // Exit Animation
  useEffect(() => {
    const blackPanel = document.getElementById("transition-splash-black");
    const whitePanel = document.getElementById("transition-splash-white");

    if (!blackPanel || !whitePanel || !isTransitioning || !shouldReveal) return;

    // Only start exit if timeline exists (meaning entry started)
    const tl = timelineRef.current || gsap.timeline();

    // Animate to Bottom (100%)
    // Added a small delay to ensure user sees the quote for at least a moment
    tl.to([blackPanel, whitePanel], {
      y: "100%",
      duration: 0.8,
      ease: "power3.inOut",
      delay: 0.4, // Min display time
      onComplete: () => {
        onTransitionComplete();
        // Reset timeline
        timelineRef.current = null;
      },
    });
  }, [shouldReveal, isTransitioning, onTransitionComplete]);

  // Don't render if not transitioning
  // Note: We keep it rendered *during* the exit phase because isTransitioning is still true until onComplete
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

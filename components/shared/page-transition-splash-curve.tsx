"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { usePageTransition } from "@/hooks/use-page-transition";

interface PageTransitionSplashProps {
  text?: string;
}

export default function PageTransitionSplashCurve({
  text = "Loading...",
}: PageTransitionSplashProps) {
  const { isTransitioning, shouldReveal, onTransitionComplete } =
    usePageTransition();
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Handle Resize to keep curve proportional
  useEffect(() => {
    function resize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Enter Animation (Cover the screen)
  useEffect(() => {
    if (!isTransitioning || dimensions.height === 0) return;

    const height = dimensions.height;
    const width = dimensions.width;
    const curveHeight = 300; // How deep the curve is

    // Shapes
    // 1. Initial: Flat at top
    const startPath = `M0 0 L${width} 0 L${width} 0 Q${width / 2} 0 0 0`;
    // 2. Mid: Curved down (convex) while moving down
    const curvePath = `M0 0 L${width} 0 L${width} ${height} Q${
      width / 2
    } ${height + 600} 0 ${height}`;
    // 3. Final: Flat covering full screen
    const flatPath = `M0 0 L${width} 0 L${width} ${height} Q${
      width / 2
    } ${height} 0 ${height}`;

    const tl = gsap.timeline();
    timelineRef.current = tl;

    // Reset
    gsap.set(pathRef.current, { attr: { d: startPath }, y: 0 });
    const overlay = document.getElementById("curve-overlay");
    if (overlay) overlay.style.display = "block";

    // Animate Curve In
    tl.to(pathRef.current, {
      attr: { d: flatPath },
      duration: 0.7, // Faster
      ease: "power4.inOut",
    });

    // Fade in text: Slide UP from bottom
    const textEl = document.getElementById("transition-text");
    if (textEl) {
      gsap.set(textEl, { opacity: 0, y: 50 }); // Start lower
      tl.to(
        textEl,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.5",
      );
    }
  }, [isTransitioning, dimensions]);

  // Exit Animation (Reveal new page)
  useEffect(() => {
    if (!shouldReveal || !isTransitioning || dimensions.height === 0) return;

    const tl = timelineRef.current || gsap.timeline();
    const width = dimensions.width;
    const height = dimensions.height;

    // 4. Exit Curve: Bowing UP (concave) as it leaves
    // We actually just move the whole SVG group up, but let's redraw the curve if we want to "pull" it.
    // Simpler method for "Swallow": Keep it flat, and move it UP.
    // Or invert curve:
    const invertCurve = `M0 0 L${width} 0 L${width} ${height} Q${
      width / 2
    } ${height - 600} 0 ${height}`;
    // Then move off screen top? Or bottom?
    // Usually curve transitions go: Top -> Down (Cover) -> Continue Down (Reveal) OR Go back Up.
    // Let's do: Top -> Down (Cover) -> Top (Reveal) requires curve inversion.
    // Let's do simpler: Top -> Down (Cover) -> Down (Reveal).

    // For "Down to Down" (Waterfall):
    // We are currently covering the screen with a flat path: (0,0) to (width, height).
    // To reveal, we need the TOP edge to curve down and follow.
    // But standard SVG overlay usually fills "Top to Bottom".
    // To reveal, we animate the path to look like it's leaving downwards.

    // Let's try the classic "Curve Up" reveal (Curtain lifts).
    // Target: Flat path at top (0,0).
    const liftPath = `M0 0 L${width} 0 L${width} 0 Q${width / 2} 300 0 0`; // Bottom edge curves up
    const finalPath = `M0 0 L${width} 0 L${width} 0 Q${width / 2} 0 0 0`; // Flat empty

    // Sequence:
    // 1. Wait a bit (Read time)
    // 2. Fade out text
    // 3. Lift curve

    // Force a pause at the end of whatever is currently running (Entry)
    // to ensure the user has time to read the text.
    // If the page loads super fast, the entry might just have finished.
    // We want at least 800ms of "Full Cover" time.

    tl.to(
      "#transition-text",
      {
        opacity: 0,
        y: -50, // Continue moving UP
        duration: 0.3,
        ease: "power2.in",
      },
      "+=0.4", // Reduced wait time
    )
      .to(
        pathRef.current,
        {
          attr: { d: liftPath },
          duration: 0.7,
          ease: "power3.inOut", // Smoother start than Power4
        },
        "-=0.25", // Start lifting almost immediately as text fades
      )
      .to(
        pathRef.current,
        {
          attr: { d: finalPath },
          duration: 0.3, // Longer blend
          ease: "power2.out",
        },
        "-=0.4", // Blend heavily with previous step
      )
      .eventCallback("onComplete", () => {
        const overlay = document.getElementById("curve-overlay");
        if (overlay) overlay.style.display = "none";
        onTransitionComplete();
        timelineRef.current = null;
      });
  }, [shouldReveal, isTransitioning, dimensions, onTransitionComplete]);

  if (!isTransitioning) return null;

  return (
    <div
      id="curve-overlay"
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 99999 }}
    >
      <svg
        className="w-full h-full absolute top-0 left-0"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        preserveAspectRatio="none"
      >
        <path ref={pathRef} fill="#000" />
      </svg>

      <div
        id="transition-text"
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
      >
        <div className="text-white font-serif italic text-3xl md:text-5xl tracking-tight text-center px-8 max-w-4xl leading-tight">
          {text}
        </div>
      </div>
    </div>
  );
}

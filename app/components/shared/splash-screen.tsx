"use client";
import { useEffect, useState } from "react";
import { gsap } from "gsap";

interface SplashScreenProps {
  duration?: number; // Duration in ms
  onComplete?: () => void;
  children?: React.ReactNode; // Optional content to show on splash
}

export default function SplashScreen({
  duration = 2000,
  onComplete,
  children,
}: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const blackPanel = document.getElementById("splash-black");
    const whitePanel = document.getElementById("splash-white");

    if (!blackPanel || !whitePanel) return;

    // Initial state: black panel covers screen
    gsap.set(blackPanel, { y: 0 });
    gsap.set(whitePanel, { y: "100%" });

    const tl = gsap.timeline({
      onComplete: () => {
        setIsVisible(false);
        onComplete?.();
      },
    });

    // Wait a bit, then slide black panel up
    tl.to(blackPanel, {
      y: "-100%",
      duration: duration / 2000,
      ease: "power3.inOut",
      delay: 0.5,
    });

    // White panel follows, sliding up to reveal content
    tl.to(
      whitePanel,
      {
        y: "-100%",
        duration: duration / 2000,
        ease: "power3.inOut",
      },
      "-=0.3" // Slight overlap
    );
  }, [duration, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-999 pointer-events-none">
      {/* Black Panel */}
      <div
        id="splash-black"
        className="absolute inset-0 bg-black flex items-center justify-center"
      >
        {children}
      </div>

      {/* White Panel */}
      <div id="splash-white" className="absolute inset-0" />
    </div>
  );
}

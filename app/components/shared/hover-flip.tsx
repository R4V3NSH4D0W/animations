"use client";
import { ReactNode, useRef, useEffect } from "react";
import { gsap } from "gsap";

type FlipMode = "hover" | "auto";

interface HoverFlipProps {
  children?: ReactNode; // Single content mode
  front?: ReactNode; // Front content for dual mode
  back?: ReactNode; // Back content for dual mode
  className?: string;
  flipDuration?: number; // ms
  mode?: FlipMode; // "hover" or "auto"
  rotateInterval?: number; // ms (for auto mode)
}

export default function HoverFlip({
  children,
  front,
  back,
  className = "",
  flipDuration = 400,
  mode = "hover",
  rotateInterval = 5000,
}: HoverFlipProps) {
  const oldRef = useRef<HTMLDivElement>(null);
  const newRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);

  const performFlip = () => {
    if (isAnimatingRef.current || !oldRef.current || !newRef.current) return;
    isAnimatingRef.current = true;

    gsap.set(oldRef.current, { y: 0, opacity: 1 });
    gsap.set(newRef.current, { y: "-100%", opacity: 1 });

    const tl = gsap.timeline({
      onComplete: () => {
        requestAnimationFrame(() => {
          if (oldRef.current && newRef.current) {
            gsap.set(oldRef.current, { y: 0, opacity: 1 });
            gsap.set(newRef.current, { y: "-100%", opacity: 1 });
            isAnimatingRef.current = false;
          }
        });
      },
    });

    // Old slides down slowly (ease out)
    tl.to(
      oldRef.current,
      {
        y: "100%",
        opacity: 0,
        duration: flipDuration / 1000,
        ease: "power2.out",
      },
      0
    );

    // New comes from top fast (ease in, shock effect)
    tl.to(
      newRef.current,
      {
        y: 0,
        opacity: 1,
        duration: (flipDuration / 1000) * 0.35,
        ease: "power4.in",
      },
      0
    );
  };

  // Auto-rotate mode
  useEffect(() => {
    if (mode !== "auto") return;

    const interval = setInterval(() => {
      performFlip();
    }, rotateInterval);

    return () => clearInterval(interval);
  }, [mode, rotateInterval]);

  // Determine content
  const oldContent = front ?? children;
  const newContent = back ?? children;

  return (
    <div
      className={`relative inline-block uppercase overflow-hidden ${
        mode === "hover" ? "cursor-pointer" : ""
      } ${className}`}
      onMouseEnter={mode === "hover" ? performFlip : undefined}
    >
      {/* Old/Current content */}
      <div ref={oldRef} className="block w-full h-full  ">
        {oldContent}
      </div>

      {/* New/Next content */}
      <div
        ref={newRef}
        className="absolute top-0 uppercase left-0 w-full h-full"
      >
        {newContent}
      </div>
    </div>
  );
}

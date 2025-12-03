"use client";

import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export interface AnimateInProps {
  children: React.ReactNode;
  /** Animation direction */
  direction?: "up" | "down" | "left" | "right" | "fade" | "scale" | "none";
  /** Custom container className */
  className?: string;
  /** Distance in pixels for directional animations */
  distance?: number;
  /** Animation duration in seconds */
  duration?: number;
  /** Delay before animation starts in seconds */
  delay?: number;
  /** Viewport threshold for triggering animation (0-1) */
  threshold?: number;
  /** Trigger animation only once or reset when out of view */
  once?: boolean;
  /** Enable blur effect during animation */
  blur?: boolean;
  /** Blur strength in pixels */
  blurAmount?: number;
  /** Scale factor for scale animations (e.g., 0.8 = start at 80%) */
  scaleFrom?: number;
  /** Easing function */
  ease?:
    | "linear"
    | "easeIn"
    | "easeOut"
    | "easeInOut"
    | "backOut"
    | "anticipate";
  /** Spring animation configuration (overrides ease) */
  spring?: {
    damping?: number;
    stiffness?: number;
    mass?: number;
  };
  /** Start completely hidden */
  startHidden?: boolean;
  /** Initial opacity (0-1) */
  initialOpacity?: number;
  /** Animation trigger type */
  trigger?: "view" | "scroll";
  /** Reset animation when element leaves viewport (only works when once=false) */
  resetOnExit?: boolean;
}

const easingMap = {
  linear: [0, 0, 1, 1],
  easeIn: [0.42, 0, 1, 1],
  easeOut: [0, 0, 0.58, 1],
  easeInOut: [0.42, 0, 0.58, 1],
  backOut: [0.34, 1.56, 0.64, 1],
  anticipate: [0.36, 0, 0.66, -0.56],
};

export function AnimateIn({
  children,
  direction = "up",
  className,
  distance = 50,
  duration = 0.6,
  delay = 0,
  threshold = 0.1,
  once = true,
  blur = false,
  blurAmount = 10,
  scaleFrom = 0.9,
  ease = "easeOut",
  spring,
  startHidden = false,
  initialOpacity = 0,
  trigger = "view",
  resetOnExit = false,
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    amount: threshold,
    once,
  });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // For scroll-based animations, transform based on scroll progress
  const scrollOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 1, 1, 0]
  );
  const scrollY = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    direction === "up"
      ? [distance, 0, 0, -distance]
      : direction === "down"
      ? [-distance, 0, 0, distance]
      : [0, 0, 0, 0]
  );
  const scrollX = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    direction === "left"
      ? [distance, 0, 0, -distance]
      : direction === "right"
      ? [-distance, 0, 0, distance]
      : [0, 0, 0, 0]
  );
  const scrollScale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    direction === "scale" ? [scaleFrom, 1, 1, scaleFrom] : [1, 1, 1, 1]
  );

  // Determine initial position based on direction
  const getInitialState = () => {
    const base = {
      opacity: initialOpacity,
      filter: blur ? `blur(${blurAmount}px)` : "blur(0px)",
    };

    switch (direction) {
      case "up":
        return { ...base, y: distance };
      case "down":
        return { ...base, y: -distance };
      case "left":
        return { ...base, x: distance };
      case "right":
        return { ...base, x: -distance };
      case "scale":
        return { ...base, scale: scaleFrom };
      case "fade":
        return base;
      case "none":
        return { opacity: 1 };
      default:
        return base;
    }
  };

  // Final animated state
  const animateState = {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: spring
      ? {
          ...spring,
          delay,
        }
      : {
          duration,
          delay,
          ease: easingMap[ease],
        },
  };

  // Determine if animation should show based on trigger type and reset settings
  const shouldAnimate =
    trigger === "scroll" ? true : resetOnExit ? isInView : isInView || once;

  // For scroll trigger, use scroll-based transforms
  if (trigger === "scroll") {
    return (
      <motion.div
        ref={ref}
        className={cn("transform-gpu", className)}
        style={{
          opacity: direction === "fade" ? scrollOpacity : scrollYProgress,
          y: scrollY,
          x: scrollX,
          scale: scrollScale,
          filter: blur ? `blur(${blurAmount}px)` : "blur(0px)",
        }}
      >
        {children}
      </motion.div>
    );
  }

  // For view trigger, use standard animation
  return (
    <motion.div
      ref={ref}
      className={cn("transform-gpu", className)}
      initial={getInitialState()}
      animate={shouldAnimate ? animateState : getInitialState()}
      style={
        startHidden && !isInView
          ? { opacity: 0, visibility: "hidden" as const }
          : undefined
      }
    >
      {children}
    </motion.div>
  );
}

export default AnimateIn;

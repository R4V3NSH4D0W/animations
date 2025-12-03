"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ScrollRevealProps {
  children: React.ReactNode;
  /** Custom container className */
  containerClassName?: string;
  /** Custom text className */
  textClassName?: string;
  /** Enable blur animation effect */
  enableBlur?: boolean;
  /** Base opacity when text is out of view */
  baseOpacity?: number;
  /** Base rotation angle in degrees */
  baseRotation?: number;
  /** Blur strength in pixels */
  blurStrength?: number;
  /** Animation delay between words in seconds */
  staggerDelay?: number;
  /** Viewport threshold for triggering animation */
  threshold?: number;
  /** Animation duration in seconds */
  duration?: number;
  /** Spring animation configuration */
  springConfig?: {
    damping?: number;
    stiffness?: number;
    mass?: number;
  };
  /** Text size variant */
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  /** Text alignment */
  align?: "left" | "center" | "right";
  /** Color variant */
  variant?: "default" | "muted" | "accent" | "primary";
  /** Animate as a whole component instead of word by word */
  asComponent?: boolean;
  /** Delay before animation starts in seconds */
  delay?: number;
  /** Initial opacity of container before animation (0-1, default: 1) */
  initialOpacity?: number;
  /** Start completely hidden and reveal after a delay */
  startHidden?: boolean;
  /** Duration in seconds to wait before revealing (only works with startHidden) */
  revealAfter?: number;
  /** Initial Y offset in pixels */
  yOffset?: number;
  /** Initial X offset in pixels */
  xOffset?: number;
  /** Scale effect on animation */
  scale?: number;
}

const sizeClasses = {
  sm: "text-lg md:text-xl",
  md: "text-xl md:text-2xl lg:text-3xl",
  lg: "text-2xl md:text-3xl lg:text-4xl xl:text-5xl",
  xl: "text-3xl md:text-4xl lg:text-5xl xl:text-6xl",
  "2xl": "text-4xl md:text-5xl lg:text-6xl xl:text-7xl",
};

const alignClasses = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const variantClasses = {
  default: "text-foreground",
  muted: "text-muted-foreground",
  accent: "text-accent-foreground",
  primary: "text-primary",
};

export function ScrollReveal({
  children,
  containerClassName,
  textClassName,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  staggerDelay = 0.05,
  threshold = 0.5,
  duration = 0.8,
  springConfig = {
    // Default spring config is always good to have
    damping: 25,
    stiffness: 100,
    mass: 1,
  },
  size = "lg",
  align = "left",
  variant = "default",
  asComponent = false,
  delay = 0,
  initialOpacity = 1,
  startHidden = false,
  revealAfter = 0,
  yOffset = 20,
  xOffset = 0,
  scale = 1,
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldReveal, setShouldReveal] = useState(!startHidden);

  const isInView = useInView(containerRef, {
    amount: threshold,
    once: false,
  });

  // Handle delayed reveal
  useEffect(() => {
    if (startHidden && revealAfter > 0) {
      const timer = setTimeout(() => {
        setShouldReveal(true);
      }, revealAfter * 1000);

      return () => clearTimeout(timer);
    }
  }, [startHidden, revealAfter]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Transform rotation based on scroll
  const rotation = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [baseRotation, 0, 0]
  );

  // Split text into words and spaces, ensuring each part is an object
  const splitText = useMemo(() => {
    // Using useMemo is good here
    const text = typeof children === "string" ? children : "";
    // Split by spaces, keeping the spaces as separate elements in the array.
    // Each 'part' will either be a word or a sequence of spaces.
    return text
      .split(/(\s+)/)
      .map((part, index) => {
        // Return an object for both words and spaces, with a 'type' property
        // to differentiate them in the rendering loop.
        return {
          value: part,
          isSpace: part.match(/^\s+$/) && part.length > 0, // Check if it's a non-empty string of only whitespace
          originalIndex: index, // Keep original index for stable keys
        };
      })
      .filter((item) => item.value.length > 0); // Filter out any empty strings that might result from split
  }, [children]);

  const containerVariants = {
    hidden: { opacity: initialOpacity },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: baseOpacity,
      filter: enableBlur ? `blur(${blurStrength}px)` : "blur(0px)",
      y: yOffset,
      x: xOffset,
      scale: scale < 1 ? scale : 1,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        ...springConfig,
        duration,
      },
    },
  };

  const componentVariants = {
    hidden: {
      opacity: baseOpacity,
      filter: enableBlur ? `blur(${blurStrength}px)` : "blur(0px)",
      y: yOffset,
      x: xOffset,
      scale: scale < 1 ? scale : 1,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        ...springConfig,
        duration,
        delay,
      },
    },
  };

  // If asComponent is true or children is not a string, animate the entire component
  if (asComponent || typeof children !== "string") {
    return (
      <motion.div
        ref={containerRef}
        className={cn("transform-gpu", containerClassName)}
        variants={componentVariants}
        initial="hidden"
        animate={isInView && shouldReveal ? "visible" : "hidden"}
        style={{
          ...(startHidden && !shouldReveal
            ? { opacity: 0, visibility: "hidden" }
            : {}),
          rotate: rotation,
        }}
      >
        {children}
      </motion.div>
    );
  }

  // Otherwise, animate word by word
  return (
    <motion.div
      ref={containerRef}
      style={{
        rotate: rotation,
        ...(startHidden && !shouldReveal
          ? { opacity: 0, visibility: "hidden" }
          : {}),
      }}
      className={cn("my-5 transform-gpu", containerClassName)}
    >
      <motion.p
        className={cn(
          "leading-relaxed font-semibold",
          sizeClasses[size],
          alignClasses[align],
          variantClasses[variant],
          textClassName
        )}
        variants={containerVariants}
        initial="hidden"
        animate={isInView && shouldReveal ? "visible" : "hidden"}
      >
        {splitText.map(
          (
            item // Map over 'item' directly as it's always an object
          ) =>
            item.isSpace ? (
              // Render spaces as a regular span
              <span key={`space-${item.originalIndex}`}>{item.value}</span>
            ) : (
              // Render words as motion.span for animation
              <motion.span
                key={`word-${item.originalIndex}`} // Use originalIndex for stable keys
                className="inline-block"
                variants={wordVariants}
              >
                {item.value}
              </motion.span>
            )
        )}
      </motion.p>
    </motion.div>
  );
}

export default ScrollReveal;

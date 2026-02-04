"use client";

import { useEffect, useRef } from "react";

const ENABLE_RELOAD_ON_RESIZE = true; // Set to false to disable

export default function ResizeReloader() {
  const lastWidth = useRef(0);
  const lastHeight = useRef(0);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!ENABLE_RELOAD_ON_RESIZE) return;

    // Set initial dimensions
    if (typeof window !== "undefined") {
      lastWidth.current = window.innerWidth;
      lastHeight.current = window.innerHeight;
    }

    const handleResize = () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }

      timeoutId.current = setTimeout(() => {
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight;

        // Calculate differences
        const widthDiff = Math.abs(newWidth - lastWidth.current);
        const heightDiff = Math.abs(newHeight - lastHeight.current);

        // Logic:
        // 1. If width changes significantly (e.g., > 10px), reload.
        //    This covers orientation changes, desktop resizes, etc.
        // 2. Ignore pure vertical resizes unless they are huge (e.g., keyboard open/close often is just height).
        //    Actually, for GSAP pinning, height changes CAN break things, but often mobile scroll bars
        //    trigger small height changes we want to ignore.
        //    Let's be strict: Reload if Width changes OR if Height changes by a large amount (> 20%).

        const isWidthChange = widthDiff > 10;
        const isSignificantHeightChange = heightDiff > window.innerHeight * 0.2;

        if (isWidthChange || isSignificantHeightChange) {
          // Update refs to prevent loops if reload is fast?
          // Actually reload kills the state, so it doesn't matter.
          window.location.reload();
        }
      }, 500); // 500ms debounce
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (timeoutId.current) clearTimeout(timeoutId.current);
    };
  }, []);

  return null; // This component handles side effects only
}

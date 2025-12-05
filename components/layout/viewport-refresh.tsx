"use client";

import { useEffect, useRef } from "react";

// Enable/disable via environment variable:
// Add to .env.local: NEXT_PUBLIC_ENABLE_VIEWPORT_REFRESH=true
export default function ViewportRefresh() {
  const initialWidthRef = useRef<number | null>(null);
  const initialHeightRef = useRef<number | null>(null);
  const isInitializedRef = useRef(false);

  // Check if feature is enabled via environment variable
  const isEnabled = process.env.NEXT_PUBLIC_ENABLE_VIEWPORT_REFRESH === "true";

  useEffect(() => {
    // Exit early if feature is disabled
    if (!isEnabled) {
      console.log(
        "Viewport refresh is disabled (check NEXT_PUBLIC_ENABLE_VIEWPORT_REFRESH)"
      );
      return;
    }

    // Store initial viewport dimensions on first mount
    if (!isInitializedRef.current) {
      initialWidthRef.current = window.innerWidth;
      initialHeightRef.current = window.innerHeight;
      isInitializedRef.current = true;
      console.log(
        `Initial viewport: ${initialWidthRef.current}x${initialHeightRef.current}`
      );
    }

    const handleResize = () => {
      const currentWidth = window.innerWidth;
      const currentHeight = window.innerHeight;

      // Check if resolution changed significantly (more than 50px in either dimension)
      const widthChanged =
        Math.abs(currentWidth - (initialWidthRef.current || 0)) > 50;
      const heightChanged =
        Math.abs(currentHeight - (initialHeightRef.current || 0)) > 50;

      if (widthChanged || heightChanged) {
        console.log(
          `Viewport changed: ${initialWidthRef.current}x${initialHeightRef.current} → ${currentWidth}x${currentHeight}`
        );
        console.log("Refreshing page...");
        window.location.reload();
      }
    };

    // Debounce resize to avoid multiple refreshes
    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 300);
    };

    window.addEventListener("resize", debouncedResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", debouncedResize);
    };
  }, [isEnabled]);

  return null;
}

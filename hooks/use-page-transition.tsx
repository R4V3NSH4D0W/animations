"use client";
import { createContext, useContext, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ScrollSmoother } from "gsap/ScrollSmoother";

interface PageTransitionContextType {
  isTransitioning: boolean;
  navigateWithTransition: (href: string) => void;
  markPageReady: () => void;
}

const PageTransitionContext = createContext<
  PageTransitionContextType | undefined
>(undefined);

export function PageTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPageReady, setIsPageReady] = useState(false);
  const router = useRouter();

  const navigateWithTransition = useCallback(
    (href: string) => {
      console.log("Starting transition to:", href);
      setIsTransitioning(true);
      setIsPageReady(false);

      // Scroll to top using ScrollSmoother or fallback to window
      const smoother = ScrollSmoother.get();
      if (smoother) {
        smoother.scrollTo(0, false); // Instant scroll to top
      } else {
        window.scrollTo(0, 0);
      }

      // Navigate immediately - content will be hidden by background
      router.push(href);
    },
    [router]
  );

  const markPageReady = useCallback(() => {
    console.log("Page marked as ready");
    setIsPageReady(true);
    // Keep transition active for reveal animation, then reset
    setTimeout(() => {
      console.log("Transition complete");
      setIsTransitioning(false);
    }, 1500); // Time for reveal animation
  }, []);

  return (
    <PageTransitionContext.Provider
      value={{ isTransitioning, navigateWithTransition, markPageReady }}
    >
      {children}
    </PageTransitionContext.Provider>
  );
}

export function usePageTransition() {
  const context = useContext(PageTransitionContext);
  if (!context) {
    throw new Error(
      "usePageTransition must be used within PageTransitionProvider"
    );
  }
  return context;
}

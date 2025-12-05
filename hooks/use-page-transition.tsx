"use client";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { useRouter, usePathname } from "next/navigation";
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
  const [targetPath, setTargetPath] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const navigateWithTransition = useCallback(
    (href: string) => {
      // Prevent multiple rapid navigations
      if (isTransitioning) {
        console.log("Navigation already in progress, ignoring");
        return;
      }

      console.log("Starting transition to:", href);
      setIsTransitioning(true);
      setIsPageReady(false);
      setTargetPath(href);

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
    [router, isTransitioning]
  );

  const markPageReady = useCallback(() => {
    console.log("Page marked as ready");
    setIsPageReady(true);
    // Keep transition active for reveal animation, then reset
    setTimeout(() => {
      console.log("Transition complete");
      setIsTransitioning(false);
      setTargetPath(null);
    }, 1700); // Match actual animation duration (0.4 + 0.5 + 0.8 = 1.7s)
  }, []);

  // Detect when route actually changes and mark page ready
  useEffect(() => {
    if (targetPath && pathname === targetPath) {
      console.log("Route changed to target:", pathname);
      // Route has changed, wait a bit for content to render
      const timer = setTimeout(() => {
        markPageReady();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [pathname, targetPath, markPageReady]);

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

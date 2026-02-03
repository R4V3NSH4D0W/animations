"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ScrollSmoother } from "gsap/ScrollSmoother";

interface PageTransitionContextType {
  isTransitioning: boolean; // Are we in the transition lifecycle?
  shouldReveal: boolean; // Has the route loaded? (Time to play exit animation)
  onTransitionComplete: () => void; // Reset everything
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
  const [shouldReveal, setShouldReveal] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Watch for route changes to signal 'Ready to Reveal'
  useEffect(() => {
    if (isTransitioning) {
      // New route detected!
      // Small delay to ensure render painted? Or immediate.
      setShouldReveal(true);

      // Scroll to top logic
      const smoother = ScrollSmoother.get();
      if (smoother) {
        smoother.scrollTo(0, false);
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [pathname, searchParams]);

  const onTransitionComplete = () => {
    setIsTransitioning(false);
    setShouldReveal(false);
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (!anchor) return;
      if (anchor.target === "_blank") return;
      if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Check if it's a local link
      if (href.startsWith("/") || href.startsWith(window.location.origin)) {
        // Prevent default if it's the same page
        const targetUrl = new URL(href, window.location.origin);
        if (
          targetUrl.pathname === window.location.pathname &&
          targetUrl.search === window.location.search
        ) {
          return;
        }

        // START Transition
        setShouldReveal(false);
        setIsTransitioning(true);
        // Note: We don't preventDefault here anymore.
        // We let Next.js Link handle the navigation naturally.
        // Our 'isTransitioning' state will trigger the "Enter" animation immediately.
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <PageTransitionContext.Provider
      value={{ isTransitioning, shouldReveal, onTransitionComplete }}
    >
      {children}
    </PageTransitionContext.Provider>
  );
}

export function usePageTransition() {
  const context = useContext(PageTransitionContext);
  if (!context) {
    throw new Error(
      "usePageTransition must be used within PageTransitionProvider",
    );
  }
  return context;
}

"use client";
import { useState, useEffect } from "react";
import SplashScreen from "./shared/splash-screen";
import SmoothScrollWrapper from "./shared/smooth-scroll-wrapper";
import Navbar from "./navigation/navbar";
import {
  PageTransitionProvider,
  usePageTransition,
} from "../hooks/use-page-transition";
import PageTransitionSplash from "./shared/page-transition-splash";
import Footer from "./footer";

function ClientLayoutContent({ children }: { children: React.ReactNode }) {
  const [splashComplete, setSplashComplete] = useState(false);
  const { isTransitioning, markPageReady } = usePageTransition();

  // Mark page as ready after content is rendered and images/resources loaded
  useEffect(() => {
    if (splashComplete && !isTransitioning) {
      return; // No transition in progress
    }

    if (isTransitioning) {
      // Wait for content to be ready
      const timer = setTimeout(() => {
        // You can add more sophisticated checks here (images loaded, etc.)
        markPageReady();
      }, 100); // Small delay to ensure DOM is rendered

      return () => clearTimeout(timer);
    }
  }, [isTransitioning, splashComplete, markPageReady]);

  return (
    <>
      <SplashScreen duration={2000} onComplete={() => setSplashComplete(true)}>
        {/* Optional: Add logo or text on black screen */}
        <div className="text-white text-6xl font-bold">PORTFOLIO</div>
      </SplashScreen>

      <PageTransitionSplash isTransitioning={isTransitioning} />

      {/* Only render content after splash is complete */}
      {splashComplete && (
        <>
          <Navbar />
          <SmoothScrollWrapper>
            <div style={{ opacity: 1, transition: "opacity 0.2s" }}>
              {children}
            </div>
            <Footer />
          </SmoothScrollWrapper>
        </>
      )}
    </>
  );
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageTransitionProvider>
      <ClientLayoutContent>{children}</ClientLayoutContent>
    </PageTransitionProvider>
  );
}

"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import SplashScreen from "./shared/splash-screen";
import SmoothScrollWrapper from "./shared/smooth-scroll-wrapper";
import Navbar from "./navigation/navbar";
import {
  PageTransitionProvider,
  usePageTransition,
} from "../hooks/use-page-transition";
import PageTransitionSplash from "./shared/page-transition-splash";
import Footer from "./footer";
import { CursorProvider } from "./wrappers/cursor-wrapper";

function ClientLayoutContent({ children }: { children: React.ReactNode }) {
  const [splashComplete, setSplashComplete] = useState(false);
  const { isTransitioning } = usePageTransition();
  const pathname = usePathname();

  // Get page-specific quote based on current route
  const getPageQuote = () => {
    switch (pathname) {
      case "/":
        return "Beauty in every detail";
      case "/about":
        return "Crafting experiences, building brands";
      case "/works":
        return "Where creativity meets excellence";
      case "/services":
        return "Transforming visions into reality";
      case "/contact":
        return "Let's create something together";
      default:
        return "Welcome";
    }
  };

  // This effect is no longer needed - route change detection moved to context
  // The context will call markPageReady() when pathname actually changes

  return (
    <>
      <SplashScreen duration={1200} onComplete={() => setSplashComplete(true)}>
        {/* Optional: Add logo or text on black screen */}
        <div className="text-white text-6xl font-bold">PORTFOLIO</div>
      </SplashScreen>

      <PageTransitionSplash text={getPageQuote()} />

      {/* Only render content after splash is complete */}
      {splashComplete && (
        <>
          <CursorProvider>
            <Navbar />
            <SmoothScrollWrapper>
              <div
                style={{
                  position: "relative",
                }}
              >
                {/* Temporary background during transition */}
                {isTransitioning && (
                  <div
                    className="bg-gray-100"
                    style={{
                      position: "fixed",
                      inset: 0,
                      zIndex: 9998,
                    }}
                  />
                )}
                {children}
              </div>
              <Footer />
            </SmoothScrollWrapper>
          </CursorProvider>
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

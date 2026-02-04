"use client";
import { useState, useEffect, Suspense } from "react";
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

  const getPageQuote = () => {
    if (pathname.startsWith("/works/")) {
      return "Behind the Code";
    }

    switch (pathname) {
      case "/":
        return "Beauty in every detail";
      case "/about":
        return "Crafting experiences, building brands";
      case "/works":
        return "Where creativity meets excellence";
      case "/expertise":
        return "Mastering the Craft";
      case "/services":
        return "Transforming visions into reality";
      case "/contact":
        return "Let's create something together";
      default:
        return "Welcome";
    }
  };

  return (
    <>
      <SplashScreen duration={1200} onComplete={() => setSplashComplete(true)}>
        <div className="text-white text-6xl font-bold">PORTFOLIO</div>
      </SplashScreen>

      <PageTransitionSplash text={getPageQuote()} />
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
    <Suspense fallback={null}>
      <PageTransitionProvider>
        <ClientLayoutContent>{children}</ClientLayoutContent>
      </PageTransitionProvider>
    </Suspense>
  );
}

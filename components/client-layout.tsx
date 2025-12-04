"use client";
import { useRef, useState } from "react";
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
  const { isTransitioning } = usePageTransition();

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

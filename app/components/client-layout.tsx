"use client";
import { useState } from "react";
import SplashScreen from "./shared/splash-screen";
import SmoothScrollWrapper from "./shared/smooth-scroll-wrapper";
import Navbar from "./navigation/navbar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [splashComplete, setSplashComplete] = useState(false);

  return (
    <>
      <SplashScreen duration={2000} onComplete={() => setSplashComplete(true)}>
        {/* Optional: Add logo or text on black screen */}
        <div className="text-white text-6xl font-bold">LUXSTORE</div>
      </SplashScreen>

      {/* Only render content after splash is complete */}
      {splashComplete && (
        <>
          <Navbar />
          <SmoothScrollWrapper speed={1.2}>
            <div style={{ opacity: 1, transition: "opacity 0.2s" }}>
              {children}
            </div>
          </SmoothScrollWrapper>
        </>
      )}
    </>
  );
}

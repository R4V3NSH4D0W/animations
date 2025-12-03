"use client";
import { useGSAP } from "@gsap/react";
import gsap, { ScrollSmoother } from "gsap/all";
import React, { useRef } from "react";

gsap.registerPlugin(ScrollSmoother);

interface SmoothScrollWrapperProps {
  children: React.ReactNode;
}

function SmoothScrollWrapper({ children }: SmoothScrollWrapperProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!wrapperRef.current || !contentRef.current) return;
    if (typeof window === "undefined") return;

    if (ScrollSmoother.get()) ScrollSmoother.get()?.kill();
    ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      smooth: 1.5,
      effects: true,
    });
  });

  return (
    <div ref={wrapperRef} id="smooth-wrapper">
      <div ref={contentRef} id="smooth-content">
        {children}
      </div>
    </div>
  );
}

export default SmoothScrollWrapper;

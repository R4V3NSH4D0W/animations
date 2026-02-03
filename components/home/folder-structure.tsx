"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger, ScrollToPlugin } from "gsap/all";
import { useGSAP } from "@gsap/react";
import DiagonalShape from "@/lib/diagonal-shape";
import { ArrowRight } from "lucide-react";
import FeaturedWork from "../work/featured-work";
import { useMedia } from "react-use";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function FolderStructure() {
  const containerRef = useRef<HTMLDivElement>(null);
  const firstRef = useRef<HTMLDivElement>(null);
  const secondRef = useRef<HTMLDivElement>(null);
  const thirdRef = useRef<HTMLDivElement>(null);

  // Disable pinning completely on mobile to prevent shake and overlap
  const isDesktop = useMedia("(min-width: 769px)", false);

  useGSAP(
    () => {
      // Only run pinning on desktop - mobile will have normal scroll
      if (!isDesktop) return;

      // PINNING THE 3 COLUMNS - all triggered by the container to align at same position
      const scrollTriggerConfig = {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      };

      // Pin first element
      ScrollTrigger.create({
        ...scrollTriggerConfig,
        trigger: firstRef.current,
        start: "top 11.8%",
        end: () => `+=${window.innerHeight * 2}`,
        pin: true,
        pinSpacing: false,
      });

      // Pin second element
      ScrollTrigger.create({
        ...scrollTriggerConfig,
        trigger: secondRef.current,
        start: "top 11.8%",
        end: () => `+=${window.innerHeight * 1}`,
        pin: true,
        pinSpacing: false,
      });

      // Pin third element
      ScrollTrigger.create({
        ...scrollTriggerConfig,
        trigger: thirdRef.current,
        start: "top 1%",
        end: () => `+=${window.innerHeight * 0.001}`,
        pin: true,
      });
    },
    { scope: containerRef, dependencies: [isDesktop] },
  );
  return (
    <div ref={containerRef} className="  my-10 ">
      <div ref={firstRef}>
        <div className="hidden lg:block">
          <div className=" flex flex-row absolute -top-9  z-1 right-10">
            <div
              className=" h-10 w-[300px] bg-black flex items-center px-2 cursor-pointer hover:bg-neutral-800 transition-colors"
              onClick={() => {
                const target = document.querySelector("#all-projects");
                if (target) {
                  gsap.to(window, {
                    duration: 1.5,
                    scrollTo: {
                      y: target,
                      offsetY: 20,
                    },
                    ease: "power3.inOut",
                  });
                }
              }}
            >
              <span className=" text-white uppercase">See All works</span>
              <ArrowRight className=" text-white ml-2" size={16} />
            </div>
            <DiagonalShape className="w-10 h-10 text-black" />
          </div>
        </div>
        <div className="w-full h-auto lg:min-h-screen relative z-10 bg-white">
          <div className=" flex flex-row absolute -top-9">
            <div className=" h-10 w-[300px] lg:w-[400px] flex items-center px-4 lg:justify-center bg-white">
              <span className=" uppercase font-medium">Featured Work 1</span>
            </div>
            <DiagonalShape className="w-10 h-10 text-white " />
          </div>
          <FeaturedWork
            title="Luxstore Dashboard"
            date="2025"
            subTitle="ECOMMERCE ADMIN"
            marquee="Next.js TypeScript Tailwind Shadcn React Query"
            description="A comprehensive ecommerce dashboard application managing global state and providing administration capabilities."
            mainImageURL="/assets/dashboard/dashboard-home.png"
            sideImageURLs={[
              "/assets/dashboard/collection-dashboard.png",
              "/assets/dashboard/dashboard-product.png",
            ]}
          />
        </div>
      </div>
      <div
        ref={secondRef}
        className="w-full h-auto lg:min-h-screen z-20  relative bg-orange-200"
      >
        <div className=" flex flex-row absolute -top-9 left-0 lg:left-[25%]">
          <div className=" h-10 w-[300px] lg:w-[400px] flex items-center px-4 lg:justify-center bg-orange-200">
            <span className=" uppercase font-medium">Featured Work 2</span>
          </div>
          <DiagonalShape className="w-10 h-10 text-orange-200 " />
        </div>
        <FeaturedWork
          title="Luxstore Web Version"
          date="2025"
          subTitle="CONSUMER STOREFRONT"
          marquee="Next.js 16 TypeScript GSAP Stripe Zustand"
          description="The consumer-facing web storefront offering a premium user experience with smooth scrolling and sophisticated animations."
          mainImageURL="/assets/web/web-home.png"
          sideImageURLs={[
            "/assets/web/web-all-product.png",
            "/assets/web/Screenshot 2026-02-03 at 3.27.54 PM.png",
          ]}
        />
      </div>
      <div
        ref={thirdRef}
        className="w-full h-auto lg:min-h-screen z-20 relative bg-purple-100"
      >
        <div className=" flex flex-row absolute -top-9 left-0 lg:left-[50%]">
          <div className=" h-10 w-[300px] lg:w-[400px] flex items-center px-4 lg:justify-center bg-purple-100">
            <span className=" uppercase font-medium">Featured Work 3</span>
          </div>
          <DiagonalShape className="w-10 h-10 text-purple-100 " />
        </div>
        <FeaturedWork
          title="Luxstore Mobile App"
          date="2025"
          subTitle="CROSS-PLATFORM APP"
          marquee="React Native Expo TypeScript Stripe TanStack Query"
          description="A cross-platform mobile application delivering a native shopping experience on Android and iOS."
          mainImageURL="/assets/app/android.png"
          sideImageURLs={["/assets/app/android.png", "/assets/app/android.png"]}
        />
      </div>
    </div>
  );
}

export default FolderStructure;

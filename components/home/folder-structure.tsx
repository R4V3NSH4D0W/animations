"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import DiagonalShape from "@/lib/diagonal-shape";
import { ArrowRight } from "lucide-react";
import Marquee from "react-fast-marquee";
import FeaturedWork from "../work/featured-work";

gsap.registerPlugin(ScrollTrigger);

function FolderStructure() {
  const containerRef = useRef<HTMLDivElement>(null);
  const firstRef = useRef<HTMLDivElement>(null);
  const secondRef = useRef<HTMLDivElement>(null);
  const thirdRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
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
        start: "top 10%",
        end: () => `+=${window.innerHeight * 2}`, // stays pinned for 2 screen heights
        pin: true,
        pinSpacing: false,
        // markers: true,
      });

      // Pin second element
      ScrollTrigger.create({
        ...scrollTriggerConfig,
        trigger: secondRef.current,
        start: "top 10%",
        end: () => `+=${window.innerHeight}`, // stays pinned for 1 screen height
        pin: true,
        pinSpacing: false,
        // markers: true,
      });

      // Pin third element
      ScrollTrigger.create({
        ...scrollTriggerConfig,
        trigger: thirdRef.current,
        start: "top 10%",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
        // markers: true,
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="  my-10 ">
      <div ref={firstRef}>
        <div className=" flex flex-row absolute -top-9  z-1 right-10">
          <div className=" h-10 w-[300px] bg-black flex items-center px-2 ">
            <span className=" text-white uppercase">See All works</span>
            <ArrowRight className=" text-white ml-2" size={16} />
          </div>
          <DiagonalShape className="w-10 h-10 text-black" />
        </div>
        <div className=" w-full h-screen relative z-10 bg-white ">
          <div className=" flex flex-row absolute -top-9">
            <div className=" h-10 w-[400px] flex items-center justify-center bg-white">
              <span className=" uppercase font-medium">Featured Work 1</span>
            </div>
            <DiagonalShape className="w-10 h-10 text-white " />
          </div>
          <FeaturedWork
            title="Into the Abyss: 3D Character & Environment Animation"
            date="2025"
            subTitle="3D TEACH WORK"
            marquee="ANIMATION 3d React typescript next.js Gsap"
            description="Developed a 3D animated character and environment with a deep-sea diver theme, executing the full 3D animation pipeline, including concept development, modeling, texturing, rigging, and animation."
            mainImageURL="https://i.pinimg.com/1200x/68/75/95/68759538dfb2ec534800842bbd2b8369.jpg"
            sideImageURLs={[
              "https://i.pinimg.com/1200x/0e/31/59/0e31594f7e6b74bcce6e0fe720593e6e.jpg",
              "https://i.pinimg.com/736x/2e/0b/d9/2e0bd91bef3c8cc83406f4f51b29edb5.jpg",
            ]}
          />
        </div>
      </div>
      <div
        ref={secondRef}
        className=" w-full h-screen z-20 relative bg-orange-200 "
      >
        <div className=" flex flex-row absolute -top-9 left-[25%]">
          <div className=" h-10 w-[400px] flex items-center justify-center bg-orange-200">
            <span className=" uppercase font-medium">Featured Work 2</span>
          </div>
          <DiagonalShape className="w-10 h-10 text-orange-200 " />
        </div>
        <FeaturedWork
          title="Galactic Odyssey: Sci-Fi Environment & Spaceship Design"
          date="2024"
          subTitle="SPACE THEME PROJECT"
          marquee="3D Modeling Blender React Three.js Animation"
          description="Created a futuristic galactic environment with spaceships, using Blender for modeling and texturing, and React Three.js for interactive display and animation."
          mainImageURL="https://i.pinimg.com/736x/9c/a7/ab/9ca7abc9b83bff5645a3cef336f94f3c.jpg"
          sideImageURLs={[
            "https://i.pinimg.com/1200x/e0/3e/64/e03e64e13070d12899133baa4c904412.jpg",
            "https://i.pinimg.com/1200x/a7/6f/eb/a76febc8e216d534ac77a69f24178db2.jpg",
          ]}
        />
      </div>
      <div
        ref={thirdRef}
        className=" w-full h-screen z-20 relative bg-purple-100 "
      >
        <div className=" flex flex-row absolute -top-9 left-[52%]">
          <div className=" h-10 w-[400px] flex items-center justify-center bg-purple-100">
            <span className=" uppercase font-medium">Featured Work 3</span>
          </div>
          <DiagonalShape className="w-10 h-10 text-purple-100 " />
        </div>
        <FeaturedWork
          title="Urban Vibes: Architectural Visualization"
          date="2023"
          subTitle="ARCHITECTURE PROJECT"
          marquee="3D Rendering SketchUp React Next.js GSAP"
          description="Produced a photorealistic urban architectural visualization including buildings, streets, and dynamic lighting, implementing 3D rendering and animation pipelines for client presentations."
          mainImageURL="https://i.pinimg.com/1200x/b3/a6/28/b3a6287a77b46a1595cb345b8c849c78.jpg"
          sideImageURLs={[
            "https://i.pinimg.com/1200x/87/e7/2b/87e72b6f2efc9fb6e78113cbb300b29f.jpg",
            "https://i.pinimg.com/1200x/13/7c/dc/137cdcd34ae5d90c361a40c890e2cde4.jpg",
          ]}
        />
      </div>
    </div>
  );
}

export default FolderStructure;

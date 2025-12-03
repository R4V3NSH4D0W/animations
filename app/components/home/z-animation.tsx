"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

function ZAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const blanketRef = useRef<HTMLDivElement>(null);

  const firstRef = useRef<HTMLDivElement>(null);
  const secondRef = useRef<HTMLDivElement>(null);
  const thirdRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = [firstRef.current, secondRef.current, thirdRef.current];

      // 1. PINNING THE 3 COLUMNS
      items.forEach((item) => {
        if (!item) return;

        ScrollTrigger.create({
          trigger: item,
          start: "top 10%", // Pin when it hits top

          // CRITICAL: They stay pinned until the Blanket has fully covered them.
          // We use the blanket's trigger to determine the end.
          endTrigger: blanketRef.current,
          end: "bottom bottom",

          pin: true,
          pinSpacing: false, // Allows the blanket to scroll UP over them without pushing them down
          // markers: true,
        });
      });

      // 2. THE BLANKET ANIMATION (Optional "Slow" Effect)
      // By default, the blanket scrolls at normal speed.
      // If you want it to move "slowly" or have a parallax feel, we animate its y-position.
      if (blanketRef.current) {
        gsap.from(blanketRef.current, {
          y: 100, // Starts a bit lower (optional parallax feel)
          ease: "none",
          scrollTrigger: {
            trigger: blanketRef.current,
            start: "top bottom", // Start when top of blanket enters viewport
            end: "top top", // End when top of blanket hits top of viewport
            scrub: true,
          },
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative">
      {/* --- LAYER 1: THE PINNED ITEMS (Z-0) --- */}
      {/* We use z-0 so the blanket (z-10) can cover them */}
      <div className="flex flex-row px-10 justify-between items-start relative z-0">
        {/* Red: Starts low */}
        <div
          ref={secondRef}
          className="relative h-[500px] mt-[100vh]  w-[28%] r overflow-hidden flex justify-start"
        >
          {/* Image wrapper with fixed height */}
          <div className="relative w-[50%] h-[350px]">
            <Image
              src="https://i.pinimg.com/736x/97/da/a0/97daa081bff94a6b032e1538b0407f12.jpg"
              alt="Red Image"
              fill
              className="object-cover "
            />
          </div>
        </div>

        {/* Blue: Starts high */}
        <div
          ref={firstRef}
          className="relative h-[750px] mt-[10vh]  w-[36%]  overflow-hidden flex flex-col"
        >
          {/* Image container */}
          <div className="relative w-full h-[600px]">
            <Image
              src="https://i.pinimg.com/1200x/b1/2a/4b/b12a4bd6a36f48c14157e595992d1a46.jpg"
              alt="Blue Image"
              fill
              className="object-cover"
            />
          </div>

          {/* Text */}
          <p className="p-4 text-xl uppercase border-t-2 border-white">
            Social, influence, commerce – built to work together, designed to
            move your brand forward.
          </p>
        </div>

        {/* Green: Starts lowest */}
        <div
          ref={thirdRef}
          className="h-[600px] mt-[200vh] relative  w-[28%] rounded-xl flex justify-end items-end"
        >
          <div className="relative w-[50%] h-[350px]">
            <Image
              src="https://i.pinimg.com/736x/55/c4/d0/55c4d0f567c9f938bf719d6390975a89.jpg"
              alt="Red Image"
              fill
              className="object-cover "
            />
          </div>
        </div>
      </div>

      {/* --- LAYER 2: THE BLANKET (Z-10) --- */}

      {/* SPACER: Because we used pinSpacing: false above, the layout collapses. 
          We need margin or a spacer to push the blanket down so it starts 
          AFTER the green box's original position. 
          
          Logic: The green box has 70vh margin + 500px height. 
          We roughly need 100vh of spacing to clear the initial view.
      */}
      <div className="h-[50vh]"></div>

      <div
        ref={blanketRef}
        className="relative z-10 w-full min-h-screen bg-white"
      >
        <div className=" text-center py-10">
          <h2 className=" uppercase font-bold text-sm">
            We <br /> ARE BRand
          </h2>
          <p className="text-center text-[62px] font-light leading-[100%] mt-10">
            Social-first, beauty-fluent,
            <br /> influence-led.
          </p>
          <video
            className="w-full h-fit object-cover p-10"
            loop
            autoPlay
            muted
            playsInline
            src="/video/Fashion Promo Opener Template - Renderforest (1080p, h264).mp4"
          />
        </div>
      </div>
    </div>
  );
}

export default ZAnimation;

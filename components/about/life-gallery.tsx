"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { aboutPageData } from "@/data/site-data";

export default function LifeGallery() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeInnerRef = useRef<HTMLDivElement>(null);

  // Collect all available images from data
  const images = [
    aboutPageData.profile.image,
    ...aboutPageData.achievements.map((a) => a.image),
    ...aboutPageData.education.map((e) => e.image),
    ...aboutPageData.recognitions.map((r) => r.image),
  ].filter(Boolean); // Ensure no nulls

  useEffect(() => {
    if (!marqueeInnerRef.current) return;

    // Clone content for seamless loop
    const content = marqueeInnerRef.current.innerHTML;
    marqueeInnerRef.current.innerHTML = content + content;

    const el = marqueeInnerRef.current;

    // Animate
    gsap.to(el, {
      x: "-50%",
      duration: 30,
      ease: "none",
      repeat: -1,
    });
  }, []);

  if (images.length === 0) return null;

  return (
    <section className="w-full py-24 bg-white overflow-hidden flex flex-col gap-8">
      <div className="px-6 md:px-12 flex flex-col md:flex-row justify-between items-end gap-4">
        <h2 className="font-serif italic text-4xl md:text-5xl leading-tight">
          Life in Pixels.
        </h2>
        <p className="text-sm md:text-base text-neutral-600 max-w-sm">
          Snapshots of my journey, milestones, and the moments that matter.
        </p>
      </div>

      <div ref={marqueeRef} className="relative w-full overflow-hidden">
        <div ref={marqueeInnerRef} className="flex gap-6 w-max px-4">
          {images.map((src, idx) => (
            <div
              key={idx}
              className="relative w-[300px] h-[400px] md:w-[400px] md:h-[500px] flex-shrink-0 rounded-lg overflow-hidden grayscale hover:grayscale-0 transition-all duration-500"
            >
              <Image
                src={src}
                alt={`Life gallery ${idx}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

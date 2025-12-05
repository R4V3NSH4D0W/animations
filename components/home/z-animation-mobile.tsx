"use client";

import Image from "next/image";
import ScrollReveal from "../shared/scroll-reveal";
import AnimateIn from "../shared/animate-in";

export default function ZAnimationMobile() {
  return (
    <div className="relative px-4 py-12 space-y-12 overflow-hidden">
      {/* Image 1 - Animate from left */}
      <AnimateIn direction="left" resetOnExit blur>
        <div className="relative w-1/2 h-[220px]">
          <Image
            src="https://i.pinimg.com/736x/97/da/a0/97daa081bff94a6b032e1538b0407f12.jpg"
            alt="Image 1"
            fill
            className="object-cover"
          />
        </div>
      </AnimateIn>

      {/* Image 2 - Animate from right */}
      <AnimateIn direction="right" resetOnExit blur>
        <div className="relative w-full justify-end items-end flex">
          <div className="relative w-[60%] h-[300px]">
            <Image
              src="https://i.pinimg.com/1200x/b1/2a/4b/b12a4bd6a36f48c14157e595992d1a46.jpg"
              alt="Image 2"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </AnimateIn>

      {/* Image 3 - Animate from left */}
      <AnimateIn direction="left" resetOnExit blur>
        <div className="relative w-1/2 h-[220px]">
          <Image
            src="https://i.pinimg.com/736x/55/c4/d0/55c4d0f567c9f938bf719d6390975a89.jpg"
            alt="Image 3"
            fill
            className="object-cover"
          />
        </div>
      </AnimateIn>

      {/* Blanket section with scroll reveal */}
      <div className="relative w-full rounded-lg">
        <div className="text-center py-8 ">
          <ScrollReveal
            enableBlur={true}
            baseOpacity={0.05}
            baseRotation={0}
            blurStrength={4}
            staggerDelay={0.08}
            textClassName="font-bold text-xs text-center uppercase"
            size="sm"
          >
            We ARE BRand
          </ScrollReveal>

          <div className="mt-6">
            <ScrollReveal
              enableBlur={true}
              baseOpacity={0.05}
              baseRotation={0}
              blurStrength={6}
              staggerDelay={0.1}
              textClassName="font-light text-center text-3xl"
              size="lg"
            >
              Social-first, beauty-fluent, influence-led.
            </ScrollReveal>
          </div>

          <AnimateIn direction="up" resetOnExit blur delay={0.2}>
            <video
              className="w-full h-fit object-cover mt-6 "
              loop
              autoPlay
              muted
              playsInline
              src="/video/Fashion Promo Opener Template - Renderforest (1080p, h264).mp4"
            />
          </AnimateIn>
        </div>
      </div>
    </div>
  );
}

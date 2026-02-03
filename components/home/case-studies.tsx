"use client";

import { ArrowRight } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import ImageCard from "../shared/image-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useCursor } from "../wrappers/cursor-wrapper";
import { useCursorEffect } from "@/hooks/use-cursor-effect";

const data = [
  {
    imageURL:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    title: "E-Commerce Platform",
    launch: "Next.js • TypeScript",
  },
  {
    imageURL:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=2574&auto=format&fit=crop",
    title: "Mobile Banking App",
    launch: "React Native • Expo",
  },
  {
    imageURL:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
    title: "Analytics Dashboard",
    launch: "React • Node.js",
  },
];

function CaseStudies() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const firstItemRef = useRef<HTMLDivElement>(null);
  useCursorEffect(firstItemRef, "middleFinger");

  return (
    <section className="flex flex-col mx-4 sm:mx-6 md:mx-8 lg:mx-10 my-8 sm:my-10 md:my-12 lg:my-16">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <span className="text-xs sm:text-sm font-medium uppercase">
          Featured Projects
        </span>
        <div className="flex flex-row items-center gap-3 sm:gap-5 cursor-pointer hover:gap-4 sm:hover:gap-6 transition-all">
          <span className="uppercase text-xs sm:text-sm">
            View All Projects
          </span>
          <ArrowRight size={16} className="shrink-0" />
        </div>
      </div>

      {/* Mobile Carousel */}
      <div className="md:hidden mt-6 sm:mt-8">
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {data.map((item, index) => (
              <CarouselItem key={index}>
                <div className="px-2">
                  <ImageCard
                    imageURL={item.imageURL}
                    title={item.title}
                    launch={item.launch}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {data.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === current
                  ? "bg-foreground w-8"
                  : "bg-foreground/30 hover:bg-foreground/50 w-2"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 mt-6 sm:mt-8 md:mt-10">
        {data.map((item, index) => (
          <div key={index} ref={index === 0 ? firstItemRef : null}>
            <ImageCard
              imageURL={item.imageURL}
              title={item.title}
              launch={item.launch}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default CaseStudies;

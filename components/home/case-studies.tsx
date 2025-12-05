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
      "https://i.pinimg.com/736x/56/ad/87/56ad87a78a95729abf04f56a14b379eb.jpg",
    title: "E-Commerce Platform",
    launch: "Fashion Store Growth",
  },
  {
    imageURL:
      "https://i.pinimg.com/736x/97/da/a0/97daa081bff94a6b032e1538b0407f12.jpg",
    title: "Fintech Dashboard",
    launch: "Data Visualization",
  },
  {
    imageURL:
      "https://i.pinimg.com/1200x/b1/2a/4b/b12a4bd6a36f48c14157e595992d1a46.jpg",
    title: "Portfolio v1",
    launch: "Experimental Design",
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
          Recent Works
        </span>
        <div className="flex flex-row items-center gap-3 sm:gap-5 cursor-pointer hover:gap-4 sm:hover:gap-6 transition-all">
          <span className="uppercase text-xs sm:text-sm">View More Work</span>
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

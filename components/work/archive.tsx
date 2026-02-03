"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { allProjectsData } from "@/data/site-data";

function Archive() {
  const [visibleCount, setVisibleCount] = useState(15);
  const totalItems = allProjectsData.items.length;
  const visibleItems = allProjectsData.items.slice(0, visibleCount);
  const hasMore = visibleCount < totalItems;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 15);
  };

  return (
    <div
      id="all-projects"
      className="my-6 sm:my-8 md:my-10 mx-4 sm:mx-6 md:mx-8 lg:mx-10"
    >
      <div className="flex flex-col md:flex-row gap-4 md:gap-0">
        <span className="text-3xl sm:text-4xl md:text-5xl w-full md:w-[30%] lg:w-[20%] font-medium">
          {allProjectsData.title}
        </span>
        <div className="w-full flex justify-start md:justify-center">
          <span className="text-sm sm:text-base uppercase max-w-lg text-gray-700">
            {allProjectsData.description}
          </span>
        </div>
      </div>
      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 
            auto-rows-[150px] sm:auto-rows-[180px] md:auto-rows-[200px] lg:auto-rows-[220px] 
            mt-6 sm:mt-8 md:mt-10
            border border-dashed border-neutral-400 
            divide-x divide-y divide-dashed divide-neutral-400"
      >
        {visibleItems.map((item, index) => {
          const content = (
            <div className="p-3 sm:p-4 md:p-5 relative w-full h-full">
              {/* Number Top Left */}
              <span className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4 text-xs sm:text-sm z-10 font-bold bg-white/70 px-1">
                {index + 1}
              </span>

              <Image
                src={item.src}
                alt={`archive image ${index + 1}`}
                fill
                className="object-cover aspect-square transition-transform duration-300 p-3 sm:p-4 md:p-5 hover:rotate-3"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 16vw, 12.5vw"
              />
            </div>
          );

          const href =
            item.link ||
            (item.isFeatured && item.id ? `/works/${item.id}` : undefined);
          const isExternal = !!item.link;

          if (href) {
            return (
              <Link
                key={index}
                href={href}
                target={isExternal ? "_blank" : undefined}
                className="block w-full h-full cursor-pointer"
              >
                {content}
              </Link>
            );
          } else {
            return (
              <div key={index} className="w-full h-full">
                {content}
              </div>
            );
          }
        })}

        {/* SEE MORE BOX */}
        {hasMore && (
          <div
            onClick={handleLoadMore}
            className="p-3 sm:p-4 md:p-5 relative flex items-center justify-center cursor-pointer group"
          >
            <div className="w-full h-full bg-yellow-400 text-white rounded-md flex flex-col sm:flex-row gap-1 sm:gap-2 items-center justify-center group-hover:bg-yellow-400/80 transition">
              <span className="text-xs font-semibold uppercase text-center">
                {allProjectsData.seeMoreText}
              </span>
              <ArrowRight size={16} className="hidden sm:block" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Archive;

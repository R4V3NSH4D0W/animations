"use client";
import React from "react";
import Image from "next/image";

interface HoverContentProps {
  hoveredItem: {
    image?: string;
    description?: string;
    details?: string;
  } | null;
  hoverContentRef: React.RefObject<HTMLDivElement | null>;
}

export const HoverContent = ({
  hoveredItem,
  hoverContentRef,
}: HoverContentProps) => (
  <div
    className="sticky top-[20%] p-2 max-h-[calc(100vh-2rem)] overflow-y-auto"
    ref={hoverContentRef}
  >
    {hoveredItem ? (
      <div className="flex flex-col gap-2 bg-[#D9D9D9] rounded px-4">
        {hoveredItem.image && (
          <div className="h-[300px] w-full relative">
            <Image
              src={hoveredItem.image}
              fill
              alt="Preview"
              className="object-cover rounded"
            />
          </div>
        )}
        {hoveredItem.details && (
          <p className="text-xs uppercase">{hoveredItem.details}</p>
        )}
      </div>
    ) : (
      <div className="h-[400px]" />
    )}
  </div>
);

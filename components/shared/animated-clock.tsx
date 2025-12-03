"use client";
import { useWorldTime } from "@/hooks/use-time";
import { Clock9 } from "lucide-react";
import React from "react";

function AnimatedClock() {
  const {
    oldRef,
    newRef,
    oldTimeRef,
    newTimeRef,
    currentCity,
    currentTime,
    nextCity,
    nextTime,
  } = useWorldTime({
    rotateInterval: 10000,
    flipDuration: 600,
  });

  return (
    <div className="flex items-center justify-end gap-2 font-medium text-sm">
      <div className="relative w-8 h-6 overflow-hidden">
        <div ref={oldRef} className="absolute w-full text-right">
          <span>{currentCity.short}</span>
        </div>
        <div ref={newRef} className="absolute w-full text-right">
          <span>{nextCity.short}</span>
        </div>
      </div>

      <Clock9 size={18} />

      <div className="relative w-20 h-6 overflow-hidden">
        <div ref={oldTimeRef} className="absolute w-full text-left">
          <span>{currentTime}</span>
        </div>
        <div ref={newTimeRef} className="absolute w-full text-left">
          <span>{nextTime}</span>
        </div>
      </div>
    </div>
  );
}

export default AnimatedClock;

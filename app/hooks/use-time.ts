"use client";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

interface City {
  short: string;
  long: string;
  offset: number;
}

interface UseWorldTimeProps {
  rotateInterval?: number;
  flipDuration?: number;
}

export function useWorldTime({ rotateInterval = 10000, flipDuration = 600 }: UseWorldTimeProps = {}) {
  const cities: City[] = [
    { short: "NP", long: "Nepal", offset: 5 * 60 + 45 },
    { short: "LA", long: "Los Angeles", offset: -8 * 60 },
    { short: "MIA", long: "Miami", offset: -5 * 60 },
    { short: "TKY", long: "Tokyo", offset: 9 * 60 },
    { short: "LDN", long: "London", offset: 0 },
    { short: "NY", long: "New York", offset: -5 * 60 },
    { short: "SYD", long: "Sydney", offset: 10 * 60 },
    { short: "DEL", long: "Delhi", offset: 5 * 60 + 30 },
  ];

  const oldRef = useRef<HTMLDivElement>(null);
  const newRef = useRef<HTMLDivElement>(null);
  const oldTimeRef = useRef<HTMLDivElement>(null);
  const newTimeRef = useRef<HTMLDivElement>(null);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [times, setTimes] = useState({ current: "", next: "" });

  const nextIndex = (currentIndex + 1) % cities.length;

  function getCityTime(index: number): string {
    const city = cities[index];
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const cityTime = new Date(utc + city.offset * 60000);
    const hours = cityTime.getHours();
    const minutes = cityTime.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 === 0 ? 12 : hours % 12;
    return `${displayHours}:${minutes} ${ampm}`;
  }

  // Update times every second for both current and next city
  useEffect(() => {
    const updateTimes = () => {
      setTimes({
        current: getCityTime(currentIndex),
        next: getCityTime(nextIndex),
      });
    };
    
    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, [currentIndex, nextIndex]);

  // Flip animation every rotateInterval
  useEffect(() => {
    // Initial position
    if (oldRef.current && newRef.current && oldTimeRef.current && newTimeRef.current) {
      gsap.set(oldRef.current, { y: 0, opacity: 1 });
      gsap.set(newRef.current, { y: "-100%", opacity: 1 });
      gsap.set(oldTimeRef.current, { y: 0, opacity: 1 });
      gsap.set(newTimeRef.current, { y: "-100%", opacity: 1 });
    }

    const flipInterval = setInterval(() => {
      if (!oldRef.current || !newRef.current || !oldTimeRef.current || !newTimeRef.current) return;

      const tl = gsap.timeline({
        onComplete: () => {
          // After animation, update index FIRST
          setCurrentIndex(nextIndex);
          // Then immediately reset positions without delay
          requestAnimationFrame(() => {
            if (oldRef.current && newRef.current && oldTimeRef.current && newTimeRef.current) {
              gsap.set(oldRef.current, { y: 0, opacity: 1 });
              gsap.set(newRef.current, { y: "-100%", opacity: 1 });
              gsap.set(oldTimeRef.current, { y: 0, opacity: 1 });
              gsap.set(newTimeRef.current, { y: "-100%", opacity: 1 });
            }
          });
        },
      });

      // Old slides down, new slides down from top simultaneously
      tl.to(oldRef.current, {
        y: "100%",
        opacity: 0,
        duration: flipDuration / 1000,
        ease: "power2.inOut",
      }, 0);
      
      tl.to(newRef.current, {
        y: 0,
        opacity: 1,
        duration: flipDuration / 1000,
        ease: "power2.inOut",
      }, 0);

      // Animate time as well
      tl.to(oldTimeRef.current, {
        y: "100%",
        opacity: 0,
        duration: flipDuration / 1000,
        ease: "power2.inOut",
      }, 0);
      
      tl.to(newTimeRef.current, {
        y: 0,
        opacity: 1,
        duration: flipDuration / 1000,
        ease: "power2.inOut",
      }, 0);
    }, rotateInterval);

    return () => clearInterval(flipInterval);
  }, [currentIndex, nextIndex, rotateInterval, flipDuration]);

  return {
    oldRef,
    newRef,
    oldTimeRef,
    newTimeRef,
    currentCity: cities[currentIndex],
    currentTime: times.current,
    nextCity: cities[nextIndex],
    nextTime: times.next,
  };
}

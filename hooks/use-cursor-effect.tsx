"use client";
import { useCursor } from "@/components/wrappers/cursor-wrapper";
import { useEffect } from "react";

export function useCursorEffect(
  ref: React.RefObject<HTMLElement | null>,
  type: string
) {
  const ctx = useCursor();

  useEffect(() => {
    if (!ref.current || !ctx) return;

    const el = ref.current;

    const enter = () => ctx.setCursorType(type);
    const leave = () => ctx.setCursorType("default");

    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);

    return () => {
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
    };
  }, [ref, type, ctx]);
}

import { useState, useEffect, RefObject } from "react";

// Helper: Convert rgb(a) string to hex
const rgbToHex = (rgb: string) => {
  const result = rgb.match(/\d+/g);
  if (!result) return "#000000";
  const r = parseInt(result[0]);
  const g = parseInt(result[1]);
  const b = parseInt(result[2]);
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

// Helper: Pick black or white based on luminance
const getContrastColor = (hex: string) => {
  if (!hex) return "#000000";
  const c = hex.replace("#", "");
  const r = parseInt(c.substr(0, 2), 16);
  const g = parseInt(c.substr(2, 2), 16);
  const b = parseInt(c.substr(4, 2), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#000000" : "#FFFFFF";
};

// Hook: accept possibly null ref
export function useAdaptiveTextColor(ref: RefObject<HTMLElement | null>) {
  const [textColor, setTextColor] = useState("#000000");

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    const style = window.getComputedStyle(el);
    let bgColor = style.backgroundColor;

    // fallback for transparent
    if (bgColor === "transparent" || !bgColor) {
      bgColor = "#ffffff";
    }

    const hex = rgbToHex(bgColor);
    const contrast = getContrastColor(hex);
    setTextColor(contrast);
  }, [ref]);

  return textColor;
}

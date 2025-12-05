"use client";
import React, { useState } from "react";
import { useGsapLineReveal } from "./useGsapLineReveal";

interface AnimatedInputProps {
  label: string;
  placeholder?: string;
  required?: boolean;
  type?: "text" | "email" | "tel" | "textarea";
  name?: string;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  className?: string;
  lineColor?: string;
  focusLineColor?: string;
  lineHeight?: string;
  lineDelay?: number;
  rows?: number;
}

export default function AnimatedInput({
  label,
  placeholder = "",
  required = false,
  type = "text",
  name,
  value,
  onChange,
  className = "",
  lineColor = "black",
  focusLineColor = "#D3D3D3",
  lineHeight = "1px",
  lineDelay = 0.8,
  rows = 4,
}: AnimatedInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const lineRef = useGsapLineReveal({
    fromWidth: 0,
    toWidth: "100%",
    delay: lineDelay,
    backgroundColor: lineColor,
    height: lineHeight,
  });

  return (
    <div className={`flex flex-col ${className}`}>
      <span className="text-xs font-bold font-lora uppercase mb-2">
        {label} {required && "*"}
      </span>
      {type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder.toUpperCase()}
          rows={rows}
          className="bg-transparent outline-none resize-none py-2"
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder.toUpperCase()}
          className="bg-transparent outline-none py-2"
        />
      )}
      <div
        ref={lineRef}
        className="w-full overflow-hidden transition-colors duration-300"
        style={{ backgroundColor: isFocused ? focusLineColor : lineColor }}
      />
    </div>
  );
}

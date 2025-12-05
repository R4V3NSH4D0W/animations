"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

interface CursorContextType {
  setCursorType: (type: string) => void;
}

const CursorContext = createContext<CursorContextType | null>(null);

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorType, setCursorType] = useState("default");
  const [clickActive, setClickActive] = useState(false);

  /* FOLLOW CURSOR */
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!cursorRef.current) return;
      cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  /* CLICK ANIMATION */
  useEffect(() => {
    const click = () => {
      setClickActive(true);
      setTimeout(() => setClickActive(false), 200);
    };
    window.addEventListener("click", click);
    return () => window.removeEventListener("click", click);
  }, []);

  /* CURSOR STYLE BY TYPE */
  const getCursorStyle = () => {
    switch (cursorType) {
      case "middleFinger":
        return {
          width: "70px",
          height: "70px",
          backgroundImage: 'url("/cursors/middlefinger.png")',
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        };

      case "emoji":
        return {
          width: "50px",
          height: "50px",
          fontSize: "40px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        };

      default:
        return;
    }
  };

  return (
    <CursorContext.Provider value={{ setCursorType }}>
      {children}

      {/* CURSOR */}
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          pointerEvents: "none",
          zIndex: 999999,
          //   mixBlendMode: "difference",
          transition: "scale 0.15s ease",
          ...getCursorStyle(),
          scale: clickActive ? 1.4 : 1,
        }}
      >
        {/* ANGRY POP ONLY FOR MIDDLE FINGER */}
        {clickActive && cursorType === "middleFinger" && (
          <span
            style={{
              position: "absolute",
              top: "-30px",
              left: "5px",
              color: "black",
              fontWeight: "900",
              fontSize: "16px",
            }}
          >
            FUCK!
          </span>
        )}
      </div>
    </CursorContext.Provider>
  );
}

export const useCursor = () => {
  const ctx = useContext(CursorContext);
  if (!ctx) throw new Error("useCursor must be used inside CursorProvider");
  return ctx;
};

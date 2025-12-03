"use client";
import { useRef, useState, useEffect } from "react";
import Matter from "matter-js";

interface FallingTextProps {
  text?: string;
  trigger?: "auto" | "scroll" | "click" | "hover";
  backgroundColor?: string;
  wireframes?: boolean;
  gravity?: number;
  mouseConstraintStiffness?: number;
  className?: string;
  disableInteraction?: boolean;
  containerWidth?: string;
}

const FallingText: React.FC<FallingTextProps> = ({
  text = "",
  trigger = "auto",
  backgroundColor = "transparent",
  wireframes = false,
  gravity = 1,
  mouseConstraintStiffness = 0.2,
  className = "",
  disableInteraction = true,
  containerWidth = "100%",
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);
  const [effectStarted, setEffectStarted] = useState(false);

  // Split text into spans
  useEffect(() => {
    if (!textRef.current) return;
    const letters = text.split("");
    const newHTML = letters
      .map((letter) => {
        return `<span class="inline-block select-none">${
          letter === " " ? "&nbsp;" : letter
        }</span>`;
      })
      .join("");
    textRef.current.innerHTML = newHTML;
  }, [text]);

  // Handle triggers
  useEffect(() => {
    if (trigger === "auto") {
      setEffectStarted(true);
      return;
    }
    if (trigger === "scroll" && containerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setEffectStarted(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [trigger]);

  // Matter.js effect
  useEffect(() => {
    if (!effectStarted) return;

    const { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint } =
      Matter;
    if (!containerRef.current || !canvasContainerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const width = containerRect.width;
    const height = containerRect.height;
    if (width <= 0 || height <= 0) return;

    const engine = Engine.create();
    engine.world.gravity.y = gravity;

    const render = Render.create({
      element: canvasContainerRef.current,
      engine,
      options: {
        width,
        height,
        background: backgroundColor,
        wireframes,
      },
    });

    // Make canvas non-interactive if disabled
    if (disableInteraction && render.canvas) {
      render.canvas.style.pointerEvents = "none";
    }

    const boundaryOptions = {
      isStatic: true,
      render: { fillStyle: "transparent" },
    };
    const floor = Bodies.rectangle(
      width / 2,
      height + 25,
      width,
      50,
      boundaryOptions
    );
    const leftWall = Bodies.rectangle(
      -25,
      height / 2,
      50,
      height,
      boundaryOptions
    );
    const rightWall = Bodies.rectangle(
      width + 25,
      height / 2,
      50,
      height,
      boundaryOptions
    );
    const ceiling = Bodies.rectangle(
      width / 2,
      -25,
      width,
      50,
      boundaryOptions
    );

    if (!textRef.current) return;
    const letterSpans = textRef.current.querySelectorAll("span");

    // Start letters from top-left 20%
    const startX = width * 0.1;
    const startY = height * 0.1;

    const letterBodies = [...letterSpans].map((elem, i) => {
      const rect = elem.getBoundingClientRect();
      const x = startX + i * (rect.width + 2); // Spread horizontally
      const y = startY;

      const body = Bodies.rectangle(x, y, rect.width, rect.height, {
        render: { fillStyle: "transparent" },
        restitution: 0.8,
        frictionAir: 0.01,
        friction: 0.2,
      });

      Matter.Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 5,
        y: 0,
      });
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05);

      return { elem, body };
    });

    // Position spans absolutely
    letterBodies.forEach(({ elem, body }) => {
      elem.style.position = "absolute";
      elem.style.left = `${body.position.x}px`;
      elem.style.top = `${body.position.y}px`;
      elem.style.transform = "none";
      // Disable pointer events on letters when interaction is disabled
      if (disableInteraction) {
        elem.style.pointerEvents = "none";
      }
    });

    // Only create mouse constraint if interaction is enabled
    let mouseConstraint;
    if (!disableInteraction) {
      const mouse = Mouse.create(containerRef.current);
      mouseConstraint = MouseConstraint.create(engine, {
        mouse,
        constraint: {
          stiffness: mouseConstraintStiffness,
          render: { visible: false },
        },
      });
      render.mouse = mouse;
    }

    // Add bodies to world
    World.add(engine.world, [
      floor,
      leftWall,
      rightWall,
      ceiling,
      ...letterBodies.map((lb) => lb.body),
    ]);

    // Add mouse constraint only if interaction is enabled
    if (!disableInteraction && mouseConstraint) {
      World.add(engine.world, mouseConstraint);
    }

    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    const updateLoop = () => {
      letterBodies.forEach(({ body, elem }) => {
        const { x, y } = body.position;
        elem.style.left = `${x}px`;
        elem.style.top = `${y}px`;
        elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
      });
      Matter.Engine.update(engine);
      requestAnimationFrame(updateLoop);
    };
    updateLoop();

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      if (render.canvas && canvasContainerRef.current) {
        canvasContainerRef.current.removeChild(render.canvas);
      }
      World.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, [
    effectStarted,
    gravity,
    wireframes,
    backgroundColor,
    mouseConstraintStiffness,
    disableInteraction,
  ]);

  const handleTrigger = () => {
    if (!effectStarted && (trigger === "click" || trigger === "hover")) {
      setEffectStarted(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative z-1 h-full text-center pt-8 ${className}`}
      style={{
        width: containerWidth,
        overflow: disableInteraction ? "visible" : "hidden",
      }}
      onClick={trigger === "click" ? handleTrigger : undefined}
      onMouseEnter={trigger === "hover" ? handleTrigger : undefined}
    >
      <div ref={textRef} className="inline-block -my-10 leading-[125%]" />
      <div
        className="absolute top-0 left-0 z-0"
        ref={canvasContainerRef}
        style={{ pointerEvents: disableInteraction ? "none" : "auto" }}
      />
    </div>
  );
};

export default FallingText;

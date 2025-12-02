"use client";
import { useRef, useState, useEffect } from "react";
import Matter from "matter-js";

interface PhysicsSvgProps {
  /** Array of SVG elements (as JSX.Element or React nodes) to animate */
  svgs: React.ReactNode[];
  /** When to start the animation: 'auto' (immediate), 'scroll' (when visible), 'click', or 'hover' */
  trigger?: "auto" | "scroll" | "click" | "hover";
  /** Background color of the physics canvas (default: transparent) */
  backgroundColor?: string;
  /** Show Matter.js collision boundaries for debugging (default: false) */
  wireframes?: boolean;
  /** Strength of gravity pulling SVGs down (default: 1, higher = stronger pull) */
  gravity?: number;
  /** Additional CSS classes for styling the container */
  className?: string;
  /** Width of the container (default: 100%) */
  containerWidth?: string;
  /** Height of the container (required for proper physics simulation) */
  containerHeight?: string;
  /** Bounciness when SVGs hit surfaces (0-1, default: 0.3, higher = more bouncy) */
  restitution?: number;
  /** Friction between SVGs and surfaces (0-1, default: 0.1, higher = more friction) */
  friction?: number;
  /** Air resistance/drag (0-1, default: 0.01, higher = more drag) */
  frictionAir?: number;
  /** Initial velocity when animation starts {x, y} (default: {x: 0, y: 0}) */
  initialVelocity?: { x: number; y: number };
  /** Initial spinning/rotation speed (default: 0, positive = clockwise) */
  angularVelocity?: number;
  /** Mass density of each SVG (default: 0.001, higher = heavier) */
  density?: number;
  /** Starting position as percentage of container {x, y} (0-1, default: {x: 0.5, y: 0}) */
  startPosition?: { x: number; y: number };
  /** Delay in milliseconds between each SVG drop (default: 500) */
  dropDelay?: number;
  /** Size of each SVG element {width, height} in pixels (default: {width: 50, height: 50}) */
  svgSize?: { width: number; height: number };
  /** Spacing between SVGs horizontally in pixels (default: 10) */
  spacing?: number;
}

const PhysicsSvg: React.FC<PhysicsSvgProps> = ({
  svgs = [],
  trigger = "auto",
  backgroundColor = "transparent",
  wireframes = false,
  gravity = 1,
  className = "",
  containerWidth = "100%",
  containerHeight = "100vh",
  restitution = 0.3,
  friction = 0.1,
  frictionAir = 0.01,
  initialVelocity = { x: 0, y: 0 },
  angularVelocity = 0,
  density = 0.001,
  startPosition = { x: 0.5, y: 0 },
  dropDelay = 500,
  svgSize = { width: 50, height: 50 },
  spacing = 10,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgContainerRef = useRef<HTMLDivElement | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);
  const [effectStarted, setEffectStarted] = useState(false);

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
    if (!effectStarted || svgs.length === 0) return;

    const { Engine, Render, World, Bodies, Runner } = Matter;
    if (!containerRef.current || !canvasContainerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const width = containerRect.width;
    const height = containerRect.height;
    if (width <= 0 || height <= 0) return;

    const engine = Engine.create();
    engine.world.gravity.y = gravity;
    engine.enableSleeping = false;

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

    // Make canvas non-interactive
    if (render.canvas) {
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

    if (!svgContainerRef.current) return;
    const svgElements =
      svgContainerRef.current.querySelectorAll(".physics-svg-item");

    // Calculate starting position
    const startX = width * startPosition.x;
    const startY = height * startPosition.y;

    const svgBodies = [...svgElements].map((elem, i) => {
      // Each SVG starts at its own horizontal position
      const x = startX + i * (svgSize.width + spacing);
      const y = startY;

      // Create body with collision bounds matching SVG size
      const body = Bodies.rectangle(x, y, svgSize.width, svgSize.height, {
        render: { fillStyle: "transparent" },
        restitution,
        frictionAir,
        friction,
        density,
        slop: 0,
        // Start with bodies sleeping (inactive)
        isSleeping: true,
      });

      // Set initial velocity and angular velocity
      Matter.Body.setVelocity(body, {
        x: initialVelocity.x + (Math.random() - 0.5) * 2,
        y: initialVelocity.y,
      });
      Matter.Body.setAngularVelocity(
        body,
        angularVelocity + (Math.random() - 0.5) * 0.02
      );

      return { elem: elem as HTMLElement, body };
    });

    // Position SVG elements absolutely with no pointer events
    svgBodies.forEach(({ elem, body }) => {
      elem.style.position = "absolute";
      elem.style.left = `${body.position.x}px`;
      elem.style.top = `${body.position.y}px`;
      elem.style.transform = "none";
      elem.style.pointerEvents = "none";
    });

    // Add bodies to world
    World.add(engine.world, [
      floor,
      leftWall,
      rightWall,
      ceiling,
      ...svgBodies.map((sb) => sb.body),
    ]);

    // Wake up SVGs one by one with delay
    svgBodies.forEach(({ body }, i) => {
      setTimeout(() => {
        Matter.Sleeping.set(body, false);
      }, i * dropDelay);
    });

    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    const updateLoop = () => {
      svgBodies.forEach(({ body, elem }) => {
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
    restitution,
    friction,
    frictionAir,
    density,
    initialVelocity.x,
    initialVelocity.y,
    angularVelocity,
    startPosition.x,
    startPosition.y,
    dropDelay,
    svgSize.width,
    svgSize.height,
    spacing,
    svgs.length,
  ]);

  const handleTrigger = () => {
    if (!effectStarted && (trigger === "click" || trigger === "hover")) {
      setEffectStarted(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{
        width: containerWidth,
        height: containerHeight,
        overflow: "hidden",
      }}
      onClick={trigger === "click" ? handleTrigger : undefined}
      onMouseEnter={trigger === "hover" ? handleTrigger : undefined}
    >
      <div ref={svgContainerRef} className="relative w-full h-full">
        {svgs.map((svg, index) => (
          <div
            key={index}
            className="physics-svg-item"
            style={{
              width: `${svgSize.width}px`,
              height: `${svgSize.height}px`,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {svg}
          </div>
        ))}
      </div>
      <div
        className="absolute top-0 left-0 z-0"
        ref={canvasContainerRef}
        style={{ pointerEvents: "none" }}
      />
    </div>
  );
};

export default PhysicsSvg;

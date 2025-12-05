"use client";
import { useRef, useState, useEffect } from "react";
import Matter from "matter-js";

interface PhysicsTextProps {
  /** The text content that will be animated with physics */
  text?: string;
  /** When to start the animation: 'auto' (immediate), 'scroll' (when visible), 'click', or 'hover' */
  trigger?: "auto" | "scroll" | "click" | "hover";
  /** Background color of the physics canvas (default: transparent) */
  backgroundColor?: string;
  /** Show Matter.js collision boundaries for debugging (default: false) */
  wireframes?: boolean;
  /** Strength of gravity pulling letters down (default: 1, higher = stronger pull) */
  gravity?: number;
  /** Additional CSS classes for styling the container */
  className?: string;
  /** Width of the container (default: 100%) */
  containerWidth?: string;
  /** Bounciness when letters hit surfaces (0-1, default: 0.3, higher = more bouncy) */
  restitution?: number;
  /** Friction between letters and surfaces (0-1, default: 0.1, higher = more friction) */
  friction?: number;
  /** Air resistance/drag (0-1, default: 0.01, higher = more drag) */
  frictionAir?: number;
  /** Initial velocity when animation starts {x, y} (default: {x: 0, y: 0}) */
  initialVelocity?: { x: number; y: number };
  /** Initial spinning/rotation speed (default: 0, positive = clockwise) */
  angularVelocity?: number;
  /** Mass density of each letter (default: 0.001, higher = heavier letters) */
  density?: number;
  /** Starting position as percentage of container {x, y} (0-1, default: {x: 0.5, y: 0.1}) */
  startPosition?: { x: number; y: number };
  /** Delay in milliseconds between each letter drop (default: 100) */
  dropDelay?: number;
  /** Initial delay in milliseconds before animation starts (default: 0) */
  startDelay?: number;
  /** Horizontal spacing between letters in pixels (default: 0, uses natural width) */
  letterSpacing?: number;
  /** Prevent letters from rotating during animation (default: false) */
  preventRotation?: boolean;
  /** Allow users to drag and interact with letters (default: false) */
  allowDrag?: boolean;
}

const PhysicsText: React.FC<PhysicsTextProps> = ({
  text = "",
  trigger = "auto",
  backgroundColor = "transparent",
  wireframes = false,
  gravity = 1,
  className = "",
  containerWidth = "100%",
  restitution = 0.3,
  friction = 0.1,
  frictionAir = 0.01,
  initialVelocity = { x: 0, y: 0 },
  angularVelocity = 0,
  density = 0.001,
  startPosition = { x: 0.5, y: 0 },
  dropDelay = 0,
  startDelay = 0,
  letterSpacing = 0,
  preventRotation = false,
  allowDrag = false,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);
  const [effectStarted, setEffectStarted] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Split text into spans
  useEffect(() => {
    if (!textRef.current) return;
    const letters = text.split("");
    const newHTML = letters
      .map((letter) => {
        return `<span class="inline-block leading-[75%] select-none">${
          letter === " " ? "&nbsp;" : letter
        }</span>`;
      })
      .join("");
    textRef.current.innerHTML = newHTML;
  }, [text]);

  // Handle initial delay for all triggers
  useEffect(() => {
    if (startDelay > 0) {
      const delayTimer = setTimeout(() => {
        setIsReady(true);
      }, startDelay);
      return () => clearTimeout(delayTimer);
    } else {
      setIsReady(true);
    }
  }, [startDelay]);

  // Handle triggers
  useEffect(() => {
    if (!isReady) return;

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
  }, [trigger, isReady]);

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

    // Make canvas interactive only if drag is enabled
    if (render.canvas) {
      render.canvas.style.pointerEvents = allowDrag ? "auto" : "none";
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

    // Calculate starting position
    const startX = width * startPosition.x;
    const startY = height * startPosition.y;

    // First pass: measure letter widths
    const letterWidths = [...letterSpans].map((elem) => {
      const rect = elem.getBoundingClientRect();
      return rect.width;
    });

    const letterBodies = [...letterSpans].map((elem, i) => {
      // Calculate x position based on cumulative widths to maintain order
      let cumulativeWidth = 0;
      for (let j = 0; j < i; j++) {
        cumulativeWidth += letterWidths[j] + letterSpacing;
      }
      const x = startX + cumulativeWidth;
      const y = startY;

      // Create body with rotation settings
      const body = Bodies.rectangle(
        x,
        y,
        letterWidths[i],
        elem.getBoundingClientRect().height,
        {
          render: { fillStyle: "transparent" },
          restitution,
          frictionAir,
          friction,
          density,
          slop: 0, // No collision tolerance for precise touching
          // Start with bodies sleeping (inactive)
          isSleeping: true,
          // Prevent rotation if enabled
          ...(preventRotation && { inertia: Infinity }),
        }
      );

      // Set initial velocity and angular velocity
      Matter.Body.setVelocity(body, {
        x: initialVelocity.x + (Math.random() - 0.5) * 2,
        y: initialVelocity.y,
      });

      // Only set angular velocity if rotation is allowed
      if (!preventRotation) {
        Matter.Body.setAngularVelocity(
          body,
          angularVelocity + (Math.random() - 0.5) * 0.02
        );
      }

      return { elem, body };
    });

    // Position spans absolutely with no pointer events
    letterBodies.forEach(({ elem, body }) => {
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
      ...letterBodies.map((lb) => lb.body),
    ]);

    // Add mouse constraint for dragging if enabled
    let mouseConstraint: Matter.MouseConstraint | null = null;
    if (allowDrag && render.canvas) {
      const mouse = Mouse.create(render.canvas);
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false,
          },
        },
      });
      World.add(engine.world, mouseConstraint);

      // Keep the mouse in sync with rendering
      render.mouse = mouse;
    }

    // Wake up letters one by one with delay
    letterBodies.forEach(({ body }, i) => {
      setTimeout(() => {
        Matter.Sleeping.set(body, false);
      }, i * dropDelay);
    });

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
      if (mouseConstraint) {
        World.remove(engine.world, mouseConstraint);
      }
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
    allowDrag,
  ]);

  const handleTrigger = () => {
    if (
      !effectStarted &&
      (trigger === "click" || trigger === "hover") &&
      isReady
    ) {
      setEffectStarted(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative z-1 h-full  pt-8 ${className}`}
      style={{
        width: containerWidth,
        overflow: "visible",
        opacity: isReady ? 1 : 0,
        transition: "opacity 0.3s",
      }}
      onClick={trigger === "click" ? handleTrigger : undefined}
      onMouseEnter={trigger === "hover" ? handleTrigger : undefined}
    >
      <div ref={textRef} className="inline-block " />
      <div
        className="absolute top-0 left-0 z-0"
        ref={canvasContainerRef}
        style={{ pointerEvents: "none" }}
      />
    </div>
  );
};

export default PhysicsText;

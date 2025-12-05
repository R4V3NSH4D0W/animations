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
  /** Enable gyroscope control on mobile devices (default: false) */
  enableGyro?: boolean;
  /** Sensitivity multiplier for gyro tilt (default: 1, higher = more sensitive) */
  gyroSensitivity?: number;
  /** Maximum gravity strength when tilting device (default: 2) */
  gyroMaxGravity?: number;
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
  enableGyro = false,
  gyroSensitivity = 1,
  gyroMaxGravity = 2,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const [effectStarted, setEffectStarted] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [gyroActive, setGyroActive] = useState(false);
  const [gyroDebug, setGyroDebug] = useState({ x: 0, y: 0 });

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

  // Check for gyroscope support (Android only)
  useEffect(() => {
    if (!enableGyro) return;

    const checkGyroSupport = () => {
      if (typeof window === "undefined") return;

      // Check if DeviceOrientationEvent exists
      if (window.DeviceOrientationEvent) {
        setGyroActive(true);
        console.log("✓ Gyroscope enabled");
      } else {
        console.log("✗ DeviceOrientation not supported");
      }
    };

    checkGyroSupport();
  }, [enableGyro]);

  // Gyroscope event listener (Android) - Remove engineRef from dependencies
  useEffect(() => {
    if (!enableGyro || !gyroActive) return;

    const handleOrientation = (event: DeviceOrientationEvent) => {
      // Check engine inside handler
      if (!engineRef.current) return;

      // beta: front-to-back tilt (-180 to 180)
      // gamma: left-to-right tilt (-90 to 90)
      const beta = event.beta ?? 0;
      const gamma = event.gamma ?? 0;

      // Normalize values (-1 to 1)
      const normalizedBeta = Math.max(-1, Math.min(1, beta / 90));
      const normalizedGamma = Math.max(-1, Math.min(1, gamma / 90));

      // Apply gyro to gravity
      const gravityX = normalizedGamma * gyroMaxGravity * gyroSensitivity;
      const gravityY =
        gravity + normalizedBeta * gyroMaxGravity * gyroSensitivity;

      if (engineRef.current) {
        engineRef.current.world.gravity.x = gravityX;
        engineRef.current.world.gravity.y = gravityY;
      }

      // Update debug display
      setGyroDebug({ x: gravityX, y: gravityY });
    };

    window.addEventListener("deviceorientation", handleOrientation, true);

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation, true);
    };
  }, [enableGyro, gyroActive, gravity, gyroSensitivity, gyroMaxGravity]);

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
    engineRef.current = engine;

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

    // First pass: measure letter widths
    const letterWidths = [...letterSpans].map((elem) => {
      const rect = elem.getBoundingClientRect();
      return rect.width;
    });

    // Calculate total width of all letters including spacing
    const totalTextWidth = letterWidths.reduce((sum, width, i) => {
      return sum + width + (i < letterWidths.length - 1 ? letterSpacing : 0);
    }, 0);

    // Calculate how many letters can fit per row
    const availableWidth = width - 20; // 10px padding on each side
    let rows: number[][] = []; // Array of arrays, each containing letter indices for that row
    let currentRow: number[] = [];
    let currentRowWidth = 0;

    // Group letters into rows based on available width
    letterWidths.forEach((letterWidth, i) => {
      const widthNeeded =
        letterWidth + (currentRow.length > 0 ? letterSpacing : 0);

      if (currentRowWidth + widthNeeded <= availableWidth) {
        // Letter fits in current row
        currentRow.push(i);
        currentRowWidth += widthNeeded;
      } else {
        // Start a new row
        if (currentRow.length > 0) {
          rows.push(currentRow);
        }
        currentRow = [i];
        currentRowWidth = letterWidth;
      }
    });

    // Add the last row
    if (currentRow.length > 0) {
      rows.push(currentRow);
    }

    const startY = height * startPosition.y;
    const rowHeight = letterSpans[0]?.getBoundingClientRect().height || 100;
    const rowSpacing = 20; // Space between rows

    const letterBodies = [...letterSpans].map((elem, i) => {
      // Find which row this letter belongs to
      let rowIndex = 0;
      let positionInRow = 0;

      for (let r = 0; r < rows.length; r++) {
        const indexInRow = rows[r].indexOf(i);
        if (indexInRow !== -1) {
          rowIndex = r;
          positionInRow = indexInRow;
          break;
        }
      }

      // Calculate width of current row
      const currentRowLetters = rows[rowIndex];
      const rowWidth = currentRowLetters.reduce((sum, idx, pos) => {
        return (
          sum +
          letterWidths[idx] +
          (pos < currentRowLetters.length - 1 ? letterSpacing : 0)
        );
      }, 0);

      // Center the row
      const rowStartX = Math.max(10, (width - rowWidth) / 2);

      // Calculate x position within the row
      let cumulativeWidth = 0;
      for (let j = 0; j < positionInRow; j++) {
        cumulativeWidth += letterWidths[currentRowLetters[j]] + letterSpacing;
      }

      const x = rowStartX + cumulativeWidth;
      const y = startY + rowIndex * (rowHeight + rowSpacing);

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
          slop: 0,
          isSleeping: true,
          ...(preventRotation && { inertia: Infinity }),
        }
      );

      // Set initial velocity and angular velocity
      Matter.Body.setVelocity(body, {
        x: initialVelocity.x + (Math.random() - 0.5) * 2,
        y: initialVelocity.y,
      });

      if (!preventRotation) {
        Matter.Body.setAngularVelocity(
          body,
          angularVelocity + (Math.random() - 0.5) * 0.02
        );
      }

      return { elem, body, rowIndex };
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
      render.mouse = mouse;
    }

    // Wake up letters row by row with delay
    // Calculate max letters per row for timing
    const maxLettersInRow = Math.max(...rows.map((row) => row.length));
    const rowDelay = maxLettersInRow * dropDelay; // Delay between rows

    letterBodies.forEach(({ body, rowIndex }, i) => {
      // Calculate delay: row delay + position within row delay
      const positionInRow = rows[rowIndex].indexOf(i);
      const totalDelay = rowIndex * rowDelay + positionInRow * dropDelay;

      setTimeout(() => {
        Matter.Sleeping.set(body, false);
      }, totalDelay);
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
      engineRef.current = null;
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
      className={`relative z-1 h-full pt-8 ${className}`}
      style={{
        width: containerWidth,
        overflow: "visible",
        opacity: isReady ? 1 : 0,
        transition: "opacity 0.3s",
      }}
      onClick={trigger === "click" ? handleTrigger : undefined}
      onMouseEnter={trigger === "hover" ? handleTrigger : undefined}
    >
      {/* Debug indicator with gyro values */}
      {/* {enableGyro && gyroActive && (
        <div className="fixed bottom-4 right-4 z-9999 px-3 py-2 bg-green-500/90 text-white rounded-lg text-xs font-semibold shadow-lg">
          📱 Gyro Active
          <div className="text-[10px] mt-1 opacity-90">
            X: {gyroDebug.x.toFixed(2)} | Y: {gyroDebug.y.toFixed(2)}
          </div>
        </div>
      )} */}

      <div ref={textRef} className="inline-block" />
      <div
        className="absolute top-0 left-0 z-0"
        ref={canvasContainerRef}
        style={{ pointerEvents: "none" }}
      />
    </div>
  );
};

export default PhysicsText;

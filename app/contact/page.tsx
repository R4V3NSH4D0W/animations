"use client";
import PhysicsText from "@/components/shared/physics-text";
import AnimatedInput from "@/components/shared/animated-input";
import ViewReveal from "@/components/shared/view-reveal";
import { useRef } from "react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import { useMedia } from "react-use";

function Contact() {
  const lineRef = useRef<HTMLDivElement>(null);

  const isDesktop = useMedia("(min-width: 769px)", true);

  const handleMouseEnter = () => {
    if (lineRef.current) {
      gsap.to(lineRef.current, {
        width: "160px",
        duration: 0.5,
        ease: "power3.out",
      });
    }
  };

  const handleMouseLeave = () => {
    if (lineRef.current) {
      gsap.to(lineRef.current, {
        width: "0px",
        duration: 0.5,
        ease: "power3.out",
      });
    }
  };

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] min-h-screen gap-4 md:gap-8">
        <div className="relative order-2 lg:order-1 h-[200px] md:h-[400px] lg:h-auto">
          <PhysicsText
            text="HELLO"
            letterSpacing={5}
            gravity={0.6}
            startDelay={1300}
            containerWidth="100%"
            className="text-[80px] sm:text-[120px] md:text-[160px] lg:text-[220px] font-extrabold -mt-[80px] sm:-mt-[120px] md:-mt-[160px] lg:-mt-[220px] min-h-[calc(100%+60px)] sm:min-h-[calc(100%+80px)] md:min-h-[calc(100%+100px)] lg:min-h-[calc(100%+140px)]"
            restitution={0.2}
            allowDrag={isDesktop}
            startPosition={{ x: 0.1, y: 0 }}
          />
        </div>
        <div className=" mt-40 mx-4 sm:mx-6 md:mx-8 lg:mr-10 order-1 lg:order-2">
          <ViewReveal delay={1} enableBlur={false}>
            <div className="flex flex-col sm:flex-row mb-6 sm:mb-8 md:mb-10 gap-2 sm:gap-4 items-start sm:items-center">
              <span className="uppercase text-xs sm:text-sm font-medium">
                (Contact us)
              </span>
              <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium">
                Get In Touch
              </span>
            </div>
          </ViewReveal>
          <div className="flex flex-col sm:flex-row w-full gap-6 sm:gap-8 md:gap-10">
            <AnimatedInput
              label="First Name"
              placeholder="First Name"
              required
              className="w-full sm:w-1/2"
              lineDelay={1.6}
            />
            <AnimatedInput
              label="Last Name"
              placeholder="Last Name"
              required
              className="w-full sm:w-1/2"
              lineDelay={1.7}
            />
          </div>
          <AnimatedInput
            label="Email"
            type="email"
            placeholder="Your Email"
            required
            className="w-full mt-6 sm:mt-8 md:mt-10"
            lineDelay={1.5}
          />
          <AnimatedInput
            label="Company"
            placeholder="Where do you work?"
            className="w-full mt-6 sm:mt-8 md:mt-10"
            lineDelay={1.6}
          />
          <AnimatedInput
            label="How can i help you?"
            placeholder="Please let me know how can i assist you"
            type="textarea"
            className="w-full mt-6 sm:mt-8 md:mt-10"
            lineDelay={1.6}
          />
          <div
            className="mt-8 sm:mt-10 md:mt-12 flex flex-col w-full gap-2 cursor-pointer group pb-8 sm:pb-12 md:pb-16"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex flex-row items-center gap-2">
              <span className="uppercase text-sm sm:text-base font-medium">
                Send Message
              </span>
              <ArrowRight
                size={20}
                className="group-hover:translate-x-3 transition-transform duration-300"
              />
            </div>
            <div ref={lineRef} className="h-px bg-black" style={{ width: 0 }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;

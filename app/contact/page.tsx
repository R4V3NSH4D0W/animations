"use client";
import PhysicsText from "@/components/shared/physics-text";
import AnimatedInput from "@/components/shared/animated-input";
import ViewReveal from "@/components/shared/view-reveal";
import { useRef } from "react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";

function Contact() {
  const lineRef = useRef<HTMLDivElement>(null);

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
    <div className="flex flex-col h-full w-full">
      <div className="grid grid-cols-[1fr_0.9fr] h-screen gap-8">
        <div className="relative">
          <PhysicsText
            text="HELLO"
            letterSpacing={5}
            gravity={0.6}
            startDelay={1300}
            containerWidth="100%"
            className="text-[220px] font-extrabold -mt-[220px] min-h-[calc(100%+140px)]"
            restitution={0.2}
            allowDrag
            startPosition={{ x: 0.1, y: 0 }}
          />
        </div>
        <div className="mt-40 mr-10">
          <ViewReveal delay={1} enableBlur={false}>
            <div className="flex flex-row mb-10 gap-4 items-center">
              <span className="uppercase text-sm font-medium">
                (Contact us)
              </span>
              <span className="text-7xl">Get In Touch</span>
            </div>
          </ViewReveal>
          <div className="flex flex-row w-full gap-10">
            <AnimatedInput
              label="First Name"
              placeholder="First Name"
              required
              className=" w-1/2"
              lineDelay={1.6}
            />
            <AnimatedInput
              label="Last Name"
              placeholder="Last Name"
              required
              className=" w-1/2"
              lineDelay={1.7}
            />
          </div>
          <AnimatedInput
            label="Email"
            type="email"
            placeholder="Your Email"
            required
            className=" w-full mt-10"
            lineDelay={1.5}
          />
          <AnimatedInput
            label="Company"
            placeholder="Where do you work?"
            className=" w-full mt-10"
            lineDelay={1.6}
          />
          <AnimatedInput
            label="How can i help you?"
            placeholder="Please let me know how can i assist you"
            type="textarea"
            className=" w-full mt-10"
            lineDelay={1.7}
          />
          <div
            className="mt-12 flex flex-col w-full gap-2 cursor-pointer group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className=" flex flex-row items-center gap-2 ">
              <span className="uppercase">Send Message</span>
              <ArrowRight
                size={20}
                className="group-hover:translate-x-3 transition-transform duration-300 "
              />
            </div>
            <div
              ref={lineRef}
              className="h-px  bg-black"
              style={{ width: 0 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;

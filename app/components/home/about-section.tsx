import React from "react";
import ScrollReveal from "../shared/scroll-reveal";
import Image from "next/image";
import AnimateIn from "../shared/animate-in";
import { ArrowRight } from "lucide-react";

function AboutSection() {
  return (
    <section className="mx-10 mb-20 space-y-10">
      <div className="flex justify-between items-center ">
        {/* Left: Text */}
        <div className="flex-1 max-w-[60%]">
          <ScrollReveal
            enableBlur={true}
            baseOpacity={0.05}
            baseRotation={0}
            blurStrength={6}
            staggerDelay={0.1}
            textClassName="font-light"
            size="lg"
            springConfig={{
              damping: 15,
              stiffness: 200,
              mass: 0.5,
            }}
          >
            Social is the world your brand lives in, where content, commerce,
            and influence intersect. At OGAKI, we build social-first ecosystems
            powered by the creators, experts, and tastemakers who shape beauty -
            helping prestige beauty brands grow without compromising what makes
            them distinct.
          </ScrollReveal>
          <div className=" flex items-center gap-2">
            <span className=" uppercase">About Us</span>
            <ArrowRight size={16} />
          </div>
        </div>

        {/* Right: Image */}
        <div className="flex-1 max-w-[500px]">
          <AnimateIn direction="up" resetOnExit blur>
            <Image
              src="https://i.pinimg.com/1200x/73/41/ec/7341ece999e68cdc829c888fd735820b.jpg"
              alt="About Image"
              width={500}
              height={500}
              className="object-cover w-[500px] h-[500px]"
            />
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;

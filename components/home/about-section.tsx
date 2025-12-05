"use client";
import ScrollReveal from "../shared/scroll-reveal";
import Image from "next/image";
import AnimateIn from "../shared/animate-in";
import { ArrowRight } from "lucide-react";
import { useNavigation } from "@/hooks/use-navigation";

function AboutSection() {
  const { navigate } = useNavigation();
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
            I craft digital experiences that move and breathe, blending design,
            motion, and interaction into seamless, engaging interfaces. My work
            is driven by curiosity and attention to detail — turning ideas into
            interactive, memorable experiences that feel alive on the modern
            web.
          </ScrollReveal>
          <div
            className="flex items-center cursor-pointer gap-2"
            onClick={() => navigate("/about")}
          >
            <span className="uppercase">About Me</span>
            <ArrowRight size={16} />
          </div>
        </div>

        {/* Right: Image */}
        <div className="flex-1 max-w-[500px]">
          <AnimateIn direction="up" resetOnExit blur>
            <Image
              src="https://i.pinimg.com/736x/ec/df/b7/ecdfb7ec2403345b6a53c1255dcc1060.jpg"
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

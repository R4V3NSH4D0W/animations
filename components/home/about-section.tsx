import Link from "next/link";
import ScrollReveal from "../shared/scroll-reveal";
import Image from "next/image";
import AnimateIn from "../shared/animate-in";
import { ArrowRight } from "lucide-react";

function AboutSection() {
  return (
    <section className="mx-4 sm:mx-6 md:mx-8 lg:mx-10 mb-12 sm:mb-16 md:mb-20 space-y-6 sm:space-y-8 md:space-y-10">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 lg:gap-12">
        {/* Left: Text */}
        <div className="flex-1 w-full lg:max-w-[60%]">
          <ScrollReveal
            enableBlur={true}
            baseOpacity={0.05}
            baseRotation={0}
            blurStrength={6}
            staggerDelay={0.1}
            textClassName="font-light text-base md:text-lg"
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
          <Link
            href="/about"
            className="flex items-center cursor-pointer gap-2 mt-4 sm:mt-6 text-sm sm:text-base hover:gap-3 transition-all"
          >
            <span className="uppercase">About Me</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Right: Image */}
        <div className="flex-1 w-full lg:max-w-[500px]">
          <AnimateIn direction="up" resetOnExit blur>
            <Image
              src="https://images.unsplash.com/photo-1472491235688-bdc81a63246e?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="My Profile Picture"
              width={500}
              height={500}
              className="object-cover w-full h-auto md:max-w-[400px] lg:max-w-[500px] aspect-square mx-auto lg:mx-0"
            />
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;

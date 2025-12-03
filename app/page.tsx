"use client";
import AboutSection from "./components/home/about-section";
import CaseStudies from "./components/home/case-studies";
import ZAnimation from "./components/home/z-animation";
import PhysicsText from "./components/shared/physics-text";
import ViewReveal from "./components/shared/view-reveal";

function page() {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="relative  h-screen">
        <div className="absolute right-[2%] top-[10%] w-3xl">
          <ViewReveal revealAfter={1} startHidden enableBlur={false}>
            <div className="flex items-center space-x-4">
              <span className="uppercase font-bold text-sm">(We are)</span>
              <span className="text-[78px]">The Social-first</span>
            </div>
            <div className="text-[78px] leading-tight">
              <div>agency for prestige</div>
              <div>beauty.</div>
            </div>
          </ViewReveal>
        </div>

        <PhysicsText
          text="BEAUTY"
          gravity={1}
          containerWidth="100%"
          className="text-[280px] font-extrabold -mt-[220px] min-h-[calc(100%+140px)]"
          dropDelay={0}
          restitution={0.2}
          startPosition={{ x: 0.1, y: 0 }}
        />
      </div>
      <AboutSection />
      <ZAnimation />
      <CaseStudies />

      {/* <ViewReveal
        size="xl"
        align="center"
        threshold={0.3}
        staggerDelay={0.08}
        enableBlur={true}
        once={true}
        yOffset={30}
      >
        Your text content here
      </ViewReveal> */}
      {/* <ScrollReveal size="xl" align="center" variant="primary">
        Large centered heading with primary color
      </ScrollReveal> */}
    </div>
  );
}

export default page;

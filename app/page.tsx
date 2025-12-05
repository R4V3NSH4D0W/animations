import AboutSection from "../components/home/about-section";
import CaseStudies from "../components/home/case-studies";
import ZAnimation from "../components/home/z-animation";
import PhysicsText from "../components/shared/physics-text";
import ViewReveal from "../components/shared/view-reveal";

function page() {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="relative  h-screen">
        <div className="absolute right-[2%] top-[25%] w-3xl">
          <ViewReveal revealAfter={1} startHidden enableBlur={false}>
            <div className="flex items-center space-x-4">
              <span className="uppercase font-bold text-sm">(I craft)</span>
              <span className="text-[68px]">Experiences that Move</span>
            </div>
            <div className="text-[68px] leading-tight">
              <div>with subtle emotion.</div>
            </div>
          </ViewReveal>
        </div>

        <PhysicsText
          text="MOTION"
          letterSpacing={10}
          gravity={1}
          startDelay={1300}
          containerWidth="100%"
          className="text-[270px] font-extrabold -mt-[220px] min-h-[calc(100%+140px)]"
          restitution={0.2}
          startPosition={{ x: 0.1, y: 0 }}
        />
      </div>
      <AboutSection />
      <ZAnimation />
      <CaseStudies />
    </div>
  );
}

export default page;

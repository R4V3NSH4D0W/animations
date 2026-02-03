import AboutSection from "../components/home/about-section";
import CaseStudies from "../components/home/case-studies";
import ZAnimation from "../components/home/z-animation";
import PhysicsText from "../components/shared/physics-text";
import ViewReveal from "../components/shared/view-reveal";

function page() {
  return (
    <div className="flex flex-col h-full w-full overflow-x-hidden">
      <div className="relative h-screen  ">
        <div className="absolute left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-[5%] lg:right-[2%] top-[20%] sm:top-[22%] md:top-[25%] w-[90%] sm:w-[85%] md:w-auto max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl">
          <ViewReveal revealAfter={1} startHidden enableBlur={false}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
              <span className="uppercase font-bold text-xs sm:text-sm">
                (Welcome)
              </span>
              <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-[68px] leading-tight">
                Hello, I'm John Doe
              </span>
            </div>
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-[68px] leading-tight mt-2">
              <div>Creative Developer.</div>
            </div>
          </ViewReveal>
        </div>

        <PhysicsText
          text="PORTFOLIO"
          letterSpacing={10}
          gravity={1}
          enableGyro={true}
          gyroSensitivity={1.5}
          gyroMaxGravity={2}
          startDelay={1300}
          containerWidth="95%"
          className="max-sm:text-[120px] text-[180px] md:text-[270px] font-extrabold -mt-[220px] min-h-[calc(100%+140px)]"
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

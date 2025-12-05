import PhysicsText from "@/components/shared/physics-text";
import ViewReveal from "@/components/shared/view-reveal";

function Page() {
  return (
    <main className="flex flex-col h-full w-full overflow-x-hidden">
      <div className="relative h-screen">
        {/* TOP LEFT HEADING */}
        <div className="absolute left-[5%] sm:left-[3%] md:left-[2%] top-[20%] md:top-[14%] w-[90%] sm:w-auto">
          <ViewReveal revealAfter={1} startHidden enableBlur={false}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
              <span className="uppercase text-xs sm:text-sm font-bold">
                (My Expertise)
              </span>
              <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[78px] leading-tight">
                Building Interactive,
              </span>
            </div>
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[78px] leading-tight mt-1 sm:mt-0">
              Fast & Modern Web Experiences.
            </div>
          </ViewReveal>
        </div>

        {/* DESCRIPTION RIGHT SIDE */}
        <div className="absolute bottom-[32%] sm:bottom-[30%] md:bottom-[32%] right-[5%] sm:right-[4%] md:right-[3%] w-[90%] sm:w-[500px] md:w-[600px]">
          <ViewReveal revealAfter={2.5} startHidden enableBlur={false}>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl uppercase font-medium">
              Expertise in crafting high-performance interfaces using Next.js,
              React, TypeScript, GSAP, UI/UX principles, and animation-driven
              interaction design. I specialize in turning ideas into seamless,
              immersive digital experiences.
            </p>
          </ViewReveal>
        </div>

        {/* BACKGROUND PHYSICS TEXT */}
        <PhysicsText
          text="EXPERTISE"
          letterSpacing={10}
          gravity={1}
          enableGyro={true}
          gyroSensitivity={1.5}
          gyroMaxGravity={2}
          startDelay={1300}
          containerWidth="95%"
          className="max-sm:text-[120px] text-[270px] font-extrabold -mt-[220px] min-h-[calc(100%+140px)]"
          restitution={0.2}
          startPosition={{ x: 0.1, y: 0 }}
        />
      </div>
    </main>
  );
}

export default Page;

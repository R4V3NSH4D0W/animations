import React from "react";
import PhysicsText from "../../components/shared/physics-text";
import ViewReveal from "../../components/shared/view-reveal";
import FolderStructure from "../../components/home/folder-structure";
import Archive from "@/components/work/archive";
import { worksPageData } from "@/data/site-data";

function Page() {
  return (
    <main className="flex flex-col h-full w-full overflow-x-hidden">
      <div className="relative h-screen">
        <div className="absolute left-[5%] sm:left-[3%] md:left-[2%] top-[20%] md:top-[14%] w-[90%] sm:w-auto">
          <ViewReveal revealAfter={1} startHidden enableBlur={false}>
            <div className="flex flex-col gap-2">
              <span className="uppercase text-xs sm:text-sm font-bold tracking-widest mb-2">
                {worksPageData.tagline}
              </span>
              <h1 className="font-serif italic text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] leading-[0.9]">
                {worksPageData.headingLine1}
                <br />
                {worksPageData.headingLine2}
              </h1>
            </div>
          </ViewReveal>
        </div>
        <div className="absolute bottom-[32%] sm:bottom-[30%] md:bottom-[32%] right-[5%] sm:right-[4%] md:right-[3%] w-[90%] sm:w-[500px] md:w-[600px]">
          <ViewReveal revealAfter={2.5} startHidden enableBlur={false}>
            <p className="text-sm sm:text-base md:text-lg text-neutral-600 leading-relaxed font-normal">
              {worksPageData.description}
            </p>
          </ViewReveal>
        </div>

        <PhysicsText
          text={worksPageData.physicsText}
          letterSpacing={10}
          gravity={1}
          enableGyro={true}
          gyroSensitivity={1.5}
          gyroMaxGravity={2}
          startDelay={1300}
          containerWidth="95%"
          className="text-[clamp(5rem,15vw,17rem)] font-extrabold -mt-[220px] min-h-[calc(100%+140px)] opacity-[0.05] pointer-events-none"
          restitution={0.2}
          startPosition={{ x: 0.1, y: 0 }}
        />
      </div>
      <FolderStructure />

      <Archive />
    </main>
  );
}

export default Page;

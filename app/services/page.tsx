import React from "react";
import PhysicsText from "../../components/shared/physics-text";
import ViewReveal from "../../components/shared/view-reveal";
import FolderStructure from "../../components/home/folder-structure";

function Page() {
  return (
    <main className="flex flex-col h-full w-full">
      <div className="relative  h-screen">
        <div className="absolute left-[2%] top-[14%] ">
          <ViewReveal revealAfter={1} startHidden enableBlur={false}>
            <div className="flex items-center space-x-4">
              <span className=" uppercase">(our Services)</span>
              <span className="text-[78px]">The Intersection of Social,</span>
            </div>
            <div className="text-[78px] leading-tight">
              influence, and commerce.
            </div>
          </ViewReveal>
        </div>
        <div className="absolute bottom-[32%] right-[3%] ">
          <ViewReveal revealAfter={2.5} startHidden enableBlur={false}>
            <p className=" text-xl uppercase font-medium">
              Social-First PRograms Designed to More your brand <br /> Forward.
              ImpactFul on their OWn. More Powerful <br /> Together
            </p>
          </ViewReveal>
        </div>

        <PhysicsText
          text="SERVICES"
          gravity={1}
          containerWidth="100%"
          className=" text-[270px] 2xl:text-[300px] font-extrabold -mt-[220px] min-h-[calc(100%+140px)]"
          dropDelay={200}
          restitution={0.2}
          startPosition={{ x: 0.1, y: 0 }}
        />
      </div>
      <FolderStructure />
    </main>
  );
}

export default Page;

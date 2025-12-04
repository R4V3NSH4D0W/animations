import React from "react";
import PhysicsText from "../../components/shared/physics-text";
import ViewReveal from "../../components/shared/view-reveal";
import FolderStructure from "../../components/home/folder-structure";
import Archive from "@/components/work/archive";
import Slogan from "@/components/work/slogan";

function Page() {
  return (
    <main className="flex flex-col h-full w-full">
      <div className="relative  h-screen">
        <div className="absolute left-[2%] top-[14%] ">
          <ViewReveal revealAfter={1} startHidden enableBlur={false}>
            <div className="flex items-center space-x-4">
              <span className=" uppercase">(Our Work)</span>
              <span className="text-[78px]">Code Meets Creativity,</span>
            </div>
            <div className="text-[78px] leading-tight">
              Seamless & Interactive.
            </div>
          </ViewReveal>
        </div>
        <div className="absolute bottom-[32%] right-[3%] w-[600px] ">
          <ViewReveal revealAfter={2.5} startHidden enableBlur={false}>
            <p className=" text-xl uppercase font-medium">
              Developing Next.js projects with React, TypeScript, GSAP, and
              modern web tools for dynamic, engaging user experiences.
            </p>
          </ViewReveal>
        </div>

        <PhysicsText
          text="WORKS"
          gravity={1}
          startDelay={1300}
          containerWidth="100%"
          className=" text-[270px] 2xl:text-[300px] font-extrabold -mt-[220px] min-h-[calc(100%+140px)]"
          dropDelay={200}
          restitution={0.2}
          startPosition={{ x: 0.1, y: 0 }}
        />
      </div>
      <FolderStructure />

      <Archive />
      <Slogan />
    </main>
  );
}

export default Page;

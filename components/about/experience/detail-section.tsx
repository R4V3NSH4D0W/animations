import React from "react";
import { CornerDot } from "./ConerDot";
import { SectionHeader } from "./SectionHeader";
import { BORDER_CLASSES } from "./constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type InfoRowProps = {
  label: string;
  value: string;
  href?: string;
  bordered?: boolean;
};

const InfoRow = ({ label, value, href, bordered = true }: InfoRowProps) => (
  <div
    className={cn(
      "grid grid-cols-1 sm:grid-cols-2 items-start sm:items-center gap-2 sm:gap-5 px-3 sm:px-4 md:px-5 py-2 sm:py-3",
      bordered && `${BORDER_CLASSES} border-b`
    )}
  >
    <span className="text-lg sm:text-xl md:text-2xl font-medium sm:font-normal">
      {label}
    </span>
    {href ? (
      <Link href={href} className="text-sm sm:text-base font-light break-all">
        {value}
      </Link>
    ) : (
      <span className="text-sm sm:text-base font-light break-all">{value}</span>
    )}
  </div>
);

function DetailSection() {
  return (
    <section className="w-full md:w-[900px] lg:w-[1000px] xl:w-[1100px] bg-white rounded-lg shadow-lg transform transition-transform duration-300 hover:-translate-y-10 ">
      <div className="grid grid-cols-[30px_1fr_30px]">
        {/* Header start */}
        <div className="border-b border-r flex justify-center items-center border-dotted border-black">
          <CornerDot />
        </div>
        <div className={`border-b ${BORDER_CLASSES}`}>
          <SectionHeader className="p-1 sm:p-2" title="Profile" />
        </div>
        <div className="border-b border-l border-dotted border-black" />
        {/* Header End */}
        <div
          className={cn(
            "border-r flex flex-col justify-evenly items-center",
            BORDER_CLASSES
          )}
        >
          <CornerDot />
          <CornerDot />
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col md:flex-row gap-3 sm:gap-4 md:gap-5 p-3 sm:p-4 md:p-5">
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6 md:mb-10 font-medium">
                R4V3NSH4DOW
              </span>
              <div className="w-full sm:w-[300px] md:w-[350px] lg:w-[400px] h-[200px] sm:h-[220px] md:h-[250px] relative">
                <Image
                  src="https://i.pinimg.com/736x/93/6e/84/936e845973e45635a71cc4efaf11d97d.jpg"
                  alt="Profile Image"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <p className="text-base sm:text-lg font-caveat leading-relaxed">
              I am a passionate Frontend Engineer who enjoys turning ideas into
              clean, functional, and visually engaging digital experiences. I
              love working at the intersection of design and technology—crafting
              interfaces that feel intuitive, fast, and delightful to use.
              <br />
              <br />
              Over the years, I've gained experience in modern frontend
              ecosystems, building scalable UI systems, and writing
              maintainable, high-quality code. I enjoy solving problems,
              exploring new technologies, and continuously refining my craft.
              When I'm not coding, I'm learning, experimenting, and working on
              personal projects that inspire me.
              <br />
              <br />I believe good design brings clarity, and good code brings
              reliability. My goal is to create products that are not only
              beautiful, but also meaningful, accessible, and impactful.
            </p>
          </div>

          <InfoRow label="Email" value="Lenishmagar@gmail.com" bordered />
          <InfoRow label="Instagram" value="@Lenishmagar" bordered />
          <InfoRow
            label="LinkedIn"
            href="https://www.linkedin.com/in/lenish-yesmali-magar-a8a980282/"
            value="linkedin.com/in/lenish-yesmali-magar"
            bordered={false}
          />
        </div>
        <div className={cn("border-l flex justify-center", BORDER_CLASSES)} />

        {/* Footer Start */}
        <div className="border-t border-r flex justify-center items-center border-dotted border-black">
          <CornerDot className="bg-[#D9D9D9]!" />
        </div>
        <div className={`border-t ${BORDER_CLASSES}`}>
          <SectionHeader className="p-2" title="Profile" />
        </div>
        <div className="border-t border-l border-dotted border-black" />
        {/* Footer End */}
      </div>
    </section>
  );
}

export default DetailSection;

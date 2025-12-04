"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Experience,
  Education,
  Achievement,
  Recognition,
} from "./experience/types";
import {
  experiences,
  education,
  achievements,
  recognitions,
} from "./experience/data";
import { BORDER_CLASSES } from "./experience/constants";

import { SectionLabel } from "./experience/SectionLabel";
import { SectionHeader } from "./experience/SectionHeader";
import { DataTable } from "./experience/DataTable";
import { HoverContent } from "./experience/HoverContent";
import { CornerDot } from "./experience/ConerDot";

gsap.registerPlugin(ScrollTrigger);

const ExperienceCard = () => {
  const [hoveredItem, setHoveredItem] = React.useState<{
    image?: string;
    description?: string;
    details?: string;
  } | null>(null);

  const hoverContentRef = useRef<HTMLDivElement>(null);
  const tableContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hoverContentRef.current || !tableContainerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: tableContainerRef.current,
        start: "top  200px",
        end: "bottom center",
        pin: hoverContentRef.current,
        pinSpacing: false,
        pinnedContainer: tableContainerRef.current,
      });
    });

    return () => ctx.revert();
  }, []);

  const handleHover = (
    item: Experience | Education | Achievement | Recognition | null
  ) => {
    if (item && "image" in item) {
      setHoveredItem({
        image: item.image,
        description: item.description,
        details: item.details,
      });
    } else {
      setHoveredItem(null);
    }
  };

  const renderExperienceRow = (exp: Experience) => [
    `${exp.from} - ${exp.to}`,
    exp.company,
    exp.position,
  ];

  const renderEducationRow = (edu: Education) => [
    `${edu.from} - ${edu.to}`,
    edu.school,
    edu.degree,
  ];

  const renderAchivementRow = (ach: Achievement) => [
    ach.year,
    ach.title,
    ach.organization,
  ];
  const rendeReconizationRow = (rec: Recognition) => [
    rec.year,
    rec.award,
    rec.issuedBy,
  ];

  return (
    <div className="w-[98%] bg-[#D9D9D9] rounded-lg flex overflow-hidden shadow-lg transform transition-transform duration-300 hover:-translate-y-10">
      <div className="grid grid-cols-[30px_0.4fr_1fr_30px] w-full">
        {/* Header Section */}
        <div
          className={`p-2 border-r border-b flex items-center justify-center ${BORDER_CLASSES}`}
        >
          <CornerDot />
        </div>
        <div className={`border-b border-r ${BORDER_CLASSES}`}>
          <SectionLabel label="About" />
        </div>
        <div className={`border-b ${BORDER_CLASSES}`}>
          <SectionHeader title="experiences" className=" mt-2" />
        </div>
        <div
          className={`p-2 border-l border-b flex items-center justify-center ${BORDER_CLASSES}`}
        />

        {/* Content Section */}
        <div
          className={`border-r flex items-center justify-center w-full pt-20 ${BORDER_CLASSES}`}
        >
          <CornerDot />
        </div>
        <div className={`border-r ${BORDER_CLASSES} relative overflow-hidden`}>
          <HoverContent
            hoveredItem={hoveredItem}
            hoverContentRef={hoverContentRef}
          />
        </div>
        <div className="w-full flex flex-col" ref={tableContainerRef}>
          <span className={`text-4xl p-2 border-b ${BORDER_CLASSES}`}>
            Experiences
          </span>
          <DataTable
            data={experiences}
            columns={["Year", "Company", "Position"]}
            renderRow={renderExperienceRow}
            onHover={handleHover}
          />

          <span className={`text-4xl p-2 border-b ${BORDER_CLASSES}`}>
            Education
          </span>
          <DataTable
            data={education}
            columns={["Year", "School", "Degree"]}
            renderRow={renderEducationRow}
            onHover={handleHover}
          />
          <span className={`text-4xl p-2 border-b ${BORDER_CLASSES}`}>
            Achivements
          </span>
          <DataTable
            data={achievements}
            columns={["Year", "Title", "Organization"]}
            renderRow={renderAchivementRow}
            onHover={handleHover}
          />
          <span className={`text-4xl p-2 border-b ${BORDER_CLASSES}`}>
            Recognition
          </span>
          <DataTable
            data={recognitions}
            columns={["Year", "Award", "Issued By"]}
            renderRow={rendeReconizationRow}
            onHover={handleHover}
          />
        </div>
        <div className={`border-l flex w-full ${BORDER_CLASSES}`} />

        {/* Footer Section */}
        <div
          className={`p-2 border-r border-t flex items-center justify-center ${BORDER_CLASSES}`}
        >
          <CornerDot />
        </div>
        <div className={`border-t border-r ${BORDER_CLASSES}`}>
          <SectionLabel label="About" />
        </div>
        <div className={`border-t ${BORDER_CLASSES}`}>
          <SectionHeader title="experiences" className=" mt-2" />
        </div>
        <div
          className={`p-2 border-l border-t flex items-center justify-center ${BORDER_CLASSES}`}
        />
      </div>
    </div>
  );
};

export default ExperienceCard;

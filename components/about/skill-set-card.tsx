import React from "react";
import { BORDER_CLASSES } from "./experience/constants";
import { SectionHeader } from "./experience/SectionHeader";

import { cn } from "@/lib/utils";
import { CornerDot } from "./experience/ConerDot";
import { aboutPageData } from "@/data/site-data";

// Data removed, now using site-data.ts

interface GridListsProps {
  title: string;
  lists: string[];
  ignoreLastBorderB?: boolean;
  columns?: number;
  itemClassName?: string;
}

const GridLists = ({
  title,
  lists,
  ignoreLastBorderB = false,
  columns = 2,
  itemClassName,
}: GridListsProps) => {
  return (
    <div className="flex flex-col w-full">
      <span className={cn("text-center text-xs py-1 border-b", BORDER_CLASSES)}>
        {title}
      </span>
      <div
        className={`grid grid-cols-${columns} ${columns > 2 ? "gap-0" : ""}`}
      >
        {lists.map((item, idx) => {
          const isLastRow =
            ignoreLastBorderB &&
            idx >= lists.length - (lists.length % columns || columns);

          return (
            <div
              key={idx}
              className={cn(
                "p-2 text-sm ",
                itemClassName,
                BORDER_CLASSES,
                idx % columns !== columns - 1 ? "border-r" : "",
                !isLastRow ? "border-b" : "",
              )}
            >
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};

function SkillSetCard() {
  return (
    <section className="   w-full md:w-[700px] bg-yellow-300 rounded-lg  shadow-lg transform transition-transform duration-300 hover:-translate-y-10">
      <div className=" grid grid-cols-[30px_1fr_30px]">
        {/* Header start */}
        <div className=" border-b border-r flex justify-center items-center border-dotted border-black">
          <CornerDot />
        </div>
        <div className={`border-b ${BORDER_CLASSES}`}>
          <SectionHeader className=" p-2" title="Skill Set" />
        </div>
        <div className=" border-b border-l border-dotted border-black" />
        {/* Header End */}
        <div
          className={cn(
            "border-r flex flex-col justify-evenly items-center ",
            BORDER_CLASSES,
          )}
        >
          <CornerDot />
          <CornerDot />
        </div>
        <div className=" flex w-full flex-col">
          <GridLists
            title="Core Technologies"
            lists={aboutPageData.skills.skillSets}
            itemClassName="text-base md:text-lg font-medium"
          />
          <GridLists title="Software" lists={aboutPageData.skills.software} />
          <GridLists
            title="Languages"
            lists={aboutPageData.skills.languages}
            ignoreLastBorderB
          />
        </div>
        <div className={cn("border-l flex justify-center ", BORDER_CLASSES)} />

        {/* Footer Start */}
        <div className=" border-t border-r flex justify-center items-center border-dotted border-black">
          <CornerDot />
        </div>
        <div className={`border-t ${BORDER_CLASSES}`}>
          <SectionHeader className=" p-2" title="Skill Set" />
        </div>
        <div className=" border-t border-l border-dotted border-black" />
        {/* Footer End */}
      </div>
    </section>
  );
}
export default SkillSetCard;

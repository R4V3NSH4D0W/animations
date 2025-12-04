"use client";
import ExperienceCard from "@/components/about/experience-card";
import SkillSetCard from "@/components/about/skill-set-card";
import React from "react";
import { gsap } from "gsap";
import DetailSection from "@/components/about/experience/detail-section";
import { useGSAP } from "@gsap/react";

function Page() {
  const experienceRef = React.useRef<HTMLDivElement>(null);
  const skillsetRef = React.useRef<HTMLDivElement>(null);
  const detailRef = React.useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = React.useState<string | null>(null);

  // Initial entrance animation
  useGSAP(() => {
    // Set initial state: all cards below and hidden
    gsap.set([experienceRef.current, skillsetRef.current, detailRef.current], {
      y: 100,
      opacity: 0,
    });

    // Animate cards in sequence: Experience -> Skill Set -> Detail
    const tl = gsap.timeline({ delay: 1.4 });
    tl.to(experienceRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
    })
      .to(
        skillsetRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4"
      )
      .to(
        detailRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4"
      );
  }, []);

  const handleExperienceClick = () => {
    const viewportWidth = window.innerWidth;
    const slideDistance = viewportWidth - 58;

    if (activeCard === "experience") {
      // Return to original state
      gsap.to([skillsetRef.current, detailRef.current], {
        x: 0,
        duration: 0.8,
        ease: "power3.inOut",
        stagger: 0.1,
      });
      setActiveCard(null);
    } else {
      // Move skill set and detail to right
      gsap.to(skillsetRef.current, {
        x: slideDistance,
        duration: 0.8,
        ease: "power3.inOut",
      });
      gsap.to(detailRef.current, {
        x: slideDistance,
        duration: 0.8,
        ease: "power3.inOut",
        delay: 0.1,
      });
      setActiveCard("experience");
    }
  };

  const handleSkillsetClick = () => {
    const viewportWidth = window.innerWidth;
    const slideDistance = viewportWidth - 58;

    if (activeCard === "skillset") {
      // Return to original state
      gsap.to(detailRef.current, {
        x: 0,
        duration: 0.8,
        ease: "power3.inOut",
      });

      // If experience was hidden, bring it back too
      gsap.to(skillsetRef.current, {
        x: 0,
        duration: 0.8,
        ease: "power3.inOut",
      });

      setActiveCard(null);
    } else if (activeCard === "experience") {
      // Coming from experience state: skillset is already slid out
      // Bring skillset back to visible position and slide detail out
      gsap.to(skillsetRef.current, {
        x: 0,
        duration: 0.8,
        ease: "power3.inOut",
      });
      gsap.to(detailRef.current, {
        x: slideDistance,
        duration: 0.8,
        ease: "power3.inOut",
      });
      setActiveCard("skillset");
    } else {
      // From default state: just slide detail out
      gsap.to(detailRef.current, {
        x: slideDistance,
        duration: 0.8,
        ease: "power3.inOut",
      });
      setActiveCard("skillset");
    }
  };

  const handleDetailClick = () => {
    const viewportWidth = window.innerWidth;
    const slideDistance = viewportWidth - 58;

    if (activeCard === "detail") {
      // Return to original state
      gsap.to([skillsetRef.current, detailRef.current], {
        x: 0,
        duration: 0.8,
        ease: "power3.inOut",
        stagger: 0.1,
      });
      setActiveCard(null);
    } else if (activeCard === "experience") {
      // Coming from experience state: both are slid out
      // Bring both back to show detail
      gsap.to([skillsetRef.current, detailRef.current], {
        x: 0,
        duration: 0.8,
        ease: "power3.inOut",
        stagger: 0.1,
      });
      setActiveCard("detail");
    } else if (activeCard === "skillset") {
      // Coming from skillset state: detail is slid out
      // Bring detail back to visible
      gsap.to(detailRef.current, {
        x: 0,
        duration: 0.8,
        ease: "power3.inOut",
      });
      setActiveCard("detail");
    } else {
      // From default state: detail is already visible
      setActiveCard("detail");
    }
  };

  return (
    <main className="py-20">
      <div className=" flex mb-10 text-8xl gap-20 mx-10 ">
        <span>About</span>
        <span>Me</span>
      </div>
      <div className="relative">
        <div
          ref={experienceRef}
          onClick={handleExperienceClick}
          className="cursor-pointer"
        >
          <ExperienceCard />
        </div>
        <div
          ref={skillsetRef}
          onClick={handleSkillsetClick}
          className="absolute top-[10%] cursor-pointer"
        >
          <SkillSetCard />
        </div>
        <div
          ref={detailRef}
          onClick={handleDetailClick}
          className="absolute top-[30%] cursor-pointer"
        >
          <DetailSection />
        </div>
      </div>
    </main>
  );
}

export default Page;

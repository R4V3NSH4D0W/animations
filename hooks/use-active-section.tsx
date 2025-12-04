import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useActiveSectionAuto() {
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef<HTMLElement[]>([]);

  const registerSection = (el: HTMLElement | null) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  useEffect(() => {
    const triggers = sectionRefs.current.map((section, index) =>
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveSection(index),
        onEnterBack: () => setActiveSection(index),
      })
    );

    return () => {
      triggers.forEach((t) => t.kill());
      sectionRefs.current = [];
    };
  }, []);

  return { activeSection, registerSection };
}

// export default function Portfolio() {
//   const { activeSection, registerSection } = useActiveSectionAuto();

//   return (
//     <div>
//       <SideNavigation sections={sections} activeSection={activeSection} />

//       <section ref={registerSection}>Hero Section</section>
//       <section ref={registerSection}>Details Section</section>
//       <section ref={registerSection}>Experiences Section</section>
//       <section ref={registerSection}>Profile Section</section>
//       <section ref={registerSection}>Contact Section</section>
//     </div>
//   );
// }

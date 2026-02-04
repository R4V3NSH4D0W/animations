import PhysicsText from "@/components/shared/physics-text";
import ViewReveal from "@/components/shared/view-reveal";
import ProcessSection from "@/components/expertise/process-section";

function Page() {
  const skills = [
    {
      category: "Development",
      items: [
        "Next.js / React",
        "TypeScript",
        "Node.js / Express",
        "PostgreSQL / Prisma",
        "WebSockets / RTC",
      ],
    },
    {
      category: "Creative",
      items: [
        "GSAP / Framer Motion",
        "WebGL / Three.js",
        "Interactive Design",
        "Creative Coding",
        "Canvas API",
      ],
    },
    {
      category: "Design",
      items: [
        "UI/UX Architecture",
        "Design Systems",
        "Responsive",
        "Accessibility",
        "Figma",
      ],
    },
  ];

  return (
    <main className="flex flex-col h-full w-full overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="relative h-[calc(100vh+200px)] sm:h-screen w-full border-b border-black/10">
        <div className="absolute left-[5%] sm:left-[3%] md:left-[2%] top-[20%] md:top-[14%] w-[90%] sm:w-auto z-10">
          <ViewReveal revealAfter={1} startHidden enableBlur={false}>
            <div className="flex flex-col gap-2">
              <span className="uppercase text-xs sm:text-sm font-bold tracking-widest mb-2">
                (My Expertise)
              </span>
              <h1 className="font-serif italic text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] leading-[0.9]">
                Building
                <br />
                Interactive
                <br />
                Experiences.
              </h1>
            </div>
          </ViewReveal>
        </div>

        <div className="absolute bottom-[20%] sm:bottom-[30%] right-[5%] w-[90%] sm:w-[60%] lg:w-[45%] z-10">
          <ViewReveal revealAfter={1.5} startHidden enableBlur={false}>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12">
              {skills.slice(0, 4).map((skill, idx) => (
                <div key={idx} className="flex flex-col gap-3">
                  <h3 className="font-serif italic text-2xl border-b border-black/10 pb-2 mb-1">
                    {skill.category}
                  </h3>
                  <ul className="flex flex-col gap-1">
                    {skill.items.map((item, i) => (
                      <li
                        key={i}
                        className="text-sm font-medium uppercase tracking-wide text-neutral-600"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </ViewReveal>
        </div>

        <PhysicsText
          text="EXPERTISE"
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
      </section>
      <ProcessSection />
    </main>
  );
}

export default Page;

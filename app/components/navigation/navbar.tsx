import AnimatedClock from "../shared/animated-clock";
import HoverFlip from "../shared/hover-flip";
import Shuffle from "../shared/shuffle-text";
import ViewReveal from "../shared/view-reveal";

const navItems = [
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Experties", href: "/experties" },
  { name: "Work", href: "/work" },
  { name: "o-word", href: "/o-word" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  return (
    <div className="flex fixed top-0 left-0 right-0 z-9999 flex-row justify-between items-center p-5 ">
      {/* <span className="uppercase font-extrabold font-sans text-3xl">ogkai</span> */}
      <Shuffle
        text="Luxstore"
        shuffleDirection="right"
        duration={0.5}
        animationMode="evenodd"
        shuffleTimes={2}
        ease="power3.out"
        stagger={0.05}
        threshold={0.1}
        triggerOnce={false}
        triggerOnHover={true}
        respectReducedMotion={true}
        className="text-foreground uppercase font-extrabold "
        style={{
          fontSize: "clamp(1rem, 3vw, 1.5rem)",
          fontFamily: "inherit",
        }}
      />

      <ViewReveal startHidden revealAfter={0.5} enableBlur={false}>
        <div className="space-x-8">
          {navItems.map((item, idx) => (
            <HoverFlip key={idx} flipDuration={500} className=" text-sm">
              {item.name}
            </HoverFlip>
          ))}
        </div>
      </ViewReveal>

      <AnimatedClock />
    </div>
  );
}

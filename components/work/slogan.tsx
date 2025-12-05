import { usePathname } from "next/navigation";

function Slogan() {
  const pathname = usePathname();

  if (pathname === "/contact") return;

  const getSloganText = () => {
    switch (pathname) {
      case "/about":
        return "Passionate Developer & Creative Problem Solver";
      case "/work":
        return "Building Digital Products That Make a Difference";
      case "/services":
        return "Expert Solutions for Modern Web Development";
      default:
        return "Crafting Fast, Beautiful, and Scalable Web Experiences";
    }
  };

  return (
    <div className="flex flex-col w-full py-10 sm:py-12 md:py-16 lg:py-20 items-center px-4">
      <h2 className="text-center font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl max-w-4xl leading-tight">
        {getSloganText()}
      </h2>
      <div className="flex flex-col w-screen ">
        <div className="flex flex-row flex-wrap justify-between gap-4 sm:gap-2 uppercase mt-10 sm:mt-12 md:mt-16 lg:mt-20 mx-4 sm:mx-6 md:mx-8 lg:mx-10 items-center text-xs sm:text-sm">
          <span>Email</span>
          <span>Instagram</span>
          <span>LinkedIn</span>
          <span>Resume</span>
        </div>
        <h5 className="w-full lg:-mt-15 whitespace-nowrap uppercase text-center font-bold text-[16vw] leading-tight">
          PORTFOLIO
        </h5>
      </div>
    </div>
  );
}

export default Slogan;

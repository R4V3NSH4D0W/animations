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
    <div className=" flex flex-col w-full py-20  items-center ">
      <h2 className=" text-center font-medium  text-5xl w-4xl">
        {getSloganText()}
      </h2>
      <div className=" flex flex-col">
        <div className="flex flex-row justify-between uppercase mt-20 mx-10 items-center">
          <span>Email</span>
          <span>Instagram</span>
          <span>LinkedIn</span>
          <span>Resume</span>
          <span />
        </div>
        <h5 className="w-full -mt-15  whitespace-nowrap uppercase  text-center font-bold text-[16vw] leading-tight">
          PORTFOLIO
        </h5>
      </div>
    </div>
  );
}

export default Slogan;

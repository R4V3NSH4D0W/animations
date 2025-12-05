import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
interface FeaturedWorkProps {
  title: string;
  date: string;
  marquee: string;
  description: string;
  mainImageURL: string;
  sideImageURLs: string[];
  subTitle: string;
}

function FeaturedWork({
  title,
  date,
  marquee,
  description,
  mainImageURL,
  sideImageURLs,
  subTitle,
}: FeaturedWorkProps) {
  return (
    <div className="pt-6 sm:pt-8 md:pt-10 mx-4 sm:mx-6 md:mx-10">
      <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-0">
        <div className="flex items-end">
          <span className="text-3xl sm:text-4xl md:text-5xl w-full md:max-w-3xl font-medium leading-tight">
            {title}
          </span>
        </div>
        <div className="flex flex-col w-full md:w-[300px] lg:w-[400px] shrink-0">
          <div className="flex justify-between md:block">
            <span className="block text-sm sm:text-base">{date}</span>
            <span className="block text-sm sm:text-base md:mt-1">
              {subTitle}
            </span>
          </div>
          <Marquee className="uppercase bg-gray-500/20 mt-4 md:mt-10 py-1 text-sm sm:text-base">
            {marquee}
          </Marquee>
        </div>
      </div>
      <div className="flex w-full my-6 sm:my-8 md:my-10 border-b border-dashed border-gray-300" />
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr_1fr] gap-8 w-full mt-6 sm:mt-8 md:mt-10">
        <div className="flex flex-col gap-4 order-2 md:order-1">
          <span className="flex uppercase text-sm sm:text-base leading-relaxed text-gray-700">
            {description}
          </span>
          <div className="flex flex-row gap-2 items-center cursor-pointer hover:gap-4 transition-all duration-300">
            <span className="uppercase text-sm font-medium">View Projects</span>
            <ArrowRight size={16} />
          </div>
        </div>
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[530px] flex items-center justify-center overflow-hidden rounded-lg order-1 md:order-2">
          <Image
            src={mainImageURL}
            fill
            alt="featured work image"
            className="object-cover rounded-lg hover:scale-105 transition-transform duration-700"
            sizes="(min-width: 1024px) 500px, 100vw"
          />
        </div>
        <div className="flex flex-row md:flex-col gap-4 md:gap-y-8 overflow-hidden order-3">
          {sideImageURLs.map((img, idx) => (
            <div
              key={idx}
              className="relative w-1/2 md:w-full h-[142px] sm:h-[192px] md:h-[234px] lg:h-[249px] rounded-lg overflow-hidden"
            >
              <Image
                src={img}
                fill
                alt={`Featured` + idx}
                className="object-cover rounded-lg hover:scale-105 transition-transform duration-700"
                sizes="(min-width: 1024px) 300px, 50vw"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeaturedWork;

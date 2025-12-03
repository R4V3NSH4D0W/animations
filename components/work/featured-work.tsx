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
    <div className=" pt-10  mx-10">
      <div className=" flex flex-row justify-between  ">
        <div className=" flex items-end">
          <span className=" text-5xl w-3xl">{title}</span>
        </div>
        <div className=" flex flex-col w-[400px]">
          <span>{date}</span>
          <span>{subTitle}</span>
          <Marquee className=" uppercase bg-gray-500/20 mt-10">
            {marquee}
          </Marquee>
        </div>
      </div>
      <div className=" flex w-full my-10 border-b border-dashed" />
      <div className="grid grid-cols-[1fr_1.5fr_1fr] gap-x-8 w-full mt-10">
        <div className=" flex flex-col gap-4">
          <span className="flex  uppercase text-sm leading-relaxed">
            {description}
          </span>
          <div className=" flex flex-row gap-2 items-center">
            <span>View Projects</span>
            <ArrowRight size={16} />
          </div>
        </div>
        <div className="relative w-full h-[400px] lg:h-full flex items-center justify-center overflow-hidden rounded-lg">
          <Image
            src={mainImageURL}
            fill
            alt="featured work image"
            className="object-cover rounded-lg"
            sizes="(min-width: 1024px) 600px, 100vw"
          />
        </div>
        <div className="flex flex-col gap-y-8 overflow-hidden">
          {sideImageURLs.map((img, idx) => (
            <div
              key={idx}
              className="relative w-full h-[250px] rounded-lg overflow-hidden"
            >
              <Image
                src={img}
                fill
                alt={`Featured` + idx}
                className="object-cover rounded-lg"
                sizes="(min-width: 1024px) 300px, 100vw"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeaturedWork;

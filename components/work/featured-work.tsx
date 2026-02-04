import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";

interface FeaturedWorkProps {
  id: string;
  link?: string | null;
  title: string;
  date: string;
  marquee: string;
  description: string;
  mainImageURL: string;
  sideImageURLs: string[];
  subTitle: string;
}

function FeaturedWork({
  id,
  link,
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
        <div className="flex flex-col gap-6 order-2 md:order-1">
          <span className="flex uppercase text-base sm:text-lg leading-relaxed text-gray-800 font-medium tracking-wide">
            {description}
          </span>
          <div className="flex flex-row flex-wrap gap-5">
            <Link
              href={`/works/${id}`}
              className="group inline-flex items-center gap-2 text-sm uppercase hover:gap-3 transition-all font-medium"
            >
              <span>View Case Study</span>
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>

            {link && (
              <Link
                href={link}
                target="_blank"
                className="group inline-flex items-center gap-2 text-sm uppercase hover:gap-3 transition-all text-neutral-500 hover:text-black"
              >
                <span>Visit Website</span>
                <ArrowUpRight
                  size={16}
                  className="group-hover:translate-x-1 -translate-y-px group-hover:-translate-y-[3px] transition-transform"
                />
              </Link>
            )}
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
                quality={100}
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

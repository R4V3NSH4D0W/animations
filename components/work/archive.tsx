import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React from "react";

const unsplashImages = [
  "https://i.pinimg.com/1200x/7e/4f/60/7e4f6088db726caa62f83305f9ec2dfe.jpg",
  "https://i.pinimg.com/1200x/31/5a/30/315a30e6724f3e4d80243fb9d35cca4b.jpg",
  "https://i.pinimg.com/736x/dc/f5/dd/dcf5dd0aa46d04af9c753f53f28c62d4.jpg",
  "https://i.pinimg.com/736x/7c/b7/94/7cb794cde0c90cc66f32680488aa6ba4.jpg",
  "https://i.pinimg.com/1200x/7e/4e/5d/7e4e5df9df1ea639c0e4827febf9a417.jpg",
  "https://i.pinimg.com/1200x/bf/ab/22/bfab225971b567dacb6e215e33059406.jpg",
  "https://i.pinimg.com/736x/c6/d9/eb/c6d9eb4dd52d8e126954df1d8ac04b24.jpg",
  "https://i.pinimg.com/736x/1b/c3/7f/1bc37ffb58278d72a38bc9fefe08bd72.jpg",
  "https://i.pinimg.com/736x/b5/4e/1d/b54e1d8c9c1c99ad2c009d8036bd46a6.jpg",
  "https://i.pinimg.com/736x/a1/a4/d8/a1a4d86355c9324255713b10bec2283c.jpg",
  "https://i.pinimg.com/736x/01/e1/1b/01e11bb6b17f8919a3db065cb128f81d.jpg",
  "https://i.pinimg.com/1200x/0d/de/d1/0dded1470c2d5c305e80719d2c89d70d.jpg",
  "https://i.pinimg.com/736x/02/c5/1f/02c51f5ac04bbaf2f8f3564b8ffe6476.jpg",
  "https://i.pinimg.com/736x/d3/2e/33/d32e33b73263bde02a0bd77b6d303da5.jpg",
  "https://i.pinimg.com/1200x/81/4d/21/814d21f9722109b9d9bbacd64885ea36.jpg",
];

function Archive() {
  return (
    <div className="my-6 sm:my-8 md:my-10 mx-4 sm:mx-6 md:mx-8 lg:mx-10">
      <div className="flex flex-col md:flex-row gap-4 md:gap-0">
        <span className="text-3xl sm:text-4xl md:text-5xl w-full md:w-[30%] lg:w-[20%] font-medium">
          Archive
        </span>
        <div className="w-full flex justify-start md:justify-center">
          <span className="text-sm sm:text-base uppercase max-w-lg text-gray-700">
            A curated stash of playful, bite-sized creations too small for a
            project, but too good to keep hidden.
          </span>
        </div>
      </div>
      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 
            auto-rows-[150px] sm:auto-rows-[180px] md:auto-rows-[200px] lg:auto-rows-[220px] 
            mt-6 sm:mt-8 md:mt-10
            border border-dashed border-neutral-400 
            divide-x divide-y divide-dashed divide-neutral-400"
      >
        {unsplashImages.map((src, index) => (
          <div key={index} className="p-3 sm:p-4 md:p-5 relative">
            {/* Number Top Left */}
            <span className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4 text-xs sm:text-sm z-10 font-bold bg-white/70 px-1">
              {index + 1}
            </span>

            <Image
              src={src}
              alt="archive image"
              fill
              className="object-cover aspect-square transition-transform duration-300 p-3 sm:p-4 md:p-5 hover:rotate-3"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 16vw, 12.5vw"
            />
          </div>
        ))}

        {/* SEE MORE BOX */}
        <div className="p-3 sm:p-4 md:p-5 relative flex items-center justify-center cursor-pointer">
          <div className="w-full h-full bg-yellow-400 text-white rounded-md flex flex-col sm:flex-row gap-1 sm:gap-2 items-center justify-center hover:bg-yellow-400/80 transition">
            <span className="text-xs font-semibold uppercase text-center">
              See More
            </span>
            <ArrowRight size={16} className="hidden sm:block" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Archive;

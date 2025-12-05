import Link from "next/link";
import React from "react";
import { Copyright } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { useGsapLineReveal } from "@/components/shared/useGsapLineReveal";
import Slogan from "./work/slogan";
import { useNavigation } from "@/hooks/use-navigation";

function Footer() {
  const lineRef = useGsapLineReveal({
    fromWidth: 0,
    toWidth: "100%",
    delay: 0.8,
  });
  const inputLineRef = useGsapLineReveal({
    fromWidth: 0,
    toWidth: "100%",
    delay: 0.8,
  });

  const firstLineRef = useGsapLineReveal({
    fromWidth: 0,
    toWidth: "100%",
    delay: 0.8,
  });
  const { navigate } = useNavigation();

  return (
    <footer className="mx-4 sm:mx-6 md:mx-8 lg:mx-10 flex flex-col">
      <Slogan />
      <div
        ref={firstLineRef}
        className="w-full border-[0.2px] border-black my-6 md:my-10"
      />
      <div
        className="mt-3 md:mt-5 cursor-pointer"
        onClick={() => navigate("/")}
      >
        Home
      </div>
      <span className="mt-6 md:mt-10 text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
        Don&apos;t Miss A Thing <br /> With R4V3NSH4D0W
      </span>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 my-6 md:my-10">
        <div className="flex flex-col">
          <div className="relative w-full lg:w-2/3">
            <label className="text-xs font-semibold">
              EXPERT INSIGHTS DIRECT TO YOUR INBOX
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter your email"
                className="mt-2 p-2 w-full pr-10 focus:outline-none bg-transparent"
                style={{ border: "none" }}
              />
              <div
                ref={inputLineRef}
                className="absolute left-0 right-0 bottom-0 h-[0.5px] bg-black overflow-hidden"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-black">
                <ArrowRight size={20} />
              </span>
            </div>
          </div>
          <div className="flex flex-col mt-6 md:mt-10">
            <label className="text-xs uppercase font-semibold">
              get in touch
            </label>
            <span className="mt-2 text-lg sm:text-xl break-all">
              lenishmagar@gmail.com
            </span>
          </div>
        </div>
        <div className="flex flex-row justify-between sm:justify-start sm:gap-16 lg:justify-between uppercase mt-0 lg:mt-10">
          <div className="flex flex-col gap-1">
            <span className="uppercase font-bold text-xs mb-2">Portfolio</span>
            <span className="text-sm">About</span>
            <span className="text-sm">Services</span>
            <span className="text-sm">Work</span>
            <span className="text-sm">Contact</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="uppercase font-bold text-xs mb-2">Follow Me</span>
            <span className="text-sm">Instagram</span>
            <span className="text-sm">LinkedIn</span>
            <span className="text-sm">Twitter</span>
            <span className="text-sm">Facebook</span>
          </div>
        </div>
      </div>
      <div
        ref={lineRef}
        className="w-full border-[0.2px] border-black my-6 md:my-10"
      />
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-10">
        <span className="flex items-center gap-1 text-xs sm:text-sm">
          <Copyright size={16} className="inline-block flex-shrink-0" />
          2024 Lenish. All rights reserved.
        </span>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 uppercase text-xs sm:text-sm">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

import Link from "next/link";
import React from "react";
import { Copyright } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { useGsapLineReveal } from "@/components/shared/useGsapLineReveal";

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

  return (
    <footer className=" mx-10 flex flex-col">
      <div
        ref={lineRef}
        className="w-full border-[0.1px] border-black overflow-hidden"
      />
      <Link className=" mt-5" href="/">
        Home
      </Link>
      <span className=" mt-10 text-6xl">
        Don&apos;t Miss A Thing <br /> With R4V3NSH4D0W
      </span>
      <div className=" grid grid-cols-2 my-10">
        <div className=" flex flex-col">
          <div className="relative w-2/3">
            <label className=" text-xs font-semibold">
              EXPERT INSIGHTS DIRECT TO YOUR INBOX
            </label>
            <div className=" relative">
              <input
                type="text"
                placeholder="Enter your email"
                className="mt-2 p-2 w-full pr-10 focus:outline-none"
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
          <div className=" flex flex-col mt-10">
            <label className=" text-xs uppercase font-semibold">
              get in touch
            </label>
            <span className=" mt-2 text-xl">lenishmagar@gmail.com</span>
          </div>
        </div>
        <div className=" flex justify-between uppercase mt-10">
          <div className=" flex flex-col">
            <span className=" uppercase font-bold text-xs mb-2">Portfolio</span>
            <span>About</span>
            <span>Services</span>
            <span>Work</span>
            <span>Contact</span>
          </div>
          <div className=" flex flex-col">
            <span className=" uppercase font-bold text-xs mb-2">Follow Us</span>
            <span>Instagram</span>
            <span>LinkedIn</span>
            <span>Twitter</span>
            <span>Facebook</span>
          </div>
        </div>
      </div>
      <div
        ref={lineRef}
        className=" w-full border-[0.2px] border-black my-10"
      />
      <div className=" flex flex-row justify-between items-center mb-10">
        <span className="flex items-center gap-1">
          <Copyright size={16} className="inline-block" />
          2024 R4V3N. All rights reserved.
        </span>
        <div className=" flex space-x-5 uppercase">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

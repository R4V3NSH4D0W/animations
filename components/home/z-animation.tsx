"use client";

import { useMedia } from "react-use";
import ZAnimationDesktop from "./z-animation-desktop";
import ZAnimationMobile from "./z-animation-mobile";

export default function ZAnimation() {
  const isMobile = useMedia("(max-width: 767px)", false);

  // Render appropriate layout
  return isMobile ? <ZAnimationMobile /> : <ZAnimationDesktop />;
}

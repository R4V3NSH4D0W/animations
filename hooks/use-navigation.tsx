"use client";

import { usePageTransition } from "./use-page-transition";
import { usePathname } from "next/navigation";

export function useNavigation() {
  const { navigateWithTransition } = usePageTransition();
  const pathname = usePathname();

  const navigate = (href: string) => {
    // Don't navigate if already on the same page
    if (pathname === href) return;

    navigateWithTransition(href);
  };

  const isActive = (href: string) => {
    return pathname === href;
  };

  return {
    navigate,
    isActive,
    currentPath: pathname,
  };
}

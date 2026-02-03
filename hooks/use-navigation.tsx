"use client";

import { usePathname, useRouter } from "next/navigation";

export function useNavigation() {
  const pathname = usePathname();
  const router = useRouter();

  const navigate = (href: string) => {
    // Don't navigate if already on the same page
    if (pathname === href) return;

    router.push(href);
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

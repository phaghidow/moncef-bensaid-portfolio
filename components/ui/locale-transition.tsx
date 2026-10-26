"use client";

import { m, useReducedMotion } from "framer-motion";
import { usePathname } from "@/i18n/routing";
import type { ReactNode } from "react";

type LocaleTransitionProps = {
  children: ReactNode;
};

export function LocaleTransition({ children }: LocaleTransitionProps) {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();

  return (
    <m.div
      key={pathname}
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={reducedMotion ? undefined : { opacity: 1 }}
      transition={reducedMotion ? undefined : { duration: 0.15, ease: "easeOut" }}
    >
      {children}
    </m.div>
  );
}

"use client";

import { m, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  initialOnly?: boolean;
};

const revealTransition = {
  duration: 0.5,
  ease: [0.16, 1, 0.3, 1] as const,
};

export function Reveal({ children, className, delay = 0, initialOnly = false }: RevealProps) {
  const reducedMotion = useReducedMotion();

  // prefers-reduced-motion → tout désactivé (spec §8) : on rend le contenu
  // statique, sans wrapper motion, plutôt que de désactiver au cas par cas.
  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      // initialOnly = contenu au-dessus de la ligne de flottaison (hero) :
      // révélé une seule fois au montage, sans attendre l'entrée dans le viewport.
      {...(initialOnly
        ? { animate: { opacity: 1, y: 0 } }
        : {
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, margin: "-80px" },
          })}
      transition={{ ...revealTransition, delay }}
    >
      {children}
    </m.div>
  );
}
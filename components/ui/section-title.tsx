import type { ReactNode } from "react";

type SectionTitleProps = {
  id: string;
  children: ReactNode;
};

export function SectionTitle({ id, children }: SectionTitleProps) {
  return (
    <h2
      id={id}
      className="mt-4 font-display text-[clamp(1.35rem,2.6vw,2rem)] font-medium leading-[1.1] tracking-tight text-text-primary"
    >
      {children}
    </h2>
  );
}

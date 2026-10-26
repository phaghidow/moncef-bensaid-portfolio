"use client";

import { m, useReducedMotion } from "framer-motion";

type TimelineItemProps = {
  experience: {
    role: string;
    company: string;
    period: string;
    location: string;
    description: string;
  };
  index: number;
};

export function TimelineItem({ experience, index }: TimelineItemProps) {
  const reducedMotion = useReducedMotion();
  const [role, subtitle] = experience.role.split(" — ");
  const companyMatch = experience.company.match(/^(.*?)(?: \(([^)]+)\))?$/);
  const company = companyMatch?.[1] ?? experience.company;
  const department = companyMatch?.[2];

  return (
    <m.article
      initial={reducedMotion ? false : { opacity: 0, y: 16 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="grid grid-cols-1 gap-7 border-b border-border py-9 first:pt-7 last:border-b-0 md:grid-cols-12 md:gap-x-8 md:py-10"
    >
      <div className="md:col-span-1">
        <span className="font-mono text-[11px] tabular-nums text-text-muted">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="md:col-span-7">
        <h3 className="font-display text-[19px] font-medium uppercase leading-tight tracking-[0.02em] text-text-primary md:text-[22px]">
          {role}
        </h3>
        {subtitle && (
          <p className="mt-1 font-sans text-sm text-text-muted">{subtitle}</p>
        )}

        <div className="mt-4 md:hidden">
          <p className="font-sans text-sm text-text-secondary">{company}</p>
          {department && (
            <p className="mt-1 font-sans text-sm text-text-muted">{department}</p>
          )}
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted">
            {experience.period}
          </p>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted">
            {experience.location}
          </p>
        </div>

        <p className="mt-5 max-w-[62ch] font-sans text-sm leading-[1.65] text-text-secondary md:text-base">
          {experience.description}
        </p>
      </div>

      <div className="hidden md:col-span-4 md:block md:text-right">
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted md:text-xs">
          {experience.period}
        </p>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted md:text-xs">
          {experience.location}
        </p>
        <div className="mt-5">
          <p className="font-sans text-sm text-text-secondary">{company}</p>
          {department && (
            <p className="mt-1 font-sans text-sm text-text-muted">{department}</p>
          )}
        </div>
      </div>
    </m.article>
  );
}

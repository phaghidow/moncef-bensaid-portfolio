import type { ReactNode } from "react";

/* Ligne de fiche avec points de conduite (desktop) */
export function FactRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1 border-b border-border py-4 sm:flex-row sm:items-baseline sm:gap-4">
      <dt className="meta sm:flex sm:flex-1 sm:items-baseline sm:gap-3 sm:after:h-px sm:after:min-w-6 sm:after:flex-1 sm:after:border-b sm:after:border-dotted sm:after:border-border">
        {label}
      </dt>
      <dd className="text-base leading-relaxed text-text-primary sm:max-w-[62%] sm:text-right">
        {children}
      </dd>
    </div>
  );
}

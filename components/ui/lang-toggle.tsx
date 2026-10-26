"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "@/i18n/routing";

export function LangToggle() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("nav");
  const nextLocale = locale === "fr" ? "en" : "fr";

  const cleanPath = pathname.replace(/^\/(fr|en)(?=\/|$)/, "") || "/";
  const nextPath = `/${nextLocale}${cleanPath === "/" ? "" : cleanPath}`;

  return (
    <a
      href={nextPath}
      aria-label={t("langSwitch")}
      className="font-mono text-xs uppercase tracking-widest text-text-secondary transition-colors duration-fast hover:text-accent"
    >
      <span className={locale === "fr" ? "text-accent" : undefined}>FR</span>
      <span className="px-1 text-text-muted">|</span>
      <span className={locale === "en" ? "text-accent" : undefined}>EN</span>
    </a>
  );
}
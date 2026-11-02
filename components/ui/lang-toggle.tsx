"use client";

import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { usePathname } from "@/i18n/routing";

export function LangToggle() {
  const locale = useLocale();
  const pathname = usePathname();
  const params = useParams();
  const t = useTranslations("nav");
  const nextLocale = locale === "fr" ? "en" : "fr";
  const projectSlug = params.slug;
  const nextPath =
    pathname === "/projects/[slug]" && typeof projectSlug === "string"
      ? `/${nextLocale}/${nextLocale === "fr" ? "projets" : "projects"}/${encodeURIComponent(projectSlug)}`
      : `/${nextLocale}`;

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
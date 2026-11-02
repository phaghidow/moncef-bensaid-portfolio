"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { LangToggle } from "@/components/ui/lang-toggle";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const navItems = [
  { key: "projects", href: "#projets" },
  { key: "experience", href: "#experience" },
  { key: "about", href: "#about" },
  { key: "contact", href: "#contact" },
] as const;

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export function Navbar({ isShowcase = false }: { isShowcase?: boolean }) {
  const locale = useLocale();
  const t = useTranslations("nav");
  const [isOpen, setIsOpen] = useState(false);
  const isHomePage = !isShowcase;
  const homeHref = locale === "fr" ? "/fr" : "/en";

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/80 bg-surface/95 shadow-sm backdrop-blur-md">
      <nav
        className="mx-auto flex h-16 max-w-container items-center justify-between px-4 sm:px-6 md:px-8"
        aria-label={t("navigation")}
      >
        <a
          href={isHomePage ? "#hero" : `${homeHref}#hero`}
          className={`relative shrink-0 font-newsreader text-lg font-medium text-accent transition-colors duration-fast hover:text-text-primary ${focusRing}`}
        >
          MB.
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={isHomePage ? item.href : `${homeHref}${item.href}`}
              className={`group relative py-2 font-mono text-xs uppercase tracking-widest text-text-secondary transition-colors duration-theme hover:text-accent ${focusRing}`}
            >
              {t(item.key)}
              <span
                className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-theme group-hover:scale-x-100"
                aria-hidden="true"
              />
            </a>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
          <LangToggle />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            aria-label={t(isOpen ? "closeMenu" : "openMenu")}
            className={`inline-flex size-9 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-accent-soft hover:text-accent md:hidden ${focusRing}`}
          >
            {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-nav"
        hidden={!isOpen}
        className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border bg-bg shadow-xl md:hidden"
      >
        <div className="mx-auto flex max-w-container flex-col px-4 py-3 sm:px-6">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={isHomePage ? item.href : `${homeHref}${item.href}`}
              onClick={() => setIsOpen(false)}
              className={`min-h-12 border-b border-border px-3 py-4 font-mono text-xs uppercase tracking-[0.16em] text-text-secondary transition-colors duration-theme last:border-none hover:bg-accent-soft hover:text-accent ${focusRing}`}
            >
              {t(item.key)}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
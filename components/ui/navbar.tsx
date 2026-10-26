"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { LangToggle } from "@/components/ui/lang-toggle";
import { ThemeToggle } from "@/components/ui/theme-toggle";

// NOUVELLES CLÉS À AJOUTER dans messages/fr.json et messages/en.json,
// dans l'objet "nav" existant :
//
// "navigation": "Navigation principale" / "Main navigation"
// "openMenu": "Ouvrir le menu" / "Open menu"
// "closeMenu": "Fermer le menu" / "Close menu"

const navItems = [
  { key: "projects", href: "#projets" },
  { key: "experience", href: "#experience" },
  { key: "about", href: "#a-propos" },
  { key: "contact", href: "#contact" },
] as const;

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export function Navbar() {
  const t = useTranslations("nav");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-border/80 bg-surface/80 backdrop-blur-md">
      <nav
        className="mx-auto flex h-full max-w-container items-center justify-between px-6 md:px-8"
        aria-label={t("navigation")}
      >
        <a
          href="#hero"
          className={`relative font-newsreader text-lg font-medium text-accent transition-colors duration-fast hover:text-text-primary ${focusRing}`}
        >
          MB.
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className={`group relative py-2 font-mono text-xs uppercase tracking-widest text-text-secondary hover:text-text-primary ${focusRing}`}
            >
              {t(item.key)}
              <span
                className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-theme group-hover:scale-x-100"
                aria-hidden="true"
              />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <LangToggle />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            aria-label={t(isOpen ? "closeMenu" : "openMenu")}
            className={`text-text-secondary transition-colors hover:text-accent md:hidden ${focusRing}`}
          >
            {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div
          id="mobile-nav"
          className="border-t border-border bg-surface/95 backdrop-blur-md md:hidden"
        >
          <div className="flex flex-col px-6 py-2">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`border-b border-border py-4 font-mono text-xs uppercase tracking-widest text-text-secondary last:border-none hover:text-accent ${focusRing}`}
              >
                {t(item.key)}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { useSyncExternalStore } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const t = useTranslations("nav");
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={t(isDark ? "themeLight" : "themeDark")}
      className="relative inline-flex size-9 items-center justify-center text-text-secondary transition-colors duration-fast hover:text-accent"
    >
      <Sun className={`absolute size-4 transition-all duration-theme ${isDark ? "scale-0 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"}`} aria-hidden="true" />
      <Moon className={`absolute size-4 transition-all duration-theme ${isDark ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-90 opacity-0"}`} aria-hidden="true" />
    </button>
  );
}
import { getTranslations } from "next-intl/server";
import { EasterEggTerminalLoader } from "@/components/ui/easter-egg-terminal-loader";

export async function Footer() {
  const t = await getTranslations("footer");
  const easterEgg = await getTranslations("easterEgg");
  const lines = easterEgg.raw("lines") as string[];

  return (
    <footer className="border-t border-border px-6 py-8 md:px-8">
      <div className="mx-auto flex max-w-container flex-col gap-3 font-mono text-xs text-text-muted md:flex-row md:items-center md:justify-between">
        <p>{t("rights")}</p>
        <EasterEggTerminalLoader lines={lines} closeLabel={easterEgg("close")} hint={t("terminalHint")} />
      </div>
    </footer>
  );
}
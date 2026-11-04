import { getTranslations } from "next-intl/server";
import { ArrowDownRight, ArrowUpRight, Download } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

export async function Hero() {
  const t = await getTranslations("hero");

  const cvHref = "/cv_bensaid_moncef_farid.pdf";

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate min-h-screen overflow-hidden bg-bg scroll-mt-20"
    >
      {/* Ambient bronze glow */}
      <div
        className="glow pointer-events-none -top-64 left-[38%] opacity-70"
        aria-hidden="true"
      />

      {/* Subtle engineering grid */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.025]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
        }}
      />

      <Reveal
        initialOnly
        className="relative mx-auto flex min-h-screen max-w-container flex-col justify-center px-6 pb-20 pt-28 md:px-8 md:pb-16 md:pt-24"
      >
        {/* Masthead : positionnement + localisation */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-border pb-4 md:mb-14">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted">
            <span className="hidden sm:inline">{t("kicker")}</span>
            <span className="sm:hidden">{t("kickerMobile")}</span>
          </p>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted">
            <span className="hidden sm:inline">{t("location")}</span>
            <span className="sm:hidden">{t("locationMobile")}</span>
          </span>
        </div>

        {/* Nom, intro, actions */}
        <div className="max-w-5xl">
          <h1
            id="hero-title"
            className="text-[3.25rem] font-medium leading-[0.98] tracking-[-0.035em] text-text-primary sm:text-[4.25rem] md:text-[5.25rem] lg:text-[6.25rem]"
          >
            {t("name")}
          </h1>

          <p className="mt-7 max-w-[40rem] text-lg leading-[1.65] text-text-secondary md:text-xl">
            {t.rich("leadRich", {
              em: (chunks) => <em className="text-text-primary">{chunks}</em>,
            })}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projets"
              className="group inline-flex h-11 items-center gap-2 rounded-lg bg-[var(--text-primary)] px-5 font-mono text-[13px] tracking-[0.02em] text-[var(--bg)] transition-colors duration-200 hover:bg-[var(--accent)]"
            >
              {t("primaryCta")}
              <ArrowUpRight
                className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>

            <a
              href={cvHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-11 items-center gap-2 rounded-lg border border-[var(--border)] px-5 font-mono text-[13px] tracking-[0.02em] text-[var(--text-primary)] transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              {t("secondaryCta")}
              <Download className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Bas : disponibilité (gauche) / défiler (droite) */}
        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between gap-6 border-t border-border pt-5 md:bottom-8 md:left-8 md:right-8">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]"
            />
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-muted">
              <span className="hidden sm:inline">{t("availability")}</span>
              <span className="sm:hidden">{t("availabilityMobile")}</span>
            </span>
          </div>

          <a
            href="#stack"
            aria-label={t("scroll")}
            className="group flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-text-muted transition-colors duration-200 hover:text-[var(--accent)] focus-visible:text-[var(--accent)]"
          >
            <span className="hidden sm:inline">{t("scroll")}</span>
            <ArrowDownRight
              className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
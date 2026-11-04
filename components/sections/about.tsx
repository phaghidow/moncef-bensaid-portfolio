import { getTranslations } from "next-intl/server";
import { FactRow } from "@/components/ui/fact-row";
import { Reveal } from "@/components/ui/reveal";
import { SectionTitle } from "@/components/ui/section-title";

export async function About() {
  const t = await getTranslations("about");
  const qualities = t.raw("qualities") as string[];

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="scroll-mt-20 py-16 md:py-24"
    >
      <div className="mx-auto max-w-container px-6 md:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Colonne gauche sticky : typographie seule */}
          <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
            <Reveal>
              <p className="section-label">{t("label")}</p>
              <SectionTitle id="about-title">
                {t.rich("titleRich", {
                  em: (chunks) => (
                    <em className="font-normal italic text-text-secondary">
                      {chunks}
                    </em>
                  ),
                })}
              </SectionTitle>
              <span
                aria-hidden="true"
                className="mt-6 block h-px w-12 bg-text-primary"
              />
            </Reveal>
          </div>

          {/* Colonne droite : récit */}
          <div className="flex flex-col gap-14 md:gap-16 lg:col-span-8">
            {/* 1. Exergue */}
            <Reveal>
              <figure className="relative pt-6">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-1 -top-6 select-none font-display text-[9rem] leading-none text-text-muted opacity-25 md:-top-10 md:text-[12rem]"
                >
                  “
                </span>
                <blockquote className="relative font-display text-[clamp(1.75rem,3.4vw,2.5rem)] font-medium italic leading-[1.15] tracking-tight text-text-primary">
                  {t.rich("quote", {
                    mark: (chunks) => (
                      <mark className="bg-transparent text-inherit underline decoration-accent/70 decoration-2 underline-offset-[8px]">
                        {chunks}
                      </mark>
                    ),
                  })}
                </blockquote>
              </figure>
            </Reveal>

            {/* 2. Bio avec lettrine */}
            <Reveal>
              <p className="max-w-prose font-sans text-base leading-[1.75] text-text-secondary first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-[4.25rem] first-letter:font-medium first-letter:leading-[0.85] first-letter:text-text-primary">
                {t("bio")}
              </p>
            </Reveal>

            {/* 3. Fiche : parcours -> socle -> spécialisation */}
            <Reveal>
              <dl className="border-t border-border">
                <FactRow label={t("factsEducationLabel")}>
                  {t("factsEducation")}
                </FactRow>
                <FactRow label={t("factsFoundationLabel")}>
                  {t("factsFoundation")}
                </FactRow>
                <FactRow label={t("factsFocusLabel")}>
                  {t("factsFocus")}
                </FactRow>
              </dl>
            </Reveal>

            {/* 4. Atouts numérotés */}
            <Reveal>
              <p className="section-label mb-4">{t("qualitiesLabel")}</p>
              <ol className="grid grid-cols-2 gap-x-6 lg:grid-cols-4">
                {qualities.map((quality, i) => (
                  <li
                    key={quality}
                    className="group border-t border-border pb-6 pt-4"
                  >
                    <span className="meta tabular-nums transition-colors duration-fast group-hover:text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="mt-2 block font-display text-lg leading-snug text-text-primary">
                      {quality}
                    </span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

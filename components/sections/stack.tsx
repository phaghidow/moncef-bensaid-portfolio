import { getTranslations } from "next-intl/server";
import {
  SiLaravel,
  SiVuedotjs,
  SiReact,
  SiFastapi,
  SiQt,
  SiBootstrap,
  SiPython,
  SiPhp,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss,
  SiMysql,
  SiSqlite,
  SiTailwindcss,
  SiGit,
  SiGithub,
  SiFigma,
  SiFlutter,
  SiDart,
} from "react-icons/si";
import { FaJava } from "react-icons/fa6";
import { Reveal } from "@/components/ui/reveal";
import { SectionTitle } from "@/components/ui/section-title";

// 21 tuiles = 3 lignes de 7 (lg), 7 de 3 (sm), 11 de 2 (mobile).
// core = stack principale (profil CV). PyQt5 : SiQt est la référence la plus proche.
const techs = [
  { key: "laravel", group: "backend", core: true, Icon: SiLaravel },
  { key: "vue", group: "frontend", core: true, Icon: SiVuedotjs },
  { key: "react", group: "frontend", core: true, Icon: SiReact },
  { key: "fastapi", group: "backend", core: true, Icon: SiFastapi },
  { key: "pyqt", group: "desktop", core: false, Icon: SiQt },
  { key: "bootstrap", group: "styling", core: false, Icon: SiBootstrap },

  { key: "python", group: "language", core: true, Icon: SiPython },
  { key: "php", group: "language", core: false, Icon: SiPhp },
  { key: "javascript", group: "language", core: false, Icon: SiJavascript },
  { key: "typescript", group: "language", core: false, Icon: SiTypescript },
  { key: "html", group: "markup", core: false, Icon: SiHtml5 },
  { key: "css", group: "styling", core: false, Icon: SiCss },

  { key: "mysql", group: "database", core: true, Icon: SiMysql },
  { key: "sqlite", group: "database", core: false, Icon: SiSqlite },
  { key: "tailwind", group: "styling", core: false, Icon: SiTailwindcss },
  { key: "git", group: "versioning", core: false, Icon: SiGit },
  { key: "github", group: "versioning", core: false, Icon: SiGithub },
  { key: "figma", group: "design", core: false, Icon: SiFigma },
  { key: "java", group: "language", core: false, Icon: FaJava },
  { key: "flutter", group: "frontend", core: false, Icon: SiFlutter },
  { key: "dart", group: "language", core: false, Icon: SiDart },
] as const;

export async function Stack() {
  const t = await getTranslations("stack");

  return (
    <section
      id="stack"
      aria-labelledby="stack-title"
      className="scroll-mt-20 py-16 md:py-24"
    >
      <div className="mx-auto max-w-container px-6 md:px-8">
        {/* En-tête */}
        <Reveal>
          <div className="flex flex-col gap-6 border-b border-border pb-8 md:flex-row md:items-end md:justify-between md:pb-10">
            <div>
              <p className="section-label">{t("label")}</p>

              <SectionTitle id="stack-title">
                {t.rich("titleRich", {
                  em: (chunks) => (
                    <em className="font-normal italic text-text-secondary">{chunks}</em>
                  ),
                })}
              </SectionTitle>
            </div>

            <p className="max-w-xs text-sm leading-6 text-text-secondary md:text-right">
              {t("intro")}
            </p>
          </div>
        </Reveal>

        {/* Grille : 2 cols mobile / 3 tablette / 7 desktop */}
        <Reveal className="mt-8 md:mt-10">
          <ul className="grid grid-cols-2 border-l border-t border-border sm:grid-cols-3 lg:grid-cols-7">
            {techs.map(({ key, group, core, Icon }) => (
              <li
                key={key}
                className={[
                  "group relative flex min-h-36 list-none flex-col justify-between overflow-hidden",
                  "border-b border-r border-border bg-surface p-3",
                  "shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
                  "transition-colors duration-theme ease-smooth hover:bg-accent-soft",
                ].join(" ")}
              >
                {/* Haut : point « stack principale » + catégorie lisible (11px) */}
                <div className="flex items-start justify-between gap-2">
                  {core && (
                    <span className="mt-1 inline-flex shrink-0 items-center">
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 rounded-full bg-accent"
                      />
                      <span className="sr-only">{t("core")}</span>
                    </span>
                  )}
                  <span className="ml-auto text-right font-mono text-[11px] uppercase leading-tight tracking-[0.1em] text-text-muted">
                    {t(`groups.${group}`)}
                  </span>
                </div>

                {/* Centre : le logo est l'information principale */}
                <div className="flex flex-1 items-center justify-center py-3">
                  <Icon
                    aria-hidden="true"
                    className="h-8 w-8 text-text-secondary transition-colors duration-theme group-hover:text-accent"
                  />
                </div>

                {/* Bas : nom */}
                <div className="border-t border-border pt-2">
                  <span className="block font-sans text-sm font-medium text-text-primary">
                    {t(`items.${key}`)}
                  </span>
                </div>

                {/* Trait bronze au survol */}
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent transition-all duration-300 ease-out group-hover:w-full"
                />
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Légende + compteur */}
        <Reveal className="mt-5">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
            <p className="inline-flex items-center gap-2 font-mono text-xs text-text-muted">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-accent"
              />
              <span className="uppercase">{t("core")}</span>
            </p>
            <p className="font-mono text-xs tabular-nums text-text-muted">
              <span className="uppercase">{t("count", { count: techs.length })}</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
import { ArrowRight } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/reveal";
import { HoverImageLink } from "@/components/ui/hover-image-link";
import { getProjects, getProjectPreview } from "@/lib/projects";

export async function Projects() {
  const t = await getTranslations("projects");
  const locale = await getLocale();
  const projects = getProjects(locale);

  return (
    <section id="projets" aria-labelledby="projects-title" className="scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto max-w-container px-6 md:px-8">
        <Reveal>
          <p className="section-label">{t("label")}</p>
          <h2 id="projects-title" className="mt-3 font-display font-medium text-index-title">
            {t("title")}
          </h2>
          <p className="mt-4 font-mono text-sm text-text-muted">{t("indexHint")}</p>
        </Reveal>

        <div className="mt-10 space-y-0 md:mt-16">
          {projects.map(({ slug, project }, position) => {
            return (
              <Reveal key={slug} delay={position * 0.04}>
                <HoverImageLink
                  slug={slug}
                  preview={getProjectPreview(slug, project)}
                  className="group block border-b border-border py-8 transition-colors duration-theme hover:bg-accent-soft"
                  previewClassName="w-[min(340px,calc(100vw-28px))]"
                >
                  <div className="flex items-center justify-between gap-6">
                    <div className="flex min-w-0 items-center gap-4 md:gap-6">
                      <span className="font-mono text-sm text-accent transition-colors duration-theme group-hover:font-semibold">{project.index}</span>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="font-display text-2xl text-text-primary transition-colors duration-theme group-hover:text-accent md:text-3xl">
                            {project.title}
                          </h3>
                          {project.inProgress ? (
                            <span className="badge">{t("wip")}</span>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div className="hidden items-center gap-4 md:flex">
                      <span className="meta transition-colors duration-theme">
                        {project.client} · {project.year}
                      </span>
                      <ArrowRight className="size-4 text-text-muted transition-all duration-theme group-hover:translate-x-1 group-hover:text-accent" />
                    </div>

                    <ArrowRight className="size-5 text-text-muted transition-all duration-theme group-hover:translate-x-1 group-hover:text-accent md:hidden" />
                  </div>

                  <div className="mt-3 flex items-center justify-between md:hidden">
                    <span className="meta transition-colors duration-theme">
                      {project.client} · {project.year}
                    </span>
                  </div>
                </HoverImageLink>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
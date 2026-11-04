import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { CountUp } from "@/components/ui/count-up";
import { ImageLightbox } from "@/components/ui/image-lightbox";
import { HoverImageLink } from "@/components/ui/hover-image-link";
import { VideoShowcase } from "@/components/ui/video-showcase";
import { getProject, getProjects, getProjectPreview, getProjectSlugs } from "@/lib/projects";
import { absoluteUrl, metadataBase } from "@/lib/site";

const backHref = (locale: string) => `/${locale}/#projets`;

function ProjectMockup({ label }: { label: string }) {
  return (
    <div className="surface overflow-hidden">
      <div className="flex h-10 items-center gap-3 border-b border-border px-4">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-2 rounded-full bg-border" />
          <span className="size-2 rounded-full bg-border" />
          <span className="size-2 rounded-full bg-border" />
        </div>
        <div className="min-w-0 flex-1 truncate font-mono text-xs text-text-muted">
          {label}
        </div>
      </div>
      <div className="flex aspect-video items-center justify-center bg-code-bg">
        <div className="flex flex-col items-center gap-3 text-text-muted">
          <div className="flex size-10 items-center justify-center rounded-full border border-border bg-surface">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em]">UI</span>
          </div>
          <span className="font-mono text-sm">{label}</span>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return ["fr", "en"].flatMap((locale) =>
    getProjectSlugs().map((slug) => ({
      locale,
      slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  const project = getProject(slug, locale);
  if (!project) {
    return {};
  }

  const canonicalPath = `/${locale}/${locale === "fr" ? "projets" : "projects"}/${slug}`;
  const frenchPath = `/fr/projets/${slug}`;
  const englishPath = `/en/projects/${slug}`;

  return {
    metadataBase,
    title: `${project.title} — Moncef Bensaid`,
    description: project.caseStudy.context,
    alternates: {
      canonical: canonicalPath,
      languages: {
        fr: frenchPath,
        en: englishPath,
      },
    },
    openGraph: {
      title: `${project.title} — Moncef Bensaid`,
      description: project.caseStudy.context,
      url: absoluteUrl(canonicalPath),
      locale: locale === "fr" ? "fr_FR" : "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Moncef Bensaid`,
      description: project.caseStudy.context,
    },
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  const project = getProject(slug, locale);
  if (!project) {
    notFound();
  }

  const caseStudyT = await getTranslations({ locale, namespace: "caseStudy" });
  const projects = getProjects(locale);
  const currentIndex = projects.findIndex((entry) => entry.slug === slug);
  const previousProject = projects[(currentIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  const metrics = project.metrics;
  const galleryLabel = caseStudyT("galleryLabel");
  const backLabel = caseStudyT("back");
  const clientLabel = caseStudyT("clientLabel");
  const periodLabel = caseStudyT("periodLabel");
  const roleBoxLabel = caseStudyT("roleBoxLabel");
  const contextParts =
    project.collaborator && project.figmaUrl
      ? project.caseStudy.context.split(project.collaborator)
      : null;

  return (
    <div className="mx-auto max-w-container px-6 pb-20 pt-8 md:px-8 md:pb-24 md:pt-10">
      <div className="mb-10 md:mb-14">
        <a href={backHref(locale)} className="mono-link inline-flex items-center gap-2">
          <ArrowLeft className="size-4" aria-hidden="true" />
          {backLabel}
        </a>
      </div>

      <article className="space-y-12 md:space-y-16">
        <header className="space-y-6">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-muted">
            {project.index} — {project.period}
          </p>

          <div className="flex flex-col gap-6">
            <h1 className="font-display text-4xl leading-[1.08] text-text-primary md:text-6xl">
              {project.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3">
              <span className="badge">{clientLabel}: {project.client}</span>
              <span className="badge">{periodLabel}: {project.year}</span>
              {project.contextBadge && (
                <span className="badge">{project.contextBadge}</span>
              )}
              {project.headerRole && (
                <span className="badge">{project.headerRole}</span>
              )}
              {project.stack.map((item) => (
                <span key={`${slug}-${item}`} className="badge">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <dl className="grid gap-6 border-t border-border pt-8 md:grid-cols-3">
            {metrics.map((metric) => (
              <div key={`${slug}-${metric.label}`} className="space-y-2 border-b border-border pb-4 md:border-b-0 md:pb-0">
                <dt className="font-mono text-xs uppercase tracking-[0.2em] text-text-muted">
                  {metric.label}
                </dt>
                <dd className="font-mono text-3xl font-bold text-accent md:text-4xl">
                  <CountUp value={metric.value} />
                </dd>
              </div>
            ))}
          </dl>

        </header>

        <section className="space-y-4 border-t border-border pt-10 md:pt-12">
          <p className="font-mono text-sm uppercase tracking-[0.2em] text-accent">
            {caseStudyT("blocks.context")}
          </p>
          <div className="space-y-6">
            <p className="case-body max-w-3xl text-text-secondary">
              {contextParts &&
              contextParts.length > 1 &&
              project.collaborator &&
              project.figmaUrl ? (
                <>
                  {contextParts[0]}
                  <a
                    href={project.figmaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.collaborator} — ${locale === "fr" ? "ouvrir le prototype Figma" : "open the Figma prototype"}`}
                    title={locale === "fr" ? "Ouvrir le prototype Figma" : "Open the Figma prototype"}
                    className="whitespace-nowrap font-semibold text-accent transition-colors hover:text-text-primary"
                  >
                    <strong>{project.collaborator}</strong>
                  </a>
                  {contextParts.slice(1).join(project.collaborator)}
                </>
              ) : (
                project.caseStudy.context
              )}
            </p>

            <div className="surface p-5 md:p-6">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-muted">
                {roleBoxLabel}
              </p>
              <p className="mt-3 text-base text-text-primary md:text-lg">{project.caseStudy.role}</p>
            </div>
          </div>
        </section>

        <section className="space-y-4 border-t border-border pt-10 md:pt-12">
          <p className="font-mono text-sm uppercase tracking-[0.2em] text-accent">
            {caseStudyT("blocks.constraints")}
          </p>
          <ul className="case-body list-disc space-y-3 pl-5 text-text-secondary">
            {project.caseStudy.constraints.map((constraint) => (
              <li key={constraint}>{constraint}</li>
            ))}
          </ul>
        </section>

        <section className="space-y-4 border-t border-border pt-10 md:pt-12">
          <p className="font-mono text-sm uppercase tracking-[0.2em] text-accent">
            {caseStudyT("blocks.approach")}
          </p>
          <ol className="space-y-4">
            {project.caseStudy.approach.map((step, index) => (
              <li key={step} className="border-b border-border pb-4 last:border-b-0 last:pb-0">
                <div className="flex items-start gap-4">
                  <span className="font-mono text-sm text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="case-body text-text-secondary">{step}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="space-y-6 border-t border-border pt-10 md:pt-12">
          <p className="font-mono text-sm uppercase tracking-[0.2em] text-accent">
            {caseStudyT("blocks.outcome")}
          </p>
          <p className="case-body max-w-3xl text-text-secondary">
            {project.caseStudy.outcome}
          </p>

          {project.media ? (
            <div className="space-y-10">
              <div className="space-y-5">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-muted">
                  {galleryLabel}
                </p>
                <ImageLightbox
                  groups={project.media.screenshots}
                  openLabel={
                    locale === "fr" ? "Agrandir l’image" : "Enlarge image"
                  }
                  closeLabel={locale === "fr" ? "Fermer" : "Close"}
                  dialogLabel={
                    locale === "fr" ? "Aperçu de l’image" : "Image preview"
                  }
                  previousLabel={locale === "fr" ? "Précédente" : "Previous"}
                  nextLabel={locale === "fr" ? "Suivante" : "Next"}
                  moreLabel={
                    locale === "fr" ? "autres" : "more"
                  }
                  countLabel={
                    locale === "fr" ? "captures" : "screenshots"
                  }
                  swipeHint={
                    locale === "fr"
                      ? "Glissez ou utilisez ← → pour parcourir"
                      : "Swipe or use ← → to browse"
                  }
                  upcomingLabel={
                    locale === "fr" ? "À venir" : "Coming soon"
                  }
                />
              </div>

              {project.media.videos.length > 0 && (
                <section
                  aria-labelledby="workflow-video-heading"
                  className="space-y-5"
                >
                  <div className="flex flex-wrap items-end justify-between gap-3 border-b border-border pb-3">
                    <div className="space-y-1">
                      <h3
                        id="workflow-video-heading"
                        className="font-display text-xl text-text-primary md:text-2xl"
                      >
                        {project.media.videoHeading ??
                          (locale === "fr"
                            ? "Démonstration du workflow"
                            : "Workflow walkthrough")}
                      </h3>
                      <p className="max-w-2xl text-sm leading-relaxed text-text-muted md:whitespace-nowrap">
                        {project.media.videoIntro ??
                          (locale === "fr"
                            ? "Un aperçu des étapes clés couvertes par l’application."
                            : "A walkthrough of the key stages handled by the application.")}
                      </p>
                    </div>
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-muted">
                      01 {locale === "fr" ? "vidéo" : "video"}
                    </span>
                  </div>
                  <VideoShowcase
                    videos={project.media.videos}
                    playLabel={
                      locale === "fr" ? "Lancer la démo" : "Play demo"
                    }
                  />
                  {project.briefDocument && (
                    <section
                      aria-labelledby={`${slug}-brief-heading`}
                      className="space-y-5 border-t border-border pt-8"
                    >
                      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-border pb-4">
                        <div className="space-y-1">
                          <h3
                            id={`${slug}-brief-heading`}
                            className="font-display text-xl text-text-primary md:text-2xl"
                          >
                            {locale === "fr"
                              ? "Dans les coulisses"
                              : "Behind the scenes"}
                          </h3>
                          <p className="text-sm leading-relaxed text-text-muted">
                            {project.briefDocument.title}
                          </p>
                        </div>
                        <span className="rounded-full border border-border bg-surface px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-text-muted">
                          02 {locale === "fr" ? "pages" : "pages"}
                        </span>
                      </div>
                      <div className="surface overflow-hidden bg-white">
                        <iframe
                          src={`${project.briefDocument.pdfSrc}#page=1&zoom=page-width`}
                          title={project.briefDocument.title}
                          className="h-[75dvh] min-h-[28rem] w-full border-0 bg-white"
                        />
                      </div>
                    </section>
                  )}
                </section>
              )}

              {project.media.exportGallery && (
                <div className="border-t border-border pt-8">
                  <ImageLightbox
                    groups={[project.media.exportGallery]}
                    openLabel={
                      locale === "fr" ? "Agrandir l’image" : "Enlarge image"
                    }
                    closeLabel={locale === "fr" ? "Fermer" : "Close"}
                    dialogLabel={
                      locale === "fr" ? "Aperçu de l’image" : "Image preview"
                    }
                    previousLabel={locale === "fr" ? "Précédente" : "Previous"}
                    nextLabel={locale === "fr" ? "Suivante" : "Next"}
                    moreLabel={locale === "fr" ? "autres" : "more"}
                    countLabel={
                      locale === "fr" ? "aperçus" : "previews"
                    }
                    swipeHint={
                      locale === "fr"
                        ? "Glissez ou utilisez ← → pour parcourir"
                        : "Swipe or use ← → to browse"
                    }
                    upcomingLabel={
                      locale === "fr" ? "À venir" : "Coming soon"
                    }
                  />
                </div>
              )}

              {project.media.closingGallery && (
                <div className="border-t border-border pt-8">
                  <ImageLightbox
                    groups={[project.media.closingGallery]}
                    openLabel={
                      locale === "fr" ? "Agrandir l’image" : "Enlarge image"
                    }
                    closeLabel={locale === "fr" ? "Fermer" : "Close"}
                    dialogLabel={
                      locale === "fr" ? "Aperçu de l’image" : "Image preview"
                    }
                    previousLabel={
                      locale === "fr" ? "Précédente" : "Previous"
                    }
                    nextLabel={locale === "fr" ? "Suivante" : "Next"}
                    moreLabel={
                      locale === "fr" ? "autres" : "more"
                    }
                    countLabel={locale === "fr" ? "éléments" : "items"}
                    swipeHint={
                      locale === "fr"
                        ? "Glissez ou utilisez ← → pour parcourir"
                        : "Swipe or use ← → to browse"
                    }
                    upcomingLabel={
                      locale === "fr" ? "À venir" : "Coming soon"
                    }
                  />
                </div>
              )}

            </div>
          ) : (
            <div className="space-y-6">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-muted">
                {galleryLabel}
              </p>
              <div className="grid gap-6 md:grid-cols-3">
                {[1, 2, 3].map((item) => (
                  <ProjectMockup key={`${slug}-gallery-${item}`} label={`${slug}-${item}`} />
                ))}
              </div>
            </div>
          )}
        </section>
      </article>

      <nav className="mt-14 grid gap-4 border-t border-border pt-8 md:grid-cols-2">
        <HoverImageLink
          slug={previousProject.slug}
          title={previousProject.project.title}
          preview={getProjectPreview(previousProject.slug, previousProject.project)}
          label={locale === "fr" ? "Aperçu" : "Preview"}
        >
          <div className="flex items-center gap-3">
            <ArrowLeft className="size-4 text-text-muted transition-transform duration-theme group-hover:-translate-x-1 group-hover:text-accent" aria-hidden="true" />
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-muted">
                {caseStudyT("prev")}
              </p>
              <p className="mt-1 text-base text-text-primary">{previousProject.project.title}</p>
            </div>
          </div>
        </HoverImageLink>

        <HoverImageLink
          slug={nextProject.slug}
          title={nextProject.project.title}
          preview={getProjectPreview(nextProject.slug, nextProject.project)}
          label={locale === "fr" ? "Aperçu" : "Preview"}
          align="right"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="text-left">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-muted">
                {caseStudyT("next")}
              </p>
              <p className="mt-1 text-base text-text-primary">{nextProject.project.title}</p>
            </div>
            <ArrowRight className="size-4 text-text-muted transition-transform duration-theme group-hover:translate-x-1 group-hover:text-accent" aria-hidden="true" />
          </div>
        </HoverImageLink>
      </nav>
    </div>
  );
}

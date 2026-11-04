import type { MetadataRoute } from "next";
import { getProjectSlugs } from "@/lib/projects";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["fr", "en"] as const;

  const homePaths = {
    fr: "/fr",
    en: "/en",
  } as const;
  const projectPath = (locale: (typeof locales)[number], slug: string) =>
    `/${locale}/${locale === "fr" ? "projets" : "projects"}/${slug}`;

  return [
    ...locales.map((locale) => ({
      url: absoluteUrl(homePaths[locale]),
      lastModified: new Date(),
      alternates: {
        languages: {
          fr: absoluteUrl(homePaths.fr),
          en: absoluteUrl(homePaths.en),
        },
      },
    })),
    ...getProjectSlugs().flatMap((slug) =>
      locales.map((locale) => ({
        url: absoluteUrl(projectPath(locale, slug)),
        lastModified: new Date(),
        alternates: {
          languages: {
            fr: absoluteUrl(projectPath("fr", slug)),
            en: absoluteUrl(projectPath("en", slug)),
          },
        },
      })),
    ),
  ];
}

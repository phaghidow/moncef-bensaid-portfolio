import type { MetadataRoute } from "next";
import { getProjectSlugs } from "@/lib/projects";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://moncef-bensaid.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["fr", "en"] as const;

  const entries: MetadataRoute.Sitemap = [
    ...locales.flatMap((locale) => {
      const homePath = locale === "fr" ? "/" : "/en";

      return [
        {
          url: new URL(homePath, siteUrl).toString(),
          lastModified: new Date(),
          alternates: {
            languages: {
              fr: new URL("/", siteUrl).toString(),
              en: new URL("/en", siteUrl).toString(),
            },
          },
        },
        ...getProjectSlugs().map((slug) => ({
          url: new URL(locale === "fr" ? `/projets/${slug}` : `/projects/${slug}`, siteUrl).toString(),
          lastModified: new Date(),
          alternates: {
            languages: {
              fr: new URL(`/projets/${slug}`, siteUrl).toString(),
              en: new URL(`/projects/${slug}`, siteUrl).toString(),
            },
          },
        })),
      ];
    }),
  ];

  return entries;
}

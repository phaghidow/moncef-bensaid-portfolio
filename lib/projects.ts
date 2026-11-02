import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

export type ProjectLocale = "en" | "fr";

export type ProjectGalleryGroup = {
  id: string;
  title: string;
  description: string;
  images: { src: string; title: string; alt: string }[];
  upcoming?: string[];
  centered?: boolean;
  mobileMockup?: boolean;
};

export type ProjectVideo = {
  src: string;
  poster: string;
  title: string;
  hook: string;
  description: string;
  duration: string;
};

export type Project = {
  index: string;
  period: string;
  role: string;
  title: string;
  description: string;
  client: string;
  year: string;
  inProgress?: boolean;
  metrics: { value: string; label: string }[];
  features: string;
  stack: string[];
  media?: {
    screenshots: ProjectGalleryGroup[];
    videos: ProjectVideo[];
    videoHeading?: string;
    videoIntro?: string;
    exportGallery?: ProjectGalleryGroup;
    closingGallery?: ProjectGalleryGroup;
  };
  caseStudy: {
    context: string;
    role: string;
    constraints: string[];
    approach: string[];
    outcome: string;
  };
};

const projectsDirectory = join(process.cwd(), "content", "projects");

function isProjectLocale(locale: string): locale is ProjectLocale {
  return locale === "en" || locale === "fr";
}

export function getProjectSlugs(): string[] {
  return readdirSync(projectsDirectory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

export function getProject(slug: string, locale: string): Project | undefined {
  if (!isProjectLocale(locale) || !getProjectSlugs().includes(slug)) {
    return undefined;
  }

  const projectPath = join(projectsDirectory, slug, `${locale}.json`);
  return JSON.parse(readFileSync(projectPath, "utf8")) as Project;
}

export function getProjects(locale: string): { slug: string; project: Project }[] {
  if (!isProjectLocale(locale)) {
    return [];
  }

  return getProjectSlugs()
    .map((slug) => ({ slug, project: getProject(slug, locale) }))
    .filter((entry): entry is { slug: string; project: Project } => Boolean(entry.project))
    .sort((left, right) => left.project.index.localeCompare(right.project.index, undefined, { numeric: true }));
}

export function getProjectPreview(slug: string, project: Project): string | undefined {
  if (slug === "telecom") {
    return "/projects/pms-algerie-telecom/Admin_Dashboard.png";
  }
  if (slug === "soumissionnaires") {
    return "/projects/soumissionnaires/Vue_densemble.png";
  }

  return project.media?.screenshots[0]?.images[0]?.src;
}

import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/reveal";

type Education = {
  degree: string;
  school: string;
  period: string;
  note?: string;
};

type EducationItemProps = {
  education: Education;
};

const educationKeys = ["master", "licence", "bac", "code213"] as const;

function EducationItem({ education }: EducationItemProps) {
  return (
    <article className="flex flex-col gap-3 border-b border-border py-5 last:border-b-0 md:grid md:grid-cols-[1fr_auto] md:items-start md:gap-8">
      <div>
        <h3 className="font-display text-base font-semibold text-text-primary">{education.degree}</h3>
        <p className="mt-1 text-sm text-text-secondary">{education.school}</p>
        {education.note ? <p className="mt-1 text-xs text-text-muted">{education.note}</p> : null}
      </div>
      <p className="font-mono text-xs text-text-muted md:pt-0.5 md:text-right">{education.period}</p>
    </article>
  );
}

export async function Education() {
  const t = await getTranslations("education");
  const education = t.raw("items") as Record<(typeof educationKeys)[number], Education>;

  return (
    <section id="formation" aria-labelledby="education-title" className="scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto max-w-container px-6 md:px-8">
        <Reveal>
          <p className="section-label">{t("label")}</p>
          <h2 id="education-title" className="mt-3 font-display font-medium text-section-title">{t("title")}</h2>
        </Reveal>
        <Reveal className="mt-10">
          {educationKeys.map((key) => <EducationItem key={key} education={education[key]} />)}
        </Reveal>
      </div>
    </section>
  );
}
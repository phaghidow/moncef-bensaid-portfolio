import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/reveal";
import { TimelineItem } from "@/components/sections/experience-timeline-item";
import { SectionTitle } from "@/components/ui/section-title";

type Experience = {
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
};

const experienceKeys = ["telecom", "freelance", "teacher"] as const;

export async function Experience() {
  const t = await getTranslations("experience");
  const experiences = t.raw("items") as Record<
    (typeof experienceKeys)[number],
    Experience
  >;

  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="scroll-mt-20 py-16 md:py-24"
    >
      <div className="mx-auto max-w-container px-6 md:px-8">
        <Reveal>
          <div className="border-b border-border pb-8 md:pb-10">
            <p className="section-label">{t("label")}</p>
            <SectionTitle id="experience-title">
              {t.rich("titleRich", {
                em: (chunks) => (
                  <em className="font-normal italic text-text-secondary">{chunks}</em>
                ),
              })}
            </SectionTitle>
          </div>
        </Reveal>

        <div>
          {experienceKeys.map((key, index) => (
            <TimelineItem
              key={key}
              experience={experiences[key]}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
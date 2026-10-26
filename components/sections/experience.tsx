import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/reveal";
import { TimelineItem } from "@/components/sections/experience-timeline-item";

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
            <h2
              id="experience-title"
              className="mt-4 font-display text-section-title font-medium tracking-tight text-text-primary"
            >
              {t("title")}
              <span className="ml-2 font-display font-normal italic text-text-secondary">
                {t("titleAccent")}
              </span>
            </h2>
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
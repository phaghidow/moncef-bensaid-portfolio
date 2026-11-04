import { getTranslations } from "next-intl/server";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { FactRow } from "@/components/ui/fact-row";
import { Reveal } from "@/components/ui/reveal";
import { SectionTitle } from "@/components/ui/section-title";

const emailAddress = "moncefbensai123@gmail.com";

const socialLinks = [
  { labelKey: "githubLabel", href: "https://github.com/phaghidow", icon: FaGithub },
  { labelKey: "linkedinLabel", href: "https://www.linkedin.com/in/moncef-bensaid/", icon: FaLinkedinIn },
] as const;

const displayUrl = (href: string) =>
  href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

export async function Contact() {
  const t = await getTranslations("contact");

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="scroll-mt-20 py-16 md:py-24"
    >
      <div className="mx-auto max-w-container px-6 md:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Colonne gauche sticky : même pattern qu'À propos */}
          <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
            <Reveal>
              <p className="section-label">{t("label")}</p>
              <SectionTitle id="contact-title">
                {t.rich("titleRich", {
                  em: (chunks) => (
                    <em className="font-normal italic text-text-secondary">{chunks}</em>
                  ),
                })}
              </SectionTitle>
              <span
                aria-hidden="true"
                className="mt-6 block h-px w-12 bg-text-primary"
              />
            </Reveal>
          </div>

          {/* Colonne droite */}
          <div className="flex flex-col gap-12 md:gap-14 lg:col-span-8">
            <Reveal>
              <p className="max-w-prose font-sans text-lg leading-[1.7] text-text-secondary">
                {t("lead")}
              </p>
            </Reveal>

            {/* Email : le point focal */}
            <Reveal>
              <p className="section-label mb-4">{t("emailCTA")}</p>
              <a
                href={`mailto:${emailAddress}`}
                aria-label={`${t("emailLabel")}: ${emailAddress}`}
                title={emailAddress}
                className="group relative inline-block font-display text-[clamp(1.5rem,4.2vw,3rem)] font-medium leading-none tracking-tight text-text-primary [overflow-wrap:anywhere]"
              >
                {emailAddress}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 -bottom-2 h-[2px] origin-left scale-x-100 bg-border transition-colors duration-theme group-hover:bg-accent"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 -bottom-2 h-[2px] origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100"
                />
              </a>
            </Reveal>

            {/* Fiche : réseaux */}
            <Reveal>
              <dl className="border-t border-border">
                {socialLinks.map(({ labelKey, href, icon: Icon }) => (
                  <FactRow key={labelKey} label={t(labelKey)}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 transition-colors duration-theme hover:text-accent"
                    >
                      <Icon size={16} aria-hidden="true" />
                      {displayUrl(href)}
                      <span aria-hidden="true">↗</span>
                    </a>
                  </FactRow>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

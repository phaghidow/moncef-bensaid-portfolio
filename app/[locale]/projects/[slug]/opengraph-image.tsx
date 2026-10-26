import { ImageResponse } from "next/og";
import { getProject } from "@/lib/projects";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const title = getProject(slug, locale)?.title ?? (locale === "fr" ? "Étude de cas" : "Case study");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fafaf7",
          padding: 72,
          fontFamily: "sans-serif",
          color: "#1a1a18",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontFamily: "monospace",
            fontSize: 24,
            color: "#92600a",
          }}
        >
          <span>mb.</span>
          <span>{locale === "fr" ? "étude de cas" : "case study"}</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 24,
              letterSpacing: 6,
              color: "#92600a",
            }}
          >
            {locale === "fr" ? "TRAVAIL" : "WORK"}
          </div>

          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1,
              maxWidth: 900,
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 26,
            color: "#5c5c56",
          }}
        >
          <span>Moncef Bensaid</span>
          <span style={{ color: "#92600a", fontWeight: 700 }}>moncef-bensaid.dev</span>
        </div>
      </div>
    ),
    size,
  );
}

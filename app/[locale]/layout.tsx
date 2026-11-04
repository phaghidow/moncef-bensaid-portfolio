import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { Fraunces, IBM_Plex_Mono, Inter, Newsreader } from "next/font/google";
import Script from "next/script";
import { notFound } from "next/navigation";
import { ThemeProvider } from "@/components/theme-provider";
import { LocaleTransition } from "@/components/ui/locale-transition";
import { MotionProvider } from "@/components/ui/motion-provider";
import { routing } from "@/i18n/routing";
import { absoluteUrl, metadataBase } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT", "WONK"],
});

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-ibm-plex-mono",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  const homePath = `/${locale}`;
  const canonicalUrl = absoluteUrl(homePath);

  return {
    metadataBase,
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: homePath,
      languages: {
        fr: "/fr",
        en: "/en",
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: canonicalUrl,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${fraunces.variable} ${newsreader.variable} ${inter.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <Script
          id="theme-fouc"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light'){document.documentElement.classList.toggle('dark',t==='dark')}}catch(e){}})()",
          }}
        />
      </head>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider><MotionProvider><main><LocaleTransition>{children}</LocaleTransition></main></MotionProvider></ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
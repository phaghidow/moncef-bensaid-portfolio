import { Newsreader } from "next/font/google";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-newsreader",
  display: "swap",
});

export default function CaseStudyLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className={newsreader.variable}>{children}</div>;
}
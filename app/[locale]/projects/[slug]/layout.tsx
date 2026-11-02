import { Newsreader } from "next/font/google";
import { Navbar } from "@/components/ui/navbar";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-newsreader",
  display: "swap",
});

export default function CaseStudyLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={newsreader.variable}>
      <Navbar isShowcase />
      <div className="pt-16">{children}</div>
    </div>
  );
}
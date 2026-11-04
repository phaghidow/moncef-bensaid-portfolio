import type { Metadata } from "next";
import { metadataBase } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}

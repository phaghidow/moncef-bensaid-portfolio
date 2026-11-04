export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://moncef-bensaid.vercel.app";
export const metadataBase = new URL(siteUrl);

export function absoluteUrl(pathname: string): string {
  return new URL(pathname, metadataBase).toString();
}

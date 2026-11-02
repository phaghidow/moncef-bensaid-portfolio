import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const url = new URL(request.url);
  const frenchCaseStudy = url.pathname.match(/^\/(?:fr\/)?projets\/([^/]+)\/?$/);

  if (frenchCaseStudy) {
    url.pathname = `/fr/projects/${frenchCaseStudy[1]}`;
    return NextResponse.rewrite(url);
  }

  if (url.pathname.startsWith("/fr/projects/")) {
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
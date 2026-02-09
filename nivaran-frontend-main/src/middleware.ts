import { NextRequest, NextResponse } from "next/server";
import subdomains from "../subdomains.json";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  if (
    pathname.startsWith("/_next") || // Next.js static files
    pathname.startsWith("/static") || // Custom static assets
    pathname.match(
      /\.(jpg|jpeg|png|gif|svg|ico|webp|woff|woff2|ttf|eot|otf|css|js|json)$/
    ) // Static file extensions
  ) {
    return NextResponse.next();
  }
  const host = req.headers.get("host") || "";
  const allowedDomains = ["localhost:3000", "nivaranfoundation.org"];

  const isAllowedDomain = allowedDomains.some((domain) =>
    host.includes(domain)
  );
  const subdomain = host.split(".")[0];

  // Check if the subdomain is valid
  if (isAllowedDomain && subdomains.some((d) => d.subdomain === subdomain)) {
    const url = req.nextUrl.clone();
    // Rewrite based on subdomain and path
    url.pathname = `/${subdomain}${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // Default behavior
  return NextResponse.next();
}

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
  const allowedDomains = ["localhost", "nivaranfoundation.org", "vercel.app"];

  const isAllowedDomain = allowedDomains.some((domain) =>
    host.includes(domain)
  );
  const subdomain = host.split(".")[0];

  // Check if the subdomain is valid and not the main domain
  // Skip subdomain rewrite for main domain, localhost, and vercel preview URLs
  if (
    isAllowedDomain &&
    subdomains.some((d) => d.subdomain === subdomain) &&
    !host.includes("vercel.app") &&
    !host.startsWith("localhost") &&
    !host.startsWith("nivaranfoundation.org")
  ) {
    const url = req.nextUrl.clone();
    // Rewrite based on subdomain and path
    url.pathname = `/${subdomain}${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // Default behavior
  return NextResponse.next();
}

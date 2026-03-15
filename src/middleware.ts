import { NextRequest, NextResponse } from "next/server";
import { CONTENT_PORTAL_SESSION_COOKIE } from "@/lib/content/constants";
import subdomains from "../subdomains.json";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const pathname = url.pathname;
  const host = req.headers.get("host") || "";
  const normalizedHost = host.toLowerCase().split(":")[0];
  const subdomainRoutePrefixes: Record<string, string> = {
    global: "/global",
    usa: "/usa",
  };

  // Non-www → www 301 redirect (SEO: consolidate link equity)
  if (
    normalizedHost === "nivaranfoundation.org" &&
    !pathname.startsWith("/_next") &&
    !pathname.startsWith("/api")
  ) {
    return NextResponse.redirect(
      new URL(`https://www.nivaranfoundation.org${pathname}${url.search}`),
      301
    );
  }

  const isDashboardPath =
    pathname === "/dashboard" || pathname.startsWith("/dashboard/");
  const isBlogsEditorPath =
    pathname === "/blogs/editor" || pathname.startsWith("/blogs/editor/");
  const isContentPostsApiPath =
    pathname === "/api/content/posts" || pathname.startsWith("/api/content/posts/");
  const isContentUploadApiPath = pathname === "/api/content/upload-image";
  const isContentProtectedApiPath =
    isContentPostsApiPath || isContentUploadApiPath;

  if (
    pathname.startsWith("/_next") || // Next.js static files
    pathname.startsWith("/static") || // Custom static assets
    pathname.match(
      /\.(jpg|jpeg|png|gif|svg|ico|webp|woff|woff2|ttf|eot|otf|css|js|json)$/
    ) // Static file extensions
  ) {
    return NextResponse.next();
  }

  if (isDashboardPath || isBlogsEditorPath || isContentProtectedApiPath) {
    const authToken = req.cookies.get("authToken")?.value || "";
    const contentPortalSession =
      req.cookies.get(CONTENT_PORTAL_SESSION_COOKIE)?.value || "";

    const hasDashboardAuth = Boolean(authToken);
    const hasContentPortalAuth = Boolean(contentPortalSession);
    const hasAnyDashboardAuth = hasDashboardAuth || hasContentPortalAuth;

    if (hasAnyDashboardAuth) {
      return NextResponse.next();
    }

    if (isContentProtectedApiPath) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/content-login";
    loginUrl.searchParams.set("next", `${pathname}${req.nextUrl.search}`);
    return NextResponse.redirect(loginUrl);
  }

  const allowedDomains = ["localhost", "nivaranfoundation.org", "vercel.app"];
  const knownSubdomains = subdomains.map((item) => item.subdomain);

  const isAllowedDomain = allowedDomains.some((domain) =>
    normalizedHost.includes(domain)
  );
  const subdomain = normalizedHost.split(".")[0];
  const isPreviewOrLocalHost =
    normalizedHost.includes("vercel.app") ||
    normalizedHost.startsWith("localhost") ||
    normalizedHost.startsWith("127.0.0.1");
  const isKnownSubdomainHost =
    isAllowedDomain &&
    knownSubdomains.includes(subdomain) &&
    !isPreviewOrLocalHost &&
    !normalizedHost.startsWith("nivaranfoundation.org");

  // Root-level SEO routes that must NOT be rewritten on subdomains.
  // These are handled by variant-aware route handlers at the app root.
  const SEO_ROOT_PATHS = ["/robots.txt", "/sitemap.xml", "/llms.txt"];

  // Check if the subdomain is valid and not the main domain
  // Skip subdomain rewrite for main domain, localhost, and vercel preview URLs
  if (isKnownSubdomainHost) {
    // Let root-level SEO routes pass through to the app-root handlers
    if (SEO_ROOT_PATHS.includes(pathname)) {
      return NextResponse.next();
    }

    const subdomainPath = subdomainRoutePrefixes[subdomain] || `/${subdomain}`;

    if (pathname === subdomainPath || pathname.startsWith(`${subdomainPath}/`)) {
      return NextResponse.next();
    }

    const url = req.nextUrl.clone();
    // Rewrite based on subdomain and path
    url.pathname = `${subdomainPath}${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  const reservedSubdomainPaths = [
    ...knownSubdomains.map((name) => `/${name}`),
    ...Object.values(subdomainRoutePrefixes),
  ];
  const isDirectSubdomainPath = reservedSubdomainPaths.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  if (isDirectSubdomainPath && !isPreviewOrLocalHost) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/";
    redirectUrl.search = "";
    return NextResponse.redirect(redirectUrl);
  }

  // Default behavior
  return NextResponse.next();
}

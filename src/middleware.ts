import { NextRequest, NextResponse } from "next/server";
import { CONTENT_PORTAL_SESSION_COOKIE } from "@/lib/content/constants";
import subdomains from "../subdomains.json";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const pathname = url.pathname;
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

  const host = req.headers.get("host") || "";
  const allowedDomains = ["localhost", "nivaranfoundation.org", "vercel.app"];
  const knownSubdomains = subdomains.map((item) => item.subdomain);

  const isAllowedDomain = allowedDomains.some((domain) =>
    host.includes(domain)
  );
  const subdomain = host.split(".")[0];
  const isPreviewOrLocalHost =
    host.includes("vercel.app") ||
    host.startsWith("localhost") ||
    host.startsWith("127.0.0.1");
  const isKnownSubdomainHost =
    isAllowedDomain &&
    knownSubdomains.includes(subdomain) &&
    !isPreviewOrLocalHost &&
    !host.startsWith("nivaranfoundation.org");

  // Check if the subdomain is valid and not the main domain
  // Skip subdomain rewrite for main domain, localhost, and vercel preview URLs
  if (isKnownSubdomainHost) {
    const subdomainPath = `/${subdomain}`;

    if (pathname === subdomainPath || pathname.startsWith(`${subdomainPath}/`)) {
      return NextResponse.next();
    }

    const url = req.nextUrl.clone();
    // Rewrite based on subdomain and path
    url.pathname = `${subdomainPath}${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  const isDirectSubdomainPath = knownSubdomains.some(
    (name) => pathname === `/${name}` || pathname.startsWith(`/${name}/`)
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

import { headers } from "next/headers";

export async function getSubdomainPathPrefix(subdomain: string) {
  const headerStore = await headers();
  const host =
    headerStore.get("x-forwarded-host") || headerStore.get("host") || "";

  return host.startsWith(`${subdomain}.`) ? "" : `/${subdomain}`;
}

export function withSubdomainPrefix(prefix: string, path: string) {
  if (!path.startsWith("/")) {
    return `${prefix}/${path}`;
  }

  if (path === "/") {
    return prefix || "/";
  }

  return `${prefix}${path}`;
}

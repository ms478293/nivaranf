const DEFAULT_PUBLIC_API_BASE_URL = "https://api.nivaranfoundation.org";

export const PUBLIC_API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL || DEFAULT_PUBLIC_API_BASE_URL
).replace(/\/+$/, "");

export function publicApiUrl(path: string) {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${PUBLIC_API_BASE_URL}${normalizedPath}`;
}

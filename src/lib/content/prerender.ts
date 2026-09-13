export const CONTENT_PRERENDER_LIMIT = 12;

// Keep releases bounded as the archive grows. Older URLs remain available
// through dynamicParams and are rendered/cached on their first request.
export function recentContentParams(entries: Array<{ slug: string; date?: string }>) {
  const dated = entries.map((entry) => ({ ...entry, timestamp: Date.parse(entry.date || "") || 0 }));
  dated.sort((a, b) => b.timestamp - a.timestamp || a.slug.localeCompare(b.slug));
  return Array.from(new Set(dated.map((entry) => entry.slug)))
    .slice(0, CONTENT_PRERENDER_LIMIT)
    .map((slug) => ({ slug }));
}

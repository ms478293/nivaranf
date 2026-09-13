# Rendering and releases

Use the existing development server (`npm run dev`) to review interface changes before a production release. A production build is still required when application code changes.

The root layout must remain independent of request headers. Main-site metadata is the default; Global and USA override it in their route layouts. The main organization schema belongs to the main route group. Do not force regional pages static while their links depend on the request host.

Main articles, stories, and news prepare at most 12 recent entries per section. Older URLs are generated on first request and cached with one-hour revalidation. Legacy blog redirects are also generated on demand. Existing content publication routes invalidate affected main-site paths. Regional pages with host-dependent links remain rendered per request, with no build-time archive enumeration.

Article file lookup reads only the requested file, retaining global/USA directory priority. Missing articles retain the not-found UI and noindex marker (Next.js can stream these with HTTP 200); unmatched routes return 404. Existing redirects, canonical links, and news noindex rules must be preserved. Public main-site pages also revalidate hourly, and content publication invalidates the homepage feed. The homepage sits outside the main route group, so it includes the main schema, public appeal, and revalidation setting explicitly.

Donation APIs remain uncached. Administrative, login, and editorial layouts render dynamically. Do not apply broad cache rules to private routes or payment responses.

Before release:

1. Run `npx tsc --noEmit --incremental false`, `node scripts/check-content-build.mjs`, and the donation checks relevant to the change.
2. Build in an isolated staging directory, preserving compiler caches between builds. Separate cached content from compiler caches and from the live application.
3. Start the production build in staging and run `node scripts/check-production-release.mjs http://127.0.0.1:3100`. This checks actual archive cache hits, canonical links, missing pages, redirects, regional metadata, and uncached donation settings using read-only requests.
4. Publish the same tested artifact. Verify the source revision and build identifier before switching, check live health afterward, and retain the previous artifact for rollback.

The private deployment script supports `prepare` and `publish` separately, as well as the default combined `deploy`. It records build duration and restores the previous release if live health checks fail. Infrastructure paths and runtime credentials remain outside this public repository.

# Search visibility and content maintenance

Nivaran serves people looking for healthcare access, program information, ways to help and Nepal flood recovery. Keep those needs central to page content. More pages, keyword lists or unrelated trending stories are not the goal.

## Existing search destinations

| Visitor need | Primary page | Next step |
| --- | --- | --- |
| Nepal healthcare NGO | `/`, `/about` | Programs, leadership and reporting |
| Mobile health camps | `/sanjeevani` | Camp records and `/donate/sanjeevani` |
| Maternal and child health | `/maternal-health-nepal` | `/donate/maternal-child-health` |
| Nepal flood donations | `/donate/nepal-flood-recovery` | Dedicated checkout |
| Flood situation and response status | `/campaigns/nepal-flood-recovery` | Dated sources and the flood appeal |
| Volunteering in Nepal or remotely | `/volunteer` | Current opportunities or team contact |
| Partnerships | `/local-partner`, `/corporate` | Contact the team |
| Program stories and resources | `/stories`, `/articles` | Relevant program pages |

## Metadata and discovery

- Public main-site pages use `createPageMetadata` in `src/lib/page-metadata.ts`. Give each page a distinct, useful title and description. The helper keeps canonical, Open Graph, Twitter and large-image-preview settings consistent. Use an existing relevant raster image with accurate dimensions when known.
- Keep regional branding in regional layouts. The main layout must not read request headers or assign the homepage as a language alternative for every page.
- Add public pages to the sitemap when they are useful, canonical and indexable. Active campaign URLs come from the campaign/designation registries. Private checkouts, management links, drafts, placeholder programs and individual noindex news pages are excluded.
- Select eligible editorial entries before a feed limit. Do not allow a large number of excluded news items to crowd out older original stories and articles.
- Use real source modification dates, or omit `lastmod`. A build, deploy or sitemap request is not a content update.
- Individual `/news/[slug]` routes retain their existing noindex policy. The legacy news sitemap remains empty and is not advertised. Do not remove this policy globally to grow indexed-page counts.
- Main organization markup uses the schema.org `NGO` type and stable `/#organization` identity. Do not invent ratings, awards, reviews, events, clinical credentials or search actions.

## Editorial work

Publish original, useful material: a dated camp report, a documented program update, or a practical explanation that answers an actual visitor question. Include the reporting period, named source links, author identity, accessible image descriptions and relevant internal links. Distinguish planned work from completed delivery. Statistics must retain their reporting dates and methodology; do not call a historical snapshot live data.

Do not invent beneficiary quotations, popularity claims or per-dollar outcomes. Use first-person stories only with provenance and consent. Confirm volunteer dates, role requirements and practical arrangements; expired listings must not remain open opportunities. Preserve the wording and program-availability policies in `AGENTS.md`.

There is no preferred Google word count. Avoid padding articles, repeating location pages or adding unrelated news to chase traffic. Existing `llms.txt` is a factual directory for tools that choose to use it; it is not a ranking requirement or a substitute for useful visible content.

## Checks and measurement

Run `node scripts/check-seo.mjs http://localhost:PORT --full` during development. Production staging runs the focused SEO checks plus validation of every main sitemap destination from `check-production-release.mjs`. These cover metadata, canonical URLs, structured identity, search-map exclusions and uncached/noindex checkout behavior, alongside the existing archive and payment checks.

After release, inspect affected pages on desktop and mobile. Use Search Console to submit the canonical sitemap and monitor indexing, query relevance, impressions and clicks; use analytics for actual donation completion. Track changes against a dated baseline, and separate organic from paid traffic. Rankings, index counts and Core Web Vitals require real reporting data; source inspection alone cannot measure them.

References: [Google Search Essentials](https://developers.google.com/search/docs/essentials), [helpful content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content), [sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [AI search guidance](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide).

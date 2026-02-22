# OpenClaw Auto Publish Setup

This project now includes a VPS-safe article publisher:

- `scripts/publish-article.mjs` (main publisher)
- `scripts/publish_article.sh` (wrapper for OpenClaw/cron)
- `scripts/article.template.json` (metadata template)
- `scripts/article.middle.template.mdx` (body structure template)

Published URL is type-based:

- `Story` -> `/stories/[slug]`
- `News` -> `/news/[slug]`
- all other types -> `/articles/[slug]`

## 1) Prepare article input files

Create a body markdown file, for example:

```bash
cat > /tmp/article.body.md <<'EOF'
## Why this matters

Your article content in Markdown/MDX goes here.
EOF
```

Create JSON metadata, for example:

```bash
cat > /tmp/article.json <<'EOF'
{
  "title": "Healthcare Access in Remote Nepal",
  "subtitle": "How mobile camps reduce emergency risk in rural districts",
  "summary": "A field report on measurable impact from community-based screening and treatment.",
  "mainImage": "/images/generalHealthService.jpg",
  "coverImageAlt": "Nivaran team serving patients in a rural health camp",
  "coverImageCaption": "Field session in Karnali, Nepal",
  "type": "Article",
  "author": "Nivaran Foundation News Desk",
  "featured": false,
  "date": "2026-02-19",
  "location": "Karnali, Nepal",
  "keywords": "healthcare, rural nepal, prevention",
  "shareMessage": "Distance is the disease. We are closing the gap. Read: {URL}",
  "donateLine": "A single outreach day can connect remote families to care that was out of reach for years.",
  "authorBio": "Nivaran Foundation runs mobile health and education programs in Nepal's rural regions.",
  "bodyFile": "/tmp/article.body.md",
  "commitMessage": "Publish article: Healthcare Access in Remote Nepal"
}
EOF
```

## 2) Dry run (no file changes)

```bash
./scripts/publish_article.sh /tmp/article.json --dry-run
```

## 3) Publish to repo and push

```bash
./scripts/publish_article.sh /tmp/article.json --commit --push
```

## 4) Vercel deployment

If your Vercel project is connected to this GitHub repo, pushing to `main` triggers deployment automatically.

Manual fallback:

```bash
npx vercel --prod
```

## 5) How OpenClaw should run it

Use this command in your VPS workflow step:

```bash
cd /Users/mst/Desktop/Nivaran/nivaranf-main \
  && ./scripts/publish_article.sh /path/to/generated/article.json --commit --push
```

Minimal OpenClaw flow:

1. Generate article content.
2. Save body markdown to a file.
3. Save metadata JSON that points `bodyFile` to that markdown file.
4. Run `publish_article.sh` with `--commit --push`.
5. Read JSON output and store `blogUrl` for reporting.

## 6) Global_News hourly task (auto research + write + image + publish)

New files:

- `scripts/global_news_task.py`
- `scripts/global-news.sources.json`
- `scripts/run_global_news.sh`

This task does all steps automatically:

1. Checks global health/education RSS sources hourly.
2. Excludes Nepal-focused items.
3. Scores stories and keeps top 3 each run.
4. Selects best candidate (quality threshold + 12-hour quota logic).
5. Uses Gemini text model to generate a 1000+ word article + metadata JSON.
6. Uses Gemini image model to generate a cover image.
7. Publishes through `publish-article.mjs` (same article template pipeline).
8. Pushes to GitHub and verifies live URL title.

### Required environment variables

```bash
export GEMINI_API_KEY="your_key_here"
# Optional model overrides:
export GEMINI_TEXT_MODEL="gemini-1.5-pro-latest"
export GEMINI_IMAGE_MODEL="gemini-2.0-flash-preview-image-generation"
```

### Dry run

```bash
cd /Users/mst/Desktop/Nivaran/nivaranf-git
./scripts/run_global_news.sh --dry-run
```

### Production run

```bash
cd /Users/mst/Desktop/Nivaran/nivaranf-git
./scripts/run_global_news.sh
```

### Cron (hourly)

```bash
0 * * * * cd /Users/mst/Desktop/Nivaran/nivaranf-git && ./scripts/run_global_news.sh >> /var/log/nivaran-global-news.log 2>&1
```

State is stored at:

- `.global_news/state.json`
- `.global_news/tmp/`

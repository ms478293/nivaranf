# OpenClaw Auto Publish Setup

This project now includes a VPS-safe article publisher:

- `scripts/publish-article.mjs` (main publisher)
- `scripts/publish_article.sh` (wrapper for OpenClaw/cron)
- `scripts/article.template.json` (metadata template)

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
  "type": "Article",
  "author": "Nivaran Foundation News Desk",
  "featured": false,
  "date": "2026-02-19",
  "keywords": "healthcare, rural nepal, prevention",
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

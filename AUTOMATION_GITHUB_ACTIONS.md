# Automation via GitHub Actions

This repository now includes scheduled workflows so news automation runs automatically without a persistent server process.

## Workflows

- `.github/workflows/global-news-automation.yml`
  - Runs hourly at minute 12 (`12 * * * *` UTC)
- `.github/workflows/nepal-news-automation.yml`
  - Runs daily at `02:20` UTC

Both workflows are schedule-only (no manual trigger).

## Required repository secret

- `GEMINI_API_KEY`

## Optional repository secrets

- `GLOBAL_NEWS_DISCORD_WEBHOOK_URL`
- `DISCORD_WEBHOOK_URL`
- `AUTOMATION_PUSH_TOKEN`

Use `AUTOMATION_PUSH_TOKEN` only if branch protection blocks `GITHUB_TOKEN` from pushing to `main`.

## Optional repository variables

- `NIVARAN_WEBSITE_URL`
- `GEMINI_TEXT_MODEL`
- `GEMINI_IMAGE_MODEL`
- `GEMINI_IMAGE_MODELS`
- `GEMINI_IMAGE_MODEL_AUTO_DISCOVER`
- `GLOBAL_NEWS_IMAGE_CANDIDATES`
- `GLOBAL_NEWS_ARTICLE_ATTEMPTS`
- `GLOBAL_NEWS_REQUIRE_PARAPHRASE`
- `GLOBAL_NEWS_FEED_TIMEOUT_SECONDS`
- `GLOBAL_NEWS_FEED_RETRIES`
- `GLOBAL_NEWS_HEARTBEAT_SECONDS`
- `GLOBAL_NEWS_RUN_TIMEOUT_SECONDS`
- `NEPAL_NEWS_IMAGE_CANDIDATES`
- `NEPAL_NEWS_ARTICLE_ATTEMPTS`
- `NEPAL_NEWS_REQUIRE_PARAPHRASE`

## First-time setup checklist

1. Add `GEMINI_API_KEY` in GitHub repo settings.
2. (Optional) Add Discord webhook secret(s).
3. Ensure Actions can push to `main`:
   - Preferred: allow GitHub Actions write access with `contents: write`.
   - If blocked by branch protection, set `AUTOMATION_PUSH_TOKEN` to a PAT with `repo` write scope.
4. Confirm new commits and Vercel auto-deploys after scheduled runs.

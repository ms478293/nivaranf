#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

export GLOBAL_NEWS_FEED_TIMEOUT_SECONDS="${GLOBAL_NEWS_FEED_TIMEOUT_SECONDS:-12}"
export GLOBAL_NEWS_FEED_RETRIES="${GLOBAL_NEWS_FEED_RETRIES:-1}"

run_once() {
  python3 "${SCRIPT_DIR}/global_news_task.py" \
    --repo-root "${REPO_ROOT}" \
    --sources-file "${SCRIPT_DIR}/global-news.sources.json" \
    "$@"
}

if run_once "$@"; then
  exit 0
fi

echo "Global_News run failed once; retrying after short backoff..." >&2
sleep 10
run_once "$@"

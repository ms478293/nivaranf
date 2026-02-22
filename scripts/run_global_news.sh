#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

python3 "${SCRIPT_DIR}/global_news_task.py" \
  --repo-root "${REPO_ROOT}" \
  --sources-file "${SCRIPT_DIR}/global-news.sources.json" \
  "$@"

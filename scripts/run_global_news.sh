#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

export GLOBAL_NEWS_FEED_TIMEOUT_SECONDS="${GLOBAL_NEWS_FEED_TIMEOUT_SECONDS:-12}"
export GLOBAL_NEWS_FEED_RETRIES="${GLOBAL_NEWS_FEED_RETRIES:-1}"
export GLOBAL_NEWS_HEARTBEAT_SECONDS="${GLOBAL_NEWS_HEARTBEAT_SECONDS:-20}"
export GLOBAL_NEWS_RUN_TIMEOUT_SECONDS="${GLOBAL_NEWS_RUN_TIMEOUT_SECONDS:-900}"

if [[ -z "${GEMINI_API_KEY:-}" ]]; then
  CODEX_HOME_DIR="${CODEX_HOME:-$HOME/.codex}"
  MEMORY_FILE="${CODEX_HOME_DIR}/automations/global-news/memory.md"
  if [[ -f "${MEMORY_FILE}" ]]; then
    MEMORY_KEY="$(LC_ALL=C grep -Eo 'AIza[0-9A-Za-z_-]{30,}' "${MEMORY_FILE}" | tail -n 1 || true)"
    if [[ -n "${MEMORY_KEY}" ]]; then
      export GEMINI_API_KEY="${MEMORY_KEY}"
    fi
  fi
fi

if [[ -z "${GLOBAL_NEWS_DISCORD_WEBHOOK_URL:-}" && -z "${DISCORD_WEBHOOK_URL:-}" ]]; then
  CODEX_HOME_DIR="${CODEX_HOME:-$HOME/.codex}"
  MEMORY_FILE="${CODEX_HOME_DIR}/automations/global-news/memory.md"
  if [[ -f "${MEMORY_FILE}" ]]; then
    DISCORD_WEBHOOK_FROM_MEMORY="$(
      LC_ALL=C grep -Eo 'https://(discord\\.com|discordapp\\.com)/api/webhooks/[0-9]+/[A-Za-z0-9._-]+' "${MEMORY_FILE}" | tail -n 1 || true
    )"
    if [[ -n "${DISCORD_WEBHOOK_FROM_MEMORY}" ]]; then
      export GLOBAL_NEWS_DISCORD_WEBHOOK_URL="${DISCORD_WEBHOOK_FROM_MEMORY}"
    fi
  fi
fi

run_once() {
  python3 "${SCRIPT_DIR}/global_news_task.py" \
    --repo-root "${REPO_ROOT}" \
    --sources-file "${SCRIPT_DIR}/global-news.sources.json" \
    "$@"
}

flush_push_queue() {
  local sync_script="${SCRIPT_DIR}/sync-queue.mjs"
  if [[ ! -f "${sync_script}" ]]; then
    return 0
  fi

  # Never block publishing because of queue sync failures; this is best-effort.
  if node "${sync_script}" >/dev/null 2>&1; then
    echo "Global_News queue sync completed." >&2
  else
    echo "Global_News queue sync skipped (offline or pending failures)." >&2
  fi
}

kill_descendants() {
  local parent_pid="$1"
  pkill -TERM -P "${parent_pid}" 2>/dev/null || true
  kill -TERM "${parent_pid}" 2>/dev/null || true
  sleep 2
  pkill -KILL -P "${parent_pid}" 2>/dev/null || true
  kill -KILL "${parent_pid}" 2>/dev/null || true
}

run_with_watchdog() {
  local heartbeat="${GLOBAL_NEWS_HEARTBEAT_SECONDS}"
  local timeout_seconds="${GLOBAL_NEWS_RUN_TIMEOUT_SECONDS}"
  local started_at now elapsed
  run_once "$@" &
  local run_pid=$!
  started_at="$(date +%s)"

  while kill -0 "${run_pid}" 2>/dev/null; do
    sleep "${heartbeat}"
    if ! kill -0 "${run_pid}" 2>/dev/null; then
      break
    fi

    now="$(date +%s)"
    elapsed="$((now - started_at))"
    echo "Global_News still running (${elapsed}s elapsed, pid=${run_pid})..." >&2

    if [[ "${elapsed}" -ge "${timeout_seconds}" ]]; then
      echo "Global_News timed out after ${elapsed}s; terminating pid=${run_pid}" >&2
      kill_descendants "${run_pid}"
      wait "${run_pid}" 2>/dev/null || true
      return 124
    fi
  done

  wait "${run_pid}"
}

flush_push_queue
if run_with_watchdog "$@"; then
  exit 0
fi

echo "Global_News run failed once; retrying after short backoff..." >&2
sleep 10
flush_push_queue
run_with_watchdog "$@"

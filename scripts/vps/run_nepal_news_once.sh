#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="${REPO_ROOT:-$(cd "${SCRIPT_DIR}/../.." && pwd)}"
ENV_FILE="${ENV_FILE:-/etc/nivaran/automation.env}"
LOG_DIR="${AUTOMATION_LOG_DIR:-/var/log/nivaran-automation}"
LOCK_FILE="${LOCK_FILE:-${LOG_DIR}/nepal-news.lock}"
TIMEOUT_SECONDS="${NEPAL_NEWS_RUN_TIMEOUT_SECONDS:-5400}"

mkdir -p "${LOG_DIR}"

# Optional env file load for manual runs (systemd service also loads EnvironmentFile)
if [[ -f "${ENV_FILE}" ]]; then
  set -a
  # shellcheck disable=SC1090
  source "${ENV_FILE}"
  set +a
fi

exec 9>"${LOCK_FILE}"
if ! flock -n 9; then
  echo "[$(date -u +%Y-%m-%dT%H:%M:%SZ)] Nepal_News already running, skipping." >&2
  exit 0
fi

DAILY_LOG="${LOG_DIR}/nepal-news-$(date -u +%Y%m%d).log"
echo "[$(date -u +%Y-%m-%dT%H:%M:%SZ)] Starting Nepal_News run" | tee -a "${DAILY_LOG}"

cd "${REPO_ROOT}"

if timeout "${TIMEOUT_SECONDS}" bash "${REPO_ROOT}/scripts/run_nepal_news.sh" 2>&1 | tee -a "${DAILY_LOG}"; then
  echo "[$(date -u +%Y-%m-%dT%H:%M:%SZ)] Nepal_News completed" | tee -a "${DAILY_LOG}"
  exit 0
fi

exit_code=$?
echo "[$(date -u +%Y-%m-%dT%H:%M:%SZ)] Nepal_News failed (exit ${exit_code})" | tee -a "${DAILY_LOG}" >&2
exit "${exit_code}"

#!/usr/bin/env bash
# Hourly Global News automation cron wrapper for macOS
# This script is called by cron every hour and handles:
# 1. Setting up proper PATH for macOS (node, git, python3)
# 2. Loading .env.automation
# 3. Running the Global News pipeline
# 4. Logging output

set -euo pipefail

REPO_ROOT="/Users/mkt/Desktop/Nivaran"
SCRIPT_DIR="${REPO_ROOT}/scripts"
LOG_DIR="${REPO_ROOT}/logs/automation"
ENV_FILE="${REPO_ROOT}/.env.automation"

# macOS cron has minimal PATH — add Homebrew + system paths
export PATH="/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:${PATH}"

# Create log directory
mkdir -p "${LOG_DIR}"

# Generate timestamped log file
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
LOG_FILE="${LOG_DIR}/global_news_${TIMESTAMP}.log"

log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" | tee -a "${LOG_FILE}"
}

# Load environment variables
if [[ -f "${ENV_FILE}" ]]; then
  set -a
  source "${ENV_FILE}"
  set +a
else
  log "ERROR: ${ENV_FILE} not found. Exiting."
  exit 1
fi

# Check if automation is enabled
if [[ "${NEWS_AUTOMATION_ENABLED:-true}" != "true" ]]; then
  log "Automation is disabled (NEWS_AUTOMATION_ENABLED=false). Skipping."
  exit 0
fi

# Ensure we're on the latest main branch before publishing
log "Syncing repo with origin/main..."
cd "${REPO_ROOT}"
git pull --rebase origin main >> "${LOG_FILE}" 2>&1 || {
  log "WARNING: git pull failed. Continuing with local state."
}

log "Starting Global News automation..."

# Run the pipeline (with timeout via gtimeout)
TIMEOUT_CMD="timeout"
if command -v gtimeout >/dev/null 2>&1; then
  TIMEOUT_CMD="gtimeout"
fi

AUTOMATION_TIMEOUT="${AUTOMATION_TIMEOUT_SECONDS:-900}"

if "${TIMEOUT_CMD}" "${AUTOMATION_TIMEOUT}" python3 "${SCRIPT_DIR}/global_news_task.py" \
  --repo-root "${REPO_ROOT}" \
  --sources-file "${SCRIPT_DIR}/global-news.sources.json" \
  >> "${LOG_FILE}" 2>&1; then

  log "Global News automation completed successfully."
else
  EXIT_CODE=$?
  if [[ "${EXIT_CODE}" -eq 124 ]]; then
    log "ERROR: Automation timed out after ${AUTOMATION_TIMEOUT}s."
  else
    log "ERROR: Automation failed with exit code ${EXIT_CODE}."
  fi
fi

# Symlink latest log
ln -sf "${LOG_FILE}" "${LOG_DIR}/latest.log"

# Clean up logs older than 3 days
find "${LOG_DIR}" -name "global_news_*.log" -type f -mtime +3 -delete 2>/dev/null || true

log "Done."

#!/usr/bin/env bash
# Enhanced wrapper for global news automation with logging and monitoring

set -euo pipefail

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
LOG_DIR="${REPO_ROOT}/logs/automation"
ENV_FILE="${REPO_ROOT}/.env.automation"

# Create log directory
mkdir -p "${LOG_DIR}"

# Load environment variables
if [[ -f "${ENV_FILE}" ]]; then
  set -a
  source "${ENV_FILE}"
  set +a
fi

# Generate log file name with timestamp
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
LOG_FILE="${LOG_DIR}/global_news_${TIMESTAMP}.log"
LATEST_LOG="${LOG_DIR}/latest.log"
STATUS_FILE="${LOG_DIR}/status.json"

# Function to log messages
log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" | tee -a "${LOG_FILE}"
}

# Function to update status file
update_status() {
  local status="$1"
  local message="$2"
  cat > "${STATUS_FILE}" <<EOF
{
  "status": "${status}",
  "message": "${message}",
  "timestamp": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "logFile": "${LOG_FILE}"
}
EOF
}

# Function to send Telegram notification
send_telegram() {
  if [[ -n "${TELEGRAM_BOT_TOKEN:-}" ]] && [[ -n "${TELEGRAM_CHAT_ID:-}" ]]; then
    python3 "${SCRIPT_DIR}/telegram_notifier.py" "$@" 2>&1 | tee -a "${LOG_FILE}"
  fi
}

# Check if automation is enabled
if [[ "${NEWS_AUTOMATION_ENABLED:-true}" != "true" ]]; then
  log "⏸️  Automation is disabled. Skipping this run."
  update_status "paused" "Automation is disabled"
  exit 0
fi

# Main execution
log "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
log "🚀 Starting Global News Automation"
log "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

update_status "running" "Automation started"

# Send start notification
export TELEGRAM_BOT_TOKEN TELEGRAM_CHAT_ID
python3 - <<'PYEOF'
import sys
sys.path.insert(0, '/app/scripts')
from telegram_notifier import notify_automation_started
notify_automation_started()
PYEOF

# Run the automation with timeout and error handling
if timeout 900 bash "${SCRIPT_DIR}/run_global_news.sh" --repo-root "${REPO_ROOT}" \
  --sources-file "${SCRIPT_DIR}/global-news.sources.json" \
  --push 2>&1 | tee -a "${LOG_FILE}"; then
  
  log "✅ Automation completed successfully"
  update_status "success" "Automation completed successfully"
  
  # Check if an article was published
  if grep -q '"status": "published"' "${LOG_FILE}"; then
    log "📰 Article published successfully"
    
    # Extract article details and send Telegram notification
    python3 - <<'PYEOF'
import sys, json, re
sys.path.insert(0, '/app/scripts')
from telegram_notifier import notify_article_published

log_file = '/app/logs/automation/latest.log'
try:
    with open(log_file, 'r') as f:
        content = f.read()
        # Find JSON output from publish script
        matches = re.findall(r'\{[^}]*"status":\s*"published"[^}]*\}', content)
        if matches:
            data = json.loads(matches[-1])
            # This will be populated from global_news_task.py output
            print("Notification queued")
except Exception as e:
    print(f"Could not parse article data: {e}")
PYEOF
  fi
  
else
  EXIT_CODE=$?
  log "❌ Automation failed with exit code ${EXIT_CODE}"
  update_status "failed" "Automation failed with exit code ${EXIT_CODE}"
  
  # Send error notification
  python3 - <<PYEOF
import sys
sys.path.insert(0, '/app/scripts')
from telegram_notifier import notify_automation_error
notify_automation_error({
    "error": "Exit code ${EXIT_CODE}",
    "stage": "main_execution",
    "logFile": "${LOG_FILE}"
})
PYEOF
  
  exit ${EXIT_CODE}
fi

# Create symlink to latest log
ln -sf "${LOG_FILE}" "${LATEST_LOG}"

# Cleanup old logs (keep last 72 hours)
find "${LOG_DIR}" -name "global_news_*.log" -type f -mtime +3 -delete

log "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
log "🏁 Automation cycle completed"
log "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

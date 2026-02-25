#!/usr/bin/env bash
# Setup hourly cron job for news automation

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

# Cron job command
CRON_CMD="0 * * * * cd ${REPO_ROOT} && ${SCRIPT_DIR}/run_automation.sh >> ${REPO_ROOT}/logs/automation/cron.log 2>&1"

# Check if cron job already exists
if crontab -l 2>/dev/null | grep -q "run_automation.sh"; then
  echo "⚠️  Cron job already exists. Updating..."
  # Remove old cron job
  crontab -l 2>/dev/null | grep -v "run_automation.sh" | crontab -
fi

# Add new cron job
(crontab -l 2>/dev/null; echo "${CRON_CMD}") | crontab -

echo "✅ Hourly cron job installed successfully!"
echo ""
echo "Cron schedule: Every hour at minute 0"
echo "Command: ${CRON_CMD}"
echo ""
echo "To view cron jobs: crontab -l"
echo "To remove cron job: crontab -e"
echo ""
echo "Logs location: ${REPO_ROOT}/logs/automation/"

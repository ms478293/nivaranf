#!/usr/bin/env bash
# Remove the cron job for news automation

echo "Removing news automation cron job..."

if crontab -l 2>/dev/null | grep -q "run_automation.sh"; then
  crontab -l 2>/dev/null | grep -v "run_automation.sh" | crontab -
  echo "✅ Cron job removed successfully!"
else
  echo "ℹ️  No cron job found to remove."
fi

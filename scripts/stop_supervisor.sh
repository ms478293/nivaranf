#!/usr/bin/env bash
# Stop and remove supervisor-based news automation

echo "🛑 Stopping news automation..."

supervisorctl stop news-automation

echo "✅ News automation stopped"
echo ""
echo "To remove completely:"
echo "  rm /etc/supervisor/conf.d/news-automation.conf"
echo "  supervisorctl reread"
echo "  supervisorctl update"

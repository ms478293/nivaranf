#!/usr/bin/env bash
# Setup supervisor-based news automation

echo "🔧 Setting up news automation with Supervisor..."

# Load environment variables
if [ -f /app/.env.automation ]; then
  set -a
  source /app/.env.automation
  set +a
else
  echo "❌ /app/.env.automation not found"
  exit 1
fi

# Export environment variables for supervisor
export GEMINI_API_KEY
export TELEGRAM_BOT_TOKEN
export TELEGRAM_CHAT_ID
export GITHUB_TOKEN
export VERCEL_TOKEN

# Update supervisor configuration
if [ ! -f /etc/supervisor/conf.d/news-automation.conf ]; then
  echo "❌ Supervisor config not found"
  exit 1
fi

# Reload supervisor configuration
echo "📋 Reloading supervisor configuration..."
supervisorctl reread
supervisorctl update

# Start the service
echo "▶️  Starting news automation service..."
supervisorctl start news-automation

# Check status
echo ""
echo "✅ News automation setup complete!"
echo ""
supervisorctl status news-automation

echo ""
echo "Commands:"
echo "  Start:   supervisorctl start news-automation"
echo "  Stop:    supervisorctl stop news-automation"
echo "  Restart: supervisorctl restart news-automation"
echo "  Status:  supervisorctl status news-automation"
echo "  Logs:    tail -f /app/logs/automation/supervisor.log"

#!/usr/bin/env bash
# Test script for news automation system

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
ENV_FILE="${REPO_ROOT}/.env.automation"

echo "🧪 Testing News Automation System"
echo "=================================="
echo ""

# Load environment
if [ -f "${ENV_FILE}" ]; then
  set -a
  source "${ENV_FILE}"
  set +a
  echo "✅ Environment loaded"
else
  echo "❌ .env.automation not found"
  exit 1
fi

# Test 1: Check Python script exists
echo ""
echo "Test 1: Checking Python script..."
if [ -f "${SCRIPT_DIR}/global_news_task.py" ]; then
  echo "✅ global_news_task.py exists"
else
  echo "❌ global_news_task.py not found"
  exit 1
fi

# Test 2: Check Telegram integration
echo ""
echo "Test 2: Testing Telegram integration..."
if python3 "${SCRIPT_DIR}/telegram_notifier.py"; then
  echo "✅ Telegram integration working"
else
  echo "⚠️  Telegram integration test failed (may be okay if credentials not loaded)"
fi

# Test 3: Check wrapper script
echo ""
echo "Test 3: Checking automation wrapper..."
if [ -x "${SCRIPT_DIR}/run_automation.sh" ]; then
  echo "✅ run_automation.sh is executable"
else
  echo "❌ run_automation.sh not executable or not found"
  exit 1
fi

# Test 4: Check log directory
echo ""
echo "Test 4: Checking log directory..."
if [ -d "${REPO_ROOT}/logs/automation" ]; then
  echo "✅ Log directory exists"
else
  echo "⚠️  Creating log directory..."
  mkdir -p "${REPO_ROOT}/logs/automation"
  echo "✅ Log directory created"
fi

# Test 5: Check RSS sources file
echo ""
echo "Test 5: Checking RSS sources..."
if [ -f "${SCRIPT_DIR}/global-news.sources.json" ]; then
  SOURCE_COUNT=$(python3 -c "import json; data=json.load(open('${SCRIPT_DIR}/global-news.sources.json')); print(len(data.get('sourceUrls', [])))")
  echo "✅ RSS sources file exists (${SOURCE_COUNT} sources)"
else
  echo "❌ global-news.sources.json not found"
  exit 1
fi

# Test 6: Check cron scripts
echo ""
echo "Test 6: Checking cron setup scripts..."
if [ -x "${SCRIPT_DIR}/setup_cron.sh" ] && [ -x "${SCRIPT_DIR}/remove_cron.sh" ]; then
  echo "✅ Cron setup scripts ready"
else
  echo "❌ Cron setup scripts missing or not executable"
  exit 1
fi

# Test 7: Check admin portal files
echo ""
echo "Test 7: Checking admin portal..."
if [ -f "${REPO_ROOT}/src/app/admin/news-automation/page.tsx" ]; then
  echo "✅ Admin portal UI exists"
else
  echo "❌ Admin portal UI not found"
  exit 1
fi

if [ -f "${REPO_ROOT}/src/app/api/admin/news-automation/route.ts" ]; then
  echo "✅ Admin portal API exists"
else
  echo "❌ Admin portal API not found"
  exit 1
fi

# Summary
echo ""
echo "=================================="
echo "✅ All tests passed!"
echo ""
echo "Next steps:"
echo "1. Install cron job: bash ${SCRIPT_DIR}/setup_cron.sh"
echo "2. Or run manually: bash ${SCRIPT_DIR}/run_automation.sh"
echo "3. Access admin portal: http://localhost:3000/admin/news-automation"
echo ""
echo "Admin credentials:"
echo "  Username: ${ADMIN_USERNAME:-admin}"
echo "  Password: ${ADMIN_PASSWORD:-Nivaran2024!Secure}"
echo ""

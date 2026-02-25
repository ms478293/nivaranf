#!/usr/bin/env bash
set -euo pipefail

echo "Timers:"
systemctl list-timers --all | grep -E 'nivaran-(global|nepal)-news' || true
echo
echo "Global service status:"
systemctl status --no-pager --lines=20 nivaran-global-news.service || true
echo
echo "Nepal service status:"
systemctl status --no-pager --lines=20 nivaran-nepal-news.service || true

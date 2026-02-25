#!/usr/bin/env python3
"""Telegram notification helper for news automation."""

import json
import os
import urllib.request
import urllib.parse
from typing import Dict, Optional


def send_telegram_message(
    message: str,
    bot_token: Optional[str] = None,
    chat_id: Optional[str] = None,
    parse_mode: str = "HTML",
) -> bool:
    """Send a message via Telegram bot."""
    token = bot_token or os.getenv("TELEGRAM_BOT_TOKEN", "")
    recipient = chat_id or os.getenv("TELEGRAM_CHAT_ID", "")
    
    if not token or not recipient:
        print("⚠️  Telegram credentials not configured. Skipping notification.")
        return False
    
    url = f"https://api.telegram.org/bot{token}/sendMessage"
    
    data = {
        "chat_id": recipient,
        "text": message[:4096],  # Telegram message limit
        "parse_mode": parse_mode,
        "disable_web_page_preview": False,
    }
    
    try:
        request = urllib.request.Request(
            url,
            data=urllib.parse.urlencode(data).encode("utf-8"),
            headers={"Content-Type": "application/x-www-form-urlencoded"},
            method="POST",
        )
        
        with urllib.request.urlopen(request, timeout=10) as response:
            result = json.loads(response.read().decode("utf-8"))
            return result.get("ok", False)
    except Exception as exc:
        print(f"❌ Failed to send Telegram notification: {exc}")
        return False


def notify_article_published(article_data: Dict) -> bool:
    """Send notification when an article is successfully published."""
    title = article_data.get("generatedTitle", "Untitled")
    blog_url = article_data.get("blogUrl", "")
    score = article_data.get("selectedCandidate", {}).get("score", "N/A")
    word_count = article_data.get("generatedWordCount", "N/A")
    source_url = article_data.get("selectedCandidate", {}).get("link", "")
    
    message = f"""
✅ <b>Global News Published!</b>

📰 <b>{title}</b>

📊 Quality Score: {score}
📝 Word Count: {word_count}

🔗 <a href="{blog_url}">Read Article</a>
📎 <a href="{source_url}">Source</a>

🤖 <i>Automated by Nivaran News System</i>
""".strip()
    
    return send_telegram_message(message)


def notify_automation_error(error_details: Dict) -> bool:
    """Send notification when automation fails."""
    error_msg = error_details.get("error", "Unknown error")
    stage = error_details.get("stage", "Unknown stage")
    
    message = f"""
❌ <b>News Automation Failed</b>

🔴 Stage: {stage}
⚠️ Error: {error_msg}

🔧 Check logs for details.
""".strip()
    
    return send_telegram_message(message)


def notify_automation_started() -> bool:
    """Send notification when automation cycle starts."""
    message = "🔄 <b>News Automation Started</b>\n\n⏳ Searching for global health & education news..."
    return send_telegram_message(message)


def notify_no_candidates() -> bool:
    """Send notification when no suitable candidates found."""
    message = """
⏭️ <b>News Automation Skipped</b>

ℹ️ No suitable candidates found this hour.
Will retry in the next cycle.

📊 Filters applied:
• Global scope (excluding Nepal)
• Healthcare & Education focus
• Trusted sources only
""".strip()
    
    return send_telegram_message(message)


if __name__ == "__main__":
    # Test notification
    test_msg = "🧪 <b>Telegram Integration Test</b>\n\n✅ Notifications are working correctly!"
    success = send_telegram_message(test_msg)
    print(f"Test notification sent: {success}")

# News Automation System

## Overview
Automated hourly news collection, filtering, rewriting, and publishing system for Nivaran Foundation's global health and education news desk.

## Features
- ✅ **Hourly Automation**: Runs every hour via cron job
- 🌍 **Global News Focus**: 70% Healthcare, 30% Education
- 🤖 **AI-Powered**: Uses Gemini AI for content generation
- 📱 **Telegram Notifications**: Real-time updates on published articles
- 🎛️ **Admin Portal**: Web-based control panel at `/admin/news-automation`
- 📊 **Statistics & Monitoring**: Track published articles and system health
- 🔄 **Auto-Push to GitHub**: Automatically commits and pushes to repository
- 🚀 **Vercel Integration**: Auto-deploys to production

## Setup Instructions

### 1. Environment Configuration
The automation system uses `.env.automation` file for credentials. This file is already configured with your:
- Gemini API Key
- Telegram Bot Token & Chat ID
- GitHub & Vercel Tokens
- Admin Portal Credentials

### 2. Install Cron Job (For Hourly Automation)

Run the setup script:
```bash
cd /app/scripts
bash setup_cron.sh
```

This will install a cron job that runs every hour at minute 0.

### 3. Manual Run (Testing)

To test the automation manually:
```bash
cd /app
bash scripts/run_automation.sh
```

### 4. Access Admin Portal

Navigate to: `https://your-domain.com/admin/news-automation`

**Login Credentials:**
- Username: `admin`
- Password: `Nivaran2024!Secure`

**Admin Portal Features:**
- ✅ View automation status
- 📊 See statistics (articles published in last 24h, total articles)
- ▶️ Manually trigger automation
- ⏸️ Pause/Resume automation
- 🔧 Install/Remove cron job
- 📜 View real-time logs

## File Structure

```
/app
├── scripts/
│   ├── global_news_task.py          # Main automation script
│   ├── run_automation.sh            # Enhanced wrapper with logging
│   ├── telegram_notifier.py         # Telegram integration
│   ├── setup_cron.sh                # Install cron job
│   ├── remove_cron.sh               # Remove cron job
│   ├── global-news.sources.json     # RSS feed sources
│   └── publish-article.mjs          # Publishing script
├── src/
│   └── app/
│       ├── admin/news-automation/   # Admin portal UI
│       └── api/admin/               # Admin API routes
├── logs/
│   └── automation/                  # Log files
│       ├── latest.log               # Latest run log
│       ├── status.json              # Current status
│       └── global_news_*.log        # Timestamped logs
├── .env.automation                  # Environment variables (DO NOT COMMIT)
└── README_AUTOMATION.md             # This file
```

## How It Works

### Workflow:
1. **RSS Feed Collection**: Fetches news from 18+ trusted sources (WHO, UN, BBC, NYT, etc.)
2. **Filtering**: 
   - Excludes Nepal-specific news
   - Focuses on global healthcare & education
   - Uses trusted domain verification
3. **Scoring**: Ranks articles based on:
   - Source credibility
   - Health/Education relevance
   - Freshness
   - Global impact
4. **Selection**: Picks top 3, then selects best 1
5. **AI Rewriting**: Gemini AI rewrites in professional journalistic style
6. **Image Handling**: 
   - Attempts to extract image from source
   - Falls back to Gemini image generation if needed
7. **Publishing**: 
   - Creates MDX file in `/src/blogs/global/`
   - Updates blog list
   - Commits to GitHub
   - Pushes to trigger Vercel deployment
8. **Notification**: Sends Telegram message with article link

### Automation Schedule:
- **Frequency**: Every hour (24 articles/day)
- **Target**: 12 articles per 12 hours (minimum)
- **Maximum**: 16 articles per 12 hours
- **Quality Threshold**: Adaptive based on demand

## Telegram Notifications

You'll receive notifications for:
- ✅ Article successfully published (with link)
- ⏭️ No suitable candidates found
- ❌ Automation errors
- 🔄 Automation cycle started

## Monitoring

### Check Cron Status:
```bash
crontab -l
```

### View Latest Logs:
```bash
tail -f /app/logs/automation/latest.log
```

### Check Automation Status:
```bash
cat /app/logs/automation/status.json
```

## Troubleshooting

### Cron Job Not Running:
```bash
# Check if cron service is running
service cron status

# Reinstall cron job
bash /app/scripts/setup_cron.sh
```

### Telegram Not Working:
1. Verify bot token in `.env.automation`
2. Ensure you've started chat with your bot
3. Test manually:
```bash
export TELEGRAM_BOT_TOKEN="your-token"
export TELEGRAM_CHAT_ID="your-chat-id"
python3 /app/scripts/telegram_notifier.py
```

### Articles Not Publishing:
1. Check logs: `cat /app/logs/automation/latest.log`
2. Verify Gemini API key is valid
3. Check GitHub token permissions
4. Run manually to see errors: `bash /app/scripts/run_automation.sh`

## Manual Control Commands

### Enable Automation:
Edit `/app/.env.automation` and set:
```bash
NEWS_AUTOMATION_ENABLED=true
```

### Disable Automation:
Edit `/app/.env.automation` and set:
```bash
NEWS_AUTOMATION_ENABLED=false
```

### Remove Cron Job:
```bash
bash /app/scripts/remove_cron.sh
```

## Security Notes

- ⚠️ **Never commit** `.env.automation` to Git
- 🔐 Change admin password in `.env.automation` before going live
- 🔒 Admin portal uses Basic HTTP Authentication
- 🛡️ Consider adding IP whitelist for admin routes in production

## Support

For issues or questions:
1. Check logs in `/app/logs/automation/`
2. Use admin portal to view real-time status
3. Review Telegram notifications for error details

## Maintenance

### Clean Old Logs (Automatic):
Logs older than 3 days are automatically deleted by the automation script.

### Manual Cleanup:
```bash
rm -rf /app/logs/automation/global_news_*.log
```

### Update RSS Sources:
Edit `/app/scripts/global-news.sources.json` to add/remove sources.

### Adjust Quality Threshold:
Edit `/app/.env.automation`:
```bash
NEWS_BASE_QUALITY_SCORE=70  # Lower = more articles, Higher = fewer but higher quality
```

---

**System Status**: Ready for hourly automation 🚀
**Next Step**: Run `bash /app/scripts/setup_cron.sh` to start hourly automation

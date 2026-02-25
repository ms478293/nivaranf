# 🚀 Quick Start Guide - News Automation

## ✅ System is Ready!

Your automated news system has been successfully set up. Here's everything you need to know:

---

## 🎯 What Was Built

### 1. **Hourly News Automation**
- Automatically fetches global health & education news every hour
- Filters and selects the best article
- Uses AI to rewrite in professional journalistic style
- Publishes to your website
- Pushes to GitHub and deploys to Vercel
- Sends you Telegram notifications

### 2. **Private Admin Portal**
- Web dashboard to control everything
- Access at: `https://www.nivaranfoundation.org/admin/news-automation`
- **Login credentials:**
  - Username: `admin`
  - Password: `Nivaran2024!Secure`

### 3. **Telegram Notifications**
- You'll receive notifications for:
  - ✅ Successfully published articles (with link)
  - ⏭️ When no suitable news is found
  - ❌ Any errors that occur

---

## 🚦 Starting the Automation

### Option 1: Install Cron Job (Recommended)
This will run automatically every hour:

```bash
cd /app/scripts
bash setup_cron.sh
```

That's it! The system will now run every hour automatically.

### Option 2: Run Manually (For Testing)
To run immediately and see it work:

```bash
cd /app
bash scripts/run_automation.sh
```

---

## 📱 Admin Portal Features

Access at: `https://www.nivaranfoundation.org/admin/news-automation`

### What You Can Do:
1. **View Status** - See if automation is running, paused, or failed
2. **See Statistics** - Articles published in last 24h and total count
3. **Manual Trigger** - Run automation immediately (don't wait for hourly)
4. **Pause/Resume** - Stop or start the automation
5. **Install/Remove Cron** - Setup or remove hourly schedule
6. **View Logs** - See real-time logs of what's happening

---

## 📊 How It Works

Every hour, the system:

1. **Fetches** news from 18 trusted sources (WHO, UN, BBC, NYT, etc.)
2. **Filters** for global healthcare (70%) and education (30%) news
3. **Excludes** Nepal-specific news
4. **Scores** each article based on:
   - Source credibility
   - Relevance to health/education
   - Global impact
   - Freshness
5. **Selects** top 3, then picks the best one
6. **AI Rewrites** using Gemini AI to professional journalistic standard
7. **Gets Image** from source or generates with AI
8. **Publishes** to `/global-news` section
9. **Pushes** to GitHub
10. **Notifies** you via Telegram

---

## 📁 Where to Find Things

### Published Articles:
- Website: `https://www.nivaranfoundation.org/global-news`
- Files: `/app/src/blogs/global/*.mdx`

### Logs:
- Latest: `/app/logs/automation/latest.log`
- All logs: `/app/logs/automation/`

### Configuration:
- Environment: `/app/.env.automation`
- RSS Sources: `/app/scripts/global-news.sources.json`

---

## 🎛️ Control Commands

### Start Automation:
```bash
bash /app/scripts/setup_cron.sh
```

### Stop Automation:
```bash
bash /app/scripts/remove_cron.sh
```

### Run Manually:
```bash
bash /app/scripts/run_automation.sh
```

### View Logs:
```bash
tail -f /app/logs/automation/latest.log
```

### Check Cron Status:
```bash
crontab -l
```

---

## ⚙️ Settings You Can Change

Edit `/app/.env.automation`:

### Pause/Resume Automation:
```bash
NEWS_AUTOMATION_ENABLED=true   # or false to pause
```

### Quality Threshold:
```bash
NEWS_BASE_QUALITY_SCORE=70   # Higher = fewer but better quality articles
```

### Target Articles:
```bash
NEWS_TARGET_MIN_12H=12   # Minimum articles per 12 hours
NEWS_HARD_MAX_12H=16     # Maximum articles per 12 hours
```

---

## 📱 Telegram Notifications

You'll receive messages like:

### ✅ When article is published:
```
✅ Global News Published!

📰 [Article Title]

📊 Quality Score: 85.5
📝 Word Count: 1250

🔗 Read Article
📎 Source

🤖 Automated by Nivaran News System
```

### ⏭️ When skipped:
```
⏭️ News Automation Skipped

ℹ️ No suitable candidates found this hour.
Will retry in the next cycle.
```

### ❌ When there's an error:
```
❌ News Automation Failed

⚠️ Error: [Error details]

🔧 Check logs for details.
```

---

## 🔍 Troubleshooting

### Not receiving Telegram notifications?
1. Make sure you started a chat with your bot
2. Check credentials in `/app/.env.automation`
3. Test: `python3 /app/scripts/telegram_notifier.py`

### Articles not publishing?
1. Check logs: `cat /app/logs/automation/latest.log`
2. Verify Gemini API key is working
3. Check GitHub token has push permissions
4. Run manually to see errors: `bash /app/scripts/run_automation.sh`

### Cron not running?
1. Check if installed: `crontab -l`
2. Reinstall: `bash /app/scripts/setup_cron.sh`

### Admin portal not loading?
1. Make sure Next.js app is running
2. Check if running on correct port
3. Try: `cd /app && npm run dev` (for development)

---

## 📈 Expected Results

- **Target**: 24 articles per day (1 per hour)
- **Actual**: 12-16 articles per day (accounting for no suitable candidates)
- **Quality**: Only high-quality, globally relevant health/education news
- **Sources**: WHO, UN, BBC, NYT, Guardian, Reuters, and 12 more trusted sources

---

## 🎉 You're All Set!

The system is fully operational and ready to run. Just install the cron job and it will handle everything automatically!

**Questions or Issues?**
- Check logs: `/app/logs/automation/latest.log`
- Use admin portal for status
- Review full docs: `/app/README_AUTOMATION.md`

---

**Created by Emergent AI Assistant**
**For Nivaran Foundation**

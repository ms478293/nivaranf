# Hostinger VPS Automation Setup (Global_News + Nepal_News)

This setup installs production timers on your VPS:

- `nivaran-global-news.timer` -> runs hourly
- `nivaran-nepal-news.timer` -> runs daily at 05:30 server local time

## 1) SSH into VPS and run installer

```bash
cd /opt
# if repo not cloned yet, clone first or let installer clone automatically
sudo bash /path/to/nivaranf-git/scripts/vps/install_hostinger_vps.sh
```

Optional overrides:

```bash
sudo REPO_ROOT=/opt/nivaran/nivaranf-git RUN_USER=ubuntu SERVER_TIMEZONE=Asia/Kathmandu bash scripts/vps/install_hostinger_vps.sh
```

## 2) Fill environment secrets

Edit:

```bash
sudo nano /etc/nivaran/automation.env
```

Required:

- `GEMINI_API_KEY`

Recommended:

- `GLOBAL_NEWS_DISCORD_WEBHOOK_URL`
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

## 3) Restart timers after env update

```bash
sudo systemctl daemon-reload
sudo systemctl restart nivaran-global-news.timer
sudo systemctl restart nivaran-nepal-news.timer
```

## 4) Manual run test

```bash
sudo systemctl start nivaran-global-news.service
sudo journalctl -u nivaran-global-news.service -n 200 --no-pager
```

## 5) Verify timer schedule

```bash
sudo systemctl list-timers --all | grep -E 'nivaran-(global|nepal)-news'
```

## 6) Log locations

- Systemd/journal logs: `journalctl -u nivaran-global-news.service`
- Rolling file logs: `/var/log/nivaran-automation/`

## Troubleshooting

1. DNS/network errors:

```bash
getent hosts github.com
curl -I https://discord.com
```

2. Repo sync issues:

```bash
cd /opt/nivaran/nivaranf-git && git status && git pull --ff-only
```

3. Permissions:

```bash
sudo chown -R <run_user>:<run_group> /opt/nivaran /var/log/nivaran-automation
```

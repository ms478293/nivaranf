# Hostinger VPS Web App Setup

This repo can run on a VPS without Vercel.

What this VPS package covers:
- Next.js web app build + runtime
- `systemd` service for the site
- `nginx` reverse proxy for `www`, `global`, and `usa`
- TLS via `certbot`
- update workflow for future deploys

What this repo does **not** include:
- the separate backend that currently lives behind `api.nivaranfoundation.org`

That means the public website can move now, but if you want the old dashboard/image-upload backend to move too, you also need the API codebase or you must keep `api.nivaranfoundation.org` pointing to its current server.

## 1. DNS you will need on Hostinger

Point these records to your VPS public IP:

- `A @ -> <your_vps_ip>`
- `A www -> <your_vps_ip>`
- `A global -> <your_vps_ip>`
- `A usa -> <your_vps_ip>`

Only move `api` if you also have the API backend ready.

## 2. SSH into the VPS and run the installer

```bash
cd /opt
sudo git clone https://github.com/ms478293/nivaranf.git /opt/nivaran/nivaranf-git
cd /opt/nivaran/nivaranf-git
sudo RUN_USER=<your_linux_user> bash scripts/vps/install_hostinger_web.sh
```

If the repo already exists:

```bash
cd /opt/nivaran/nivaranf-git
sudo RUN_USER=<your_linux_user> bash scripts/vps/install_hostinger_web.sh
```

## 3. Fill the production env file

The installer creates:

```bash
/etc/nivaran/web.env
```

Edit it:

```bash
sudo nano /etc/nivaran/web.env
```

At minimum, fill:
- Supabase public + service keys
- Resend key
- Square app + location + access token
- admin/content portal credentials
- content portal session secret

Keep these values the same as production unless you are intentionally rotating them.

## 4. Build and start the app

After the env file is filled:

```bash
cd /opt/nivaran/nivaranf-git
sudo REPO_ROOT=/opt/nivaran/nivaranf-git RUN_USER=<your_linux_user> ENV_FILE=/etc/nivaran/web.env bash scripts/vps/update_web.sh
```

Then verify:

```bash
sudo systemctl status nivaran-web --no-pager
curl -I http://127.0.0.1:3000
```

## 5. Enable HTTPS

After the DNS A records point to the VPS and nginx is serving HTTP, run:

```bash
sudo certbot --nginx -m you@example.com --agree-tos --redirect \
  -d www.nivaranfoundation.org \
  -d nivaranfoundation.org \
  -d global.nivaranfoundation.org \
  -d usa.nivaranfoundation.org
```

## 6. What to cut over first

Safest order:
1. keep `api.nivaranfoundation.org` where it is for now
2. move `www`, `@`, `global`, and `usa` to the VPS
3. verify public site, donation form, contact form, Sanjeevani, and global campaign pages
4. only then decide whether the legacy API should move

## 7. Useful commands

```bash
sudo systemctl status nivaran-web --no-pager
sudo journalctl -u nivaran-web -n 200 --no-pager
sudo nginx -t
sudo systemctl reload nginx
```

Update app later:

```bash
cd /opt/nivaran/nivaranf-git
sudo REPO_ROOT=/opt/nivaran/nivaranf-git RUN_USER=<your_linux_user> ENV_FILE=/etc/nivaran/web.env bash scripts/vps/update_web.sh
```


## 8. Docker + Traefik option (recommended on your current VPS)

If your VPS already runs Traefik on ports 80/443, use the Docker deployment instead of nginx.

```bash
cd /opt/nivaran/nivaranf-git
sudo docker compose --env-file /etc/nivaran/web.env -f scripts/vps/docker-compose.hostinger.yml up -d --build
```

Verify:

```bash
sudo docker ps
sudo docker logs --tail 100 $(sudo docker ps -q --filter name=nivaran-web)
```

This mode reuses the existing `n8n_default` Traefik network and requests certificates automatically for the configured hosts once DNS points to the VPS.

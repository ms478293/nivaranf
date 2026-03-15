# Hostinger VPS Web App Setup

This repo can run on a VPS without Vercel.

There are two supported deployment modes in this repo:
- standalone VPS: `systemd` + `nginx` + `certbot`
- shared proxy VPS: `Docker Compose` + `Traefik`

The current production VPS uses the shared proxy mode.

Canonical production paths:
- live app checkout: `/opt/nivaran/nivaranf-web`
- archived drifted checkouts: `/opt/nivaran/archive/`
- production env file: `/etc/nivaran/web.env`
- source-controlled compose file: `scripts/vps/docker-compose.hostinger.yml`

What this VPS package covers:
- Next.js web app build + runtime
- either `systemd` or `Docker Compose` runtime
- either `nginx` or existing `Traefik` reverse proxy
- TLS via `certbot` or Traefik ACME
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

## 2. Choose the deployment mode

### Option A: shared Traefik VPS (current production)

Use this when the server already has Docker + Traefik and other services are sharing the proxy.

Clone or update the repo into the canonical live path:

```bash
sudo mkdir -p /opt/nivaran
cd /opt/nivaran
sudo git clone https://github.com/ms478293/nivaranf.git /opt/nivaran/nivaranf-web
cd /opt/nivaran/nivaranf-web
sudo git checkout main
sudo git pull --ff-only origin main
```

If the repo already exists:

```bash
cd /opt/nivaran/nivaranf-web
sudo git fetch --all --prune
sudo git checkout main
sudo git pull --ff-only origin main
```

### Option B: standalone VPS

Use this only when the server is dedicated to the website and you want this repo to install its own `nginx` + `systemd` stack.

Run the installer:

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

### Option A: shared Traefik VPS

After the env file is filled:

```bash
cd /opt/nivaran/nivaranf-web
sudo docker compose -f scripts/vps/docker-compose.hostinger.yml build nivaran-web
sudo docker compose -f scripts/vps/docker-compose.hostinger.yml up -d --force-recreate nivaran-web
```

Then verify:

```bash
sudo docker compose -f /opt/nivaran/nivaranf-web/scripts/vps/docker-compose.hostinger.yml ps
curl -I http://127.0.0.1:3000
```

Traefik will handle HTTPS automatically once DNS points to the VPS.

### Option B: standalone VPS

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

### Option A: shared Traefik VPS

After the DNS A records point to the VPS, Traefik should issue certificates automatically.

### Option B: standalone VPS

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

For the shared Traefik VPS:

```bash
cd /opt/nivaran/nivaranf-web
sudo git pull --ff-only origin main
sudo docker compose -f scripts/vps/docker-compose.hostinger.yml build nivaran-web
sudo docker compose -f scripts/vps/docker-compose.hostinger.yml up -d --force-recreate nivaran-web
sudo docker logs --tail 200 nivaran-web-1
```

#!/usr/bin/env bash
set -euo pipefail

if [[ "${EUID}" -ne 0 ]]; then
  echo "Run this installer as root (sudo)." >&2
  exit 1
fi

DEFAULT_REPO_ROOT="/opt/nivaran/nivaranf-git"
REPO_URL="${REPO_URL:-https://github.com/ms478293/nivaranf.git}"
REPO_ROOT="${REPO_ROOT:-${DEFAULT_REPO_ROOT}}"
RUN_USER="${RUN_USER:-}"
RUN_GROUP="${RUN_GROUP:-}"
ENV_FILE="${ENV_FILE:-/etc/nivaran/web.env}"
APP_PORT="${APP_PORT:-3000}"
NGINX_SITE_NAME="${NGINX_SITE_NAME:-nivaranfoundation.org}"
NODE_MAJOR="${NODE_MAJOR:-20}"
ENABLE_CERTBOT="${ENABLE_CERTBOT:-0}"
CERTBOT_EMAIL="${CERTBOT_EMAIL:-}"
CERTBOT_DOMAINS="${CERTBOT_DOMAINS:-www.nivaranfoundation.org,nivaranfoundation.org,global.nivaranfoundation.org,usa.nivaranfoundation.org}"

if [[ -z "${RUN_USER}" ]]; then
  if [[ -n "${SUDO_USER:-}" && "${SUDO_USER}" != "root" ]]; then
    RUN_USER="${SUDO_USER}"
  else
    RUN_USER="$(id -un)"
  fi
fi

if [[ "${RUN_USER}" == "root" ]]; then
  echo "RUN_USER resolved to root. Set RUN_USER explicitly to your deploy user." >&2
  exit 1
fi

if [[ -z "${RUN_GROUP}" ]]; then
  RUN_GROUP="$(id -gn "${RUN_USER}")"
fi

install_nodejs() {
  local current_major=""
  if command -v node >/dev/null 2>&1; then
    current_major="$(node -p 'process.versions.node.split(".")[0]')"
  fi

  if [[ "${current_major}" == "${NODE_MAJOR}" ]]; then
    return
  fi

  curl -fsSL "https://deb.nodesource.com/setup_${NODE_MAJOR}.x" | bash -
  apt-get install -y --no-install-recommends nodejs
}

render_template() {
  local template="$1"
  local output="$2"
  sed \
    -e "s#__RUN_USER__#${RUN_USER}#g" \
    -e "s#__RUN_GROUP__#${RUN_GROUP}#g" \
    -e "s#__REPO_ROOT__#${REPO_ROOT}#g" \
    -e "s#__ENV_FILE__#${ENV_FILE}#g" \
    -e "s#__APP_PORT__#${APP_PORT}#g" \
    "$template" > "$output"
}

env_ready() {
  [[ -f "${ENV_FILE}" ]] || return 1
  ! grep -Eq '^(NEXT_PUBLIC_SUPABASE_URL|NEXT_PUBLIC_SUPABASE_ANON_KEY|SUPABASE_SERVICE_ROLE_KEY|RESEND_API_KEY|NEXT_PUBLIC_SQUARE_APP_ID|NEXT_PUBLIC_SQUARE_LOCATION_ID|SQUARE_ACCESS_TOKEN|ADMIN_USERNAME|ADMIN_PASSWORD|CONTENT_PORTAL_USERNAME|CONTENT_PORTAL_PASSWORD|CONTENT_PORTAL_SESSION_SECRET)=$' "${ENV_FILE}"
}

echo "==> Installing system packages"
export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get install -y --no-install-recommends \
  git curl ca-certificates jq gnupg \
  nginx certbot python3-certbot-nginx \
  build-essential

install_nodejs

mkdir -p "$(dirname "${REPO_ROOT}")" /etc/nivaran /var/log/nivaran-web
chown -R "${RUN_USER}:${RUN_GROUP}" /var/log/nivaran-web

if [[ ! -d "${REPO_ROOT}/.git" ]]; then
  echo "==> Cloning repository into ${REPO_ROOT}"
  sudo -u "${RUN_USER}" git clone "${REPO_URL}" "${REPO_ROOT}"
fi

echo "==> Syncing repository"
sudo -u "${RUN_USER}" bash -lc "cd '${REPO_ROOT}' && git fetch --all --prune && git checkout main && git pull --ff-only origin main"

if [[ ! -f "${ENV_FILE}" ]]; then
  echo "==> Creating ${ENV_FILE} from template"
  cp "${REPO_ROOT}/scripts/vps/web.env.example" "${ENV_FILE}"
  chown root:"${RUN_GROUP}" "${ENV_FILE}"
  chmod 640 "${ENV_FILE}"
  echo "!!! Fill real secrets in ${ENV_FILE}, then rerun this script."
fi

echo "==> Installing Node dependencies"
if [[ -f "${REPO_ROOT}/package-lock.json" ]]; then
  sudo -u "${RUN_USER}" bash -lc "cd '${REPO_ROOT}' && npm ci --legacy-peer-deps"
else
  sudo -u "${RUN_USER}" bash -lc "cd '${REPO_ROOT}' && npm install --legacy-peer-deps"
fi

echo "==> Installing systemd service"
render_template "${REPO_ROOT}/scripts/vps/systemd/nivaran-web.service.tpl" "/etc/systemd/system/nivaran-web.service"
chmod 644 "/etc/systemd/system/nivaran-web.service"

echo "==> Installing nginx site"
render_template "${REPO_ROOT}/scripts/vps/nginx/nivaranfoundation.org.conf.tpl" "/etc/nginx/sites-available/${NGINX_SITE_NAME}.conf"
ln -sfn "/etc/nginx/sites-available/${NGINX_SITE_NAME}.conf" "/etc/nginx/sites-enabled/${NGINX_SITE_NAME}.conf"
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl daemon-reload
systemctl enable nginx
systemctl restart nginx

if ! env_ready; then
  cat <<MSG

Environment file is present but still incomplete.
1) Edit ${ENV_FILE}
2) Re-run this script, or run: sudo REPO_ROOT=${REPO_ROOT} RUN_USER=${RUN_USER} ENV_FILE=${ENV_FILE} ${REPO_ROOT}/scripts/vps/update_web.sh
3) After build succeeds, run certbot

Suggested certbot command:
  sudo certbot --nginx -m you@example.com --agree-tos --redirect \\
    -d www.nivaranfoundation.org -d nivaranfoundation.org \\
    -d global.nivaranfoundation.org -d usa.nivaranfoundation.org
MSG
  exit 0
fi

echo "==> Building app"
set -a
source "${ENV_FILE}"
set +a
sudo -u "${RUN_USER}" bash -lc "cd '${REPO_ROOT}' && set -a && source '${ENV_FILE}' && set +a && npm run build"

echo "==> Starting web service"
systemctl enable --now nivaran-web
systemctl restart nivaran-web
systemctl --no-pager --full status nivaran-web || true

if [[ "${ENABLE_CERTBOT}" == "1" ]]; then
  if [[ -z "${CERTBOT_EMAIL}" ]]; then
    echo "CERTBOT_EMAIL is required when ENABLE_CERTBOT=1" >&2
    exit 1
  fi

  IFS=',' read -r -a domain_args <<< "${CERTBOT_DOMAINS}"
  certbot_cmd=(certbot --nginx --non-interactive --agree-tos --redirect -m "${CERTBOT_EMAIL}")
  for domain in "${domain_args[@]}"; do
    certbot_cmd+=(-d "${domain}")
  done
  "${certbot_cmd[@]}"
fi

echo
systemctl list-units --type=service 'nivaran-web.service' --no-pager || true
echo
echo "Done. Test locally on the VPS: curl -I http://127.0.0.1:${APP_PORT}"
echo "Then verify through nginx: curl -I http://www.nivaranfoundation.org"

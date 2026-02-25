#!/usr/bin/env bash
set -euo pipefail

# Hostinger VPS installer for Nivaran automations (Global_News + Nepal_News)
# Run as root on VPS:
#   sudo bash scripts/vps/install_hostinger_vps.sh
# Optional env overrides:
#   REPO_URL, REPO_ROOT, RUN_USER, RUN_GROUP, ENV_FILE, SERVER_TIMEZONE

if [[ "${EUID}" -ne 0 ]]; then
  echo "Run this installer as root (sudo)." >&2
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEFAULT_REPO_ROOT="/opt/nivaran/nivaranf-git"
REPO_URL="${REPO_URL:-https://github.com/ms478293/nivaranf.git}"
REPO_ROOT="${REPO_ROOT:-${DEFAULT_REPO_ROOT}}"
RUN_USER="${RUN_USER:-}"
RUN_GROUP="${RUN_GROUP:-}"
ENV_FILE="${ENV_FILE:-/etc/nivaran/automation.env}"
SERVER_TIMEZONE="${SERVER_TIMEZONE:-Asia/Kathmandu}"

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

echo "==> Installing system packages"
export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get install -y --no-install-recommends \
  git curl ca-certificates jq \
  python3 python3-pip python3-venv python3-pil \
  nodejs npm

if command -v timedatectl >/dev/null 2>&1; then
  echo "==> Setting server timezone to ${SERVER_TIMEZONE}"
  timedatectl set-timezone "${SERVER_TIMEZONE}" || true
fi

echo "==> Preparing directories"
mkdir -p "$(dirname "${REPO_ROOT}")" /etc/nivaran /var/log/nivaran-automation
chown -R "${RUN_USER}:${RUN_GROUP}" /var/log/nivaran-automation

if [[ ! -d "${REPO_ROOT}/.git" ]]; then
  echo "==> Cloning repository into ${REPO_ROOT}"
  sudo -u "${RUN_USER}" git clone "${REPO_URL}" "${REPO_ROOT}"
fi

echo "==> Syncing repository"
sudo -u "${RUN_USER}" bash -lc "cd '${REPO_ROOT}' && git fetch --all --prune && git checkout main && git pull --ff-only origin main"

echo "==> Installing Node dependencies"
sudo -u "${RUN_USER}" bash -lc "cd '${REPO_ROOT}' && npm install"

echo "==> Ensuring Python dependency (Pillow)"
python3 -m pip install --upgrade --break-system-packages pillow >/dev/null 2>&1 || true

if [[ ! -f "${ENV_FILE}" ]]; then
  echo "==> Creating ${ENV_FILE} from template"
  cp "${REPO_ROOT}/scripts/vps/automation.env.example" "${ENV_FILE}"
  chown root:"${RUN_GROUP}" "${ENV_FILE}"
  chmod 640 "${ENV_FILE}"
  echo "!!! Fill real secrets in ${ENV_FILE} before enabling timers."
fi

render_unit() {
  local template="$1"
  local output="$2"
  sed \
    -e "s#__RUN_USER__#${RUN_USER}#g" \
    -e "s#__RUN_GROUP__#${RUN_GROUP}#g" \
    -e "s#__REPO_ROOT__#${REPO_ROOT}#g" \
    -e "s#__ENV_FILE__#${ENV_FILE}#g" \
    "${template}" > "${output}"
}

echo "==> Installing systemd units"
render_unit "${REPO_ROOT}/scripts/vps/systemd/nivaran-global-news.service.tpl" "/etc/systemd/system/nivaran-global-news.service"
render_unit "${REPO_ROOT}/scripts/vps/systemd/nivaran-nepal-news.service.tpl" "/etc/systemd/system/nivaran-nepal-news.service"
cp "${REPO_ROOT}/scripts/vps/systemd/nivaran-global-news.timer" "/etc/systemd/system/nivaran-global-news.timer"
cp "${REPO_ROOT}/scripts/vps/systemd/nivaran-nepal-news.timer" "/etc/systemd/system/nivaran-nepal-news.timer"

chmod 755 "${REPO_ROOT}/scripts/vps/run_global_news_once.sh"
chmod 755 "${REPO_ROOT}/scripts/vps/run_nepal_news_once.sh"

systemctl daemon-reload
systemctl enable --now nivaran-global-news.timer
systemctl enable --now nivaran-nepal-news.timer

echo "==> Installed. Current timers:"
systemctl list-timers --all | grep -E 'nivaran-(global|nepal)-news' || true

echo "\nNext steps:"
echo "1) Edit ${ENV_FILE} and set GEMINI_API_KEY + webhooks"
echo "2) Test once: systemctl start nivaran-global-news.service"
echo "3) Check logs: journalctl -u nivaran-global-news.service -n 200 --no-pager"

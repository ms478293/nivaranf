#!/usr/bin/env bash
set -euo pipefail

if [[ "${EUID}" -ne 0 ]]; then
  echo "Run this script as root (sudo)." >&2
  exit 1
fi

REPO_ROOT="${REPO_ROOT:-/opt/nivaran/nivaranf-git}"
RUN_USER="${RUN_USER:-}"
ENV_FILE="${ENV_FILE:-/etc/nivaran/web.env}"
SERVICE_NAME="${SERVICE_NAME:-nivaran-web}"

if [[ -z "${RUN_USER}" ]]; then
  if [[ -n "${SUDO_USER:-}" && "${SUDO_USER}" != "root" ]]; then
    RUN_USER="${SUDO_USER}"
  else
    echo "Set RUN_USER explicitly when invoking this script." >&2
    exit 1
  fi
fi

if [[ ! -f "${ENV_FILE}" ]]; then
  echo "Missing env file: ${ENV_FILE}" >&2
  exit 1
fi

set -a
source "${ENV_FILE}"
set +a

cd "${REPO_ROOT}"
sudo -u "${RUN_USER}" git fetch --all --prune
sudo -u "${RUN_USER}" git checkout main
sudo -u "${RUN_USER}" git pull --ff-only origin main

if [[ -f package-lock.json ]]; then
  sudo -u "${RUN_USER}" npm ci --legacy-peer-deps
else
  sudo -u "${RUN_USER}" npm install --legacy-peer-deps
fi

sudo -u "${RUN_USER}" npm run build
systemctl restart "${SERVICE_NAME}"
systemctl status --no-pager "${SERVICE_NAME}"

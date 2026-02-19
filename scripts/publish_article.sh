#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
DEFAULT_CONFIG="${SCRIPT_DIR}/article.template.json"

CONFIG_PATH="${DEFAULT_CONFIG}"
if [[ $# -gt 0 && "$1" != --* ]]; then
  CONFIG_PATH="$1"
  shift
fi

if [[ ! -f "${CONFIG_PATH}" ]]; then
  echo "Config file not found: ${CONFIG_PATH}" >&2
  exit 1
fi

node "${SCRIPT_DIR}/publish-article.mjs" --repo "${REPO_ROOT}" --config "${CONFIG_PATH}" "$@"

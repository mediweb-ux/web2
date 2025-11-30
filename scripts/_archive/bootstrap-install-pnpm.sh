#!/usr/bin/env bash
# Archived copy of the bootstrap script that used to ensure pnpm was available
# Kept for history. The active script was removed from `scripts/` and is considered
# deprecated. Do not rely on this file in CI or production builds.

set -euo pipefail

if command -v pnpm >/dev/null 2>&1; then
  echo "pnpm is already installed: $(pnpm --version)"
  exit 0
fi

echo "pnpm not found — attempting to install pnpm@10.24.0 globally via npm"
if command -v corepack >/dev/null 2>&1; then
  echo "Enabling corepack and preparing pnpm via corepack"
  corepack enable || true
  corepack prepare pnpm@10.24.0 --activate || true
fi

if ! command -v pnpm >/dev/null 2>&1; then
  echo "Falling back to 'npm install -g pnpm@10.24.0'"
  npm install -g pnpm@10.24.0
fi

export NIXPACKS_PATH="/app/node_modules/.bin:${NIXPACKS_PATH:-}"
echo "Ensured pnpm: $(pnpm --version)"

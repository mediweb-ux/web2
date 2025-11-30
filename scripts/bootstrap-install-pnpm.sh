#!/usr/bin/env bash
# Ensure pnpm is available in build environments that don't provide it.
# Idempotent: exits 0 if pnpm is already present.
set -euo pipefail

if command -v pnpm >/dev/null 2>&1; then
  echo "pnpm is already installed: $(pnpm --version)"
  exit 0
fi

echo "pnpm not found — attempting to install pnpm@10.24.0 globally via npm"
# Try corepack path first (safer on modern Node images)
if command -v corepack >/dev/null 2>&1; then
  echo "Enabling corepack and preparing pnpm via corepack"
  corepack enable || true
  corepack prepare pnpm@10.24.0 --activate || true
fi

# Fallback to npm global install if corepack not available or prepare failed
if ! command -v pnpm >/dev/null 2>&1; then
  echo "Falling back to 'npm install -g pnpm@10.24.0'"
  npm install -g pnpm@10.24.0
fi

# Export a path for environments referencing NIXPACKS_PATH
export NIXPACKS_PATH="/app/node_modules/.bin:${NIXPACKS_PATH:-}"
echo "Ensured pnpm: $(pnpm --version)"
exit 0

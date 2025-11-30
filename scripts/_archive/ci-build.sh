#!/usr/bin/env bash
# Archived CI build wrapper — original content kept for history.

set -euo pipefail

echo "Running repo bootstrap to ensure pnpm is available..."
bash ./scripts/_archive/bootstrap-install-pnpm.sh || true

echo "Installing dependencies (pnpm)..."
echo "(archived script - not intended for active use)"

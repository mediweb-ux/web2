#!/usr/bin/env bash
set -euo pipefail

# Wrapper for CI/build systems that run custom build commands.
# Ensures pnpm is present (via the repo bootstrap script), then installs and builds.

echo "Running repo bootstrap to ensure pnpm is available..."
bash ./scripts/bootstrap-install-pnpm.sh

echo "Installing dependencies (pnpm)..."
pnpm install --frozen-lockfile

echo "Running build..."
pnpm run build

echo "Build completed."

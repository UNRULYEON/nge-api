#!/usr/bin/env bash
set -euo pipefail

if [ ! -x "$HOME/.bun/bin/bun" ]; then
  curl -fsSL https://bun.sh/install | bash
fi
export PATH="$HOME/.bun/bin:$PATH"
bun install

if [ ! -x "$HOME/.railway/bin/railway" ]; then
  curl -fsSL https://railway.com/install.sh -o /tmp/railway-install.sh
  bash /tmp/railway-install.sh --agents -y
fi

if [ -x "$HOME/.railway/bin/railway" ]; then
  sudo ln -sfn "$HOME/.railway/bin/railway" /usr/local/bin/railway
fi

if command -v railway >/dev/null 2>&1 && railway whoami >/dev/null 2>&1; then
  railway link --project 71171aad-7209-40c8-b7c9-2017e1ce09c8 --environment production --service api || true
fi

#!/usr/bin/env bash
set -euo pipefail

# Simple repository validation helper (main script)
# Runs the project's pre-commit validation which includes:
#  - manifest JSON validation
#  - shader existence checks
#  - GLSL validation (via glslangValidator after resolving includes)

REPO_ROOT=$(git rev-parse --show-toplevel 2>/dev/null || pwd)
cd "$REPO_ROOT"

if [ "$#" -gt 0 ] && ([ "$1" = "-h" ] || [ "$1" = "--help" ]); then
  echo "Usage: validate.sh"
  echo "Runs repository validation (manifest + GLSL checks)."
  exit 0
fi

echo "==> Running repository validation (delegating to hooks/pre-commit)"

if [ ! -f hooks/pre-commit ]; then
  echo "Error: hooks/pre-commit not found. Install hooks with: bash install-hooks.sh" >&2
  exit 2
fi

# Run the hook script in a way that's safe for interactive use
bash hooks/pre-commit

echo "==> Validation completed"

#!/usr/bin/env bash
set -euo pipefail

# Build/packaging script used by GitHub Actions and by developers.
#  - runs validation
#  - copies player, shaders, and assets into a clean `dist` directory
#  - rewrites/adjusts paths if necessary (handled in source files)

REPO_ROOT=$(git rev-parse --show-toplevel 2>/dev/null || pwd)
cd "$REPO_ROOT"

# ensure everything is valid before packaging
bash validate.sh

# remove old output (ensures a clean slate each run)
rm -rf dist
mkdir -p dist

echo "==> copying player files"
# copy everything but drop platform-specific helper scripts not needed in deployment
cp -R player/* dist/
# remove portable server scripts which aren't used on github pages
rm -f dist/*.ps1 dist/*.bat dist/start_server.* dist/stop_server.*

# manifest, shaders and CSS/images live in their own dirs

echo "==> copying shader sources"
cp -R shaders dist/

echo "==> copying assets"
cp -R assets dist/

# ensure readable permissions everywhere
chmod -R a+r dist

echo "==> build complete (output in dist/)"
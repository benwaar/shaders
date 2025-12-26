#!/usr/bin/env bash
# start_server.command — double-click to open Terminal and run a local server
cd "$(dirname "$0")/.."
PORT=8000

echo "Serving from: $PWD on http://127.0.0.1:$PORT"
# prefer python3, then python, then ruby, then npx http-server
if command -v python3 >/dev/null 2>&1; then
  exec python3 -m http.server $PORT
elif command -v python >/dev/null 2>&1; then
  exec python -m http.server $PORT
elif command -v ruby >/dev/null 2>&1; then
  exec ruby -run -e httpd . -p $PORT
elif command -v npx >/dev/null 2>&1; then
  exec npx http-server -p $PORT
else
  osascript -e 'display dialog "No suitable server found. Install Python or Node (npx)."'
  exit 1
fi

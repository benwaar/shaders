#!/usr/bin/env bash
# stop_server.command — double-click to kill whatever is listening on port 8000
cd "$(dirname "$0")/.."
PID=$(lsof -ti tcp:8000)
if [ -n "$PID" ]; then
  echo "Killing $PID"
  kill $PID
else
  echo "No process listening on port 8000"
fi
read -p "Press Enter to close"

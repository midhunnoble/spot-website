#!/bin/bash
# Stop the brainstorm server and clean up

SCREEN_DIR="$1"
PID_FILE="${SCREEN_DIR}/.server.pid"

if [[ -f "$PID_FILE" ]]; then
  pid=$(cat "$PID_FILE")
  kill "$pid" 2>/dev/null
  rm -rf "$SCREEN_DIR"
  echo '{"status": "stopped"}'
else
  echo '{"status": "not_running"}'
fi
